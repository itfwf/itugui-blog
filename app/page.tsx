
import { HomePageComponent } from '@/components/home-page';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { getRecentPosts, PostPreview } from '@/lib/posts';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default async function Home() {

  const posts = getRecentPosts();
  
  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <HeroSection />
        <HomePageComponent />
        <RecentPosts posts={posts} />
      </div>
    </main>
  );
}

const HeroSection = () => (
  <section className="py-20 text-center">
    <div className="container mx-auto px-4">
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-teal-400">
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


const RecentPosts = ({ posts }: { posts: PostPreview[] }) => (


  <section className="py-16 bg-gray-50 dark:bg-gray-900">
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-12 text-center">Recent Blog Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {posts.map((post) => (
          <Card key={post.slug} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="relative">
              <img
                src={post.image}
                alt={post.title}
                className="object-cover w-full h-[150px]"
              />
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold line-clamp-2">{post.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow py-2">
              <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
            </CardContent>
            <CardFooter className="flex justify-between items-center pt-0">
              <div className="text-sm text-muted-foreground">
                {post.date} · {post.readTime}
              </div>
              <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary" asChild>
                <Link href={`/posts/${post.slug}`}>
                  Read more
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      <div className="text-center">
        <Button asChild className="px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105">
          <Link href="/blog" className="flex items-center">
            See all posts
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </div>
  </section>
)