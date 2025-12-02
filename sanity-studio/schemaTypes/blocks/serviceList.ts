import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'serviceList',
  title: 'Services List',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Our Services'
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'layout',
      title: 'Layout',
      type: 'string',
      options: {
        list: [
          { title: 'Carousel (Auto-scrolling)', value: 'carousel' },
          { title: 'Grid', value: 'grid' },
          { title: 'List', value: 'list' }
        ]
      },
      initialValue: 'carousel'
    }),
    defineField({
      name: 'showAll',
      title: 'Show All Services',
      type: 'boolean',
      initialValue: true,
      description: 'If unchecked, you can manually select which services to display below'
    }),
    defineField({
      name: 'services',
      title: 'Selected Services',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'service' }] }],
      hidden: ({ parent }) => parent?.showAll,
      description: 'Only shown when "Show All Services" is unchecked'
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      title: 'title',
      layout: 'layout'
    },
    prepare(selection) {
      return {
        title: 'Services List',
        subtitle: `${selection.title || 'Services'} (${selection.layout || 'grid'})`
      }
    }
  }
})