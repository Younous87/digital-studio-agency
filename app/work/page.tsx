import { client } from '@/lib/sanity/client'
import { projectsQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

async function getProjects() {
  try {
    const projects = await client.fetch(projectsQuery)
    return projects
  } catch (error) {
    console.error('Error fetching projects:', error)
    return []
  }
}

export default async function WorkPage() {
  const projects = await getProjects()

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" background="gray">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Work
          </h1>
          <p className="text-xl text-gray-600">
            Explore our portfolio of successful projects and discover how we've helped businesses achieve their goals.
          </p>
        </div>
      </Section>

      {/* Projects Grid */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project: any) => (
            <Link key={project._id} href={`/work/${project.slug.current}`}>
              <Card hover className="h-full group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={urlFor(project.featuredImage).width(600).height(400).url()}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {project.categories && project.categories.length > 0 && (
                    <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                      {project.categories.slice(0, 2).map((category: string, index: number) => (
                        <span
                          key={index}
                          className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold text-gray-900 mb-2">
                    {project.title}
                  </h2>
                  {project.clientName && (
                    <p className="text-sm text-gray-500 mb-2">
                      Client: {project.clientName}
                    </p>
                  )}
                  <p className="text-gray-600 line-clamp-2">
                    {project.shortDescription}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
