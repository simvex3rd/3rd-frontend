import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";

/**
 * Markdown renderer component with syntax highlighting for code blocks.
 * Styled according to Figma design specs (node-337:1343).
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
        "markdown-renderer flex flex-col gap-4",
        compact && "gap-2",
        className
      )}
      {...props}
    >
      <ReactMarkdown
        rehypePlugins={[rehypeHighlight]}
        components={{
          // Headings - Figma: 16px bold neutral-50
          h1: ({ children }) => (
            <h1 className="text-[16px] font-bold leading-[1.5] text-neutral-50 mb-0">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-[16px] font-bold leading-[1.5] text-neutral-50 mb-0">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-[16px] font-bold leading-[1.5] text-neutral-50 mb-0">
              {children}
            </h3>
          ),
          h4: ({ children }) => (
            <h4 className="text-[16px] font-bold leading-[1.5] text-neutral-50 mb-0">
              {children}
            </h4>
          ),
          h5: ({ children }) => (
            <h5 className="text-[16px] font-bold leading-[1.5] text-neutral-50 mb-0">
              {children}
            </h5>
          ),
          h6: ({ children }) => (
            <h6 className="text-[16px] font-bold leading-[1.5] text-neutral-50 mb-0">
              {children}
            </h6>
          ),

          // Paragraphs - Figma: 14px medium neutral-300
          p: ({ children }) => (
            <p className="text-[14px] font-medium leading-[1.5] text-neutral-300 mb-0">
              {children}
            </p>
          ),

          // Lists - Figma: 14px medium neutral-300
          ul: ({ children }) => (
            <ul className="list-disc list-inside text-[14px] font-medium text-neutral-300 mb-0">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside text-[14px] font-medium text-neutral-300 mb-0">
              {children}
            </ol>
          ),
          li: ({ children }) => (
            <li className="text-[14px] font-medium leading-[1.5] text-neutral-300">
              {children}
            </li>
          ),

          // Code - Figma: rgba(1,100,95,0.5) bg, cyan border, neutral-50 text
          code: ({ className, children, ...props }) => {
            const isInline = !className;
            return isInline ? (
              <code
                className="bg-formula-bg border border-primary rounded px-1 text-[14px] font-medium text-neutral-50"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code
                className="text-[14px] font-medium leading-[1.5] text-neutral-50"
                {...props}
              >
                {children}
              </code>
            );
          },
          pre: ({ children }) => (
            <pre className="bg-formula-bg border-2 border-primary rounded-[16px] p-4 mb-0 overflow-x-auto">
              {children}
            </pre>
          ),

          // Blockquote - Figma: cyan color
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-primary pl-4 text-[14px] font-medium leading-[1.5] text-primary mb-0">
              {children}
            </blockquote>
          ),

          // Links - cyan with hover
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Horizontal rule
          hr: () => <hr className="border-neutral-300 my-4" />,

          // Emphasis - Figma colors
          strong: ({ children }) => (
            <strong className="font-bold text-neutral-50">{children}</strong>
          ),
          em: ({ children }) => (
            <em className="italic text-neutral-300">{children}</em>
          ),

          // Table
          table: ({ children }) => (
            <div className="overflow-x-auto mb-0">
              <table className="min-w-full border-collapse border-2 border-primary">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-[rgba(1,100,95,0.3)]">{children}</thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children }) => (
            <tr className="border-b border-primary">{children}</tr>
          ),
          th: ({ children }) => (
            <th className="px-4 py-2 text-left font-semibold text-neutral-50 text-[14px]">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-4 py-2 text-neutral-300 text-[14px]">
              {children}
            </td>
          ),
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
