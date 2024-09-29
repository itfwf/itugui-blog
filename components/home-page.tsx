import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Lightbulb, Newspaper, Terminal } from "lucide-react"


export function HomePageComponent() {
  return (
    <>

      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">What I Write About</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Code, title: "Web Development", description: "Frontend and backend technologies" },
              { icon: Terminal, title: "DevOps", description: "CI/CD, containerization, and cloud services" },
              { icon: Lightbulb, title: "Emerging Tech", description: "AI, blockchain, and IoT innovations" },
              { icon: Newspaper, title: "Tech News", description: "Latest updates in the IT world" },
            ].map((topic, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <topic.icon className="w-12 h-12 mx-auto text-blue-500 dark:text-blue-400" />
                  <CardTitle className="mt-4">{topic.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-300">{topic.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>

  )
}