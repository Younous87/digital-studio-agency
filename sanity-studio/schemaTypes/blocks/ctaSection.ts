import { defineType } from 'sanity'

export default defineType({
  name: 'ctaSection',
  title: 'CTA Section',
  type: 'object',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    },
    {
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
        },
      ],
    },
    {
      name: 'secondaryCta',
      title: 'Secondary CTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'link',
          title: 'Button Link',
          type: 'string',
        },
      ],
    },
    {
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare(selection) {
      return {
        title: 'CTA Section',
        subtitle: selection.title,
      }
    },
  },
})
