/* eslint-disable @typescript-eslint/no-unused-vars */
import { getPostData } from "@/lib/posts";
import { Metadata, ResolvingMetadata } from "next";
import ReactMarkdown from "react-markdown";

type PostProps = {
    params: { slug: string }

}
export async function generateMetadata(
    { params }: PostProps,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const postData = getPostData(params.slug);
    if (!postData) {
        return {
            title: "404",
        }
    }
    return {
        title: postData.title,
        description: postData.excerpt,
        keywords: postData.tags?.join(', '),
        alternates: {
            canonical: `https://www.itugui.com/posts/${params.slug}`,
        },
        openGraph: {
            title: postData.title,
            description: postData.excerpt,
            url: `https://www.itugui.com/posts/${params.slug}`,
            type: 'article',
            images: [
                {
                    url: `https://www.itugui.com/images/${postData.image}`,
                    alt: postData.title,
                },
            ],
        },

        twitter: {
            card: 'summary_large_image',
            title: postData.title,
            description: postData.excerpt,
            images: [
                {
                    url: `https://www.itugui.com/images/${params.slug}.png`,
                    alt: postData.title,
                },
            ],
        },
        other: {
            publish_date: postData.date,
        }

    };
}


export default async function PostPage({ params }: { params: { slug: string } }) {
    const postData = getPostData(params.slug);
    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: postData.title,
        description: postData.excerpt,
        datePublished: postData.date,
        dateModified: postData.updatedAt || postData.date,
        author: {
            '@type': 'Person',
            name: 'ITugui'
        },
        publisher: {
            '@type': 'Organization',
            name: 'Engineering Hub',
            logo: {
                '@type': 'ImageObject',
                url: 'https://www.itugui.com/images/apple-touch-icon.png',
            },
        },
        image: `https://www.itugui.com/images/${postData.image}`,
        keywords: postData.tags.join(', '),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://www.itugui.com/posts/${params.slug}`,
        },
    };

    return (
        <main className="mx-auto flex w-full max-w-5xl text-xl flex-col items-start justify-start px-4 pt-16 text-gray-800">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />

            {postData.image && (
                <div className="w-full mb-8">
                    <img
                        src={`/images/${postData.image}`}
                        alt={postData.title}
                        className="rounded-lg object-cover w-full h-[350px]"
                    />
                </div>
            )
            }

            <section className="w-full mb-4 flex flex-col gap-2">
                <h1 className="text-4xl font-bold mb-4">{postData.title}</h1>
                <p className="text-gray-600 text-sm font-semibold">
                    {new Date(postData.date).toLocaleDateString()} • <span className="text-blue-500">{postData.readTime} read</span>
                </p>
                {postData.tags && postData.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {postData.tags.map((tag) => (
                            <span
                                key={tag}
                                className="bg-gray-200 cursor-pointer text-blue-500 font-semibold text-sm px-3 py-1 rounded-full"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}
            </section>
            <section className="w-full">
                <ReactMarkdown
                    components={{
                        // h1: ({ children, node, ...props }) => <h1 className="text-4xl font-bold my-8" {...props}>{children}</h1>,
                        h2: ({ children, node, ...props }) => <h2 className="text-3xl font-bold my-6" {...props}>{children}</h2>,
                        h3: ({ children, node, ...props }) => <h3 className="text-2xl font-bold my-4" {...props}>{children}</h3>,
                        h4: ({ children, node, ...props }) => <h3 className="text-xl font-bold my-4" {...props}>{children}</h3>,
                        p: ({ children, node, ...props }) => <p className="mb-4" {...props}>{children}</p>,
                        a: ({ children, node, ...props }) => <a className="text-blue-500 hover:underline" {...props}>{children}</a>,
                        ul: ({ children, node, ...props }) => <ul className="list-disc pl-8 mb-4 text-base" {...props}>{children}</ul>,
                        li: ({ children, node, ...props }) => <li className="mb-1"{...props}>{children}</li>,
                        img: ({ node, ...props }) => <div className="flex w-full justify-center"><img className="rounded-lg object-fill w-auto h-[350px]" {...props} /></div>,
                        blockquote: ({ children, node, ...props }) => <blockquote className="border-l-4 pl-4 mb-4" {...props} >{children}</blockquote>,
                        pre: ({ children, node, ...props }) => <pre className="bg-gray-800 p-4 rounded text-white" {...props}>{children}</pre>,
                    }}
                >
                    {postData.content || ""}
                </ReactMarkdown>
            </section>


        </main>
    );
}
