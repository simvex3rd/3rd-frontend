"use client";

import { useState } from "react";

export function MemoPanel() {
  const [memo, setMemo] = useState("");

  return (
    <div className="flex flex-col h-full p-[20px] gap-[12px]">
      <p className="font-medium text-[13px] text-neutral-400">Memo</p>
      <textarea
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
        placeholder="메모를 입력하세요..."
        className="flex-1 w-full bg-transparent text-neutral-50 text-[14px] leading-[1.6] placeholder:text-neutral-500 resize-none outline-none"
      />
      <p className="text-[11px] text-neutral-500 text-right">
        {memo.length} chars
      </p>
    </div>
  );
}
