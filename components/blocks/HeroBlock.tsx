'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Button } from '@/components/retroui/Button'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight, Sparkles, Zap, TrendingUp, Star } from 'lucide-react'

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
}: Readonly<HeroBlockProps>) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentBadge, setCurrentBadge] = useState(0)

  const badges = [
    { icon: Sparkles, text: "Award-Winning Design", color: "bg-brand-secondary" },
    { icon: Zap, text: "Lightning Fast", color: "bg-brand-accent" },
    { icon: TrendingUp, text: "Results-Driven", color: "bg-brand-tertiary" }
  ]

  useEffect(() => {
    setIsLoaded(true)
    const interval = setInterval(() => {
      setCurrentBadge((prev) => (prev + 1) % badges.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [badges.length])

  const CurrentBadgeIcon = badges[currentBadge]?.icon || Sparkles

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background border-b-3 border-black">
      {/* Retro Pattern Background */}
      <div className="absolute inset-0 pattern-dots opacity-10" />

      {/* Decorative shapes - Neo-brutalist style */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-brand-secondary border-2 border-black rounded-full shadow-lg animate-bounce-in hidden md:block" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-brand-accent border-2 border-black rotate-12 shadow-xl animate-slide-in-left hidden md:block" />
      <div className="absolute top-40 left-1/4 w-24 h-24 bg-brand-tertiary border-2 border-black -rotate-12 shadow-md hidden md:block" />

      {/* Optional Background Image/Video with brutalist frame */}
      {(backgroundVideo || backgroundImage) && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full max-w-4xl h-96 border-3 border-black rounded-2xl overflow-hidden shadow-xl">
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
            <div className="absolute inset-0 bg-gradient-retro-multi opacity-30" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className={`relative z-10 text-center px-4 max-w-6xl mx-auto transition-all duration-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>

        {/* Main Headline - Retro typography */}
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-none tracking-tight">
          <span className="inline-block animate-slide-in-bottom">
            {headline.split(' ').map((word, i) => {
              const colors = ['text-foreground', 'text-brand-primary', 'text-brand-secondary', 'text-brand-accent']
              return (
                <span
                  key={`${word}-${i}`}
                  className={`${colors[i % colors.length]} inline-block mr-3 md:mr-4`}
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    textShadow: '4px 4px 0px rgba(0,0,0,0.1)'
                  }}
                >
                  {word}
                </span>
              )
            })}
          </span>
        </h1>

        {subheadline && (
          <p className="text-xl md:text-3xl mb-12 text-foreground max-w-4xl mx-auto leading-relaxed font-bold animate-fade-in border-2 border-black bg-white p-6 md:p-8 rounded-2xl shadow-lg">
            {subheadline}
          </p>
        )}

        {/* CTA Buttons - Neo-brutalist style */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-slide-in-bottom">
          {cta && (
            <Button variant="default" size="lg" className="group" asChild>
              <Link href={cta.link}>
                {cta.text}
                <ArrowRight className="ml-3 w-6 h-6 inline group-hover:translate-x-2 transition-transform" strokeWidth={3} />
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
  )
}
