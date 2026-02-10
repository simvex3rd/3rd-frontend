"use client";

import { useSignUp, useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle, Sparkles, Check } from "lucide-react";
import { api } from "@/lib/api";
import { GradientBorder } from "@/components/ui/GradientBorder";

const clerkErrorMap: Record<string, string> = {
  "Password has been found in an online data breach. For account safety, please use a different password.":
    "유출된 비밀번호입니다. 보안을 위해 다른 비밀번호를 사용해주세요.",
  "That email address is taken. Please try another.":
    "이미 사용 중인 이메일입니다. 다른 이메일을 입력해주세요.",
  "Password is too weak.":
    "비밀번호가 너무 약합니다. 더 강한 비밀번호를 사용해주세요.",
  "Passwords must be 8 characters or more.":
    "비밀번호는 8자 이상이어야 합니다.",
  "Enter email address.": "이메일을 입력해주세요.",
  "Enter password.": "비밀번호를 입력해주세요.",
  "We were unable to complete a GET request for this Client. No sign up attempt was found. Please try again.":
    "회원가입 세션이 만료되었습니다. 다시 시도해주세요.",
  "Your account is locked. You will be able to try again in 30 minutes.":
    "계정이 잠겼습니다. 30분 후 다시 시도해주세요.",
  "Sign up unsuccessful due to failed security validations":
    "보안 검증에 실패했습니다. 다시 시도해주세요.",
  "Incorrect code": "인증 코드가 올바르지 않습니다.",
  "Verification code expired": "인증 코드가 만료되었습니다. 다시 요청해주세요.",
  "You're already signed in": "이미 로그인되어 있습니다.",
};

function translateClerkError(message: string): string {
  return clerkErrorMap[message] || message;
}

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [oauthLoading, setOAuthLoading] = useState<string | null>(null);
  const [resendCooldown, setResendCooldown] = useState(0);
  const [copied, setCopied] = useState(false);
  const isSubmittingRef = useRef(false);

  const generatePassword = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const digits = "0123456789";
    const special = "!@#$%^&*";
    const all = upper + lower + digits + special;
    // Guarantee at least one of each category
    const required = [
      upper[Math.floor(Math.random() * upper.length)],
      lower[Math.floor(Math.random() * lower.length)],
      digits[Math.floor(Math.random() * digits.length)],
      special[Math.floor(Math.random() * special.length)],
    ];
    const remaining = Array.from(
      { length: 8 },
      () => all[Math.floor(Math.random() * all.length)]
    );
    // Shuffle
    const chars = [...required, ...remaining].sort(() => Math.random() - 0.5);
    const pw = chars.join("");
    setPassword(pw);
    navigator.clipboard.writeText(pw).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  // Redirect already signed-in users to home
  useEffect(() => {
    if (isSignedIn) {
      router.replace("/");
    }
  }, [isSignedIn, router]);

  // Resend code cooldown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [resendCooldown]);

  if (!isLoaded || isSignedIn) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-neutral-950">
        <Loader2 className="h-[32px] w-[32px] animate-spin text-primary" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingRef.current) return;
    isSubmittingRef.current = true;
    setIsLoading(true);
    setError("");

    if (!verifying) {
      try {
        const result = await signUp.create({
          firstName, // Contains full name from input
          lastName: "", // Optional in Clerk, can keep empty
          emailAddress: email,
          password,
        });

        // If sign-up is already complete (e.g. email verification disabled in Clerk dashboard)
        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          try {
            await api.auth.login({
              email,
              username: firstName.trim() || email.split("@")[0],
            });
          } catch {
            console.warn("Backend user sync failed after sign-up");
          }
          router.push("/");
          return;
        }

        // Need email verification
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setVerifying(true);
      } catch (err: unknown) {
        const clerkError = err as { errors?: Array<{ longMessage?: string }> };
        setError(
          translateClerkError(
            clerkError.errors?.[0]?.longMessage ||
              "회원가입 중 오류가 발생했습니다."
          )
        );
      } finally {
        isSubmittingRef.current = false;
        setIsLoading(false);
      }
    } else {
      try {
        const result = await signUp.attemptEmailAddressVerification({
          code,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          // Sync user with backend DB
          try {
            await api.auth.login({
              email,
              username: firstName.trim() || email.split("@")[0],
            });
          } catch {
            console.warn("Backend user sync failed after sign-up");
          }
          router.push("/");
        } else {
          setError("인증이 완료되지 않았습니다.");
        }
      } catch (err: unknown) {
        const clerkError = err as { errors?: Array<{ longMessage?: string }> };
        const msg = clerkError.errors?.[0]?.longMessage || "";
        // Sign-up attempt expired or not found → reset to initial state
        if (
          msg.includes("No sign up attempt was found") ||
          msg.includes("Unable to complete") ||
          msg.includes("Verification code expired")
        ) {
          setVerifying(false);
          setCode("");
          setError("회원가입 세션이 만료되었습니다. 정보를 다시 입력해주세요.");
        } else {
          setError(
            translateClerkError(msg || "유효하지 않은 인증 코드입니다.")
          );
        }
      } finally {
        isSubmittingRef.current = false;
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-[16px] font-sans">
      <div
        className="relative flex w-[375px] flex-col items-center gap-[80px] rounded-[24px] bg-neutral-900 px-[32px] py-[80px]"
        data-node-id="175:748"
      >
        <GradientBorder className="rounded-[24px]" />
        {/* Header - Account Creation */}
        <div className="flex h-[30px] w-full flex-none flex-col items-center justify-center order-0 grow-0 self-stretch">
          <p
            className="text-center font-[Pretendard] text-[24px] font-semibold leading-[1.25] text-neutral-50"
            data-node-id="175:655"
          >
            계정 만들기
          </p>
        </div>

        {/* Form Container */}
        <div className="flex h-auto w-full flex-none flex-col items-start gap-[16px] order-1 grow-0 self-stretch">
          {/* SignUp Form Inputs */}
          <form
            className="flex w-full flex-col items-end justify-center gap-[16px] self-stretch"
            onSubmit={handleSubmit}
          >
            {!verifying ? (
              <>
                {/* Name */}
                <div className="flex flex-col items-start gap-[2px] w-full self-stretch">
                  <div className="h-[24px] w-full relative">
                    <label
                      htmlFor="signup-name"
                      className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-neutral-200"
                    >
                      이름
                    </label>
                  </div>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="홍길동"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                    className="w-full text-black placeholder:text-neutral-300"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col items-start gap-[2px] w-full self-stretch">
                  <div className="h-[24px] w-full relative">
                    <label
                      htmlFor="signup-email"
                      className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-neutral-200"
                    >
                      이메일
                    </label>
                  </div>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="이메일을 입력하세요"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full text-black placeholder:text-neutral-300"
                  />
                </div>

                {/* Password */}
                <div className="flex flex-col items-start gap-[2px] w-full self-stretch">
                  <div className="h-[24px] w-full relative">
                    <label
                      htmlFor="signup-password"
                      className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-neutral-200"
                    >
                      비밀번호
                    </label>
                  </div>
                  <Input
                    id="signup-password"
                    type="password"
                    placeholder="비밀번호를 입력하세요"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={8}
                    maxLength={16}
                    className="w-full text-black placeholder:text-neutral-300"
                  />
                  {password.length > 0 ? (
                    <ul className="flex flex-col gap-[2px] w-full mt-[4px]">
                      {[
                        {
                          met: password.length >= 8 && password.length <= 16,
                          label: "8~16자",
                        },
                        {
                          met: /[A-Z]/.test(password),
                          label: "영문 대문자 포함",
                        },
                        {
                          met: /[a-z]/.test(password),
                          label: "영문 소문자 포함",
                        },
                        { met: /[0-9]/.test(password), label: "숫자 포함" },
                        {
                          met: /[^A-Za-z0-9]/.test(password),
                          label: "특수문자 포함",
                        },
                      ].map((rule) => (
                        <li
                          key={rule.label}
                          className={`font-[Pretendard] text-[12px] leading-[1.5] ${rule.met ? "text-green-400" : "text-neutral-400"}`}
                        >
                          {rule.met ? "\u2713" : "\u2717"} {rule.label}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="w-full font-[Pretendard] text-[12px] font-normal leading-[1.5] text-neutral-300 mt-[2px]">
                      8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
                    </p>
                  )}
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="flex items-center gap-[4px] mt-[4px] font-[Pretendard] text-[12px] text-primary hover:text-primary/80 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="h-[12px] w-[12px]" />
                        클립보드에 복사됨
                      </>
                    ) : (
                      <>
                        <Sparkles className="h-[12px] w-[12px]" />
                        안전한 비밀번호 추천
                      </>
                    )}
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-start gap-[2px] w-full self-stretch">
                <div className="h-[24px] w-full relative">
                  <label
                    htmlFor="signup-code"
                    className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-neutral-200"
                  >
                    인증 코드
                  </label>
                </div>
                <Input
                  id="signup-code"
                  type="text"
                  placeholder="인증 코드를 입력하세요"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  required
                  className="w-full text-center tracking-widest text-black placeholder:text-neutral-300"
                />
                <button
                  type="button"
                  className="w-full text-center font-[Pretendard] text-[12px] text-primary hover:underline mt-2"
                  onClick={() => {
                    setVerifying(false);
                    setError("");
                    setCode("");
                    setPassword("");
                  }}
                >
                  이메일 다시 입력하기
                </button>
                <button
                  type="button"
                  disabled={resendCooldown > 0}
                  className="w-full text-center font-[Pretendard] text-[12px] text-neutral-400 hover:text-primary hover:underline disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={async () => {
                    try {
                      await signUp.prepareEmailAddressVerification({
                        strategy: "email_code",
                      });
                      setResendCooldown(60);
                      setError("");
                    } catch {
                      setError("인증 코드 재전송에 실패했습니다.");
                    }
                  }}
                >
                  {resendCooldown > 0
                    ? `인증 코드 재전송 (${resendCooldown}초)`
                    : "인증 코드 재전송"}
                </button>
              </div>
            )}

            {/* Clerk Bot Protection CAPTCHA mount point */}
            <div id="clerk-captcha" />

            {error && (
              <div
                role="alert"
                className="flex w-full items-center gap-[8px] rounded-[8px] bg-error/10 p-[12px] text-[14px] text-error border-[1px] border-error/20"
              >
                <AlertCircle className="h-[16px] w-[16px] shrink-0" />
                <p>{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="flex h-[40px] w-full flex-none flex-row items-center justify-center gap-[8px] rounded-[8px] bg-primary px-[16px] hover:opacity-90 disabled:opacity-50 transition-opacity"
            >
              {isLoading ? (
                <Loader2 className="h-[20px] w-[20px] animate-spin text-neutral-900" />
              ) : null}
              <p className="font-[Pretendard] text-[16px] font-medium leading-[1.5] text-neutral-900 text-center">
                {verifying ? "이메일 인증" : "계정 만들기"}
              </p>
            </button>
          </form>

          {/* Btn Group */}
          <div className="flex flex-col items-start gap-[4px] w-full self-stretch">
            {/* Login Button (Secondary) */}
            <Link href="/sign-in" className="w-full">
              <button
                type="button"
                className="box-border flex h-[40px] w-full flex-none flex-row items-center justify-center gap-[8px] rounded-[8px] border-[2px] border-primary px-[16px] hover:bg-primary/10 transition-colors"
              >
                <p className="font-[Pretendard] text-[16px] font-medium leading-[1.5] text-primary text-center">
                  로그인
                </p>
              </button>
            </Link>
          </div>

          {!verifying && (
            <>
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
                  onClick={async () => {
                    setOAuthLoading("google");
                    try {
                      await signUp.authenticateWithRedirect({
                        strategy: "oauth_google",
                        redirectUrl: "/sso-callback",
                        redirectUrlComplete: "/sso-callback",
                      });
                    } catch {
                      setOAuthLoading(null);
                      setError(
                        "Google 로그인에 실패했습니다. 다시 시도해주세요."
                      );
                    }
                  }}
                  disabled={oauthLoading !== null}
                  className="flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-white px-[16px] hover:bg-neutral-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {oauthLoading === "google" ? (
                    <Loader2 className="h-[18px] w-[18px] animate-spin text-neutral-900" />
                  ) : (
                    <>
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
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={async () => {
                    setOAuthLoading("github");
                    try {
                      await signUp.authenticateWithRedirect({
                        strategy: "oauth_github",
                        redirectUrl: "/sso-callback",
                        redirectUrlComplete: "/sso-callback",
                      });
                    } catch {
                      setOAuthLoading(null);
                      setError(
                        "GitHub 로그인에 실패했습니다. 다시 시도해주세요."
                      );
                    }
                  }}
                  disabled={oauthLoading !== null}
                  className="flex h-[40px] w-full items-center justify-center gap-[8px] rounded-[8px] bg-neutral-800 border-[1px] border-neutral-700 px-[16px] hover:bg-neutral-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {oauthLoading === "github" ? (
                    <Loader2 className="h-[18px] w-[18px] animate-spin text-neutral-50" />
                  ) : (
                    <>
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 16 16"
                        fill="white"
                      >
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                      </svg>
                      <p className="font-[Pretendard] text-[14px] font-medium text-neutral-50">
                        GitHub로 계속하기
                      </p>
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
