import { defineType } from 'sanity'

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'object',
  fields: [
    {
      name: 'headline',
      title: 'Headline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'subheadline',
      title: 'Subheadline',
      type: 'text',
      rows: 2,
    },
    {
      name: 'cta',
      title: 'Call to Action',
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
      name: 'backgroundVideo',
      title: 'Background Video URL',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'headline',
    },
    prepare(selection) {
      return {
        title: 'Hero Section',
        subtitle: selection.title,
      }
    },
  },
})
