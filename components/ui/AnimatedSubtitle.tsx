'use client'

import React from 'react'
import GradientText from '@/components/GradientText'

interface AnimatedSubtitleProps {
  /** The text to render with animated gradient on selected words */
  text: string
  /** HTML tag to use for the subtitle */
  as?: 'p' | 'span' | 'h3' | 'h4' | 'h5' | 'h6'
  /** Additional CSS classes */
  className?: string
  /** Custom gradient colors - softer by default for subtitles */
  colors?: string[]
  /** Animation speed in seconds */
  animationSpeed?: number
  /** Whether to disable the gradient effect entirely */
  disableGradient?: boolean
}

/**
 * AnimatedSubtitle - Renders subtitle text with animated gradient on marked sections
 * 
 * Use **double asterisks** to mark gradient text in Sanity:
 * Example: "We help brands create **meaningful digital experiences** that connect"
 * - "We help brands create " → normal text
 * - "meaningful digital experiences" → animated gradient
 * - " that connect" → normal text
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
    const cleanText = text.replace(/\*\*/g, '')
    return <Tag className={className}>{cleanText}</Tag>
  }

  // Check if text contains markers (**text**)
  const hasMarkers = text.includes('**')

  // If no markers, render as plain text
  if (!hasMarkers) {
    return <Tag className={className}>{text}</Tag>
  }

  // Split by ** markers, odd indices are gradient text
  const parts = text.split(/\*\*/)
  
  return (
    <Tag className={className}>
      {parts.map((part, index) => {
        // Odd indices (1, 3, 5...) are between ** markers = gradient
        const isGradient = index % 2 === 1
        
        if (isGradient && part) {
          return (
            <GradientText
              key={index}
              inline
              colors={colors}
              animationSpeed={animationSpeed}
            >
              {part}
            </GradientText>
          )
        }
        
        return <React.Fragment key={index}>{part}</React.Fragment>
      })}
    </Tag>
  )
}
