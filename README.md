# SIMVEX Frontend

> A high-performance 3D simulation and visualization platform built with React Three Fiber and Next.js.

SIMVEX는 웹 브라우저에서 실시간 3D 시뮬레이션과 시각화를 제공하는 플랫폼입니다. Three.js와 React Three Fiber를 기반으로 복잡한 3D 씬을 선언적으로 구성하고, 사용자 친화적인 인터페이스로 제어할 수 있습니다.

## ✨ 주요 기능

- 🎮 **실시간 3D 렌더링**: WebGL 기반 고성능 3D 그래픽스
- 🎨 **선언적 3D 구성**: React Three Fiber로 3D 씬을 컴포넌트처럼 작성
- 🎛️ **직관적인 컨트롤**: 카메라 조작, 객체 선택, 속성 변경
- 📊 **상태 관리**: Zustand 기반 예측 가능한 상태 흐름
- 🚀 **최적화된 성능**: Instancing, LOD, Suspense 등 최적화 기법 적용
- 📱 **반응형 디자인**: 모든 디바이스에서 동작하는 적응형 UI

## 🎯 사용 사례

- 3D 제품 시뮬레이션 및 시각화
- 건축/인테리어 3D 뷰어
- 과학/엔지니어링 데이터 시각화
- 인터랙티브 3D 교육 콘텐츠

<!--
## 🖼️ 스크린샷

_스크린샷은 첫 3D 씬 구현 후 추가 예정_

## 🎬 데모

_라이브 데모는 배포 후 추가 예정_
-->

## 🛠️ Tech Stack

| 카테고리      | 기술               | 버전    |
| ------------- | ------------------ | ------- |
| **Framework** | Next.js            | 16.1.6  |
| **React**     | React              | 19.2.3  |
| **언어**      | TypeScript         | 5.9.3   |
| **3D**        | Three.js           | 0.182.0 |
|               | React Three Fiber  | 9.5.0   |
|               | Drei               | 10.7.7  |
| **스타일링**  | Tailwind CSS       | v4.1.18 |
| **상태 관리** | Zustand            | 5.0.11  |
| **UI**        | shadcn/ui          | -       |
| **개발 도구** | Storybook          | 10.2.3  |
|               | ESLint + Prettier  | 9 / 3.8 |
|               | Husky + Commitlint | 9 / 20  |

> 💡 **자세한 기술 스택 설명**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 📦 Prerequisites

- **Node.js**: 24.12.0 (`.nvmrc` 참조)
- **pnpm**: 10.28.0

```bash
nvm use  # Node 버전 자동 로드
```

## 🚀 Quick Start

### 1. 환경 변수 설정

```bash
cp .env.example .env.local
```

`.env.local` 파일을 열어 Clerk API 키를 설정하세요:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_actual_key
CLERK_SECRET_KEY=sk_test_your_actual_key
```

**Clerk 키 발급 방법:**

1. [Clerk Dashboard](https://dashboard.clerk.com)에서 애플리케이션 생성
2. **Publishable Key**와 **Secret Key** 복사
3. `.env.local`에 붙여넣기

### 2. 설치

```bash
pnpm install
```

### 3. 개발 서버 실행

```bash
pnpm dev
```

http://localhost:3000 에서 확인

### 4. Storybook 실행 (선택)

```bash
pnpm storybook
```

http://localhost:6006 에서 컴포넌트 확인

### 5. 빌드

```bash
pnpm build
pnpm start
```

## 📁 프로젝트 구조

```
src/
├── app/                 # Next.js App Router
├── components/
│   ├── ui/              # shadcn/ui 컴포넌트
│   ├── viewer/          # 3D 뷰어 컴포넌트
│   ├── panels/          # UI 패널
│   └── common/          # 공통 컴포넌트
├── hooks/               # 커스텀 hooks
│   ├── use-three/       # Three.js hooks
│   └── use-ui/          # UI hooks
├── types/               # TypeScript 타입
├── lib/                 # 유틸리티
│   └── three/           # Three.js 유틸
└── stores/              # Zustand 상태
```

> 📖 **상세 아키텍처**: [docs/ARCHITECTURE.md](./docs/ARCHITECTURE.md)

## 💻 개발 가이드

### UI 컴포넌트 추가

```bash
npx shadcn@latest add button card dialog
```

### Three.js 컴포넌트 작성

```tsx
"use client";

import { useFrame } from "@react-three/fiber";

export function RotatingCube() {
  const ref = useRef();
  useFrame((state, delta) => (ref.current.rotation.y += delta));

  return (
    <mesh ref={ref}>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
```

> 📖 **상세 개발 가이드**: [docs/DEVELOPMENT_GUIDE.md](./docs/DEVELOPMENT_GUIDE.md)

## 🔧 유용한 명령어

| 명령어                 | 설명                 |
| ---------------------- | -------------------- |
| `pnpm dev`             | 개발 서버 시작       |
| `pnpm build`           | Production 빌드      |
| `pnpm start`           | Production 서버 시작 |
| `pnpm lint`            | ESLint 체크          |
| `pnpm lint:fix`        | ESLint 자동 수정     |
| `pnpm format`          | Prettier 포맷팅      |
| `pnpm format:check`    | 포맷팅 체크          |
| `pnpm storybook`       | Storybook 실행       |
| `pnpm build-storybook` | Storybook 빌드       |

## 📝 Commit Convention

```
<type>(<scope>): <subject>

예시: feat(viewer): add camera orbit controls
```

**Types**: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`

**Scopes**: `viewer`, `ui`, `panels`, `hooks`, `types`, `lib`, `stores`, `config`, `deps`

Git hooks (Husky + Commitlint)가 자동으로 검증합니다.

## 🐛 문제 해결

일반적인 문제와 해결 방법:

- **Three.js 씬이 안 보임** → 카메라 위치, 조명 확인
- **"window is not defined"** → `'use client'` 추가
- **Hot reload 느림** → Turbopack 사용 (기본 활성화)
- **Storybook 스타일 안 먹힘** → `preview.ts`에서 CSS import 확인

> 📖 **전체 트러블슈팅**: [docs/TROUBLESHOOTING.md](./docs/TROUBLESHOOTING.md)

## 📚 Documentation

- [아키텍처](./docs/ARCHITECTURE.md) - 프로젝트 구조, 데이터 흐름, 최적화 전략
- [개발 가이드](./docs/DEVELOPMENT_GUIDE.md) - 컴포넌트 작성, 상태 관리, Storybook
- [트러블슈팅](./docs/TROUBLESHOOTING.md) - 일반적인 문제 해결

## 🤖 Claude Code Skills

이 프로젝트는 다음 Skills를 활용합니다:

**R3F Skills**: `r3f-fundamentals`, `r3f-geometry`, `r3f-materials`, `r3f-physics`, `r3f-shaders`

**React & Web Skills**: `vercel-react-best-practices`, `performance`, `web-design-guidelines`, `nextjs-app-router-patterns`

```bash
npx skills list -g  # 설치된 Skills 확인
```

## 🤝 Contributing

1. Feature branch 생성
2. 변경 사항 커밋 (Conventional Commits 준수)
3. Lint 및 빌드 통과 확인
4. Pull Request 생성

## 📄 License

[Your License Here]

---

Built with ❤️ using [Next.js](https://nextjs.org), [Three.js](https://threejs.org), and [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
