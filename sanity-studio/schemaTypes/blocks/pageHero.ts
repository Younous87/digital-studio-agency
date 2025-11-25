import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'pageHero',
  title: 'Page Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        defineField({
          name: 'text',
          title: 'Button Text',
          type: 'string'
        }),
        defineField({
          name: 'link',
          title: 'Button Link',
          type: 'string'
        })
      ]
    }),
    defineField({
      name: 'background',
      title: 'Background',
      type: 'object',
      fields: [
        defineField({
          name: 'type',
          title: 'Background Type',
          type: 'string',
          options: {
            list: [
              { title: 'Color', value: 'color' },
              { title: 'Image', value: 'image' },
              { title: 'Video', value: 'video' }
            ],
            layout: 'radio'
          },
          validation: Rule => Rule.required()
        }),
        defineField({
          name: 'color',
          title: 'Background Color',
          type: 'string',
          hidden: ({ parent }) => parent?.type !== 'color'
        }),
        defineField({
          name: 'image',
          title: 'Background Image',
          type: 'image',
          options: {
            hotspot: true
          },
          hidden: ({ parent }) => parent?.type !== 'image'
        }),
        defineField({
          name: 'video',
          title: 'Background Video',
          type: 'file',
          options: {
            accept: 'video/*'
          },
          hidden: ({ parent }) => parent?.type !== 'video'
        })
      ]
    })
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'subtitle'
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Page Hero',
        subtitle: subtitle ? subtitle.substring(0, 50) + '...' : 'No subtitle'
      }
    }
  }
})