
import { HomePageComponent } from '@/components/home-page';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RecentPosts } from '@/components/recent-posts';

export default async function Home() {


  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <HeroSection />
        <HomePageComponent />
        <RecentPosts />
      </div>
    </main>
  );
}

const HeroSection = () => (
  <section className="py-20 text-center">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 leading-none">
        Welcome to my hub
      </h1>
      <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
        Exploring the cutting edge of IT, one discovery at a time. Join me on a journey through code, innovation, and the future of technology.
      </p>
      <Button asChild size="lg" className="text-lg">
        <Link href="/about">Learn More About Me</Link>
      </Button>
    </div>
  </section>
)


