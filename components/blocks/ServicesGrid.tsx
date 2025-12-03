'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef } from 'react'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight } from 'lucide-react'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import AnimatedSubtitle from '@/components/ui/AnimatedSubtitle'

interface Service {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  icon?: any
  category?: string
}

interface ServicesGridProps {
  title?: string
  description?: string
  services: Service[]
  layout?: 'grid' | 'carousel' | 'list'
  backgroundImage?: any
}

export default function ServicesGrid({
  title,
  description,
  services,
  layout = 'grid',
  backgroundImage
}: Readonly<ServicesGridProps>) {
  // Group services by category if they have one
  const categories = [...new Set(services.map(s => s.category || 'All Services').filter(Boolean))]
  const hasCategories = categories.length > 1 && services.some(s => s.category)

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection background={backgroundImage ? 'transparent' : 'white'} containerSize="2xl">
        {(title || description) && (
          <div className="text-center mb-20 animate-fade-in">
            {title && (
              <AnimatedTitle
                text={title}
                as="h2"
                className="text-5xl md:text-7xl lg:text-8xl font-black text-foreground mb-8"
              />
            )}
            {description && (
              <AnimatedSubtitle
                text={description}
                as="p"
                className="text-xl md:text-2xl lg:text-3xl text-muted-foreground max-w-4xl mx-auto font-medium"
              />
            )}
          </div>
        )}

        {hasCategories ? (
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="mb-16 flex justify-center flex-wrap h-auto gap-4 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  className="border border-border bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-8 py-4 rounded-lg font-semibold text-lg"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-6 md:gap-8 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
                  {services
                    .filter(s => (s.category || 'All Services') === category)
                    .map((service, index) => (
                      <ServiceCard key={`${service._id}-${index}`} service={service} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className={`grid gap-6 md:gap-8 lg:gap-10 ${
            layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'
          }`}>
            {services.map((service, index) => (
              <ServiceCard key={`${service._id}-${index}`} service={service} />
            ))}
          </div>
        )}
      </FullScreenSection>
    </BackgroundWrapper>
  )
}

function ServiceCard({ service }: Readonly<{ service: Service }>) {
  const glareRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    const el = glareRef.current
    if (!el) return
    // ensure immediate reset before animate
    el.style.transition = 'none'
    el.style.opacity = '0'
    el.style.backgroundPosition = '-100% -100%'
    requestAnimationFrame(() => {
      // fade in + animate background position (slower)
      el.style.transition = 'opacity 400ms ease, background-position 1200ms cubic-bezier(.2,.8,.2,1)'
      el.style.opacity = '1'
      el.style.backgroundPosition = '300% 300%'
    })
  }

  const handleMouseLeave = () => {
    const el = glareRef.current
    if (!el) return
    // fade out and reset position (slower)
    el.style.transition = 'opacity 400ms ease, background-position 1200ms cubic-bezier(.2,.8,.2,1)'
    el.style.opacity = '0'
    el.style.backgroundPosition = '-100% -100%'
  }

  return (
    <Link 
      href={`/services/${service.slug.current}`} 
      className="group block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Card className="relative h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-border p-2 overflow-hidden">
        {/* Glare overlay */}
        <div
          ref={glareRef}
          className="pointer-events-none absolute inset-0 z-10"
          style={{
            // hidden by default via opacity:0 so card looks plain until hover
            opacity: 0,
            background: `linear-gradient(-45deg,
              hsla(0,0%,0%,0) 40%,
              rgba(139, 92, 246, 0.25) 50%,
              rgba(236, 72, 153, 0.25) 60%,
              rgba(245, 158, 11, 0.2) 70%,
              hsla(0,0%,0%,0) 80%)`,
            backgroundSize: '250% 250%',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: '-100% -100%',
            borderRadius: 'inherit',
            transition: 'opacity 400ms ease, background-position 1200ms cubic-bezier(.2,.8,.2,1)',
            pointerEvents: 'none'
          }}
        />
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between mb-6">
            {service.icon && (
              <div className="p-5 border border-border rounded-xl group-hover:bg-accent transition-all">
                <Image
                  src={urlFor(service.icon).width(120).url()}
                  alt={service.title}
                  width={64}
                  height={64}
                  className="w-16 h-16"
                />
              </div>
            )}
            {service.category && (
              <Badge variant="secondary" className="ml-auto text-sm px-4 py-1.5">
                {service.category}
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl md:text-3xl mb-4 group-hover:text-primary transition-colors flex items-center gap-3">
            {service.title}
            <ArrowRight className="w-6 h-6 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all" />
          </CardTitle>
          <CardDescription className="text-base md:text-lg leading-relaxed">{service.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-lg text-primary font-semibold group-hover:underline flex items-center gap-2">
            Learn more
            <ArrowRight className="w-5 h-5" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
