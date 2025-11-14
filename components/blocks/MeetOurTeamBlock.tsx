import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface TeamMember {
  _id?: string
  name: string
  role?: string
  photo?: any
  socialLinks?: any[]
}

interface MeetOurTeamBlockProps {
  title?: string
  showTeam?: boolean
  teamMembers?: TeamMember[]
}

export default function MeetOurTeamBlock({ title, showTeam = true, teamMembers = [] }: Readonly<MeetOurTeamBlockProps>) {
  if (!showTeam) return null

  return (
    <section>
      {title && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{title}</h2>}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {teamMembers.map((member) => (
          <div key={member._id || member.name} className="text-center">
            {member.photo && (
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden">
                <Image
                  src={urlFor(member.photo).width(300).height(300).url()}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
            <p className="text-blue-600 mb-4">{member.role}</p>
            {/* social links rendering */}
            {member.socialLinks && member.socialLinks.length > 0 && (
              <div className="flex justify-center gap-3">
                {member.socialLinks.map((social, idx) => (
                  <a key={social.platform || social.url || idx} href={social.url} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-blue-600">{social.platform}</a>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
