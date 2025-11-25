import React from 'react'
import { Card } from '@/components/retroui/Card'
import Container from '@/components/ui/Container'
import BackgroundWrapper from './BackgroundWrapper'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

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
      <section className={`py-20 ${backgroundImage ? 'bg-transparent' : 'bg-gray-100'}`}>
        <Container>
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {title}
            </h2>
          )}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={`${feature.title}-${index}`} variant="default">
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
                  <h3 className="text-xl font-black text-black mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-black font-medium">{feature.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    </BackgroundWrapper>
  )
}
