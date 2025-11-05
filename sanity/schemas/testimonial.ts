import { defineType } from 'sanity'

export default defineType({
  name: 'testimonial',
  title: 'Testimonials',
  type: 'document',
  fields: [
    {
      name: 'clientName',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'company',
      title: 'Company',
      type: 'string',
    },
    {
      name: 'role',
      title: 'Role/Position',
      type: 'string',
    },
    {
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'project',
      title: 'Related Project',
      type: 'reference',
      to: [{ type: 'project' }],
    },
    {
      name: 'rating',
      title: 'Star Rating',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
      options: {
        list: [
          { title: '⭐', value: 1 },
          { title: '⭐⭐', value: 2 },
          { title: '⭐⭐⭐', value: 3 },
          { title: '⭐⭐⭐⭐', value: 4 },
          { title: '⭐⭐⭐⭐⭐', value: 5 },
        ],
      },
    },
    {
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Show this testimonial on the homepage',
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: 'clientName',
      subtitle: 'company',
      media: 'photo',
    },
  },
})
