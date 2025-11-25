import { defineType } from 'sanity'

export default defineType({
  name: 'blogPosts',
  title: 'Blog Posts',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Latest Posts',
    },
    {
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' },
        ],
      },
      initialValue: 'grid',
    },
    {
      name: 'showFeatured',
      title: 'Show Only Featured Posts',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'posts',
      title: 'Specific Posts (leave empty to show all)',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'post' }],
        },
      ],
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout',
    },
    prepare({ title, layout }) {
      return {
        title: title || 'Blog Posts',
        subtitle: `Layout: ${layout}`,
      }
    },
  },
})