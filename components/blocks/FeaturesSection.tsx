import React from 'react'
import { Card } from '@/components/ui/card'
import FullScreenSection from '@/components/ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import AnimatedTitle from '@/components/ui/AnimatedTitle'

interface Feature {
  title: string
  description: string
  icon?: any
}

interface FeaturesSectionProps {
  title?: string
  features?: Feature[]
  backgroundImage?: any
}

export default function FeaturesSection({ title, features = [], backgroundImage }: Readonly<FeaturesSectionProps>) {
  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection
        background="transparent"
        minHeight="auto"
        verticalAlign="start"
        horizontalAlign="center"
        className="py-20"
      >
        {title && (
          <AnimatedTitle
            text={title}
            as="h2"
            className="text-3xl md:text-4xl font-bold text-foreground mb-12 text-center"
            wordsPerGroup={2}
            gradientStartGroup={1}
            gradientInterval={2}
          />
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
          {features.map((feature, index) => (
            <Card key={`${feature.title}-${index}`} className="border border-border shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {feature.icon && (
                  <div className="mb-4">
                    <Image
                      src={urlFor(feature.icon).width(64).height(64).url()}
                      alt={feature.title}
                      width={64}
                      height={64}
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
