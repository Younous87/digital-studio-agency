import { defineType, defineField } from 'sanity'
import { Package } from 'lucide-react'

export default defineType({
  name: 'packagesBlock',
  title: 'Packages Block',
  type: 'object',
  icon: Package,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main title text (e.g., "What")',
      initialValue: 'What',
    }),
    defineField({
      name: 'highlightedText',
      title: 'Highlighted Text',
      type: 'string',
      description: 'The highlighted/accent text (e.g., "You Get")',
      initialValue: 'You Get',
    }),
    defineField({
      name: 'packageFeatures',
      title: 'Package Features',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'feature',
          fields: [
            defineField({
              name: 'feature',
              title: 'Feature',
              type: 'string',
            }),
          ],
          preview: {
            select: {
              title: 'feature',
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      initialValue: 'Get Started',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Button Link',
      type: 'string',
      initialValue: '/contact',
    }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true,
      },
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
      highlightedText: 'highlightedText',
    },
    prepare({ title, highlightedText }) {
      return {
        title: `${title || 'What'} ${highlightedText || 'You Get'}`,
        subtitle: 'Packages Block',
      }
    },
  },
})
