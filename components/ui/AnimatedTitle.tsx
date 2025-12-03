'use client'

import React from 'react'
import GradientText from '@/components/GradientText'

interface AnimatedTitleProps {
  /** The text to render with animated gradient on selected words */
  readonly text: string
  /** HTML tag to use for the title */
  readonly as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  /** Additional CSS classes */
  readonly className?: string
  /** Custom gradient colors */
  readonly colors?: string[]
  /** Animation speed in seconds */
  readonly animationSpeed?: number
  /** Whether to disable the gradient effect entirely */
  readonly disableGradient?: boolean
}

/**
 * AnimatedTitle - Renders text with animated gradient on marked sections and italic on other marked sections
 * 
 * Use **double asterisks** to mark gradient text in Sanity:
 * Use ##double hashes## to mark italic text in Sanity:
 * Both can be used in the same text.
 * Example: "We Create **Digital Experiences** That Matter ##with style##"
 * - "We Create " → normal text
 * - "Digital Experiences" → animated gradient
 * - " That Matter " → normal text
 * - "with style" → italic
 * - "" → normal text
 * 
 * If no markers are present, the entire text renders as normal text.
 */
export default function AnimatedTitle({
  text,
  as: Tag = 'h1',
  className = '',
  colors = ['#8B5CF6', '#EC4899', '#F59E0B'],
  animationSpeed = 8,
  disableGradient = false,
}: AnimatedTitleProps) {
  if (!text) {
    return <Tag className={className}></Tag>
  }

  // Clean the text of markers if gradient is disabled
  if (disableGradient) {
    const cleanText = text.replaceAll('**', '').replaceAll('##', '')
    return <Tag className={className}>{cleanText}</Tag>
  }

  // Check if text contains manual markers (**text** or ##text##)
  const hasMarkers = text.includes('**') || text.includes('##')

  // If no markers, render as plain text
  if (!hasMarkers) {
    return <Tag className={className}>{text}</Tag>
  }

  // Parse text for gradient and italic markers
  const regex = /(?:\*\*([^*]+)\*\*|##([^#]+)##|([^*#]+))/g
  const parts: Array<{ type: 'gradient' | 'italic' | 'normal'; content: string }> = []
  let match
  while ((match = regex.exec(text)) !== null) {
    if (match[1]) {
      parts.push({ type: 'gradient', content: match[1] })
    } else if (match[2]) {
      parts.push({ type: 'italic', content: match[2] })
    } else if (match[3]) {
      parts.push({ type: 'normal', content: match[3] })
    }
  }
  
  let keyCounter = 0
  
  return (
    <Tag className={className}>
      {parts.map((part) => {
        if (part.type === 'gradient') {
          return (
            <GradientText
              key={`gradient-${keyCounter++}`}
              inline
              colors={colors}
              animationSpeed={animationSpeed}
            >
              {part.content}
            </GradientText>
          )
        } else if (part.type === 'italic') {
          return <em key={`italic-${keyCounter++}`}>{part.content}</em>
        } else {
          return <React.Fragment key={`normal-${keyCounter++}`}>{part.content}</React.Fragment>
        }
      })}
    </Tag>
  )
}
