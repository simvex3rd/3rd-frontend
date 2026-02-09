import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-[16px] py-[80px]">
      <div className="w-full max-w-[720px] space-y-[32px]">
        <h1 className="font-[Pretendard] text-[32px] font-bold text-neutral-50">
          Terms of Service
        </h1>
        <p className="font-[Pretendard] text-[14px] text-neutral-400">
          Last updated: February 2025
        </p>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            1. Service Description
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            SIMVEX is an educational 3D simulation platform designed for
            learning mechanical engineering concepts through interactive 3D
            models and AI-assisted study tools.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            2. Acceptable Use
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            This platform is intended for educational purposes. Users agree not
            to misuse the service, attempt unauthorized access, or use the
            platform for any commercial purpose without prior consent.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            3. Intellectual Property
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            All 3D models, UI designs, and platform code are the property of the
            SIMVEX team. Users retain ownership of their study notes and chat
            content created within the platform.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            4. Limitation of Liability
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            SIMVEX is provided &quot;as is&quot; without warranty of any kind.
            The development team is not liable for any damages arising from the
            use of this platform. AI-generated content may contain inaccuracies
            and should not be relied upon as authoritative.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            5. Changes to Terms
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.6] text-neutral-300">
            We reserve the right to update these terms at any time. Continued
            use of the platform constitutes acceptance of revised terms.
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
