import Link from "next/link"
import { BlogLayout } from "@/components/blog-layout"
import { Button } from "@/components/button"

export default function HomePage() {
  return (
    <BlogLayout>
      <div className="container max-w-screen-lg py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">Welcome to My Blog</h1>
          <p className="text-xl md:text-2xl text-muted-foreground text-balance max-w-2xl">
            Thoughts, stories, and ideas written in Markdown. Explore articles in English and Khmer.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg">
              <Link href="/blog">Read Articles</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/blog?lang=km">អត្ថបទភាjសាខ្មែរ</Link>
            </Button>
          </div>
        </div>
      </div>
    </BlogLayout>
  )
}
