import { getAllPosts } from '@/lib/posts';
import type { MetadataRoute } from 'next'

const baseUrl = 'https://itugui.com';
export default function sitemap(): MetadataRoute.Sitemap {

    const postsUrls: MetadataRoute.Sitemap = getAllPosts().
        map(preview => ({
            url: `${baseUrl}/blog/${preview.slug}`,
            priority: 0.8,
            changeFrequency: "monthly",
            lastModified: new Date(preview.date) || new Date(),
        }));

    return [
        {
            url: 'https://itugui.com',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: 'https://itugui.com/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: 'https://itugui.com/about',
            lastModified: new Date(),
            changeFrequency: 'yearly',
            priority: 0.8,
        },
        ...postsUrls
    ]
}