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
        <article className="prose dark:prose-invert">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1({ children, }) {
                        return <h1 className="mt-10 mb-4 text-3xl font-bold" id={stringToHtmlId(children as string)} >{children}</h1>
                    },
                    h2({ children, }) {
                        return <h2 className="mt-8 mb-3 text-2xl font-semibold" id={stringToHtmlId(children as string)} >{children}</h2>
                    },
                    h3({ children }) {
                        return <h3 className="mt-6 mb-2 text-xl font-medium" id={stringToHtmlId(children as string)} >{children}</h3>
                    },
                    p: ({ children }) => <p className="">{children}</p>,
                    ul: ({ children }) => <ul className="list-disc pl-5 mb-4">{children}</ul>,
                    ol: ({ children }) => <ol className="list-decimal pl-5 mb-4">{children}</ol>,
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
                            <code className={cn('bg-gray-200 dark:bg-gray-700 px-1 py-0.5 rounded', className)} {...props}>
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

