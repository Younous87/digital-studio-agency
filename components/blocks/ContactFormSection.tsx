'use client'

import { useState } from 'react'
import { Button } from '@/components/retroui/Button'
import { Input } from '@/components/retroui/Input'
import { Textarea } from '@/components/retroui/Textarea'
import { Select } from '@/components/retroui/Select'
import { Label } from '@/components/retroui/Label'
import { Alert } from '@/components/retroui/Alert'
import { Card } from '@/components/retroui/Card'
import { Facebook, Twitter, Dribbble, Github, Linkedin, Rocket } from 'lucide-react'

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
    projectType: '',
    budget: '',
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
      setFormData({ name: '', email: '', projectType: '', budget: '', message: '' })
      setTimeout(() => setStatus(''), 3000)
    }, 1000)
  }

  return (
    <div className="py-16 px-4 bg-background">
      <div className="max-w-5xl max-xl:px-4 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="font-head text-3xl lg:text-4xl font-semibold mb-4">
                {block.title || "LET'S<br>COLLABORATE"}
              </h2>
              <p className="font-sans text-base text-muted-foreground">
                {block.description || "Ready to build something extraordinary? Let's turn your wildest ideas into digital reality!"}
              </p>
            </div>
            <div>
              <h4 className="font-head text-xl font-normal mb-2">EMAIL ME AT</h4>
              <a href={`mailto:${block.contactInfo?.email || 'arif@retroui.dev'}`} className="text-lg">
                {block.contactInfo?.email || 'arif@retroui.dev'}
              </a>
            </div>
            <div>
              <h4 className="font-head text-xl font-normal mb-2">FOLLOW ME AT</h4>
              <div className="flex gap-4">
                <Button asChild variant="secondary" size="icon" className="rounded-full h-12 w-12">
                  <a href="#">
                    <Facebook className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="icon" className="rounded-full h-12 w-12">
                  <a href="#">
                    <Twitter className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="icon" className="rounded-full h-12 w-12">
                  <a href="#">
                    <Dribbble className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="icon" className="rounded-full h-12 w-12">
                  <a href="#">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button asChild variant="secondary" size="icon" className="rounded-full h-12 w-12">
                  <a href="#">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
          <div>
            <Card variant="retro" className="p-6 md:p-8 w-full">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="name">Your Name</Label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter Name"
                      required
                    />
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter Email"
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>Project Type</Label>
                  <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="Project type" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="web-design">Web Design</Select.Item>
                        <Select.Item value="mobile-app">Mobile App</Select.Item>
                        <Select.Item value="branding">Branding</Select.Item>
                        <Select.Item value="consulting">Consulting</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <Label>Budget</Label>
                  <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                    <Select.Trigger className="w-full">
                      <Select.Value placeholder="$5k-$10K" />
                    </Select.Trigger>
                    <Select.Content>
                      <Select.Group>
                        <Select.Item value="5k-10k">$5k - $10k</Select.Item>
                        <Select.Item value="10k-25k">$10k - $25k</Select.Item>
                        <Select.Item value="25k-50k">$25k - $50k</Select.Item>
                        <Select.Item value="50k+">$50k+</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select>
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="message">Project Details</Label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Project details, context or how can i help you"
                    rows={4}
                    required
                  />
                </div>
                <Button variant="secondary" type="submit" disabled={status === 'sending'} className="flex items-center w-full justify-center">
                  {status === 'sending' ? 'SENDING...' : 'LAUNCH PROJECT'}
                  <Rocket className="ml-2 size-5" />
                </Button>
              </form>
            </Card>
            {status === 'success' && (
              <Alert className="bg-white border-4 border-black shadow-md mt-6">
                <Alert.Title className="font-black text-black">✓ Thank you! We'll get back to you soon.</Alert.Title>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}