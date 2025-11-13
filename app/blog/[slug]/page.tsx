import { client } from '@/lib/sanity/client'
import { postBySlugQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/ui/Section'
import Card from '@/components/ui/Card'
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 60

async function getPost(slug: string) {
  try {
    const post = await client.fetch(postBySlugQuery, { slug })
    return post
  } catch (error) {
    console.error('Error fetching post:', error)
    return null
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    notFound()
  }

  return (
    <>
      {/* Hero Section */}
      <Section padding="xl" background="gray">
        <div className="max-w-4xl mx-auto">
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map((category: string, index: number) => (
                <span
                  key={index}
                  className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            {post.title}
          </h1>
          <div className="flex items-center text-gray-600 mb-8">
            {post.author?.photo && (
              <Image
                src={urlFor(post.author.photo).width(60).height(60).url()}
                alt={post.author.name}
                width={60}
                height={60}
                className="rounded-full mr-4"
              />
            )}
            <div>
              {post.author && (
                <p className="font-semibold text-gray-900">{post.author.name}</p>
              )}
              <p className="text-sm">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          {post.excerpt && (
            <p className="text-xl text-gray-700 leading-relaxed">
              {post.excerpt}
            </p>
          )}
        </div>
      </Section>

      {/* Featured Image */}
      {post.featuredImage && (
        <Section padding="none">
          <div className="relative h-[500px] w-full">
            <Image
              src={urlFor(post.featuredImage).width(1600).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        </Section>
      )}

      {/* Content */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <RichTextRenderer content={post.content} />
        </div>
      </Section>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <Section background="gray">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-white px-4 py-2 rounded-full text-sm text-gray-700"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </Section>
      )}

      {/* Author Bio */}
      {post.author?.bio && (
        <Section>
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-lg p-8">
              <div className="flex items-start gap-6">
                {post.author.photo && (
                  <Image
                    src={urlFor(post.author.photo).width(100).height(100).url()}
                    alt={post.author.name}
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {post.author.name}
                  </h3>
                  {post.author.role && (
                    <p className="text-gray-600 mb-4">{post.author.role}</p>
                  )}
                  <RichTextRenderer content={post.author.bio} />
                  {post.author.socialLinks && post.author.socialLinks.length > 0 && (
                    <div className="flex gap-4 mt-4">
                      {post.author.socialLinks.map((social: any, index: number) => (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {social.platform}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <Section background="gray">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Related Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedPost: any) => (
                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`}>
                  <Card hover className="h-full">
                    <div className="relative h-48">
                      <Image
                        src={urlFor(relatedPost.featuredImage).width(400).height(300).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(relatedPost.publishedAt).toLocaleDateString()}
                      </p>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-gray-600 line-clamp-2">
                        {relatedPost.excerpt}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </Section>
      )}
    </>
  )
}
