/**
 * Landing page content extracted from Figma designs
 *
 * Figma reference: https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m
 * - Full page: node-id=130-652
 * - Intro: node-id=147-317
 * - Functions: node-id=147-327
 * - Study Model: node-id=147-354
 */

export const landingContent = {
  intro: {
    // TODO: Extract from Figma node-id=147-317
    heading: "시뮬레이션으로 미래를 설계하다",
    subtitle: "SIMVEX는 3D 시뮬레이션 기반 학습 플랫폼입니다",
    ctaPrimary: "시작하기",
    ctaSecondary: "둘러보기",
  },

  functions: {
    // TODO: Extract from Figma node-id=147-327
    heading: "핵심 기능",
    features: [
      {
        iconName: "landing/box-3d-stroke",
        title: "3D 시뮬레이션",
        description: "실시간 3D 환경에서 직관적인 학습 경험을 제공합니다",
        variant: "default" as const,
      },
      {
        iconName: "landing/chart-line",
        title: "데이터 분석",
        description: "시뮬레이션 결과를 실시간으로 분석하고 시각화합니다",
        variant: "default" as const,
      },
      {
        iconName: "landing/chemistry",
        title: "과학 실험",
        description: "안전한 가상 환경에서 다양한 실험을 수행할 수 있습니다",
        variant: "default" as const,
      },
      {
        iconName: "landing/chip",
        title: "AI 기반 학습",
        description: "인공지능이 개인화된 학습 경로를 제시합니다",
        variant: "primary" as const,
      },
    ],
  },

  studyModel: {
    // TODO: Extract from Figma node-id=147-354
    heading: "학습 모델",
    models: [
      {
        iconName: "landing/chemistry",
        modelName: "화학 실험",
      },
      {
        iconName: "landing/electricity",
        modelName: "전기 회로",
      },
      {
        iconName: "landing/space-rocket",
        modelName: "우주 과학",
      },
      {
        iconName: "landing/settings",
        modelName: "기계 공학",
      },
    ],
  },
} as const;

export type LandingContent = typeof landingContent;
