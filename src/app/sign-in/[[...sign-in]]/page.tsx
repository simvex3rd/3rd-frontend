"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

export default function SignInPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <Loader2 className="h-[32px] w-[32px] animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push("/");
      } else {
        setError("로그인에 실패했습니다. 다시 시도해주세요.");
      }
    } catch (err: unknown) {
      const clerkError = err as { errors?: Array<{ longMessage?: string }> };
      setError(clerkError.errors?.[0]?.longMessage || "오류가 발생했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background px-[16px] font-sans">
      <div
        className="relative flex w-[375px] flex-col items-center gap-[80px] rounded-[24px] bg-neutral-900 px-[32px] py-[80px]"
        data-node-id="160:1146"
        // Shadow removed as per Figma design (flat design)
      >
        {/* Header - Login */}
        <div className="flex h-[30px] w-full flex-none flex-col items-center justify-center order-0 grow-0 self-stretch">
          <p
            className="text-center font-[Pretendard] text-[24px] font-semibold leading-[1.25] text-neutral-50"
            data-node-id="160:1144"
          >
            로그인
          </p>
        </div>

        {/* Form Container */}
        <div
          className="flex h-auto w-full flex-none flex-col items-start gap-[16px] order-1 grow-0 self-stretch"
          data-node-id="160:1145"
        >
          {/* Login Form Inputs */}
          <form
            onSubmit={handleSubmit}
            className="flex w-full flex-col items-end justify-center gap-[4px] self-stretch"
          >
            {/* Email Field */}
            <div
              className="flex flex-col items-start gap-[2px] w-full self-stretch"
              data-node-id="160:945"
            >
              <div className="h-[24px] w-full relative">
                <label className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-neutral-200">
                  이메일
                </label>
              </div>
              <Input
                type="email"
                placeholder="이메일을 입력하세요"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Password Field */}
            <div
              className="flex flex-col items-start gap-[2px] w-full self-stretch"
              data-node-id="160:955"
            >
              <div className="h-[24px] w-full relative">
                <label className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-neutral-200">
                  비밀번호
                </label>
              </div>
              <Input
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full"
              />
            </div>

            {/* Forgot Password Link */}
            <div
              className="h-[24px] w-full relative mt-[0px]"
              data-node-id="160:1109"
            >
              <Link
                href="/forgot-password"
                className="absolute inset-0 font-[Pretendard] text-[16px] font-normal leading-[1.5] text-neutral-200 text-right hover:text-neutral-50 transition-colors"
              >
                아이디/비밀번호 찾기
              </Link>
            </div>
          </form>

          {error && (
            <div className="flex w-full items-center gap-[8px] rounded-lg bg-error/10 p-[12px] text-[14px] text-error border-[1px] border-error/20">
              <AlertCircle className="h-[16px] w-[16px] shrink-0" />
              <p>{error}</p>
            </div>
          )}

          {/* Btn Group */}
          <div
            className="flex flex-col items-start gap-[4px] w-full self-stretch"
            data-node-id="160:1143"
          >
            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex h-[40px] w-full flex-none flex-row items-center justify-center gap-[8px] rounded-[8px] bg-primary px-[16px] hover:opacity-90 disabled:opacity-50 transition-opacity"
              data-node-id="160:1087"
            >
              {isLoading ? (
                <Loader2 className="h-[20px] w-[20px] animate-spin text-neutral-900" />
              ) : null}
              <p className="font-[Pretendard] text-[16px] font-medium leading-[1.5] text-neutral-900 text-center">
                로그인
              </p>
            </button>

            {/* Create Account Button */}
            <Link href="/sign-up" className="w-full">
              <button
                type="button"
                className="box-border flex h-[40px] w-full flex-none flex-row items-center justify-center gap-[8px] rounded-[8px] border-[2px] border-primary px-[16px] hover:bg-primary/10 transition-colors"
                data-node-id="160:1093"
              >
                <p className="font-[Pretendard] text-[16px] font-medium leading-[1.5] text-primary text-center">
                  계정 만들기
                </p>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
