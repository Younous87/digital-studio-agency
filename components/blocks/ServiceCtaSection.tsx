import React from 'react'
import { Button } from '@/components/retroui/Button'
import Link from 'next/link'
import FullScreenSection from '@/components/ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'

interface ServiceCtaSectionProps {
  title?: string
  description?: string
  buttonText?: string
  buttonLink?: string
  backgroundImage?: any
}

export default function ServiceCtaSection({
  title,
  description,
  buttonText,
  buttonLink,
  backgroundImage
}: Readonly<ServiceCtaSectionProps>) {
  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection
        background="transparent"
        minHeight="auto"
        verticalAlign="center"
        horizontalAlign="center"
        className="py-20"
      >
        <div className="max-w-3xl mx-auto text-center">
          <div className={`p-12 border-4 border-black shadow-lg ${backgroundImage ? 'bg-white bg-opacity-95' : 'bg-white'}`}>
            {title && (
              <h2 className="text-3xl md:text-4xl font-black mb-4 retro-text-shadow">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl mb-8 font-bold text-black">
                {description}
              </p>
            )}
            {buttonText && buttonLink && (
              <Button asChild size="lg">
                <Link href={buttonLink}>
                  {buttonText}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}