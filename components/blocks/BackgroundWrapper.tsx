import React from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface BackgroundWrapperProps {
  backgroundImage?: any
  children: React.ReactNode
  className?: string
}

export default function BackgroundWrapper({ backgroundImage, children, className = '' }: Readonly<BackgroundWrapperProps>) {
  if (!backgroundImage) {
    return <div className={className}>{children}</div>
  }

  return (
    <div className={`relative ${className}`}>
      <div className="absolute inset-0 z-0">
        <Image
          src={urlFor(backgroundImage).width(1920).url()}
          alt="Background"
          fill
          className="object-cover"
          priority={false}
        />
        {/* Optional overlay to ensure text readability */}
        <div className="absolute inset-0" />
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
