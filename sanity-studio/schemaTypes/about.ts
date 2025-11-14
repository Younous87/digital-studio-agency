import { defineType } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Page',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'About',
      readOnly: true,
    },
    {
      name: 'pageBuilder',
      title: 'Page Content',
      type: 'array',
      of: [
        { type: 'hero' },
        { type: 'pageHero' },
        { type: 'ourStory' },
        { type: 'ourValues' },
        { type: 'meetOurTeam' },
        { type: 'servicesOverview' },
        { type: 'featuredProjects' },
        { type: 'testimonials' },
        { type: 'aboutSection' },
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
