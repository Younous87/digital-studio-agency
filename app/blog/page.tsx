import { client } from '@/lib/sanity/client'
import { postsQuery } from '@/lib/sanity/queries'
import Link from 'next/link'
import Image from 'next/image'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

async function getPosts() {
  try {
    const posts = await client.fetch(postsQuery)
    return posts
  } catch (error) {
    console.error('Error fetching posts:', error)
    return []
  }
}

export default async function BlogPage() {
  const posts = await getPosts()

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" background="gray">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Blog & Insights
          </h1>
          <p className="text-xl text-gray-600">
            Discover the latest trends, tips, and insights from our team of experts.
          </p>
        </div>
      </Section>

      {/* Blog Posts Grid */}
      <Section>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post: any) => (
            <Link key={post._id} href={`/blog/${post.slug.current}`}>
              <Card hover className="h-full group">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={urlFor(post.featuredImage).width(600).height(400).url()}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {post.categories && post.categories.length > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-800">
                        {post.categories[0]}
                      </span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
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
                  <h2 className="text-xl font-bold text-gray-900 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 line-clamp-3">{post.excerpt}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  )
}
