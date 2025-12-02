import { ReactNode } from 'react'

interface ContainerProps {
  children: ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full'
}

export default function Container({ 
  children, 
  className = '', 
  size = 'lg' 
}: ContainerProps) {
  const sizes = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[1400px]',
    '2xl': 'max-w-[1600px]',
    full: 'max-w-full'
  }
  
  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-10 xl:px-12 ${sizes[size]} ${className}`}>
      {children}
    </div>
  )
}
