import FullScreenSection from '../ui/FullScreenSection'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'

interface ValueItem {
  _key: string
  title: string
  description?: string
  icon?: any // Sanity image asset type
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

export default function AboutValuesBlock({ title, values, backgroundColor }: Readonly<AboutValuesBlockProps>) {
  const bgColor = backgroundColor?.hex || '#ffffff'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  const textColor = isDark ? 'text-white' : 'text-gray-900'

  return (
    <FullScreenSection
      background="transparent"
      className="relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* Grid pattern background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }} />
      </div>

      {title && (
        <div className="text-center mb-16 relative">
          <h2 className={`text-4xl md:text-5xl font-black ${textColor} inline-block relative z-10`}>
            {title}
          </h2>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs h-12 bg-(--brand-secondary) -rotate-2 opacity-50 blur-xl" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {values?.map((value, index) => (
          <div
            key={value._key || index}
            className="bg-white border-3 border-black shadow-md p-8 hover:translate-x-1 hover:-translate-y-1 hover:shadow-lg transition-all duration-200 group"
          >
            <div className="w-16 h-16 bg-(--brand-primary) border-3 border-black flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
              {value.icon ? (
                <Image
                  src={urlFor(value.icon).url()}
                  alt=""
                  width={32}
                  height={32}
                  className="w-8 h-8"
                />
              ) : (
                <div className="w-8 h-8 bg-black rounded-full" />
              )}
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">{value.title}</h3>
            <p className="text-gray-700 leading-relaxed">{value.description}</p>
          </div>
        ))}
      </div>
    </FullScreenSection>
  )
}
