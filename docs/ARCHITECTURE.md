# 프로젝트 아키텍처

## 폴더 구조

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx          # 루트 레이아웃 (메타데이터, 전역 설정)
│   ├── page.tsx            # 홈페이지
│   └── globals.css         # 전역 스타일 (Tailwind, CSS 변수)
│
├── components/
│   ├── ui/                 # shadcn/ui 기반 재사용 가능한 UI 컴포넌트
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   └── dialog.tsx
│   │
│   ├── viewer/             # 3D 뷰어 관련 컴포넌트
│   │   ├── SceneCanvas.tsx # R3F Canvas 래퍼
│   │   ├── Stats.tsx       # 성능 모니터링
│   │   └── Scene.tsx       # 메인 3D 씬
│   │
│   ├── panels/             # UI 패널 (속성 패널, 컨트롤 패널, 메뉴)
│   │   ├── PropertyPanel.tsx
│   │   ├── ControlPanel.tsx
│   │   └── Sidebar.tsx
│   │
│   └── common/             # 공통 컴포넌트
│       ├── Layout.tsx
│       ├── Header.tsx
│       └── Footer.tsx
│
├── hooks/
│   ├── use-three/          # Three.js 전용 hooks
│   │   ├── useModel.ts     # 3D 모델 로딩
│   │   ├── useAnimation.ts # 애니메이션 제어
│   │   └── useCamera.ts    # 카메라 제어
│   │
│   └── use-ui/             # UI 상태 hooks
│       ├── usePanel.ts
│       ├── useModal.ts
│       └── useKeyboard.ts
│
├── types/                  # TypeScript 타입 정의
│   ├── three.d.ts          # Three.js 타입 확장
│   ├── scene.ts            # Scene 도메인 타입
│   └── api.ts              # API 응답 타입
│
├── lib/
│   ├── three/              # Three.js 유틸리티
│   │   ├── geometries/     # 커스텀 geometries
│   │   ├── materials/      # 커스텀 materials
│   │   └── helpers/        # Three.js 헬퍼 함수
│   │
│   └── utils.ts            # 범용 유틸리티 (cn 등)
│
└── stores/                 # Zustand 상태 관리
    ├── scene-store.ts      # 3D 씬 상태 (선택된 객체, 카메라 등)
    ├── ui-store.ts         # UI 상태 (패널 열림/닫힘 등)
    └── app-store.ts        # 전역 앱 상태
```

## 데이터 흐름

```
User Interaction
       ↓
  UI Component (React)
       ↓
  Zustand Store (State Update)
       ↓
  ├─→ Scene State → R3F Component → Three.js (3D Update)
  └─→ UI State → UI Component → DOM (UI Update)
```

## 컴포넌트 계층

```
App Layout
├── Header (UI)
├── Main
│   ├── SceneCanvas (R3F)
│   │   └── Scene (3D Objects)
│   └── Panels (UI)
│       ├── PropertyPanel
│       └── ControlPanel
└── Footer (UI)
```

## 상태 관리 전략

### Scene State (scene-store.ts)

3D 씬 관련 상태:

- 선택된 객체 ID
- 카메라 위치/회전
- 조명 설정
- 렌더링 옵션

### UI State (ui-store.ts)

UI 관련 상태:

- 패널 열림/닫힘
- 모달 상태
- 툴바 선택
- 테마 설정

### App State (app-store.ts)

전역 앱 상태:

- 사용자 설정
- 로딩 상태
- 에러 상태

## 렌더링 전략

### Server Components (기본)

- Layout, 정적 콘텐츠
- SEO 최적화

### Client Components ('use client')

- 인터랙티브 UI
- Three.js 컴포넌트 (필수)
- Zustand hooks 사용

### Dynamic Import

```tsx
const HeavyComponent = dynamic(() => import("./Heavy"), {
  ssr: false,
  loading: () => <Loader />,
});
```

## 성능 최적화

### Three.js 최적화

1. **Instancing**: 동일 geometry 재사용
2. **LOD (Level of Detail)**: 거리에 따른 디테일 조정
3. **Frustum Culling**: 카메라 밖 객체 렌더링 제외
4. **Object Pooling**: 객체 재사용

### React 최적화

1. **Code Splitting**: 페이지별 번들 분리
2. **Memoization**: React.memo, useMemo, useCallback
3. **Suspense**: 지연 로딩
4. **Virtual Scrolling**: 긴 리스트 최적화

### Next.js 최적화

1. **Image Optimization**: Next/Image 사용
2. **Font Optimization**: next/font 사용
3. **Bundle Analysis**: @next/bundle-analyzer
4. **Turbopack**: 빠른 dev 환경

## 보안 고려사항

- XSS 방지: 사용자 입력 sanitize
- CSRF 방지: Next.js 자동 처리
- 환경 변수: `.env.local`에 민감 정보 보관
- API 인증: 서버 컴포넌트에서 처리
