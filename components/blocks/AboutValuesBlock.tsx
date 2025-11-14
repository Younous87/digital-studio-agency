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

export default function AboutValuesBlock({ title, values = [], backgroundColor }: Readonly<AboutValuesBlockProps>) {
  const bgColor = backgroundColor?.hex || '#ffffff'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  const textColor = isDark ? 'text-white' : 'text-gray-900'
  const iconBg = isDark ? 'bg-white' : 'bg-blue-600'
  const iconColor = isDark ? 'text-gray-900' : 'text-white'

  const items = values.length ? values : [
    { title: 'Innovation', description: 'We push boundaries and embrace new technologies.' },
    { title: 'Quality', description: 'We deliver work that exceeds expectations.' },
    { title: 'Collaboration', description: 'We partner closely with our clients.' },
  ]

  return (
    <section className="py-16" style={{ backgroundColor: bgColor }}>
      {title && <h2 className={`text-3xl md:text-4xl font-bold mb-12 text-center ${textColor}`}>{title}</h2>}
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div key={item.title || idx} className="text-center">
            <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${iconBg}`}>
              <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className={`text-xl font-bold mb-2 ${textColor}`}>{item.title}</h3>
            {item.description && <p className={isDark ? 'text-gray-300' : 'text-gray-600'}>{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
