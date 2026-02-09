import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background gap-[24px]">
      <p className="font-[Pretendard] text-[120px] font-bold leading-none text-neutral-800">
        404
      </p>
      <p className="font-[Pretendard] text-[20px] text-neutral-400">
        Page not found
      </p>
      <Link
        href="/"
        className="mt-[8px] rounded-[8px] bg-primary px-[24px] py-[10px] font-[Pretendard] text-[16px] font-medium text-neutral-900 hover:opacity-90 transition-opacity"
      >
        Go Home
      </Link>
    </div>
  );
}
