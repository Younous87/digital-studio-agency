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
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import AnimatedSubtitle from '@/components/ui/AnimatedSubtitle'

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
        <FullScreenSection background={backgroundImage ? 'transparent' : 'white'} containerSize="2xl">
          {(title || description) && (
            <div className="text-center mb-16 lg:mb-20">
              {title && (
                <div className="flex items-center justify-center gap-3 mb-6">
                  <Quote className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                  <AnimatedTitle
                    text={title}
                    as="h2"
                    className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground"
                  />
                </div>
              )}
              {description && (
                <AnimatedSubtitle
                  text={description}
                  as="p"
                  className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto"
                />
              )}
            </div>
          )}

          <div className="grid gap-6 lg:gap-10 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial._id} className="bg-card hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-6">
                    <Quote className="w-12 h-12 lg:w-14 lg:h-14 text-muted-foreground/20" />
                    {testimonial.rating && (
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }, (_, i) => (
                          <Star
                            key={`star-${testimonial._id}-${i}`}
                            className={`w-5 h-5 ${
                              i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/30'
                            }`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-8 text-lg lg:text-xl leading-relaxed">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-4 pt-6 border-t border-border">
                    <Avatar className="h-14 w-14 lg:h-16 lg:w-16">
                      {testimonial.photo ? (
                        <AvatarImage
                          src={urlFor(testimonial.photo).width(120).height(120).url()}
                          alt={testimonial.clientName}
                        />
                      ) : null}
                      <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                        {testimonial.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold text-foreground text-lg">{testimonial.clientName}</p>
                      {testimonial.role && testimonial.company && (
                        <CardDescription className="text-base">
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
      <FullScreenSection background={backgroundImage ? 'transparent' : 'white'} containerSize="2xl">
        {(title || description) && (
          <div className="text-center mb-16 lg:mb-20">
            {title && (
              <div className="flex items-center justify-center gap-3 mb-6">
                <Quote className="w-10 h-10 lg:w-12 lg:h-12 text-primary" />
                <AnimatedTitle
                  text={title}
                  as="h2"
                  className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground"
                />
              </div>
            )}
            {description && (
              <AnimatedSubtitle
                text={description}
                as="p"
                className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto"
              />
            )}
          </div>
        )}

        <div className="w-full px-4 lg:px-16">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 lg:-ml-8">
              {testimonials.map((testimonial) => (
                <CarouselItem key={testimonial._id} className="pl-4 lg:pl-8 md:basis-1/2 lg:basis-1/2">
                  <Card className="h-full bg-card transition-all duration-300">
                    <CardHeader className="pb-4">
                      <div className="flex items-start justify-between mb-6">
                        <Quote className="w-14 h-14 lg:w-16 lg:h-16 text-muted-foreground/20" />
                        {testimonial.rating && (
                          <Badge variant="secondary" className="flex items-center gap-1 text-base px-4 py-2">
                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            {testimonial.rating}/5
                          </Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-10 text-xl lg:text-2xl leading-relaxed italic">
                        &ldquo;{testimonial.quote}&rdquo;
                      </p>
                      <div className="flex items-center gap-5 pt-8 border-t border-border">
                        <Avatar className="h-16 w-16 lg:h-20 lg:w-20">
                          {testimonial.photo ? (
                            <AvatarImage
                              src={urlFor(testimonial.photo).width(160).height(160).url()}
                              alt={testimonial.clientName}
                            />
                          ) : null}
                          <AvatarFallback className="bg-primary text-primary-foreground font-semibold text-xl">
                            {testimonial.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-bold text-foreground text-xl lg:text-2xl">{testimonial.clientName}</p>
                          {testimonial.role && testimonial.company && (
                            <CardDescription className="text-base lg:text-lg font-medium">
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
            <CarouselPrevious className="hidden lg:flex -left-20 w-14 h-14" />
            <CarouselNext className="hidden lg:flex -right-20 w-14 h-14" />
          </Carousel>
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
