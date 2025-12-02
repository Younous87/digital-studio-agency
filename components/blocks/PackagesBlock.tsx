'use client'

import { Check } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'

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
        className="py-24"
        style={bgColor && !backgroundImage ? { backgroundColor: bgColor } : undefined}
      >
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-black text-foreground">
            {title}{' '}
            <span className="text-primary">{highlightedText}</span>
          </h2>
        </div>

        {/* Features Card */}
        <Card className="max-w-4xl mx-auto p-8 md:p-12 border border-border shadow-lg bg-card">
          <ul className="space-y-0">
            {features.map((item, index) => (
              <li
                key={item._key || index}
                className={`flex items-center gap-4 py-4 ${
                  index !== features.length - 1 ? 'border-b border-border' : ''
                }`}
              >
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                  <Check className="w-5 h-5 text-primary" />
                </div>
                <span className="text-lg text-foreground font-medium">
                  {item.feature}
                </span>
              </li>
            ))}
          </ul>

          {/* CTA Button */}
          <div className="text-center mt-10">
            <Button asChild size="lg" className="px-10">
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
