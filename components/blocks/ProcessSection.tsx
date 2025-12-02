import React from 'react'
import FullScreenSection from '@/components/ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'

interface Step {
  step: string
  title: string
  description: string
}

interface ProcessSectionProps {
  title?: string
  steps?: Step[]
  backgroundImage?: any
}

export default function ProcessSection({ title, steps = [], backgroundImage }: Readonly<ProcessSectionProps>) {
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
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-16 lg:mb-24 text-center"
          />
        )}
        <div className="space-y-8 lg:space-y-12 w-full max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="flex gap-6 lg:gap-10 group">
              <div className="shrink-0">
                <div className="w-16 h-16 lg:w-20 lg:h-20 bg-primary border border-border text-primary-foreground rounded-xl flex items-center justify-center text-2xl lg:text-3xl font-black shadow-sm group-hover:scale-110 transition-transform">
                  {step.step}
                </div>
              </div>
              <div className="flex-1 pt-2">
                <h3 className="text-2xl lg:text-4xl font-black text-foreground mb-3 lg:mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-medium text-lg lg:text-xl leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
