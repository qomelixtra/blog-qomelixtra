import Link from "next/link"
import { getAllPosts } from "@/lib/blog"
import { Badge } from "@/components/ui/badge"
import { BlogLayout } from "@/components/blog-layout"
import { Calendar, Clock } from "lucide-react"

export default async function BlogListPage() {
  const posts = await getAllPosts()

  return (
    <BlogLayout>
      <div className="container max-w-screen-xl py-16 px-4">
        {/* Hero Section */}
        <div className="max-w-3xl mx-auto text-center mb-16 space-y-4">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-muted-foreground">
            Thoughts, tutorials, and stories about technology, design, and life
          </p>
        </div>

        {/* Posts Grid */}
        {posts.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
              <span className="text-3xl">📝</span>
            </div>
            <h3 className="text-lg font-semibold mb-2">No posts yet</h3>
            <p className="text-muted-foreground">Check back soon for new content!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {posts.map((post) => (
              <Link 
                key={post.slug} 
                href={`/blog/${post.slug}`}
                className="group"
              >
                <article className="h-full flex flex-col bg-card border border-border rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-foreground/20 hover:-translate-y-1">
                  {/* Card Header with gradient */}
                  <div className="h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
                  
                  <div className="flex-1 p-6 space-y-4">
                    {/* Meta Info */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <Badge 
                        variant="secondary" 
                        className="font-medium"
                      >
                        {post.language === "km" ? "🇰🇭 ភាសាខ្មែរ" : "🇺🇸 English"}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        <time>
                          {new Date(post.date).toLocaleDateString(
                            post.language === "km" ? "km-KH" : "en-US", 
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </time>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 
                      className={`text-2xl font-bold tracking-tight line-clamp-2 group-hover:text-primary transition-colors ${
                        post.language === "km" ? "font-khmer" : ""
                      }`}
                    >
                      {post.title}
                    </h2>

                    {/* Description */}
                    <p 
                      className={`text-muted-foreground line-clamp-3 leading-relaxed ${
                        post.language === "km" ? "font-khmer" : ""
                      }`}
                    >
                      {post.description}
                    </p>

                    {/* Read More Link */}
                    <div className="pt-2">
                      <span className="text-sm font-medium text-primary group-hover:underline inline-flex items-center gap-1">
                        Read more
                        <svg 
                          className="h-4 w-4 transition-transform group-hover:translate-x-1" 
                          fill="none" 
                          stroke="currentColor" 
                          viewBox="0 0 24 24"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                      </span>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}
      </div>
    </BlogLayout>
  )
}