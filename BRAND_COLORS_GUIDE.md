# Brand Colors Integration Guide

## 🎨 Overview

Your website now uses dynamic brand colors from Sanity CMS throughout all components for a consistent, professional appearance. The colors are automatically injected from your Sanity site settings and applied using CSS custom properties.

## 🔧 How It Works

### 1. CSS Custom Properties (`globals.css`)
```css
:root {
  --brand-primary: #3b82f6;    /* Blue - main brand color */
  --brand-secondary: #8b5cf6;  /* Purple - secondary accent */
  --brand-accent: #06b6d4;     /* Cyan - highlights */
}
```

These default values are overridden dynamically from Sanity settings.

### 2. Dynamic Injection (`layout.tsx`)
Brand colors from Sanity are injected as inline styles:
```typescript
const brandColors = {
  primary: settings?.brandColors?.primary?.hex || '#3b82f6',
  secondary: settings?.brandColors?.secondary?.hex || '#8b5cf6',
  accent: settings?.brandColors?.accent?.hex || '#06b6d4',
};
```

### 3. Utility Classes Available
- Text colors: `text-brand-primary`, `text-brand-secondary`, `text-brand-accent`
- Backgrounds: `bg-brand-primary`, `bg-brand-secondary`, `bg-brand-accent`
- Borders: `border-brand-primary`
- Gradients: `from-brand-primary`, `to-brand-secondary`, `via-brand-accent`
- Hover states: `hover:text-brand-primary`, `hover:bg-brand-primary`

## 🎯 Where Brand Colors Are Used

### Header Navigation
- **Logo gradient**: Primary → Secondary gradient background
- **Navigation hover**: Primary color with 10% opacity background
- **Active states**: Primary color text
- **Mobile menu**: Primary/Secondary gradient icon background

### Footer
- **Background**: Dark gradient with subtle brand color overlays (Primary/5% and Secondary/5%)
- **Social icons**: Hover to Primary color with scale animation
- **Links**: Hover to Primary color

### Service Cards (`ServicesGrid.tsx`)
- **Badge text**: Primary color
- **Title hover**: Primary color
- **"Learn more" links**: Primary color with underline on hover

### Project Cards (`ProjectGrid.tsx`)
- **Category badges**: Accent color backgrounds
- **Quick view button**: Primary color
- **Interactive elements**: Primary/Secondary gradients

### Testimonial Carousel (`TestimonialCarousel.tsx`)
- **Quote icons**: Accent color
- **Background quotes**: Secondary color at 20% opacity
- **Avatar fallbacks**: Primary → Secondary gradient or Primary/Secondary light backgrounds
- **Avatar rings**: Primary color at 20% opacity
- **Card backgrounds**: Subtle Primary color tints

### Animated Stats (`AnimatedStats.tsx`)
- **Card backgrounds**: White → Primary gradient with hover effects
- **Card hover**: Primary → Secondary gradient
- **Icons**: Accent color
- **Icon badges**: Accent color borders and backgrounds

### Hero Block (`HeroBlock.tsx`)
- **Rotating badges**: Uses brand colors for feature highlights
- **Gradient text**: Primary → Secondary gradients
- **CTA buttons**: Primary color backgrounds

## 📝 Setting Your Brand Colors in Sanity

1. Open Sanity Studio at `/studio`
2. Navigate to **Site Settings**
3. Find the **Brand Colors** section
4. Set your colors:
   - **Primary Color**: Your main brand color (buttons, links, accents)
   - **Secondary Color**: Supporting color (gradients, secondary accents)
   - **Accent Color**: Highlight color (badges, icons, special elements)
5. **Publish** your changes
6. Refresh your website - colors update instantly in development!

## 🎨 Color Usage Guidelines

### Primary Color
Use for:
- Main CTAs and buttons
- Navigation active states
- Primary headings and important text
- Links and interactive elements

### Secondary Color
Use for:
- Gradient combinations with primary
- Secondary UI elements
- Background accents
- Supporting visual elements

### Accent Color
Use for:
- Badges and labels
- Icons
- Highlights and callouts
- Special attention elements

## 🔄 Cache Behavior

- **Development**: No caching - changes appear immediately
- **Production**: 1-hour cache for optimal performance

## 💡 Tips for Professional Color Usage

1. **Contrast**: Ensure sufficient contrast between text and backgrounds
2. **Consistency**: Use the same color for similar elements across pages
3. **Gradients**: Use Primary → Secondary for premium feel
4. **Opacity**: Use `/5`, `/10`, `/20` for subtle backgrounds
5. **Hover states**: Slightly lighter or darker variants for interactivity

## 🚀 Benefits

✅ **Consistent branding** across entire website
✅ **Easy updates** - change once in Sanity, updates everywhere
✅ **Professional appearance** with cohesive color scheme
✅ **Accessible** - proper contrast ratios maintained
✅ **Performance** - CSS variables are highly performant
✅ **Flexible** - Easy to add new color utilities as needed

## 📚 Examples

### Adding a New Component with Brand Colors

```tsx
// Use utility classes
<div className="bg-brand-primary text-white hover:bg-brand-secondary">
  Click me
</div>

// Use in gradients
<div className="bg-linear-to-r from-brand-primary to-brand-secondary">
  Gradient background
</div>

// Use with opacity
<Badge className="bg-brand-accent/10 text-brand-accent border-brand-accent/30">
  Accent Badge
</Badge>
```

---

**Last Updated**: November 13, 2025  
**Version**: 1.0
