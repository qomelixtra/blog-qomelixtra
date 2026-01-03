import Link from "next/link"
import { BlogLayout } from "@/components/blog-layout"
import { Button } from "@/components/button"

export default function HomePage() {
  return (
    <BlogLayout>
      <div className="container max-w-screen-lg mx-auto px-4 py-24 md:py-32">
        <div className="flex flex-col items-center text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
            Welcome to My Blog
          </h1>
          <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
            Thoughts, stories, and ideas written in Markdown. Explore articles in English and Khmer.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-4">
            <Button asChild size="lg" className="min-w-[160px]">
              <Link href="/blog">Read Articles</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="min-w-[160px] font-khmer">
              <Link href="/blog?lang=km">អត្ថបទភាសាខ្មែរ</Link>
            </Button>
          </div>
        </div>
      </div>
    </BlogLayout>
  )
}