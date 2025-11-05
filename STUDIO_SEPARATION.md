# Sanity Studio Separation Guide

The Sanity Studio has been separated into a standalone application to avoid conflicts with Next.js.

## What Changed

### Before
- Studio was embedded in Next.js at `/studio` route
- Caused React context errors with Next.js 15+
- Mixed server/client component issues

### After
- Studio runs as completely separate app in `sanity-studio/` directory
- No more conflicts with Next.js
- Studio runs on port 3333, Next.js on port 3000

## Running Both Apps

### Terminal 1 - Next.js Frontend
```bash
npm run dev
```
Runs on: http://localhost:3000

### Terminal 2 - Sanity Studio
```bash
cd sanity-studio
npm run dev
```
Runs on: http://localhost:3333

## What to Clean Up in Next.js

You can now safely remove these files/folders from your Next.js app:

1. **Remove studio route**:
   - `app/studio/` directory (entire folder)

2. **Remove Sanity config from Next.js**:
   - `sanity.config.ts` (root level)
   - `sanity.cli.ts` (root level)

3. **Remove schemas** (now in studio):
   - `sanity/schemas/` directory (entire folder)
   - Keep `sanity/` folder but only with `client.ts`, `image.ts`, `queries.ts` in `lib/sanity/`

4. **Update package.json**:
   Remove these dependencies from Next.js (they're now only in studio):
   - `sanity` (keep `next-sanity` only)
   - `@sanity/vision`
   - Remove any studio-related scripts

5. **Remove wrapper component**:
   - `components/studio/Studio.tsx`

## Keep These in Next.js

✅ Keep these for fetching data:
- `lib/sanity/client.ts` - For querying content
- `lib/sanity/image.ts` - For image URLs
- `lib/sanity/queries.ts` - For GROQ queries
- `next-sanity` package - For Next.js integration

## Environment Variables

Make sure both apps have proper env variables:

### Next.js (`.env.local`)
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=ryc5e4q2
NEXT_PUBLIC_SANITY_DATASET=production
```

### Sanity Studio
Already configured in `sanity.config.ts`

## Deploying

### Deploy Next.js Frontend
```bash
vercel deploy
# or your preferred hosting
```

### Deploy Sanity Studio
```bash
cd sanity-studio
npm run deploy
```
This hosts the studio at `https://your-project.sanity.studio`

## Benefits

✅ No more React context errors
✅ No more server/client component conflicts  
✅ Studio and frontend can be updated independently
✅ Cleaner separation of concerns
✅ Studio can be deployed separately
✅ Easier to manage dependencies
