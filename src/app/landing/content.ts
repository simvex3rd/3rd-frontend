/**
 * Landing page content extracted from Figma designs
 *
 * Figma reference: https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m
 * - Full page: node-id=130-652
 */

export const landingContent = {
  intro: {
    heading: "이론을 넘어,\n현실로 들어서다.",
    subtitle:
      "복잡한 공학 시스템,\n3D 인터랙션과 AI 튜터로 완벽하게 마스터하세요.",
    ctaPrimary: "지금 바로 학습 시작하기",
  },

  functions: {
    heading: "당신의 학습 경험을 혁신합니다",
    headingHighlight: "학습 경험을 혁신", // cyan color
    features: [
      {
        iconName: "landing/box-3d-stroke",
        title: "3D 몰입형 인터랙션",
        description:
          "보고 만지고 분해하며,\n이론을 직관적인 경험으로 바꿉니다.",
        variant: "default" as const,
      },
      {
        iconName: "landing/chat-dots",
        title: "AI 기반 맞춤형 튜터링",
        description: "궁금증은 바로 해결!\nAI 튜터가 당신의 이해를 돕습니다.",
        variant: "default" as const,
      },
      {
        iconName: "landing/chart-line",
        title: "정교한 데이터 시각화",
        description:
          "숨겨진 공학 원리,\n정밀한 데이터를 통해 완벽하게 파악합니다.",
        variant: "default" as const,
      },
    ],
  },

  studyModel: {
    heading: "다양한 분야의 핵심 모델을 탐색하세요",
    models: [
      {
        iconName: "landing/chip",
        modelName: "회로공학",
      },
      {
        iconName: "landing/chemistry",
        modelName: "화학공학",
      },
      {
        iconName: "landing/electricity",
        modelName: "전기공학",
      },
      {
        iconName: "landing/settings",
        modelName: "기계공학",
      },
      {
        iconName: "landing/space-rocket",
        modelName: "항공우주공학",
      },
    ],
  },
} as const;

export type LandingContent = typeof landingContent;
