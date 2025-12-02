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
        <div className="space-y-8 max-w-4xl w-full">
          {steps.map((step, index) => (
            <div key={`${step.title}-${index}`} className="flex gap-6">
              <div className="shrink-0">
                <div className="w-12 h-12 bg-primary border border-border text-primary-foreground rounded-md flex items-center justify-center text-xl font-black shadow-sm">
                  {step.step}
                </div>
              </div>
              <div>
                <h3 className="text-2xl font-black text-foreground mb-2">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-medium">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
