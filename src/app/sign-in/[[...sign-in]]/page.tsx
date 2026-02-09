"use client";

import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";
import { api } from "@/lib/api";
import { GradientBorder } from "@/components/ui/GradientBorder";

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
        // Sync user with backend DB
        try {
          const clerkEmail = result.identifier || email;
          await api.auth.login({
            email: clerkEmail,
            username: clerkEmail.split("@")[0],
          });
        } catch {
          // Backend sync failure is non-blocking
          console.warn("Backend user sync failed after sign-in");
        }
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
        <GradientBorder className="rounded-[24px]" />
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
          </form>

          {error && (
            <div className="flex w-full items-center gap-[8px] rounded-[8px] bg-error/10 p-[12px] text-[14px] text-error border-[1px] border-error/20">
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

          {/* OAuth Divider */}
          <div className="flex w-full items-center gap-[12px]">
            <div className="flex-1 h-[1px] bg-neutral-700" />
            <p className="font-[Pretendard] text-[14px] text-neutral-400">
              또는
            </p>
            <div className="flex-1 h-[1px] bg-neutral-700" />
          </div>

          {/* OAuth Buttons */}
          <div className="flex flex-col gap-[8px] w-full">
            <button
              type="button"
              onClick={() =>
                signIn.authenticateWithRedirect({
                  strategy: "oauth_google",
                  redirectUrl: "/sso-callback",
                  redirectUrlComplete: "/",
                })
              }
              className="flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-white px-[16px] hover:bg-neutral-100 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                  fill="#4285F4"
                />
                <path
                  d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                  fill="#34A853"
                />
                <path
                  d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.997 8.997 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                  fill="#FBBC05"
                />
                <path
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                  fill="#EA4335"
                />
              </svg>
              <p className="font-[Pretendard] text-[14px] font-medium text-neutral-900">
                Google로 계속하기
              </p>
            </button>

            <button
              type="button"
              onClick={() =>
                signIn.authenticateWithRedirect({
                  strategy: "oauth_github",
                  redirectUrl: "/sso-callback",
                  redirectUrlComplete: "/",
                })
              }
              className="flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-neutral-800 border-[1px] border-neutral-700 px-[16px] hover:bg-neutral-700 transition-colors"
            >
              <svg width="18" height="18" viewBox="0 0 16 16" fill="white">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
              </svg>
              <p className="font-[Pretendard] text-[14px] font-medium text-neutral-50">
                GitHub로 계속하기
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
