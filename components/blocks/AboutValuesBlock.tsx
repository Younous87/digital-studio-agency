import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import AnimatedTitle from '@/components/ui/AnimatedTitle'

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
  backgroundImage?: any
}

export default function AboutValuesBlock({ title, values, backgroundColor, backgroundImage }: Readonly<AboutValuesBlockProps>) {
  const bgColor = backgroundColor?.hex || '#ffffff'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  const textColor = backgroundImage ? 'text-foreground' : (isDark ? 'text-primary-foreground' : 'text-foreground')

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection
        background="transparent"
        className="relative overflow-hidden"
        style={{ backgroundColor: backgroundImage ? 'transparent' : bgColor }}
        containerSize="2xl"
      >
        {/* Grid pattern background - only if no background image */}
        {!backgroundImage && (
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }} />
          </div>
        )}

        {title && (
          <div className="text-center mb-16 lg:mb-24 relative">
            <AnimatedTitle
              text={title}
              as="h2"
              className={`text-5xl md:text-6xl lg:text-8xl font-black ${textColor} inline-block relative z-10`}
            />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-xs h-12 -rotate-2 opacity-50 blur-xl" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-10">
          {values?.map((value, index) => (
            <div
              key={value._key || index}
              className="bg-card border border-border shadow-sm p-8 lg:p-12 hover:translate-x-1 hover:-translate-y-2 hover:shadow-xl transition-all duration-200 group rounded-lg"
            >
              <div className="w-20 h-20 lg:w-24 lg:h-24 bg-primary border border-border rounded-xl flex items-center justify-center mb-8 group-hover:rotate-12 transition-transform">
                {value.icon ? (
                  <Image
                    src={urlFor(value.icon).url()}
                    alt=""
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12"
                  />
                ) : (
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-black rounded-full" />
                )}
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold mb-5 text-foreground">{value.title}</h3>
              <p className="text-muted-foreground text-lg lg:text-xl leading-relaxed">{value.description}</p>
            </div>
          ))}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
