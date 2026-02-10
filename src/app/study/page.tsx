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
  LucideBrain,
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
import { toast } from "@/hooks/use-toast";
import { withRetry } from "@/lib/api/retry";
import { useSceneStore } from "@/stores/scene-store";
import { useMemoStore } from "@/stores/memo-store";
import { QuizModal } from "@/components/panels/QuizModal";

const QUICK_ACTIONS = [
  { label: "학습에 관한 도움받기", action: "help" },
  { label: "부품 정보 불러오기", action: "parts" },
] as const;

async function downloadReport(modelId: string) {
  const model = await withRetry(() => api.models.getDetail(modelId));
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
  const [editingMemoId, setEditingMemoId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [showQuiz, setShowQuiz] = useState(false);
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
      toast.success("PDF 다운로드 완료");
    } catch (err) {
      console.error("Report generation failed:", err);
      toast.error("PDF 생성 실패", "잠시 후 다시 시도해주세요");
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
      const messages: Record<string, string> = {
        help: "학습에 관한 도움을 받고 싶어요",
        parts: "현재 모델의 부품 정보를 알려주세요",
      };
      const msg = messages[action];
      if (msg) handleSendMessage(msg);
    },
    [handleSendMessage]
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

              <div className="flex-1 relative flex items-center rounded-[24px] bg-gray-30 p-[24px] overflow-hidden">
                <GradientBorder />

                {editingMemoId !== null ? (
                  <div className="flex flex-col gap-[12px] w-full h-full z-10">
                    <textarea
                      autoFocus
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Escape") setEditingMemoId(null);
                      }}
                      placeholder="메모를 입력하세요..."
                      className="w-full flex-1 min-h-[100px] rounded-[12px] bg-neutral-800 border border-neutral-700 text-white text-[14px] p-[12px] resize-none focus:outline-none focus:border-primary"
                    />
                    <div className="flex justify-end gap-[8px]">
                      <button
                        onClick={() => setEditingMemoId(null)}
                        className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-neutral-700 text-neutral-300 text-[13px] hover:bg-neutral-600 transition-colors"
                      >
                        <LucideX className="w-[14px] h-[14px]" />
                        취소
                      </button>
                      <button
                        onClick={() => {
                          if (editContent.trim()) {
                            if (editingMemoId === "__new__") {
                              memoStore.addMemo(modelId, editContent.trim());
                            } else {
                              memoStore.updateMemo(
                                modelId,
                                editingMemoId,
                                editContent.trim()
                              );
                            }
                          }
                          setEditingMemoId(null);
                        }}
                        className="flex items-center gap-[4px] px-[12px] py-[6px] rounded-[8px] bg-primary text-white text-[13px] hover:bg-primary/80 transition-colors"
                      >
                        <LucideCheck className="w-[14px] h-[14px]" />
                        저장
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-[8px] z-10 w-full h-full overflow-y-auto pr-[4px]">
                    {memos.map((memo) => (
                      <div
                        key={memo.id}
                        className="relative group flex items-start gap-[12px] rounded-[12px] bg-neutral-800 border-l-[3px] border-primary/60 px-[14px] py-[10px] cursor-pointer hover:bg-neutral-750 hover:border-primary transition-colors"
                        onClick={() => {
                          setEditingMemoId(memo.id);
                          setEditContent(memo.content);
                        }}
                      >
                        <span className="flex-1 text-[13px] text-neutral-300 leading-[1.5] line-clamp-2 break-words">
                          {memo.content}
                        </span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            memoStore.deleteMemo(modelId, memo.id);
                          }}
                          className="shrink-0 w-[18px] h-[18px] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-neutral-500 hover:text-error"
                          aria-label="Delete memo"
                        >
                          <LucideX className="w-[12px] h-[12px]" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditingMemoId("__new__");
                        setEditContent("");
                      }}
                      className="flex items-center justify-center gap-[6px] rounded-[12px] border border-dashed border-neutral-600 px-[14px] py-[8px] text-neutral-500 text-[13px] hover:border-primary/60 hover:text-primary/80 transition-colors"
                    >
                      <LucidePlus className="w-[14px] h-[14px]" />
                      메모 추가
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* Report + Quiz (1:1) */}
            <div className="flex gap-[24px] min-h-0">
              {/* Report */}
              <section className="flex-1 flex flex-col gap-[16px]">
                <div className="flex items-center gap-[12px] shrink-0">
                  <LucideFileText
                    className="w-[28px] h-[28px] text-primary"
                    strokeWidth={2}
                  />
                  <h2 className="font-semibold text-[24px] leading-[1.25] text-primary">
                    Report
                  </h2>
                </div>

                <button
                  onClick={handleDownloadReport}
                  disabled={pdfLoading}
                  className="flex-1 relative flex flex-col items-center justify-center gap-[12px] rounded-[24px] bg-gray-30 p-[24px] overflow-hidden hover:bg-neutral-800/80 transition-colors cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <GradientBorder />
                  {pdfLoading ? (
                    <Loader2 className="w-[32px] h-[32px] animate-spin text-primary z-10" />
                  ) : (
                    <LucideFileText className="w-[32px] h-[32px] text-primary z-10" />
                  )}
                  <p className="font-medium text-[14px] text-neutral-400 z-10">
                    {pdfLoading ? "생성 중..." : "PDF 내보내기"}
                  </p>
                </button>
              </section>

              {/* Quiz */}
              <section className="flex-1 flex flex-col gap-[16px]">
                <div className="flex items-center gap-[12px] shrink-0">
                  <LucideBrain
                    className="w-[28px] h-[28px] text-primary"
                    strokeWidth={2}
                  />
                  <h2 className="font-semibold text-[24px] leading-[1.25] text-primary">
                    Quiz
                  </h2>
                </div>

                <button
                  onClick={() => setShowQuiz(true)}
                  className="flex-1 relative flex flex-col items-center justify-center gap-[12px] rounded-[24px] bg-gray-30 p-[24px] overflow-hidden hover:bg-neutral-800/80 transition-colors cursor-pointer"
                >
                  <GradientBorder />
                  <LucideBrain className="w-[32px] h-[32px] text-primary z-10" />
                  <p className="font-medium text-[14px] text-neutral-400 z-10">
                    학습 퀴즈 풀기
                  </p>
                </button>
              </section>
            </div>
          </div>
        </div>
      </main>

      {showQuiz && (
        <QuizModal modelId={modelId} onClose={() => setShowQuiz(false)} />
      )}
    </div>
  );
}
