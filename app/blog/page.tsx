import FullScreenSection from '@/components/ui/FullScreenSection'
import { client } from '@/lib/sanity/client'
import { postsQuery, blogPageQuery } from '@/lib/sanity/queries'
import PageHeroBlock from '@/components/blocks/PageHeroBlock'
import BlogPostsBlock from '@/components/blocks/BlogPostsBlock'

type PageBlock = {
  _type: string
  _key?: string
  _id?: string
  title?: string
  subtitle?: string
  description?: string
  layout?: 'grid' | 'list'
  showFeatured?: boolean
  posts?: Array<Record<string, unknown>>
  cta?: { text?: string; link?: string }
  background?: {
    type: 'color' | 'image' | 'video'
    color?: string
    image?: any
    video?: any
  }
  backgroundColor?: {
    hex: string
    hsl: { h: number; s: number; l: number; a: number }
    rgb: { r: number; g: number; b: number; a: number }
    hsv: { h: number; s: number; v: number; a: number }
  }
  primaryCta?: { text?: string; link?: string }
  secondaryCta?: { text?: string; link?: string }
  backgroundImage?: Record<string, unknown>
  image?: any
  imagePosition?: string
  stats?: Array<Record<string, unknown>>
}

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

async function getBlogPage() {
  try {
    const blog = await client.fetch(blogPageQuery)
    return blog
  } catch (error) {
    console.error('Error fetching blog page:', error)
    return null
  }
}

export default async function BlogPage() {
  const [posts, blog] = await Promise.all([getPosts(), getBlogPage()])

  return (
    <>
      {blog?.pageBuilder?.length ? (
        blog.pageBuilder.map((block: PageBlock, index: number) => {
          switch (block._type) {
            case 'pageHero':
              return (
                <PageHeroBlock
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title ?? 'Blog & Insights'}
                  subtitle={block.subtitle ?? 'Discover the latest trends, tips, and insights from our team of experts.'}
                  cta={block.cta as { text: string; link: string } | undefined}
                  background={block.background as { type: 'color' | 'image' | 'video'; color?: string; image?: unknown; video?: unknown }}
                />
              )
            case 'blogPosts':
              return (
                <BlogPostsBlock
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title}
                  description={block.description}
                  layout={block.layout as 'grid' | 'list'}
                  posts={(block.posts as any[]) || posts}
                />
              )
            default:
              return null
          }
        })
      ) : (
        // Fallback if no pageBuilder
        <>
          <FullScreenSection background="gray">
            <div className="text-center max-w-3xl mx-auto bg-white border-4 border-black shadow-lg p-12">
              <h1 className="text-5xl md:text-7xl font-black text-black mb-6 retro-text-shadow">
                Blog & Insights
              </h1>
              <p className="text-xl text-black font-bold">
                Discover the latest trends, tips, and insights from our team of experts.
              </p>
            </div>
          </FullScreenSection>

          <FullScreenSection>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post: any) => (
                <a key={post._id} href={`/blog/${post.slug.current}`} className="group">
                  <div className="bg-white border-4 border-black shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                    <div className="relative h-64 overflow-hidden border-b-4 border-black">
                      <img
                        src={post.featuredImage ? client.getUrl(post.featuredImage) : '/placeholder-blog.jpg'}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {post.categories && post.categories.length > 0 && (
                        <div className="absolute top-4 left-4">
                          <span className="bg-(--brand-secondary) border-3 border-black px-4 py-2 text-sm font-black text-black shadow-sm">
                            {post.categories[0]}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex items-center text-sm font-bold text-black mb-3">
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
                      <h2 className="text-xl font-black text-black mb-3 group-hover:text-(--brand-primary) transition-colors">
                        {post.title}
                      </h2>
                      <p className="text-black line-clamp-3 font-medium">{post.excerpt}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </FullScreenSection>
        </>
      )}
    </>
  )
}
