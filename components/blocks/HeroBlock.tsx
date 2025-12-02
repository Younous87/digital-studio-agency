'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight } from 'lucide-react'
import BackgroundWrapper from './BackgroundWrapper'
import LiquidEther from '@/components/LiquidEther'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import AnimatedSubtitle from '@/components/ui/AnimatedSubtitle'

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
        <div className={`relative z-10 text-center px-4 lg:px-8 max-w-7xl mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Main Headline */}
          <AnimatedTitle
            text={headline}
            as="h1"
            className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-black mb-10 lg:mb-12 leading-none tracking-tight text-foreground"
          />

          {subheadline && (
            <AnimatedSubtitle
              text={subheadline}
              as="p"
              className="text-xl md:text-3xl lg:text-4xl mb-14 lg:mb-16 text-muted-foreground max-w-5xl mx-auto leading-relaxed font-medium"
            />
          )}

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 justify-center items-center mb-16 animate-fade-in">
            {cta && (
              <Button variant="default" size="lg" className="group text-lg lg:text-xl px-10 lg:px-14 py-6 lg:py-8" asChild>
                <Link href={cta.link}>
                  {cta.text}
                  <ArrowRight className="ml-3 w-6 h-6 lg:w-8 lg:h-8 inline group-hover:translate-x-2 transition-transform" />
                </Link>
              </Button>
            )}
            {secondaryCta && (
              <Button variant="outline" size="lg" asChild className="text-lg lg:text-xl px-10 lg:px-14 py-6 lg:py-8">
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
