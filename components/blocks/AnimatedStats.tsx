'use client'

import { useEffect, useState, useRef } from 'react'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Users, Award, Briefcase } from 'lucide-react'

interface Stat {
  value: string
  label: string
  description?: string
  icon?: 'trending' | 'users' | 'award' | 'briefcase'
}

interface AnimatedStatsProps {
  title?: string
  stats: Stat[]
  backgroundImage?: any
}

const iconMap = {
  trending: TrendingUp,
  users: Users,
  award: Award,
  briefcase: Briefcase,
}

export default function AnimatedStats({ title, stats, backgroundImage }: Readonly<AnimatedStatsProps>) {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<string[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    // Animate numbers
    const duration = 2000 // 2 seconds
    const steps = 60
    const stepDuration = duration / steps

    stats.forEach((stat, index) => {
      const numericMatch = stat.value.match(/(\d+)/)
      if (!numericMatch) {
        setAnimatedValues(prev => {
          const newValues = [...prev]
          newValues[index] = stat.value
          return newValues
        })
        return
      }

      const targetValue = parseInt(numericMatch[1] || '0')
      const suffix = stat.value.replace(/\d+/, '')
      let currentStep = 0

      const interval = setInterval(() => {
        currentStep++
        const progress = currentStep / steps
        const easeOutQuad = 1 - Math.pow(1 - progress, 3)
        const currentValue = Math.floor(targetValue * easeOutQuad)

        setAnimatedValues(prev => {
          const newValues = [...prev]
          newValues[index] = currentValue + suffix
          return newValues
        })

        if (currentStep >= steps) {
          clearInterval(interval)
          setAnimatedValues(prev => {
            const newValues = [...prev]
            newValues[index] = stat.value
            return newValues
          })
        }
      }, stepDuration)
    })
  }, [isVisible, stats])

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection background={backgroundImage ? 'transparent' : 'dark'}>
        <div ref={sectionRef} className="relative">
          {/* Pattern background - only show if no background image */}
          {!backgroundImage && (
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, white 20px, white 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, white 20px, white 21px)',
              }} />
            </div>
          )}

          {title && (
            <h2 className="text-3xl md:text-5xl font-bold text-center mb-16 text-primary-foreground relative">
              {title}
            </h2>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
            {stats.map((stat, index) => {
              const Icon = stat.icon ? iconMap[stat.icon] : null

              return (
                <Card 
                  key={`stat-${stat.label}-${index}`}
                  className="text-center border border-border shadow-sm"
                >
                  <CardContent className="p-6">
                    {Icon && (
                      <div className="flex justify-center mb-4">
                        <div className="p-3 bg-accent border border-border rounded-lg">
                          <Icon className="w-8 h-8 text-accent-foreground" />
                        </div>
                      </div>
                    )}
                    {!isVisible ? (
                      <div className="h-12 w-24 mx-auto mb-2 bg-muted animate-pulse rounded" />
                    ) : (
                      <div className="text-5xl md:text-6xl font-bold mb-2 text-foreground">
                        {animatedValues[index] || stat.value}
                      </div>
                    )}
                    <div className="text-lg md:text-xl font-semibold mb-2 text-foreground">
                      {stat.label}
                    </div>
                    {stat.description && (
                      <p className="text-sm text-muted-foreground">
                        {stat.description}
                      </p>
                    )}
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
