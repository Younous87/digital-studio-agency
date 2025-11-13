'use client'

import { useEffect, useState, useRef } from 'react'
import Section from '../ui/Section'
import { Card, CardContent } from '../ui/Card'
import { Skeleton } from '../ui/skeleton'
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
}

const iconMap = {
  trending: TrendingUp,
  users: Users,
  award: Award,
  briefcase: Briefcase,
}

export default function AnimatedStats({ title, stats }: Readonly<AnimatedStatsProps>) {
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
    <Section background="dark">
      <div ref={sectionRef}>
        {title && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon ? iconMap[stat.icon] : null

            return (
              <Card 
                key={`stat-${stat.label}-${index}`}
                className="text-center bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105"
              >
                <CardContent className="p-6">
                  {Icon && (
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-brand-accent-10 rounded-full">
                        <Icon className="w-8 h-8 text-brand-accent" />
                      </div>
                    </div>
                  )}
                  {!isVisible ? (
                    <Skeleton className="h-12 w-24 mx-auto mb-2 bg-white/20" />
                  ) : (
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                      {animatedValues[index] || stat.value}
                    </div>
                  )}
                  <div className="text-lg md:text-xl font-semibold mb-2 text-white/90">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-sm text-gray-300 opacity-90">
                      {stat.description}
                    </p>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </Section>
  )
}
