import { getAllPosts, } from "@/lib/posts";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardFooter } from "./ui/card";
import Link from "next/link";

export const RecentPosts = () => {
    const posts = getAllPosts();

    return (
        <section className="py-16 bg-gray-200 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-3xl font-bold mb-12 text-center">Posts</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {posts.map((post) => (
                        <Card key={post.slug} className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                            <Image
                                src={`/images/${post.slug}/${post.image}`}
                                alt={post.title}
                                width={500}
                                height={150}
                                className="object-cover w-auto h-[150px]"
                            />
                            <CardHeader>
                                <Link href={`/blog/${post.slug}`}>
                                    <CardTitle className="text-xl font-bold line-clamp-2">{post.title}</CardTitle>
                                </Link>
                            </CardHeader>
                            <CardFooter className="flex justify-between items-center pt-0">
                                <div className="text-sm text-muted-foreground">
                                    {post.date} · {post.readTime}
                                </div>
                                <Button variant="ghost" className="text-primary hover:text-primary-foreground hover:bg-primary" asChild>
                                    <Link href={`/blog/${post.slug}`}>
                                        Read more
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
                {/* <div className="text-center">
                    <Button asChild className="px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105">
                        <Link href="/blog" className="flex items-center">
                            See all posts
                            <ArrowRight className="ml-2 h-5 w-5" />
                        </Link>
                    </Button>
                </div> */}
            </div>
        </section>
    )
}
