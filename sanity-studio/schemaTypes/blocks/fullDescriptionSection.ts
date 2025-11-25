import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'fullDescriptionSection',
  title: 'Full Description Section',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [
        {
          type: 'block',
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
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
    select: { content: 'content' },
    prepare(selection) {
      const block = (selection.content || []).find((block: any) => block._type === 'block')
      return {
        title: 'Full Description Section',
        subtitle: block ? block.children?.[0]?.text?.substring(0, 50) + '...' : 'No content'
      }
    }
  }
})