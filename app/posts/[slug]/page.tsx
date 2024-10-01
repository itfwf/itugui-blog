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
            article: {
                publishedTime: postData.date, // Date the article was published
                modifiedTime: postData.updatedAt || postData.date, // Last modified time, fallback to publish date if not updated
                authors: ['Author Name'], // Add a dynamic author if available in postData
                tags: postData.tags,
            },
            images: [
                {
                    url: `https://www.itugui.com/images/${params.slug}.png`,
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

        author: 'Ioan Tugui',
        article: {
            published_time: postData.date,
            modified_time: postData.updatedAt || postData.date,
            section: 'Technology',
            tags: postData.tags,
        },
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
            name: 'Author Name', // Replace with dynamic author if available
        },
        publisher: {
            '@type': 'Organization',
            name: 'Your Blog Name', // Replace with your blog name
            logo: {
                '@type': 'ImageObject',
                url: 'https://yourblogdomain.com/images/logo.png', // Logo of your blog
            },
        },
        image: `https://yourblogdomain.com/images/${params.slug}.png`, // Main image
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://yourblogdomain.com/posts/${params.slug}`,
        },
    };
    return (
        <main className="mx-auto flex w-full max-w-7xl text-xl flex-col items-start justify-start px-4 pt-16 text-gray-800">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />            <ReactMarkdown
                components={{
                    h1: ({ children, node, ...props }) => <h1 className="text-4xl font-bold my-8" {...props} >{children}</h1>,
                    h2: ({ children, node, ...props }) => <h2 className="text-3xl font-bold my-6" {...props} >{children}</h2>,
                    h3: ({ children, node, ...props }) => <h3 className="text-2xl font-bold my-4" {...props} >{children}</h3>,
                    h4: ({ children, node, ...props }) => <h4 className="text-xl font-bold my-8" {...props} >{children}</h4>,
                    h5: ({ children, node, ...props }) => <h5 className="text-lg font-bold my-8" {...props} >{children}</h5>,
                    h6: ({ children, node, ...props }) => <h6 className="text-base font-bold my-8" {...props} >{children}</h6>,
                    p: ({ children, node, ...props }) => <p className="mb-4 te" {...props} >{children}</p>,
                    a: ({ children, node, ...props }) => <a className="text-blue-500 hover:underline" {...props} >{children}</a>,
                    ul: ({ children, node, ...props }) => <ul className="list-disc pl-8 mb-4" {...props} >{children}</ul>,
                    ol: ({ children, node, ...props }) => <ol className="list-decimal pl-8 mb-4" {...props} >{children}</ol>,
                    li: ({ children, node, ...props }) => <li className="mb-2" {...props} >{children}</li>,
                    blockquote: ({ children, node, ...props }) => <blockquote className="border-l-4 pl-4 mb-4" {...props} >{children}</blockquote>,
                    code: ({ children, node, ...props }) => <code className="bg-gray-100 dark:bg-gray-800 p-1 rounded" {...props} >{children}</code>,
                    pre: ({ children, node, ...props }) => <pre className="bg-gray-800 p-4 rounded text-white" {...props} >{children}</pre>,
                    img: ({ node, ...props }) => <img className="w-full h-auto" {...props} />,
                    hr: ({ node, ...props }) => <hr className="border-gray-200 dark:border-gray-700 my-8" {...props} />,
                }}

            >{postData.content || ""}</ReactMarkdown>
        </main>
    );
}
