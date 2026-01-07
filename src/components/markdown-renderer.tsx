"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { ComponentPropsWithoutRef, useState } from "react";
import "highlight.js/styles/github-dark.css";

interface MarkdownRendererProps {
  content: string;
}

function CodeBlock({
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<"code">) {
  const isInline = !className;

  if (isInline) {
    return (
      <code
        className="bg-gray-100 dark:bg-gray-800 px-1.5 py-0.5 rounded text-sm font-mono"
        {...props}
      >
        {children}
      </code>
    );
  }

  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function PreBlock({ children, ...props }: ComponentPropsWithoutRef<"pre">) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      // Extract text from children - could be React elements or strings
      let text = "";

      if (typeof children === "string") {
        text = children;
      } else if (Array.isArray(children)) {
        text = children
          .map((child: any) => {
            if (typeof child === "string") return child;
            if (child?.props?.children) return child.props.children;
            return "";
          })
          .join("");
      } else if (
        typeof children === "object" &&
        children !== null &&
        "props" in children
      ) {
        text = (children as any).props.children || "";
      }

      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="relative group mb-4">
      <button
        onClick={handleCopy}
        className="absolute right-2 top-2 z-10 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200"
        title="Copy code"
      >
        {copied ? "✓ Copied!" : "Copy"}
      </button>
      <pre
        className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm"
        {...props}
      >
        {children}
      </pre>
    </div>
  );
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={{
        // Headings
        h1: ({ ...props }: ComponentPropsWithoutRef<"h1">) => (
          <h1
            className="text-4xl font-bold mt-8 mb-4 pb-2 border-b"
            {...props}
          />
        ),
        h2: ({ ...props }: ComponentPropsWithoutRef<"h2">) => (
          <h2
            className="text-3xl font-bold mt-8 mb-4 pb-2 border-b"
            {...props}
          />
        ),
        h3: ({ ...props }: ComponentPropsWithoutRef<"h3">) => (
          <h3 className="text-2xl font-bold mt-6 mb-3" {...props} />
        ),
        h4: ({ ...props }: ComponentPropsWithoutRef<"h4">) => (
          <h4 className="text-xl font-bold mt-6 mb-3" {...props} />
        ),
        h5: ({ ...props }: ComponentPropsWithoutRef<"h5">) => (
          <h5 className="text-lg font-bold mt-4 mb-2" {...props} />
        ),
        h6: ({ ...props }: ComponentPropsWithoutRef<"h6">) => (
          <h6 className="text-base font-bold mt-4 mb-2" {...props} />
        ),

        // Paragraphs and text
        p: ({ ...props }: ComponentPropsWithoutRef<"p">) => (
          <p className="mb-4 leading-7" {...props} />
        ),

        // Links
        a: ({ ...props }: ComponentPropsWithoutRef<"a">) => (
          <a
            className="text-blue-600 dark:text-blue-400 hover:underline"
            {...props}
          />
        ),

        // Lists
        ul: ({ ...props }: ComponentPropsWithoutRef<"ul">) => (
          <ul className="list-disc list-inside mb-4 space-y-2" {...props} />
        ),
        ol: ({ ...props }: ComponentPropsWithoutRef<"ol">) => (
          <ol className="list-decimal list-inside mb-4 space-y-2" {...props} />
        ),
        li: ({ ...props }: ComponentPropsWithoutRef<"li">) => (
          <li className="leading-7" {...props} />
        ),

        // Code blocks
        code: (props) => <CodeBlock {...props} />,
        pre: (props) => <PreBlock {...props} />,

        // Blockquotes
        blockquote: ({ ...props }: ComponentPropsWithoutRef<"blockquote">) => (
          <blockquote
            className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 py-2 mb-4 italic text-gray-700 dark:text-gray-300"
            {...props}
          />
        ),

        // Tables
        table: ({ ...props }: ComponentPropsWithoutRef<"table">) => (
          <div className="overflow-x-auto mb-4">
            <table
              className="min-w-full border-collapse border border-gray-300 dark:border-gray-700"
              {...props}
            />
          </div>
        ),
        thead: ({ ...props }: ComponentPropsWithoutRef<"thead">) => (
          <thead className="bg-gray-100 dark:bg-gray-800" {...props} />
        ),
        th: ({ ...props }: ComponentPropsWithoutRef<"th">) => (
          <th
            className="border border-gray-300 dark:border-gray-700 px-4 py-2 text-left font-semibold"
            {...props}
          />
        ),
        td: ({ ...props }: ComponentPropsWithoutRef<"td">) => (
          <td
            className="border border-gray-300 dark:border-gray-700 px-4 py-2"
            {...props}
          />
        ),

        // Horizontal rule
        hr: ({ ...props }: ComponentPropsWithoutRef<"hr">) => (
          <hr
            className="my-8 border-gray-300 dark:border-gray-700"
            {...props}
          />
        ),

        // Images
        img: ({ ...props }: ComponentPropsWithoutRef<"img">) => (
          <img className="max-w-full h-auto rounded-lg my-4" {...props} />
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
