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
                  className="bg-(--brand-secondary) border-3 border-black px-4 py-2 text-sm font-black text-black shadow-brutal-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          )}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-black mb-6 retro-text-shadow">
            {post.title}
          </h1>
          <div className="flex items-center text-black mb-8 font-bold">
            {post.author?.photo && (
              <Image
                src={urlFor(post.author.photo).width(60).height(60).url()}
                alt={post.author.name}
                width={60}
                height={60}
                className="rounded-none mr-4 border-4 border-black shadow-brutal-sm"
              />
            )}
            <div>
              {post.author && (
                <p className="font-black text-black">{post.author.name}</p>
              )}
              <p className="text-sm font-bold">
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          </div>
          {post.excerpt && (
            <p className="text-xl text-black leading-relaxed font-bold">
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
            <h3 className="text-lg font-black text-black mb-4 retro-text-shadow">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string, index: number) => (
                <span
                  key={index}
                  className="bg-(--brand-primary) border-3 border-black px-4 py-2 text-sm font-black text-black shadow-brutal-sm"
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
            <div className="bg-white border-4 border-black shadow-brutal-lg p-8">
              <div className="flex items-start gap-6">
                {post.author.photo && (
                  <Image
                    src={urlFor(post.author.photo).width(100).height(100).url()}
                    alt={post.author.name}
                    width={100}
                    height={100}
                    className="rounded-none border-4 border-black shadow-brutal-sm"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-black mb-2 retro-text-shadow">
                    {post.author.name}
                  </h3>
                  {post.author.role && (
                    <p className="text-black mb-4 font-bold">{post.author.role}</p>
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
                          className="text-(--brand-primary) hover:text-(--brand-secondary) font-bold transition-colors"
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
            <h2 className="text-3xl font-black text-black mb-8 text-center retro-text-shadow">
              Related Posts
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {post.relatedPosts.map((relatedPost: any) => (
                <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`}>
                  <Card hover className="h-full border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 border-b-4 border-black">
                      <Image
                        src={urlFor(relatedPost.featuredImage).width(400).height(300).url()}
                        alt={relatedPost.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 bg-white">
                      <p className="text-sm font-bold text-black mb-2">
                        {new Date(relatedPost.publishedAt).toLocaleDateString()}
                      </p>
                      <h3 className="text-lg font-black text-black mb-2">
                        {relatedPost.title}
                      </h3>
                      <p className="text-black line-clamp-2 font-medium">
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
