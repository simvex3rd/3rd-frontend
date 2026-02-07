"use client";

import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { Loader2, AlertCircle } from "lucide-react";

export default function SignUpPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const router = useRouter();

  const [lastName, setLastName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#121212]">
        <Loader2 className="h-8 w-8 animate-spin text-[var(--primary-cyan)]" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!verifying) {
      try {
        await signUp.create({
          firstName,
          lastName,
          emailAddress: email,
          password,
        });

        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });

        setVerifying(true);
      } catch (err: unknown) {
        const clerkError = err as { errors?: Array<{ longMessage?: string }> };
        console.error(JSON.stringify(err, null, 2));
        setError(
          clerkError.errors?.[0]?.longMessage ||
            "회원가입 중 오류가 발생했습니다."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      try {
        const result = await signUp.attemptEmailAddressVerification({
          code,
        });

        if (result.status === "complete") {
          await setActive({ session: result.createdSessionId });
          router.push("/");
        } else {
          console.error(JSON.stringify(result, null, 2));
          setError("인증이 완료되지 않았습니다.");
        }
      } catch (err: unknown) {
        const clerkError = err as { errors?: Array<{ longMessage?: string }> };
        console.error(JSON.stringify(err, null, 2));
        setError(
          clerkError.errors?.[0]?.longMessage ||
            "유효하지 않은 인증 코드입니다."
        );
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black px-4 font-sans">
      <div
        className="relative flex w-[375px] md:w-[480px] flex-col items-center gap-[80px] rounded-[24px] bg-[#171717] px-[32px] py-[80px]"
        data-node-id="175:748"
        // Shadow removed per Figma
      >
        {/* Header - Account Creation */}
        <div className="flex h-[30px] w-full flex-none flex-col items-center justify-center order-0 grow-0 self-stretch">
          <p
            className="text-center font-[Pretendard] text-[24px] font-semibold leading-[1.25] text-[#FAFAFA]"
            data-node-id="175:655"
          >
            계정 만들기
          </p>
        </div>

        {/* Frame 30 (Form Container) */}
        <div
          className="flex w-full flex-none flex-col items-start gap-[32px] order-1 grow-0 self-stretch"
          data-node-id="175:747"
        >
          {/* Frame 29 (Inputs) */}
          <div
            className="flex w-full flex-none flex-col items-start gap-[16px] order-0 grow-0 self-stretch"
            data-node-id="175:744"
          >
            {/* Header Link Section (Frame 25) */}
            <div
              className="flex h-[24px] w-full flex-none flex-row items-center justify-center gap-[29px] order-0 grow-0"
              data-node-id="175:724"
            >
              <p
                className="w-auto h-[24px] font-[Pretendard] text-[16px] font-normal leading-[1.5] text-center text-[#FFFFFF]"
                data-node-id="175:658"
              >
                이전에 생성한 계정이 있으신가요?
              </p>
              <div
                className="w-[48px] h-[24px] order-1 grow-0 relative"
                data-node-id="175:659"
              >
                <Link
                  href="/sign-in"
                  className="absolute inset-0 font-[Pretendard] text-[16px] font-normal leading-[1.5] text-center underline text-[#D4D4D4] hover:text-white transition-colors"
                >
                  로그인
                </Link>
              </div>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full flex-col items-start gap-[16px] self-stretch order-1"
              data-node-id="175:743"
            >
              {!verifying ? (
                <>
                  {/* Name Split (Frame 27) */}
                  <div
                    className="flex w-full flex-none flex-row items-center gap-[8px] order-0 grow-0 self-stretch"
                    data-node-id="175:742"
                  >
                    {/* Last Name */}
                    <div
                      className="flex flex-1 flex-col items-start gap-[2px] grow-0"
                      data-node-id="175:694"
                    >
                      <div className="h-[24px] w-[40px] relative">
                        <label className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-[#E5E5E5]">
                          성
                        </label>
                      </div>
                      <Input
                        type="text"
                        placeholder="성"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                    {/* First Name */}
                    <div
                      className="flex flex-1 flex-col items-start gap-[2px] grow-1"
                      data-node-id="175:704"
                    >
                      <div className="h-[24px] w-[40px] relative">
                        <label className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-[#E5E5E5]">
                          이름
                        </label>
                      </div>
                      <Input
                        type="text"
                        placeholder="이름"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div
                    className="flex w-full flex-none flex-col items-start gap-[2px] order-0 grow-0 self-stretch"
                    data-node-id="175:670"
                  >
                    <div className="h-[24px] w-[40px] relative">
                      <label className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-[#E5E5E5]">
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

                  {/* Password */}
                  <div
                    className="flex w-full flex-none flex-col items-start gap-[2px] order-1 grow-0 self-stretch"
                    data-node-id="175:685"
                  >
                    <div className="h-[24px] w-[40px] relative">
                      <label className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-[#E5E5E5]">
                        비밀번호
                      </label>
                    </div>
                    <Input
                      type="password"
                      placeholder="비밀번호를 입력하세요"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full"
                    />
                    <p className="w-full font-[Pretendard] text-[12px] font-normal leading-[1.5] text-[#D4D4D4] mt-[2px]">
                      8~16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
                    </p>
                  </div>
                </>
              ) : (
                <div className="flex w-full flex-none flex-col items-start gap-[2px] order-0 grow-0 self-stretch">
                  <div className="h-[24px] w-full relative">
                    <label className="absolute inset-0 font-[Pretendard] text-[16px] font-medium leading-[1.5] text-[#E5E5E5]">
                      인증 코드
                    </label>
                  </div>
                  <Input
                    type="text"
                    placeholder="인증 코드를 입력하세요"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    required
                    className="w-full text-center tracking-widest"
                  />
                  <button
                    type="button"
                    className="w-full text-center font-[Pretendard] text-[12px] text-[#02EEE1] hover:underline mt-2"
                    onClick={() => setVerifying(false)}
                  >
                    이메일 다시 입력하기
                  </button>
                </div>
              )}

              {error && (
                <div className="flex w-full items-center gap-2 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <p>{error}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex h-[40px] w-full flex-none flex-row items-center justify-center gap-[8px] rounded-[8px] bg-[#02EEE1] px-[16px] self-stretch hover:opacity-90 disabled:opacity-50 mt-0 transition-opacity"
                data-node-id="175:679"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin text-white" />
                ) : null}
                <p className="font-[Pretendard] text-[16px] font-medium leading-[1.5] text-white text-center">
                  {verifying ? "이메일 인증" : "계정 만들기"}
                </p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
