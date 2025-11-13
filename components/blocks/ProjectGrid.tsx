'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Section from '../ui/Section'
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
    <Section>
      {(title || description) && (
        <div className="text-center mb-12">
          {title && (
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {title}
            </h2>
          )}
          {description && (
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
    </Section>
  )
}

function ProjectCard({ project }: Readonly<{ project: Project }>) {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Dialog>
      <Card className="h-full group overflow-hidden transition-all duration-300 hover:shadow-2xl">
        <Link href={`/work/${project.slug.current}`}>
          {project.featuredImage && (
            <div className="relative h-64 overflow-hidden bg-gray-100">
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
                <div className="absolute inset-0 animate-pulse bg-gray-200" />
              )}
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Categories badges */}
              {project.categories && project.categories.length > 0 && (
                <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                  {project.categories.slice(0, 3).map((category, index) => (
                    <Badge key={index} variant="secondary" className="bg-white/95 backdrop-blur-sm text-gray-800 hover:bg-white">
                      {category}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Quick view button */}
              <DialogTrigger asChild>
                <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white text-gray-900 px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-gray-100 transition-colors">
                    <Eye className="w-4 h-4" />
                    Quick View
                  </div>
                </button>
              </DialogTrigger>
            </div>
          )}
        </Link>
        
        <CardHeader>
            <CardTitle className="text-xl group-hover:text-brand-primary transition-colors">
            {project.title}
          </CardTitle>
          {project.clientName && (
            <CardDescription className="flex items-center gap-2">
              <span className="font-semibold">Client:</span> {project.clientName}
            </CardDescription>
          )}
        </CardHeader>
        
        <CardContent>
          <p className="text-gray-600 line-clamp-2">
            {project.shortDescription}
          </p>
        </CardContent>
        
        <CardFooter className="flex justify-between items-center">
          {project.completionDate && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Calendar className="w-4 h-4" />
              {new Date(project.completionDate).getFullYear()}
            </div>
          )}
          <Link 
            href={`/work/${project.slug.current}`}
            className="text-brand-primary font-semibold flex items-center gap-1 hover:gap-2 transition-all text-sm"
          >
            View Project <ExternalLink className="w-4 h-4" />
          </Link>
        </CardFooter>
      </Card>

      {/* Quick view dialog */}
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <DialogDescription>
            {project.clientName && `Client: ${project.clientName}`}
          </DialogDescription>
        </DialogHeader>
        
        {project.featuredImage && (
          <div className="relative h-96 rounded-lg overflow-hidden">
            <Image
              src={urlFor(project.featuredImage).width(1200).height(800).url()}
              alt={project.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        
        <Separator />
        
        <div className="space-y-4">
          {project.categories && project.categories.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {project.categories.map((category, index) => (
                <Badge key={index} variant="outline">
                  {category}
                </Badge>
              ))}
            </div>
          )}
          
          <p className="text-gray-700">{project.shortDescription}</p>
          
          <Link 
            href={`/work/${project.slug.current}`}
            className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-primary hover:opacity-90 transition-colors"
          >
            View Full Project <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </DialogContent>
    </Dialog>
  )
}
