import { defineType } from 'sanity'

export default defineType({
  name: 'service',
  title: 'Services',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'icon',
      title: 'Icon',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required().max(200),
    },
    {
      name: 'fullDescription',
      title: 'Full Description',
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
    },
    {
      name: 'features',
      title: 'Service Features/Deliverables',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'title',
              title: 'Feature Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
    },
    {
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'step',
              title: 'Step Number',
              type: 'number',
            },
            {
              name: 'title',
              title: 'Step Title',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            },
          ],
        },
      ],
    },
    {
      name: 'relatedProjects',
      title: 'Related Case Studies',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
    },
    {
      name: 'cta',
      title: 'Call to Action',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'CTA Title',
          type: 'string',
        },
        {
          name: 'description',
          title: 'CTA Description',
          type: 'text',
          rows: 2,
        },
        {
          name: 'buttonText',
          title: 'Button Text',
          type: 'string',
        },
        {
          name: 'buttonLink',
          title: 'Button Link',
          type: 'string',
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO',
      type: 'object',
      fields: [
        {
          name: 'metaTitle',
          title: 'Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ogImage',
          title: 'OG Image',
          type: 'image',
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'icon',
    },
  },
})
