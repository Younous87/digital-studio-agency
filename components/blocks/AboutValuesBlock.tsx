interface ValueItem {
  title: string
  description?: string
  icon?: string
}

interface AboutValuesBlockProps {
  title?: string
  values?: ValueItem[]
}

export default function AboutValuesBlock({ title, values = [] }: Readonly<AboutValuesBlockProps>) {
  const items = values.length ? values : [
    { title: 'Innovation', description: 'We push boundaries and embrace new technologies.' },
    { title: 'Quality', description: 'We deliver work that exceeds expectations.' },
    { title: 'Collaboration', description: 'We partner closely with our clients.' },
  ]

  return (
    <section>
      {title && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-12 text-center">{title}</h2>}
      <div className="grid md:grid-cols-3 gap-8">
        {items.map((item, idx) => (
          <div key={item.title || idx} className="text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
            {item.description && <p className="text-gray-600">{item.description}</p>}
          </div>
        ))}
      </div>
    </section>
  )
}
