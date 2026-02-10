"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useAuthGuard } from "@/hooks/use-auth-guard";
import Image from "next/image";
import {
  LucideSparkles,
  LucideSquarePen,
  LucideChevronRight,
  LucideFileText,
  LucidePlus,
  LucideX,
  LucideCheck,
  Loader2,
} from "lucide-react";
import { ViewerHeader } from "@/components/viewer/ViewerHeader";
import { ChatInput } from "@/components/panels/ChatInput";
import { GradientBorder } from "@/components/ui/GradientBorder";
import { api } from "@/lib/api";
import { generateReport } from "@/lib/pdf-export";
import { useSceneStore } from "@/stores/scene-store";
import { useMemoStore } from "@/stores/memo-store";

const QUICK_ACTIONS = [
  { label: "학습에 관한 도움받기", action: "help" },
  { label: "학습 내용 바탕의 퀴즈", action: "quiz" },
  { label: "부품 정보 불러오기", action: "parts" },
  { label: "PDF 리포트 출력", action: "pdf" },
] as const;

async function downloadReport(modelId: string) {
  const model = await api.models.getDetail(modelId);
  let notes: string | undefined;
  try {
    const noteRes = await api.notes.get(modelId);
    if (noteRes?.content) notes = noteRes.content;
  } catch {
    // notes are optional
  }

  await generateReport({
    modelName: model.name ?? "Untitled Model",
    parts: model.parts.map((p) => ({
      name: p.name ?? "Unknown Part",
      description: p.description ?? undefined,
    })),
    notes,
    generatedAt: new Date(),
  });
}

/**
 * Study Dashboard Page
 *
 * 2-column layout:
 * - Left (~55%): AI Chat card (character + welcome + input + chips)
 * - Right (~45%): Memo card (top) + Report card (bottom)
 *
 * @see {@link https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=474-1663} Figma Design
 */
export default function StudyPage() {
  const router = useRouter();
  const { user } = useUser();
  const { isReady } = useAuthGuard();
  const storeModelId = useSceneStore((s) => s.modelId);
  const modelId = storeModelId ?? "1";
  const [aiAvatar, setAiAvatar] = useState("/chat/character1.png");
  const [pdfLoading, setPdfLoading] = useState(false);
  const [editingSlot, setEditingSlot] = useState<number | null>(null);
  const [editContent, setEditContent] = useState("");
  const memoStore = useMemoStore();
  const memos = memoStore.getMemos(modelId);

  useEffect(() => {
    const AVATARS = ["/chat/character1.png", "/chat/character2.png"];
    setAiAvatar(AVATARS[Math.floor(Math.random() * AVATARS.length)]);
  }, []);

  const handleDownloadReport = useCallback(async () => {
    if (pdfLoading) return;
    setPdfLoading(true);
    try {
      await downloadReport(modelId);
    } catch (err) {
      console.error("Report generation failed:", err);
    } finally {
      setPdfLoading(false);
    }
  }, [pdfLoading, modelId]);

  const handleSendMessage = useCallback(
    async (message: string) => {
      if (!message.trim()) return;
      try {
        const session = await api.chat.createSession(modelId);
        router.push(
          `/study/chat?sessionId=${session.id}&q=${encodeURIComponent(message)}`
        );
      } catch {
        router.push(`/study/chat?q=${encodeURIComponent(message)}`);
      }
    },
    [router, modelId]
  );

  const handleQuickAction = useCallback(
    (action: string) => {
      if (action === "pdf") {
        handleDownloadReport();
        return;
      }
      const messages: Record<string, string> = {
        help: "학습에 관한 도움을 받고 싶어요",
        quiz: "현재 학습 내용을 바탕으로 퀴즈를 만들어주세요",
        parts: "현재 모델의 부품 정보를 알려주세요",
      };
      const msg = messages[action];
      if (msg) handleSendMessage(msg);
    },
    [handleSendMessage, handleDownloadReport]
  );

  if (!isReady) {
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

                {editingSlot !== null ? (
                  <div className="flex flex-col gap-[12px] w-full h-full z-10">
                    <textarea
                      autoFocus
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setEditingSlot(null);
                      }}
                      placeholder="메모를 입력하세요..."
                      className="w-full flex-1 min-h-[100px] rounded-[12px] bg-neutral-800 border border-neutral-700 text-white text-[14px] p-[12px] resize-none focus:outline-none focus:border-primary"
                    />
                    <div className="flex justify-end gap-[8px]">
                      <button
                        onClick={() => setEditingSlot(null)}
                        className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-neutral-700 text-neutral-300 text-[13px] hover:bg-neutral-600 transition-colors"
                      >
                        <LucideX className="w-[14px] h-[14px]" />
                        취소
                      </button>
                      <button
                        onClick={() => {
                          if (editContent.trim()) {
                            memoStore.saveMemo(
                              modelId,
                              editingSlot,
                              editContent.trim()
                            );
                          } else {
                            memoStore.deleteMemo(modelId, editingSlot);
                          }
                          setEditingSlot(null);
                        }}
                        className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-primary text-white text-[13px] hover:bg-primary/80 transition-colors"
                      >
                        <LucideCheck className="w-[14px] h-[14px]" />
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-[16px] z-10 w-full h-full">
                    {memos.map((memo, i) => (
                      <button
                        key={memo.id}
                        onClick={() => {
                          setEditingSlot(i);
                          setEditContent(memo.content);
                        }}
                        className="flex-1 min-h-[140px] h-full rounded-[24px] bg-primary/30 flex flex-col items-center justify-center text-white text-[14px] hover:bg-primary/40 transition-colors p-[16px] gap-[4px]"
                      >
                        {memo.content ? (
                          <span className="line-clamp-6 text-center break-words w-full">
                            {memo.content}
                          </span>
                        ) : (
                          <LucidePlus className="w-[28px] h-[28px] text-white/60" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Report */}
            <section className="flex-1 flex flex-col gap-[16px] min-h-0">
              <div className="flex items-center gap-[16px] shrink-0">
                <LucideFileText
                  className="w-[32px] h-[32px] text-primary"
                  strokeWidth={2}
                />
                <h2 className="font-semibold text-[32px] leading-[1.25] text-primary">
                  Report
                </h2>
              </div>

              <div className="flex-1 relative flex flex-col items-center justify-center gap-[16px] rounded-[24px] bg-gray-30 p-[32px] overflow-hidden">
                <GradientBorder />

                <p className="font-medium text-[16px] leading-[1.5] text-neutral-400 z-10">
                  학습 내용을 PDF로 내보내기
                </p>

                <button
                  onClick={handleDownloadReport}
                  disabled={pdfLoading}
                  className="flex items-center gap-[8px] px-[24px] py-[12px] rounded-[12px] bg-primary text-white font-semibold text-[16px] leading-[1.5] hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors z-10"
                >
                  {pdfLoading ? (
                    <>
                      <Loader2 className="w-[20px] h-[20px] animate-spin" />
                      생성 중...
                    </>
                  ) : (
                    <>
                      <LucideFileText className="w-[20px] h-[20px]" />
                      PDF 다운로드
                    </>
                  )}
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
