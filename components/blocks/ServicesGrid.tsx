import Image from 'next/image'
import Link from 'next/link'
import Section from '../ui/Section'
import Card, { CardBody, CardHeader } from '../ui/Card'
import { urlFor } from '@/lib/sanity/image'

interface Service {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  icon?: any
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
  return (
    <Section background="gray">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
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

      <div className={`grid gap-8 ${
        layout === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'md:grid-cols-1'
      }`}>
        {services.map((service) => (
          <Link key={service._id} href={`/services/${service.slug.current}`}>
            <Card hover className="h-full">
              <CardHeader>
                {service.icon && (
                  <div className="mb-4">
                    <Image
                      src={urlFor(service.icon).width(80).url()}
                      alt={service.title}
                      width={80}
                      height={80}
                      className="w-16 h-16"
                    />
                  </div>
                )}
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {service.title}
                </h3>
              </CardHeader>
              <CardBody>
                <p className="text-gray-600">{service.shortDescription}</p>
              </CardBody>
            </Card>
          </Link>
        ))}
      </div>
    </Section>
  )
}
