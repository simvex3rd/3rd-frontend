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

## Git & 커밋 규칙

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

feat(viewer): add orbit controls
fix(ui): button hover state
docs(config): update README
```

**Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore

**Scopes:** viewer, ui, panels, hooks, types, lib, stores, config, deps

### 필수 규칙

**✅ 반드시 지킬 것:**

- **영어로만 작성**: 커밋 메시지는 반드시 영어 사용 (한국어 금지)
- **소문자 동사로 시작**: subject는 `add`, `fix`, `update` 등 소문자 동사
- **간결하게**: subject는 50자 이내
- **현재형 사용**: "added" ❌ → "add" ✅

**❌ Co-Authored-By 규칙:**

- **기본적으로 포함하지 않음**
- 사용자가 명시적으로 요청할 때만 추가
- Claude가 자동으로 추가하지 말 것

```bash
# ❌ 금지 - Co-Authored-By 자동 추가
git commit -m "feat: add feature

Co-Authored-By: Claude Sonnet 4.5 <noreply@anthropic.com>"

# ✅ 올바름 - Co-Authored-By 없이
git commit -m "feat: add feature"
```

**자동 검증:**

- Husky pre-commit: ESLint + Prettier
- Husky commit-msg: Commitlint (형식 검증)

### Git 워크플로우

**브랜치 전략:**

```bash
main              # 프로덕션
├── feature/*     # 새 기능
├── fix/*         # 버그 수정
└── refactor/*    # 리팩토링
```

**작업 흐름:**

1. 브랜치 생성: `git checkout -b feature/add-camera-controls`
2. 작업 및 커밋 (atomic commits)
3. Push 전 rebase: `git pull --rebase origin main`
4. Push: `git push origin feature/add-camera-controls`
5. PR 생성 및 리뷰

**주의사항:**

- Push 전에는 rebase 자유롭게 가능
- Push 후에는 rebase 금지 (force push 방지)
- Commit은 논리적 단위로 분리 (atomic commits)

## 기본 개발 규칙

### 에러 처리

**원칙:**

- **시스템 경계에서만 처리**: API 호출, 사용자 입력, 외부 데이터
- 내부 함수 호출은 신뢰 (불필요한 try-catch 금지)
- 에러는 의미 있는 메시지와 함께 처리

```tsx
// ✅ 올바른 예 - API 경계에서 처리
async function fetchData() {
  try {
    const response = await fetch("/api/data");
    if (!response.ok) throw new Error("Failed to fetch");
    return response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
}

// ❌ 잘못된 예 - 내부 함수에 불필요한 try-catch
function calculateTotal(items: Item[]) {
  try {
    return items.reduce((sum, item) => sum + item.price, 0);
  } catch (error) {
    // items는 신뢰할 수 있는 내부 데이터
  }
}
```

### 타입 안정성

**원칙:**

- `any` 사용 최소화 (불가피한 경우만)
- 외부 데이터는 반드시 검증 (Zod, Yup 등)
- 타입 단언(`as`) 대신 타입 가드 사용

```tsx
// ✅ 올바른 예 - 타입 가드
function isUser(data: unknown): data is User {
  return (
    typeof data === "object" && data !== null && "id" in data && "name" in data
  );
}

// ❌ 잘못된 예 - any 남용
function process(data: any) {
  return data.items.map((item: any) => item.value);
}
```

### 보안

**필수 체크리스트:**

- [ ] 사용자 입력 검증 및 sanitize (XSS 방지)
- [ ] API 요청에 CSRF 토큰 포함
- [ ] 환경 변수로 민감 정보 관리 (`.env.local`)
- [ ] 클라이언트에 API 키 노출 금지
- [ ] 서버 컴포넌트에서 인증 확인

```tsx
// ✅ 올바른 예 - 환경 변수 사용
const apiKey = process.env.NEXT_PUBLIC_API_KEY;

// ❌ 잘못된 예 - 하드코딩
const apiKey = "sk-1234567890abcdef";
```

### 성능

**필수 체크:**

- [ ] 이미지 최적화 (Next.js Image 컴포넌트)
- [ ] 무거운 컴포넌트는 동적 import
- [ ] useCallback, useMemo로 불필요한 리렌더링 방지
- [ ] Three.js 객체는 반드시 dispose

```tsx
// ✅ 올바른 예 - 동적 import
const HeavyComponent = dynamic(() => import("./Heavy"), {
  ssr: false,
  loading: () => <Spinner />,
});

// ✅ 올바른 예 - Three.js cleanup
useEffect(() => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial();

  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);
```

### 접근성 (a11y)

**필수 체크:**

- [ ] 모든 버튼에 명확한 레이블
- [ ] 이미지에 alt 속성
- [ ] 키보드로 모든 기능 사용 가능
- [ ] 색상 대비 4.5:1 이상

```tsx
// ✅ 올바른 예
<button aria-label="Close menu" onClick={handleClose}>
  <X className="h-4 w-4" />
</button>

// ❌ 잘못된 예 - 레이블 없음
<button onClick={handleClose}>
  <X className="h-4 w-4" />
</button>
```

### 테스트 (나중에 추가 예정)

현재는 테스트 프레임워크 미설정. 추후 Vitest + Testing Library 추가 예정.

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

### ❌ 절대 하지 말 것

**Three.js/R3F:**

- `'use client'` 빼먹기
- Cleanup 없이 geometry/material 생성
- SSR 환경에서 `window`, `document` 직접 사용

**스타일링:**

- 하드코딩된 색상 (`#fff`, `rgb()`, `hsl()`)
- Inline styles (특별한 경우 제외)
- Tailwind 대신 CSS 파일 생성 (global.css 제외)

**Git & 코드:**

- 커밋 메시지에 한국어 사용
- Co-Authored-By 자동 추가
- `node_modules/`, `.next/`, `dist/` 수정
- 환경 변수 하드코딩 (`.env` 파일 사용)

**보안:**

- API 키, 비밀번호 커밋
- 사용자 입력 검증 없이 사용
- XSS 취약점 (innerHTML, dangerouslySetInnerHTML 남용)

### ⚠️ 주의 사항

**React:**

- Hooks 순서 변경 금지
- useEffect 의존성 배열 무시 금지
- 상태 직접 변경 금지 (불변성 유지)

**Three.js:**

- dispose() 잊지 말기 (메모리 누수)
- 과도한 draw call 주의 (instancing 사용)
- 무거운 연산은 useFrame 밖으로

**Next.js:**

- 클라이언트 컴포넌트 남용 (서버 컴포넌트 우선)
- getServerSideProps 남용 (ISR, SSG 검토)
- Image 컴포넌트 없이 img 태그 사용

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
