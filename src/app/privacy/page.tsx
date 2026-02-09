import Link from "next/link";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-[16px] py-[80px]">
      <div className="w-full max-w-[720px] space-y-[32px]">
        <div className="space-y-[8px]">
          <h1 className="font-[Pretendard] text-[32px] font-bold text-neutral-50">
            개인정보처리방침
          </h1>
          <p className="font-[Pretendard] text-[14px] text-neutral-500">
            최종 수정일: 2026년 2월 10일
          </p>
        </div>

        <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
          SIMVEX(이하 &quot;서비스&quot;)는 이용자의 개인정보를 중요시하며, 관련
          법령을 준수합니다. 본 방침은 서비스가 수집하는 개인정보의 항목, 이용
          목적, 보관 기간 등을 안내합니다.
        </p>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            1. 수집하는 개인정보
          </h2>
          <ul className="list-disc pl-[20px] space-y-[6px] font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            <li>
              이메일 주소, 표시 이름 (회원가입 시 직접 입력 또는 OAuth
              제공자로부터 수신)
            </li>
            <li>OAuth 프로필 정보 (Google, GitHub 소셜 로그인 이용 시)</li>
            <li>서비스 이용 기록, 접속 로그, IP 주소 (자동 수집)</li>
          </ul>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            2. 개인정보의 이용 목적
          </h2>
          <ul className="list-disc pl-[20px] space-y-[6px] font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            <li>회원 인증 및 로그인 상태 유지</li>
            <li>학습 노트 저장 및 AI 채팅 세션 관리</li>
            <li>서비스 개선을 위한 통계 분석 (비식별 처리)</li>
          </ul>
          <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            수집된 정보는 상기 목적 외의 용도로 사용되지 않으며, 마케팅 목적의
            제3자 제공은 일체 하지 않습니다.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            3. 제3자 서비스
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            본 서비스는 인증을 위해 Clerk, 호스팅을 위해 Vercel, 접속 분석을
            위해 Vercel Analytics를 사용합니다. 해당 서비스들은 각자의
            개인정보처리방침에 따라 기술적 데이터를 수집할 수 있습니다.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            4. 보관 기간 및 파기
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            개인정보는 서비스 운영 기간 동안 보관되며, 프로젝트 종료 시 지체
            없이 파기됩니다. 이용자는 언제든지 계정 삭제 및 데이터 삭제를 요청할
            수 있습니다.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            5. 이용자의 권리
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            이용자는 자신의 개인정보에 대해 열람, 정정, 삭제를 요청할 권리가
            있습니다. 관련 문의는 프로젝트 저장소를 통해 SIMVEX 팀에
            연락해주세요.
          </p>
        </section>

        <div className="border-t border-neutral-800 pt-[24px]">
          <Link
            href="/"
            className="font-[Pretendard] text-[14px] text-primary hover:underline"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
