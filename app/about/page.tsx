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
                        {/* <a href="https://www.linkedin.com/in/itugui/" target="_blank" rel="noopener noreferrer"> */}
                        <Button size="icon" variant="ghost">
                            <TwitterIcon className="h-5 w-5" />
                            <span className="sr-only">Twitter</span>
                        </Button>
                        {/* </a> */}
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
                            <Badge>SQL Server</Badge>
                            <Badge>AWS</Badge>
                            <Badge>RESTful APIs</Badge>
                            <Badge>Microservices</Badge>
                            <Badge>Docker</Badge>
                            <Badge>Git</Badge>
                        </div>
                    </section>

                    <section>
                        <h2 className="mb-4 text-2xl font-semibold">Recent Blog Posts</h2>
                        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Exploring .NET 6 Features</CardTitle>
                                    <CardDescription>Posted on May 15, 2023</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        In this post, we dive into the exciting new features introduced in .NET 6 and how they can improve
                                        your development workflow.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Building Microservices with ASP.NET Core</CardTitle>
                                    <CardDescription>Posted on April 2, 2023</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Learn how to design and implement a microservices architecture using ASP.NET Core and Docker.
                                    </p>
                                </CardContent>
                            </Card>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Optimizing Entity Framework Core Performance</CardTitle>
                                    <CardDescription>Posted on March 10, 2023</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">
                                        Discover tips and tricks to boost your Entity Framework Core performance and make your database
                                        queries more efficient.
                                    </p>
                                </CardContent>
                            </Card>
                        </div> */}
                    </section>
                </main>
            </div>
        </div>

    )
}