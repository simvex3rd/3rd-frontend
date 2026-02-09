"use client";

import { useRef } from "react";
import { motion, useDragControls } from "motion/react";
import { cn } from "@/lib/utils";
import { LucideX } from "lucide-react";

interface DraggablePanelProps {
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  defaultPosition?: { x: number; y: number };
  width?: number;
  height?: number;
  className?: string;
}

export function DraggablePanel({
  title,
  onClose,
  children,
  defaultPosition = { x: 0, y: 0 },
  width = 400,
  height,
  className,
}: DraggablePanelProps) {
  const constraintsRef = useRef<HTMLDivElement>(null);
  const dragControls = useDragControls();

  return (
    <>
      {/* Invisible full-viewport drag constraints layer */}
      <div
        ref={constraintsRef}
        className="fixed inset-0 pointer-events-none z-40"
      />

      <motion.div
        drag
        dragControls={dragControls}
        dragListener={false}
        dragMomentum={false}
        dragConstraints={constraintsRef}
        initial={{
          opacity: 0,
          scale: 0.95,
          x: defaultPosition.x,
          y: defaultPosition.y,
        }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "fixed z-50 flex flex-col",
          "bg-gray-30 border-[3px] border-primary rounded-[24px]",
          "backdrop-blur-md shadow-card-glow",
          className
        )}
        style={{
          width: `${width}px`,
          ...(height ? { height: `${height}px` } : {}),
        }}
      >
        {/* Drag Handle Header */}
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="shrink-0 flex items-center justify-between px-[20px] py-[14px] cursor-grab active:cursor-grabbing bg-neutral-700 rounded-t-[21px] select-none"
          style={{ touchAction: "none" }}
        >
          <h2 className="font-semibold text-[16px] leading-[1.5] text-primary truncate">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-neutral-50 transition-colors p-[4px] -mr-[4px]"
            aria-label={`Close ${title}`}
          >
            <LucideX className="w-[18px] h-[18px]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {children}
        </div>
      </motion.div>
    </>
  );
}
