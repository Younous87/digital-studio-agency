import { client } from '@/lib/sanity/client'
import { projectBySlugQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

async function getProject(slug: string) {
  try {
    const project = await client.fetch(projectBySlugQuery, { slug })
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const project = await getProject(params.slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" background="gray">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              {project.categories && project.categories.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.categories.map((category: string, index: number) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                {project.title}
              </h1>
              {project.clientName && (
                <p className="text-xl text-gray-600 mb-2">
                  Client: {project.clientName}
                </p>
              )}
              {project.year && (
                <p className="text-lg text-gray-500">
                  Year: {project.year}
                </p>
              )}
            </div>
            <div className="relative h-96 rounded-lg overflow-hidden">
              <Image
                src={urlFor(project.featuredImage).width(800).url()}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      {/* Short Description */}
      <Section>
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl text-gray-700 leading-relaxed">
            {project.shortDescription}
          </p>
        </div>
      </Section>

      {/* Case Study */}
      {project.caseStudy && (
        <Section background="white">
          <div className="max-w-4xl mx-auto">
            <RichTextRenderer content={project.caseStudy} />
          </div>
        </Section>
      )}

      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <Section background="gray">
          <div className="grid md:grid-cols-2 gap-8">
            {project.gallery.map((image: any, index: number) => (
              <div key={index} className="relative h-96 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(image).width(800).url()}
                  alt={image.caption || `Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-4">
                    <p>{image.caption}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Results */}
      {project.results && project.results.length > 0 && (
        <Section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Results
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {project.results.map((result: any, index: number) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                  {result.value}
                </div>
                <div className="text-xl font-semibold text-gray-900 mb-2">
                  {result.metric}
                </div>
                {result.description && (
                  <p className="text-gray-600">{result.description}</p>
                )}
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Testimonial */}
      {project.testimonial && (
        <Section background="gray">
          <div className="max-w-4xl mx-auto text-center">
            {project.testimonial.rating && (
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${
                      i < project.testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            )}
            <blockquote className="text-2xl text-gray-700 mb-6 italic">
              &ldquo;{project.testimonial.quote}&rdquo;
            </blockquote>
            <div className="flex items-center justify-center">
              {project.testimonial.photo && (
                <Image
                  src={urlFor(project.testimonial.photo).width(80).height(80).url()}
                  alt={project.testimonial.clientName}
                  width={80}
                  height={80}
                  className="rounded-full mr-4"
                />
              )}
              <div>
                <p className="font-semibold text-gray-900 text-lg">
                  {project.testimonial.clientName}
                </p>
                {project.testimonial.role && project.testimonial.company && (
                  <p className="text-gray-600">
                    {project.testimonial.role}, {project.testimonial.company}
                  </p>
                )}
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Services Used */}
      {project.services && project.services.length > 0 && (
        <Section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
            Services Used
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {project.services.map((service: any) => (
              <Link
                key={service._id}
                href={`/services/${service.slug.current}`}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
              >
                {service.title}
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Project URL */}
      {project.projectUrl && (
        <Section background="dark" padding="lg">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">View Live Project</h2>
            <Button
              href={project.projectUrl}
              size="lg"
              variant="primary"
            >
              Visit Website
            </Button>
          </div>
        </Section>
      )}
    </>
  )
}
