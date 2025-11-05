import Image from 'next/image'
import Button from '../ui/Button'
import { urlFor } from '@/lib/sanity/image'

interface HeroBlockProps {
  headline: string
  subheadline?: string
  cta?: {
    text: string
    link: string
  }
  secondaryCta?: {
    text: string
    link: string
  }
  backgroundImage?: any
  backgroundVideo?: string
}

export default function HeroBlock({
  headline,
  subheadline,
  cta,
  secondaryCta,
  backgroundImage,
  backgroundVideo
}: HeroBlockProps) {
  return (
    <section className="relative min-h-[600px] md:min-h-[700px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {backgroundVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <Image
          src={urlFor(backgroundImage).width(1920).url()}
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-700" />
      )}
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />
      
      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 animate-fade-in">
          {headline}
        </h1>
        {subheadline && (
          <p className="text-xl md:text-2xl mb-8 text-gray-100 max-w-3xl mx-auto">
            {subheadline}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {cta && (
            <Button href={cta.link} size="lg" variant="primary">
              {cta.text}
            </Button>
          )}
          {secondaryCta && (
            <Button href={secondaryCta.link} size="lg" variant="outline">
              {secondaryCta.text}
            </Button>
          )}
        </div>
      </div>
    </section>
  )
}
