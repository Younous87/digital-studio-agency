import React from 'react'
import FullScreenSection from '@/components/ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import RichTextRenderer from './RichTextRenderer'

interface FullDescriptionSectionProps {
  content?: any[]
  backgroundImage?: any
}

export default function FullDescriptionSection({ content, backgroundImage }: Readonly<FullDescriptionSectionProps>) {
  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection
        background="transparent"
        minHeight="auto"
        verticalAlign="start"
        horizontalAlign="center"
        className="py-20"
      >
        <div className="max-w-4xl mx-auto text-center">
          {content && <RichTextRenderer content={content} />}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}