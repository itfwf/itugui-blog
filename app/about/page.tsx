import { RecentPosts } from "@/components/recent-posts"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-react"

export default function AboutMe() {
    return (
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-start px-4 pt-16 md:flex-row">
            <div className="container mx-auto px-4 py-8">
                <header className="mb-12 text-center">
                    <Avatar className="mx-auto h-32 w-32">
                        <AvatarImage alt="Ioan Tugui" src="/placeholder.svg?height=128&width=128" />
                        <AvatarFallback>IT</AvatarFallback>
                    </Avatar>
                    <h1 className="mt-4 text-3xl font-bold">Ioan Tugui</h1>
                    <p className="text-xl text-muted-foreground">.NET Developer</p>
                    <div className="mt-4 flex justify-center space-x-4">
                        <a href="https://github.com/itfwf" target="_blank" rel="noopener noreferrer">
                            <Button size="icon" variant="ghost">
                                <GithubIcon className="h-5 w-5" />
                                <span className="sr-only">GitHub</span>
                            </Button>
                        </a>
                        <a href="https://www.linkedin.com/in/itugui/" target="_blank" rel="noopener noreferrer">
                            <Button size="icon" variant="ghost">
                                <LinkedinIcon className="h-5 w-5" />
                                <span className="sr-only">LinkedIn</span>
                            </Button>
                        </a>
                        <a href="https://x.com/o0wWL" target="_blank" rel="noopener noreferrer">
                            <Button size="icon" variant="ghost">
                                <TwitterIcon className="h-5 w-5" />
                                <span className="sr-only">Twitter</span>
                            </Button>
                        </a>
                    </div>
                </header>

                <main>
                    <section className="mb-12">
                        <h2 className="mb-4 text-2xl font-semibold">About Me</h2>
                        <p className="text-muted-foreground">
                            Hi there! {"I'm"} Ioan, a passionate .NET developer with over 5 years of experience in building robust and
                            scalable applications. I love working with C#, ASP.NET Core, and exploring the latest features in the .NET
                            ecosystem.
                        </p>
                    </section>

                    <section className="mb-12">
                        <h2 className="mb-4 text-2xl font-semibold">Skills</h2>
                        <div className="flex flex-wrap gap-2">
                            <Badge>C#</Badge>
                            <Badge>ASP.NET Core</Badge>
                            <Badge>Entity Framework</Badge>
                            <Badge>AWS</Badge>
                            <Badge>GraphQL</Badge>
                            <Badge>RESTful APIs</Badge>
                            <Badge>Microservices</Badge>
                            <Badge>Docker</Badge>
                        </div>
                    </section>
                    <section className="mb-12">
                        <h2 className="mb-4 text-2xl font-semibold">Projects</h2>

                        <div className="mb-6 rounded-lg border p-4 shadow-xs">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">Resume Builder</h3>
                                <a
                                    target="_blank"
                                    href="https://resumegencv.com"
                                    className="inline-flex items-center rounded-md border px-3 py-1 text-sm font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80"
                                    rel="noopener noreferrer"
                                >
                                    Create your Resume →
                                </a>
                            </div>
                            <p className="mt-2 text-muted-foreground">
                                <ul>
                                    <li>Getting rid of annoying paywalls.</li>
                                    <li>Accessible to everyone.</li>
                                    <li>Perfect ATS Templates.</li>
                                    <li>Cover Letter Builder.</li>
                                </ul>
                            </p>
                            <div className="mt-3">
                                <span className="font-medium text-sm mr-2">Tech Stack:</span>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">ASP.NET Core</Badge>
                                    <Badge variant="secondary">React</Badge>
                                    <Badge variant="secondary">NextJS</Badge>
                                    <Badge variant="secondary">Entity Framework</Badge>
                                    <Badge variant="secondary">PostgreSQL</Badge>
                                    <Badge variant="secondary">AWS</Badge>
                                    <Badge variant="secondary">Hetzner</Badge>
                                    <Badge variant="secondary">Some Vibes</Badge>
                                </div>
                            </div>
                        </div>
                        <div className="mb-6 rounded-lg border p-4 shadow-xs">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-bold">substitutr.com</h3>
                                <a
                                    target="_blank"
                                    href="https://substitutr.com/"
                                    className="inline-flex items-center rounded-md border px-3 py-1 text-sm font-semibold transition-colors focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow-sm hover:bg-primary/80"
                                    rel="noopener noreferrer"
                                >
                                    Find alternatives →
                                </a>
                            </div>
                            <p className="mt-2 text-muted-foreground">
                                <ul>
                                    <li>Discover <strong>better or free and open-source alternatives</strong> to popular software and services.</li>
                                    <li>Find substitutes for tools with <strong>annoying paywalls or restrictive pricing</strong>.</li>
                                    <li>Features a searchable, <strong>community-curated database</strong> of replacements.</li>
                                    <li>Focused on providing <strong>accessible and cost-effective</strong> options for everyone.</li>
                                </ul>
                            </p>
                            <div className="mt-3">
                                <span className="font-medium text-sm mr-2">Tech Stack:</span>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">ASP.NET Core</Badge>
                                    <Badge variant="secondary">Entity Framework</Badge>
                                    <Badge variant="secondary">PostgreSQL</Badge>
                                    <Badge variant="secondary">Hetzner</Badge>
                                    <Badge variant="secondary">Some Vibes</Badge>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <RecentPosts />
                    </section>
                </main>
            </div>
        </div >

    )
}