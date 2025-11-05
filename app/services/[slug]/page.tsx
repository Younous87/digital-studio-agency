import { client } from '@/lib/sanity/client'
import { serviceBySlugQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Container from '@/components/ui/Container'
import Card from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

async function getService(slug: string) {
  try {
    const service = await client.fetch(serviceBySlugQuery, { slug })
    return service
  } catch (error) {
    console.error('Error fetching service:', error)
    return null
  }
}

export default async function ServicePage({ params }: { params: { slug: string } }) {
  const service = await getService(params.slug)

  if (!service) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" background="gray">
        <div className="text-center max-w-3xl mx-auto">
          {service.icon && (
            <div className="mb-6 flex justify-center">
              <Image
                src={urlFor(service.icon).width(120).url()}
                alt={service.title}
                width={120}
                height={120}
              />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {service.title}
          </h1>
          <p className="text-xl text-gray-600">
            {service.shortDescription}
          </p>
        </div>
      </Section>

      {/* Full Description */}
      {service.fullDescription && (
        <Section>
          <RichTextRenderer content={service.fullDescription} />
        </Section>
      )}

      {/* Features */}
      {service.features && service.features.length > 0 && (
        <Section background="gray">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            What's Included
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.features.map((feature: any, index: number) => (
              <Card key={index}>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}

      {/* Process Steps */}
      {service.processSteps && service.processSteps.length > 0 && (
        <Section>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Our Process
          </h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {service.processSteps.map((step: any, index: number) => (
              <div key={index} className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {step.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Related Projects */}
      {service.relatedProjects && service.relatedProjects.length > 0 && (
        <Section background="gray">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
            Recent Work
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.relatedProjects.map((project: any) => (
              <Link key={project._id} href={`/work/${project.slug.current}`}>
                <Card hover className="h-full">
                  <div className="relative h-64">
                    <Image
                      src={urlFor(project.featuredImage).width(600).height(400).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                    <p className="text-gray-600">{project.shortDescription}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* CTA Section */}
      {service.cta && (
        <Section padding="xl" background="dark">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {service.cta.title}
            </h2>
            {service.cta.description && (
              <p className="text-xl mb-8 text-gray-300">
                {service.cta.description}
              </p>
            )}
            {service.cta.buttonText && service.cta.buttonLink && (
              <Button href={service.cta.buttonLink} size="lg">
                {service.cta.buttonText}
              </Button>
            )}
          </div>
        </Section>
      )}
    </>
  )
}
