import React from 'react'
import Container from '@/components/ui/Container'
import BackgroundWrapper from './BackgroundWrapper'

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
      <section className={`py-20 ${backgroundImage ? 'bg-transparent' : 'bg-white'}`}>
        <Container>
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">
              {title}
            </h2>
          )}
          <div className="space-y-8 max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div key={`${step.title}-${index}`} className="flex gap-6">
                <div className="shrink-0">
                  <div className="w-12 h-12 bg-(--brand-primary) border-3 border-black text-black rounded-none flex items-center justify-center text-xl font-black shadow-sm">
                    {step.step}
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-black mb-2">
                    {step.title}
                  </h3>
                  <p className="text-black font-medium">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </BackgroundWrapper>
  )
}
