import RichTextRenderer from './RichTextRenderer'

interface AboutStoryBlockProps {
  title?: string
  content?: any
}

export default function AboutStoryBlock({ title, content }: Readonly<AboutStoryBlockProps>) {
  return (
    <section>
      {title && <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">{title}</h2>}
      {content ? (
        <div className="max-w-4xl mx-auto">
          <RichTextRenderer content={content} />
        </div>
      ) : null}
    </section>
  )
}
