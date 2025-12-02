'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight } from 'lucide-react'
import BackgroundWrapper from './BackgroundWrapper'
import LiquidEther from '@/components/LiquidEther'

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
  sectionBackgroundImage?: any
  useLiquidEther?: boolean
  liquidEtherColors?: string[]
}

export default function HeroBlock({
  headline,
  subheadline,
  cta,
  secondaryCta,
  backgroundImage,
  backgroundVideo,
  sectionBackgroundImage,
  useLiquidEther = true,
  liquidEtherColors = ['#5227FF', '#FF9FFC', '#B19EEF']
}: Readonly<HeroBlockProps>) {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <BackgroundWrapper backgroundImage={sectionBackgroundImage}>
      <section className={`relative min-h-screen flex items-center justify-center overflow-hidden ${sectionBackgroundImage ? 'bg-transparent' : 'bg-background'}`}>
        {/* LiquidEther Background */}
        {useLiquidEther && (
          <div className="absolute inset-0 w-full h-full">
            <LiquidEther
              colors={liquidEtherColors}
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
              className="pointer-events-auto"
            />
          </div>
        )}

        {/* Optional Background Image/Video (fallback when LiquidEther is disabled) */}
        {!useLiquidEther && (backgroundVideo || backgroundImage) && (
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative w-full max-w-4xl h-96 rounded-lg overflow-hidden">
              {backgroundVideo && (
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover opacity-20"
                >
                  <source src={backgroundVideo} type="video/mp4" />
                </video>
              )}
              {!backgroundVideo && backgroundImage && (
                <Image
                  src={urlFor(backgroundImage).width(1920).url()}
                  alt="Hero background"
                  fill
                  className="object-cover opacity-20"
                  priority
                />
              )}
            </div>
          </div>
        )}

        {/* Content */}
        <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tight text-foreground">
            {headline}
          </h1>

          {subheadline && (
            <p className="text-xl md:text-3xl mb-12 text-muted-foreground max-w-4xl mx-auto leading-relaxed font-medium">
              {subheadline}
            </p>
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in">
            {cta && (
              <Button variant="default" size="lg" className="group" asChild>
                <Link href={cta.link}>
                  {cta.text}
                  <ArrowRight className="ml-3 w-6 h-6 inline group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
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
      </section>
    </BackgroundWrapper>
  )
}
