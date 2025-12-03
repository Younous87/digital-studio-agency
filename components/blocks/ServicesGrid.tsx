'use client'

import Image from 'next/image'
import Link from 'next/link'
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
  return (
    <Link href={`/services/${service.slug.current}`} className="group block">
      <Card className="h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-xl border border-border p-2">
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
