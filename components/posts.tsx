import { getAllPosts, PostPreview } from "@/lib/posts";
import { ArrowBigRight } from "lucide-react";
const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };

export default function Posts() {
    const allPosts = getAllPosts().sort((a, b) => {

        if (new Date(a.date) <= new Date(b.date)) {
            return 1;
        }
        return -1;
    });

    return (
        <section className="space-y-8">
            {allPosts.map(post => <Article key={post.slug} post={post} />)}
        </section>
    )
}

const Article = ({ post }: { post: PostPreview }) => {

    const link = `/blog/${post.slug}`;
    return (
        <article className="border-b border-black/10 pb-6">
            <h2 className="mb-2 text-3xl font-bold text-teal-500 hover:text-teal-600">
                <a href={link}> {post.title}</a>
            </h2>
            <time className="text-sm" dateTime={post.date}>{new Date(post.date).toLocaleDateString("en-US", options)}</time>
            <p className="my-4 font-thin">{post.excerpt}</p>
            <a className="text-teal-500 hover:text-teal-600 inline-flex items-center font-sans font-thin" href={link}>Read More
                <ArrowBigRight />
            </a>
        </article>
    )
}