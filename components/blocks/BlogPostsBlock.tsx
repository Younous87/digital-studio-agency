import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import BackgroundWrapper from './BackgroundWrapper'
import { Card } from '@/components/ui/card'
import { urlFor } from '@/lib/sanity/image'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import AnimatedSubtitle from '@/components/ui/AnimatedSubtitle'

interface BlogPost {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt: string
  featuredImage: any
  publishedAt: string
  author?: {
    name: string
    role?: string
    photo?: any
  }
  categories?: string[]
  tags?: string[]
}

interface BlogPostsBlockProps {
  readonly title?: string
  readonly description?: string
  readonly layout?: 'grid' | 'list'
  readonly posts?: BlogPost[]
  readonly backgroundImage?: any
}

export default function BlogPostsBlock({
  title = 'Latest Posts',
  description,
  layout = 'grid',
  posts = [],
  backgroundImage
}: BlogPostsBlockProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <Section background={backgroundImage ? 'transparent' : 'white'} containerSize="2xl" padding="xl">
        <div className="w-full">
          {(title || description) && (
            <div className="text-center mb-16 lg:mb-24">
              {title && (
                <AnimatedTitle
                  text={title}
                  as="h2"
                  className="text-5xl md:text-6xl lg:text-8xl font-black text-foreground mb-8"
                />
              )}
              {description && (
                <AnimatedSubtitle
                  text={description}
                  as="p"
                  className="text-xl lg:text-2xl text-muted-foreground max-w-4xl mx-auto font-bold"
                />
              )}
            </div>
          )}

          <div className={`gap-6 lg:gap-10 ${layout === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3' : 'space-y-10'}`}>
            {posts.map((post) => (
              <Link key={post._id} href={`/blog/${post.slug.current}`}>
                <Card className="h-full group transition-all duration-300 overflow-hidden hover:-translate-y-2 hover:shadow-xl border border-border">
                  <div className={`relative overflow-hidden ${layout === 'list' ? 'h-72 md:h-96' : 'h-72 lg:h-80'} border-b border-border`}>
                    <Image
                      src={urlFor(post.featuredImage).width(800).height(600).url()}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    {post.categories && post.categories.length > 0 && (
                      <div className="absolute top-5 left-5">
                        <span className="bg-secondary border border-border px-5 py-2.5 text-base font-black text-secondary-foreground shadow-sm rounded-lg">
                          {post.categories[0]}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="p-6 lg:p-8 bg-card">
                    <div className="flex items-center text-base font-bold text-muted-foreground mb-4">
                      {post.author && (
                        <span className="mr-4">{post.author.name}</span>
                      )}
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <h3 className="text-2xl lg:text-3xl font-black text-foreground mb-4 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-3 font-medium text-lg">{post.excerpt}</p>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </Section>
    </BackgroundWrapper>
  )
}