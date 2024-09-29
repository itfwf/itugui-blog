import markdownToHtml, { getPostData } from "@/lib/posts";
export default async function PostPage({ params }: { params: { slug: string } }) {
    const postData = getPostData(params.slug);
    const content = await markdownToHtml(postData.content || "");

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
            {params.slug}
            {postData.title}
            {postData.date}

            <div
                dangerouslySetInnerHTML={{ __html: content }}
            />
        </main>
    );
}
