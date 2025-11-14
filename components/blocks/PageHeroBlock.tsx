import React from 'react'
import { urlFor } from '@/lib/sanity/image'

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
        return { backgroundColor: background.color || '#f3f4f6' }
      case 'image':
        return {
          backgroundImage: background.image ? `url(${urlFor(background.image).url()})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }
      default:
        return {}
    }
  }

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center text-center" style={getBackgroundStyle()}>
      {background.type === 'video' && background.video && (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={background.video.asset?.url} type={background.video.asset?.mimeType} />
        </video>
      )}

      {/* Overlay for better text readability */}
      {(background.type === 'image' || background.type === 'video') && (
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        {cta?.text && cta?.link && (
          <a
            href={cta.link}
            className="inline-block bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            {cta.text}
          </a>
        )}
      </div>
    </section>
  )
}