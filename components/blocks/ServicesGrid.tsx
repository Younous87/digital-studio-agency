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
      <FullScreenSection background={backgroundImage ? 'transparent' : 'white'}>
        {(title || description) && (
          <div className="text-center mb-16 animate-fade-in">
            {title && (
              <AnimatedTitle
                text={title}
                as="h2"
                className="text-4xl md:text-6xl font-black text-foreground mb-6"
                wordsPerGroup={2}
                gradientStartGroup={1}
                gradientInterval={2}
              />
            )}
            {description && (
              <AnimatedSubtitle
                text={description}
                as="p"
                className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-medium"
                wordsPerGroup={3}
                gradientStartGroup={1}
                gradientInterval={2}
              />
            )}
          </div>
        )}

        {hasCategories ? (
          <Tabs defaultValue={categories[0]} className="w-full">
            <TabsList className="mb-12 flex justify-center flex-wrap h-auto gap-3 bg-transparent">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category}
                  value={category}
                  className="border border-border bg-muted data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 rounded-lg font-semibold text-base"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((category) => (
              <TabsContent key={category} value={category}>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {services
                    .filter(s => (s.category || 'All Services') === category)
                    .map((service) => (
                      <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        ) : (
          <div className={`grid gap-8 ${
            layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'
          }`}>
            {services.map((service) => (
              <ServiceCard key={service._id} service={service} />
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
      <Card className="h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-border">
        <CardHeader>
          <div className="flex items-start justify-between mb-4">
            {service.icon && (
              <div className="p-4 border border-border rounded-xl group-hover:bg-accent transition-all">
                <Image
                  src={urlFor(service.icon).width(80).url()}
                  alt={service.title}
                  width={48}
                  height={48}
                  className="w-12 h-12"
                />
              </div>
            )}
            {service.category && (
              <Badge variant="secondary" className="ml-auto">
                {service.category}
              </Badge>
            )}
          </div>
          <CardTitle className="text-2xl mb-3 group-hover:text-primary transition-colors flex items-center gap-2">
            {service.title}
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all" />
          </CardTitle>
          <CardDescription className="text-base">{service.shortDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-base text-primary font-medium group-hover:underline flex items-center gap-2">
            Learn more
            <ArrowRight className="w-4 h-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
