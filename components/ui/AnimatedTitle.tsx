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
  /** 
   * Mode for determining gradients:
   * - 'auto': Uses algorithm based on word groups (default)
   * - 'manual': Uses **markers** in text to define gradient sections
   */
  mode?: 'auto' | 'manual'
  /** Number of words to group together for gradient (default: 2) - only used in 'auto' mode */
  wordsPerGroup?: number
  /** Apply gradient starting from which group (0-indexed, default: 1) - only used in 'auto' mode */
  gradientStartGroup?: number
  /** Interval between gradient groups - only used in 'auto' mode */
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
 * Supports two modes:
 * 
 * 1. AUTO MODE (default): Applies gradient to every other group of words
 *    Example: "We Create Digital Experiences That Matter"
 *    - Group 0: "We Create" (no gradient)
 *    - Group 1: "Digital Experiences" (gradient)
 *    - Group 2: "That Matter" (no gradient)
 * 
 * 2. MANUAL MODE: Use **double asterisks** to mark gradient text in Sanity
 *    Example: "We Create **Digital Experiences** That Matter"
 *    - "We Create " (no gradient)
 *    - "Digital Experiences" (gradient)
 *    - " That Matter" (no gradient)
 */
export default function AnimatedTitle({
  text,
  as: Tag = 'h1',
  className = '',
  mode = 'manual',
  wordsPerGroup = 2,
  gradientStartGroup = 1,
  gradientInterval = 2,
  colors = ['#8B5CF6', '#EC4899', '#F59E0B'],
  animationSpeed = 8,
  disableGradient = false,
}: AnimatedTitleProps) {
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
  Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
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
  Tag: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span',
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
  // Check for manual markers first
  if (text.includes('**')) {
    const parts = text.split(/\*\*/)
    return parts.map((part, index) => ({
      text: part,
      hasGradient: index % 2 === 1,
    }))
  }

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
