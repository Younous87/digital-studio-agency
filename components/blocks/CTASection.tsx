import { Button } from '@/components/retroui/Button'
import Link from 'next/link'
import FullScreenSection from '../ui/FullScreenSection'
import { ArrowRight } from 'lucide-react'
import ConfettiButton from '../ui/ConfettiButton'
import BackgroundWrapper from './BackgroundWrapper'

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
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection background="transparent" className="relative overflow-hidden border-y-4 border-black">
        {/* Retro Background - only if no background image */}
        {!backgroundImage && <div className="absolute inset-0 pattern-grid opacity-10" />}

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-32 h-32 bg-brand-tertiary border-3 border-black rounded-full opacity-30 animate-bounce-in" />
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-brand-accent border-4 border-black rotate-12 opacity-30 animate-slide-in-right" />
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-brand-secondary border-3 border-black -rotate-12 opacity-20" />
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">


          <h2 className="text-5xl md:text-7xl font-black mb-8 text-foreground leading-none retro-text-shadow">
            {title}
          </h2>

          {description && (
            <p className="text-xl md:text-2xl mb-12 text-foreground font-bold max-w-3xl mx-auto bg-white/80 backdrop-blur-sm border-2 border-black rounded-2xl p-6 md:p-8 shadow-lg">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {primaryCta && (
              <Link href={primaryCta.link}>
                <ConfettiButton variant="default" size="lg" className="group">
                  {primaryCta.text}
                  <ArrowRight className="ml-3 w-6 h-6 inline group-hover:translate-x-2 transition-transform" strokeWidth={3} />
                </ConfettiButton>
              </Link>
            )}
            {secondaryCta && (
              <Button variant="outline" size="lg" asChild>
                <Link href={secondaryCta.link}>
                  {secondaryCta.text}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
