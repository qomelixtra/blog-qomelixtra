import Link from "next/link";
import { BlogLayout } from "@/components/blog-layout";
import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Globe, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <BlogLayout>
      <div className="w-full">
        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-b from-background via-background to-muted/20 py-24 md:py-32 lg:py-40">
          {/* Decorative background elements */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="container max-w-screen-lg mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium">
                <Sparkles className="h-4 w-4" />
                <span>Welcome to my corner of the internet</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight bg-gradient-to-r from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                Welcome to My Blog
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-2xl leading-relaxed">
                Thoughts, stories, and ideas written in Markdown. Explore
                articles in English and Khmer.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="/blog">
                  <Button size="lg" className="gap-2 text-base">
                    <BookOpen className="h-5 w-5" />
                    Explore Articles
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="gap-2 text-base"
                  >
                    About Me
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="w-full py-20 md:py-28">
          <div className="container max-w-screen-lg mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-blue-500/10 text-blue-500">
                  <BookOpen className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Quality Content</h3>
                <p className="text-muted-foreground leading-relaxed">
                  In-depth articles and tutorials covering technology, design,
                  and development.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-purple-500/10 text-purple-500">
                  <Globe className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Bilingual</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Content available in both English and Khmer to reach a wider
                  audience.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="flex flex-col items-center text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:border-foreground/20 transition-all duration-300 hover:shadow-lg">
                <div className="flex items-center justify-center w-14 h-14 rounded-full bg-pink-500/10 text-pink-500">
                  <Sparkles className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-semibold">Regular Updates</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fresh perspectives and new articles published regularly to
                  keep you inspired.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="w-full py-20 md:py-28 bg-muted/30">
          <div className="container max-w-screen-lg mx-auto px-4">
            <div className="flex flex-col items-center text-center space-y-6 p-8 md:p-12 rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Ready to Start Reading?
              </h2>
              <p className="text-lg text-muted-foreground max-w-xl">
                Discover insightful articles, practical tutorials, and
                thoughtful perspectives on technology and beyond.
              </p>
              <Link href="/blog">
                <Button size="lg" className="gap-2 text-base">
                  Browse All Posts
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </BlogLayout>
  );
}
