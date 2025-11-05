import { client } from '@/lib/sanity/client'
import { servicesQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import Card, { CardBody, CardHeader } from '@/components/ui/Card'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

async function getServices() {
  try {
    const services = await client.fetch(servicesQuery)
    return services
  } catch (error) {
    console.error('Error fetching services:', error)
    return []
  }
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" background="gray">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600">
            We offer a comprehensive range of digital services to help your business thrive in the modern world.
          </p>
        </div>
      </Section>

      {/* Services Grid */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service: any) => (
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
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {service.title}
                  </h2>
                </CardHeader>
                <CardBody>
                  <p className="text-gray-600">{service.shortDescription}</p>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
