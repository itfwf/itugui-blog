import { Button } from "@/components/ui/button"

export default function Footer() {

    return (
        <footer className="py-16 bg-blue-500 dark:bg-blue-600 text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-8 max-w-2xl mx-auto">
                    Subscribe to my newsletter for the latest insights, tutorials, and tech news delivered straight to your inbox.
                </p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="flex-grow px-4 py-2 rounded-md text-gray-900 dark:text-white dark:bg-gray-800"
                        required
                    />
                    <Button type="submit" variant="secondary" disabled size="lg">
                        Subscribe
                    </Button>
                </form>
            </div>
        </footer>
    )
}