const { createClient } = require('@sanity/client')
require('dotenv/config')

if (!process.env.SANITY_API_TOKEN) {
  console.error('❌ SANITY_API_TOKEN is not set in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: 'ryc5e4q2',
  dataset: 'production',
  apiVersion: '2024-11-05',
  token: process.env.SANITY_API_TOKEN.trim(),
  useCdn: false,
})

async function seed() {
  try {
    console.log('🔎 Checking for existing About page...')
    const existingAbout = await client.fetch(`*[_type == "about"][0]{_id, pageBuilder}`)

    // Ensure we have (at least) three team members to seed and reference
    const sampleTeam = [
      { name: 'Alex Morgan', slug: 'alex-morgan', role: 'Creative Director' },
      { name: 'Jordan Lee', slug: 'jordan-lee', role: 'Lead Developer' },
      { name: 'Sam Taylor', slug: 'sam-taylor', role: 'UX Designer' },
    ]

    const teamMemberIds = []

    for (const member of sampleTeam) {
      const existing = await client.fetch(`*[_type == "teamMember" && slug.current == $slug][0]{_id}`, { slug: member.slug })
      if (existing?._id) {
        console.log(`→ Team member ${member.name} already exists (id=${existing._id}).`)
        teamMemberIds.push(existing._id)
        continue
      }

      const toCreate = {
        _type: 'teamMember',
        name: member.name,
        slug: { _type: 'slug', current: member.slug },
        role: member.role,
        bio: [
          { _type: 'block', _key: 'bio1', style: 'normal', children: [{ _type: 'span', _key: 's1', text: `${member.name} is a key member of Digital Studio.` }] }
        ],
        order: teamMemberIds.length + 1
      }

      const created = await client.createIfNotExists({ _type: 'teamMember', 'slug.current': member.slug, ...toCreate })
      console.log(`✓ Created team member: ${created.name} (id=${created._id})`)
      teamMemberIds.push(created._id)
    }

    // If About exists and has a pageBuilder, skip seeding (safe-mode)
    if (existingAbout && existingAbout.pageBuilder && existingAbout.pageBuilder.length > 0) {
      console.log('ℹ️ About page already has a pageBuilder; seed skipped to avoid overwriting existing content.')
      return
    }

    // Compose pageBuilder blocks
    const pageBuilder = [
      {
        _type: 'hero',
        _key: 'hero-about',
        headline: 'About Digital Studio',
        subheadline: 'We create exceptional digital experiences for ambitious brands.'
      },
      {
        _type: 'ourStory',
        _key: 'ourStory1',
        title: 'Our Story',
        content: [
          { _type: 'block', _key: 's1', style: 'normal', children: [{ _type: 'span', _key: 's1c1', text: 'Founded in 2020, Digital Studio emerged from a belief that great digital experiences can transform businesses and delight users.' }] },
          { _type: 'block', _key: 's2', style: 'normal', children: [{ _type: 'span', _key: 's2c1', text: 'We combine strategy, design, and engineering to deliver beautiful and effective websites and digital products.' }] }
        ]
      },
      {
        _type: 'ourValues',
        _key: 'ourValues1',
        title: 'Our Values',
        values: [
          { title: 'Innovation', description: 'We push boundaries with modern solutions.' },
          { title: 'Quality', description: 'We deliver work that exceeds expectations.' },
          { title: 'Collaboration', description: 'We partner closely with our clients to achieve results.' }
        ]
      },
      {
        _type: 'meetOurTeam',
        _key: 'meetOurTeam1',
        title: 'Meet Our Team',
        showTeam: true,
        teamMembers: teamMemberIds.map((id) => ({ _type: 'reference', _ref: id }))
      }
    ]

    if (existingAbout && existingAbout._id) {
      // Set pageBuilder only if missing
      console.log(`ℹ️ Updating existing About doc (id=${existingAbout._id}) to add pageBuilder if missing.`)
      await client.patch(existingAbout._id).setIfMissing({ pageBuilder }).commit({ autoGenerateArrayKeys: true })
      console.log('✓ Updated About doc (pageBuilder set if it was missing).')
      return
    }

    // Otherwise create a new About doc
    console.log('➕ Creating new About document (no existing About found).')
    const aboutDoc = {
      _type: 'about',
      title: 'About',
      pageBuilder,
      seo: { metaTitle: 'About Digital Studio', metaDescription: 'Meet the creative team behind Digital Studio.' }
    }
    const createdAbout = await client.create(aboutDoc)
    console.log(`✓ Created About document: ${createdAbout._id}`)
  } catch (err) {
    console.error('Error seeding About-only:', err)
    process.exit(1)
  }
}

seed()
