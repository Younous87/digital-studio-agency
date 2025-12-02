import { client } from '@/lib/sanity/client'
import { postBySlugQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import FullScreenSection from '@/components/ui/FullScreenSection'
import BackgroundWrapper from '@/components/blocks/BackgroundWrapper'
import { Card } from '@/components/ui/card'
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
      <BackgroundWrapper backgroundImage={post.heroBackground}>
        <FullScreenSection background={post.heroBackground ? 'transparent' : 'gray'}>
          <div className="max-w-4xl mx-auto">
            {post.categories && post.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {post.categories.map((category: string, index: number) => (
                  <span
                    key={index}
                    className="bg-secondary border border-border px-4 py-2 text-sm font-black text-secondary-foreground shadow-sm rounded-md"
                  >
                    {category}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-foreground mb-6">
              {post.title}
            </h1>
            <div className="flex items-center text-foreground mb-8 font-bold">
              {post.author?.photo && (
                <Image
                  src={urlFor(post.author.photo).width(60).height(60).url()}
                  alt={post.author.name}
                  width={60}
                  height={60}
                  className="rounded-md mr-4 border border-border shadow-sm"
                />
              )}
              <div>
                {post.author && (
                  <p className="font-black text-foreground">{post.author.name}</p>
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
              <p className="text-xl text-muted-foreground leading-relaxed font-bold">
                {post.excerpt}
              </p>
            )}
          </div>
        </FullScreenSection>
      </BackgroundWrapper>

      {/* Featured Image */}
      {post.featuredImage && (

        <div className="relative h-[500px] w-full">
          <Image
            src={urlFor(post.featuredImage).width(1600).url()}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

      )}

      {/* Content */}
      <FullScreenSection>
        <div className="max-w-4xl mx-auto">
          <RichTextRenderer content={post.content} />
        </div>
      </FullScreenSection>


      {/* Author Bio */}
      {post.author?.bio && (
        <FullScreenSection>
          <div className="max-w-4xl mx-auto">
            <div className="bg-card border border-border shadow-lg p-8 rounded-md">
              <div className="flex items-start gap-6">
                {post.author.photo && (
                  <Image
                    src={urlFor(post.author.photo).width(100).height(100).url()}
                    alt={post.author.name}
                    width={100}
                    height={100}
                    className="rounded-md border border-border shadow-sm"
                  />
                )}
                <div className="flex-1">
                  <h3 className="text-2xl font-black text-foreground mb-2">
                    {post.author.name}
                  </h3>
                  {post.author.role && (
                    <p className="text-muted-foreground mb-4 font-bold">{post.author.role}</p>
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
                          className="text-primary hover:text-primary/80 font-bold transition-colors"
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
        </FullScreenSection>
      )}

      {/* Related Posts */}
      {post.relatedPosts && post.relatedPosts.length > 0 && (
        <BackgroundWrapper backgroundImage={post.relatedPostsBackground}>
          <FullScreenSection background={post.relatedPostsBackground ? 'transparent' : 'gray'}>
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-black text-foreground mb-8 text-center">
                Related Posts
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {post.relatedPosts.map((relatedPost: any) => (
                  <Link key={relatedPost._id} href={`/blog/${relatedPost.slug.current}`}>
                    <Card className="h-full border border-border shadow-sm transition-all duration-300 overflow-hidden hover:-translate-y-1 rounded-md">
                      <div className="relative h-48 border-b border-border">
                        <Image
                          src={urlFor(relatedPost.featuredImage).width(400).height(300).url()}
                          alt={relatedPost.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-6 bg-card">
                        <p className="text-sm font-bold text-muted-foreground mb-2">
                          {new Date(relatedPost.publishedAt).toLocaleDateString()}
                        </p>
                        <h3 className="text-lg font-black text-foreground mb-2">
                          {relatedPost.title}
                        </h3>
                        <p className="text-muted-foreground line-clamp-2 font-medium">
                          {relatedPost.excerpt}
                        </p>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </FullScreenSection>
        </BackgroundWrapper>
      )}
    </>
  )
}
