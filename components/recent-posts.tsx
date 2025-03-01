import { getAllPosts } from "@/lib/posts";
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardFooter } from "./ui/card";
import Link from "next/link";

export const RecentPosts = () => {
    const posts = getAllPosts();

    return (
        <section className="py-16 bg-gray-100 dark:bg-gray-800">
            <div className="container mx-auto px-6">
                <h2 className="text-4xl font-extrabold text-center text-gray-900 dark:text-gray-100 mb-12">
                    Latest Posts
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} passHref>
                            <Card className="flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 rounded-lg cursor-pointer">
                                <Image
                                    src={post.image ? `/images/${post.slug}/${post.image}` : "/images/dotnet-logo.svg"}
                                    alt={post.title}
                                    width={500}
                                    height={200}
                                    className="object-cover w-full h-48"
                                />
                                <CardHeader className="p-4">
                                    <CardTitle className="text-xl font-semibold text-gray-800 dark:text-gray-200  hover:text-primary-600 transition-all duration-200">
                                        {post.title}
                                    </CardTitle>
                                </CardHeader>
                                <CardFooter className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-700">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        {post.date} · {post.readTime}
                                    </div>
                                    <Button
                                        variant="ghost"
                                        className="text-primary-600 hover:bg-primary-200 dark:hover:bg-primary-600 transition-colors duration-200"
                                        asChild
                                    >
                                        <span className="flex items-center">
                                            <span>Read More</span>
                                            <ArrowRight className="ml-2 h-5 w-5" />
                                        </span>
                                    </Button>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
