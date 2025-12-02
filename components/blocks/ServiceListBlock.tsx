'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import FullScreenSection from '@/components/ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import AnimatedSubtitle from '@/components/ui/AnimatedSubtitle'
import { ArrowRight } from 'lucide-react'

interface Service {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  icon?: any
}

interface ServiceListBlockProps {
  readonly title?: string
  readonly description?: string
  readonly layout?: 'grid' | 'list' | 'carousel'
  readonly services?: Service[]
  readonly backgroundColor?: {
    readonly hex: string
    readonly hsl: { readonly h: number; readonly s: number; readonly l: number; readonly a: number }
    readonly rgb: { readonly r: number; readonly g: number; readonly b: number; readonly a: number }
    readonly hsv: { readonly h: number; readonly s: number; readonly v: number; readonly a: number }
  }
  readonly backgroundImage?: any
}

export default function ServiceListBlock({
  title = 'Our Services',
  description,
  layout = 'carousel',
  services = [],
  backgroundColor,
  backgroundImage
}: ServiceListBlockProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const pauseRef = useRef<boolean>(false)

  const bgColor = backgroundColor?.hex || '#ffffff'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  
  let textColor = isDark ? 'text-primary-foreground' : 'text-foreground'
  let subtitleColor = isDark ? 'text-primary-foreground/70' : 'text-muted-foreground'

  if (backgroundImage) {
    textColor = 'text-foreground'
    subtitleColor = 'text-muted-foreground'
  }

  // Early return if no services
  if (!services || services.length === 0) {
    return null
  }

  // Duplicate services for seamless infinite scroll
  const duplicatedServices = [...services, ...services, ...services]
  
  // Determine effective layout (default to carousel if undefined)
  const effectiveLayout = layout || 'carousel'

  useEffect(() => {
    // Only run auto-scroll for carousel layout
    if (effectiveLayout !== 'carousel' && effectiveLayout !== 'list') return
    
    const scrollContainer = scrollRef.current
    if (!scrollContainer) return

    let rafId: number | null = null
    let lastTime = performance.now()

    // Speed in pixels per second
    const speed = 200
    let scrollPosition = 0

    const update = (time: number) => {
      if (!scrollContainer) return
      const dt = Math.min(0.05, (time - lastTime) / 1000)
      lastTime = time
      if (!pauseRef.current) {
        scrollPosition += speed * dt
        const singleSetWidth = scrollContainer.scrollWidth / 3
        if (singleSetWidth > 0 && scrollPosition >= singleSetWidth * 2) {
          scrollPosition = singleSetWidth
        }
        scrollContainer.scrollLeft = scrollPosition
      }
      rafId = requestAnimationFrame(update)
    }

    const init = () => {
      const singleSetWidth = scrollContainer.scrollWidth / 3
      if (singleSetWidth > 0) {
        scrollPosition = singleSetWidth
        scrollContainer.scrollLeft = scrollPosition
      }
      lastTime = performance.now()
      rafId = requestAnimationFrame(update)
    }

    const timeoutId = window.setTimeout(() => requestAnimationFrame(init), 50)

    const onResize = () => {
      const singleSetWidth = scrollContainer.scrollWidth / 3
      if (singleSetWidth > 0) {
        scrollPosition = singleSetWidth
        scrollContainer.scrollLeft = scrollPosition
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      if (rafId) cancelAnimationFrame(rafId)
      window.clearTimeout(timeoutId)
      window.removeEventListener('resize', onResize)
    }
  }, [services.length, effectiveLayout])

  // Carousel layout (default) - also fallback for 'list' since it looks similar
  if (effectiveLayout === 'carousel' || effectiveLayout === 'list') {
    return (
      <BackgroundWrapper backgroundImage={backgroundImage}>
        <FullScreenSection 
          background={backgroundImage ? 'transparent' : 'white'} 
          containerSize="full" 
          className="relative overflow-hidden" 
          containerClassName="mx-0 !px-0"
          style={{ backgroundColor: backgroundImage ? 'transparent' : bgColor }}
        >
          {(title || description) && (
            <div className="text-center mb-16 lg:mb-20 px-4 lg:px-12">
              {title && (
                <AnimatedTitle
                  text={title}
                  as="h2"
                  className={`text-5xl md:text-6xl lg:text-8xl font-black mb-6 lg:mb-8 ${textColor}`}
                  wordsPerGroup={2}
                  gradientStartGroup={0}
                  gradientInterval={2}
                />
              )}
              {description && (
                <AnimatedSubtitle
                  text={description}
                  as="p"
                  className={`text-xl lg:text-2xl max-w-4xl mx-auto font-bold ${subtitleColor}`}
                  wordsPerGroup={3}
                  gradientStartGroup={1}
                  gradientInterval={2}
                />
              )}
            </div>
          )}

          {/* Auto-scrolling carousel container */}
          <div className="relative w-full overflow-hidden">
            <div
              ref={scrollRef}
              className="flex gap-6 lg:gap-8 overflow-x-auto scrollbar-hide touch-pan-x"
              onMouseEnter={() => { pauseRef.current = true }}
              onMouseLeave={() => { pauseRef.current = false }}
              onPointerDown={() => { pauseRef.current = true }}
              onPointerUp={() => { pauseRef.current = false }}
              onTouchStart={() => { pauseRef.current = true }}
              onTouchEnd={() => { pauseRef.current = false }}
            >
              {duplicatedServices.map((service, index) => (
                <ServiceCard 
                  key={`${service._id}-${index}`} 
                  service={service} 
                />
              ))}
            </div>
          </div>
        </FullScreenSection>
      </BackgroundWrapper>
    )
  }

  // Grid layout
  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection 
        background={backgroundImage ? 'transparent' : 'white'} 
        containerSize="2xl"
        className="relative"
        style={{ backgroundColor: backgroundImage ? 'transparent' : bgColor }}
      >
        {/* Grid pattern - only if no background image */}
        {!backgroundImage && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.1) 2px, transparent 2px)',
              backgroundSize: '30px 30px',
            }} />
          </div>
        )}

        {(title || description) && (
          <div className="text-center mb-16 lg:mb-20 relative">
            {title && (
              <AnimatedTitle
                text={title}
                as="h2"
                className={`text-5xl md:text-6xl lg:text-8xl font-black mb-6 lg:mb-8 ${textColor}`}
                wordsPerGroup={2}
                gradientStartGroup={0}
                gradientInterval={2}
              />
            )}
            {description && (
              <AnimatedSubtitle
                text={description}
                as="p"
                className={`text-xl lg:text-2xl max-w-4xl mx-auto font-bold ${subtitleColor}`}
                wordsPerGroup={3}
                gradientStartGroup={1}
                gradientInterval={2}
              />
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 relative">
          {services.map((service) => (
            <GridServiceCard key={service._id} service={service} />
          ))}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}

function ServiceCard({ service }: Readonly<{ service: Service }>) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/services/${service.slug.current}`}>
      <div
        className="flex-shrink-0 min-w-[85vw] md:min-w-[60vw] lg:min-w-[45vw] xl:min-w-[35vw] h-[450px] lg:h-[500px] relative rounded-xl overflow-hidden cursor-pointer group snap-start"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/70 to-primary/50 transition-all duration-500 ${
          isHovered ? 'from-primary via-primary/80 to-primary/60' : ''
        }`} />

        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }} />
        </div>

        {/* Icon */}
        {service.icon && (
          <div className={`absolute top-8 lg:top-10 right-8 lg:right-10 transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-6' : ''
          }`}>
            <div className="bg-white/20 backdrop-blur-sm border border-white/30 p-5 lg:p-6 rounded-xl">
              <Image
                src={urlFor(service.icon as any).width(80).height(80).url()}
                alt={service.title}
                width={64}
                height={64}
                className="w-12 h-12 lg:w-16 lg:h-16"
              />
            </div>
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-10">
          <h3 className={`text-3xl lg:text-4xl font-black text-white mb-4 transition-transform duration-500 ${
            isHovered ? 'translate-x-2' : ''
          }`}>
            {service.title}
          </h3>
          
          <p className={`text-white/80 text-lg lg:text-xl font-medium leading-relaxed mb-6 line-clamp-3 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-70'
          }`}>
            {service.shortDescription}
          </p>

          <div className={`transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <Button 
              variant="secondary" 
              size="lg"
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-primary text-lg px-8 py-6"
            >
              Learn More <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Decorative corner accent */}
        <div className={`absolute top-0 left-0 w-24 h-24 transition-all duration-500 ${
          isHovered ? 'scale-110' : ''
        }`}>
          <div className="absolute top-4 left-4 w-12 h-12 border-t-4 border-l-4 border-white/30 rounded-tl-xl" />
        </div>
      </div>
    </Link>
  )
}

function GridServiceCard({ service }: Readonly<{ service: Service }>) {
  return (
    <Link href={`/services/${service.slug.current}`} className="group block">
      <Card className="h-full w-full p-8 lg:p-12 text-center border border-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        {service.icon ? (
          <div className="mb-8">
            <div className="relative inline-block">
              <div className="p-6 lg:p-8 group-hover:rotate-6 transition-transform duration-300">
                <Image
                  src={urlFor(service.icon as any).width(120).height(120).url()}
                  alt={service.title}
                  width={100}
                  height={100}
                  className="w-20 h-20 lg:w-24 lg:h-24"
                />
              </div>
            </div>
          </div>
        ) : null}
        <h3 className="text-2xl lg:text-3xl font-black mb-5 text-foreground group-hover:text-primary transition-colors">
          {service.title}
        </h3>
        <p className="text-lg lg:text-xl mb-10 leading-relaxed text-muted-foreground font-medium">
          {service.shortDescription}
        </p>
        <Button variant="default" size="lg" className="text-lg px-8 py-6">
          LEARN MORE <ArrowRight className="w-5 h-5 ml-2" />
        </Button>
      </Card>
    </Link>
  )
}