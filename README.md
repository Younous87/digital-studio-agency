# Digital Studio Agency Website

A modern, fully-featured agency website built with Next.js 14, Sanity CMS, and Tailwind CSS.

## 🚀 Features

- **Next.js 14** with App Router and Server Components
- **Sanity CMS** for content management with a powerful Studio
- **Tailwind CSS** for modern, responsive styling
- **TypeScript** for type-safe development
- **Image Optimization** using Next.js Image and Sanity CDN
- **SEO-Friendly** with dynamic metadata generation
- **ISR (Incremental Static Regeneration)** for optimal performance
- **Modular Page Builder** for flexible content creation
- Dynamic routes for services, projects, and blog posts
- Fully responsive design

## 📦 Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout with Header/Footer
│   ├── page.tsx           # Homepage with page builder
│   ├── about/             # About page
│   ├── services/          # Services pages
│   ├── work/              # Portfolio/projects pages
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   └── studio/            # Sanity Studio route
├── components/
│   ├── global/            # Header, Footer, Navigation
│   ├── blocks/            # Page builder blocks
│   └── ui/                # Reusable UI components
├── lib/
│   └── sanity/            # Sanity client and queries
├── sanity/
│   └── schemas/           # Content schemas
├── public/                # Static assets
└── sanity.config.ts       # Sanity Studio configuration
```

## 🛠️ Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Sanity

1. Create a Sanity account at [sanity.io](https://www.sanity.io/)
2. Create a new project or connect to an existing one:

```bash
npx sanity init
```

3. Copy your project ID and dataset name

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```bash
cp .env.local.example .env.local
```

Update the following variables:

```env
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_VERSION=2024-11-05
SANITY_API_TOKEN=your_read_token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Deploy Sanity Schemas

The schemas are already configured. Access Sanity Studio at:

```
http://localhost:3000/studio
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your site.

## 📝 Content Management

### Sanity Studio

Access the Sanity Studio at `/studio` to manage:

- **Site Settings**: Logo, navigation, footer, social links
- **Homepage**: Flexible page builder with modular blocks
- **Services**: Service listings and detail pages
- **Projects**: Portfolio items with case studies
- **Blog Posts**: Articles with rich text content
- **Team Members**: Staff profiles
- **Testimonials**: Client testimonials

### Page Builder Blocks

The homepage uses a flexible page builder with these block types:

- **Hero Block**: Hero section with background image/video
- **Services Overview**: Grid of services
- **Featured Projects**: Showcase projects
- **Testimonials**: Client testimonials carousel
- **About Section**: Text + image block
- **CTA Section**: Call-to-action banner
- **Text + Image Block**: Flexible content block
- **Stats Section**: Metrics and statistics

## 🎨 Customization

### Styling

- Tailwind CSS configuration: `tailwind.config.ts`
- Global styles: `app/globals.css`
- Component-specific styles use Tailwind utility classes

### Adding New Content Types

1. Create schema in `sanity/schemas/`
2. Add to `sanity/schemas/index.ts`
3. Create GROQ queries in `lib/sanity/queries.ts`
4. Build components and pages as needed

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables
4. Deploy!

### Deploy Sanity Studio

```bash
npx sanity deploy
```

This creates a hosted Studio at `https://your-project.sanity.studio`

## 📚 Key Technologies

- [Next.js 14](https://nextjs.org/)
- [Sanity CMS](https://www.sanity.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [@portabletext/react](https://github.com/portabletext/react-portabletext)
- [@sanity/image-url](https://www.npmjs.com/package/@sanity/image-url)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the [documentation](https://nextjs.org/docs)
- Visit [Sanity Documentation](https://www.sanity.io/docs)
- Open an issue in the repository
