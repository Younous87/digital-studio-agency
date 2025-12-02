import { ReactNode } from 'react'
import Container from './Container'

interface SectionProps {
  children: ReactNode
  className?: string
  containerSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
  background?: 'white' | 'gray' | 'dark' | 'transparent'
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
}

export default function Section({
  children,
  className = '',
  containerSize = 'lg',
  background = 'white',
  padding = 'lg'
}: SectionProps) {
  const backgrounds = {
    white: 'bg-white text-on-light',
    gray: 'bg-gray-50 text-on-light',
    dark: 'bg-gray-900 text-white',
    transparent: 'bg-transparent'
  }
  
  const paddings = {
    none: '',
    sm: 'py-8 sm:py-12',
    md: 'py-12 sm:py-16',
    lg: 'py-16 sm:py-24',
    xl: 'py-24 sm:py-32'
  }
  
  return (
    <section className={`${backgrounds[background]} ${paddings[padding]} ${className}`}>
      <Container size={containerSize}>
        {children}
      </Container>
    </section>
  )
}
