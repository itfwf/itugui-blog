import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

export const metadata: Metadata = {
  title: ".NET, React, and Cloud Development Dev Blog",
  description: "Follow my journey as a .NET developer tackling React and Cloud challenges. Discover tips, tricks, and real-world solutions for modern software engineering and web development.",
  keywords: ['.NET', 'React', 'AWS', 'developer blog', 'cloud computing', 'web development', 'coding challenges', 'serverless', 'software engineering'],
  openGraph: {
    title: 'Dev Hub - .NET, React, and AWS Development Blog',
    description: 'Follow my journey as a .NET developer tackling React and AWS challenges. Discover tips, tricks, and real-world solutions for modern software engineering and web development.',
    url: 'https://itugui.com',
    type: 'website',
    siteName: 'Dev Blog',
    locale: 'en_US',
  },

  twitter: {
    card: 'summary',
    title: '.NET, React, and AWS Development Dev Blog',
    description: 'Follow my journey as a .NET developer tackling React and AWS challenges. Discover tips, tricks, and real-world solutions for modern software engineering and web development.',
    site: '@itugui',
  },
  icons: {
    icon: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/images/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/images/favicon-16x16.png' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  authors: [{ name: '@itugui', url: 'https://itugui.com' }],
  applicationName: 'Dev Blog',
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: 'https://.itugui.com',
  },
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
    <html lang="en">
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
