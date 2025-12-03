'use client'

import React from 'react'
import GradientText from '@/components/GradientText'

interface AnimatedSubtitleProps {
  /** The text to render with animated gradient on selected words */
  readonly text: string
  /** HTML tag to use for the subtitle */
  readonly as?: 'p' | 'span' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Additional CSS classes */
  readonly className?: string
  /** Custom gradient colors - softer by default for subtitles */
  readonly colors?: string[]
  /** Animation speed in seconds */
  readonly animationSpeed?: number
  /** Whether to disable the gradient effect entirely */
  readonly disableGradient?: boolean
}

/**
 * AnimatedSubtitle - Renders subtitle text with animated gradient on marked sections and italic on other marked sections
 * 
 * Use **double asterisks** to mark gradient text in Sanity:
 * Use ##double hashes## to mark italic text in Sanity:
 * Both can be used in the same text.
 * Example: "We help brands create **meaningful digital experiences** that connect ##with style##"
 * - "We help brands create " → normal text
 * - "meaningful digital experiences" → animated gradient
 * - " that connect " → normal text
 * - "with style" → italic
 * - "" → normal text
 * 
 * If no markers are present, the entire text renders as normal text.
 */
export default function AnimatedSubtitle({
  text,
  as: Tag = 'p',
  className = '',
  colors = ['#60a5fa', '#a78bfa', '#60a5fa', '#a78bfa', '#60a5fa'], // Softer blue-purple
  animationSpeed = 8,
  disableGradient = false,
}: AnimatedSubtitleProps) {
  if (!text) {
    return <Tag className={className}></Tag>
  }

  // Clean the text of markers if gradient is disabled
  if (disableGradient) {
    const cleanText = text.replaceAll('**', '').replaceAll('##', '')
    return <Tag className={className}>{cleanText}</Tag>
  }

  // Check if text contains markers (**text** or ##text##)
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
