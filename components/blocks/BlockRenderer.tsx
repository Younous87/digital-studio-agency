import React from 'react'
import FullScreenSection from '@/components/ui/FullScreenSection'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import HeroBlock from '@/components/blocks/HeroBlock'
import PageHeroBlock from '@/components/blocks/PageHeroBlock'
import ProjectGrid from '@/components/blocks/ProjectGrid'
import ServicesOverview from '@/components/blocks/ServicesGrid'
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
  projects?: Array<Record<string, unknown>>
  services?: Array<Record<string, unknown>>
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

interface BlockRendererProps {
  block: PageBlock
  index: number
}

export default function BlockRenderer({ block, index }: BlockRendererProps) {
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
    case 'featuredProjects':
      return (
        <ProjectGrid
          key={block._key || block._id || `${block._type}-${index}`}
          title={block.title}
          description={block.description}
          layout={block.layout as 'grid' | 'masonry' | 'carousel' | undefined}
          projects={block.projects as any}
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
      const hasImage = !!block.image
      const isRightPosition = block.imagePosition === 'right'
      let textOrder = 'order-1'
      if (hasImage) {
        textOrder = isRightPosition ? 'order-1' : 'order-2'
      }
      return (
        <FullScreenSection key={block._key || block._id || `${block._type}-${index}`}>
          <div className="max-w-6xl mx-auto">
            <div className="grid gap-12 lg:grid-cols-2">
              {hasImage && block.imagePosition === 'left' && (
                <div className="order-1">
                  {/* Image component would go here */}
                </div>
              )}
              <div className={textOrder}>
                {block.title && <h2 className="text-4xl md:text-5xl font-black text-black mb-6 retro-text-shadow">{block.title}</h2>}
                {Array.isArray(block.content) ? <RichTextRenderer content={block.content} /> : null}
              </div>
              {hasImage && block.imagePosition === 'right' && (
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
    case 'aboutSection':
      return (
        <FullScreenSection key={block._key || block._id || `${block._type}-${index}`}>
          <div className="max-w-4xl mx-auto">
            {block.title && <h2 className="text-4xl md:text-5xl font-black text-black mb-6 text-center retro-text-shadow">{block.title}</h2>}
            {Array.isArray(block.content) ? <RichTextRenderer content={block.content} /> : null}
          </div>
        </FullScreenSection>
      )
    default:
      return null
  }
}
