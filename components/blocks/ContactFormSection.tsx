'use client'

import { useState } from 'react'
import Section from '@/components/ui/Section'
import Button from '@/components/ui/Button'
import { Input } from '@/components/retroui/Input'
import { Textarea } from '@/components/retroui/Textarea'
import { Mail, Phone, MapPin } from 'lucide-react'

interface ContactFormBlock {
  title?: string
  description?: string
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
}

interface ContactFormSectionProps {
  block: ContactFormBlock
}

export default function ContactFormSection({ block }: Readonly<ContactFormSectionProps>) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  })
  const [status, setStatus] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')

    // Here you would integrate with your email service (e.g., SendGrid, Resend, etc.)
    // For now, we'll just simulate a submission
    setTimeout(() => {
      setStatus('success')
      setFormData({ name: '', email: '', company: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 1000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <Section>
      <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        {/* Contact Info */}
        <div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 retro-text-shadow">
            {block.title || 'Get in Touch'}
          </h2>
          <p className="text-lg text-gray-700 mb-10 font-bold">
            {block.description || 'Fill out the form and we\'ll be in touch as soon as possible. Or reach out to us directly through the contact information below.'}
          </p>

          <div className="space-y-6">
            {block.contactInfo?.email && (
              <div className="bg-white border-4 border-black shadow-brutal p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--brand-primary)] border-3 border-black p-3 -rotate-6">
                    <Mail className="w-6 h-6 text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">Email</h3>
                    <a href={`mailto:${block.contactInfo.email}`} className="text-[var(--brand-primary)] hover:underline font-bold">
                      {block.contactInfo.email}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {block.contactInfo?.phone && (
              <div className="bg-white border-4 border-black shadow-brutal p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--brand-accent)] border-3 border-black p-3 rotate-6">
                    <Phone className="w-6 h-6 text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">Phone</h3>
                    <a href={`tel:${block.contactInfo.phone}`} className="text-[var(--brand-primary)] hover:underline font-bold">
                      {block.contactInfo.phone}
                    </a>
                  </div>
                </div>
              </div>
            )}

            {block.contactInfo?.address && (
              <div className="bg-white border-4 border-black shadow-brutal p-6">
                <div className="flex items-start gap-4">
                  <div className="bg-[var(--brand-secondary)] border-3 border-black p-3 -rotate-3">
                    <MapPin className="w-6 h-6 text-black" strokeWidth={3} />
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-gray-900 mb-2">Address</h3>
                    <p className="text-gray-700 whitespace-pre-line font-medium">
                      {block.contactInfo.address}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-[var(--brand-secondary)] border-4 border-black shadow-brutal-lg p-8">
          {block.formTitle && (
            <h3 className="text-2xl font-black text-gray-900 mb-2">
              {block.formTitle}
            </h3>
          )}
          {block.formDescription && (
            <p className="text-gray-900 mb-6 font-bold">
              {block.formDescription}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-black text-gray-900 mb-2">
                NAME *
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your name"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-black text-gray-900 mb-2">
                EMAIL *
              </label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your@email.com"
              />
            </div>

            <div>
              <label htmlFor="company" className="block text-sm font-black text-gray-900 mb-2">
                COMPANY
              </label>
              <Input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Your company name"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-black text-gray-900 mb-2">
                MESSAGE *
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={6}
                placeholder="Tell us about your project..."
              />
            </div>

            <Button
              type="submit"
              variant="default"
              className="w-full"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'SENDING...' : (block.submitButtonText || 'SEND MESSAGE')}
            </Button>

            {status === 'success' && (
              <div className="bg-white border-4 border-black shadow-brutal px-6 py-4">
                <p className="font-black text-black">✓ Thank you! We'll get back to you soon.</p>
              </div>
            )}
          </form>
        </div>
      </div>
    </Section>
  )
}