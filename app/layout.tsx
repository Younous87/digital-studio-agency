import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
import SplashCursor from "@/components/SplashCursor";
import { client } from "@/lib/sanity/client";
import { siteSettingsQuery } from "@/lib/sanity/queries";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Digital Studio - Creative Agency",
  description: "We create exceptional digital experiences for forward-thinking brands",
};

async function getSiteSettings() {
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

  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning={true}>
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
