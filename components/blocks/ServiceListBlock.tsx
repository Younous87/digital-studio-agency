import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Card } from '@/components/retroui/Card'
import { Button } from '@/components/retroui/Button'
import Link from 'next/link'
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
      <section className="py-20 relative" style={{ backgroundColor: bgColor }}>
        {/* Pattern background */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,0.1) 30px, rgba(0,0,0,0.1) 31px)',
          }} />
        </div>

        <Container className="relative">
          {title && (
            <div className="text-center mb-16 relative">
              <h2 className={`text-4xl md:text-6xl font-black mb-4 ${textColor} retro-text-shadow`}>
                {title}
              </h2>
              {description && (
                <p className={`text-xl max-w-3xl mx-auto font-bold ${subtitleColor}`}>
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="space-y-6">
            {services.map((service, idx) => (
            <Card
              key={service._id}
              variant="retro"
              className="group"
            >
              <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                {service.icon ? (
                  <div className="shrink-0">
                    <div className="border-2 border-black p-6" style={{ transform: `rotate(${(idx % 2 === 0 ? -3 : 3)}deg)` }}>
                      <Image
                        src={urlFor(service.icon as any).width(80).height(80).url()}
                        alt={service.title}
                        width={80}
                        height={80}
                      />
                    </div>
                  </div>
                ) : null}
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-3xl font-black mb-3 text-gray-900">
                    {service.title}
                  </h3>
                  <p className="text-lg mb-6 leading-relaxed text-gray-700 font-medium">
                    {service.shortDescription}
                  </p>
                  <Button asChild variant="default">
                    <Link href={`/services/${service.slug.current}`}>
                      LEARN MORE →
                    </Link>
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
    <section className="py-20 relative" style={{ backgroundColor: bgColor }}>
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.1) 2px, transparent 2px)',
          backgroundSize: '30px 30px',
        }} />
      </div>

      <Container className="relative">
        {title && (
          <div className="text-center mb-16 relative">
            <h2 className={`text-4xl md:text-6xl font-black mb-4 ${textColor} retro-text-shadow`}>
              {title}
            </h2>
            {description && (
              <p className={`text-xl max-w-3xl mx-auto font-bold ${subtitleColor}`}>
                {description}
              </p>
            )}
          </div>
        )}

        <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
          {services.map((service) => (
            <Card
              key={service._id}
              variant="retro"
              className="group h-full w-full p-8 text-center"
            >
                {service.icon ? (
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className=" p-6 group-hover:rotate-6 transition-transform duration-300">
                        <Image
                          src={urlFor(service.icon as any).width(100).height(100).url()}
                          alt={service.title}
                          width={100}
                          height={100}
                        />
                      </div>
                    </div>
                  </div>
                ) : null}
                <h3 className="text-2xl font-black mb-4 text-gray-900">
                  {service.title}
                </h3>
                <p className="text-lg mb-8 leading-relaxed text-gray-700 font-medium">
                  {service.shortDescription}
                </p>
                <Button asChild variant="default">
                  <Link href={`/services/${service.slug.current}`}>
                    LEARN MORE →
                  </Link>
                </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  )
}