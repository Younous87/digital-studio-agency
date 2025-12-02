'use client'

import React from 'react'
import GradientText from '@/components/GradientText'

interface AnimatedTitleProps {
  /** The text to render with animated gradient on selected words */
  text: string
  /** HTML tag to use for the title */
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
  /** Additional CSS classes */
  className?: string
  /** Custom gradient colors */
  colors?: string[]
  /** Animation speed in seconds */
  animationSpeed?: number
  /** Whether to disable the gradient effect entirely */
  disableGradient?: boolean
}

/**
 * AnimatedTitle - Renders text with animated gradient on marked sections
 * 
 * Use **double asterisks** to mark gradient text in Sanity:
 * Example: "We Create **Digital Experiences** That Matter"
 * - "We Create " → normal text
 * - "Digital Experiences" → animated gradient
 * - " That Matter" → normal text
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
    const cleanText = text.replace(/\*\*/g, '')
    return <Tag className={className}>{cleanText}</Tag>
  }

  // Check if text contains manual markers (**text**)
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
