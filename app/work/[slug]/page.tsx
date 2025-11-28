import { client } from '@/lib/sanity/client'
import { projectBySlugQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import FullScreenSection from '@/components/ui/FullScreenSection'
import BackgroundWrapper from '@/components/blocks/BackgroundWrapper'
import { Button } from '@/components/retroui/Button'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 0

async function getProject(slug: string) {
  try {
    const project = await client.fetch(projectBySlugQuery, { slug })
    return project
  } catch (error) {
    console.error('Error fetching project:', error)
    return null
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = await getProject(slug)

  if (!project) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <BackgroundWrapper backgroundImage={project.heroBackground}>
        <FullScreenSection background={project.heroBackground ? 'transparent' : 'gray'}>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                {project.categories && project.categories.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.categories.map((category: string, index: number) => (
                      <span
                        key={`${category}-${index}`}
                        className="bg-(--brand-secondary) border-3 border-black px-4 py-2 text-sm font-black text-black shadow-sm"
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                )}
                <h1 className="text-4xl md:text-5xl font-black text-black mb-4 retro-text-shadow">
                  {project.title}
                </h1>
                {project.clientName && (
                  <p className="text-xl text-black mb-2 font-bold">
                    Client: {project.clientName}
                  </p>
                )}
                {project.year && (
                  <p className="text-lg text-black font-bold">
                    Year: {project.year}
                  </p>
                )}
              </div>
              <div className="relative h-96 border-4 border-black shadow-lg overflow-hidden rounded-none">
                <Image
                  src={urlFor(project.featuredImage).width(800).url()}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </FullScreenSection>
      </BackgroundWrapper>

      {/* Short Description */}
      {/* Short Description */}
      <FullScreenSection background="white">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-2xl text-black leading-relaxed font-bold">
            {project.shortDescription}
          </p>
        </div>
      </FullScreenSection>

      {/* Case Study */}
      {/* Case Study */}
      {project.caseStudy && (
        <BackgroundWrapper backgroundImage={project.caseStudyBackground}>
          <FullScreenSection background={project.caseStudyBackground ? 'transparent' : 'white'}>
            <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-lg p-12">
              <RichTextRenderer content={project.caseStudy} />
            </div>
          </FullScreenSection>
        </BackgroundWrapper>
      )}

      {/* Gallery */}
      {/* Gallery */}
      {project.gallery && project.gallery.length > 0 && (
        <BackgroundWrapper backgroundImage={project.galleryBackground}>
          <FullScreenSection background={project.galleryBackground ? 'transparent' : 'gray'}>
            <div className="grid md:grid-cols-2 gap-8">
              {project.gallery.map((image: any, index: number) => (
                <div key={`${image.caption || 'image'}-${index}`} className="relative h-96 border-4 border-black shadow-lg overflow-hidden rounded-none">
                  <Image
                    src={urlFor(image).width(800).url()}
                    alt={image.caption || `Gallery image ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  {image.caption && (
                    <div className="absolute bottom-0 left-0 right-0 bg-(--brand-primary) border-t-4 border-black text-black p-4 font-bold">
                      <p>{image.caption}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </FullScreenSection>
        </BackgroundWrapper>
      )}

      {/* Results */}
      {/* Results */}
      {project.results && project.results.length > 0 && (
        <BackgroundWrapper backgroundImage={project.resultsBackground}>
          <FullScreenSection background={project.resultsBackground ? 'transparent' : 'white'}>
            <h2 className="text-3xl md:text-4xl font-black text-black mb-12 text-center retro-text-shadow">
              Results
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {project.results.map((result: any, index: number) => (
                <div key={`${result.metric}-${index}`} className="text-center bg-white border-4 border-black shadow-lg p-8">
                  <div className="text-4xl md:text-5xl font-black text-(--brand-primary) mb-2 retro-text-shadow">
                    {result.value}
                  </div>
                  <div className="text-xl font-black text-black mb-2">
                    {result.metric}
                  </div>
                  {result.description && (
                    <p className="text-black font-medium">{result.description}</p>
                  )}
                </div>
              ))}
            </div>
          </FullScreenSection>
        </BackgroundWrapper>
      )}

      {/* Testimonial */}
      {/* Testimonial */}
      {project.testimonial && (
        <BackgroundWrapper backgroundImage={project.testimonialBackground}>
          <FullScreenSection background={project.testimonialBackground ? 'transparent' : 'gray'}>
            <div className="max-w-4xl mx-auto text-center bg-white border-4 border-black shadow-lg p-12">
              {project.testimonial.rating && (
                <div className="flex justify-center mb-6">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-6 h-6 ${i < project.testimonial.rating ? 'text-(--brand-secondary)' : 'text-black'
                        }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              <blockquote className="text-2xl text-black mb-6 italic font-bold">
                &ldquo;{project.testimonial.quote}&rdquo;
              </blockquote>
              <div className="flex items-center justify-center">
                {project.testimonial.photo && (
                  <Image
                    src={urlFor(project.testimonial.photo).width(80).height(80).url()}
                    alt={project.testimonial.clientName}
                    width={80}
                    height={80}
                    className="rounded-none mr-4 border-4 border-black shadow-sm"
                  />
                )}
                <div>
                  <p className="font-black text-black text-lg">
                    {project.testimonial.clientName}
                  </p>
                  {project.testimonial.role && project.testimonial.company && (
                    <p className="text-black font-bold">
                      {project.testimonial.role}, {project.testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </FullScreenSection>
        </BackgroundWrapper>
      )}

      {/* Services Used */}
      {project.services && project.services.length > 0 && (
        <BackgroundWrapper backgroundImage={project.servicesBackground}>
          <FullScreenSection background={project.servicesBackground ? 'transparent' : 'white'}>
            <h2 className="text-3xl md:text-4xl font-black text-black mb-8 text-center retro-text-shadow">
              Services Used
            </h2>
            <div className="flex flex-wrap justify-center gap-4">
              {project.services.map((service: any) => (
                <Button
                  key={service._id}
                  asChild
                  variant="default"
                  size="lg"
                  className="shadow-md hover:shadow-lg"
                >
                  <Link
                    href={`/services/${service.slug.current}`}
                  >
                    {service.title}
                  </Link>
                </Button>
              ))}
            </div>
          </FullScreenSection>
        </BackgroundWrapper>
      )}

      {/* Project URL */}
      {project.projectUrl && (
        <BackgroundWrapper backgroundImage={project.ctaBackground}>
          <FullScreenSection background={project.ctaBackground ? 'transparent' : 'dark'}>
            <div className="text-center bg-white border-4 border-black shadow-lg p-12 max-w-3xl mx-auto">
              <h2 className="text-2xl font-black mb-4 retro-text-shadow">View Live Project</h2>
              <Button
                asChild
                size="lg"
                variant="default"
              >
                <Link href={project.projectUrl}>
                  Visit Website
                </Link>
              </Button>
            </div>
          </FullScreenSection>
        </BackgroundWrapper>
      )}
    </>
  )
}
