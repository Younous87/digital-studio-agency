
---
# Digital Studio Agency - Website Architecture & Outline


## **Tech Stack Overview**

- **Frontend**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS
- **CMS**: Sanity Studio
- **Hosting**: Vercel
- **Key Features**: ISR (Incremental Static Regeneration), Image optimization, SEO-friendly

---

## **Site Structure**

### **Core Pages**

1. **Homepage** `/`
2. **About** `/about`
3. **Services** `/services` (overview page)
4. **Service Detail Pages** `/services/[slug]` (dynamic)
5. **Work/Portfolio** `/work`
6. **Project Case Studies** `/work/[slug]` (dynamic)
7. **Blog/Insights** `/blog`
8. **Blog Post** `/blog/[slug]` (dynamic)
9. **Contact** `/contact`

---

## **Sanity Schema Architecture**

### **1. Global Settings** (`siteSettings`)

Make everything globally customizable:
- Site title, tagline, description
- Logo (light/dark variants)
- Social media links
- Contact information
- Navigation menu structure
- Footer content & links
- SEO defaults (meta image, keywords)
- Brand colors (primary, secondary, accent)
- Typography choices

### **2. Homepage** (`homepage`)

Modular page builder approach:

- Hero section (customizable headline, subheadline, CTA, background)
- Services overview section
- Featured projects (references to projects)
- Testimonials/Social proof
- About/Introduction section
- CTA section
- Reusable content blocks/modules

**3. Services** (`service`)

- Title
- Slug
- Icon/image
- Short description (for cards)
- Full description (rich text)
- Service features/deliverables (array)
- Process steps (optional)
- Related case studies (references)
- CTA section
- SEO metadata

**4. Projects/Case Studies** (`project`)

- Title & slug
- Client name
- Featured image & gallery
- Project type/category (tags)
- Year/date
- Short description
- Full case study (rich text with images)
- Services used (references to services)
- Results/outcomes
- Testimonial (optional)
- Project URL (optional)
- SEO metadata

**5. Blog Posts** (`post`)

- Title & slug
- Author (reference)
- Published date
- Featured image
- Excerpt
- Content (portable text/rich text)
- Categories/tags
- Related posts
- SEO metadata

**6. Team Members** (`teamMember`)

- Name
- Role/title
- Bio
- Photo
- Social links
- Display order

**7. Testimonials** (`testimonial`)

- Client name & company
- Quote
- Photo (optional)
- Project reference (optional)
- Star rating (optional)


### **8. Reusable Content Blocks** (`pageBuilder`)

Create modular sections that can be mixed/matched:

- Hero variants
- Text + Image blocks
- Feature grids
- Stats/metrics
- Quote/testimonial blocks
- CTA sections
- Image galleries
- Accordion/FAQ
- Video embed
- Contact forms


Next.js Project Structure

/app
  /layout.js (global layout with header/footer)
  /page.js (homepage)
  /about
    /page.js
  /services
    /page.js (services overview)
    /[slug]
      /page.js (individual service)
  /work
    /page.js (portfolio grid)
    /[slug]
      /page.js (case study)
  /blog
    /page.js (blog listing)
    /[slug]
      /page.js (blog post)
  /contact
    /page.js

/components
  /global
    - Header.jsx
    - Footer.jsx
    - Navigation.jsx
  /blocks (reusable Sanity blocks)
    - HeroBlock.jsx
    - ServicesGrid.jsx
    - ProjectGrid.jsx
    - TestimonialCarousel.jsx
    - CTASection.jsx
    - RichTextRenderer.jsx
  /ui (base components)
    - Button.jsx
    - Card.jsx
    - Container.jsx
    - Section.jsx

/lib
  /sanity
    - client.js (Sanity client config)
    - queries.js (GROQ queries)
    - schemas/
      - index.js
      - service.js
      - project.js
      - post.js
      - siteSettings.js
      - etc.

/sanity (Sanity Studio)
  /schemas
  - sanity.config.js
  - sanity.cli.js

/styles
  - globals.css (Tailwind imports)

/public
  - fonts, icons, static assets


## **Key Features to Implement**

### **1. Flexible Page Builder System**

Use Sanity's array of objects to let you build pages with modular blocks:

- Drag-and-drop sections
- Each block type has its own styling options
- Easily reorder, add, remove sections

### **2. Design System in Sanity**

- Color picker for brand colors
- Font pairing selector
- Spacing/layout preferences
- Button style variants
- Card style variants

### **3. Dynamic Navigation**

Store navigation structure in Sanity so you can:

- Add/remove menu items
- Create dropdown menus
- Add external links
- Reorder items

### **4. SEO Management**

- Per-page meta titles, descriptions, OG images
- Automatic sitemap generation
- Schema.org structured data
- Robots.txt configuration

### **5. Performance Optimizations**

- Next.js Image component with Sanity image CDN
- ISR with revalidation on content changes
- Lazy loading for images/components
- Font optimization