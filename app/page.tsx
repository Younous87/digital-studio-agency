import { client } from '@/lib/sanity/client'
import { homepageQuery } from '@/lib/sanity/queries'
import HeroBlock from '@/components/blocks/HeroBlock'
import ServicesGrid from '@/components/blocks/ServicesGrid'
import ProjectGrid from '@/components/blocks/ProjectGrid'
import TestimonialCarousel from '@/components/blocks/TestimonialCarousel'
import CTASection from '@/components/blocks/CTASection'
import AnimatedStats from '@/components/blocks/AnimatedStats'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import Image from 'next/image'
import Button from '@/components/ui/Button'
import FullScreenSection from '@/components/ui/FullScreenSection'
import { urlFor } from '@/lib/sanity/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RetroMarquee from '@/components/ui/RetroMarquee'

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
        <div className="text-center bg-white border-4 border-black shadow-brutal-lg p-12">
          <h1 className="text-5xl font-black text-black mb-6 retro-text-shadow">
            Welcome to Digital Studio
          </h1>
          <p className="text-xl text-black mb-10 font-bold">
            Configure your homepage in Sanity Studio
          </p>
          <Button href="/studio" className="font-black">
            GO TO STUDIO
          </Button>
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
              <>
                <ScrollReveal>
                  <HeroBlock
                    key={index}
                    headline={block.headline}
                    subheadline={block.subheadline}
                    cta={block.cta}
                    secondaryCta={block.secondaryCta}
                    backgroundImage={block.backgroundImage}
                    backgroundVideo={block.backgroundVideo}
                  />
                </ScrollReveal>
                <RetroMarquee
                  items={["Digital Experiences", "Creative Strategy", "Brand Identity", "Web Development", "Motion Design"]}
                  speed={25}
                  className="rotate-1 scale-105 z-20 shadow-brutal"
                />
              </>
            )

          case 'servicesOverview':
            return (
              <ScrollReveal delay={0.2}>
                <ServicesGrid
                  key={index}
                  title={block.title}
                  description={block.description}
                  services={block.services || []}
                  layout={block.layout}
                />
              </ScrollReveal>
            )

          case 'featuredProjects':
            return (
              <ScrollReveal delay={0.2}>
                <ProjectGrid
                  key={index}
                  title={block.title}
                  description={block.description}
                  projects={block.projects || []}
                  layout={block.layout}
                />
              </ScrollReveal>
            )

          case 'testimonials':
            return (
              <ScrollReveal delay={0.2}>
                <TestimonialCarousel
                  key={index}
                  title={block.title}
                  description={block.description}
                  testimonials={block.testimonials || []}
                  layout={block.layout}
                />
              </ScrollReveal>
            )

          case 'aboutSection':
            return (
              <ScrollReveal>
                <FullScreenSection key={index} background="white">
                  <div className={`grid md:grid-cols-2 gap-12 items-center ${block.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
                    }`}>
                    <div className={block.imagePosition === 'left' ? 'md:order-2' : ''}>
                      {block.title && (
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-6 retro-text-shadow">
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
                      <div className={`relative h-96 rounded-lg overflow-hidden ${block.imagePosition === 'left' ? 'md:order-1' : ''
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
                </FullScreenSection>
              </ScrollReveal>
            )

          case 'ctaSection':
            return (
              <ScrollReveal>
                <CTASection
                  key={index}
                  title={block.title}
                  description={block.description}
                  primaryCta={block.primaryCta}
                  secondaryCta={block.secondaryCta}
                  backgroundImage={block.backgroundImage}
                  backgroundColor={block.backgroundColor}
                />
              </ScrollReveal>
            )

          case 'textImageBlock':
            return (
              <ScrollReveal>
                <FullScreenSection key={index}>
                  <div className={`grid md:grid-cols-2 gap-12 items-center ${block.imagePosition === 'left' ? 'md:flex-row-reverse' : ''
                    }`}>
                    <div className={block.imagePosition === 'left' ? 'md:order-2' : ''}>
                      {block.title && (
                        <h2 className="text-4xl md:text-5xl font-black text-black mb-6 retro-text-shadow">
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
                      <div className={`relative h-96 rounded-lg overflow-hidden ${block.imagePosition === 'left' ? 'md:order-1' : ''
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
                </FullScreenSection>
              </ScrollReveal>
            )

          case 'statsSection':
            return (
              <ScrollReveal delay={0.3}>
                <AnimatedStats
                  key={index}
                  title={block.title}
                  stats={block.stats || []}
                />
              </ScrollReveal>
            )


          default:
            return null
        }
      })}
    </>
  )
}
