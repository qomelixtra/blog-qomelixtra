import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { BlogLayout } from "@/components/blog-layout"

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ lang?: string }>
}) {
  const { lang } = await searchParams
  const posts = await getAllPosts()

  const filteredPosts = lang ? posts.filter((post) => post.language === lang) : posts
  const currentLang = lang || "en"

  return (
    <BlogLayout>
      <div className="container max-w-screen-lg py-12">
        <div className="space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Blog Posts</h1>
          <p className="text-lg text-muted-foreground">
            {currentLang === "en" ? "Explore my thoughts and ideas" : "អត្ថបទនិងគំនិតផ្សេងៗ"}
          </p>
          <div className="flex gap-2">
            <Link href="/blog">
              <Badge variant={!lang ? "default" : "outline"} className="cursor-pointer">
                All
              </Badge>
            </Link>
            <Link href="/blog?lang=en">
              <Badge variant={lang === "en" ? "default" : "outline"} className="cursor-pointer">
                🇺🇸 English
              </Badge>
            </Link>
            <Link href="/blog?lang=km">
              <Badge variant={lang === "km" ? "default" : "outline"} className="cursor-pointer">
                🇰🇭 Khmer
              </Badge>
            </Link>
          </div>
        </div>

        {filteredPosts.length === 0 ? (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-muted-foreground">No posts found.</p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6">
            {filteredPosts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`}>
                <Card className="transition-colors hover:bg-muted/50">
                  <CardHeader>
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <Badge variant="secondary">{post.language === "km" ? "🇰🇭" : "🇺🇸"}</Badge>
                      <time className="text-sm text-muted-foreground">
                        {new Date(post.date).toLocaleDateString(post.language === "km" ? "km-KH" : "en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </time>
                    </div>
                    <CardTitle className={post.language === "km" ? "font-khmer" : ""}>{post.title}</CardTitle>
                    <CardDescription className={post.language === "km" ? "font-khmer" : ""}>
                      {post.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  )
}
