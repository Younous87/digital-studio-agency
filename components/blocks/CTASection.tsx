import { Button } from '@/components/ui/button'
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
      <FullScreenSection background="transparent" className="relative overflow-hidden">
        {/* Content */}
        <div className="relative z-10 text-center max-w-5xl mx-auto">
          <h2 className="text-5xl md:text-7xl font-black mb-8 text-foreground leading-none">
            {title}
          </h2>

          {description && (
            <p className="text-xl md:text-2xl mb-12 text-muted-foreground font-medium max-w-3xl mx-auto">
              {description}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            {primaryCta && (
              <Link href={primaryCta.link}>
                <ConfettiButton variant="default" size="lg" className="group">
                  {primaryCta.text}
                  <ArrowRight className="ml-3 w-6 h-6 inline group-hover:translate-x-2 transition-transform" />
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
