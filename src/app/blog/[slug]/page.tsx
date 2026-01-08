import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { MarkdownRenderer } from "@/components/markdown-renderer";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/button";
import { BlogLayout } from "@/components/blog-layout";

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

function estimateReadTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  const allPosts = await getAllPosts();

  if (!post) {
    notFound();
  }

  const readTime = estimateReadTime(post.content);

  return (
    <BlogLayout posts={allPosts}>
      <article className="max-w-4xl mx-auto py-8 md:py-12 px-4 md:px-6">
        {/* Back Button */}
        <Button variant="ghost" asChild className="mb-8 -ml-2">
          <Link href="/blog" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        </Button>

        {/* Article Header */}
        <header className="mb-12 space-y-6 pb-8 border-b">
          {/* Meta Info */}
          <div className="flex items-center gap-3 flex-wrap">
            <Badge variant="secondary" className="font-medium">
              {post.language === "km" ? "🇰🇭 ភាសាខ្មែរ" : "🇺🇸 English"}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time>
                  {new Date(post.date).toLocaleDateString(
                    post.language === "km" ? "km-KH" : "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </time>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>

          {/* Title & Description */}
          <div className="space-y-4">
            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight ${
                post.language === "km" ? "font-khmer" : ""
              }`}
            >
              {post.title}
            </h1>
            <p
              className={`text-xl md:text-2xl text-muted-foreground leading-relaxed ${
                post.language === "km" ? "font-khmer" : ""
              }`}
            >
              {post.description}
            </p>
          </div>
        </header>

        {/* Article Content */}
        <div className={post.language === "km" ? "font-khmer" : ""}>
          <MarkdownRenderer content={post.content} />
        </div>

        {/* Article Footer */}
        <footer className="mt-16 pt-8 border-t">
          <Button variant="outline" asChild>
            <Link href="/blog" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to all posts
            </Link>
          </Button>
        </footer>
      </article>
    </BlogLayout>
  );
}
