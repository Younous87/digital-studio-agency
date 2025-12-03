import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import SplashCursor from "@/components/SplashCursor";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

// Helper function to convert font name to Google Fonts URL format
function getFontUrl(fontName: string): string {
  const formatted = fontName.replaceAll(' ', '+');
  return formatted;
}

// Generate Google Fonts URL for multiple fonts
function generateGoogleFontsUrl(fonts: string[]): string {
  const uniqueFonts = [...new Set(fonts.filter(Boolean))];
  if (uniqueFonts.length === 0) return '';
  
  const fontParams = uniqueFonts.map(font => {
    const formatted = getFontUrl(font);
    // Include common weights for flexibility
    return `family=${formatted}:wght@300;400;500;600;700;800;900`;
  }).join('&');
  
  return `https://fonts.googleapis.com/css2?${fontParams}&display=swap`;
}

export const metadata: Metadata = {
  title: "Digital Studio - Creative Agency",
  description: "We create exceptional digital experiences for forward-thinking brands",
};

interface Typography {
  headingFont?: string;
  bodyFont?: string;
  accentFont?: string;
}

interface SiteSettings {
  title?: string;
  logo?: {
    light?: unknown;
    dark?: unknown;
  };
  navigation?: Array<{
    label: string;
    url: string;
    children?: Array<{ label: string; url: string }>;
  }>;
  footer?: {
    text?: string;
    copyright?: string;
    links?: Array<{ label: string; url: string }>;
  };
  socialMedia?: Array<{ platform: string; url: string }>;
  typography?: Typography;
}

async function getSiteSettings(): Promise<SiteSettings | null> {
  try {
    // In development, don't cache to see changes immediately
    // In production, revalidate every hour
    const settings = await client.fetch(
      siteSettingsQuery,
      {},
      {
        next: {
          revalidate: process.env.NODE_ENV === 'production' ? 3600 : 0
        }
      }
    );
    return settings;
  } catch (error) {
    console.error('Error fetching site settings:', error);
    return null;
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const settings = await getSiteSettings();
  
  // Get typography settings with fallbacks
  const headingFont = settings?.typography?.headingFont || 'Inter';
  const bodyFont = settings?.typography?.bodyFont || 'Inter';
  const accentFont = settings?.typography?.accentFont || '';
  
  // Generate Google Fonts URL
  const fontsToLoad = [headingFont, bodyFont, accentFont].filter(Boolean);
  const googleFontsUrl = generateGoogleFontsUrl(fontsToLoad);

  return (
    <html lang="en">
      <head>
        {/* Preconnect to Google Fonts for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Load Google Fonts dynamically based on Sanity settings */}
        {googleFontsUrl && <link href={googleFontsUrl} rel="stylesheet" />}
        {/* Set CSS custom properties for fonts */}
        <style dangerouslySetInnerHTML={{
          __html: `
            :root {
              --font-heading: "${headingFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
              --font-body: "${bodyFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
              --font-accent: "${accentFont || bodyFont}", -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", sans-serif;
            }
          `
        }} />
      </head>
      <body className="font-sans antialiased bg-background text-foreground" suppressHydrationWarning={true}>
        <SplashCursor />
        <Header
          logo={settings?.logo}
          navigation={settings?.navigation || []}
        />
        <main className="pt-20">{children}</main>
        <Footer
          companyName={settings?.title}
          footerText={settings?.footer?.text}
          copyright={settings?.footer?.copyright}
          links={settings?.footer?.links || []}
          socialMedia={settings?.socialMedia || []}
        />
      </body>
    </html>
  );
}
