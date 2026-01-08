"use client";

import type React from "react";

import { SiteHeader } from "./site-header";
import { BlogSidebar } from "./blog-sidebar";
import type { Post } from "@/lib/blog";

interface BlogLayoutProps {
  children: React.ReactNode;
  posts?: Post[];
}

export function BlogLayout({ children, posts = [] }: BlogLayoutProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader currentLanguage="en" onLanguageChange={() => {}} />
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {posts.length > 0 && <BlogSidebar posts={posts} />}
        <main className="flex-1 overflow-y-auto w-full md:min-w-0 h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
      <footer className="border-t border-border py-6 md:py-0">
        <div className="container max-w-screen-xl mx-auto px-4 flex h-16 items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 My Blog. All rights reserved.</p>
          <p>Built with Next.js & Markdown</p>
        </div>
      </footer>
    </div>
  );
}
