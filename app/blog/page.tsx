import Posts from "@/components/posts";
import { Metadata } from "next";
export const metadata: Metadata = {
    alternates: {
        canonical: 'https://itugui.com/blog',
    },
    title: "Blog - .NET, React, and Cloud Development",
    description: "Explore articles on .NET, React, AWS, and software engineering. Get insights, tutorials, and real-world solutions from a passionate developer.",
    keywords: ['.NET blog', 'React blog', 'AWS blog', 'software development articles', 'coding tutorials', 'web development insights'],
    openGraph: {
        title: "Blog - .NET, React, and Cloud Development",
        description: "Explore articles on .NET, React, AWS, and software engineering. Get insights, tutorials, and real-world solutions from a passionate developer.",
        url: 'https://itugui.com/blog',
        type: 'website',
        siteName: 'Blog',
        locale: 'en_US',
    },
    twitter: {
        card: 'summary_large_image',
        title: "Blog - .NET, React, and Cloud Development",
        description: "Explore articles on .NET, React, AWS, and software engineering. Get insights, tutorials, and real-world solutions from a passionate developer.",
        creator: '@o0wWL',
    }
}
export default function BlogHomePage() {

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
            <div className="min-h-screen">
                <section className='w-full py-12'>
                    <h1 className='mb-2 text-3xl font-bold'>My Blog</h1>
                    <p className="text-lg text-muted-foreground">Here you'll find my thoughts, tutorials, and experiences in the world of software development, focusing on .NET, React, and AWS.</p>                </section>
                <Posts />
            </div>
        </main>
    )
}