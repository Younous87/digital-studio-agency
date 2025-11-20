import { defineType } from 'sanity'

export default defineType({
  name: 'projectsPage',
  title: 'Projects Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Our Work',
    },
    {
      name: 'pageBuilder',
      title: 'Page Builder',
      type: 'array',
      of: [
        { type: 'pageHero' },
        { type: 'featuredProjects' },
        { type: 'hero' },
        { type: 'aboutSection' },
        { type: 'servicesOverview' },
        { type: 'testimonials' },
        { type: 'ctaSection' },
        { type: 'textImageBlock' },
        { type: 'statsSection' },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Settings',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: selection.title || 'Projects Page',
      }
    },
  },
})