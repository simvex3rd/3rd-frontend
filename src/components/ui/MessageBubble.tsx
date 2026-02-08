"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: {
    role: "user" | "assistant";
    content: string;
  };
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "px-[16px] py-[8px] mb-[12px] max-w-[90%]",
        isUser
          ? "bg-[rgba(2,238,225,0.3)] rounded-[16px] rounded-bl-none ml-auto"
          : "bg-[rgba(1,169,160,0.3)] rounded-[16px] rounded-br-none mr-auto"
      )}
    >
      <div className="text-white max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code: (props) => {
              const { children } = props;
              // Distinguish between inline and block code
              const isBlock =
                typeof children === "string" && children.includes("\n");

              if (isBlock) {
                return (
                  <code className="block bg-gray-800 p-[12px] rounded my-[8px] overflow-x-auto text-[14px]">
                    {children}
                  </code>
                );
              }
              return (
                <code className="bg-gray-700 px-[4px] py-[2px] rounded text-[14px]">
                  {children}
                </code>
              );
            },
            pre: (props) => (
              <pre className="bg-gray-800 p-[12px] rounded my-[8px] overflow-x-auto">
                {props.children}
              </pre>
            ),
            ul: (props) => (
              <ul className="list-disc list-inside my-2">{props.children}</ul>
            ),
            ol: (props) => (
              <ol className="list-decimal list-inside my-2">
                {props.children}
              </ol>
            ),
            blockquote: (props) => (
              <blockquote className="border-l-4 border-primary pl-4 italic my-2">
                {props.children}
              </blockquote>
            ),
            p: (props) => <p className="my-1">{props.children}</p>,
            strong: (props) => (
              <strong className="font-bold">{props.children}</strong>
            ),
            em: (props) => <em className="italic">{props.children}</em>,
            a: (props) => (
              <a
                href={props.href}
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                {props.children}
              </a>
            ),
          }}
        >
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
