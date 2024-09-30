import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export const metadata: Metadata = {
  title: "Engineering Hub",
  description: "Software engineering blog and portfolio",
  icons: {
    icon: [
      { rel: 'icon', type: 'image/png', sizes: '32x32', url: '/images/favicon-32x32.png' },
      { rel: 'icon', type: 'image/png', sizes: '16x16', url: '/images/favicon-16x16.png' },
    ],
    apple: '/images/apple-touch-icon.png',
  },
  applicationName: 'MyApp',
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
      <body
      // className={`${inter.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
