import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'serviceCtaSection',
  title: 'Service CTA Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'buttonText',
      title: 'Button Text',
      type: 'string',
    }),
    defineField({
      name: 'buttonLink',
      title: 'Button Link',
      type: 'string',
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
    select: { title: 'title' },
    prepare(selection) {
      return {
        title: 'Service CTA Section',
        subtitle: selection.title || 'No title'
      }
    }
  }
})