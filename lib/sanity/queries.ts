// Site Settings Query
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  title,
  tagline,
  description,
  logo,
  brandColors,
  contact,
  socialMedia,
  navigation,
  footer,
  seo
}`

// Homepage Query
export const homepageQuery = `*[_type == "homepage"][0]{
  title,
  pageBuilder[]{
    _type,
    _type == "hero" => {
      headline,
      subheadline,
      cta,
      secondaryCta,
      backgroundImage,
      backgroundVideo
    },
    _type == "servicesOverview" => {
      title,
      description,
      layout,
      "services": services[]->{ 
        _id,
        title, 
        slug, 
        shortDescription, 
        icon 
      }
    },
    _type == "featuredProjects" => {
      title,
      description,
      layout,
      showAll,
      "projects": select(
        showAll == true => *[_type == "project" && featured == true]{
          _id,
          title,
          slug,
          clientName,
          shortDescription,
          featuredImage,
          categories
        },
        projects[]->{ 
          _id,
          title, 
          slug, 
          clientName,
          shortDescription, 
          featuredImage,
          categories
        }
      )
    },
    _type == "testimonials" => {
      title,
      description,
      layout,
      showFeatured,
      "testimonials": select(
        showFeatured == true => *[_type == "testimonial" && featured == true]{
          _id,
          clientName,
          company,
          role,
          quote,
          photo,
          rating
        },
        testimonials[]->{ 
          _id,
          clientName, 
          company,
          role,
          quote, 
          photo,
          rating
        }
      )
    },
    _type == "aboutSection" => {
      title,
      content,
      image,
      imagePosition,
      cta
    },
    _type == "ctaSection" => {
      title,
      description,
      primaryCta,
      secondaryCta,
      backgroundImage,
      backgroundColor
    },
    _type == "textImageBlock" => {
      title,
      content,
      image,
      imagePosition,
      cta
    },
    _type == "statsSection" => {
      title,
      stats,
      backgroundColor
    }
  },
  seo
}`

// Services Page Query
export const servicesPageQuery = `*[_type == "servicesPage"][0]{
  title,
  pageBuilder[]{
    _type,
    _type == "pageHero" => {
      title, subtitle, cta, background
    },
    _type == "servicesOverview" => {
      title, description, layout, "services": services[]->{ _id, title, slug, shortDescription, icon }
    },
    _type == "serviceList" => {
      title, description, layout, showAll, "services": select(showAll == true => *[_type == "service"]{ _id, title, slug, shortDescription, icon }, services[]->{ _id, title, slug, shortDescription, icon }), backgroundColor
    },
    _type == "featuredProjects" => {
      title, description, layout, showAll, "projects": select(showAll == true => *[_type == "project" && featured == true]{ _id, title, slug, clientName, shortDescription, featuredImage, categories }, projects[]->{ _id, title, slug, clientName, shortDescription, featuredImage, categories })
    },
    _type == "testimonials" => {
      title, description, layout, showFeatured, "testimonials": select(showFeatured == true => *[_type == "testimonial" && featured == true]{ _id, clientName, company, role, quote, photo, rating }, testimonials[]->{ _id, clientName, company, role, quote, photo, rating })
    },
    _type == "ctaSection" => { title, description, primaryCta, secondaryCta, backgroundImage, backgroundColor },
    _type == "textImageBlock" => { title, content, image, imagePosition, cta },
    _type == "statsSection" => { title, stats, backgroundColor }
  },
  seo
}`

// Projects Page Query
export const projectsPageQuery = `*[_type == "projectsPage"][0]{
  title,
  pageBuilder[]{
    _type,
    _type == "pageHero" => {
      title, subtitle, cta, background
    },
    _type == "featuredProjects" => {
      title, description, layout, showAll, "projects": select(showAll == true => *[_type == "project" && featured == true]{ _id, title, slug, clientName, shortDescription, featuredImage, categories }, projects[]->{ _id, title, slug, clientName, shortDescription, featuredImage, categories })
    },
    _type == "hero" => {
      headline, subheadline, cta, secondaryCta, backgroundImage, backgroundVideo
    },
    _type == "aboutSection" => {
      title, content, image, imagePosition, cta
    },
    _type == "servicesOverview" => {
      title, description, layout, "services": services[]->{ _id, title, slug, shortDescription, icon }
    },
    _type == "testimonials" => {
      title, description, layout, showFeatured, "testimonials": select(showFeatured == true => *[_type == "testimonial" && featured == true]{ _id, clientName, company, role, quote, photo, rating }, testimonials[]->{ _id, clientName, company, role, quote, photo, rating })
    },
    _type == "ctaSection" => { title, description, primaryCta, secondaryCta, backgroundImage, backgroundColor },
    _type == "textImageBlock" => { title, content, image, imagePosition, cta },
    _type == "statsSection" => { title, stats, backgroundColor }
  },
  seo
}`

export const serviceBySlugQuery = `*[_type == "service" && slug.current == $slug][0]{
  title,
  slug,
  icon,
  shortDescription,
  fullDescription,
  features,
  processSteps,
  "relatedProjects": relatedProjects[]->{ 
    _id,
    title, 
    slug, 
    featuredImage,
    shortDescription
  },
  cta,
  pageBuilder[]{
    _type,
    _type == "hero" => {
      headline, subheadline, cta, secondaryCta, backgroundImage, backgroundVideo, sectionBackgroundImage
    },
    _type == "servicesOverview" => {
      title, description, layout, "services": services[]->{ _id, title, slug, shortDescription, icon }, backgroundImage
    },
    _type == "featuredProjects" => {
      title, description, layout, showAll, "projects": select(showAll == true => *[_type == "project" && featured == true]{ _id, title, slug, clientName, shortDescription, featuredImage, categories }, projects[]->{ _id, title, slug, clientName, shortDescription, featuredImage, categories }), backgroundImage
    },
    _type == "testimonials" => {
      title, description, layout, showFeatured, "testimonials": select(showFeatured == true => *[_type == "testimonial" && featured == true]{ _id, clientName, company, role, quote, photo, rating }, testimonials[]->{ _id, clientName, company, role, quote, photo, rating }), backgroundImage
    },
    _type == "aboutSection" => {
      title, content, image, imagePosition, cta, backgroundImage
    },
    _type == "ctaSection" => { title, description, primaryCta, secondaryCta, backgroundImage, backgroundColor },
    _type == "textImageBlock" => { title, content, image, imagePosition, cta, backgroundImage },
    _type == "statsSection" => { title, stats, backgroundImage },
    _type == "featuresSection" => { title, features, backgroundImage },
    _type == "processSection" => { title, steps, backgroundImage },
    _type == "fullDescriptionSection" => { content, backgroundImage },
    _type == "serviceCtaSection" => { title, description, buttonText, buttonLink, backgroundImage },
    _type == "contactForm" => { title, description, contactInfo, formTitle, formDescription, submitButtonText, backgroundImage },
    _type == "serviceList" => { title, description, layout, showAll, "services": select(showAll == true => *[_type == "service"]{ _id, title, slug, shortDescription, icon }, services[]->{ _id, title, slug, shortDescription, icon }), backgroundColor, backgroundImage },
    _type == "blogPosts" => { title, description, layout, showFeatured, "posts": select(showFeatured == true => *[_type == "post" && featured == true] | order(publishedAt desc) { _id, title, slug, excerpt, featuredImage, publishedAt, "author": author->{ name, role, photo }, categories, tags }, posts[]->{ _id, title, slug, excerpt, featuredImage, publishedAt, "author": author->{ name, role, photo }, categories, tags }), backgroundImage }
  },
  seo
}`

// Projects Queries
export const projectsQuery = `*[_type == "project"] | order(date desc) {
  _id,
  title,
  slug,
  clientName,
  featuredImage,
  shortDescription,
  categories,
  year,
  date
}`

export const featuredProjectsQuery = `*[_type == "project" && featured == true] | order(date desc) {
  _id,
  title,
  slug,
  clientName,
  featuredImage,
  shortDescription,
  categories,
  year
}`

export const projectBySlugQuery = `*[_type == "project" && slug.current == $slug][0]{
  title,
  slug,
  clientName,
  featuredImage,
  gallery,
  categories,
  year,
  date,
  shortDescription,
  caseStudy,
  "services": services[]->{ 
    _id,
    title, 
    slug 
  },
  results,
  "testimonial": testimonial->{ 
    clientName,
    company,
    role,
    quote,
    photo,
    rating
  },
  projectUrl,
  seo
}`

// Blog Queries
export const postsQuery = `*[_type == "post"] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  "author": author->{ 
    name, 
    role,
    photo
  },
  categories,
  tags
}`

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  excerpt,
  featuredImage,
  content,
  publishedAt,
  "author": author->{ 
    name, 
    role,
    bio,
    photo,
    socialLinks
  },
  categories,
  tags,
  "relatedPosts": relatedPosts[]->{ 
    _id,
    title, 
    slug, 
    excerpt,
    featuredImage,
    publishedAt
  },
  seo
}`

export const postsByCategoryQuery = `*[_type == "post" && $category in categories] | order(publishedAt desc) {
  _id,
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  "author": author->{ 
    name, 
    role,
    photo
  },
  categories,
  tags
}`

// Team Queries
export const teamMembersQuery = `*[_type == "teamMember"] | order(order asc) {
  _id,
  name,
  slug,
  role,
  bio,
  photo,
  socialLinks
}`

// About Page Query
export const aboutQuery = `*[_type == "about"][0]{
  title,
  pageBuilder[]{
    _type,
    _type == "hero" => {
      headline, subheadline, cta, secondaryCta, backgroundImage, backgroundVideo
    },
    _type == "pageHero" => {
      title, subtitle, cta, background
    },
    _type == "ourStory" => {
      title, content, backgroundColor
    },
    _type == "ourValues" => {
      title, values[]{ _key, title, description, icon }, backgroundColor
    },
    _type == "meetOurTeam" => {
      title, showTeam, "teamMembers": teamMembers[]->{ _id, name, slug, role, bio, photo, socialLinks }, backgroundColor
    },
    _type == "aboutSection" => {
      title, content, image, imagePosition, cta
    },
    _type == "servicesOverview" => {
      title, description, layout, "services": services[]->{ _id, title, slug, shortDescription, icon }
    },
    _type == "featuredProjects" => {
      title, description, layout, showAll, "projects": select(showAll == true => *[_type == "project" && featured == true]{ _id, title, slug, clientName, shortDescription, featuredImage, categories }, projects[]->{ _id, title, slug, clientName, shortDescription, featuredImage, categories })
    },
    _type == "testimonials" => {
      title, description, layout, showFeatured, "testimonials": select(showFeatured == true => *[_type == "testimonial" && featured == true]{ _id, clientName, company, role, quote, photo, rating }, testimonials[]->{ _id, clientName, company, role, quote, photo, rating })
    },
    _type == "ctaSection" => { title, description, primaryCta, secondaryCta, backgroundImage, backgroundColor },
    _type == "textImageBlock" => { title, content, image, imagePosition, cta },
    _type == "statsSection" => { title, stats, backgroundColor }
  },
  seo
}`

// Contact Page Query
export const contactPageQuery = `*[_type == "contactPage"][0]{
  title,
  subtitle,
  pageBuilder[]{
    _type,
    _type == "pageHero" => {
      title, subtitle, cta, background
    },
    _type == "contactForm" => {
      title,
      description,
      contactInfo,
      formTitle,
      formDescription,
      submitButtonText
    }
  },
  seo
}`

// Blog Page Query
export const blogPageQuery = `*[_type == "blogPage"][0]{
  title,
  pageBuilder[]{
    _type,
    _type == "pageHero" => {
      title, subtitle, cta, background
    },
    _type == "blogPosts" => {
      title,
      description,
      layout,
      showFeatured,
      "posts": select(
        showFeatured == true => *[_type == "post" && featured == true] | order(publishedAt desc) {
          _id,
          title,
          slug,
          excerpt,
          featuredImage,
          publishedAt,
          "author": author->{ 
            name, 
            role,
            photo
          },
          categories,
          tags
        },
        posts[]->{ 
          _id,
          title,
          slug,
          excerpt,
          featuredImage,
          publishedAt,
          "author": author->{ 
            name, 
            role,
            photo
          },
          categories,
          tags
        }
      )
    },
    _type == "ctaSection" => { title, description, primaryCta, secondaryCta, backgroundImage, backgroundColor },
    _type == "textImageBlock" => { title, content, image, imagePosition, cta },
    _type == "statsSection" => { title, stats, backgroundColor }
  },
  seo
}`

// Testimonials Queries
export const testimonialsQuery = `*[_type == "testimonial"] {
  _id,
  clientName,
  company,
  role,
  quote,
  photo,
  rating,
  "project": project->{ 
    title, 
    slug 
  }
}`

export const featuredTestimonialsQuery = `*[_type == "testimonial" && featured == true] {
  _id,
  clientName,
  company,
  role,
  quote,
  photo,
  rating
}`
