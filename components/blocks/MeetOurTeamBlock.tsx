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
        containerSize="2xl"
      >
        {/* Decorative elements removed for clean ShadcnUI styling */}

        {title && (
          <AnimatedTitle
            text={title}
            as="h2"
            className={`text-5xl md:text-6xl lg:text-8xl font-black mb-16 lg:mb-24 text-center ${textColor}`}
          />
        )}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {members.map((member, index) => (
            <div key={member._key || (member as any)._id || index} className="group">
              <div className="bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300 p-8 lg:p-10 text-center hover:-translate-y-3 rounded-lg">
                {member.image && (
                  <div className="relative w-56 h-56 lg:w-64 lg:h-64 mx-auto mb-8 border border-border overflow-hidden rounded-xl group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={urlFor(member.image).width(400).height(400).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <h3 className="text-2xl lg:text-3xl font-black mb-3 text-foreground">{member.name}</h3>
                <p className="text-lg lg:text-xl font-bold text-primary mb-6">{member.role}</p>
                {member.socialLinks && member.socialLinks.length > 0 && (
                  <div className="flex justify-center gap-4">
                    {member.socialLinks.map((social, idx) => (
                      <a
                        key={social.platform || social.url || idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-primary text-primary-foreground px-5 py-2.5 font-bold text-base hover:bg-primary/80 transition-colors border border-border rounded-lg"
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
