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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background border-b-4 border-black">
      {/* Retro Pattern Background */}
      <div className="absolute inset-0 pattern-dots opacity-10" />

      {/* Decorative shapes - Neo-brutalist style */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-brand-secondary border-4 border-black rounded-full shadow-lg animate-bounce-in hidden md:block" />
      <div className="absolute bottom-20 left-10 w-40 h-40 bg-brand-accent border-4 border-black rotate-12 shadow-xl animate-slide-in-left hidden md:block" />
      <div className="absolute top-40 left-1/4 w-24 h-24 bg-brand-tertiary border-4 border-black -rotate-12 shadow-md hidden md:block" />

      {/* Optional Background Image/Video with brutalist frame */}
      {(backgroundVideo || backgroundImage) && (
        <div className="absolute inset-0 flex items-center justify-center p-8">
          <div className="relative w-full max-w-4xl h-96 border-4 border-black rounded-2xl overflow-hidden shadow-xl">
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
        {/* Rotating badge */}
        <div className="flex justify-center mb-8 animate-bounce-in">
          <div className={`${badges[currentBadge]?.color} border-3 border-black px-6 py-2 rounded-full shadow-sm flex items-center gap-2 transition-all duration-300 hover-lift`}>
            <CurrentBadgeIcon className="w-5 h-5 text-black animate-pulse" strokeWidth={2.5} />
            <span className="font-black text-black text-sm uppercase tracking-wide">
              {badges[currentBadge]?.text}
            </span>
          </div>
        </div>

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
          <p className="text-xl md:text-3xl mb-12 text-foreground max-w-4xl mx-auto leading-relaxed font-bold animate-fade-in border-4 border-black bg-white p-6 md:p-8 rounded-2xl shadow-lg">
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

        {/* Trust indicators - Retro style */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto animate-fade-in">
          <div className="bg-brand-secondary border-3 border-black rounded-xl p-6 shadow-md hover-lift">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full bg-brand-primary border-3 border-black flex items-center justify-center text-white font-black">
                  50
                </div>
                <div className="w-10 h-10 rounded-full bg-brand-accent border-3 border-black flex items-center justify-center text-black font-black">
                  0+
                </div>
              </div>
            </div>
            <p className="font-black text-black text-lg">Happy Clients</p>
          </div>

          <div className="bg-brand-accent border-3 border-black rounded-xl p-6 shadow-md hover-lift">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Star className="w-6 h-6 fill-black text-black" strokeWidth={2} />
              <Star className="w-6 h-6 fill-black text-black" strokeWidth={2} />
              <Star className="w-6 h-6 fill-black text-black" strokeWidth={2} />
              <Star className="w-6 h-6 fill-black text-black" strokeWidth={2} />
              <Star className="w-6 h-6 fill-black text-black" strokeWidth={2} />
            </div>
            <p className="font-black text-black text-lg">4.9/5 Rating</p>
          </div>

          <div className="bg-brand-tertiary border-3 border-black rounded-xl p-6 shadow-md hover-lift">
            <div className="flex items-center justify-center mb-2">
              <Zap className="w-12 h-12 text-black" strokeWidth={2.5} />
            </div>
            <p className="font-black text-black text-lg">24/7 Support</p>
          </div>
        </div>
      </div>
    </section>
  )
}
