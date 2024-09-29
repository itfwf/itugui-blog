'use client'

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Code, Lightbulb, Newspaper, Terminal } from "lucide-react"

const blogPosts = [];

export function HomePageComponent() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
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

      {/* Featured Topics */}
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What I Write About</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Web Development", description: "Frontend and backend technologies" },
              { icon: Terminal, title: "DevOps", description: "CI/CD, containerization, and cloud services" },
              { icon: Lightbulb, title: "Emerging Tech", description: "AI, blockchain, and IoT innovations" },
              { icon: Newspaper, title: "Tech News", description: "Latest updates in the IT world" },
            ].map((topic, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <topic.icon className="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400" />
                  <CardTitle className="mt-4">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Blog Posts */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Recent Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogPosts.map((post) => (
              <Card key={post.id} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                    <Link href={`/blog/${post.id}`}>
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


    </div>
  )
}