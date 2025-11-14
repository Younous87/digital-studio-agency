import { defineType } from 'sanity'

export default defineType({
  name: 'meetOurTeam',
  title: 'Meet Our Team',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'showTeam', title: 'Show Team', type: 'boolean', initialValue: true },
    { name: 'teamMembers', title: 'Select Team Members', type: 'array', of: [{ type: 'reference', to: [{ type: 'teamMember' }] }] },
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection) { return { title: 'Meet Our Team', subtitle: selection.title } }
  }
})
