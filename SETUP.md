# Digital Studio - Quick Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A Sanity account (free at sanity.io)

## Step-by-Step Setup

### 1. Install Dependencies
```bash
cd /home/youyou/Documents/DigitalStudio
npm install
```

### 2. Set Up Sanity Project

**Option A: Create New Sanity Project**
```bash
npx sanity init --project-plan free
```

Follow the prompts:
- Create new project
- Use default dataset configuration (production)
- Note your Project ID

**Option B: Use Existing Sanity Project**
- Log in to sanity.io
- Get your Project ID from your dashboard
- Create a token (Settings > API > Add API token)

### 3. Configure Environment Variables

Copy the example env file:
```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your values:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-05
SANITY_API_TOKEN=your_read_token_here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Start Development Server
```bash
npm run dev
```

### 5. Access Sanity Studio

Open your browser to:
```
http://localhost:3000/studio
```

You'll need to log in with your Sanity account.

### 6. Add Initial Content

In Sanity Studio, create:

1. **Site Settings** (required for header/footer)
   - Add site title
   - Configure navigation menu
   - Add social media links
   - Set up footer content

2. **Homepage** (required for main page)
   - Add page builder blocks
   - Start with a Hero block
   - Add Services, Projects, or CTA sections

3. **Services** (optional)
   - Create service items
   - Add icons, descriptions
   - Link related projects

4. **Projects** (optional)
   - Upload project images
   - Write case studies
   - Link to services used

5. **Blog Posts** (optional)
   - Create team members first (for authors)
   - Write and publish posts

### 7. View Your Site

Navigate to:
```
http://localhost:3000
```

## Common Commands

### Development
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

### Sanity
```bash
npx sanity deploy    # Deploy studio to Sanity hosting
npx sanity manage    # Open project management
```

## Troubleshooting

### "Cannot fetch data" error
- Check your `.env.local` file
- Verify Project ID is correct
- Ensure you've created content in Sanity Studio
- Check that CORS is configured (Sanity auto-configures for localhost)

### Images not loading
- Verify Sanity Project ID in next.config.ts
- Check that images are uploaded in Sanity Studio
- Ensure cdn.sanity.io is in allowed image domains

### Studio won't load
- Clear browser cache
- Check that you're logged into Sanity
- Verify sanity.config.ts has correct project ID

### Build errors
- Run `npm install` again
- Delete .next folder and node_modules, reinstall
- Check all import paths are correct

## Next Steps

1. **Customize Design**
   - Modify Tailwind config
   - Update color schemes in components
   - Add your brand fonts

2. **Add Features**
   - Integrate email service for contact form
   - Add analytics (Google Analytics, Plausible)
   - Implement newsletter signup
   - Add search functionality

3. **Deploy**
   - Push to GitHub
   - Deploy to Vercel (recommended)
   - Deploy Sanity Studio: `npx sanity deploy`

4. **SEO**
   - Add robots.txt
   - Create sitemap
   - Configure metadata for all pages
   - Add structured data

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

## Support

If you encounter issues:
1. Check the console for error messages
2. Verify all environment variables are set
3. Ensure Sanity Studio has content
4. Review the README.md for detailed information

Happy coding! 🚀
