'use client'

import Image from 'next/image'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import { Card, CardHeader, CardContent, CardDescription } from '@/components/ui/card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Badge } from '@/components/ui/badge'
import { urlFor } from '@/lib/sanity/image'
import { Quote, Star } from 'lucide-react'

interface Testimonial {
  _id: string
  clientName: string
  company?: string
  role?: string
  quote: string
  photo?: any
  rating?: number
}

interface TestimonialCarouselProps {
  title?: string
  description?: string
  testimonials: Testimonial[]
  layout?: 'carousel' | 'grid'
  backgroundImage?: any
}

export default function TestimonialCarousel({
  title,
  description,
  testimonials,
  layout = 'carousel',
  backgroundImage
}: Readonly<TestimonialCarouselProps>) {
  if (layout === 'grid') {
    return (
      <BackgroundWrapper backgroundImage={backgroundImage}>
        <FullScreenSection background={backgroundImage ? 'transparent' : 'gray'}>
          {(title || description) && (
            <div className="text-center mb-12">
              {title && (
                <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                  <Quote className="w-8 h-8 text-primary" />
                  {title}
                </h2>
              )}
              {description && (
                <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  {description}
                </p>
              )}
            </div>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial._id} className="bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <Quote className="w-10 h-10 text-muted-foreground/20" />
                    {testimonial.rating && (
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={`star-${testimonial._id}-${i}`}
                            className={`w-4 h-4 ${
                              i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-6 text-base leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-4 border-t border-border">
                    <Avatar className="h-12 w-12">
                      {testimonial.photo ? (
                        <AvatarImage
                          src={urlFor(testimonial.photo).width(80).height(80).url()}
                          alt={testimonial.clientName}
                        />
                      ) : null}
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                        {testimonial.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground">{testimonial.clientName}</p>
                      {testimonial.role && testimonial.company && (
                        <CardDescription className="text-sm">
                          {testimonial.role} • {testimonial.company}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </FullScreenSection>
      </BackgroundWrapper>
    )
  }

  // Enhanced Carousel layout with shadcn carousel
  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection background={backgroundImage ? 'transparent' : 'gray'}>
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4 flex items-center justify-center gap-2">
                <Quote className="w-8 h-8 text-primary" />
                {title}
              </h2>
            )}
            {description && (
              <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        <div className="max-w-5xl mx-auto px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial._id} className="md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full bg-card transition-all duration-300">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <Quote className="w-12 h-12 text-muted-foreground/20" />
                        {testimonial.rating && (
                          <Badge variant="secondary" className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            {testimonial.rating}/5
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-8 text-lg leading-relaxed italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-4 pt-6 border-t border-border">
                        <Avatar className="h-14 w-14">
                          {testimonial.photo ? (
                            <AvatarImage
                              src={urlFor(testimonial.photo).width(100).height(100).url()}
                              alt={testimonial.clientName}
                            />
                          ) : null}
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-lg">
                            {testimonial.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-bold text-foreground text-lg">{testimonial.clientName}</p>
                          {testimonial.role && testimonial.company && (
                            <CardDescription className="text-sm font-medium">
                              {testimonial.role} • {testimonial.company}
                            </CardDescription>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
