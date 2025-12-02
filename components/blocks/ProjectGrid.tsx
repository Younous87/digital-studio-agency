'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity/image'
import { ExternalLink, Calendar } from 'lucide-react'

interface Project {
  _id: string
  title: string
  slug: { current: string }
  clientName?: string
  shortDescription: string
  featuredImage: any
  categories?: string[]
  completionDate?: string
}

interface ProjectGridProps {
  title?: string
  description?: string
  projects: Project[]
  layout?: 'grid' | 'masonry' | 'carousel'
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

  // Duplicate projects for seamless infinite scroll
  const duplicatedProjects = [...projects, ...projects, ...projects]

  useEffect(() => {
    const scrollContainer = scrollRef.current
    if (!scrollContainer || isPaused) return

    let animationFrameId: number
    let scrollPosition = scrollContainer.scrollLeft

    const scroll = () => {
      if (!scrollContainer || isPaused) return
      
      scrollPosition += 1 // Adjust speed here (lower = slower)
      
      // Reset scroll position when we've scrolled through one set of projects
      const singleSetWidth = scrollContainer.scrollWidth / 3
      if (scrollPosition >= singleSetWidth * 2) {
        scrollPosition = singleSetWidth
      }
      
      scrollContainer.scrollLeft = scrollPosition
      animationFrameId = requestAnimationFrame(scroll)
    }

    animationFrameId = requestAnimationFrame(scroll)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isPaused, projects.length])

  return (
    <BackgroundWrapper backgroundImage={backgroundImage}>
      <FullScreenSection background={backgroundImage ? 'transparent' : 'white'}>
        {(title || description) && (
          <div className="text-center mb-16 relative">
            {title && (
              <h2 className="text-4xl md:text-6xl font-black text-foreground mb-6">
                {title}
              </h2>
            )}
            {description && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto font-medium">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Auto-scrolling carousel container */}
        <div className="relative w-full overflow-hidden">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
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
        className="flex-shrink-0 w-[350px] md:w-[400px] h-[500px] relative rounded-xl overflow-hidden cursor-pointer group"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Background Image */}
        {project.featuredImage && (
          <div className="absolute inset-0">
            <Image
              src={urlFor(project.featuredImage).width(800).height(1000).url()}
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
