"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Post } from "@/lib/blog";
import { ChevronDown, Menu, X } from "lucide-react";
import { useState } from "react";

interface BlogSidebarProps {
  posts: Post[];
}

export function BlogSidebar({ posts }: BlogSidebarProps) {
  const pathname = usePathname();
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(["Jenkins", "SonarQube"])
  );
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Group posts by category
  const groupedPosts = posts.reduce((acc, post) => {
    if (!acc[post.category]) {
      acc[post.category] = [];
    }
    acc[post.category].push(post);
    return acc;
  }, {} as Record<string, Post[]>);

  // Sort categories alphabetically
  const sortedCategories = Object.keys(groupedPosts).sort();

  const toggleCategory = (category: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(category)) {
      newExpanded.delete(category);
    } else {
      newExpanded.add(category);
    }
    setExpandedCategories(newExpanded);
  };

  const SidebarContent = () => (
    <nav className="py-6 px-4 space-y-2">
      <Link
        href="/blog"
        onClick={() => setSidebarOpen(false)}
        className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
          pathname === "/blog"
            ? "bg-primary text-primary-foreground"
            : "text-foreground hover:bg-accent"
        }`}
      >
        All Posts
      </Link>

      <div className="pt-4 space-y-1">
        {sortedCategories.map((category) => (
          <div key={category}>
            <button
              onClick={() => toggleCategory(category)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium hover:bg-accent transition-colors text-foreground"
            >
              <span className="truncate">{category}</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform flex-shrink-0 ml-2 ${
                  expandedCategories.has(category) ? "rotate-0" : "-rotate-90"
                }`}
              />
            </button>

            {expandedCategories.has(category) && (
              <div className="ml-2 space-y-1 border-l border-border pl-2">
                {groupedPosts[category]
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`block px-3 py-2 rounded text-sm transition-colors break-words ${
                        pathname === `/blog/${post.slug}`
                          ? "bg-primary text-primary-foreground font-medium"
                          : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                      }`}
                      title={post.title}
                    >
                      <span className="line-clamp-2">{post.title}</span>
                    </Link>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="hidden max-md:block fixed top-16 left-4 z-40 p-2 rounded-md hover:bg-accent transition-colors"
        aria-label="Toggle sidebar"
      >
        {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden top-16"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col border-r border-border bg-muted/30 min-h-[calc(100vh-4rem)]">
        <div className="overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 border-r border-border bg-muted/30 z-40 transition-transform duration-300 md:hidden ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="overflow-y-auto h-full">
          <SidebarContent />
        </div>
      </aside>
    </>
  );
}
