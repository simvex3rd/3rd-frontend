"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

interface QuizOption {
  id: string;
  text: string;
}

interface Quiz {
  question: string;
  options: QuizOption[];
  correctAnswer: string;
}

interface QuizPanelProps {
  quiz: Quiz;
  onComplete?: (isCorrect: boolean) => void;
}

export function QuizPanel({ quiz, onComplete }: QuizPanelProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  const handleSubmit = () => {
    if (!selectedAnswer) return;

    const correct = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(correct);
    setIsSubmitted(true);
    onComplete?.(correct);
  };

  return (
    <div className="bg-[rgba(64,64,64,0.7)] rounded-[24px] p-[24px] max-w-[500px]">
      <h3 className="text-[24px] font-semibold text-primary mb-[16px]">
        {quiz.question}
      </h3>

      <div className="space-y-[12px] mb-[24px]">
        {quiz.options.map((option) => (
          <button
            key={option.id}
            onClick={() => !isSubmitted && setSelectedAnswer(option.id)}
            disabled={isSubmitted}
            className={cn(
              "w-full p-[16px] rounded-[16px] border-[2px] text-left transition-all",
              selectedAnswer === option.id
                ? "bg-primary/30 border-primary"
                : "bg-transparent border-gray-600 hover:border-gray-400",
              isSubmitted &&
                option.id === quiz.correctAnswer &&
                "border-green-500 bg-green-500/20",
              isSubmitted &&
                option.id === selectedAnswer &&
                option.id !== quiz.correctAnswer &&
                "border-red-500 bg-red-500/20"
            )}
          >
            <span className="text-white">{option.text}</span>
          </button>
        ))}
      </div>

      {!isSubmitted ? (
        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer}
          className="w-full px-[24px] py-[12px] bg-primary text-black rounded-[16px] font-semibold hover:opacity-80 disabled:opacity-50"
        >
          제출
        </button>
      ) : (
        <div
          className={cn(
            "p-[16px] rounded-[16px] text-center font-semibold",
            isCorrect
              ? "bg-green-500/30 text-green-400"
              : "bg-red-500/30 text-red-400"
          )}
        >
          {isCorrect ? "✓ 정답입니다!" : "✗ 오답입니다. 다시 시도해보세요."}
        </div>
      )}
    </div>
  );
}
