# SIMVEX Frontend - Claude Code Context

## 프로젝트 개요

SIMVEX는 **Three.js + React Three Fiber 기반 3D 시뮬레이션 플랫폼**입니다.

**프로젝트 정보:**

- **기간**: 10일 (단기 집중 개발)
- **인원**: 2명
- **배포 주기**: 매일 1-2회 (빠른 반복)

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

### 뷰포트 & 스케일링

**⚠️ 중요: 자동 CSS 스케일링**

프로젝트는 **1920px 기준 디자인**으로 개발되며, **1440px 이하 뷰포트에서 자동으로 75% 스케일링**됩니다.

```css
/* src/app/globals.css - 자동 적용됨 */
@media (max-width: 1919px) {
  body {
    zoom: 0.75 !important; /* 75% 스케일링 */
    min-height: 133.33vh !important; /* 스크롤 보정 */
  }
}
```

**핵심 규칙:**

- 모든 컴포넌트는 **1920px 기준**으로 픽셀 값 사용
- `px-[80px]`, `text-[40px]` 등 **절대 픽셀 값** 사용 (Tailwind 유틸리티 대신)
- 1440px 뷰포트에서 자동으로 `80px → 60px`, `40px → 30px`로 스케일링됨
- **스케일링 코드 수정 금지** - globals.css 최상단에 위치, 다른 @layer보다 우선

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

> **⚠️ 중요: 커밋 규칙**
>
> 1. **커밋 메시지는 반드시 영어로만 작성** (한국어 절대 금지)
> 2. **Co-Authored-By는 기본적으로 포함하지 않음** (사용자 명시 요청 시만)

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

- **영어로만 작성** - 한국어 사용 시 commitlint 거부됨
- **소문자 동사로 시작** - `add`, `fix`, `update` 등
- **50자 이내**, 현재형 사용 - "added" ❌ → "add" ✅

**❌ Co-Authored-By 규칙:**

- **기본적으로 절대 포함하지 않음**
- 사용자가 "Co-Authored-By 넣어줘"라고 명시적으로 요청할 때만 추가
- Claude가 임의로 추가하면 안 됨

```bash
# ❌ 절대 금지 - 한국어 커밋
git commit -m "feat(viewer): 카메라 추가"

# ❌ 절대 금지 - Co-Authored-By 자동 추가
git commit -m "feat(viewer): add camera

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# ✅ 올바름
git commit -m "feat(viewer): add camera controls"
```

**자동 검증:**

- Husky pre-commit: ESLint + Prettier
- Husky commit-msg: Commitlint

### Git 워크플로우 (2명 협업)

**브랜치 구조:**

```bash
main (프로덕션)
 └─ dev (개발 통합, default branch)
     ├─ feature/* (기능별 작업)
     ├─ fix/* (버그 수정)
     └─ refactor/* (리팩토링)
```

**브랜치 네이밍:**

```
feature/camera-controls
feature/ui-panel
fix/memory-leak
refactor/store-structure
docs/update-readme
chore/update-deps
```

**작업 흐름:**

```bash
# 1. 새 기능 시작
git checkout dev
git pull origin dev
git checkout -b feature/camera-controls

# 2. 작업 + 커밋 (atomic commits)
git add .
git commit -m "feat(viewer): add orbit controls"

# 3. dev 최신화 (conflict 방지)
git fetch origin dev
git rebase origin/dev

# 4. Push + PR 생성
git push origin feature/camera-controls
# PR: feature/camera-controls → dev

# 5. 리뷰 + 머지 후 로컬 브랜치 삭제
git checkout dev
git pull origin dev
git branch -d feature/camera-controls
```

**배포 플로우:**

```
feature/xxx → dev (PR + 코드 리뷰)
             ↓
           dev → main (매일 or 기능 완성 시)
```

**프로젝트 특성:**

- **기간**: 10일 단기 프로젝트
- **배포 주기**: 하루 1-2회 (빠른 반복)
- **dev → main**: 매일 저녁 or 중요 기능 완성 즉시

**주의사항:**

- **Push 전**: rebase 자유 (히스토리 정리)
- **Push 후**: rebase 금지 (force push 방지)
- **PR 크기**: 500줄 이하 권장 (리뷰 용이)
- **기능 단위**: 하나의 PR = 하나의 기능
- **Squash merge**: dev로 머지 시 사용 금지 (히스토리 유지)

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
