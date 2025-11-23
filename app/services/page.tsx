import FullScreenSection from '@/components/ui/FullScreenSection'
import { client } from '@/lib/sanity/client'
import { servicesPageQuery } from '@/lib/sanity/queries'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import HeroBlock from '@/components/blocks/HeroBlock'
import PageHeroBlock from '@/components/blocks/PageHeroBlock'
import ServiceListBlock from '@/components/blocks/ServiceListBlock'
import ServicesOverview from '@/components/blocks/ServicesGrid'
import FeaturedProjects from '@/components/blocks/ProjectGrid'
import Testimonials from '@/components/blocks/TestimonialCarousel'
import CTASection from '@/components/blocks/CTASection'
import StatsSection from '@/components/blocks/AnimatedStats'

type PageBlock = {
  _type: string
  _key?: string
  _id?: string
  headline?: string
  subheadline?: string
  title?: string
  subtitle?: string
  description?: string
  content?: unknown
  layout?: string
  showAll?: boolean
  showFeatured?: boolean
  services?: Array<Record<string, unknown>>
  projects?: Array<Record<string, unknown>>
  testimonials?: Array<Record<string, unknown>>
  stats?: Array<Record<string, unknown>>
  cta?: { text?: string; link?: string }
  secondaryCta?: { text?: string; link?: string }
  primaryCta?: { text?: string; link?: string }
  backgroundImage?: Record<string, unknown>
  backgroundVideo?: Record<string, unknown>
  background?: {
    type: 'color' | 'image' | 'video'
    color?: string
    image?: any
    video?: any
  }
  backgroundColor?: {
    hex: string
    hsl: { h: number; s: number; l: number; a: number }
    rgb: { r: number; g: number; b: number; a: number }
    hsv: { h: number; s: number; v: number; a: number }
  }
  image?: Record<string, unknown>
  imagePosition?: string
}

export const revalidate = 60

async function getServicesPage() {
  try {
    const servicesPage = await client.fetch(servicesPageQuery)
    return servicesPage
  } catch (error) {
    console.error('Error fetching services page:', error)
    return null
  }
}

export default async function ServicesPage() {
  const servicesPage = await getServicesPage()

  return (
    <>
      {servicesPage?.pageBuilder?.length ? (
        servicesPage.pageBuilder.map((block: PageBlock, index: number) => {
          switch (block._type) {
            case 'hero':
              return (
                <HeroBlock
                  key={block._key || block._id || `${block._type}-${index}`}
                  headline={block.headline ?? ''}
                  subheadline={block.subheadline ?? ''}
                  cta={block.cta ? { text: String(block.cta.text ?? ''), link: String(block.cta.link ?? '') } : undefined}
                  secondaryCta={block.secondaryCta ? { text: String(block.secondaryCta.text ?? ''), link: String(block.secondaryCta.link ?? '') } : undefined}
                  backgroundImage={block.backgroundImage}
                  backgroundVideo={typeof block.backgroundVideo === 'string' ? block.backgroundVideo : undefined}
                />
              )
            case 'pageHero':
              return (
                <PageHeroBlock
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title ?? ''}
                  subtitle={block.subtitle}
                  cta={block.cta as { text: string; link: string } | undefined}
                  background={block.background as { type: 'color' | 'image' | 'video'; color?: string; image?: unknown; video?: unknown }}
                />
              )
            case 'serviceList':
              return (
                <ServiceListBlock
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title}
                  description={block.description}
                  layout={block.layout as 'grid' | 'list' | undefined}
                  services={block.services as any}
                  backgroundColor={block.backgroundColor}
                />
              )
            case 'servicesOverview':
              return (
                <ServicesOverview
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title}
                  description={block.description}
                  layout={block.layout as 'grid' | 'list' | undefined}
                  services={block.services as any}
                />
              )
            case 'featuredProjects':
              return (
                <FeaturedProjects
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title}
                  description={block.description}
                  layout={block.layout as 'grid' | 'carousel' | undefined}
                  projects={block.projects as any}
                />
              )
            case 'testimonials':
              return (
                <Testimonials
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title}
                  description={block.description}
                  layout={block.layout as 'grid' | 'carousel' | undefined}
                  testimonials={block.testimonials as any}
                />
              )
            case 'ctaSection':
              return (
                <CTASection
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title || ''}
                  description={block.description}
                  primaryCta={block.primaryCta as { text: string; link: string } | undefined}
                  secondaryCta={block.secondaryCta as { text: string; link: string } | undefined}
                  backgroundImage={block.backgroundImage}
                  backgroundColor={block.backgroundColor}
                />
              )
            case 'textImageBlock': {
              let textOrder = 'order-1'
              if (block.image && block.imagePosition !== 'right') {
                textOrder = 'order-2'
              }
              return (
                <FullScreenSection key={block._key || block._id || `${block._type}-${index}`}>
                  <div className="max-w-6xl mx-auto">
                    <div className="grid gap-12 lg:grid-cols-2">
                      {block.image && block.imagePosition === 'left' && (
                        <div className="order-1">
                          {/* Image component would go here */}
                        </div>
                      )}
                      <div className={textOrder}>
                        {block.title && <h2 className="text-4xl md:text-5xl font-black text-black mb-6 retro-text-shadow">{block.title}</h2>}
                        {Array.isArray(block.content) ? <RichTextRenderer content={block.content} /> : null}
                      </div>
                      {block.image && block.imagePosition === 'right' && (
                        <div className="order-2">
                          {/* Image component would go here */}
                        </div>
                      )}
                    </div>
                  </div>
                </FullScreenSection>
              )
            }
            case 'statsSection':
              return (
                <StatsSection
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title}
                  stats={block.stats as any}
                />
              )
            default:
              return null
          }
        })
      ) : (
        // Fallback if no pageBuilder
        <>
          {/* Hero Section */}
          <FullScreenSection background="gray">
            <div className="text-center max-w-3xl mx-auto bg-white border-3 border-black shadow-lg p-12">
              <h1 className="text-5xl md:text-7xl font-black text-black mb-6 retro-text-shadow">
                Our Services
              </h1>
              <p className="text-xl text-black font-bold">
                We offer a comprehensive range of digital services to help your business thrive in the modern world.
              </p>
            </div>
          </FullScreenSection>

          {/* Services Grid - fallback */}
          <FullScreenSection>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-black text-black mb-6 retro-text-shadow">What We Offer</h2>
              <p className="text-xl text-black max-w-2xl mx-auto font-bold">
                Comprehensive digital solutions tailored to your business needs
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="text-center p-8 bg-white border-4 border-black shadow-md">
                <p className="text-black font-bold">No services configured yet. Please set up your services page in Sanity Studio.</p>
              </div>
            </div>
          </FullScreenSection>
        </>
      )}
    </>
  )
}
