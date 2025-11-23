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
import { Button } from '@/components/retroui/Button'
import FullScreenSection from '@/components/ui/FullScreenSection'
import { urlFor } from '@/lib/sanity/image'
import ScrollReveal from '@/components/ui/ScrollReveal'
import RetroMarquee from '@/components/ui/RetroMarquee'
import Link from 'next/link'
import React from 'react'

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
        <div className="text-center bg-white border-4 border-black shadow-lg p-12">
          <h1 className="text-5xl font-black text-black mb-6 retro-text-shadow">
            Welcome to Digital Studio
          </h1>
          <p className="text-xl text-black mb-10 font-bold">
            Configure your homepage in Sanity Studio
          </p>
          <Button asChild>
            <Link href="/studio">
              GO TO STUDIO
            </Link>
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
              <React.Fragment key={block._key || block._id || `${block._type}-${index}`}>
                <ScrollReveal>
                  <HeroBlock
                    key={block._key || block._id || index}
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
                  className="rotate-1 scale-105 z-20 shadow-md"
                />
              </React.Fragment>
            )

          case 'servicesOverview':
            return (
              <ScrollReveal key={block._key || block._id || `${block._type}-${index}`} delay={0.2}>
                <ServicesGrid
                  key={block._key || block._id || index}
                  title={block.title}
                  description={block.description}
                  services={block.services || []}
                  layout={block.layout}
                />
              </ScrollReveal>
            )

          case 'featuredProjects':
            return (
              <ScrollReveal key={block._key || block._id || `${block._type}-${index}`} delay={0.2}>
                <ProjectGrid
                  key={block._key || block._id || index}
                  title={block.title}
                  description={block.description}
                  projects={block.projects || []}
                  layout={block.layout}
                />
              </ScrollReveal>
            )

          case 'testimonials':
            return (
              <ScrollReveal key={block._key || block._id || `${block._type}-${index}`} delay={0.2}>
                <TestimonialCarousel
                  key={block._key || block._id || index}
                  title={block.title}
                  description={block.description}
                  testimonials={block.testimonials || []}
                  layout={block.layout}
                />
              </ScrollReveal>
            )

          case 'aboutSection':
            return (
              <ScrollReveal key={block._key || block._id || `${block._type}-${index}`}>
                <FullScreenSection key={block._key || block._id || index} background="white">
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
                          <Button asChild>
                            <Link href={block.cta.link}>{block.cta.text}</Link>
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
              <ScrollReveal key={block._key || block._id || `${block._type}-${index}`}>
                <CTASection
                  key={block._key || block._id || index}
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
              <ScrollReveal key={block._key || block._id || `${block._type}-${index}`}>
                <FullScreenSection key={block._key || block._id || index}>
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
                          <Button asChild>
                            <Link href={block.cta.link}>{block.cta.text}</Link>
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
              <ScrollReveal key={block._key || block._id || `${block._type}-${index}`} delay={0.3}>
                <AnimatedStats
                  key={block._key || block._id || index}
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

