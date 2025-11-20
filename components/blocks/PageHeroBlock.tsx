import React from 'react'
import { urlFor } from '@/lib/sanity/image'
import Button from '../ui/Button'

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
    <section className="relative min-h-[60vh] flex items-center justify-center text-center overflow-hidden" style={getBackgroundStyle()}>
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
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(0,0,0,0.1) 20px, rgba(0,0,0,0.1) 21px)',
        }} />
      </div>

      {/* Dark overlay for better text readability on images/videos */}
      {(background.type === 'image' || background.type === 'video') && (
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
      )}

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white border-4 border-black shadow-brutal-lg p-8 md:p-12 inline-block rotate-1">
          <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-6 retro-text-shadow">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto font-bold">
              {subtitle}
            </p>
          )}
          {cta?.text && cta?.link && (
            <Button
              href={cta.link}
              variant="default"
              className="text-lg font-black"
            >
              {cta.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}