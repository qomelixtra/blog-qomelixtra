import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/blog"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/button"
import { BlogLayout } from "@/components/blog-layout"

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  return (
    <BlogLayout>
      <article className="container max-w-screen-md py-12">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/blog" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        <header className="mb-12 space-y-4">
          <div className="flex items-center gap-2">
            <Badge>{post.language === "km" ? "🇰🇭 Khmer" : "🇺🇸 English"}</Badge>
            <time className="text-sm text-muted-foreground">
              {new Date(post.date).toLocaleDateString(post.language === "km" ? "km-KH" : "en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </time>
          </div>
          <h1
            className={`text-4xl md:text-5xl font-bold tracking-tight text-balance ${post.language === "km" ? "font-khmer" : ""}`}
          >
            {post.title}
          </h1>
          <p className={`text-xl text-muted-foreground text-balance ${post.language === "km" ? "font-khmer" : ""}`}>
            {post.description}
          </p>
        </header>

        <div className={`prose prose-lg ${post.language === "km" ? "font-khmer" : ""}`}>
          <MarkdownRenderer content={post.content} />
        </div>
      </article>
    </BlogLayout>
  )
}
