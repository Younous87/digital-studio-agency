'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FullScreenSection from '../ui/FullScreenSection'
import BackgroundWrapper from './BackgroundWrapper'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription as DialogDesc } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { urlFor } from '@/lib/sanity/image'
import { Eye, ExternalLink, Calendar } from 'lucide-react'

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

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      </FullScreenSection>
    </BackgroundWrapper>
  )
}

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Dialog>
      <Card className="h-full group transition-all duration-300 overflow-hidden hover:-translate-y-1 border border-border shadow-sm hover:shadow-md">
        {/* Image area with quick view trigger */}
        <DialogTrigger asChild>
          <div className="cursor-pointer relative">
            {project.featuredImage && (
              <div className="relative h-64 overflow-hidden bg-muted">
                <Image
                  src={urlFor(project.featuredImage).width(600).height(400).url()}
                  alt={project.title}
                  fill
                  className={`object-cover transition-all duration-500 group-hover:scale-110 ${
                    imageLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                  <div className="absolute inset-0 animate-pulse bg-muted" />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-primary/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                {/* Categories badges */}
                {project.categories && project.categories.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {project.categories.slice(0, 3).map((category) => (
                      <Badge key={category} variant="default" className="text-sm px-3 py-1">
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Quick view overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-background border border-border shadow-md px-6 py-4 font-semibold text-foreground flex items-center gap-2 rounded-md">
                    <Eye className="w-5 h-5" />
                    Quick View
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogTrigger>

        {/* Card content with link to full project */}
        <Link href={`/work/${project.slug.current}`}>
          <CardHeader className="p-6">
            <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors mb-2">
              {project.title}
            </CardTitle>
            {project.clientName && (
              <CardDescription className="flex items-center gap-2 text-muted-foreground">
                <span className="text-primary font-medium">Client:</span> {project.clientName}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="px-6 pb-4">
            <p className="text-muted-foreground line-clamp-2">
              {project.shortDescription}
            </p>
          </CardContent>

          <div className="flex justify-between items-center px-6 pb-6">
            {project.completionDate && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="w-4 h-4" />
                {new Date(project.completionDate).getFullYear()}
              </div>
            )}
            <Button asChild variant="default" size="sm">
              <span>View Project <ExternalLink className="w-4 h-4 ml-2" /></span>
            </Button>
          </div>
        </Link>
      </Card>

      {/* Quick view dialog */}
      <DialogContent className="max-w-4xl">
        <DialogHeader className="pb-6">
          <DialogTitle className="text-3xl font-bold text-foreground">{project.title}</DialogTitle>
          {project.clientName && (
            <DialogDesc className="text-lg text-muted-foreground">
              Client: {project.clientName}
            </DialogDesc>
          )}
        </DialogHeader>

        {project.featuredImage && (
          <div className="relative h-96 overflow-hidden my-6 rounded-lg">
            <Image
              src={urlFor(project.featuredImage).width(1200).height(800).url()}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <div className="space-y-6">
          {project.categories && project.categories.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.categories.map((category) => (
                <Badge key={category} variant="secondary" className="text-sm px-3 py-1">
                  {category}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-muted-foreground text-lg leading-relaxed">{project.shortDescription}</p>

          <Button
            asChild
            variant="default"
            size="lg"
            className="inline-flex gap-2"
          >
            <Link href={`/work/${project.slug.current}`}>
              View Full Project <ExternalLink className="w-5 h-5" />
            </Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
