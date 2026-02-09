import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-[16px] py-[80px]">
      <div className="w-full max-w-[720px] space-y-[32px]">
        <h1 className="font-[Pretendard] text-[32px] font-bold text-neutral-50">
          Privacy Policy
        </h1>
        <p className="font-[Pretendard] text-[14px] text-neutral-400">
          Last updated: February 2025
        </p>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            1. Information We Collect
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            SIMVEX collects minimal personal information necessary for
            authentication and service operation: email address, display name,
            and OAuth provider profile data (Google, GitHub) when you sign in.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            2. How We Use Your Information
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            Your information is used solely to provide authentication, save your
            study notes, and maintain chat session history within the platform.
            We do not sell or share your data with third parties for marketing
            purposes.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            3. Third-Party Services
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            We use Clerk for authentication and Vercel for hosting. These
            services may collect technical data (IP address, browser type) as
            described in their respective privacy policies.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            4. Data Retention
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            Your data is retained for the duration of the project. You may
            request deletion of your account and associated data at any time by
            contacting the development team.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            5. Contact
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            For privacy-related inquiries, please contact the SIMVEX team via
            the project repository.
          </p>
        </section>

        <div className="pt-[16px]">
          <Link
            href="/"
            className="font-[Pretendard] text-[14px] text-primary hover:underline"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
