import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'

interface TeamMember {
  _key: string
  name: string
  role?: string
  image?: any
  socialLinks?: any[]
}

interface MeetOurTeamBlockProps {
  title?: string
  showTeam?: boolean
  members?: TeamMember[]
  backgroundColor?: {
    hex: string
    hsl: { h: number; s: number; l: number; a: number }
    rgb: { r: number; g: number; b: number; a: number }
    hsv: { h: number; s: number; v: number; a: number }
  }
  backgroundImage?: any
}

export default function MeetOurTeamBlock({ title, showTeam = true, members = [], backgroundColor, backgroundImage }: Readonly<MeetOurTeamBlockProps>) {
  const bgColor = backgroundColor?.hex || '#FF6B35'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  const textColor = backgroundImage ? 'text-foreground' : (isDark ? 'text-primary-foreground' : 'text-foreground')

  if (!showTeam) return null

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection
        background="transparent"
        className="relative overflow-hidden"
        style={{ backgroundColor: backgroundImage ? 'transparent' : bgColor }}
      >
        {/* Decorative elements removed for clean ShadcnUI styling */}

        {title && (
          <AnimatedTitle
            text={title}
            as="h2"
            className={`text-4xl md:text-6xl font-black mb-16 text-center ${textColor}`}
            wordsPerGroup={2}
            gradientStartGroup={0}
            gradientInterval={2}
          />
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {members.map((member, index) => (
            <div key={member._key || (member as any)._id || index} className="group">
              <div className="bg-card border border-border shadow-sm hover:shadow-md transition-all duration-300 p-8 text-center hover:-translate-y-2">
                {member.image && (
                  <div className="relative w-48 h-48 mx-auto mb-6 border border-border overflow-hidden rounded-md group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={urlFor(member.image).width(300).height(300).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-2xl font-black mb-2 text-foreground">{member.name}</h3>
                <p className="text-lg font-bold text-primary mb-4">{member.role}</p>
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex justify-center gap-3">
                    {member.socialLinks.map((social, idx) => (
                      <a
                        key={social.platform || social.url || idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-primary-foreground px-4 py-2 font-bold text-sm hover:bg-primary/80 transition-colors border border-border rounded-md"
                      >
                        {social.platform}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
