'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Alert, AlertTitle } from '@/components/ui/alert'
import { Card } from '@/components/ui/card'
import { Facebook, Twitter, Dribbble, Github, Linkedin, Rocket } from 'lucide-react'
import BackgroundWrapper from './BackgroundWrapper'

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
  backgroundImage?: any
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
    <BackgroundWrapper backgroundImage={block.backgroundImage}>
      <div className={`py-20 lg:py-32 px-4 lg:px-12 ${block.backgroundImage ? 'bg-transparent' : 'bg-background'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">
            <div className="space-y-10 lg:space-y-12">
              <div>
                <h2 className="font-head text-4xl lg:text-6xl font-semibold mb-6">
                  {block.title || "LET'S<br>COLLABORATE"}
                </h2>
                <p className="font-sans text-lg lg:text-xl text-muted-foreground leading-relaxed">
                  {block.description || "Ready to build something extraordinary? Let's turn your wildest ideas into digital reality!"}
                </p>
              </div>
              <div>
                <h4 className="font-head text-2xl font-normal mb-3">EMAIL ME AT</h4>
                <a href={`mailto:${block.contactInfo?.email || 'arif@retroui.dev'}`} className="text-xl lg:text-2xl hover:text-primary transition-colors">
                  {block.contactInfo?.email || 'arif@retroui.dev'}
                </a>
              </div>
              <div>
                <h4 className="font-head text-2xl font-normal mb-4">FOLLOW ME AT</h4>
                <div className="flex gap-5">
                  <Button asChild variant="secondary" size="icon" className="rounded-full h-14 w-14">
                    <a href="#">
                      <Facebook className="h-6 w-6" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="icon" className="rounded-full h-14 w-14">
                    <a href="#">
                      <Twitter className="h-6 w-6" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="icon" className="rounded-full h-14 w-14">
                    <a href="#">
                      <Dribbble className="h-6 w-6" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="icon" className="rounded-full h-14 w-14">
                    <a href="#">
                      <Github className="h-6 w-6" />
                    </a>
                  </Button>
                  <Button asChild variant="secondary" size="icon" className="rounded-full h-14 w-14">
                    <a href="#">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
            <div>
              <Card className="p-8 md:p-10 lg:p-12 w-full border-2 border-black shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-7">
                  <div className="grid grid-cols-2 gap-6 lg:gap-8">
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="name" className="text-base lg:text-lg">Your Name</Label>
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter Name"
                        required
                        className="py-6 text-base"
                      />
                    </div>
                    <div className="flex flex-col space-y-3">
                      <Label htmlFor="email" className="text-base lg:text-lg">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Enter Email"
                        required
                        className="py-6 text-base"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label className="text-base lg:text-lg">Project Type</Label>
                    <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                      <SelectTrigger className="w-full py-6 text-base">
                        <SelectValue placeholder="Project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="web-design">Web Design</SelectItem>
                          <SelectItem value="mobile-app">Mobile App</SelectItem>
                          <SelectItem value="branding">Branding</SelectItem>
                          <SelectItem value="consulting">Consulting</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label className="text-base lg:text-lg">Budget</Label>
                    <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                      <SelectTrigger className="w-full py-6 text-base">
                        <SelectValue placeholder="$5k-$10K" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="5k-10k">$5k - $10k</SelectItem>
                          <SelectItem value="10k-25k">$10k - $25k</SelectItem>
                          <SelectItem value="25k-50k">$25k - $50k</SelectItem>
                          <SelectItem value="50k+">$50k+</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex flex-col space-y-3">
                    <Label htmlFor="message" className="text-base lg:text-lg">Project Details</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Project details, context or how can i help you"
                      rows={5}
                      required
                      className="text-base"
                    />
                  </div>
                  <Button variant="default" type="submit" disabled={status === 'sending'} className="flex items-center w-full justify-center py-6 text-lg">
                    {status === 'sending' ? 'SENDING...' : 'LAUNCH PROJECT'}
                    <Rocket className="ml-3 size-6" />
                  </Button>
                </form>
              </Card>
              {status === 'success' && (
                <Alert className="bg-white border-2 border-black shadow-md mt-8">
                  <AlertTitle className="font-black text-black text-lg">✓ Thank you! We'll get back to you soon.</AlertTitle>
                </Alert>
              )}
            </div>
          </div>
        </div>
      </div>
    </BackgroundWrapper>
  )
}