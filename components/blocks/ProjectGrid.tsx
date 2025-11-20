'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FullScreenSection from '../ui/FullScreenSection'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card'
import { Badge } from '../ui/badge'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { Separator } from '../ui/separator'
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
}

export default function ProjectGrid({
  title,
  description,
  projects,
  layout = 'grid'
}: Readonly<ProjectGridProps>) {
  return (
    <FullScreenSection>
      {(title || description) && (
        <div className="text-center mb-16 relative">
          {title && (
            <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-6 retro-text-shadow">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-xl text-black max-w-3xl mx-auto font-bold">
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
  )
}

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Dialog>
      <Card className="h-full group border-4 border-black shadow-brutal hover:shadow-brutal-hover transition-all duration-300 overflow-hidden bg-white hover:-translate-y-1">
        {/* Image area with quick view trigger */}
        <DialogTrigger asChild>
          <div className="cursor-pointer relative">
            {project.featuredImage && (
              <div className="relative h-64 overflow-hidden border-b-4 border-black bg-[var(--brand-secondary)]">
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
                  <div className="absolute inset-0 animate-pulse bg-[var(--brand-accent)]" />
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-[var(--brand-primary)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />                {/* Categories badges */}
                {project.categories && project.categories.length > 0 && (
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10">
                    {project.categories.slice(0, 3).map((category) => (
                      <Badge key={category} className="bg-[var(--brand-secondary)] border-3 border-black text-black font-black px-4 py-2 shadow-brutal-sm">
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Quick view overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-white border-4 border-black shadow-brutal px-6 py-4 font-black text-black flex items-center gap-2 hover:bg-[var(--brand-primary)] hover:text-white transition-colors">
                    <Eye className="w-5 h-5" strokeWidth={3} />
                    QUICK VIEW
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogTrigger>

        {/* Card content with link to full project */}
        <Link href={`/work/${project.slug.current}`}>
          <CardHeader className="p-6">
              <CardTitle className="text-2xl font-black group-hover:text-[var(--brand-primary)] transition-colors mb-2">
              {project.title}
            </CardTitle>
            {project.clientName && (
              <CardDescription className="flex items-center gap-2 text-black font-bold">
                <span className="text-[var(--brand-primary)]">CLIENT:</span> {project.clientName}
              </CardDescription>
            )}
          </CardHeader>

          <CardContent className="px-6 pb-4">
            <p className="text-black line-clamp-2 font-medium">
              {project.shortDescription}
            </p>
          </CardContent>

          <CardFooter className="flex justify-between items-center px-6 pb-6">
            {project.completionDate && (
              <div className="flex items-center gap-2 text-sm font-bold text-black">
                <Calendar className="w-4 h-4" strokeWidth={3} />
                {new Date(project.completionDate).getFullYear()}
              </div>
            )}
            <div className="bg-[var(--brand-primary)] border-3 border-black text-white font-black px-4 py-2 hover:bg-[var(--brand-secondary)] hover:text-black transition-colors flex items-center gap-2 text-sm shadow-brutal-sm">
              VIEW PROJECT <ExternalLink className="w-4 h-4" strokeWidth={3} />
            </div>
          </CardFooter>
        </Link>
      </Card>

      {/* Quick view dialog */}
      <DialogContent className="max-w-4xl bg-white border-4 border-black shadow-brutal-lg">
        <DialogHeader className="border-b-4 border-black pb-6">
          <DialogTitle className="text-3xl font-black text-gray-900">{project.title}</DialogTitle>
          <DialogDescription className="text-lg font-bold text-black">
            {project.clientName && `CLIENT: ${project.clientName}`}
          </DialogDescription>
        </DialogHeader>

        {project.featuredImage && (
          <div className="relative h-96 border-4 border-black overflow-hidden my-6">
            <Image
              src={urlFor(project.featuredImage).width(1200).height(800).url()}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}

        <Separator className="border-4 border-black my-6" />

        <div className="space-y-6">
          {project.categories && project.categories.length > 0 && (
            <div className="flex flex-wrap gap-3">
              {project.categories.map((category) => (
                <Badge key={category} className="bg-[var(--brand-accent)] border-3 border-black text-black font-black px-4 py-2">
                  {category}
                </Badge>
              ))}
            </div>
          )}

          <p className="text-black text-lg font-medium leading-relaxed">{project.shortDescription}</p>

          <Link
            href={`/work/${project.slug.current}`}
            className="inline-flex items-center gap-2 bg-[var(--brand-primary)] border-4 border-black text-white px-8 py-4 font-black hover:bg-[var(--brand-secondary)] hover:text-black transition-colors shadow-brutal"
          >
            VIEW FULL PROJECT <ExternalLink className="w-5 h-5" strokeWidth={3} />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
