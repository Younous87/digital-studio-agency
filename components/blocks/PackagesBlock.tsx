'use client'

import { useState } from 'react'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import AnimatedSubtitle from '@/components/ui/AnimatedSubtitle'

interface PackageFeature {
  _key?: string
  feature: string
}

interface PackagesBlockProps {
  title?: string
  highlightedText?: string
  description?: string
  features?: PackageFeature[]
  ctaText?: string
  ctaLink?: string
  backgroundImage?: any
  backgroundColor?: {
    hex: string
    hsl: { h: number; s: number; l: number; a: number }
  }
}

// Default features if none provided from Sanity
const defaultFeatures: PackageFeature[] = [
  { feature: 'Custom Logo Design & Variations' },
  { feature: 'Complete Brand Identity System' },
  { feature: 'Brand Guidelines & Style Guide' },
  { feature: 'Business Cards & Stationery Design' },
  { feature: 'Responsive Website Design (5-15 Pages)' },
  { feature: 'Mobile-First Approach' },
  { feature: 'UI/UX Research & Strategy' },
  { feature: 'Custom Illustrations & Graphics' },
  { feature: 'SEO Optimization' },
  { feature: 'Content Management System Integration' },
  { feature: 'Performance Optimization' },
  { feature: 'Cross-Browser Compatibility' },
  { feature: 'Social Media Templates' },
  { feature: 'Email Newsletter Design' },
  { feature: 'Unlimited Revision Rounds' },
  { feature: 'Ongoing Support & Maintenance Options' },
  { feature: 'Training & Documentation' },
  { feature: 'Analytics & Tracking Setup' },
  { feature: 'Document Digitization & Digital Workflow Setup' },
  { feature: 'Business Process Automation Consulting' },
]

// Separate component for features list with hover animation
function FeaturesListWithHover({ features }: Readonly<{ features: PackageFeature[] }>) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <ul className="space-y-0 relative">
      {features.map((item, index) => (
        <li
          key={item._key || index}
          className={`flex items-center gap-5 lg:gap-6 py-5 lg:py-6 transition-all duration-300 ease-out ${
            index === features.length - 1 ? '' : 'border-b border-border'
          } ${hoveredIndex === index ? 'bg-muted/30 scale-[1.02]' : ''}`}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <div className="shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full flex items-center justify-center transition-all duration-300">
            <Check className={`w-6 h-6 lg:w-7 lg:h-7 text-pink-600 transition-all duration-300 ${
              hoveredIndex === index ? 'scale-110' : ''
            }`} />
          </div>
          <span className={`text-lg lg:text-xl transition-all duration-300 ease-out ${
            hoveredIndex === index
              ? 'text-foreground font-semibold transform translate-x-1'
              : 'text-foreground font-medium'
          }`}>
            {item.feature}
          </span>
        </li>
      ))}
    </ul>
  )
}

export default function PackagesBlock({
  title = 'What',
  highlightedText = 'You Get',
  description,
  features = defaultFeatures,
  ctaText = 'Get Started',
  ctaLink = '/contact',
  backgroundImage,
  backgroundColor
}: Readonly<PackagesBlockProps>) {
  const bgColor = backgroundColor?.hex || undefined

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection 
        background={backgroundImage ? 'transparent' : 'white'}
        minHeight="auto"
        className="py-24 lg:py-32"
        style={bgColor && !backgroundImage ? { backgroundColor: bgColor } : undefined}
        containerSize="2xl"
      >
        {/* Section Title */}
        <div className="text-center mb-16 lg:mb-24">
          <AnimatedTitle
            text={`${title} ${highlightedText}`}
            as="h2"
            className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground"
          />
          {description && (
            <AnimatedSubtitle
              text={description}
              as="p"
              className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto mt-6"
            />
          )}
        </div>

        {/* Features Card */}
        <Card className="w-full p-8 md:p-12 lg:p-16 border border-border shadow-xl bg-card">
          <FeaturesListWithHover features={features} />

          {/* CTA Button */}
          <div className="text-center mt-12 lg:mt-16">
            <Button asChild size="lg" className="px-12 lg:px-16 py-6 lg:py-8 text-lg lg:text-xl">
              <Link href={ctaLink}>
                {ctaText}
              </Link>
            </Button>
          </div>
        </Card>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
