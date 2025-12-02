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
        className="py-24 lg:py-32"
        containerSize="2xl"
      >
        {title && (
          <AnimatedTitle
            text={title}
            as="h2"
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-16 lg:mb-20 text-center"
          />
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10 w-full">
          {features.map((feature, index) => (
            <Card key={`${feature.title}-${index}`} className="border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <div className="p-8 lg:p-10">
                {feature.icon && (
                  <div className="mb-6">
                    <Image
                      src={urlFor(feature.icon).width(96).height(96).url()}
                      alt={feature.title}
                      width={80}
                      height={80}
                      className="w-16 h-16 lg:w-20 lg:h-20"
                    />
                  </div>
                )}
                <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground text-base lg:text-lg leading-relaxed">{feature.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
