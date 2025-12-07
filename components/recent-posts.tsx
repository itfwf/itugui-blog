import { getAllPosts, Post } from "@/lib/posts"; // Assuming getAllPosts returns Post[] and Post type is defined
import { ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "./ui/card"; // Added CardDescription
import Link from "next/link";

// Define a type for your post, if not already done in @/lib/posts
// export interface Post {
//   slug: string;
//   title: string;
//   date: string;
//   readTime?: string; // Optional
//   image?: string;    // Optional
//   excerpt?: string;  // Optional: Short summary of the post
// }

export const RecentPosts = () => {
    const allPosts = getAllPosts();
    const postsToShow = allPosts.slice(0, 10);

    return (
        <section className="py-16 bg-white dark:bg-gray-950">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-10 md:mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4 sm:mb-0">
                        Latest posts
                    </h2>
                    <Button asChild variant="outline" className="dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800">
                        <Link href="/blog" className="flex items-center">
                            All Posts <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {postsToShow.map((post) => (
                        <Link href={`/blog/${post.slug}`} key={post.slug} passHref legacyBehavior={false}>
                            <Card className="flex flex-col overflow-hidden transition-all duration-300 ease-in-out hover:shadow-xl dark:hover:shadow-2xl hover:-translate-y-1.5 rounded-lg cursor-pointer bg-white dark:bg-gray-800/50 group h-full">
                                <div className="relative w-full h-48 sm:h-52">
                                    <Image
                                        src={post.image ? `/images/${post.slug}/${post.image}` : "/abc.svg"}
                                        alt={post.title}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>
                                <CardHeader className="p-5 sm:p-6 grow">
                                    <CardTitle className="text-xl lg:text-2xl font-semibold text-gray-800 dark:text-gray-100 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors duration-200">
                                        {post.title}
                                    </CardTitle>
                                    <CardDescription className="mt-2 text-sm text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-3">
                                        {post.excerpt}
                                    </CardDescription>
                                </CardHeader>
                                <CardFooter className="p-5 sm:p-6 mt-auto bg-gray-50 dark:bg-gray-800"> {/* mt-auto pushes footer down */}
                                    <div className="flex justify-between items-center w-full">
                                        <div className="text-xs text-gray-500 dark:text-gray-400">
                                            <span>{post.date}</span>
                                            {post.readTime && <span> &middot; {post.readTime}</span>}
                                        </div>
                                        <div className="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 group-hover:underline">
                                            Read More
                                            <ArrowRight className="ml-1.5 h-4 w-4" />
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};