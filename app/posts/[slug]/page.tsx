
export default function PostPage({ params }) {
    // const postData = getPostData(params.slug);

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
            {params.slug}
        </main>
    );
}
