'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { Menu, ChevronDown, Sparkles, Phone } from 'lucide-react'
import Container from '../ui/Container'
import { Button } from '../ui/Button'
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '../ui/navigation-menu'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet'
import { Separator } from '../ui/separator'

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-sm ${
        isScrolled 
          ? 'bg-white/95 shadow-lg border-b border-gray-100' 
          : 'bg-white/80'
      }`}
    >
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            {logo?.light ? (
              <Image
                src={urlFor(logo.dark).width(150).url()}
                alt="Logo"
                width={150}
                height={50}
                className="h-10 w-auto transition-transform group-hover:scale-105"
              />
            ) : (
                <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-linear-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <span className="text-2xl font-bold text-gray-900">
                  Digital Studio
                </span>
              </div>
            )}
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            <NavigationMenu>
              <NavigationMenuList>
                {navigation.map((item) => (
                  <NavigationMenuItem key={item.label}>
                    {item.children && item.children.length > 0 ? (
                      <>
                        <NavigationMenuTrigger className="bg-transparent hover:bg-brand-primary/10 data-[state=open]:bg-brand-primary/10 data-[state=open]:text-brand-primary">
                          {item.label}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                            {item.children.map((child) => (
                              <ListItem
                                key={child.label}
                                title={child.label}
                                href={child.url}
                              >
                                {child.description || `Learn more about ${child.label.toLowerCase()}`}
                              </ListItem>
                            ))}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <NavigationMenuLink asChild>
                        <Link href={item.url} className={navigationMenuTriggerStyle() + " bg-transparent hover:bg-brand-primary/10 hover:text-brand-primary"}>
                          {item.label}
                        </Link>
                      </NavigationMenuLink>
                    )}
                  </NavigationMenuItem>
                ))}
              </NavigationMenuList>
            </NavigationMenu>

          
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <SheetHeader>
                  <SheetTitle className="text-left flex items-center gap-2">
                    <div className="w-8 h-8 bg-linear-to-br from-brand-primary to-brand-secondary rounded-lg flex items-center justify-center shadow-lg">
                      <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    Menu
                  </SheetTitle>
                  <SheetDescription className="text-left">
                    Navigate through our services and pages
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-8 flex flex-col gap-4">
                  {navigation.map((item) => (
                    <div key={item.label}>
                      {item.children && item.children.length > 0 ? (
                        <div className="space-y-2">
                          <div className="font-semibold text-lg flex items-center gap-2 text-gray-900">
                            <ChevronDown className="w-4 h-4" />
                            {item.label}
                          </div>
                          <div className="pl-6 space-y-2">
                            {item.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.url}
                                className="block text-sm text-gray-600 hover:text-brand-primary transition-colors py-1"
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
                          className="block font-semibold text-lg text-gray-900 hover:text-brand-primary transition-colors"
                          onClick={() => setIsMobileMenuOpen(false)}
                        >
                          {item.label}
                        </Link>
                      )}
                      <Separator className="mt-4" />
                    </div>
                  ))}
                
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </Container>
    </header>
  )
}

function ListItem({
  title,
  children,
  href,
}: Readonly<{
  title: string
  children: React.ReactNode
  href: string
}>) {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-primary/5 hover:text-brand-primary focus:bg-brand-primary/10 focus:text-brand-primary"
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  )
}
