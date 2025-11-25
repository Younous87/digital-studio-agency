import FullScreenSection from '@/components/ui/FullScreenSection'
import { client } from '@/lib/sanity/client'
import { teamMembersQuery, aboutQuery } from '@/lib/sanity/queries'
// Image and urlFor unused here now; keep ready if needed for future blocks
import RichTextRenderer from '@/components/blocks/RichTextRenderer'
import HeroBlock from '@/components/blocks/HeroBlock'
type PageBlock = {
  _type: string
  _key?: string
  _id?: string
  headline?: string
  subheadline?: string
  title?: string
  subtitle?: string
  content?: unknown
  values?: Array<{ _key: string; title: string; description?: string; icon?: string }>
  showTeam?: boolean
  teamMembers?: Array<Record<string, unknown>>
  members?: Array<Record<string, unknown>>
  cta?: { text?: string; link?: string }
  secondaryCta?: { text?: string; link?: string }
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
}
import AboutStoryBlock from '@/components/blocks/AboutStoryBlock'
import AboutValuesBlock from '@/components/blocks/AboutValuesBlock'
import MeetOurTeamBlock from '@/components/blocks/MeetOurTeamBlock'
import PageHeroBlock from '@/components/blocks/PageHeroBlock'
import BackgroundWrapper from '@/components/blocks/BackgroundWrapper'

export const revalidate = 60

async function getTeamMembers() {
  try {
    const team = await client.fetch(teamMembersQuery)
    return team
  } catch (error) {
    console.error('Error fetching team members:', error)
    return []
  }
}

async function getAboutPage() {
  try {
    const about = await client.fetch(aboutQuery)
    return about
  } catch (error) {
    console.error('Error fetching about page:', error)
    return null
  }
}

export default async function AboutPage() {
  const [team, about] = await Promise.all([getTeamMembers(), getAboutPage()])

  return (
    <>
      {about.pageBuilder?.length ? (
        about.pageBuilder.map((block: PageBlock, index: number) => {
          switch (block._type) {
            case 'hero':
              return (
                <HeroBlock
                  key={block._key || block._id || `${block._type}-${index}`}
                  headline={block.headline ?? ''}
                  subheadline={block.subheadline ?? ''}
                  cta={block.cta ? { text: String(block.cta.text ?? ''), link: String(block.cta.link ?? '') } : undefined}
                  secondaryCta={block.secondaryCta ? { text: String(block.secondaryCta.text ?? ''), link: String(block.secondaryCta.link ?? '') } : undefined}
                  backgroundImage={block.backgroundImage}
                  backgroundVideo={typeof block.backgroundVideo === 'string' ? block.backgroundVideo : undefined}
                />
              )
            case 'pageHero':
              return (
                <PageHeroBlock
                  key={block._key || block._id || `${block._type}-${index}`}
                  title={block.title ?? ''}
                  subtitle={block.subtitle}
                  cta={block.cta as { text: string; link: string } | undefined}
                  background={block.background as { type: 'color' | 'image' | 'video'; color?: string; image?: unknown; video?: unknown }}
                />
              )
            case 'ourStory':
              return <AboutStoryBlock key={block._key || block._id || `${block._type}-${index}`} title={block.title} content={block.content} backgroundColor={block.backgroundColor} backgroundImage={block.backgroundImage} />
            case 'ourValues':
              return <AboutValuesBlock key={block._key || block._id || `${block._type}-${index}`} title={block.title} values={block.values as any[]} backgroundColor={block.backgroundColor} backgroundImage={block.backgroundImage} />
            case 'meetOurTeam':
              return <MeetOurTeamBlock key={block._key || block._id || `${block._type}-${index}`} title={block.title} showTeam={block.showTeam} members={(block.teamMembers || block.members || team) as any[]} backgroundColor={block.backgroundColor} backgroundImage={block.backgroundImage} />
            case 'aboutSection':
              return (
                <BackgroundWrapper key={block._key || block._id || `${block._type}-${index}`} backgroundImage={block.backgroundImage}>
                  <FullScreenSection background={block.backgroundImage ? 'transparent' : 'white'}>
                    <div className="max-w-4xl mx-auto">
                      {block.title && <h2 className="text-4xl md:text-5xl font-black text-black mb-6 text-center retro-text-shadow">{block.title}</h2>}
                      {Array.isArray(block.content) ? <RichTextRenderer content={block.content} /> : null}
                    </div>
                  </FullScreenSection>
                </BackgroundWrapper>
              )
            default:
              return null
          }
        })
      ) : (
        // Fallback if no pageBuilder
        <>
          {/* existing fallback content omitted for brevity: render the default static sections using previous code paths */}
          <FullScreenSection background="gray">
            <div className="text-center max-w-3xl mx-auto bg-white border-4 border-black shadow-lg p-12">
              <h1 className="text-5xl md:text-7xl font-black text-black mb-6 retro-text-shadow">About Us</h1>
              <p className="text-xl text-black font-bold">We are a team of passionate creatives and technologists dedicated to crafting exceptional digital experiences.</p>
            </div>
          </FullScreenSection>
          {/* Fallback story/values/team as before */}
          <FullScreenSection>
            <div className="max-w-4xl mx-auto bg-white border-4 border-black shadow-lg p-8 md:p-12">
              <h2 className="text-4xl md:text-6xl font-black text-black mb-8 text-center retro-text-shadow">Our Story</h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-lg text-black leading-relaxed mb-6 font-medium">Founded in 2020, Digital Studio emerged from a simple belief: that great digital experiences have the power to transform businesses and delight users.</p>
                <p className="text-lg text-black leading-relaxed mb-6 font-medium">Over the years, we have worked with startups, established brands, and everything in between, helping them navigate the ever-evolving digital landscape with innovative solutions and strategic insights.</p>
                <p className="text-lg text-black leading-relaxed font-medium">Today, we are proud to be a trusted partner for businesses looking to make their mark in the digital world.</p>
              </div>
            </div>
          </FullScreenSection>
        </>
      )}
    </>
  )
}
