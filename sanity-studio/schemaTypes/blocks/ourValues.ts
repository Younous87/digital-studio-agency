import { defineType } from 'sanity'

export default defineType({
  name: 'ourValues',
  title: 'Our Values',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    {
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
    }
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection) { return { title: 'Our Values', subtitle: selection.title } }
  }
})
