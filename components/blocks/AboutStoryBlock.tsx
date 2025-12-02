import RichTextRenderer from './RichTextRenderer'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import AnimatedTitle from '@/components/ui/AnimatedTitle'

interface AboutStoryBlockProps {
  title?: string
  content?: any
  backgroundColor?: {
    hex: string
    hsl: { h: number; s: number; l: number; a: number }
    rgb: { r: number; g: number; b: number; a: number }
    hsv: { h: number; s: number; v: number; a: number }
  }
  backgroundImage?: any
}

export default function AboutStoryBlock({ title, content, backgroundColor, backgroundImage }: Readonly<AboutStoryBlockProps>) {
  const bgColor = backgroundColor?.hex || '#FFD23F'
  const isDark = backgroundColor ? (backgroundColor.hsl.l < 0.5) : false
  // If background image is present, we use default text color because of the overlay
  const textColor = backgroundImage ? 'text-foreground' : (isDark ? 'text-primary-foreground' : 'text-foreground')

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection
        background="transparent"
        className="relative overflow-hidden"
        style={{ backgroundColor: backgroundImage ? 'transparent' : bgColor }}
        containerSize="2xl"
      >
        {/* Decorative pattern - only if no background image */}
        {!backgroundImage && (
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0" style={{
              backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, currentColor 10px, currentColor 11px)',
            }} />
          </div>
        )}

        {title && (
          <div className="relative mb-16 lg:mb-20">
            <div className={`text-5xl md:text-6xl lg:text-8xl font-black text-center ${textColor} relative inline-block w-full`}>
              <AnimatedTitle
                text={title}
                as="h2"
                className="relative z-10"
              />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-40 lg:w-48 h-4 bg-primary -rotate-1" />
            </div>
          </div>
        )}
        {content ? (
          <div className="max-w-5xl mx-auto relative">
            <div className="bg-card border border-border shadow-xl p-10 md:p-14 lg:p-20 relative rounded-lg">
              <RichTextRenderer content={content} />
            </div>
          </div>
        ) : null}
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
