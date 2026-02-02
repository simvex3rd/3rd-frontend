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

### 상태 관리

- **scene-store.ts**: 3D 씬 상태 (선택된 객체, 카메라)
- **ui-store.ts**: UI 상태 (패널, 모달)
- **app-store.ts**: 전역 앱 상태

## 코딩 규칙 (Quick Reference)

### Three.js/R3F

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

**핵심 규칙:**

- 모든 R3F 컴포넌트는 `'use client'` 필수
- `src/components/viewer/`에 배치
- Cleanup 필수: `geometry.dispose()`, `material.dispose()`

### UI 컴포넌트

```tsx
import { Button } from "@/components/ui/button";

<Button variant="outline">Click</Button>;
```

**핵심 규칙:**

- shadcn/ui 우선 사용
- Tailwind utility classes 사용
- 하드코딩 색상 금지 (CSS 변수 사용: `bg-background`)

### 상태 관리

```tsx
// Zustand (전역)
const { selectedObject, setSelectedObject } = useSceneStore();

// useState (로컬)
const [isOpen, setIsOpen] = useState(false);
```

**핵심 규칙:**

- 전역 상태는 Zustand
- Scene 상태 ≠ UI 상태 (분리)

### 성능 최적화

```tsx
// Instancing
<instancedMesh args={[geo, mat, 1000]} />;

// Memoization
const expensive = useMemo(() => compute(), [deps]);

// Dynamic import
const Heavy = dynamic(() => import("./Heavy"), { ssr: false });
```

## Git & 커밋 규칙

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

feat(viewer): add orbit controls
fix(ui): button hover state
```

**Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore

**Scopes:** viewer, ui, panels, hooks, types, lib, stores, config, deps

### 필수 규칙

**✅ 반드시 지킬 것:**

- 영어로만 작성 (한국어 금지)
- 소문자 동사로 시작: `add`, `fix`, `update`
- 50자 이내, 현재형 사용

**❌ Co-Authored-By:**

- **기본적으로 포함하지 않음**
- 사용자가 명시적으로 요청할 때만 추가

**자동 검증:**

- Husky pre-commit: ESLint + Prettier
- Husky commit-msg: Commitlint

### Git 워크플로우

```bash
main              # 프로덕션
├── feature/*     # 새 기능
├── fix/*         # 버그 수정
└── refactor/*    # 리팩토링
```

**주의:** Push 전에는 rebase 자유, 후에는 금지 (force push 방지)

## 파일 생성 규칙

### Three.js 컴포넌트

- **위치:** `src/components/viewer/`
- **네이밍:** PascalCase (예: `RotatingCube.tsx`)
- **필수:** `'use client'`, useFrame, cleanup

### UI 컴포넌트

- **위치:** `src/components/ui/` (shadcn) 또는 `src/components/panels/`
- **네이밍:** kebab-case (shadcn), PascalCase (panels)
- **필수:** Storybook `.stories.tsx` 함께 생성

### Zustand Store

- **위치:** `src/stores/`
- **네이밍:** `<name>-store.ts`
- **템플릿:** `create()` + `devtools()` middleware

## 금지 사항

### ❌ 절대 하지 말 것

**Three.js:**

- `'use client'` 빼먹기
- dispose() 없이 객체 생성 (메모리 누수)
- SSR 환경에서 `window` 직접 사용

**스타일:**

- 하드코딩 색상 (`#fff`, `rgb()`)
- Inline styles (특별한 경우 제외)

**Git:**

- 커밋 메시지에 한국어 사용
- Co-Authored-By 자동 추가
- API 키, `.env` 파일 커밋

**코드:**

- `any` 남용
- 사용자 입력 검증 없이 사용 (XSS)
- useEffect 의존성 배열 무시

### ⚠️ 주의 사항

- React Hooks 순서 변경 금지
- Three.js draw call 최소화 (instancing 사용)
- 클라이언트 컴포넌트 남용 (서버 컴포넌트 우선)

## 빠른 패턴 참조

### 3D 모델 로딩

```tsx
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/model.glb");
  return <primitive object={scene} />;
}

<Suspense fallback={<Loader />}>
  <Model />
</Suspense>;

useGLTF.preload("/model.glb");
```

### 동적 Import

```tsx
import dynamic from "next/dynamic";

const Heavy = dynamic(() => import("./Heavy"), {
  ssr: false,
  loading: () => <Spinner />,
});
```

## 참고 문서

**프로젝트 문서:**

- [아키텍처](./docs/ARCHITECTURE.md) - 상세 구조 설명
- [개발 가이드](./docs/DEVELOPMENT_GUIDE.md) - 코드 예제
- [트러블슈팅](./docs/TROUBLESHOOTING.md) - 문제 해결

**개발 규칙:**

- [상세 개발 규칙](./.claude/DEVELOPMENT_RULES.md) - 에러 처리, 보안, 성능, 접근성

## Claude Code Skills

설치된 Skills:

- `r3f-fundamentals`, `r3f-geometry`, `r3f-materials`, `r3f-physics`, `r3f-shaders`
- `vercel-react-best-practices`, `performance`, `web-design-guidelines`, `nextjs-app-router-patterns`

이 Skills를 적극 활용하세요.

## 커스텀 커맨드

`.claude/commands/` 디렉토리의 커맨드:

- `/create-component` - Three.js 컴포넌트 + Storybook 생성
- `/create-store` - Zustand store 템플릿 생성
- `/add-shadcn` - shadcn/ui 컴포넌트 설치
- `/optimize-three` - Three.js 성능 최적화
- `/add-figma-design` - Storybook에 Figma 디자인 연결
