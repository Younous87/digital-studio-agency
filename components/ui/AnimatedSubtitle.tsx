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
  /** 
   * Mode for determining gradients:
   * - 'auto': Uses algorithm based on word groups (default)
   * - 'manual': Uses **markers** in text to define gradient sections
   */
  mode?: 'auto' | 'manual'
  /** Number of words to group together for gradient (default: 3 for subtitles) - only used in 'auto' mode */
  wordsPerGroup?: number
  /** Apply gradient starting from which group (0-indexed, default: 1) - only used in 'auto' mode */
  gradientStartGroup?: number
  /** Interval between gradient groups - only used in 'auto' mode */
  gradientInterval?: number
  /** Custom gradient colors - softer by default for subtitles */
  colors?: string[]
  /** Animation speed in seconds (slower for subtitles) */
  animationSpeed?: number
  /** Whether to disable the gradient effect entirely */
  disableGradient?: boolean
}

/**
 * AnimatedSubtitle - Renders subtitle text with animated gradient on selected word groups
 * 
 * Supports two modes:
 * 
 * 1. AUTO MODE (default): Applies gradient based on word groups
 *    - Larger word groups (3 words)
 *    - Less frequent gradients (every 3rd group)
 *    - Softer, more muted colors
 *    - Slower animation
 * 
 * 2. MANUAL MODE: Use **double asterisks** to mark gradient text in Sanity
 *    Example: "We help brands create **meaningful digital experiences** that connect"
 *    - "We help brands create " (no gradient)
 *    - "meaningful digital experiences" (gradient)
 *    - " that connect" (no gradient)
 */
export default function AnimatedSubtitle({
  text,
  as: Tag = 'p',
  className = '',
  mode = 'manual',
  wordsPerGroup = 2,
  gradientStartGroup = 1,
  gradientInterval = 2,
  colors = ['#60a5fa', '#a78bfa', '#60a5fa', '#a78bfa', '#60a5fa'], // Softer blue-purple
  animationSpeed = 8,
  disableGradient = false,
}: AnimatedSubtitleProps) {
  if (disableGradient || !text) {
    // Remove markers if present but gradient is disabled
    const cleanText = text?.replace(/\*\*/g, '') || ''
    return <Tag className={className}>{cleanText}</Tag>
  }

  // Check if text contains manual markers (**text**)
  const hasManualMarkers = text.includes('**')
  const effectiveMode = hasManualMarkers ? 'manual' : mode

  if (effectiveMode === 'manual') {
    return renderManualMode(text, Tag, className, colors, animationSpeed)
  }

  return renderAutoMode(text, Tag, className, wordsPerGroup, gradientStartGroup, gradientInterval, colors, animationSpeed)
}

/**
 * Renders text with manually marked gradient sections using **markers**
 */
function renderManualMode(
  text: string,
  Tag: 'p' | 'span' | 'h3' | 'h4' | 'h5' | 'h6',
  className: string,
  colors: string[],
  animationSpeed: number
) {
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

/**
 * Renders text with automatic gradient based on word groups
 */
function renderAutoMode(
  text: string,
  Tag: 'p' | 'span' | 'h3' | 'h4' | 'h5' | 'h6',
  className: string,
  wordsPerGroup: number,
  gradientStartGroup: number,
  gradientInterval: number,
  colors: string[],
  animationSpeed: number
) {
  const words = text.split(/\s+/)
  const groups: string[][] = []
  
  // Split words into groups
  for (let i = 0; i < words.length; i += wordsPerGroup) {
    groups.push(words.slice(i, i + wordsPerGroup))
  }

  // Determine which groups should have gradient
  const shouldHaveGradient = (groupIndex: number): boolean => {
    if (groupIndex < gradientStartGroup) return false
    return (groupIndex - gradientStartGroup) % gradientInterval === 0
  }

  return (
    <Tag className={className}>
      {groups.map((group, groupIndex) => {
        const groupText = group.join(' ')
        const isLast = groupIndex === groups.length - 1
        
        if (shouldHaveGradient(groupIndex)) {
          return (
            <React.Fragment key={groupIndex}>
              <GradientText
                inline
                colors={colors}
                animationSpeed={animationSpeed}
              >
                {groupText}
              </GradientText>
              {!isLast && ' '}
            </React.Fragment>
          )
        }
        
        return (
          <React.Fragment key={groupIndex}>
            {groupText}
            {!isLast && ' '}
          </React.Fragment>
        )
      })}
    </Tag>
  )
}
