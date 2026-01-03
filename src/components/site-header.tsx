"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SiteHeaderProps {
  currentLanguage: string
  onLanguageChange: (lang: string) => void
}

export function SiteHeader({ currentLanguage, onLanguageChange }: SiteHeaderProps) {
  const { setTheme, theme } = useTheme()
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold">My Blog</span>
          </Link>
          <nav className="hidden md:flex gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link
              href="/blog"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname?.startsWith("/blog") ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              Blog
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          {/* Language Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onLanguageChange(currentLanguage === "en" ? "km" : "en")}
            className="gap-2"
          >
            <span className="text-lg">{currentLanguage === "en" ? "🇺🇸" : "🇰🇭"}</span>
            <span className="hidden sm:inline-block">{currentLanguage === "en" ? "EN" : "KM"}</span>
          </Button>

          {/* Theme Toggle */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
