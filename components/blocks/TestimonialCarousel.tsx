'use client'

import { useState } from 'react'
import Image from 'next/image'
import Section from '../ui/Section'
import { urlFor } from '@/lib/sanity/image'

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
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  if (layout === 'grid') {
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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div key={testimonial._id} className="bg-white rounded-lg p-8 shadow-md">
              {testimonial.rating && (
                <div className="flex mb-4">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating! ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              )}
              <p className="text-gray-700 mb-6 italic">&ldquo;{testimonial.quote}&rdquo;</p>
              <div className="flex items-center">
                {testimonial.photo && (
                  <Image
                    src={urlFor(testimonial.photo).width(60).height(60).url()}
                    alt={testimonial.clientName}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                )}
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.clientName}</p>
                  {testimonial.role && testimonial.company && (
                    <p className="text-sm text-gray-600">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    )
  }

  // Carousel layout
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

      <div className="relative max-w-4xl mx-auto">
        <div className="bg-white rounded-lg p-8 md:p-12 shadow-lg">
          {testimonials[currentIndex]?.rating && (
            <div className="flex justify-center mb-6">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-6 h-6 ${
                    i < testimonials[currentIndex].rating! ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          )}
          <p className="text-xl md:text-2xl text-gray-700 mb-8 text-center italic">
            &ldquo;{testimonials[currentIndex]?.quote}&rdquo;
          </p>
          <div className="flex items-center justify-center">
            {testimonials[currentIndex]?.photo && (
              <Image
                src={urlFor(testimonials[currentIndex].photo).width(80).height(80).url()}
                alt={testimonials[currentIndex].clientName}
                width={80}
                height={80}
                className="rounded-full mr-4"
              />
            )}
            <div className="text-center">
              <p className="font-semibold text-gray-900 text-lg">
                {testimonials[currentIndex]?.clientName}
              </p>
              {testimonials[currentIndex]?.role && testimonials[currentIndex]?.company && (
                <p className="text-gray-600">
                  {testimonials[currentIndex].role}, {testimonials[currentIndex].company}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Navigation */}
        {testimonials.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Previous testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={next}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-gray-50 transition-colors"
              aria-label="Next testimonial"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots */}
            <div className="flex justify-center mt-8 gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex ? 'bg-blue-600 w-8' : 'bg-gray-300'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </Section>
  )
}
