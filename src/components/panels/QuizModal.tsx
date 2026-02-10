"use client";

import { useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  LucideX,
  LucideCheck,
  LucideChevronRight,
  Loader2,
} from "lucide-react";
import { api } from "@/lib/api";
import type {
  QuizGenerateResponse,
  QuizQuestionResponse,
  QuizSubmitResponse,
} from "@/types/api";

interface QuizModalProps {
  modelId: string;
  onClose: () => void;
}

type Phase = "loading" | "quiz" | "submitting" | "result" | "error";

export function QuizModal({ modelId, onClose }: QuizModalProps) {
  const [phase, setPhase] = useState<Phase>("loading");
  const [quizData, setQuizData] = useState<QuizGenerateResponse | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [result, setResult] = useState<QuizSubmitResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState("");

  // Generate quiz on mount
  const hasStarted = useState(() => {
    api.quiz
      .generate(modelId, { count: 5 })
      .then((data) => {
        setQuizData(data);
        setPhase("quiz");
      })
      .catch((err) => {
        setErrorMsg(err.message ?? "퀴즈 생성에 실패했습니다");
        setPhase("error");
      });
    return true;
  })[0];
  void hasStarted;

  const questions = quizData?.questions ?? [];
  const current: QuizQuestionResponse | undefined = questions[currentIdx];
  const totalQ = questions.length;
  const answeredCount = Object.keys(answers).length;

  const handleSelect = useCallback(
    (optionText: string) => {
      if (!current || phase !== "quiz") return;
      setAnswers((prev) => ({ ...prev, [current.id]: optionText }));
    },
    [current, phase]
  );

  const handleNext = useCallback(() => {
    if (currentIdx < totalQ - 1) {
      setCurrentIdx((i) => i + 1);
    }
  }, [currentIdx, totalQ]);

  const handlePrev = useCallback(() => {
    if (currentIdx > 0) {
      setCurrentIdx((i) => i - 1);
    }
  }, [currentIdx]);

  const handleSubmit = useCallback(async () => {
    if (!quizData) return;
    setPhase("submitting");
    try {
      const payload = questions.map((q) => ({
        question_id: q.id,
        answer: answers[q.id] ?? "",
      }));
      const res = await api.quiz.submit(quizData.quiz_id, payload);
      setResult(res);
      setPhase("result");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "채점에 실패했습니다");
      setPhase("error");
    }
  }, [quizData, questions, answers]);

  const resultMap = new Map(
    result?.results.map((r) => [r.question_id, r]) ?? []
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="relative w-[640px] max-h-[80vh] rounded-[24px] bg-neutral-900 border border-neutral-700 shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-[24px] py-[16px] border-b border-neutral-700">
          <h2 className="font-semibold text-[20px] text-primary">
            {phase === "result" ? "퀴즈 결과" : "학습 퀴즈"}
          </h2>
          <button
            onClick={onClose}
            className="p-[6px] rounded-[8px] text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors"
            aria-label="Close quiz"
          >
            <LucideX className="w-[20px] h-[20px]" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-[24px]">
          {/* Loading */}
          {(phase === "loading" || phase === "submitting") && (
            <div className="flex flex-col items-center justify-center gap-[16px] py-[60px]">
              <Loader2 className="w-[36px] h-[36px] animate-spin text-primary" />
              <p className="text-neutral-400 text-[14px]">
                {phase === "loading"
                  ? "퀴즈를 생성하고 있어요..."
                  : "채점 중..."}
              </p>
            </div>
          )}

          {/* Error */}
          {phase === "error" && (
            <div className="flex flex-col items-center justify-center gap-[16px] py-[60px]">
              <p className="text-error text-[14px]">{errorMsg}</p>
              <button
                onClick={onClose}
                className="px-[16px] py-[8px] rounded-[8px] bg-neutral-700 text-white text-[13px] hover:bg-neutral-600 transition-colors"
              >
                닫기
              </button>
            </div>
          )}

          {/* Quiz questions */}
          {phase === "quiz" && current && (
            <div className="flex flex-col gap-[20px]">
              {/* Progress */}
              <div className="flex items-center justify-between">
                <span className="text-neutral-400 text-[13px]">
                  {currentIdx + 1} / {totalQ}
                </span>
                <span className="text-neutral-500 text-[12px]">
                  {answeredCount}문제 답변 완료
                </span>
              </div>

              {/* Progress bar */}
              <div className="h-[4px] rounded-full bg-neutral-700 overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{
                    width: `${((currentIdx + 1) / totalQ) * 100}%`,
                  }}
                />
              </div>

              {/* Question */}
              <h3 className="font-semibold text-[18px] text-white leading-[1.4]">
                {current.question}
              </h3>

              {/* Options */}
              <div className="flex flex-col gap-[10px]">
                {current.options.map((opt, idx) => {
                  const isSelected = answers[current.id] === opt;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(opt)}
                      className={cn(
                        "w-full p-[14px] rounded-[12px] border-[2px] text-left transition-all text-[14px]",
                        isSelected
                          ? "bg-primary/20 border-primary text-white"
                          : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:border-neutral-500"
                      )}
                    >
                      <span className="font-medium text-neutral-500 mr-[8px]">
                        {String.fromCharCode(65 + idx)}.
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Result */}
          {phase === "result" && result && (
            <div className="flex flex-col gap-[20px]">
              {/* Score */}
              <div className="flex flex-col items-center gap-[8px] py-[16px]">
                <span className="text-[48px] font-bold text-primary">
                  {result.score}/{result.total}
                </span>
                <span className="text-neutral-400 text-[14px]">
                  {result.score === result.total
                    ? "완벽해요!"
                    : result.score >= result.total / 2
                      ? "잘했어요!"
                      : "다시 도전해보세요!"}
                </span>
              </div>

              {/* Per-question review */}
              <div className="flex flex-col gap-[12px]">
                {questions.map((q, idx) => {
                  const r = resultMap.get(q.id);
                  const userAnswer = answers[q.id];
                  return (
                    <div
                      key={q.id}
                      className={cn(
                        "p-[14px] rounded-[12px] border-[2px]",
                        r?.correct
                          ? "border-success/40 bg-success/10"
                          : "border-error/40 bg-error/10"
                      )}
                    >
                      <div className="flex items-start gap-[8px]">
                        <span
                          className={cn(
                            "shrink-0 mt-[2px]",
                            r?.correct ? "text-success" : "text-error"
                          )}
                        >
                          {r?.correct ? (
                            <LucideCheck className="w-[16px] h-[16px]" />
                          ) : (
                            <LucideX className="w-[16px] h-[16px]" />
                          )}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="text-[13px] text-neutral-300 mb-[4px]">
                            Q{idx + 1}. {q.question}
                          </p>
                          <p className="text-[12px] text-neutral-400">
                            내 답: {userAnswer || "(미답변)"}
                          </p>
                          {!r?.correct && r?.correct_answer && (
                            <p className="text-[12px] text-success mt-[2px]">
                              정답: {r.correct_answer}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        {phase === "quiz" && (
          <div className="flex items-center justify-between px-[24px] py-[16px] border-t border-neutral-700">
            <button
              onClick={handlePrev}
              disabled={currentIdx === 0}
              className="px-[16px] py-[8px] rounded-[8px] bg-neutral-700 text-neutral-300 text-[13px] hover:bg-neutral-600 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
            >
              이전
            </button>

            <div className="flex gap-[8px]">
              {currentIdx < totalQ - 1 ? (
                <button
                  onClick={handleNext}
                  className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-[8px] bg-primary text-white text-[13px] hover:bg-primary/80 transition-colors"
                >
                  다음
                  <LucideChevronRight className="w-[14px] h-[14px]" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={answeredCount === 0}
                  className="flex items-center gap-[4px] px-[16px] py-[8px] rounded-[8px] bg-primary text-white text-[13px] hover:bg-primary/80 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <LucideCheck className="w-[14px] h-[14px]" />
                  제출하기 ({answeredCount}/{totalQ})
                </button>
              )}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="flex items-center justify-center px-[24px] py-[16px] border-t border-neutral-700">
            <button
              onClick={onClose}
              className="px-[24px] py-[10px] rounded-[8px] bg-primary text-white text-[14px] font-medium hover:bg-primary/80 transition-colors"
            >
              닫기
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
