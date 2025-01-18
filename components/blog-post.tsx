import { Post, stringToHtmlId } from "@/lib/posts"
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import React, { PropsWithChildren } from "react";
import CodeCopyBtn from "./post-copy-code";
type Args = {
    post: Post
}

export function BlogPost(props: Args) {
    const { post } = props;

    const Pre = ({ raw, children }: any) => <pre className="blog-pre">
        <CodeCopyBtn>{children}</CodeCopyBtn>
        {children}
    </pre>

    return (
        <article className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl dark:prose-invert mx-auto py-6">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    // pre: Pre,
                    h1({ children, }) {
                        return <h1 id={stringToHtmlId(children as string)} >{children}</h1>
                    },
                    h2({ children, }) {
                        return <h2 id={stringToHtmlId(children as string)} >{children}</h2>
                    },
                    h3({ children }) {
                        return <h3 id={stringToHtmlId(children as string)} >{children}</h3>
                    },
                    code({ node, inline, className, children, ...props }: any) {
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
                            <code className={className} {...props}>
                                {children}
                            </code>
                        )
                    },
                }}
            >
                {post.content}
            </ReactMarkdown>
        </article>
    )
}

