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
  /** Number of words to group together for gradient (default: 3 for subtitles) */
  wordsPerGroup?: number
  /** Apply gradient starting from which group (0-indexed, default: 1) */
  gradientStartGroup?: number
  /** Interval between gradient groups (e.g., 3 means every third group has gradient) */
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
 * Configured with subtler settings compared to AnimatedTitle:
 * - Larger word groups (3 words)
 * - Less frequent gradients (every 3rd group)
 * - Softer, more muted colors
 * - Slower animation
 * 
 * Example: "We help brands create meaningful digital experiences that connect with their audience"
 * - Group 0: "We help brands" (no gradient)
 * - Group 1: "create meaningful digital" (gradient)
 * - Group 2: "experiences that connect" (no gradient)
 * - Group 3: "with their audience" (gradient)
 */
export default function AnimatedSubtitle({
  text,
  as: Tag = 'p',
  className = '',
  wordsPerGroup = 2,
  gradientStartGroup = 1,
  gradientInterval = 2,
  colors = ['#60a5fa', '#a78bfa', '#60a5fa', '#a78bfa', '#60a5fa'], // Softer blue-purple
  animationSpeed = 8,
  disableGradient = false,
}: AnimatedSubtitleProps) {
  if (disableGradient || !text) {
    return <Tag className={className}>{text}</Tag>
  }

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
