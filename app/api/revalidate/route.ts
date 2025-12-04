import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { client } from '@/lib/sanity/client'

// Security: add SANITYWEBHOOKSECRET to Vercel/GitHub Actions env (no underscores)
// Use in webhook: https://your-site/external/api/revalidate?secret=MY_SECRET

function basePathsForDoc(docType: string | undefined, slug?: string | undefined) {
  const set = new Set<string>()
  const mapping: Record<string, string[]> = {
    // Page documents
    homepage: ['/'],
    homePage: ['/'],
    about: ['/about'],
    aboutPage: ['/about'],
    servicesPage: ['/services'],
    servicePage: ['/services'],
    projectsPage: ['/work'],
    projects: ['/work'],
    contactPage: ['/contact'],
    blogPage: ['/blog'],
    // Global/reusable documents
    siteSettings: ['/', '/about', '/contact', '/services', '/work', '/blog'],
    testimonial: ['/', '/services', '/work', '/about'],
    teamMember: ['/about'],
  }

  if (docType && mapping[docType]) {
    for (const p of mapping[docType]) set.add(p)
  }

  // Merge slug-based paths
  for (const p of slugPaths(docType, slug)) set.add(p)
  return set
}

  function slugPaths(docType: string | undefined, slug?: string | undefined) {
    const set = new Set<string>()
    if (docType === 'project' || docType === 'work' || docType === 'projectType') {
      if (slug) set.add(`/work/${slug}`)
      set.add('/work')
      set.add('/')
      set.add('/services')
      set.add('/blog')
    }
    if (docType === 'service') {
      if (slug) set.add(`/services/${slug}`)
      set.add('/services')
      set.add('/')
    }
    if (docType === 'post' || docType === 'article' || docType === 'blogPost') {
      if (slug) set.add(`/blog/${slug}`)
      set.add('/blog')
      set.add('/')
    }
    if (docType === 'teamMember') {
      if (slug) set.add(`/team/${slug}`)
    }
    return set
  }
async function siteSettingsDynamicPaths() {
  const set = new Set<string>()
  try {
    const slugs = await client.fetch(`*[_type in ["project","service","post"] && defined(slug.current)].slug.current`)
    if (slugs && Array.isArray(slugs)) {
      for (const s of slugs) {
        set.add(`/work/${s}`)
        set.add(`/services/${s}`)
        set.add(`/blog/${s}`)
      }
    }
  } catch (err) {
    console.error('Error fetching slugs for revalidation', err)
  }
  return set
}

async function getPathsForDoc(docType: string | undefined, slug?: string | undefined, id?: string | undefined) {
  const set = basePathsForDoc(docType, slug)
  // If there is no slug but we have an id for a sluggable doc type, fetch the slug
  const sluggable = ['project', 'work', 'projectType', 'service', 'post', 'article', 'blogPost', 'teamMember']
  let currentSlug = slug
  if (!currentSlug && id && sluggable.includes(docType || '')) {
    try {
      currentSlug = await client.fetch(`*[_id == $id][0].slug.current`, { id })
    } catch (e) {
      console.error('Error fetching slug by id', id, e)
    }
  }
  // Add slug-based paths if available
  for (const p of slugPaths(docType, currentSlug)) set.add(p)
  if (docType === 'siteSettings') {
    const dynamic = await siteSettingsDynamicPaths()
    for (const p of dynamic) set.add(p)
  }
  return set
}

export async function POST(req: Request) {
  try {
    const url = new URL(req.url)
    const secret = url.searchParams.get('secret')
    const headerSecret = req.headers.get('x-sanity-webhook-secret') || req.headers.get('x-sanity-secret')
    const envVarPresent = !!process.env.SANITYWEBHOOKSECRET
    const authorized = envVarPresent && (secret === process.env.SANITYWEBHOOKSECRET || headerSecret === process.env.SANITYWEBHOOKSECRET)
    console.log('Revalidate webhook: env set=', envVarPresent, 'querySecretPresent=', !!secret, 'headerSecretPresent=', !!headerSecret)
    if (!authorized) {
      console.info('Revalidate webhook - unauthorized attempt; check SANITYWEBHOOKSECRET value and the webhook query/header on Sanity and Vercel settings')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const payload = await req.json()
    // Sanity webhook payload varies; it includes `type`, `id`, `dataset`, and often `document` or `result` fields.
    // Attempt to detect the doc type and slug
    const doc = payload?.document || payload?.result || payload?.body || payload
    const docType = doc?._type || payload?.type || payload?.event || payload?.action
    const slug = doc?.slug?.current || doc?.slug
    const id = doc?._id || payload?.id || payload?.documentId

    const pathsToRevalidate = new Set<string>(['/'])

    const docPaths = await getPathsForDoc(docType, slug, id)
    for (const p of docPaths) pathsToRevalidate.add(p)

    // Always revalidate the index and maybe search/list pages
    // For safety, avoid revalidating everything; only revalidate mapped paths

    const revalidated: string[] = []
    for (const path of pathsToRevalidate) {
      try {
        revalidatePath(path)
        revalidated.push(path)
      } catch (err) {
        console.error('Revalidate failed for path', path, err)
      }
    }

    if (process.env.DEBUG_REVALIDATE === 'true') {
      return NextResponse.json({ status: 'Revalidated', paths: revalidated }, { status: 200 })
    }
    return new NextResponse('Revalidated', { status: 200 })
  } catch (error) {
    console.error('Revalidate endpoint error', error)
    return new NextResponse('Error', { status: 500 })
  }
}
