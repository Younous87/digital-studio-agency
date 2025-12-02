'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'

interface PackageFeature {
  _key?: string
  feature: string
}

interface PackagesBlockProps {
  title?: string
  highlightedText?: string
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

export default function PackagesBlock({
  title = 'What',
  highlightedText = 'You Get',
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
        </div>

        {/* Features Card */}
        <Card className="max-w-5xl mx-auto p-8 md:p-12 lg:p-16 border border-border shadow-xl bg-card">
          <ul className="space-y-0">
            {features.map((item, index) => (
              <li
                key={item._key || index}
                className={`flex items-center gap-5 lg:gap-6 py-5 lg:py-6 ${
                  index !== features.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex-shrink-0 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
                </div>
                <span className="text-lg lg:text-xl text-foreground font-medium">
                  {item.feature}
                </span>
              </li>
            ))}
          </ul>

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
