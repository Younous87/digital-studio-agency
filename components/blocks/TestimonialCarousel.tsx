'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Section from '../ui/Section'
import { Card, CardContent, CardDescription, CardHeader } from '../ui/Card'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '../ui/carousel'
import { Badge } from '../ui/badge'
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
}

export default function TestimonialCarousel({
  title,
  description,
  testimonials,
  layout = 'carousel'
}: Readonly<TestimonialCarouselProps>) {
  if (layout === 'grid') {
    return (
      <Section background="gray">
        {(title || description) && (
          <div className="text-center mb-12">
            {title && (
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
                <Quote className="w-8 h-8 text-brand-accent" />
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial._id} className="bg-linear-to-br from-white to-gray-50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <CardHeader>
                <div className="flex items-start justify-between mb-4">
                  <Quote className="w-10 h-10 text-brand-secondary/20" />
                  {testimonial.rating && (
                    <div className="flex gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star
                          key={`star-${testimonial._id}-${i}`}
                          className={`w-4 h-4 ${
                            i < testimonial.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-6 text-base leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-4 pt-4 border-t">
                  <Avatar className="h-12 w-12 ring-2 ring-brand-primary/20">
                    {testimonial.photo ? (
                      <AvatarImage
                        src={urlFor(testimonial.photo).width(80).height(80).url()}
                        alt={testimonial.clientName}
                      />
                    ) : null}
                    <AvatarFallback className="bg-linear-to-br from-brand-primary/20 to-brand-secondary/20 text-brand-primary font-semibold">
                      {testimonial.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900">{testimonial.clientName}</p>
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
      </Section>
    )
  }

  // Enhanced Carousel layout with shadcn carousel
  return (
    <Section background="gray">
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-2">
              <Quote className="w-8 h-8 text-brand-accent" />
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
                <Card className="h-full bg-linear-to-br from-white via-white to-brand-primary/5 hover:shadow-xl transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <Quote className="w-12 h-12 text-brand-secondary/20" />
                      {testimonial.rating && (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                          {testimonial.rating}/5
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 mb-8 text-lg leading-relaxed italic">
                      &ldquo;{testimonial.quote}&rdquo;
                    </p>
                    <div className="flex items-center gap-4 pt-6 border-t">
                      <Avatar className="h-14 w-14 ring-2 ring-brand-primary/20">
                        {testimonial.photo ? (
                          <AvatarImage
                            src={urlFor(testimonial.photo).width(100).height(100).url()}
                            alt={testimonial.clientName}
                          />
                        ) : null}
                        <AvatarFallback className="bg-linear-to-br from-brand-primary to-brand-secondary text-white font-semibold text-lg">
                          {testimonial.clientName.split(' ').map(n => n[0]).join('').toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-bold text-gray-900 text-lg">{testimonial.clientName}</p>
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
          <CarouselPrevious className="shadow-lg" />
          <CarouselNext className="shadow-lg" />
        </Carousel>
      </div>
    </Section>
  )
}
