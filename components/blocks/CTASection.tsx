import Image from 'next/image'
import Button from '../ui/Button'
import Section from '../ui/Section'
import { urlFor } from '@/lib/sanity/image'

interface CTASectionProps {
  title: string
  description?: string
  primaryCta?: {
    text: string
    link: string
  }
  secondaryCta?: {
    text: string
    link: string
  }
  backgroundImage?: any
  backgroundColor?: { hex?: string }
}

export default function CTASection({
  title,
  description,
  primaryCta,
  secondaryCta,
  backgroundImage,
  backgroundColor
}: CTASectionProps) {
  return (
    <Section padding="xl" className="relative overflow-hidden">
      {/* Background */}
      {backgroundImage ? (
        <>
          <Image
            src={urlFor(backgroundImage).width(1920).url()}
            alt="CTA background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </>
      ) : (
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundColor: backgroundColor?.hex || '#1e40af' 
          }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          {title}
        </h2>
        {description && (
          <p className="text-xl mb-8 text-gray-100">
            {description}
          </p>
        )}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {primaryCta && (
            <Button href={primaryCta.link} size="lg" variant="primary">
              {primaryCta.text}
            </Button>
          )}
          {secondaryCta && (
            <Button href={secondaryCta.link} size="lg" variant="outline">
              {secondaryCta.text}
            </Button>
          )}
        </div>
      </div>
    </Section>
  )
}
