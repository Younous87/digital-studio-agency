import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'meetOurTeam',
  title: 'Meet Our Team',
  type: 'object',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'showTeam', title: 'Show Team', type: 'boolean', initialValue: true }),
    defineField({ name: 'teamMembers', title: 'Select Team Members', type: 'array', of: [{ type: 'reference', to: [{ type: 'teamMember' }] }] }),
    defineField({
      name: 'backgroundColor',
      title: 'Background Color',
      type: 'color',
      options: {
        disableAlpha: true
      }
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
    select: { title: 'title' },
    prepare(selection) { return { title: 'Meet Our Team', subtitle: selection.title } }
  }
})
