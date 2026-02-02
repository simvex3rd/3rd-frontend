# SIMVEX Frontend - Claude Code Context

## 프로젝트 개요

SIMVEX는 **Three.js + React Three Fiber 기반 3D 시뮬레이션 플랫폼**입니다.

**핵심 기술:**

- Next.js 16 (App Router, Turbopack)
- React 19 + TypeScript 5.9
- Three.js 0.182 + React Three Fiber 9.5
- Tailwind CSS v4 (CSS-based config)
- Zustand (상태 관리)
- Storybook 10 (컴포넌트 문서화)

## 아키텍처

### 폴더 구조

```
src/
├── app/                 # Next.js pages
├── components/
│   ├── ui/              # shadcn/ui
│   ├── viewer/          # 3D 뷰어 (Canvas, Scene, Lights)
│   ├── panels/          # UI 패널
│   └── common/          # 공통
├── hooks/
│   ├── use-three/       # Three.js hooks
│   └── use-ui/          # UI hooks
├── types/               # TS types
├── lib/three/           # Three.js utils
└── stores/              # Zustand stores
```

### 상태 관리 전략

- **scene-store.ts**: 3D 씬 상태 (선택된 객체, 카메라)
- **ui-store.ts**: UI 상태 (패널, 모달)
- **app-store.ts**: 전역 앱 상태

## 코딩 규칙

### Three.js/R3F 컴포넌트

```tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export function MyComponent() {
  const ref = useRef();
  useFrame((state, delta) => {
    // 애니메이션 로직
  });

  return <mesh ref={ref}>...</mesh>;
}
```

**규칙:**

- 모든 R3F 컴포넌트는 `'use client'` 필수
- `src/components/viewer/`에 배치
- Props로 설정 전달 (재사용성)
- Cleanup 잊지 말기 (`geometry.dispose()`, `material.dispose()`)

### UI 컴포넌트

```tsx
import { Button } from "@/components/ui/button";

export function Panel() {
  return <Button variant="outline">Click</Button>;
}
```

**규칙:**

- shadcn/ui 우선 사용
- `src/components/ui/`에 배치
- Tailwind utility classes 사용
- 하드코딩 색상 금지 (디자인 토큰 사용)

### 스타일링

```tsx
// ✅ 올바른 예
<div className="bg-background text-foreground">

// ❌ 잘못된 예
<div className="bg-white text-black">
<div style={{ background: '#fff' }}>
```

**규칙:**

- Tailwind CSS v4 사용
- CSS 변수 활용 (`var(--background)`)
- 하드코딩된 색상 금지

### 상태 관리

```tsx
// Store 사용
const { selectedObject, setSelectedObject } = useSceneStore();

// 로컬 상태
const [isOpen, setIsOpen] = useState(false);
```

**규칙:**

- 전역 상태는 Zustand
- 컴포넌트 로컬 상태는 useState
- Scene 상태 ≠ UI 상태 (분리)

### 성능 최적화

```tsx
// Instancing (동일 객체 다수)
<instancedMesh args={[geo, mat, 1000]} />

// LOD (Level of Detail)
<Lod distances={[0, 10, 20]}>
  <mesh geometry={high} />
  <mesh geometry={mid} />
  <mesh geometry={low} />
</Lod>

// Memoization
const expensive = useMemo(() => compute(), [deps]);
```

**규칙:**

- Instancing으로 draw call 최소화
- LOD로 먼 객체 최적화
- React.memo, useMemo, useCallback 활용
- Suspense로 lazy loading

## 커밋 규칙

```
<type>(<scope>): <subject>

feat(viewer): add orbit controls
fix(ui): button hover state
docs(config): update README
```

**Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore

**Scopes:** viewer, ui, panels, hooks, types, lib, stores, config, deps

**주의:**

- subject는 영문 소문자 동사로 시작
- Husky + Commitlint가 자동 검증

## 파일 생성 규칙

### Three.js 컴포넌트

**위치:** `src/components/viewer/`
**네이밍:** PascalCase (예: `RotatingCube.tsx`)
**템플릿:**

```tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type { Mesh } from "three";

export function ComponentName() {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current) {
      // animation
    }
  });

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  );
}
```

### UI 컴포넌트

**위치:** `src/components/ui/` (shadcn) 또는 `src/components/panels/`
**네이밍:** kebab-case (shadcn), PascalCase (panels)
**Storybook:** 항상 `.stories.tsx` 함께 생성

### Zustand Store

**위치:** `src/stores/`
**네이밍:** `<name>-store.ts`
**템플릿:**

```tsx
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface StoreState {
  // state
  // actions
}

export const useStoreName = create<StoreState>()(
  devtools(
    (set) => ({
      // implementation
    }),
    { name: "StoreName" }
  )
);
```

## 금지 사항

❌ **절대 하지 말 것:**

- Three.js 컴포넌트에서 `'use client'` 빼먹기
- Cleanup 없이 geometry/material 생성
- 하드코딩된 색상 사용 (`#fff`, `rgb()`)
- 커밋 메시지에 한글 사용
- `node_modules/`, `.next/` 수정
- 환경 변수를 코드에 하드코딩

⚠️ **주의 사항:**

- SSR 환경에서 `window` 사용 금지 (useEffect 내부에서만)
- Hooks 순서 변경 금지
- Three.js dispose 잊지 말기

## 자주 사용하는 패턴

### 3D 모델 로딩

```tsx
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/models/model.glb");
  return <primitive object={scene} />;
}

export function Scene() {
  return (
    <Suspense fallback={<Loader />}>
      <Model />
    </Suspense>
  );
}

useGLTF.preload("/models/model.glb");
```

### 이벤트 처리

```tsx
<mesh
  onClick={(e) => {
    e.stopPropagation();
    setSelected(e.object.uuid);
  }}
  onPointerOver={() => setHovered(true)}
  onPointerOut={() => setHovered(false)}
>
```

### 동적 Import (무거운 컴포넌트)

```tsx
import dynamic from "next/dynamic";

const Heavy = dynamic(() => import("./Heavy"), {
  ssr: false,
  loading: () => <Loader />,
});
```

## 참고 문서

- [아키텍처](./docs/ARCHITECTURE.md)
- [개발 가이드](./docs/DEVELOPMENT_GUIDE.md)
- [트러블슈팅](./docs/TROUBLESHOOTING.md)

## Claude Code Skills

설치된 Skills:

- `r3f-fundamentals`, `r3f-geometry`, `r3f-materials`, `r3f-physics`, `r3f-shaders`
- `vercel-react-best-practices`, `performance`, `web-design-guidelines`, `nextjs-app-router-patterns`

이 Skills를 적극 활용하세요.
