"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { useTheme } from "next-themes"

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const { theme } = useTheme()

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => <h1>{children}</h1>,
        h2: ({ children }) => <h2>{children}</h2>,
        h3: ({ children }) => <h3>{children}</h3>,
        h4: ({ children }) => <h4>{children}</h4>,
        p: ({ children }) => <p>{children}</p>,
        a: ({ href, children }) => (
          <a href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        ),
        ul: ({ children }) => <ul>{children}</ul>,
        ol: ({ children }) => <ol>{children}</ol>,
        li: ({ children }) => <li>{children}</li>,
        blockquote: ({ children }) => <blockquote>{children}</blockquote>,
        code: ({ children, className, ...props }) => {
          const match = /language-(\w+)/.exec(className || "")
          const isInline = !match

          if (isInline) {
            return (
              <code className={className} {...props}>
                {children}
              </code>
            )
          }

          return (
            <SyntaxHighlighter
              style={theme === "dark" ? oneDark : oneLight}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          )
        },
        pre: ({ children }) => <>{children}</>,
        img: ({ src, alt }) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={src || "/placeholder.svg"} alt={alt || ""} />
        ),
        hr: () => <hr />,
        table: ({ children }) => <table>{children}</table>,
        thead: ({ children }) => <thead>{children}</thead>,
        tbody: ({ children }) => <tbody>{children}</tbody>,
        tr: ({ children }) => <tr>{children}</tr>,
        th: ({ children }) => <th>{children}</th>,
        td: ({ children }) => <td>{children}</td>,
      }}
    >
      {content}
    </ReactMarkdown>
  )
}
