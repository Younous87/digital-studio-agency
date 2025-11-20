import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'contactForm',
  title: 'Contact Form Section',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'description',
      title: 'Section Description',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'contactInfo',
      title: 'Contact Information',
      type: 'object',
      fields: [
        defineField({
          name: 'email',
          title: 'Email Address',
          type: 'string',
          validation: Rule => Rule.email()
        }),
        defineField({
          name: 'phone',
          title: 'Phone Number',
          type: 'string'
        }),
        defineField({
          name: 'address',
          title: 'Address',
          type: 'text',
          rows: 3
        }),
        defineField({
          name: 'socialLinks',
          title: 'Social Media Links',
          type: 'array',
          of: [
            defineField({
              name: 'socialLink',
              title: 'Social Link',
              type: 'object',
              fields: [
                defineField({
                  name: 'platform',
                  title: 'Platform',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Twitter', value: 'twitter' },
                      { title: 'LinkedIn', value: 'linkedin' },
                      { title: 'Instagram', value: 'instagram' },
                      { title: 'Facebook', value: 'facebook' },
                      { title: 'GitHub', value: 'github' },
                      { title: 'YouTube', value: 'youtube' }
                    ]
                  }
                }),
                defineField({
                  name: 'url',
                  title: 'URL',
                  type: 'url'
                })
              ]
            })
          ]
        })
      ]
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      description: 'Title shown above the contact form'
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      rows: 2,
      description: 'Description shown above the contact form'
    }),
    defineField({
      name: 'submitButtonText',
      title: 'Submit Button Text',
      type: 'string',
      initialValue: 'Send Message'
    })
  ],
  preview: {
    select: {
      title: 'title'
    },
    prepare({ title }) {
      return {
        title: title || 'Contact Form Section'
      }
    }
  }
})