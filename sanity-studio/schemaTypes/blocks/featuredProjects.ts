import { defineType } from 'sanity'

export default defineType({
  name: 'featuredProjects',
  title: 'Featured Projects',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Section Title',
      type: 'string',
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'projects',
      title: 'Projects to Display',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
    {
      name: 'showAll',
      title: 'Show All Featured Projects',
      type: 'boolean',
      description: 'Automatically show all projects marked as featured',
      initialValue: false,
    },
    {
      name: 'layout',
      title: 'Layout Style',
      type: 'string',
      options: {
        list: [
          { title: 'Grid', value: 'grid' },
          { title: 'Masonry', value: 'masonry' },
          { title: 'Carousel', value: 'carousel' },
        ],
      },
      initialValue: 'grid',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: 'Featured Projects',
        subtitle: selection.title,
      }
    },
  },
})
