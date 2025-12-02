'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Menu, ChevronDown, Sparkles, X } from 'lucide-react'
import Container from '../ui/Container'
import { Button } from '../ui/button'

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
          ? 'bg-background border-b border-border shadow-sm'
          : 'bg-background/95 border-b border-border'
        }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            {logo?.light ? (
              <div className="relative rounded-lg overflow-hidden">
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
                <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center transition-all group-hover:rotate-6">
                  <Sparkles className="w-7 h-7 text-primary-foreground" />
                </div>
                <span className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
                  Digital<span className="text-primary">Studio</span>
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4">
            {navigation.map((item) => (
              <div key={item.label} className="relative group">
                {item.children && item.children.length > 0 ? (
                  <div className="relative">
                    <Button variant="ghost" className="px-4 py-2 font-medium text-foreground hover:text-primary transition-colors flex items-center gap-1">
                      {item.label}
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                    {/* Dropdown */}
                    <div className="absolute top-full left-0 mt-2 w-64 bg-popover border border-border rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.url}
                            className="block p-3 rounded-md hover:bg-accent transition-all mb-1 last:mb-0"
                          >
                            <div className="font-medium text-foreground">{child.label}</div>
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
                    className="px-4 py-2 font-medium text-foreground hover:text-primary transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}

            <Button
              variant="default"
              size="default"
              asChild
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute left-0 right-0 top-full bg-background border-b border-border shadow-lg">
            <div className="p-6 space-y-4">
              {navigation.map((item) => (
                <div key={item.label} className="space-y-2">
                  {item.children && item.children.length > 0 ? (
                    <div>
                      <div className="font-semibold text-lg flex items-center gap-2 text-foreground mb-3 pb-2 border-b border-border">
                        <ChevronDown className="w-5 h-5 text-primary" />
                        {item.label}
                      </div>
                      <div className="pl-4 space-y-2">
                        {item.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.url}
                            className="block p-3 bg-muted rounded-lg hover:bg-accent transition-all font-medium"
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
                      className="block p-4 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground font-semibold text-lg transition-all"
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
