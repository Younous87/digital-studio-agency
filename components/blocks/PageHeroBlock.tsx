import React from 'react'
import { urlFor } from '@/lib/sanity/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import FullScreenSection from '../ui/FullScreenSection'
import AnimatedTitle from '../ui/AnimatedTitle'
import AnimatedSubtitle from '../ui/AnimatedSubtitle'

interface PageHeroBlockProps {
  readonly title: string
  readonly subtitle?: string
  readonly cta?: {
    readonly text: string
    readonly link: string
  }
  readonly background: {
    readonly type: 'color' | 'image' | 'video'
    readonly color?: string
    readonly image?: unknown
    readonly video?: unknown
  }
}

export default function PageHeroBlock({ title, subtitle, cta, background }: PageHeroBlockProps) {
  const getBackgroundStyle = () => {
    switch (background.type) {
      case 'color':
        return { backgroundColor: background.color || '#FFD23F' }
      case 'image':
        return {
          backgroundImage: background.image ? `url(${urlFor(background.image as any).url()})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      case 'video':
        return {} // Video is handled separately
      default:
        return {}
    }
  }

  return (
    <FullScreenSection
      background="transparent"
      className="relative overflow-hidden text-center"
      style={getBackgroundStyle()}
      minHeight="screen" // Set to full screen height for proper hero display
    >
      {/* Video Background */}
      {background.type === 'video' && background.video ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={(background.video as any)?.asset?.url} type={(background.video as any)?.asset?.mimeType} />
        </video>
      ) : null}

      {/* Pattern overlay */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)',
        }} />
      </div>

      {/* Dark overlay for better text readability on images/videos */}
      {(background.type === 'image' || background.type === 'video') && (
        <div className="absolute inset-0 bg-black bg-opacity-60 pointer-events-none"></div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-card border border-border shadow-lg p-8 md:p-12 inline-block ">
          <AnimatedTitle
            text={title}
            as="h1"
            className="text-5xl md:text-7xl font-black text-foreground mb-6"
            wordsPerGroup={2}
            gradientStartGroup={1}
            gradientInterval={2}
          />
          {subtitle && (
            <AnimatedSubtitle
              text={subtitle}
              as="p"
              className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto font-bold"
              wordsPerGroup={3}
              gradientStartGroup={1}
              gradientInterval={2}
            />
          )}
          {cta?.text && cta?.link && (
            <Button variant="default" size="lg" asChild>
              <Link href={cta.link}>
                {cta.text}
              </Link>
            </Button>
          )}
        </div>
      </div>
    </FullScreenSection>
  )
}