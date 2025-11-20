import Container from '../ui/Container'
import { Zap, Target, Users } from 'lucide-react'

interface ValueItem {
  title: string
  description?: string
  icon?: string
}

interface AboutValuesBlockProps {
  title?: string
  values?: ValueItem[]
  backgroundColor?: {
    hex: string
    hsl: { h: number; s: number; l: number; a: number }
    rgb: { r: number; g: number; b: number; a: number }
    hsv: { h: number; s: number; v: number; a: number }
  }
}

const iconMap: Record<number, any> = {
  0: Zap,
  1: Target,
  2: Users,
}

export default function AboutValuesBlock({ title, values = [], backgroundColor }: Readonly<AboutValuesBlockProps>) {
  const bgColor = backgroundColor?.hex || '#00D9FF'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  const textColor = isDark ? 'text-white' : 'text-gray-900'

  const items = values.length ? values : [
    { title: 'Innovation', description: 'We push boundaries and embrace new technologies.' },
    { title: 'Quality', description: 'We deliver work that exceeds expectations.' },
    { title: 'Collaboration', description: 'We partner closely with our clients.' },
  ]

  return (
    <section className="py-20 relative" style={{ backgroundColor: bgColor }}>
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }} />
      </div>

      <Container>
        {title && (
          <h2 className={`text-4xl md:text-6xl font-black mb-16 text-center ${textColor} retro-text-shadow`}>
            {title}
          </h2>
        )}
        <div className="grid md:grid-cols-3 gap-8 relative">
          {items.map((item, idx) => {
            const Icon = iconMap[idx] || Zap
            return (
              <div key={item.title || idx} className="group">
                <div className="bg-white border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-all duration-300 p-8 h-full hover:-translate-y-1">
                  <div className="bg-[var(--brand-primary)] border-3 border-black w-20 h-20 flex items-center justify-center mx-auto mb-6 -rotate-3 group-hover:rotate-3 transition-transform duration-300">
                    <Icon className="w-10 h-10 text-black" strokeWidth={3} />
                  </div>
                  <h3 className="text-2xl font-black mb-3 text-center">{item.title}</h3>
                  {item.description && (
                    <p className="text-gray-700 text-center leading-relaxed">{item.description}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
