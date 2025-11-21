import Image from 'next/image'
import { Button } from '../ui/Button'
import FullScreenSection from '../ui/FullScreenSection'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import ConfettiButton from '../ui/ConfettiButton'

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
}: Readonly<CTASectionProps>) {
  return (
    <FullScreenSection background="transparent" className="relative overflow-hidden border-y-4 border-black">
      {/* Retro Background */}
      <div className="absolute inset-0 pattern-grid opacity-10" />

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-32 h-32 bg-brand-tertiary border-3 border-black rounded-full opacity-30 animate-bounce-in" />
        <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-accent border-4 border-black rotate-12 opacity-30 animate-slide-in-right" />
        <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-brand-secondary border-3 border-black -rotate-12 opacity-20" />
      </div>

      {backgroundImage && (
        <Image
          src={urlFor(backgroundImage).width(1920).url()}
          alt="CTA background"
          fill
          className="object-cover opacity-10"
        />
      )}

      {/* Content */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6 px-6 py-3 bg-brand-secondary border-3 border-black rounded-full shadow-brutal animate-bounce-in">
          <Sparkles className="w-5 h-5 text-black" strokeWidth={3} />
          <span className="font-black text-black text-sm uppercase tracking-wide">
            Let's Work Together
          </span>
        </div>

        <h2 className="text-5xl md:text-7xl font-black mb-8 text-foreground leading-none">
          {title}
        </h2>

        {description && (
          <p className="text-xl md:text-2xl mb-12 text-foreground font-bold max-w-3xl mx-auto bg-white border-3 border-black rounded-2xl p-6 md:p-8 shadow-brutal-lg">
            {description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          {primaryCta && (
            <ConfettiButton variant="default" size="lg" asChild>
              <a href={primaryCta.link} className="text-xl group">
                {primaryCta.text}
                <ArrowRight className="ml-3 w-6 h-6 inline group-hover:translate-x-2 transition-transform" strokeWidth={3} />
              </a>
            </ConfettiButton>
          )}
          {secondaryCta && (
            <Button variant="outline" size="lg" asChild>
              <a href={secondaryCta.link} className="text-xl">
                {secondaryCta.text}
              </a>
            </Button>
          )}
        </div>
      </div>
    </FullScreenSection>
  )
}
