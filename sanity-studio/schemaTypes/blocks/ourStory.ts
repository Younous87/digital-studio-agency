import { defineType } from 'sanity'

export default defineType({
  name: 'ourStory',
  title: 'Our Story',
  type: 'object',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'content', title: 'Content', type: 'array', of: [{ type: 'block' }] },
  ],
  preview: {
    select: { title: 'title' },
    prepare(selection) {
      return { title: 'Our Story', subtitle: selection.title }
    }
  }
})
