import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/global/Header";
import Footer from "@/components/global/Footer";
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
    const settings = await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 3600 } });
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
      <body className={`${inter.variable} font-sans antialiased`} suppressHydrationWarning={true}>
        <Header 
          logo={settings?.logo} 
          navigation={settings?.navigation || []} 
        />
        <main className="pt-20">{children}</main>
        <Footer
          footerText={settings?.footer?.text}
          copyright={settings?.footer?.copyright}
          links={settings?.footer?.links || []}
          socialMedia={settings?.socialMedia || []}
        />
      </body>
    </html>
  );
}
