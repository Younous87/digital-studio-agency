import { ReactNode, HTMLAttributes } from 'react'
import Container from './Container'

interface FullScreenSectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode
  className?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | 'full'
  background?: 'white' | 'gray' | 'dark' | 'transparent'
  minHeight?: 'screen' | 'full' | 'auto'
  verticalAlign?: 'start' | 'center' | 'end'
  horizontalAlign?: 'start' | 'center' | 'end'
}

export default function FullScreenSection({
  children,
  className = '',
  containerSize = 'lg',
  background = 'white',
  minHeight = 'screen',
  verticalAlign = 'center',
  horizontalAlign = 'center',
  ...props
}: FullScreenSectionProps) {
  const backgrounds = {
    white: 'bg-white text-on-light',
    gray: 'bg-gray-50 text-on-light',
    dark: 'bg-gray-900 text-white',
    transparent: 'bg-transparent'
  }

  const minHeights = {
    screen: 'min-h-screen',
    full: 'min-h-full',
    auto: ''
  }

  const verticalAlignments = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end'
  }

  const horizontalAlignments = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end'
  }

  return (
    <section
      className={`${backgrounds[background]} ${minHeights[minHeight]} flex ${verticalAlignments[verticalAlign]} ${horizontalAlignments[horizontalAlign]} ${className}`}
      {...props}
    >
      <Container size={containerSize} className="w-full">
        {children}
      </Container>
    </section>
  )
}