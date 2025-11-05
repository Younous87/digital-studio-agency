import Image from 'next/image'
import Link from 'next/link'
import Section from '../ui/Section'
import Card from '../ui/Card'
import { urlFor } from '@/lib/sanity/image'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  clientName?: string
  shortDescription: string
  featuredImage: any
  categories?: string[]
}

interface ProjectGridProps {
  title?: string
  description?: string
  projects: Project[]
  layout?: 'grid' | 'masonry' | 'carousel'
}

export default function ProjectGrid({
  title,
  description,
  projects,
  layout = 'grid'
}: ProjectGridProps) {
  return (
    <Section>
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
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
                    {project.categories.slice(0, 2).map((category, index) => (
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
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {project.title}
                </h3>
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
  )
}
