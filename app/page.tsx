
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
  <section className="py-12 px-4 bg-gray-50 text-center">
    <div className="container mx-auto space-y-10">
      <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
          Hi, Welcome
        </span>{" "}
        <span className="inline-block">👌</span>
      </h1>

      <Button asChild size="lg" className="text-lg px-6 py-3 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700">
        <Link href="/about">Learn More About Me</Link>
      </Button>
    </div>
  </section>

)


