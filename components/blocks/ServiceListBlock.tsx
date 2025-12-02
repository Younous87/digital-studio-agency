import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Container from '@/components/ui/Container'
import BackgroundWrapper from './BackgroundWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import AnimatedSubtitle from '@/components/ui/AnimatedSubtitle'

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
  readonly backgroundImage?: any
}

export default function ServiceListBlock({
  title = 'Our Services',
  description,
  layout = 'grid',
  services = [],
  backgroundColor,
  backgroundImage
}: ServiceListBlockProps) {
  const bgColor = backgroundColor?.hex || '#ffffff'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  
  let textColor = isDark ? 'text-primary-foreground' : 'text-foreground'
  let subtitleColor = isDark ? 'text-primary-foreground/70' : 'text-muted-foreground'

  if (backgroundImage) {
    textColor = 'text-foreground'
    subtitleColor = 'text-muted-foreground'
  }

  if (layout === 'list') {
    return (
      <BackgroundWrapper backgroundImage={backgroundImage}>
        <section className="py-20 relative" style={{ backgroundColor: backgroundImage ? 'transparent' : bgColor }}>
          {/* Pattern background - only if no background image */}
          {!backgroundImage && (
            <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0" style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(0,0,0,0.1) 30px, rgba(0,0,0,0.1) 31px)',
              }} />
            </div>
          )}

          <Container className="relative">
            {title && (
              <div className="text-center mb-16 relative">
                <AnimatedTitle
                  text={title}
                  as="h2"
                  className={`text-4xl md:text-6xl font-black mb-4 ${textColor}`}
                  wordsPerGroup={2}
                  gradientStartGroup={0}
                  gradientInterval={2}
                />
                {description && (
                  <AnimatedSubtitle
                    text={description}
                    as="p"
                    className={`text-xl max-w-3xl mx-auto font-bold ${subtitleColor}`}
                    wordsPerGroup={3}
                    gradientStartGroup={1}
                    gradientInterval={2}
                  />
                )}
              </div>
            )}

            <div className="space-y-6">
              {services.map((service, idx) => (
              <Card
                key={service._id}
                className="group border border-border shadow-sm"
              >
                <div className="flex flex-col md:flex-row items-center gap-8 p-8">
                  {service.icon ? (
                    <div className="shrink-0">
                      <div className="border border-border p-6">
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
                    <h3 className="text-3xl font-black mb-3 text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-lg mb-6 leading-relaxed text-muted-foreground font-medium">
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
      </BackgroundWrapper>
    )
  }

  // Grid layout (default)
  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <section className="py-20 relative" style={{ backgroundColor: backgroundImage ? 'transparent' : bgColor }}>
        {/* Grid pattern - only if no background image */}
        {!backgroundImage && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 2px, transparent 2px), linear-gradient(90deg, rgba(0,0,0,0.1) 2px, transparent 2px)',
              backgroundSize: '30px 30px',
            }} />
          </div>
        )}

        <Container className="relative">
          {title && (
            <div className="text-center mb-16 relative">
              <AnimatedTitle
                text={title}
                as="h2"
                className={`text-4xl md:text-6xl font-black mb-4 ${textColor}`}
                wordsPerGroup={2}
                gradientStartGroup={0}
                gradientInterval={2}
              />
              {description && (
                <AnimatedSubtitle
                  text={description}
                  as="p"
                  className={`text-xl max-w-3xl mx-auto font-bold ${subtitleColor}`}
                  wordsPerGroup={3}
                  gradientStartGroup={1}
                  gradientInterval={2}
                />
              )}
            </div>
          )}

          <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-8">
            {services.map((service) => (
              <Card
                key={service._id}
                className="group h-full w-full p-8 text-center border border-border shadow-sm"
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
                  <h3 className="text-2xl font-black mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-lg mb-8 leading-relaxed text-muted-foreground font-medium">
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
    </BackgroundWrapper>
  )
}