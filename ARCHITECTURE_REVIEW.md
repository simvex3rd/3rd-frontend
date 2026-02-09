# SIMVEX Architecture Review

> Generated: 2026-02-10T03:30:00+09:00
> Reviewer: Claude Code (ralph loop)

## 현재 구조 요약

```
src/
├── app/                          # Next.js App Router (Pages)
│   ├── page.tsx                  # Landing (/)
│   ├── layout.tsx                # Root layout (ClerkProvider, ThemeProvider)
│   ├── chat/page.tsx             # Full Chat (/chat)
│   ├── study/
│   │   ├── page.tsx              # Study Dashboard (/study)
│   │   └── chat/page.tsx         # Study Chat (/study/chat)
│   ├── viewer/page.tsx           # 3D Viewer (/viewer)
│   ├── lab/page.tsx              # Lab placeholder (/lab)
│   ├── sign-in/[[...sign-in]]/   # Clerk Sign In
│   ├── sign-up/[[...sign-up]]/   # Clerk Sign Up
│   ├── sso-callback/page.tsx     # SSO Callback
│   ├── toast-demo/page.tsx       # Toast Demo
│   ├── landing/content.ts        # Landing page content data
│   ├── icon.tsx                  # Dynamic favicon
│   └── opengraph-image.tsx       # OG image generator
│
├── components/
│   ├── viewer/                   # 3D Viewer components (14 files)
│   │   ├── SceneCanvas.tsx       # R3F Canvas wrapper
│   │   ├── ModelOBJ.tsx          # OBJ model loader (ACTIVE)
│   │   ├── Model.tsx             # GLTF model loader (UNUSED)
│   │   ├── ViewerToolbar.tsx     # Top toolbar
│   │   ├── ViewerSideToolbar.tsx # Right side toolbar
│   │   ├── ViewerZoomSlider.tsx  # Bottom zoom slider
│   │   ├── ViewerHeader.tsx      # Header (shared across pages)
│   │   ├── DraggablePanel.tsx    # Floating panel container
│   │   ├── AutoFitCamera.tsx     # Camera fit (UNUSED - duped in ModelOBJ)
│   │   ├── CameraSync.tsx        # Camera ↔ Store sync
│   │   ├── ViewerScene.tsx       # Scene wrapper (UNUSED)
│   │   ├── MemoPanel.tsx         # Memo stub (UNUSED - replaced by NotesPanel)
│   │   └── Stats.tsx             # Performance stats overlay
│   │
│   ├── panels/                   # UI Panels (26 files, 13 active + 13 storybook)
│   │   ├── ChatInterface.tsx     # Viewer chat panel (9.5KB)
│   │   ├── ChatInput.tsx         # Chat input component
│   │   ├── ChatMessage.tsx       # Chat message bubble
│   │   ├── ChatSidebar.tsx       # Chat session sidebar
│   │   ├── ChatHistoryTab.tsx    # Chat history tab
│   │   ├── NotesPanel.tsx        # Study notes panel
│   │   ├── PartInfoPanel.tsx     # Part info panel
│   │   ├── QuizPanel.tsx         # Quiz panel
│   │   ├── ai-assistant.tsx      # (Storybook-only)
│   │   ├── footer.tsx            # (Storybook-only)
│   │   ├── login-header.tsx      # (Storybook-only)
│   │   ├── navigation.tsx        # (Storybook-only)
│   │   ├── part-sidebar.tsx      # (Storybook-only)
│   │   ├── secondary-nav.tsx     # (Storybook-only)
│   │   └── tool-bar.tsx          # (Storybook-only)
│   │
│   ├── ui/                       # shadcn/ui components
│   ├── sections/                 # Landing page sections
│   ├── layout/                   # Layout components (landing-header)
│   ├── layouts/                  # Layout wrappers (main-layout)
│   └── common/                   # Shared (AuthInit, Icon)
│
├── hooks/
│   ├── use-chat-session.ts       # Chat session management
│   ├── use-chat-stream.ts        # SSE stream handling
│   ├── use-intersection-observer.ts
│   ├── use-part-data.ts          # Part data lookup
│   ├── use-store-hydration.ts    # Zustand hydration
│   ├── use-toast.ts              # Toast notifications
│   ├── use-three/                # Three.js specific hooks
│   └── use-ui/                   # UI specific hooks
│
├── stores/
│   ├── scene-store.ts            # 3D scene state (model, camera, explode)
│   └── ui-store.ts               # UI state (panels, toolbar, modes)
│
├── lib/
│   ├── api/
│   │   ├── client.ts             # Real API client (fetch wrapper)
│   │   ├── mock.ts               # Mock API implementation
│   │   ├── index.ts              # API switcher (mock vs real)
│   │   └── error-handler.ts      # Error utilities
│   ├── validation/               # Zod schemas (chat, model, note, user)
│   ├── sanitize.ts               # DOMPurify wrappers
│   ├── mock-data.ts              # Legacy mock data (UNUSED)
│   ├── utils.ts                  # cn() utility
│   └── env.ts                    # Environment validation
│
├── types/
│   ├── api.ts                    # Backend API types (OpenAPI aligned)
│   └── chat.ts                   # Chat domain types
│
└── proxy.ts                      # Middleware proxy
```

### 데이터 흐름

```
[Clerk Auth] → AuthInit → configureAuth(getToken)
                               ↓
[User Action] → Page Component → Hook (use-chat-session/stream)
                                      ↓
                               api (index.ts) → mock.ts (dev) / client.ts (prod)
                                      ↓                              ↓
                               Mock Response              Real Backend (Railway)
                                      ↓                              ↓
                               Zustand Store ← ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ┘
                                      ↓
                               React Component (re-render via selector)
```

---

## 불일치 목록

| #   | 영역                   | 현재                                                                        | 제안                                                                        | 이유                                                                                        |
| --- | ---------------------- | --------------------------------------------------------------------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| 1   | **파일 네이밍**        | `ChatInterface.tsx` (PascalCase) vs `ai-assistant.tsx` (kebab-case)         | 앱 컴포넌트: PascalCase, Storybook-only: 별도 디렉토리                      | panels/ 내 네이밍 혼재로 실제 사용 파일 식별 어려움                                         |
| 2   | **디렉토리**           | `components/layout/` vs `components/layouts/`                               | `components/layout/`로 통일                                                 | 단수/복수 혼재. layout에는 `landing-header.tsx`, layouts에는 `main-layout.tsx`              |
| 3   | **Dead Code**          | `Model.tsx`, `AutoFitCamera.tsx`, `ViewerScene.tsx`, `MemoPanel.tsx` 미사용 | 삭제 또는 `_deprecated/` 이동                                               | 실제 사용 컴포넌트와 혼재되어 혼란 유발                                                     |
| 4   | **타입 정의 위치**     | `ChatInterface.tsx:34` 에 `Message` 인터페이스 중복 정의                    | `types/chat.ts`의 `Message` 재사용                                          | 동일 인터페이스 2곳 정의 — 불일치 위험                                                      |
| 5   | **Deprecated 타입**    | `types/api.ts:429-449` deprecated aliases (`Part`, `ChatSession` 등)        | 사용처 마이그레이션 후 제거                                                 | 새 코드에서 deprecated 타입 사용 가능성                                                     |
| 6   | **Mock 데이터**        | `lib/mock-data.ts` (레거시) + `lib/api/mock.ts` (현재)                      | `lib/mock-data.ts` 삭제                                                     | 두 곳에 mock 데이터 존재. `mock-data.ts`는 `part-sidebar.tsx` (Storybook-only)에서만 import |
| 7   | **상태 관리 경계**     | `ChatInterface.tsx`에서 자체 sessionId 관리 vs `use-chat-session.ts` 훅     | `ChatInterface`도 `use-chat-session` 훅 사용                                | 뷰어 내 채팅과 독립 채팅 페이지에서 세션 관리 로직 중복                                     |
| 8   | **API modelId 타입**   | `createSession("1")` — string 하드코딩                                      | `createSession(modelId)` — store에서 가져오기                               | 3곳에서 `"1"` 하드코딩. 다중 모델 미지원                                                    |
| 9   | **Storybook 컴포넌트** | `panels/` 내 앱 컴포넌트와 Storybook-only 컴포넌트 혼재                     | Storybook-only 컴포넌트를 별도 디렉토리 또는 `*.story-component.tsx` 네이밍 | 7개 Storybook-only 파일이 실제 앱 코드와 섞여있음                                           |
| 10  | **에러 핸들링**        | `client.ts`에 401/503 처리, 나머지 상태 코드는 generic                      | 429 (Rate Limit), 422 (Validation) 등 추가 처리                             | 백엔드 OpenAPI에 422 ValidationError 정의되어 있으나 프론트에서 미활용                      |
| 11  | **환경 변수 검증**     | `lib/env.ts`에 Zod 기반 검증 ✅                                             | 현재 양호                                                                   | -                                                                                           |
| 12  | **CSS zoom 보정**      | `max-[1919px]:scale-[1.3333]` 패턴 반복                                     | CSS 변수 또는 유틸 클래스로 추출                                            | 4개 페이지에서 동일 패턴 반복                                                               |

---

## 상태 관리 분석

### 현재 구조

| 스토어        | 책임                                                                              | Persist                | 크기  |
| ------------- | --------------------------------------------------------------------------------- | ---------------------- | ----- |
| `scene-store` | modelId, selectedObject, camera (pos/rot/target), explodeLevel                    | localStorage           | 117줄 |
| `ui-store`    | panels (chat/partInfo/notes), toolbar (viewer/side), modes (wireframe/cameraLock) | localStorage (partial) | 119줄 |

### 평가

**강점:**

- Scene ≠ UI 분리 원칙 준수
- `partialize`로 영속화 대상 명시적 제어
- `skipHydration: true`로 SSR 호환성 확보
- 개별 셀렉터 사용으로 불필요한 리렌더 최소화

**개선점:**

- **서버 상태(API 데이터) vs 클라이언트 상태 미분리**: 채팅 세션 데이터가 `use-chat-stream` 훅의 `useState`에 저장됨. SWR/React Query 도입 시 캐싱, 재검증, 낙관적 업데이트 가능.
- **ChatInterface 자체 session 관리**: `use-chat-session` 훅과 중복. ChatInterface가 viewer 패널용으로 별도 관리하지만 로직이 거의 동일.

---

## API 레이어 분석

### 현재 구조

```
api/index.ts (SimvexApi 인터페이스)
    ├── USE_MOCK_API=true  → api/mock.ts (mockApi)
    └── USE_MOCK_API=false → api/client.ts (realApi)
```

### 평가

**강점:**

- `SimvexApi` 인터페이스로 Mock/Real 간 계약 보장
- `configureAuth()` 패턴으로 Clerk 토큰 레이지 주입
- `ApiClientError` 커스텀 에러 클래스로 구조적 에러 처리
- `AbortSignal.timeout()` 기반 요청 타임아웃

**개선점:**

| #   | 현재                                                            | 제안                                                                                                                                                            |
| --- | --------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | 401 시 `_getToken = null` + `window.location.href = "/sign-in"` | 토큰 갱신 시도 후 실패 시에만 리다이렉트. 현재는 일시적 토큰 만료에도 즉시 리다이렉트                                                                           |
| 2   | Mock SSE가 plain text 전송 (`data: line1\ndata: line2\n\n`)     | Real API는 JSON SSE 가능성. `use-chat-stream.ts`에서 JSON 파싱 시도 → 실패 시 plain text 처리하는 이중 로직은 방어적이나, Mock과 Real 형식을 명확히 문서화 필요 |
| 3   | `streamMessage`에 자체 fetch (apiFetch 미사용)                  | SSE 특성상 불가피하나, 인증 헤더 처리 로직이 `apiFetch`와 중복                                                                                                  |
| 4   | `error-handler.ts`의 유틸들이 client.ts에서 미사용              | `sanitizeError`, `createErrorResponse` 등이 export만 되고 실제 사용처 없음                                                                                      |

---

## 컴포넌트 아키텍처

### 페이지별 컴포넌트 의존성

```
/ (Landing)
  └── LandingHeader
  └── LandingIntroSection
  └── LandingFunctionsSection
  └── LandingPivotSection
  └── LandingStudyModelSection
  └── LandingFooterSection

/study
  └── ViewerHeader
  └── ChatInput
  └── GradientBorder
  └── api.chat.createSession (하드코딩 "1")

/viewer
  └── ViewerHeader
  └── SceneCanvas → Canvas, OrbitControls, CameraSync, FocusController, Stats
  └── ModelOBJ → OBJLoader, useSceneStore, useUIStore
  └── ViewerToolbar
  └── ViewerSideToolbar
  └── ViewerZoomSlider
  └── DraggablePanel × 3
      ├── ChatInterface → useChatStream, MarkdownRenderer, sanitizeMarkdown
      ├── PartInfoPanel → usePartData, useSceneStore
      └── NotesPanel → api.notes, useSceneStore

/chat
  └── ViewerHeader
  └── ChatSidebar → api.chat.listSessions, ChatHistoryTab
  └── ChatMessage → MarkdownRenderer
  └── ChatInput
  └── useChatSession → useChatStream → api.chat.streamMessage

/study/chat (동일 구조)
```

### 컴포넌트 크기 분포

| 파일                 | 크기    | 비고                                      |
| -------------------- | ------- | ----------------------------------------- |
| ModelOBJ.tsx         | 10,077B | 가장 큼. OBJ 로딩 + 인터랙션 + 애니메이션 |
| ChatInterface.tsx    | 9,551B  | 세션 관리 + 메시지 렌더링 + 컨텍스트 주입 |
| Model.tsx            | 7,613B  | **미사용** (GLTF 로더)                    |
| ViewerToolbar.tsx    | 7,145B  | 6개 툴 버튼                               |
| ViewerHeader.tsx     | 6,871B  | 네비게이션 + 인증 버튼                    |
| ViewerZoomSlider.tsx | 6,470B  | 줌 슬라이더 UI                            |

**소견**: `ModelOBJ.tsx`와 `ChatInterface.tsx`가 각각 ~10KB로 적절한 수준. 추가 분리 불필요.

---

## 리팩토링 로드맵

### P0 — 배포 차단 (즉시)

| #   | 작업                                                 | 예상 시간 | 영향 범위                        |
| --- | ---------------------------------------------------- | --------- | -------------------------------- |
| 1   | `isomorphic-dompurify` → 클라이언트 전용 import 전환 | 30분      | `lib/sanitize.ts`, 관련 컴포넌트 |

**방안**: `sanitize.ts`에서 `typeof window === "undefined"` 체크 후 서버에서는 no-op 반환, 또는 `next/dynamic`으로 MarkdownRenderer를 SSR 비활성화.

### P1 — 핵심 기능 수정 (1일 이내)

| #   | 작업                                        | 예상 시간 | 영향 범위                                                    |
| --- | ------------------------------------------- | --------- | ------------------------------------------------------------ |
| 2   | `createSession("1")` → modelId 동적 전달    | 1시간     | `use-chat-session.ts`, `study/page.tsx`, `ChatInterface.tsx` |
| 3   | SSE timeout 리셋 수정                       | 30분      | `use-chat-stream.ts`                                         |
| 4   | `not-found.tsx` 페이지 추가                 | 30분      | `src/app/not-found.tsx` 신규                                 |
| 5   | `html2canvas` + `jspdf` dynamic import 전환 | 1시간     | 사용처 파일                                                  |

### P2 — 코드 품질 (3일 이내)

| #   | 작업                                                                                        | 예상 시간 | 영향 범위          |
| --- | ------------------------------------------------------------------------------------------- | --------- | ------------------ |
| 6   | Dead code 제거 (Model.tsx, AutoFitCamera.tsx, ViewerScene.tsx, MemoPanel.tsx, mock-data.ts) | 1시간     | 5개 파일 삭제      |
| 7   | Storybook-only 컴포넌트 분리 (`panels/_storybook/`)                                         | 1시간     | 7개 파일 이동      |
| 8   | `components/layout/` + `components/layouts/` 통합                                           | 30분      | 2개 디렉토리 → 1개 |
| 9   | `ChatInterface` Message 타입 중복 제거                                                      | 15분      | 1개 파일           |
| 10  | Deprecated type aliases 제거                                                                | 30분      | `types/api.ts`     |
| 11  | `error-handler.ts` 미사용 exports 정리                                                      | 15분      | 1개 파일           |

### P3 — 아키텍처 개선 (다음 스프린트)

| #   | 작업                                                   | 예상 시간 | 영향 범위        |
| --- | ------------------------------------------------------ | --------- | ---------------- |
| 12  | SWR/React Query 도입 (서버 상태 관리)                  | 3시간     | API 호출 전체    |
| 13  | Chat 세션 관리 통합 (ChatInterface + use-chat-session) | 2시간     | 채팅 관련 파일   |
| 14  | panels/ 네이밍 통일 (PascalCase)                       | 1시간     | 13개 파일 리네임 |
| 15  | 401 에러 시 토큰 갱신 로직 추가                        | 2시간     | `client.ts`      |
| 16  | CSS zoom 보정 유틸 클래스 추출                         | 30분      | 4개 페이지       |

---

## 총 예상 작업량

| 우선순위       | 작업 수 | 예상 시간     |
| -------------- | ------- | ------------- |
| P0 (배포 차단) | 1       | 30분          |
| P1 (핵심)      | 4       | 3시간         |
| P2 (품질)      | 6       | 3.5시간       |
| P3 (아키텍처)  | 5       | 8.5시간       |
| **합계**       | **16**  | **~15.5시간** |

---

## 전체 평가

SIMVEX 프론트엔드는 **10일 단기 프로젝트로서 완성도가 높은 편**입니다.

**아키텍처 강점:**

- API 추상화 레이어 (Mock/Real 전환) 잘 설계됨
- Zustand 상태 분리 (Scene vs UI) 명확
- Three.js 리소스 관리 패턴 우수
- 보안 (sanitization, 입력 검증, Zod 스키마) 고려됨
- TypeScript strict mode, `any` 미사용

**아키텍처 약점:**

- SSR 호환성 문제 (isomorphic-dompurify)로 배포 불가
- Dead code 축적 (빠른 개발 속도의 부산물)
- 네이밍/디렉토리 규칙 불일치
- 서버 상태 캐싱 전략 부재

P0 수정(30분) 이후 즉시 배포 가능하며, P1 수정(3시간)까지 완료하면 안정적인 MVP 수준에 도달합니다.
