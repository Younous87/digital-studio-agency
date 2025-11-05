# Digital Studio - Quick Reference

## 🚀 Quick Start Commands

```bash
# Start development
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linter
npm run lint

# Deploy Sanity Studio
npx sanity deploy
```

## 🔗 Important URLs

- **Local Site**: http://localhost:3000
- **Sanity Studio**: http://localhost:3000/studio
- **Sanity Manage**: https://sanity.io/manage

## 📂 Key Files

### Configuration
- `next.config.ts` - Next.js configuration
- `sanity.config.ts` - Sanity Studio setup
- `tailwind.config.ts` - Styling configuration
- `.env.local` - Environment variables

### Main Layout
- `app/layout.tsx` - Root layout with Header/Footer
- `components/global/Header.tsx` - Site header
- `components/global/Footer.tsx` - Site footer

### Pages
- `app/page.tsx` - Homepage (page builder)
- `app/about/page.tsx` - About page
- `app/services/page.tsx` - Services listing
- `app/work/page.tsx` - Portfolio
- `app/blog/page.tsx` - Blog listing
- `app/contact/page.tsx` - Contact form

## 🎨 Component Library

### UI Components (`components/ui/`)
```tsx
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Container from '@/components/ui/Container'
import Section from '@/components/ui/Section'

// Usage
<Button href="/contact" variant="primary" size="lg">
  Get Started
</Button>

<Card hover>
  {/* Content */}
</Card>

<Section background="gray" padding="lg">
  <Container size="lg">
    {/* Content */}
  </Container>
</Section>
```

### Content Blocks (`components/blocks/`)
- `HeroBlock` - Hero sections
- `ServicesGrid` - Service displays
- `ProjectGrid` - Portfolio grids
- `TestimonialCarousel` - Testimonials
- `CTASection` - Call-to-action
- `RichTextRenderer` - Portable text

## 📝 Sanity Schema Quick Reference

### Main Documents
- `siteSettings` - Global site configuration
- `homepage` - Homepage with page builder
- `service` - Service items
- `project` - Portfolio projects
- `post` - Blog posts
- `teamMember` - Team profiles
- `testimonial` - Client testimonials

### Page Builder Blocks
- `hero` - Hero section
- `servicesOverview` - Services grid
- `featuredProjects` - Project showcase
- `testimonials` - Testimonial section
- `aboutSection` - About content
- `ctaSection` - CTA banner
- `textImageBlock` - Text + image
- `statsSection` - Metrics display

## 🔧 Common Tasks

### Add a New Page
1. Create file in `app/your-page/page.tsx`
2. Use existing pages as templates
3. Add to navigation in Sanity Studio

### Add a New Content Block
1. Create schema in `sanity/schemas/blocks/`
2. Add to `sanity/schemas/index.ts`
3. Add to homepage schema page builder array
4. Create component in `components/blocks/`
5. Add case in `app/page.tsx` switch statement

### Modify Styles
- Global: `app/globals.css`
- Tailwind: `tailwind.config.ts`
- Components: Update className props

### Fetch Sanity Data
```typescript
import { client } from '@/lib/sanity/client'
import { yourQuery } from '@/lib/sanity/queries'

const data = await client.fetch(yourQuery, params)
```

### Image from Sanity
```typescript
import { urlFor } from '@/lib/sanity/image'

<Image
  src={urlFor(sanityImage).width(800).url()}
  alt="Description"
  width={800}
  height={600}
/>
```

## 🐛 Debugging Tips

### Data Not Showing
1. Check Sanity Studio has content
2. Verify environment variables in `.env.local`
3. Check browser console for errors
4. Verify GROQ query syntax

### Build Errors
1. Run `npm install` to update dependencies
2. Check TypeScript errors with `npm run lint`
3. Verify all imports are correct
4. Delete `.next` and rebuild

### Images Not Loading
1. Check Sanity Project ID in `next.config.ts`
2. Verify image is uploaded in Sanity
3. Check CORS settings in Sanity dashboard
4. Test image URL directly

## 📊 Performance Tips

- Keep ISR revalidate times appropriate (60s default)
- Optimize images in Sanity before upload
- Use Server Components where possible
- Implement lazy loading for heavy components
- Monitor bundle size

## 🔐 Security Checklist

- [ ] Environment variables not committed
- [ ] Sanity API token has minimal permissions
- [ ] CORS configured correctly
- [ ] No sensitive data in client components
- [ ] Rate limiting on contact form

## 📱 Responsive Breakpoints

```css
sm: 640px   /* Small devices */
md: 768px   /* Medium devices */
lg: 1024px  /* Large devices */
xl: 1280px  /* Extra large */
2xl: 1536px /* 2X large */
```

## 🎯 SEO Checklist

- [ ] Meta titles and descriptions set
- [ ] OG images configured
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Semantic HTML used
- [ ] Alt text on images
- [ ] Fast load times (<3s)
- [ ] Mobile-friendly

## 📧 Contact Form Setup

To enable email sending, integrate:
- **Resend** (recommended)
- **SendGrid**
- **Nodemailer**
- **Postmark**

Add API route in `app/api/contact/route.ts`

## 🌐 Deployment Quick Steps

### Vercel
1. Push to GitHub
2. Import in Vercel
3. Add environment variables
4. Deploy!

### Sanity Studio
```bash
npx sanity deploy
```

## 📞 Support

- **Next.js Docs**: https://nextjs.org/docs
- **Sanity Docs**: https://sanity.io/docs
- **Tailwind Docs**: https://tailwindcss.com/docs

## 💡 Pro Tips

1. Use TypeScript for better DX
2. Keep components small and focused
3. Use Sanity preview for draft content
4. Test on mobile regularly
5. Monitor Vercel analytics
6. Keep dependencies updated
7. Use git branches for features
8. Document custom changes

---

**Quick help**: Check PROJECT_SUMMARY.md, SETUP.md, and DEPLOYMENT.md for detailed guides!
