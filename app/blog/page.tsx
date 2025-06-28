import Posts from "@/components/posts";

export default function BlogHomePage() {

    return (
        <main className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
            <Posts />
        </main>
    )
}