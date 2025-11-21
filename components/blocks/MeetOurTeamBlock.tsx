import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import Container from '../ui/Container'
import FullScreenSection from '../ui/FullScreenSection'

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
}

export default function MeetOurTeamBlock({ title, showTeam = true, members = [], backgroundColor }: Readonly<MeetOurTeamBlockProps>) {
  const bgColor = backgroundColor?.hex || '#FF6B35'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  const textColor = isDark ? 'text-white' : 'text-gray-900'

  if (!showTeam) return null

  return (
    <FullScreenSection
      background="transparent"
      className="relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Decorative elements */}
      <div className="absolute top-10 left-10 w-32 h-32 border-4 border-black opacity-20 rotate-12 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-40 h-40 border-4 border-black opacity-20 -rotate-12 pointer-events-none" />

      {title && (
        <h2 className={`text-4xl md:text-6xl font-black mb-16 text-center ${textColor} retro-text-shadow`}>
          {title}
        </h2>
      )}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        {members.map((member) => (
          <div key={member._key || member.name} className="group">
            <div className="bg-white border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-all duration-300 p-8 text-center hover:-translate-y-2">
              {member.image && (
                <div className="relative w-48 h-48 mx-auto mb-6 border-4 border-black overflow-hidden -rotate-3 group-hover:rotate-3 transition-transform duration-300">
                  <Image
                    src={urlFor(member.image).width(300).height(300).url()}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <h3 className="text-2xl font-black mb-2 text-gray-900">{member.name}</h3>
              <p className="text-lg font-bold text-[var(--brand-primary)] mb-4">{member.role}</p>
              {member.socialLinks && member.socialLinks.length > 0 && (
                <div className="flex justify-center gap-3">
                  {member.socialLinks.map((social, idx) => (
                    <a
                      key={social.platform || social.url || idx}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-black text-white px-4 py-2 font-bold text-sm hover:bg-[var(--brand-primary)] hover:text-black transition-colors border-2 border-black"
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
  )
}
