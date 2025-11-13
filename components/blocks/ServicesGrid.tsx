'use client'

import Image from 'next/image'
import Link from 'next/link'
import Section from '../ui/Section'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/Card'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '../ui/hover-card'
import { Badge } from '../ui/badge'
import { urlFor } from '@/lib/sanity/image'
import { ArrowRight, Sparkles } from 'lucide-react'

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
}

export default function ServicesGrid({
  title,
  description,
  services,
  layout = 'grid'
}: ServicesGridProps) {
  // Group services by category if they have one
  const categories = [...new Set(services.map(s => s.category || 'All Services').filter(Boolean))]
  const hasCategories = categories.length > 1 && services.some(s => s.category)

  return (
    <Section background="gray">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Sparkles className="w-8 h-8 text-blue-600" />
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              {description}
            </p>
          )}
        </div>
      )}

      {hasCategories ? (
        <Tabs defaultValue={categories[0]} className="w-full">
          <TabsList className="mb-8 flex justify-center flex-wrap h-auto">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category}>
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
    </Section>
  )
}

function ServiceCard({ service }: { service: Service }) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={`/services/${service.slug.current}`}>
          <Card className="h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-2 hover:border-blue-500 group">
            <CardHeader>
              <div className="flex items-start justify-between mb-4">
                {service.icon && (
                  <div className="p-3 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
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
              <CardTitle className="text-xl mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                {service.title}
                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all" />
              </CardTitle>
              <CardDescription>{service.shortDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-blue-600 font-semibold group-hover:underline">
                Learn more →
              </div>
            </CardContent>
          </Card>
        </Link>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">{service.title}</h4>
          <p className="text-sm text-muted-foreground">
            Click to explore our {service.title.toLowerCase()} offerings and see how we can help transform your business.
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  )
}
