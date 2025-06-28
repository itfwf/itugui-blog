/* eslint-disable @typescript-eslint/no-unused-vars */
import { BlogHeader } from "@/components/blog-header";
import { BlogPost } from "@/components/blog-post";
import { TableOfContents } from "@/components/blog-table-of-contents";
import { getAllPosts, getPostData, getTableOfContets, PostPreview } from "@/lib/posts";
import { Metadata, ResolvingMetadata } from "next";

type PostProps = {
    params: { slug: string }
}

export async function generateStaticParams() {
    const posts = await getAllPosts();

    return posts.map((post: PostPreview) => ({
        slug: post.slug,
    }));
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
            canonical: `https://itugui.com/blog/${params.slug}`,
        },
        openGraph: {
            title: postData.title,
            description: postData.excerpt,
            url: `https://itugui.com/blog/${params.slug}`,
            type: 'article',
            images: [
                {
                    url: `https://itugui.com/images/${postData.image}`,
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
                    url: `https://itugui.com/images/${params.slug}.png`,
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
    const tocItems = getTableOfContets(postData.content);
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
            name: 'ITugui',
            logo: {
                '@type': 'ImageObject',
                url: 'https://itugui.com/images/apple-touch-icon.png',
            },
        },
        image: `https://itugui.com/images/${postData.image}`,
        keywords: postData.tags.join(', '),
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': `https://itugui.com/blog/${params.slug}`,
        },
    };

    return (
        <div className="mx-auto w-full max-w-screen-xl px-6 pt-16 lg:pt-24">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <BlogHeader post={postData} />
            <div className="flex flex-col lg:flex-row gap-8 max-w-full">
                <aside className="w-full lg:w-1/4 lg:sticky lg:top-24 lg:max-h-[calc(100vh-6rem)] lg:overflow-y-auto mb-8 lg:mb-0">
                    <TableOfContents items={tocItems} />
                </aside>
                <main className="w-full lg:w-3/4">
                    <BlogPost post={postData} />
                </main>
            </div>

        </div>
    );
}
