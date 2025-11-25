import React from 'react'
import Container from '@/components/ui/Container'
import BackgroundWrapper from './BackgroundWrapper'
import RichTextRenderer from './RichTextRenderer'

interface FullDescriptionSectionProps {
  content?: any[]
  backgroundImage?: any
}

export default function FullDescriptionSection({ content, backgroundImage }: Readonly<FullDescriptionSectionProps>) {
  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <section className={`py-20 ${backgroundImage ? 'bg-transparent' : 'bg-white'}`}>
        <Container>
          {content && <RichTextRenderer content={content} />}
        </Container>
      </section>
    </BackgroundWrapper>
  )
}