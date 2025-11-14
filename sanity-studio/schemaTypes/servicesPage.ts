import { defineType } from 'sanity'

export default defineType({
  name: 'servicesPage',
  title: 'Services Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Services',
      readOnly: true,
    },
    {
      name: 'pageBuilder',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'pageHero' },
        { type: 'servicesOverview' },
        { type: 'serviceList' },
        { type: 'featuredProjects' },
        { type: 'testimonials' },
        { type: 'ctaSection' },
        { type: 'textImageBlock' },
        { type: 'statsSection' },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        { name: 'metaTitle', title: 'Meta Title', type: 'string' },
        { name: 'metaDescription', title: 'Meta Description', type: 'text', rows: 3 },
        { name: 'ogImage', title: 'OG Image', type: 'image' },
      ],
    },
  ],
})