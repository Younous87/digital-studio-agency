import { client } from '@/lib/sanity/client'
import { serviceBySlugQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import { Card } from '@/components/retroui/Card'
import { Button } from '@/components/retroui/Button'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import { urlFor } from '@/lib/sanity/image'
import BlockRenderer from '@/components/blocks/BlockRenderer'
import ScrollReveal from '@/components/ui/ScrollReveal'

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

export default async function ServicePage({ params }: Readonly<{ params: Promise<{ slug: string }> }>) {
  const { slug } = await params
  const service = await getService(slug)

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
                className="border-4 border-black shadow-sm rounded-none"
              />
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-black text-black mb-6 retro-text-shadow">
            {service.title}
          </h1>
          <p className="text-xl text-black font-bold">
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

      {/* Related Projects */}
      {service.relatedProjects && service.relatedProjects.length > 0 && (
        <Section background="gray">
          <h2 className="text-3xl md:text-4xl font-black text-black mb-12 text-center retro-text-shadow">
            Recent Work
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {service.relatedProjects.map((project: any) => (
              <Link key={project._id} href={`/work/${project.slug.current}`}>
                <Card variant="retro" className="h-full transition-all duration-300 overflow-hidden">
                  <div className="relative h-64 border-b-4 border-black">
                    <Image
                      src={urlFor(project.featuredImage).width(600).height(400).url()}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className="text-xl font-black text-black mb-2">
                      {project.title}
                    </h3>
                    <p className="text-black font-medium">{project.shortDescription}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}

      {/* Page Builder Blocks */}
      {service.pageBuilder?.map((block: any, index: number) => (
        <ScrollReveal key={block._key || block._id || `${block._type}-${index}`}>
          <BlockRenderer block={block} index={index} />
        </ScrollReveal>
      ))}

      {/* CTA Section */}
      {service.cta && (
        <Section padding="xl" background="dark">
          <div className="text-center max-w-3xl mx-auto bg-white border-4 border-black shadow-lg p-12">
            <h2 className="text-3xl md:text-4xl font-black mb-4 retro-text-shadow">
              {service.cta.title}
            </h2>
            {service.cta.description && (
              <p className="text-xl mb-8 font-bold text-black">
                {service.cta.description}
              </p>
            )}
            {service.cta.buttonText && service.cta.buttonLink && (
              <Button asChild size="lg">
                <Link href={service.cta.buttonLink}>
                  {service.cta.buttonText}
                </Link>
              </Button>
            )}
          </div>
        </Section>
      )}
    </>
  )
}
