import FullScreenSection from '@/components/ui/FullScreenSection'
import { client } from '@/lib/sanity/client'
import { projectsPageQuery } from '@/lib/sanity/queries'
import BlockRenderer from '@/components/blocks/BlockRenderer'

type PageBlock = {
  _type: string
  _key?: string
  _id?: string
  headline?: string
  subheadline?: string
  title?: string
  subtitle?: string
  description?: string
  content?: unknown
  layout?: string
  showAll?: boolean
  showFeatured?: boolean
  projects?: Array<Record<string, unknown>>
  services?: Array<Record<string, unknown>>
  testimonials?: Array<Record<string, unknown>>
  stats?: Array<Record<string, unknown>>
  cta?: { text?: string; link?: string }
  secondaryCta?: { text?: string; link?: string }
  primaryCta?: { text?: string; link?: string }
  backgroundImage?: Record<string, unknown>
  backgroundVideo?: Record<string, unknown>
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
  image?: Record<string, unknown>
  imagePosition?: string
}

export const revalidate = 60

async function getProjectsPage() {
  try {
    const projectsPage = await client.fetch(projectsPageQuery)
    return projectsPage
  } catch (error) {
    console.error('Error fetching projects page:', error)
    return null
  }
}

export default async function WorkPage() {
  const projectsPage = await getProjectsPage()

  return (
    <>
      {projectsPage?.pageBuilder?.length ? (
        projectsPage.pageBuilder.map((block: PageBlock, index: number) => (
          <BlockRenderer key={block._key || block._id || `${block._type}-${index}`} block={block} index={index} />
        ))
      ) : (
        // Fallback if no pageBuilder
        <>
          {/* Hero Section */}
          <FullScreenSection background="gray">
            <div className="text-center max-w-3xl mx-auto bg-white border-4 border-black shadow-lg p-12">
              <h1 className="text-5xl md:text-7xl font-black text-black mb-6 retro-text-shadow">
                Our Work
              </h1>
              <p className="text-xl text-black font-bold">
                Explore our portfolio of successful projects and discover how we've helped businesses achieve their goals.
              </p>
            </div>
          </FullScreenSection>

          {/* Projects Grid - fallback */}
          <FullScreenSection>
            <div className="text-center mb-12 bg-white border-4 border-black shadow-lg p-12 max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black text-black mb-6 retro-text-shadow">
                Featured Projects
              </h2>
              <p className="text-xl text-black font-bold max-w-2xl mx-auto">
                Check out some of our recent work and see how we've helped businesses succeed.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Fallback projects would be rendered here */}
              <div className="text-center p-8 bg-white border-4 border-black shadow-lg">
                <p className="text-black font-bold">No projects configured yet. Please set up your projects page in Sanity Studio.</p>
              </div>
            </div>
          </FullScreenSection>
        </>
      )}
    </>
  )
}
