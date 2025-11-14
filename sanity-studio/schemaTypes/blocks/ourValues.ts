import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'ourValues',
  title: 'Our Values',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'icon', title: 'Icon (optional)', type: 'string' },
          ]
        }
      ]
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
    }),
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection) { return { title: 'Our Values', subtitle: selection.title } }
  }
})
