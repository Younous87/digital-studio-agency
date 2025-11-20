import { client } from '@/lib/sanity/client'
import { contactPageQuery } from '@/lib/sanity/queries'
import ContactFormSection from '@/components/blocks/ContactFormSection'
import PageHeroBlock from '@/components/blocks/PageHeroBlock'

interface ContactPageData {
  title: string
  subtitle: string
  pageBuilder: Array<{
    _type: string
    _key: string
    title?: string
    subtitle?: string
    description?: string
    cta?: {
      text: string
      link: string
    }
    background?: {
      type: 'color' | 'image' | 'video'
      color?: string
      image?: unknown
      video?: unknown
    }
    contactInfo?: {
      email?: string
      phone?: string
      address?: string
      socialLinks?: Array<{
        platform: string
        url: string
      }>
    }
    formTitle?: string
    formDescription?: string
    submitButtonText?: string
  }>
}

async function getContactPageData(): Promise<ContactPageData | null> {
  try {
    const data = await client.fetch(contactPageQuery)
    return data
  } catch (error) {
    console.error('Error fetching contact page data:', error)
    return null
  }
}

export default async function ContactPage() {
  const contactData = await getContactPageData()

  // Fallback data if Sanity data is not available
  const fallbackData: ContactPageData = {
    title: "Let's Work Together",
    subtitle: "Have a project in mind? We'd love to hear about it. Get in touch and let's discuss how we can help bring your vision to life.",
    pageBuilder: [
      {
        _type: 'pageHero',
        _key: 'hero1',
        title: "Let's Work Together",
        subtitle: "Have a project in mind? We'd love to hear about it. Get in touch and let's discuss how we can help bring your vision to life.",
        background: { type: 'color', color: '#1f2937' }
      },
      {
        _type: 'contactForm',
        _key: 'form1',
        title: 'Get in Touch',
        description: 'Fill out the form and we\'ll be in touch as soon as possible. Or reach out to us directly through the contact information below.',
        contactInfo: {
          email: 'hello@digitalstudio.com',
          phone: '+1 (555) 123-4567',
          address: '123 Digital Street\nTech City, TC 12345\nUnited States',
          socialLinks: [
            { platform: 'linkedin', url: '#' },
            { platform: 'twitter', url: '#' },
            { platform: 'instagram', url: '#' }
          ]
        },
        formTitle: 'Send us a message',
        formDescription: 'Tell us about your project and we\'ll get back to you.',
        submitButtonText: 'Send Message'
      }
    ]
  }

  const data = contactData || fallbackData

  return (
    <>
      {/* Hero Section */}
      {data.pageBuilder?.map((block, index) => {
        if (block._type === 'pageHero') {
          return (
            <PageHeroBlock
              key={block._key || index}
              title={block.title || data.title}
              subtitle={block.subtitle || data.subtitle}
              cta={block.cta}
              background={block.background || { type: 'color' as const, color: '#f3f4f6' }}
            />
          )
        }
        return null
      })}

      {/* Contact Form Section */}
      {data.pageBuilder?.map((block, index) => {
        if (block._type === 'contactForm') {
          return (
            <ContactFormSection
              key={block._key || index}
              block={block}
            />
          )
        }
        return null
      })}
    </>
  )
}
