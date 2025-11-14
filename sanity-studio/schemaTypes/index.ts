import siteSettings from './siteSettings'
import service from './service'
import project from './project'
import post from './post'
import teamMember from './teamMember'
import testimonial from './testimonial'
import homepage from './homepage'
import about from './about'

// Page Builder Blocks
import hero from './blocks/hero'
import servicesOverview from './blocks/servicesOverview'
import featuredProjects from './blocks/featuredProjects'
import testimonials from './blocks/testimonials'
import aboutSection from './blocks/aboutSection'
import ctaSection from './blocks/ctaSection'
import textImageBlock from './blocks/textImageBlock'
import statsSection from './blocks/statsSection'
import ourStory from './blocks/ourStory'
import ourValues from './blocks/ourValues'
import meetOurTeam from './blocks/meetOurTeam'
import pageHero from './blocks/pageHero'

export const schemaTypes = [
  // Documents
  siteSettings,
  service,
  project,
  post,
  teamMember,
  testimonial,
  homepage,
  about,
  
  // Page Builder Blocks
  hero,
  servicesOverview,
  featuredProjects,
  testimonials,
  aboutSection,
  ourStory,
  ourValues,
  meetOurTeam,
  pageHero,
  ctaSection,
  textImageBlock,
  statsSection,
]
