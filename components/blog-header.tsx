import { Post } from "@/lib/posts"
import { CalendarIcon, ClockIcon } from "lucide-react";
import Image from 'next/image'
import { Badge } from "./ui/badge";
type Args = {
    post: Post
}
export function BlogHeader(props: Args) {
    const { post } = props;

    return (
        <header className="mb-12 w-full flex flex-col gap-6 items-center text-center">
            {post.image && (
                <div className="relative w-full h-60 sm:h-80 md:h-[32rem] overflow-hidden rounded-2xl shadow">
                    <Image
                        src={post.image ? `/images/${post.slug}/${post.image}` : '/images/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover"
                        priority
                    />
                </div>
            )}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-balance max-w-4xl">
                {post.title}
            </h1>
            <div className="flex flex-wrap items-center justify-center gap-4 text-muted-foreground text-sm">
                <div className="flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" />
                    <time dateTime={new Date(post.updatedAt || post.date).toISOString()}>
                        {new Date(post.updatedAt || post.date).toLocaleDateString()}
                    </time>
                </div>
                <div className="flex items-center gap-2">
                    <ClockIcon className="w-4 h-4" />
                    <span>{post.readTime}</span>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 mt-2">
                {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary" className="rounded-full text-sm px-3 py-1">
                        {tag}
                    </Badge>
                ))}
            </div>
        </header>

    )
}