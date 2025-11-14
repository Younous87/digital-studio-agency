import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import Card, { CardBody } from '@/components/ui/Card'
import Button from '@/components/ui/Button'
import Container from '@/components/ui/Container'

interface Service {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  icon?: unknown
}

interface ServiceListBlockProps {
  readonly title?: string
  readonly description?: string
  readonly layout?: 'grid' | 'list'
  readonly services?: Service[]
  readonly backgroundColor?: {
    readonly hex: string
    readonly hsl: { readonly h: number; readonly s: number; readonly l: number; readonly a: number }
    readonly rgb: { readonly r: number; readonly g: number; readonly b: number; readonly a: number }
    readonly hsv: { readonly h: number; readonly s: number; readonly v: number; readonly a: number }
  }
}

export default function ServiceListBlock({
  title = 'Our Services',
  description,
  layout = 'grid',
  services = [],
  backgroundColor
}: ServiceListBlockProps) {
  const bgColor = backgroundColor?.hex || '#ffffff'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const subtitleColor = isDark ? 'text-gray-300' : 'text-gray-600'

  if (layout === 'list') {
    return (
      <section className="py-20" style={{ backgroundColor: bgColor }}>
        <Container>
          {title && (
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
                {title}
              </h2>
              {description && (
                <p className={`text-xl max-w-3xl mx-auto ${subtitleColor}`}>
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="space-y-6">
            {services.map((service) => (
              <Card
                key={service._id}
                hover
                className={`border-0 shadow-lg ${
                  isDark
                    ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700'
                    : 'bg-white/80 backdrop-blur-sm'
                }`}
              >
                <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                  {service.icon ? (
                    <div className="shrink-0">
                      <div className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl"></div>
                        <div className="relative bg-white rounded-2xl p-4 shadow-lg">
                          <Image
                            src={urlFor(service.icon as any).width(80).height(80).url()}
                            alt={service.title}
                            width={80}
                            height={80}
                            className="rounded-xl"
                          />
                        </div>
                      </div>
                    </div>
                  ) : null}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className={`text-2xl font-bold mb-3 ${textColor}`}>
                      {service.title}
                    </h3>
                    <p className={`text-lg mb-6 leading-relaxed ${subtitleColor}`}>
                      {service.shortDescription}
                    </p>
                    <Button
                      variant="primary"
                      href={`/services/${service.slug.current}`}
                      className="shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      Learn More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>
    )
  }

  // Grid layout (default)
  return (
    <section className="py-20" style={{ backgroundColor: bgColor }}>
      <Container>
        {title && (
          <div className="text-center mb-16">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 ${textColor}`}>
              {title}
            </h2>
            {description && (
              <p className={`text-xl max-w-3xl mx-auto ${subtitleColor}`}>
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service._id}
              hover
              className={`group h-full border-0 shadow-lg transition-all duration-300 ${
                isDark
                  ? 'bg-gray-800/50 backdrop-blur-sm border-gray-700 hover:bg-gray-800/70'
                  : 'bg-white/80 backdrop-blur-sm hover:bg-white/90'
              }`}
            >
              <CardBody className="p-8 text-center">
                {service.icon ? (
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-linear-to-br from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300"></div>
                      <div className="relative bg-white rounded-2xl p-4 shadow-lg group-hover:shadow-xl transition-all duration-300">
                        <Image
                          src={urlFor(service.icon as any).width(64).height(64).url()}
                          alt={service.title}
                          width={64}
                          height={64}
                          className="rounded-xl"
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                <h3 className={`text-2xl font-bold mb-4 ${textColor} group-hover:text-blue-600 transition-colors duration-300`}>
                  {service.title}
                </h3>
                <p className={`text-lg mb-8 leading-relaxed ${subtitleColor}`}>
                  {service.shortDescription}
                </p>
                <Button
                  variant="primary"
                  href={`/services/${service.slug.current}`}
                  className="shadow-lg hover:shadow-xl transition-all duration-300 group-hover:scale-105"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}