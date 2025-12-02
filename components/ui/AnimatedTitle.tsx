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
  /** Number of words to group together for gradient (default: 2) */
  wordsPerGroup?: number
  /** Apply gradient starting from which group (0-indexed, default: 1 - skips first group) */
  gradientStartGroup?: number
  /** Interval between gradient groups (e.g., 2 means every other group has gradient) */
  gradientInterval?: number
  /** Custom gradient colors */
  colors?: string[]
  /** Animation speed in seconds */
  animationSpeed?: number
  /** Whether to disable the gradient effect entirely */
  disableGradient?: boolean
}

/**
 * AnimatedTitle - Renders text with animated gradient on selected word groups
 * 
 * By default, applies gradient to every other group of 2 words, starting from the second group.
 * 
 * Example: "We Create Digital Experiences That Matter"
 * - Group 0: "We Create" (no gradient)
 * - Group 1: "Digital Experiences" (gradient)
 * - Group 2: "That Matter" (no gradient)
 */
export default function AnimatedTitle({
  text,
  as: Tag = 'h1',
  className = '',
  wordsPerGroup = 2,
  gradientStartGroup = 1,
  gradientInterval = 2,
  colors = ['#40ffaa', '#4079ff', '#40ffaa', '#4079ff', '#40ffaa'],
  animationSpeed = 8,
  disableGradient = false,
}: AnimatedTitleProps) {
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

/**
 * Utility function to parse text and return segments with gradient markers
 * Useful for more complex rendering scenarios
 */
export function parseTextForGradient(
  text: string,
  options: {
    wordsPerGroup?: number
    gradientStartGroup?: number
    gradientInterval?: number
  } = {}
): { text: string; hasGradient: boolean }[] {
  const {
    wordsPerGroup = 2,
    gradientStartGroup = 1,
    gradientInterval = 2,
  } = options

  const words = text.split(/\s+/)
  const groups: string[][] = []
  
  for (let i = 0; i < words.length; i += wordsPerGroup) {
    groups.push(words.slice(i, i + wordsPerGroup))
  }

  return groups.map((group, groupIndex) => {
    const shouldHaveGradient = 
      groupIndex >= gradientStartGroup &&
      (groupIndex - gradientStartGroup) % gradientInterval === 0

    return {
      text: group.join(' '),
      hasGradient: shouldHaveGradient,
    }
  })
}
