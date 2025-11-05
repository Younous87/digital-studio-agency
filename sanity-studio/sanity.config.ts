import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {colorInput} from '@sanity/color-input'
import {codeInput} from '@sanity/code-input'
import {schemaTypes} from './schemaTypes'

export default defineConfig({
  name: 'default',
  title: 'Digital Studio',

  projectId: 'ryc5e4q2',
  dataset: 'production',

  plugins: [structureTool(), visionTool(), colorInput(), codeInput()],

  schema: {
    types: schemaTypes,
  },
  
  // Configure CORS for your Next.js app
  cors: {
    credentials: true,
    origin: ['http://localhost:3000', 'https://yourdomain.com'],
  },
})
