'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import FullScreenSection from '../ui/FullScreenSection'
import { Card } from '../retroui/Card'
import { Badge } from '../retroui/Badge'
import { Dialog } from '../retroui/Dialog'
import { Button } from '../retroui/Button'
import { urlFor } from '@/lib/sanity/image'
import { Eye, ExternalLink, Calendar } from 'lucide-react'
import { Separator } from '../ui/separator'

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
      <Card variant="retro" className="h-full group transition-all duration-300 overflow-hidden hover:-translate-y-1">
        {/* Image area with quick view trigger */}
        <Dialog.Trigger asChild>
          <div className="cursor-pointer relative">
            {project.featuredImage && (
              <div className="relative h-64 overflow-hidden bg-[var(--brand-secondary)]">
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
                      <Badge key={category} variant="solid" size="lg">
                        {category}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Quick view overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                  <div className="bg-white border-2 border-black shadow-md px-6 py-4 font-black text-black flex items-center gap-2 hover:bg-(--brand-primary) hover:text-white transition-colors">
                    <Eye className="w-5 h-5" strokeWidth={3} />
                    QUICK VIEW
                  </div>
                </div>
              </div>
            )}
          </div>
        </Dialog.Trigger>

        {/* Card content with link to full project */}
        <Link href={`/work/${project.slug.current}`}>
          <Card.Header className="p-6">
              <Card.Title className="text-2xl font-black group-hover:text-[var(--brand-primary)] transition-colors mb-2">
              {project.title}
            </Card.Title>
            {project.clientName && (
              <Card.Description className="flex items-center gap-2 text-black font-bold">
                <span className="text-[var(--brand-primary)]">CLIENT:</span> {project.clientName}
              </Card.Description>
            )}
          </Card.Header>

          <Card.Content className="px-6 pb-4">
            <p className="text-black line-clamp-2 font-medium">
              {project.shortDescription}
            </p>
          </Card.Content>

          <div className="flex justify-between items-center px-6 pb-6">
            {project.completionDate && (
              <div className="flex items-center gap-2 text-sm font-bold text-black">
                <Calendar className="w-4 h-4" strokeWidth={3} />
                {new Date(project.completionDate).getFullYear()}
              </div>
            )}
            <Button asChild variant="default" size="sm" className="shadow-sm">
              <span>VIEW PROJECT <ExternalLink className="w-4 h-4" strokeWidth={3} /></span>
            </Button>
          </div>
        </Link>
      </Card>

      {/* Quick view dialog */}
      <Dialog.Content>
        <Card variant="retro" className="max-w-4xl">
          <Card.Header className="pb-6 items-start">
            <div className="flex flex-col gap-1">
              <h2 className="text-3xl font-black text-gray-900">{project.title}</h2>
              <Card.Description className="text-lg font-bold text-black">
                {project.clientName && `CLIENT: ${project.clientName}`}
              </Card.Description>
            </div>
          </Card.Header>

          {project.featuredImage && (
            <div className="relative h-96 overflow-hidden my-6">
              <Image
                src={urlFor(project.featuredImage).width(1200).height(800).url()}
                alt={project.title}
                fill
                className="object-cover"
              />
            </div>
          )}


          <Card.Content className="space-y-6">
            {project.categories && project.categories.length > 0 && (
              <div className="flex flex-wrap gap-3">
                {project.categories.map((category) => (
                  <Badge key={category} variant="solid" size="lg">
                    {category}
                  </Badge>
                ))}
              </div>
            )}

            <p className="text-black text-lg font-medium leading-relaxed">{project.shortDescription}</p>

            <Button
              asChild
              variant="default"
              size="lg"
              className="inline-flex gap-2"
            >
              <Link href={`/work/${project.slug.current}`}>
                VIEW FULL PROJECT <ExternalLink className="w-5 h-5" strokeWidth={3} />
              </Link>
            </Button>
          </Card.Content>
        </Card>
      </Dialog.Content>
    </Dialog>
  )
}
