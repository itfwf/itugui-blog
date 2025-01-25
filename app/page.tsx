
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
          Welcome to My Corner of the Web
        </span>{" "}
        <span className="inline-block">👌</span>
      </h1>

      <div className="max-w-prose mx-auto space-y-6 text-gray-700">
        <p className="text-lg leading-relaxed">
          This blog is a space where I document what I usually do, both in life
          and in code. You’ll find thoughts, workflows, and projects that keep me
          busy. Whether {"it's"} experimenting with new ideas, building things, or
          exploring the little details of my day-to-day, this is where I jot it
          all down.
        </p>
        <p className="text-lg leading-relaxed">
          I also include code snippets—sometimes for you, sometimes just for
          future me. These snippets could be quick fixes, mini projects, or tools
          that solve specific problems. Whether you're looking for something
          useful or just curious about how my brain works, feel free to dig in!
        </p>
      </div>

      <div>
        <Button asChild size="lg" className="text-lg px-6 py-3 rounded-lg shadow-md bg-blue-600 text-white hover:bg-blue-700">
          <Link href="/about">Learn More About Me</Link>
        </Button>
      </div>
    </div>
  </section>

)


