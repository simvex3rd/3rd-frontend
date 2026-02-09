import Link from "next/link";

export default function TermsOfServicePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-[16px] py-[80px]">
      <div className="w-full max-w-[720px] space-y-[32px]">
        <div className="space-y-[8px]">
          <h1 className="font-[Pretendard] text-[32px] font-bold text-neutral-50">
            서비스 이용약관
          </h1>
          <p className="font-[Pretendard] text-[14px] text-neutral-500">
            최종 수정일: 2026년 2월 10일
          </p>
        </div>

        <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
          본 약관은 SIMVEX(이하 &quot;서비스&quot;)의 이용 조건을 규정합니다.
          서비스를 이용함으로써 본 약관에 동의한 것으로 간주됩니다.
        </p>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            1. 서비스 소개
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            SIMVEX는 3D 시뮬레이션 기반의 교육용 학습 플랫폼입니다. 인터랙티브
            3D 모델과 AI 학습 도구를 통해 기계공학 개념을 학습할 수 있는 환경을
            제공합니다.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            2. 이용 규칙
          </h2>
          <ul className="list-disc pl-[20px] space-y-[6px] font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            <li>본 서비스는 교육 목적으로만 제공됩니다.</li>
            <li>
              서비스에 대한 무단 접근, 해킹 시도, 악의적 사용을 금지합니다.
            </li>
            <li>사전 동의 없이 상업적 목적으로 사용할 수 없습니다.</li>
            <li>
              타 이용자의 정상적인 서비스 이용을 방해하는 행위를 금지합니다.
            </li>
          </ul>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            3. 지적재산권
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            서비스에 포함된 3D 모델, UI 디자인, 소스 코드 등 모든 콘텐츠의
            지적재산권은 SIMVEX 팀에 귀속됩니다. 이용자가 서비스 내에서 작성한
            학습 노트 및 채팅 내용에 대한 권리는 이용자 본인에게 있습니다.
          </p>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            4. 면책사항
          </h2>
          <ul className="list-disc pl-[20px] space-y-[6px] font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            <li>
              서비스는 &quot;있는 그대로&quot; 제공되며, 어떠한 명시적 또는
              묵시적 보증도 하지 않습니다.
            </li>
            <li>
              AI가 생성한 콘텐츠는 부정확할 수 있으며, 학술적 권위를 갖지
              않습니다.
            </li>
            <li>
              서비스 이용 과정에서 발생하는 직접적 또는 간접적 손해에 대해
              SIMVEX 팀은 책임을 지지 않습니다.
            </li>
          </ul>
        </section>

        <section className="space-y-[12px]">
          <h2 className="font-[Pretendard] text-[20px] font-semibold text-neutral-100">
            5. 약관 변경
          </h2>
          <p className="font-[Pretendard] text-[16px] leading-[1.7] text-neutral-300">
            본 약관은 필요에 따라 변경될 수 있으며, 변경 시 서비스 내에
            공지합니다. 변경 후에도 서비스를 계속 이용할 경우 변경된 약관에
            동의한 것으로 간주됩니다.
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
