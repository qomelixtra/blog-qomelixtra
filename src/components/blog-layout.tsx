"use client";

import type React from "react";

import { SiteHeader } from "./site-header";

export function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <SiteHeader currentLanguage="en" onLanguageChange={() => {}} />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-6 md:py-0">
        <div className="container max-w-screen-xl mx-auto px-4 flex h-16 items-center justify-between text-sm text-muted-foreground">
          <p>© 2025 My Blog. All rights reserved.</p>
          <p>Built with Next.js & Markdown</p>
        </div>
      </footer>
    </div>
  );
}
