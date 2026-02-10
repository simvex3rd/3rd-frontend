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
import { toast } from "@/hooks/use-toast";
import { withRetry } from "@/lib/api/retry";
import { useSceneStore } from "@/stores/scene-store";
import { useMemoStore } from "@/stores/memo-store";

const QUICK_ACTIONS = [
  { label: "학습에 관한 도움받기", action: "help" },
  { label: "학습 내용 바탕의 퀴즈", action: "quiz" },
  { label: "부품 정보 불러오기", action: "parts" },
  { label: "PDF 리포트 출력", action: "pdf" },
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
                  <div className="flex gap-[12px] z-10 w-full h-full overflow-x-auto">
                    {memos.map((memo) => (
                      <div
                        key={memo.id}
                        className="relative group shrink-0 w-[160px] h-full min-h-[120px] rounded-[16px] bg-primary/30 flex flex-col items-center justify-center text-white text-[14px] hover:bg-primary/40 transition-colors p-[14px] cursor-pointer"
                        onClick={() => {
                          setEditingMemoId(memo.id);
                          setEditContent(memo.content);
                        }}
                      >
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            memoStore.deleteMemo(modelId, memo.id);
                          }}
                          className="absolute top-[8px] right-[8px] w-[20px] h-[20px] rounded-full bg-neutral-800/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-error/80"
                          aria-label="Delete memo"
                        >
                          <LucideX className="w-[12px] h-[12px]" />
                        </button>
                        <span className="line-clamp-5 text-center break-words w-full text-[13px]">
                          {memo.content}
                        </span>
                      </div>
                    ))}
                    <button
                      onClick={() => {
                        setEditingMemoId("__new__");
                        setEditContent("");
                      }}
                      className="shrink-0 w-[120px] h-full min-h-[120px] rounded-[16px] border-[2px] border-dashed border-primary/40 flex items-center justify-center hover:border-primary/70 hover:bg-primary/10 transition-colors"
                    >
                      <LucidePlus className="w-[28px] h-[28px] text-primary/60" />
                    </button>
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
