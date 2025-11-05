import { client } from '@/lib/sanity/client'
import { homepageQuery } from '@/lib/sanity/queries'
import HeroBlock from '@/components/blocks/HeroBlock'
import ServicesGrid from '@/components/blocks/ServicesGrid'
import ProjectGrid from '@/components/blocks/ProjectGrid'
import TestimonialCarousel from '@/components/blocks/TestimonialCarousel'
import CTASection from '@/components/blocks/CTASection'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import Section from '@/components/ui/Section'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60 // Revalidate every 60 seconds

async function getHomepage() {
  try {
    const homepage = await client.fetch(homepageQuery)
    return homepage
  } catch (error) {
    console.error('Error fetching homepage:', error)
    return null
  }
}

export default async function HomePage() {
  const homepage = await getHomepage()

  if (!homepage?.pageBuilder) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Digital Studio
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Configure your homepage in Sanity Studio
          </p>
          <Button href="/studio">Go to Studio</Button>
        </div>
      </div>
    )
  }

  return (
    <>
      {homepage.pageBuilder.map((block: any, index: number) => {
        switch (block._type) {
          case 'hero':
            return (
              <HeroBlock
                key={index}
                headline={block.headline}
                subheadline={block.subheadline}
                cta={block.cta}
                secondaryCta={block.secondaryCta}
                backgroundImage={block.backgroundImage}
                backgroundVideo={block.backgroundVideo}
              />
            )
          
          case 'servicesOverview':
            return (
              <ServicesGrid
                key={index}
                title={block.title}
                description={block.description}
                services={block.services || []}
                layout={block.layout}
              />
            )
          
          case 'featuredProjects':
            return (
              <ProjectGrid
                key={index}
                title={block.title}
                description={block.description}
                projects={block.projects || []}
                layout={block.layout}
              />
            )
          
          case 'testimonials':
            return (
              <TestimonialCarousel
                key={index}
                title={block.title}
                description={block.description}
                testimonials={block.testimonials || []}
                layout={block.layout}
              />
            )
          
          case 'aboutSection':
            return (
              <Section key={index} background="white">
                <div className={`grid md:grid-cols-2 gap-12 items-center ${
                  block.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
                }`}>
                  <div className={block.imagePosition === 'left' ? 'md:order-2' : ''}>
                    {block.title && (
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {block.title}
                      </h2>
                    )}
                    {block.content && (
                      <RichTextRenderer content={block.content} />
                    )}
                    {block.cta && (
                      <div className="mt-6">
                        <Button href={block.cta.link}>
                          {block.cta.text}
                        </Button>
                      </div>
                    )}
                  </div>
                  {block.image && (
                    <div className={`relative h-96 rounded-lg overflow-hidden ${
                      block.imagePosition === 'left' ? 'md:order-1' : ''
                    }`}>
                      <Image
                        src={urlFor(block.image).width(800).url()}
                        alt={block.title || 'About'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </Section>
            )
          
          case 'ctaSection':
            return (
              <CTASection
                key={index}
                title={block.title}
                description={block.description}
                primaryCta={block.primaryCta}
                secondaryCta={block.secondaryCta}
                backgroundImage={block.backgroundImage}
                backgroundColor={block.backgroundColor}
              />
            )
          
          case 'textImageBlock':
            return (
              <Section key={index}>
                <div className={`grid md:grid-cols-2 gap-12 items-center ${
                  block.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
                }`}>
                  <div className={block.imagePosition === 'left' ? 'md:order-2' : ''}>
                    {block.title && (
                      <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                        {block.title}
                      </h2>
                    )}
                    {block.content && (
                      <RichTextRenderer content={block.content} />
                    )}
                    {block.cta && (
                      <div className="mt-6">
                        <Button href={block.cta.link}>
                          {block.cta.text}
                        </Button>
                      </div>
                    )}
                  </div>
                  {block.image && (
                    <div className={`relative h-96 rounded-lg overflow-hidden ${
                      block.imagePosition === 'left' ? 'md:order-1' : ''
                    }`}>
                      <Image
                        src={urlFor(block.image).width(800).url()}
                        alt={block.title || 'Image'}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                </div>
              </Section>
            )
          
          case 'statsSection':
            return (
              <Section 
                key={index} 
                background="dark"
              >
                {block.title && (
                  <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
                    {block.title}
                  </h2>
                )}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                  {block.stats?.map((stat: any, statIndex: number) => (
                    <div key={statIndex} className="text-center">
                      <div className="text-4xl md:text-5xl font-bold mb-2">
                        {stat.value}
                      </div>
                      <div className="text-xl font-semibold mb-2">
                        {stat.label}
                      </div>
                      {stat.description && (
                        <p className="text-sm opacity-80">
                          {stat.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )
          
          default:
            return null
        }
      })}
    </>
  )
}
