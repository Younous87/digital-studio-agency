'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Button from '../ui/Button'
import { Badge } from '../ui/badge'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight, Sparkles, Zap, TrendingUp } from 'lucide-react'

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
    { icon: Sparkles, text: "Award-Winning Design" },
    { icon: Zap, text: "Lightning Fast Delivery" },
    { icon: TrendingUp, text: "Results-Driven" }
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
    <section className="relative min-h-[650px] md:min-h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background */}
      {backgroundVideo ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-105"
        >
          <source src={backgroundVideo} type="video/mp4" />
        </video>
      ) : backgroundImage ? (
        <Image
          src={urlFor(backgroundImage).width(1920).url()}
          alt="Hero background"
          fill
          className="object-cover scale-105"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-linear-to-br from-blue-600 via-purple-600 to-pink-600" />
      )}
      
      {/* Animated gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-tr from-black/60 via-black/40 to-transparent" />
      
      {/* Floating shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Content */}
      <div className={`relative z-10 text-center text-white px-4 max-w-5xl mx-auto transition-all duration-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}>
        {/* Rotating badge */}
        <div className="flex justify-center mb-6">
          <Badge 
            variant="secondary" 
            className="bg-white/20 backdrop-blur-md text-white border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white/30 transition-all duration-300"
          >
            <CurrentBadgeIcon className="w-4 h-4 mr-2 inline animate-pulse" />
            {badges[currentBadge]?.text}
          </Badge>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-blue-100 to-purple-100 animate-gradient">
            {headline}
          </span>
        </h1>
        
        {subheadline && (
          <p className="text-xl md:text-2xl mb-10 text-gray-100 max-w-3xl mx-auto leading-relaxed font-light">
            {subheadline}
          </p>
        )}
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {cta && (
            <Button 
              href={cta.link} 
              size="lg" 
              variant="primary"
              className="group shadow-xl hover:shadow-2xl transition-all duration-300 bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg"
            >
              {cta.text}
              <ArrowRight className="ml-2 w-5 h-5 inline group-hover:translate-x-1 transition-transform" />
            </Button>
          )}
          {secondaryCta && (
            <Button 
              href={secondaryCta.link} 
              size="lg" 
              variant="outline"
              className="border-2 border-white/40 backdrop-blur-sm hover:bg-white/10 text-white px-8 py-6 text-lg"
            >
              {secondaryCta.text}
            </Button>
          )}
        </div>

        {/* Trust indicators */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-sm text-white/80">
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white" />
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white" />
            </div>
            <span className="font-semibold">500+ Happy Clients</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-400" />
            <span className="font-semibold">4.9/5 Rating</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-blue-400" />
            <span className="font-semibold">24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full" />
        </div>
      </div>
    </section>
  )
}
