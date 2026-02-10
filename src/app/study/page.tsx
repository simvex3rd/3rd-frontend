"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import {
  LucideSparkles,
  LucideSquarePen,
  LucideChevronRight,
  Loader2,
} from "lucide-react";
import { ViewerHeader } from "@/components/viewer/ViewerHeader";
import { ChatInput } from "@/components/panels/ChatInput";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { api } from "@/lib/api";

const QUICK_ACTIONS = [
  { label: "학습에 관한 도움받기", action: "help" },
  { label: "학습 내용 바탕의 퀴즈", action: "quiz" },
  { label: "부품 정보 불러오기", action: "parts" },
  { label: "PDF 리포트 출력", action: "pdf" },
] as const;

/**
 * Study Dashboard Page
 *
 * 2-column layout:
 * - Left (~55%): AI Chat card (character + welcome + input + chips)
 * - Right (~45%): Memo card (top) + AI Quiz card (bottom)
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=474-1663} Figma Design
 */
export default function StudyPage() {
  const router = useRouter();
  const { user, isLoaded, isSignedIn } = useUser();
  const [aiAvatar, setAiAvatar] = useState("/chat/character1.png");

  // Client-side auth guard
  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.replace("/sign-in");
    }
  }, [isLoaded, isSignedIn, router]);

  useEffect(() => {
    const AVATARS = ["/chat/character1.png", "/chat/character2.png"];
    setAiAvatar(AVATARS[Math.floor(Math.random() * AVATARS.length)]);
  }, []);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;
      try {
        const session = await api.chat.createSession("1");
        router.push(
          `/study/chat?sessionId=${session.id}&q=${encodeURIComponent(message)}`
        );
      } catch {
        router.push(`/study/chat?q=${encodeURIComponent(message)}`);
      }
    },
    [router]
  );

  const handleQuickAction = useCallback(
    (action: string) => {
      const messages: Record<string, string> = {
        help: "학습에 관한 도움을 받고 싶어요",
        quiz: "현재 학습 내용을 바탕으로 퀴즈를 만들어주세요",
        parts: "현재 모델의 부품 정보를 알려주세요",
        pdf: "학습 리포트를 PDF로 출력하고 싶어요",
      };
      const msg = messages[action];
      if (msg) handleSendMessage(msg);
    },
    [handleSendMessage]
  );

  if (!isLoaded || !isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-900">
        <Loader2 className="h-[32px] w-[32px] animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="relative w-full max-[1919px]:h-[133.33vh] h-screen bg-neutral-900 overflow-hidden">
      <ViewerHeader />

      <main className="absolute inset-x-0 top-[102px] bottom-0 px-[80px] py-[40px]">
        <div className="flex gap-[32px] h-full">
          {/* ===== Left: AI Chat ===== */}
          <section className="flex-[55] flex flex-col gap-[16px] min-w-0">
            {/* Header */}
            <div className="flex items-center justify-between shrink-0">
              <div className="flex items-center gap-[16px]">
                <LucideSparkles
                  className="w-[32px] h-[32px] text-primary"
                  strokeWidth={2}
                />
                <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
                  AI Chat
                </h2>
              </div>
              <button
                onClick={() => router.push("/study/chat")}
                className="text-neutral-400 hover:text-primary transition-colors"
                aria-label="Go to full chat"
              >
                <LucideChevronRight
                  className="w-[24px] h-[24px]"
                  strokeWidth={2}
                />
              </button>
            </div>

            {/* Card */}
            {/* Card */}
            <div className="flex-1 relative flex flex-col items-center justify-end gap-[24px] rounded-[24px] bg-gray-30 p-[40px] overflow-hidden">
              <GradientBorder />

              {/* Character + Welcome Bubble */}
              <div className="flex items-end gap-[24px] z-10">
                <div className="relative w-[200px] h-[174px] shrink-0">
                  <Image
                    src={aiAvatar}
                    alt="AI Assistant"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="bg-hover-30 rounded-tl-[24px] rounded-tr-[24px] rounded-br-[24px] px-[24px] py-[16px]">
                  <p className="font-semibold text-[20px] leading-[1.25] text-white">
                    {user?.firstName ?? "사용자"}님, 안녕하세요
                  </p>
                  <p className="font-bold text-[28px] leading-[1.25] text-white">
                    무엇을 도와드릴까요?
                  </p>
                </div>
              </div>

              {/* Chat Input */}
              <div className="w-full z-10">
                <ChatInput onSend={handleSendMessage} />
              </div>

              {/* Quick Action Chips */}
              <div className="flex flex-wrap gap-[16px] items-center justify-center z-10">
                {QUICK_ACTIONS.map((item) => (
                  <button
                    key={item.action}
                    onClick={() => handleQuickAction(item.action)}
                    className="px-[16px] py-[8px] rounded-[100px] border border-primary bg-neutral-800 text-neutral-200 text-[14px] font-medium leading-[1.5] hover:bg-primary/20 transition-colors whitespace-nowrap"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* ===== Right Column ===== */}
          <div className="flex-[45] flex flex-col gap-[24px] min-w-0">
            {/* Memo */}
            <section className="flex-1 flex flex-col gap-[16px] min-h-0">
              <div className="flex items-center gap-[16px] shrink-0">
                <LucideSquarePen
                  className="w-[32px] h-[32px] text-primary"
                  strokeWidth={2}
                />
                <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
                  Memo
                </h2>
              </div>

              <div className="flex-1 relative flex items-center justify-center rounded-[24px] bg-gray-30 p-[32px] overflow-hidden">
                <GradientBorder />

                <div className="flex gap-[16px] z-10">
                  {[1, 2, 3].map((i) => (
                    <button
                      key={i}
                      className="w-[140px] h-[140px] rounded-[24px] bg-primary/30 flex items-center justify-center text-white font-semibold text-[16px] hover:bg-primary/40 transition-colors"
                    >
                      메모
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* AI Quiz */}
            <section className="flex-1 flex flex-col gap-[16px] min-h-0">
              <div className="flex items-center gap-[16px] shrink-0">
                <LucideSparkles
                  className="w-[32px] h-[32px] text-primary"
                  strokeWidth={2}
                />
                <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
                  AI Quiz
                </h2>
              </div>

              <div className="flex-1 relative flex items-center justify-center rounded-[24px] bg-gray-30">
                <GradientBorder />

                <p className="font-medium text-[16px] leading-[1.5] text-white z-10">
                  ai quiz
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
