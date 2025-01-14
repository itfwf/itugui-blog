
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { RecentPosts } from '@/components/recent-posts';

export default async function Home() {

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <HeroSection />
        <RecentPosts />
      </div>
    </main>
  );
}

const HeroSection = () => (
  <section className="py-8 text-center">
    <div className="container mx-auto space-y-8">
      <h1 className="text-5xl font-bold ">
        <span className='bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400 leading-none'>Hi, There</span> <span className='text-'>👌</span>
      </h1>
      <Button asChild size="lg" className="text-lg">
        <Link href="/about">Learn More About Me</Link>
      </Button>
    </div>
  </section>
)


