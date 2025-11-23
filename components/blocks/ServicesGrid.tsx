'use client'

import Image from 'next/image'
import Link from 'next/link'
import FullScreenSection from '../ui/FullScreenSection'
import { Tabs, TabsContent, TabsTriggerList, TabsTrigger, TabsPanels } from '../retroui/Tab'
import { Card } from '../retroui/Card'
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
}: Readonly<ServicesGridProps>) {
  // Group services by category if they have one
  const categories = [...new Set(services.map(s => s.category || 'All Services').filter(Boolean))]
  const hasCategories = categories.length > 1 && services.some(s => s.category)

  return (
    <FullScreenSection background="white">
      {(title || description) && (
        <div className="text-center mb-16 animate-fade-in">
          {title && (
            <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6 flex items-center justify-center gap-3">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto font-bold">
              {description}
            </p>
          )}
        </div>
      )}

      {hasCategories ? (
        <Tabs defaultIndex={0} className="w-full">
          <TabsTriggerList className="mb-12 flex justify-center flex-wrap h-auto gap-3 bg-transparent">
            {categories.map((category) => (
              <TabsTrigger 
                key={category} 
                className="border-2 border-black bg-muted data-selected:bg-brand-secondary data-selected:shadow-md px-6 py-3 rounded-lg font-black text-base"
              >
                {category}
              </TabsTrigger>
            ))}
          </TabsTriggerList>
          <TabsPanels>
            {categories.map((category) => (
              <TabsContent key={category}>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                  {services
                    .filter(s => (s.category || 'All Services') === category)
                    .map((service) => (
                      <ServiceCard key={service._id} service={service} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </TabsPanels>
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
  )
}

function ServiceCard({ service }: Readonly<{ service: Service }>) {
  return (
    <Link href={`/services/${service.slug.current}`} className="group block">
      <Card variant="retro" className="h-full hover-lift">
        <Card.Header>
          <div className="flex items-start justify-between mb-4">
            {service.icon && (
              <div className="p-4 border-1 border-black rounded-xl group-hover:bg-brand-accent transition-all shadow-sm group-hover:rotate-6">
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
              <div className="ml-auto px-3 py-1 bg-brand-primary border-2 border-black rounded-full text-xs font-black text-white">
                {service.category}
              </div>
            )}
          </div>
          <Card.Title className="text-2xl mb-3 group-hover:text-brand-primary transition-colors flex items-center gap-2">
            {service.title}
            <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-2 transition-all" strokeWidth={3} />
          </Card.Title>
          <Card.Description className="text-base">{service.shortDescription}</Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="text-base text-brand-primary font-black group-hover:underline flex items-center gap-2">
            Learn more
            <ArrowRight className="w-4 h-4" strokeWidth={3} />
          </div>
        </Card.Content>
      </Card>
    </Link>
  )
}
