'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Menu, ChevronDown, Sparkles, X } from 'lucide-react'
import Container from '../ui/Container'
import { Button } from '../retroui/Button'

interface NavigationItem {
  label: string
  url: string
  children?: { label: string; url: string; description?: string }[]
}

interface HeaderProps {
  logo?: any
  navigation?: NavigationItem[]
}

export default function Header({ logo, navigation = [] }: Readonly<HeaderProps>) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${isScrolled
          ? 'bg-background border-b-4 border-black shadow-md'
          : 'bg-background/95 border-b-2 border-black'
        }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo - Retro Style */}
          <Link href="/" className="flex items-center space-x-3 group hover-lift">
            {logo?.light ? (
              <div className="relative border-2 border-black rounded-lg overflow-hidden shadow">
                <Image
                  src={urlFor(logo.dark).width(100).url()}
                  alt="Logo"
                  width={100}
                  height={100}
                  className="h-12 w-auto"
                />
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-brand-primary border-3 border-black rounded-lg flex items-center justify-center shadow-sm group-hover:shadow-md transition-all group-hover:rotate-6">
                  <Sparkles className="w-7 h-7 text-white" strokeWidth={2.5} />
                </div>
                <span className="text-2xl md:text-3xl font-black text-foreground tracking-tight">
                  Digital<span className="text-brand-primary">Studio</span>
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation - Retro Style */}
          <div className="hidden lg:flex items-center gap-4">
            {navigation.map((item) => (
              <div key={item.label} className="relative group">
                {item.children && item.children.length > 0 ? (
                  <div className="relative">
                    <Button variant="link" className="px-4 py-2 font-bold text-foreground hover:text-brand-primary transition-colors flex items-center gap-1">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-background border-3 border-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.url}
                            className="block p-3 rounded hover:bg-brand-secondary/20 border-2 border-transparent hover:border-black transition-all mb-2 last:mb-0"
                          >
                            <div className="font-bold text-foreground">{child.label}</div>
                            {child.description && (
                              <div className="text-sm text-muted-foreground mt-1">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.url}
                    className="px-4 py-2 font-bold text-foreground hover:text-brand-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <Button
              variant="default"
              size="md"
              asChild
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden border-3 border-black rounded-lg bg-brand-secondary hover:bg-brand-primary transition-colors shadow-sm hover-press"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" strokeWidth={3} />
            ) : (
              <Menu className="w-6 h-6" strokeWidth={3} />
            )}
          </Button>
        </nav>

        {/* Mobile Menu - Retro Style */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-background border-b-4 border-black shadow-xl animate-slide-in-top">
            <div className="p-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.label} className="space-y-2">
                  {item.children && item.children.length > 0 ? (
                    <div>
                      <div className="font-black text-lg flex items-center gap-2 text-foreground mb-3 pb-2 border-b-3 border-black">
                        <ChevronDown className="w-5 h-5 text-brand-primary" />
                        {item.label}
                      </div>
                      <div className="pl-4 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.url}
                            className="block p-3 bg-muted rounded-lg border-2 border-black hover:bg-brand-secondary/30 hover:shadow-sm transition-all font-bold"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.url}
                      className="block p-4 bg-muted rounded-lg border-3 border-black hover:bg-brand-primary hover:text-white font-black text-lg transition-all shadow-sm hover-lift"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}

              <Button
                variant="default"
                size="lg"
                className="w-full"
                asChild
              >
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>
                  Get Started
                </Link>
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
