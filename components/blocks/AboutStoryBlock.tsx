import RichTextRenderer from './RichTextRenderer'

interface AboutStoryBlockProps {
  title?: string
  content?: any
  backgroundColor?: {
    hex: string
    hsl: { h: number; s: number; l: number; a: number }
    rgb: { r: number; g: number; b: number; a: number }
    hsv: { h: number; s: number; v: number; a: number }
  }
}

export default function AboutStoryBlock({ title, content, backgroundColor }: Readonly<AboutStoryBlockProps>) {
  const bgColor = backgroundColor?.hex || '#ffffff'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  const textColor = isDark ? 'text-white' : 'text-gray-900'

  return (
    <section className="py-16" style={{ backgroundColor: bgColor }}>
      {title && <h2 className={`text-3xl md:text-4xl font-bold mb-6 text-center ${textColor}`}>{title}</h2>}
      {content ? (
        <div className="max-w-4xl mx-auto">
          <RichTextRenderer content={content} />
        </div>
      ) : null}
    </section>
  )
}
