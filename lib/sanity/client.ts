import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-11-05',
  useCdn: false, // Disable CDN to ensure fresh data for direct updates
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published', // Only fetch published documents
  // Disable caching in development for immediate updates
  stega: {
    enabled: false,
  },
})
