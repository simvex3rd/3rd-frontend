import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

/**
 * Markdown renderer component with syntax highlighting for code blocks.
 *
 * @component
 * @example
 * ```tsx
 * <MarkdownRenderer>
 *   # Hello World
 *   This is **bold** and *italic* text.
 * </MarkdownRenderer>
 * ```
 *
 * @param {MarkdownRendererProps} props - Component props
 * @param {string} props.children - Markdown content to render
 * @param {boolean} [props.compact=false] - Use compact spacing
 *
 * @see {@link https://figma.com/file/Vz80RydxWcYHVnn2iuyV0m/SIMVEX} Figma Design - markdown (276x217)
 */

export interface MarkdownRendererProps extends HTMLAttributes<HTMLDivElement> {
  children: string;
  compact?: boolean;
}

export function MarkdownRenderer({
  className,
  children,
  compact = false,
  ...props
}: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "markdown-renderer",
        "text-[var(--body-md)] leading-[var(--body-line-height)]",
        "text-[var(--foreground)]",
        className
      )}
      {...props}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Headings
          h1: ({ children }) => (
            <h1
              className={cn(
                "text-[var(--heading-lg)] leading-[var(--heading-line-height)]",
                "font-bold text-[var(--foreground)]",
                compact ? "mb-2" : "mb-4"
              )}
            >
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2
              className={cn(
                "text-[var(--heading-md)] leading-[var(--heading-line-height)]",
                "font-semibold text-[var(--foreground)]",
                compact ? "mb-2 mt-3" : "mb-3 mt-6"
              )}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className={cn(
                "text-[var(--heading-sm)] leading-[var(--heading-line-height)]",
                "font-semibold text-[var(--foreground)]",
                compact ? "mb-1.5 mt-2.5" : "mb-2 mt-4"
              )}
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4
              className={cn(
                "text-[var(--heading-xs)] leading-[var(--heading-line-height)]",
                "font-semibold text-[var(--foreground)]",
                compact ? "mb-1.5 mt-2" : "mb-2 mt-3"
              )}
            >
              {children}
            </h4>
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className={compact ? "mb-2" : "mb-4"}>{children}</p>
          ),

          // Lists
          ul: ({ children }) => (
            <ul
              className={cn(
                "list-disc list-inside",
                compact ? "mb-2 space-y-1" : "mb-4 space-y-2"
              )}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol
              className={cn(
                "list-decimal list-inside",
                compact ? "mb-2 space-y-1" : "mb-4 space-y-2"
              )}
            >
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[var(--foreground)]">{children}</li>
          ),

          // Code
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code
                className="bg-[var(--gray-100)] dark:bg-[var(--gray-300)] text-[var(--primary-cyan)] px-1.5 py-0.5 rounded text-[0.9em] font-mono"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre
              className={cn(
                "bg-[var(--gray-100)] dark:bg-[var(--bg-dark)]",
                "border border-[var(--gray-300)]",
                "rounded-lg p-4 overflow-x-auto",
                "font-mono text-[var(--body-sm)]",
                compact ? "mb-2" : "mb-4"
              )}
            >
              {children}
            </pre>
          ),

          // Blockquote
          blockquote: ({ children }) => (
            <blockquote
              className={cn(
                "border-l-4 border-[var(--primary-cyan)] pl-4 py-2",
                "bg-[var(--gray-50)] dark:bg-[var(--gray-100)]",
                "text-[var(--gray-500)]",
                "italic",
                compact ? "mb-2" : "mb-4"
              )}
            >
              {children}
            </blockquote>
          ),

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-[var(--primary-cyan)] hover:text-[var(--primary-cyan-hover)] underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Horizontal rule
          hr: () => (
            <hr
              className={cn(
                "border-[var(--gray-300)]",
                compact ? "my-2" : "my-6"
              )}
            />
          ),

          // Emphasis
          strong: ({ children }) => (
            <strong className="font-bold text-[var(--foreground)]">
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em className="italic text-[var(--foreground)]">{children}</em>
          ),

          // Table
          table: ({ children }) => (
            <div className={cn("overflow-x-auto", compact ? "mb-2" : "mb-4")}>
              <table className="min-w-full border-collapse border border-[var(--gray-300)]">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[var(--gray-100)] dark:bg-[var(--gray-200)]">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-[var(--gray-300)]">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-semibold text-[var(--foreground)]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-[var(--foreground)]">{children}</td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
