import { defineType } from 'sanity'

// Popular Google Fonts organized by category
const fontOptions = [
  // Sans-Serif Fonts
  { title: 'Inter', value: 'Inter' },
  { title: 'Roboto', value: 'Roboto' },
  { title: 'Open Sans', value: 'Open Sans' },
  { title: 'Lato', value: 'Lato' },
  { title: 'Poppins', value: 'Poppins' },
  { title: 'Montserrat', value: 'Montserrat' },
  { title: 'Nunito', value: 'Nunito' },
  { title: 'Raleway', value: 'Raleway' },
  { title: 'Work Sans', value: 'Work Sans' },
  { title: 'DM Sans', value: 'DM Sans' },
  { title: 'Outfit', value: 'Outfit' },
  { title: 'Space Grotesk', value: 'Space Grotesk' },
  { title: 'Plus Jakarta Sans', value: 'Plus Jakarta Sans' },
  { title: 'Manrope', value: 'Manrope' },
  { title: 'Sora', value: 'Sora' },
  // Serif Fonts
  { title: 'Playfair Display', value: 'Playfair Display' },
  { title: 'Merriweather', value: 'Merriweather' },
  { title: 'Lora', value: 'Lora' },
  { title: 'Libre Baskerville', value: 'Libre Baskerville' },
  { title: 'Cormorant Garamond', value: 'Cormorant Garamond' },
  { title: 'Fraunces', value: 'Fraunces' },
  { title: 'Crimson Pro', value: 'Crimson Pro' },
  // Display/Creative Fonts
  { title: 'Archivo', value: 'Archivo' },
  { title: 'Bebas Neue', value: 'Bebas Neue' },
  { title: 'Oswald', value: 'Oswald' },
  { title: 'Anton', value: 'Anton' },
  { title: 'Righteous', value: 'Righteous' },
  // Monospace Fonts
  { title: 'JetBrains Mono', value: 'JetBrains Mono' },
  { title: 'Fira Code', value: 'Fira Code' },
  { title: 'Source Code Pro', value: 'Source Code Pro' },
]

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  groups: [
    { name: 'general', title: 'General', default: true },
    { name: 'typography', title: 'Typography' },
    { name: 'branding', title: 'Branding' },
    { name: 'contact', title: 'Contact' },
    { name: 'navigation', title: 'Navigation' },
    { name: 'footer', title: 'Footer' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
      group: 'general',
    },
    {
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      group: 'general',
    },
    {
      name: 'description',
      title: 'Site Description',
      type: 'text',
      rows: 3,
      group: 'general',
    },
    // Typography Settings
    {
      name: 'typography',
      title: 'Typography Settings',
      type: 'object',
      group: 'typography',
      description: 'Configure the fonts used across your website',
      fields: [
        {
          name: 'headingFont',
          title: 'Heading Font',
          type: 'string',
          description: 'Font used for headings (h1, h2, h3, etc.)',
          options: {
            list: fontOptions,
          },
          initialValue: 'Inter',
        },
        {
          name: 'bodyFont',
          title: 'Body Font',
          type: 'string',
          description: 'Font used for body text and paragraphs',
          options: {
            list: fontOptions,
          },
          initialValue: 'Inter',
        },
        {
          name: 'accentFont',
          title: 'Accent Font (Optional)',
          type: 'string',
          description: 'Optional font for special elements like quotes or highlights',
          options: {
            list: [{ title: 'None (use body font)', value: '' }, ...fontOptions],
          },
        },
      ],
    },
    {
      name: 'logo',
      title: 'Logo',
      type: 'object',
      group: 'branding',
      fields: [
        {
          name: 'light',
          title: 'Light Logo',
          type: 'image',
        },
        {
          name: 'dark',
          title: 'Dark Logo',
          type: 'image',
        },
      ],
    },
    {
      name: 'brandColors',
      title: 'Brand Colors',
      type: 'object',
      group: 'branding',
      fields: [
        {
          name: 'primary',
          title: 'Primary Color',
          type: 'color',
        },
        {
          name: 'secondary',
          title: 'Secondary Color',
          type: 'color',
        },
        {
          name: 'accent',
          title: 'Accent Color',
          type: 'color',
        },
      ],
    },
    {
      name: 'contact',
      title: 'Contact Information',
      type: 'object',
      group: 'contact',
      fields: [
        {
          name: 'email',
          title: 'Email',
          type: 'string',
        },
        {
          name: 'phone',
          title: 'Phone',
          type: 'string',
        },
        {
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 2,
        },
      ],
    },
    {
      name: 'socialMedia',
      title: 'Social Media Links',
      type: 'array',
      group: 'contact',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Twitter', value: 'twitter' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'GitHub', value: 'github' },
                ],
              },
            },
            {
              name: 'url',
              title: 'URL',
              type: 'url',
            },
          ],
        },
      ],
    },
    {
      name: 'navigation',
      title: 'Navigation Menu',
      type: 'array',
      group: 'navigation',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'label',
              title: 'Label',
              type: 'string',
            },
            {
              name: 'url',
              title: 'URL',
              type: 'string',
            },
            {
              name: 'children',
              title: 'Submenu Items',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    {
                      name: 'label',
                      title: 'Label',
                      type: 'string',
                    },
                    {
                      name: 'url',
                      title: 'URL',
                      type: 'string',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'footer',
      title: 'Footer Content',
      type: 'object',
      group: 'footer',
      fields: [
        {
          name: 'text',
          title: 'Footer Text',
          type: 'text',
          rows: 2,
        },
        {
          name: 'copyright',
          title: 'Copyright Text',
          type: 'string',
        },
        {
          name: 'links',
          title: 'Footer Links',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                {
                  name: 'label',
                  title: 'Label',
                  type: 'string',
                },
                {
                  name: 'url',
                  title: 'URL',
                  type: 'string',
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: 'seo',
      title: 'SEO Defaults',
      type: 'object',
      group: 'seo',
      fields: [
        {
          name: 'metaTitle',
          title: 'Default Meta Title',
          type: 'string',
        },
        {
          name: 'metaDescription',
          title: 'Default Meta Description',
          type: 'text',
          rows: 3,
        },
        {
          name: 'ogImage',
          title: 'Default OG Image',
          type: 'image',
        },
        {
          name: 'keywords',
          title: 'Default Keywords',
          type: 'array',
          of: [{ type: 'string' }],
        },
      ],
    },
  ],
})
