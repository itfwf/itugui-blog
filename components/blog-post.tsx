import { Post, stringToHtmlId } from "@/lib/posts"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import Image from 'next/image'

import React from "react";
import { cn } from "@/lib/utils";
type Args = {
    post: Post
}

export function BlogPost(props: Args) {
    const { post } = props;

    return (
        <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert mx-auto py-6">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1({ children, }) {
                        return <h1 id={stringToHtmlId(children as string)} >{children}</h1>
                    },
                    h2({ children, }) {
                        return <h2 id={stringToHtmlId(children as string)} >{children}</h2>
                    },
                    h3({ children }) {
                        return <h3 id={stringToHtmlId(children as string)} >{children}</h3>
                    },
                    code({ inline, className, children, ...props }: any) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={atomDark as any}
                                language={match[1]}
                                PreTag="div"
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={cn('bg-gray-100', className)} {...props}>
                                {String(children).replace(/\n$/, '')}
                            </code>
                        )
                    },
                    img({ src, alt }) {
                        return (
                            <Image
                                src={src!} alt={alt!}
                                width={500}
                                height={0}
                                layout="responsive" objectFit="contain" />
                        );
                    },
                }}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    )
}

