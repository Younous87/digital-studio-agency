# Deployment Guide

## Deploying to Vercel (Recommended)

### 1. Prepare Your Repository

```bash
# Initialize git if not already done
git init
git add .
git commit -m "Initial commit: Digital Studio website"

# Create GitHub repository and push
git remote add origin https://github.com/yourusername/digital-studio.git
git branch -M main
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. Configure project:
   - Framework Preset: Next.js
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Add Environment Variables

In Vercel Project Settings > Environment Variables, add:

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-05
SANITY_API_TOKEN=your_token
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### 4. Deploy Sanity Studio

**Option A: Deploy to Sanity Hosting (Recommended)**

```bash
npx sanity deploy
```

This will deploy your studio to: `https://your-project.sanity.studio`

**Option B: Self-host on Vercel**

Your Studio is already accessible at `/studio` on your Vercel deployment.

### 5. Configure CORS in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Select your project
3. Go to Settings > API
4. Add CORS origins:
   - `https://yourdomain.com`
   - `https://your-project.vercel.app`

### 6. Custom Domain (Optional)

In Vercel:
1. Project Settings > Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Alternative Deployment Options

### Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build and deploy
npm run build
netlify deploy --prod
```

Configure environment variables in Netlify dashboard.

### Deploy to AWS Amplify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. Add environment variables

### Self-Hosting with Docker

Create `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
```

Build and run:
```bash
docker build -t digital-studio .
docker run -p 3000:3000 digital-studio
```

## Post-Deployment Checklist

### Performance
- [ ] Enable CDN caching
- [ ] Configure ISR revalidation times
- [ ] Optimize images (already handled by Next.js)
- [ ] Enable compression

### SEO
- [ ] Add robots.txt
- [ ] Generate sitemap.xml
- [ ] Configure Open Graph images
- [ ] Add Google Search Console
- [ ] Set up analytics

### Security
- [ ] Enable HTTPS (automatic on Vercel)
- [ ] Configure security headers
- [ ] Set up rate limiting for contact form
- [ ] Review API token permissions

### Monitoring
- [ ] Set up error tracking (Sentry)
- [ ] Configure uptime monitoring
- [ ] Add performance monitoring
- [ ] Set up log aggregation

## Continuous Deployment

Vercel automatically deploys on git push:

- **Production**: Deploys on push to `main` branch
- **Preview**: Deploys on pull requests

To configure:
1. Vercel Dashboard > Project Settings
2. Git > Production Branch
3. Configure automatic deployments

## Webhooks for Content Updates

Set up Sanity webhooks to trigger rebuilds:

1. Sanity Dashboard > API > Webhooks
2. Add new webhook:
   - Name: "Vercel Rebuild"
   - URL: Your Vercel deploy hook URL
   - Trigger on: Create, Update, Delete
3. Get deploy hook from Vercel:
   - Project Settings > Git > Deploy Hooks

   ### On-demand Incremental Revalidation (recommended)

   Instead of triggering a full site redeploy, you can configure Sanity to POST a notification to a Next.js API route that revalidates only the pages affected by the content change.

   1. Add `SANITYWEBHOOKSECRET` env var to Vercel (Settings → Environment Variables). Use a strong secret value.
   2. Create a Sanity webhook (Project > API > Webhooks) with a target URL like:
      `https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET_VALUE`
      - Trigger on: Create, Update, Delete
      - Filter (recommended): `_type in ["siteSettings","homepage","about","servicesPage","projectsPage","contactPage","project","service","post","testimonial","teamMember"]`
      - Projection (recommended): `{ _id, _type, "slug": slug.current }`

   Debugging: return revalidated paths
    - If you want to verify which pages were revalidated by an incoming webhook call, set the environment variable `DEBUG_REVALIDATE=true` on Vercel and the webhook response will include the revalidated paths.
       - Optional: Use the `types` filter for only selected document types: `project`, `service`, `blogPost`, etc.
   3. When you publish a change in the Studio, Sanity will POST the changed document to the `/api/revalidate` endpoint; Next.js will revalidate the specific pages (e.g., the item slug and the listing pages) so updates are visible instantly without a full rebuild.

   To test the endpoint locally or from your terminal run:

   ```bash
   # Local dev (if running locally with `vercel dev` or `next dev`):
   curl -X POST "http://localhost:3000/api/revalidate?secret=YOUR_SECRET_VALUE" \
      -H "Content-Type: application/json" \
      -d '{"document": {"_type": "project", "slug": {"current": "my-slug"}}}'

   # Remote (after deployment):
   curl -X POST "https://your-site.vercel.app/api/revalidate?secret=YOUR_SECRET_VALUE" \
      -H "Content-Type: application/json" \
      -d '{"document": {"_type": "post", "slug": {"current": "my-blog-slug"}}}'
   ```

   Note: If you're using other hosting services or a multi-app monorepo, you can still use this approach as long as the public Next.js app route can accept the webhook and run revalidation.

## Environment-Specific Builds

Create environment-specific env files:

```bash
# .env.production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com

# .env.staging
NEXT_PUBLIC_SITE_URL=https://staging.yourdomain.com
```

## Rollback Strategy

If deployment fails:

**Vercel:**
1. Go to Deployments
2. Find previous successful deployment
3. Click "..." > "Promote to Production"

**Manual:**
```bash
git revert HEAD
git push origin main
```

## Performance Optimization

### Enable Edge Functions

In `next.config.ts`:
```typescript
export const runtime = 'edge'
```

### Configure Caching

```typescript
// In page components
export const revalidate = 3600 // Revalidate every hour
```

### Image Optimization

Already configured! Next.js automatically optimizes images.

## Troubleshooting

### Build Fails
- Check environment variables
- Verify all dependencies are in package.json
- Review build logs in Vercel

### Studio Not Accessible
- Ensure `/studio` route is deployed
- Check Sanity project ID
- Verify authentication

### Slow Performance
- Enable ISR for dynamic pages
- Configure CDN caching
- Optimize image sizes

## Monitoring & Maintenance

### Regular Tasks
- Monitor build times
- Review error logs weekly
- Update dependencies monthly
- Backup Sanity content regularly

### Analytics Setup

Add to `app/layout.tsx`:

```typescript
import Script from 'next/script'

// Add in <head>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
  strategy="afterInteractive"
/>
```

## Support Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Sanity Deployment](https://www.sanity.io/docs/deployment)

Happy deploying! 🚀
