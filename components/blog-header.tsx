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
        <header className="mb-8 w-full flex flex-col gap-6 justify-center">
            {post.image && (
                <div className="relative w-full h-64 md:h-96">
                    <Image
                        src={`/images/${post.slug}/${post.image}` || '/images/placeholder.svg'}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                    />
                </div>
            )}
            <div className="w-full mx-auto max-w-5xl">
                <h1 className="text-4xl font-bold text-center">{post.title}</h1>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground ">
                {/* <div className="flex items-center">
                    <UserIcon className="w-4 h-4 mr-2" />
                    <span>{'author'}</span>
                </div> */}
                <div className="flex items-center">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <time dateTime={new Date(post.updatedAt || post.date).toISOString()}>{new Date(new Date(post.updatedAt || post.date)).toLocaleDateString()}</time>
                </div>
                <div className="flex items-center">
                    <ClockIcon className="w-4 h-4 mr-2" />
                    <span>{post.readTime}</span>
                </div>
            </div>
            <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
            </div>
        </header>
    )
}