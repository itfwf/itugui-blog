import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { Space_Mono } from 'next/font/google'
const font = Space_Mono({
  subsets: ['latin'],
  weight: "400"
});


export const metadata: Metadata = {
  title: ".NET, React, and Cloud Development Dev Blog",
  description: "Follow my journey as a .NET developer tackling React and Cloud challenges. Discover tips, tricks, and real-world solutions for modern software engineering and web development.",
  keywords: ['.NET', 'React', 'AWS', 'developer blog', 'cloud computing', 'web development', 'coding challenges', 'serverless', 'software engineering'],
  openGraph: {
    title: 'Dev Hub - .NET, React, and AWS Development Blog',
    description: 'Follow my journey as a .NET developer tackling React and AWS challenges. Discover tips, tricks, and real-world solutions for modern software engineering and web development.',
    url: 'https://itugui.com',
    type: 'website',
    images: ['favicon.svg'],
    siteName: 'Dev Blog',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary',
    title: '.NET, React, and AWS Development Dev Blog',
    images: ['https://itugui.com/favicon.svg'],
    description: 'Follow my journey as a .NET developer tackling React and AWS challenges. Discover tips, tricks, and real-world solutions for modern software engineering and web development.',
    site: '@itugui',
  },
  icons: {
    icon: 'https://itugui.com/logo.svg',
    apple: 'https://itugui.com/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        url: 'https://itugui.com/favicon.ico',
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '96x96',
        url: 'https://itugui.com/favicon-96x96.png',
      },
      {
        rel: 'icon',
        type: 'image/svg+xml',
        url: 'https://itugui.com/favicon.svg',
      },
    ],
  },
  authors: [{ name: '@itugui', url: 'https://itugui.com/about' }],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://itugui.com',
  },
  manifest: "/site.webmanifest"
};
export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={font.className}>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
