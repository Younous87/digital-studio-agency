'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity/image'
import { ExternalLink, Calendar, Play, Pause, Volume2, VolumeX } from 'lucide-react'
import AnimatedTitle from '@/components/ui/AnimatedTitle'
import AnimatedSubtitle from '@/components/ui/AnimatedSubtitle'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  clientName?: string
  shortDescription: string
  featuredImage: any
  categories?: string[]
  completionDate?: string
  previewVideo?: string
  previewType?: 'image' | 'video'
  cardSize?: 'square' | 'rectangle'
}

interface ProjectGridProps {
  title?: string
  description?: string
  projects: Project[]
  layout?: 'grid' | 'masonry' | 'carousel' | 'masonryColumns'
  backgroundImage?: any
}

export default function ProjectGrid({
  title,
  description,
  projects,
  layout = 'grid',
  backgroundImage
}: Readonly<ProjectGridProps>) {
  const [isPaused, setIsPaused] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)
  const pauseRef = useRef<boolean>(false)

  // Duplicate projects for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects, ...projects]

  useEffect(() => {
     const scrollContainer = scrollRef.current
     if (!scrollContainer) return
 
     let rafId: number | null = null
     let lastTime = performance.now()
 
     // Speed in pixels per second - adjust as needed for desired speed
     const speed = 240
     let scrollPosition = 0
 
     const update = (time: number) => {
       if (!scrollContainer) return
       const dt = Math.min(0.05, (time - lastTime) / 1000) // limit dt to avoid big jumps
       lastTime = time
      if (!pauseRef.current) {
         scrollPosition += speed * dt
         const singleSetWidth = scrollContainer.scrollWidth / 3
         if (singleSetWidth > 0 && scrollPosition >= singleSetWidth * 2) {
           scrollPosition = singleSetWidth
         }
         scrollContainer.scrollLeft = scrollPosition
       }
       rafId = requestAnimationFrame(update)
     }
 
     // Defer initialization a frame so DOM measurements are correct
     const init = () => {
       const singleSetWidth = scrollContainer.scrollWidth / 3
       if (singleSetWidth > 0) {
         scrollPosition = singleSetWidth
         scrollContainer.scrollLeft = scrollPosition
       }
       lastTime = performance.now()
       rafId = requestAnimationFrame(update)
     }
 
     // Small timeout to allow layout to settle (images may affect scrollWidth)
     const timeoutId = window.setTimeout(() => requestAnimationFrame(init), 50)
 
     const onResize = () => {
       // Recompute positions on resize
       const singleSetWidth = scrollContainer.scrollWidth / 3
       if (singleSetWidth > 0) {
         scrollPosition = singleSetWidth
         scrollContainer.scrollLeft = scrollPosition
       }
     }
     window.addEventListener('resize', onResize)
 
     return () => {
       if (rafId) cancelAnimationFrame(rafId)
       window.clearTimeout(timeoutId)
       window.removeEventListener('resize', onResize)
     }
  }, [projects.length])

  // Render Masonry Columns layout
  if (layout === 'masonryColumns') {
    return (
      <BackgroundWrapper backgroundImage={backgroundImage}>
        <FullScreenSection background={backgroundImage ? 'transparent' : 'white'} containerSize="full" className="relative overflow-hidden py-16">
          {(title || description) && (
            <div className="text-center mb-16 px-4">
              {title && (
                <AnimatedTitle
                  text={title}
                  as="h2"
                  className="text-4xl md:text-6xl font-black text-foreground mb-6"
                />
              )}
              {description && (
                <AnimatedSubtitle
                  text={description}
                  as="p"
                  className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium"
                />
              )}
            </div>
          )}

          <MasonryColumnsGrid projects={projects} />
        </FullScreenSection>
      </BackgroundWrapper>
    )
  }

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection background={backgroundImage ? 'transparent' : 'white'} containerSize="full" className="relative overflow-hidden" containerClassName="mx-0 !px-0">
        {(title || description) && (
          <div className="text-center mb-16 relative">
            {title && (
              <AnimatedTitle
                text={title}
                as="h2"
                className="text-4xl md:text-6xl font-black text-foreground mb-6"
              />
            )}
            {description && (
              <AnimatedSubtitle
                text={description}
                as="p"
                className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium"
              />
            )}
          </div>
        )}

        {/* Auto-scrolling carousel container */}
        <div className="relative w-full overflow-hidden">
          
                <div
                  ref={scrollRef}
                  className="flex gap-6 overflow-x-auto scrollbar-hide touch-pan-x"
                  onMouseEnter={() => { pauseRef.current = true; setIsPaused(true) }}
                  onMouseLeave={() => { pauseRef.current = false; setIsPaused(false) }}
                  onPointerDown={() => { pauseRef.current = true; setIsPaused(true) }}
                  onPointerUp={() => { pauseRef.current = false; setIsPaused(false) }}
                  onTouchStart={() => { pauseRef.current = true; setIsPaused(true) }}
                  onTouchEnd={() => { pauseRef.current = false; setIsPaused(false) }}
                >
            {duplicatedProjects.map((project, index) => (
              <ProjectCard 
                key={`${project._id}-${index}`} 
                project={project} 
              />
            ))}
          </div>
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={`/work/${project.slug.current}`}>
      <div
              className="flex-shrink-0 min-w-[90vw] md:min-w-[70vw] lg:min-w-[60vw] xl:min-w-[50vw] h-[600px] relative rounded-xl overflow-hidden cursor-pointer group snap-start"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        {project.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(project.featuredImage).width(1800).height(1200).url()}
              alt={project.title}
              fill
              className={`object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } ${isHovered ? 'blur-sm scale-105' : 'blur-0 scale-100'}`}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 animate-pulse bg-muted" />
            )}
          </div>
        )}

        {/* Dark overlay that intensifies on hover */}
        <div 
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-all duration-500 ${
            isHovered ? 'from-black/90 via-black/60 to-black/30' : ''
          }`}
        />

        {/* Content overlay - fades in on hover */}
        <div 
          className={`absolute inset-0 flex flex-col justify-end p-6 transition-all duration-500 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Categories */}
          {project.categories && project.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.categories.slice(0, 3).map((category) => (
                <Badge 
                  key={category} 
                  variant="secondary" 
                  className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm text-white border-white/30"
                >
                  {category}
                </Badge>
              ))}
            </div>
          )}

          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-black text-white mb-2">
            {project.title}
          </h3>

          {/* Client */}
          {project.clientName && (
            <p className="text-white/80 font-medium mb-3">
              {project.clientName}
            </p>
          )}

          {/* Description */}
          <p className="text-white/70 text-sm line-clamp-2 mb-4">
            {project.shortDescription}
          </p>

          {/* Footer with date and button */}
          <div className="flex items-center justify-between">
            {project.completionDate && (
              <div className="flex items-center gap-2 text-sm text-white/60">
                <Calendar className="w-4 h-4" />
                {new Date(project.completionDate).getFullYear()}
              </div>
            )}
            <Button 
              variant="secondary" 
              size="sm"
              className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-black"
            >
              View Project <ExternalLink className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>

        {/* Title always visible at bottom when not hovered */}
        <div 
          className={`absolute bottom-0 left-0 right-0 p-6 transition-all duration-500 ${
            isHovered ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
          }`}
        >
          <h3 className="text-xl md:text-2xl font-black text-white">
            {project.title}
          </h3>
          {project.clientName && (
            <p className="text-white/70 font-medium text-sm mt-1">
              {project.clientName}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}

// ============================================
// Masonry Columns Layout Components
// ============================================

function MasonryColumnsGrid({ projects }: Readonly<{ projects: Project[] }>) {
  // Distribute projects into columns for masonry effect
  // Each column alternates between square and rectangle cards
  const columnCount = 4
  const columns: Project[][] = Array.from({ length: columnCount }, () => [])
  
  projects.forEach((project, index) => {
    const columnIndex = index % columnCount
    columns[columnIndex].push(project)
  })

  return (
    <div className="px-4 md:px-8 lg:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {columns.map((columnProjects, columnIndex) => (
          <div key={`column-${columnIndex}`} className="flex flex-col gap-4">
            {columnProjects.map((project, projectIndex) => (
              <MasonryColumnCard
                key={project._id}
                project={project}
                defaultSize={projectIndex % 2 === (columnIndex % 2) ? 'square' : 'rectangle'}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

function MasonryColumnCard({ 
  project, 
  defaultSize 
}: Readonly<{ 
  project: Project
  defaultSize: 'square' | 'rectangle' 
}>) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [isVideoPlaying, setIsVideoPlaying] = useState(true)
  const [isVideoMuted, setIsVideoMuted] = useState(true)
  const [isHovered, setIsHovered] = useState(false)
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const cardSize = project.cardSize || defaultSize
  const previewType = project.previewType || 'image'
  
  // Determine aspect ratio based on card size
  const aspectRatioClass = cardSize === 'rectangle' 
    ? 'aspect-[9/16]' // Tall rectangle (like the reference)
    : 'aspect-square'

  // Format Vimeo URL for autoplay, loop, muted
  const getVideoEmbedUrl = (url: string, playing: boolean = true, muted: boolean = true) => {
    if (!url) return ''
    
    const autoplay = playing ? '1' : '0'
    const mute = muted ? '1' : '0'
    
    // Handle Vimeo URLs
    if (url.includes('vimeo.com')) {
      const vimeoMatch = /vimeo\.com\/(?:video\/)?(\d+)/.exec(url)
      if (vimeoMatch) {
        return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=${autoplay}&loop=1&muted=${mute}&badge=0&autopause=0&player_id=0&app_id=58479`
      }
      if (url.includes('player.vimeo.com')) {
        const baseUrl = url.split('?')[0]
        return `${baseUrl}?autoplay=${autoplay}&loop=1&muted=${mute}&badge=0&autopause=0&player_id=0&app_id=58479`
      }
    }
    
    // Handle YouTube URLs
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const youtubeMatch = /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/.exec(url)
      if (youtubeMatch) {
        return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=${autoplay}&loop=1&mute=${mute}&playlist=${youtubeMatch[1]}`
      }
    }
    
    return url
  }

  // Control Vimeo player via postMessage
  const sendVimeoMessage = (method: string, value?: any) => {
    const data = value === undefined ? { method } : { method, value }
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify(data), 'https://player.vimeo.com')
  }

  // Control YouTube player via postMessage
  const sendYouTubeMessage = (action: string) => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'command', func: action }), 'https://www.youtube.com')
  }

  const togglePlayPause = () => {
    if (!project.previewVideo) return
    
    if (project.previewVideo.includes('vimeo.com')) {
      if (isVideoPlaying) {
        sendVimeoMessage('pause')
      } else {
        sendVimeoMessage('play')
      }
    } else if (project.previewVideo.includes('youtube.com') || project.previewVideo.includes('youtu.be')) {
      if (isVideoPlaying) {
        sendYouTubeMessage('pauseVideo')
      } else {
        sendYouTubeMessage('playVideo')
      }
    }
    
    setIsVideoPlaying(!isVideoPlaying)
  }

  const toggleMute = () => {
    if (!project.previewVideo) return
    
    if (project.previewVideo.includes('vimeo.com')) {
      if (isVideoMuted) {
        sendVimeoMessage('setVolume', 1)
      } else {
        sendVimeoMessage('setVolume', 0)
      }
    } else if (project.previewVideo.includes('youtube.com') || project.previewVideo.includes('youtu.be')) {
      if (isVideoMuted) {
        sendYouTubeMessage('unMute')
      } else {
        sendYouTubeMessage('mute')
      }
    }
    
    setIsVideoMuted(!isVideoMuted)
  }

  const primaryCategory = project.categories?.[0]

  return (
    <div className="relative">
      {/* Card Container */}
      <Link href={`/work/${project.slug.current}`}>
        <div 
          className={`relative ${aspectRatioClass} rounded-xl overflow-hidden group cursor-pointer bg-muted`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Video Preview */}
          {previewType === 'video' && project.previewVideo ? (
            <div className="absolute inset-0">
              <iframe
                ref={iframeRef}
                src={getVideoEmbedUrl(project.previewVideo, isVideoPlaying, isVideoMuted)}
                className="absolute inset-0 w-full h-full object-cover border-0"
                allow="autoplay; fullscreen; picture-in-picture; clipboard-write"
                allowFullScreen
                title={project.title}
              />
            </div>
          ) : (
            /* Image Preview */
            project.featuredImage && (
              <div className="absolute inset-0">
                <Image
                  src={urlFor(project.featuredImage)
                    .width(cardSize === 'rectangle' ? 600 : 800)
                    .height(cardSize === 'rectangle' ? 1067 : 800)
                    .url()}
                  alt={project.title}
                  fill
                  className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-muted" />
                )}
              </div>
            )
          )}

          {/* Tag in bottom right corner - always visible */}
          {primaryCategory && (
            <div className="absolute bottom-4 right-4 z-10">
              <div className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-lg">
                <span className="text-sm font-semibold">{primaryCategory}</span>
              </div>
            </div>
          )}

          {/* Video Controls - only show on hover for video cards */}
          {previewType === 'video' && project.previewVideo && isHovered && (
            <div className="absolute top-4 left-4 z-20 flex gap-2">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  togglePlayPause()
                }}
                className="bg-black/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/90 transition-colors"
                aria-label={isVideoPlaying ? 'Pause video' : 'Play video'}
              >
                {isVideoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  toggleMute()
                }}
                className="bg-black/80 backdrop-blur-sm text-white p-2 rounded-lg hover:bg-black/90 transition-colors"
                aria-label={isVideoMuted ? 'Unmute video' : 'Mute video'}
              >
                {isVideoMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          )}

          {/* Hover overlay with project info */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/70 transition-all duration-300" />
          
          {/* Hover content */}
          <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {/* Top section - empty for spacing */}
            <div></div>
            
            {/* Bottom section - project info */}
            <div className="space-y-4">
              {/* All categories */}
              {project.categories && project.categories.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {project.categories.map((category) => (
                    <Badge 
                      key={category} 
                      variant="secondary" 
                      className="text-xs px-3 py-1 bg-white/20 backdrop-blur-sm text-white border-white/30"
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Project title */}
              <h3 className="text-xl md:text-2xl font-black text-white leading-tight">
                {project.title}
              </h3>

              {/* Client name if available */}
              {project.clientName && (
                <p className="text-white/80 font-medium text-sm">
                  {project.clientName}
                </p>
              )}

              {/* View Project button */}
              <div className="pt-2">
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-white/20 backdrop-blur-sm text-white border-white/30 hover:bg-white hover:text-black"
                >
                  View Project <ExternalLink className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}
