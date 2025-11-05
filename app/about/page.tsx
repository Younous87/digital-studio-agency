import Section from '@/components/ui/Section'
import { client } from '@/lib/sanity/client'
import { teamMembersQuery } from '@/lib/sanity/queries'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'

export const revalidate = 60

async function getTeamMembers() {
  try {
    const team = await client.fetch(teamMembersQuery)
    return team
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

export default async function AboutPage() {
  const team = await getTeamMembers()

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" background="gray">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About Us
          </h1>
          <p className="text-xl text-gray-600">
            We're a team of passionate creatives and technologists dedicated to crafting exceptional digital experiences.
          </p>
        </div>
      </Section>

      {/* Story Section */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
            Our Story
          </h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Founded in 2020, Digital Studio emerged from a simple belief: that great digital experiences have the power to transform businesses and delight users.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-4">
              Over the years, we've worked with startups, established brands, and everything in between, helping them navigate the ever-evolving digital landscape with innovative solutions and strategic insights.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to be a trusted partner for businesses looking to make their mark in the digital world.
            </p>
          </div>
        </div>
      </Section>

      {/* Values Section */}
      <Section background="gray">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
          Our Values
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Innovation</h3>
            <p className="text-gray-600">
              We push boundaries and embrace new technologies to deliver cutting-edge solutions.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Quality</h3>
            <p className="text-gray-600">
              Excellence is our standard. We're committed to delivering work that exceeds expectations.
            </p>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Collaboration</h3>
            <p className="text-gray-600">
              We believe the best results come from working closely with our clients as true partners.
            </p>
          </div>
        </div>
      </Section>

      {/* Team Section */}
      {team.length > 0 && (
        <Section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member: any) => (
              <div key={member._id} className="text-center">
                {member.photo && (
                  <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                    <Image
                      src={urlFor(member.photo).width(300).height(300).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 mb-4">{member.role}</p>
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex justify-center gap-3">
                    {member.socialLinks.map((social: any, index: number) => (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-600 hover:text-blue-600"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
