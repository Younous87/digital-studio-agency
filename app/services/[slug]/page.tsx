import { client } from '@/lib/sanity/client'
import { serviceBySlugQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
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
      <section className="relative py-24 sm:py-32 bg-gray-50">
        {service.heroBackground && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(service.heroBackground).url()}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
          </div>
        )}
        <div className="text-center max-w-3xl mx-auto relative z-10">
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
      </section>

      {/* Full Description */}
      {service.fullDescription && (
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <RichTextRenderer content={service.fullDescription} />
          </div>
        </section>
      )}

      {/* Related Projects */}
      {service.pageBuilder?.map((block: any, index: number) => (
        <ScrollReveal key={block._key || block._id || `${block._type}-${index}`}>
          <BlockRenderer block={block} index={index} />
        </ScrollReveal>
      ))}
    </>
  )
}
