'use client'

import { useEffect, useState, useRef } from 'react'
import FullScreenSection from '../ui/FullScreenSection'
import { Card } from '../retroui/Card'
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
    <FullScreenSection background="dark">
      <div ref={sectionRef} className="relative">
        {/* Pattern background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 20px, white 20px, white 21px), repeating-linear-gradient(90deg, transparent, transparent 20px, white 20px, white 21px)',
          }} />
        </div>

        {title && (
          <h2 className="text-3xl md:text-5xl font-black text-center mb-16 text-white retro-text-shadow relative">
            {title}
          </h2>
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 relative">
          {stats.map((stat, index) => {
            const Icon = stat.icon ? iconMap[stat.icon] : null

            return (
              <Card 
                key={`stat-${stat.label}-${index}`}
                className="text-center bg-white border-4 border-black shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <Card.Content className="p-6">
                  {Icon && (
                    <div className="flex justify-center mb-4">
                      <div className="p-3 bg-[var(--brand-accent)] border-3 border-black -rotate-6">
                        <Icon className="w-8 h-8 text-black" strokeWidth={3} />
                      </div>
                    </div>
                  )}
                  {!isVisible ? (
                    <div className="h-12 w-24 mx-auto mb-2 bg-gray-200 animate-pulse rounded" />
                  ) : (
                    <div className="text-5xl md:text-6xl font-black mb-2 text-black">
                      {animatedValues[index] || stat.value}
                    </div>
                  )}
                  <div className="text-lg md:text-xl font-bold mb-2 text-gray-900">
                    {stat.label}
                  </div>
                  {stat.description && (
                    <p className="text-sm text-gray-700">
                      {stat.description}
                    </p>
                  )}
                </Card.Content>
              </Card>
            )
          })}
        </div>
      </div>
    </FullScreenSection>
  )
}
