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
          <div className="relative mb-12">
            <div className={`text-4xl md:text-6xl font-black text-center ${textColor} relative inline-block w-full`}>
              <AnimatedTitle
                text={title}
                as="h2"
                className="relative z-10"
                wordsPerGroup={2}
                gradientStartGroup={0}
                gradientInterval={2}
              />
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-3 bg-primary -rotate-1" />
            </div>
          </div>
        )}
        {content ? (
          <div className="max-w-4xl mx-auto relative">
            <div className="bg-card border border-border shadow-lg p-8 md:p-12 relative rounded-md">
              <RichTextRenderer content={content} />
            </div>
          </div>
        ) : null}
      </FullScreenSection>
    </BackgroundWrapper>
  )
}
