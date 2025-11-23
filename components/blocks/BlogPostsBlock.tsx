import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import { Card } from '@/components/retroui/Card'
import { urlFor } from '@/lib/sanity/image'

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
}

export default function BlogPostsBlock({
  title = 'Latest Posts',
  description,
  layout = 'grid',
  posts = []
}: BlogPostsBlockProps) {
  if (!posts || posts.length === 0) {
    return null
  }

  return (
    <Section>
      <div className="max-w-7xl mx-auto">
        {(title || description) && (
          <div className="text-center mb-16">
            {title && (
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 retro-text-shadow">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-gray-700 max-w-3xl mx-auto font-bold">
                {description}
              </p>
            )}
          </div>
        )}

        <div className={`gap-8 ${layout === 'grid' ? 'grid md:grid-cols-2 lg:grid-cols-3' : 'space-y-8'}`}>
          {posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <Card variant="retro" className="h-full group transition-all duration-300 overflow-hidden hover:-translate-y-1">
                <div className={`relative overflow-hidden ${layout === 'list' ? 'h-64 md:h-80' : 'h-64'} border-b-4 border-black`}>
                  <Image
                    src={urlFor(post.featuredImage).width(600).height(400).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {post.categories && post.categories.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-[var(--brand-secondary)] border-3 border-black px-4 py-2 text-sm font-black text-black shadow-sm">
                        {post.categories[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6 bg-white">
                  <div className="flex items-center text-sm font-bold text-gray-600 mb-3">
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
                  <h3 className="text-2xl font-black text-gray-900 mb-3 group-hover:text-[var(--brand-primary)] transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-gray-700 line-clamp-3 font-medium">{post.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  )
}