# SIMVEX E2E Test Report

> Generated: 2026-02-10T03:30:00+09:00
> Tester: Claude Code (ralph loop)

## 환경

| 항목            | 값                                                     |
| --------------- | ------------------------------------------------------ |
| Mock 워크트리   | `C:\Users\kooch\projects\3rd-frontend` (포트 3000)     |
| Real API 백엔드 | `https://3rd-backend-production.up.railway.app/api/v1` |
| Node.js         | v24.13.0                                               |
| npm             | 11.6.2                                                 |
| Next.js         | 16.1.6 (webpack mode)                                  |
| React           | 19.2.3                                                 |
| Three.js        | 0.182.0                                                |
| TypeScript      | 5.9                                                    |

> **참고**: 동일 프로젝트 디렉토리에서 `.next` 디렉토리 lock으로 인해 두 개의 dev 서버를 동시에 실행할 수 없었습니다. Mock API 서버(포트 3000)에서 전체 라우트 테스트를 수행하고, Real API는 직접 curl로 엔드포인트별 테스트를 진행했습니다.

## 코드베이스 분석 요약

| 항목           | 값                                               |
| -------------- | ------------------------------------------------ |
| 소스 파일 수   | 148개 (.ts, .tsx)                                |
| 총 코드 라인   | 17,160줄                                         |
| 페이지 라우트  | 10개                                             |
| Zustand 스토어 | 2개 (scene-store, ui-store)                      |
| API 엔드포인트 | 10개 (health, auth×2, models×2, chat×4, notes×2) |
| 커스텀 훅      | 7개                                              |

### 잠재 위험 포인트

1. **isomorphic-dompurify → jsdom 의존성**: SSR 시 `default-stylesheet.css` ENOENT 에러로 `/chat`, `/viewer`, `/study/chat` 페이지 500 에러 유발 (Critical)
2. **Real API 모델 데이터 비어있음**: `GET /api/v1/models` → `[]` 반환. 프론트엔드의 모든 모델 관련 기능 동작 불가
3. **404 페이지 미구현**: 존재하지 않는 라우트 접근 시 404 대신 307 리다이렉트 반환
4. **Chat 세션 하드코딩**: `createSession("1")` — modelId가 항상 "1"로 하드코딩 (use-chat-session.ts:65, study/page.tsx:47)

---

## 테스트 결과 요약

| 구분                  | Pass   | Fail   | Skip   | Total  |
| --------------------- | ------ | ------ | ------ | ------ |
| Phase 0: 빌드 검증    | 1      | 2      | 0      | 3      |
| Phase 1: 라우팅       | 6      | 3      | 1      | 10     |
| Phase 2: 랜딩 페이지  | 5      | 0      | 0      | 5      |
| Phase 3: Study 페이지 | 2      | 1      | 1      | 4      |
| Phase 4: 3D 뷰어      | 0      | 1      | 8      | 9      |
| Phase 5: 채팅 페이지  | 0      | 1      | 6      | 7      |
| Phase 6: API 레이어   | 5      | 3      | 1      | 9      |
| Phase 7: 코드 분석    | 8      | 5      | 0      | 13     |
| **합계**              | **27** | **16** | **17** | **60** |

---

## 상세 결과

### Phase 0: 빌드 검증

#### [PASS] TypeScript 컴파일 (tsc --noEmit)

- 환경: Both
- 설명: `npx tsc --noEmit` 종료 코드 0. 타입 에러 없음.

#### [FAIL] Next.js Production 빌드 (npm run build)

- 환경: Both
- 증상: `/chat` 페이지 prerendering 중 `ENOENT: no such file or directory, open '.next\browser\default-stylesheet.css'` 에러로 빌드 실패
- 관련 파일: `src/lib/sanitize.ts:8` — `import DOMPurify from "isomorphic-dompurify"` → jsdom이 SSR 환경에서 stylesheet 파일을 찾으려 시도
- 심각도: **Critical**
- 로그:
  ```
  Error occurred prerendering page "/chat"
  Error: ENOENT: no such file or directory, open '.next\browser\default-stylesheet.css'
      at jsdom/lib/jsdom/living/helpers/style-rules.js
  ```

#### [FAIL] CSS 최적화 경고 6건

- 환경: Both
- 증상: Tailwind v4 CSS 변수에서 `/` 토큰 관련 경고 6건 (`gap: var(--spacing/4,4px)` 등)
- 관련 파일: Tailwind CSS v4 생성 코드
- 심각도: **Minor** (기능에 영향 없음, 미적 경고)

### Phase 1: 라우팅 & 페이지 로드

#### [PASS] `GET /` → 200

- 환경: Mock
- 설명: 랜딩 페이지 정상 렌더링. 5개 섹션 포함.

#### [PASS] `GET /study` → 200

- 환경: Mock
- 설명: Study 대시보드 정상 렌더링.

#### [FAIL] `GET /chat` → 500

- 환경: Mock
- 증상: isomorphic-dompurify → jsdom → `default-stylesheet.css` ENOENT
- 심각도: **Critical**
- 재현: `curl http://localhost:3000/chat`

#### [FAIL] `GET /viewer` → 500

- 환경: Mock
- 증상: 동일한 jsdom ENOENT 에러
- 심각도: **Critical**

#### [FAIL] `GET /viewer?modelId=1` → 500

- 환경: Mock
- 증상: 위와 동일
- 심각도: **Critical**

#### [PASS] `GET /sign-in` → 200

- 환경: Mock
- 설명: Clerk sign-in 페이지 정상.

#### [PASS] `GET /sign-up` → 200

- 환경: Mock
- 설명: Clerk sign-up 페이지 정상.

#### [PASS] `GET /sso-callback` → 307

- 환경: Mock
- 설명: SSO 콜백 리다이렉트 정상 (인증 흐름).

#### [PASS] `GET /toast-demo` → 200

- 환경: Mock
- 설명: 토스트 데모 페이지 정상.

#### [SKIP] `GET /lab` → 307

- 사유: Lab 페이지 자체가 "아직 개발되지 않았어요!" placeholder 상태. 307 리다이렉트는 Clerk 미들웨어에 의한 것으로 추정.

### Phase 2: 랜딩 페이지 (`/`)

#### [PASS] 5개 섹션 DOM 존재

- 환경: Mock
- 설명: HTML 응답에서 `id="intro"`, `id="functions"`, `id="pivot"`, `id="models"`, `id="footer"` 5개 섹션 확인. 각 섹션에 `h-screen` 클래스 적용.

#### [PASS] 헤더 네비게이션 렌더링

- 환경: Mock
- 설명: `<header>` 내에 5개 nav 링크 (`소개`, `기능`, `AI 튜터`, `학습 모델`, `문의`) 렌더링 확인. `section-change` CustomEvent 기반 스크롤 동기화 구현.

#### [PASS] 로그인/시작하기 버튼 렌더링

- 환경: Mock
- 설명: `<a href="/sign-in">` → `로그인/가입` 버튼, `<a href="/viewer">` → `시작하기` 버튼 확인.

#### [PASS] CTA 버튼 렌더링

- 환경: Mock
- 설명: `지금 바로 학습 시작하기` 버튼이 intro 섹션에 존재. `shadow-glow-md` 글로우 효과 적용.

#### [PASS] 기능 카드 3개 렌더링

- 환경: Mock
- 설명: `3D 몰입형 인터랙션`, `AI 기반 맞춤형 튜터링`, `정교한 데이터 시각화` 3개 카드. 각각 이미지, 제목, 설명 포함.

### Phase 3: Study 페이지 (`/study`)

#### [PASS] 페이지 레이아웃 렌더링

- 환경: Mock
- 설명: 2-column 레이아웃 (AI Chat 55% + Memo/Quiz 45%) 확인. ViewerHeader 포함.

#### [PASS] Quick Action Chips 렌더링

- 환경: Mock
- 설명: 4개 칩 (`학습에 관한 도움받기`, `학습 내용 바탕의 퀴즈`, `부품 정보 불러오기`, `PDF 리포트 출력`) 렌더링 확인.

#### [FAIL] 모델 리스트 미표시

- 환경: Both
- 증상: Study 페이지에 모델 리스트를 보여주는 UI가 없음. 코드 분석 결과 Study 페이지는 AI Chat 대시보드이며, 모델 선택은 별도 UI를 통해야 하지만 해당 라우트가 없음.
- 심각도: **Major**

#### [SKIP] 모델 카드 클릭 → 뷰어 이동

- 사유: Study 페이지에 모델 카드 리스트가 없어 테스트 불가.

### Phase 4: 3D 뷰어 (`/viewer?modelId=X`)

#### [FAIL] 페이지 로드 (500 에러)

- 환경: Mock
- 증상: isomorphic-dompurify jsdom 에러로 SSR 실패. 페이지 전체가 500 반환.
- 심각도: **Critical**
- 관련 파일: `src/components/panels/ChatInterface.tsx` → `src/lib/sanitize.ts` → `isomorphic-dompurify`

#### [SKIP] Canvas 마운트 & WebGL 컨텍스트

- 사유: 페이지 500 에러로 테스트 불가. 코드 분석: `SceneCanvas.tsx`에서 `<Canvas>` 마운트, `useEffect`로 resize 이벤트 발행하여 react-use-measure 보정.

#### [SKIP] OBJ 모델 로딩

- 사유: 페이지 500 에러. 코드 분석: `ModelOBJ.tsx`에서 OBJLoader로 URL 기반 로딩. `disposeObject()` cleanup 구현, bounding box 기반 auto-fit camera 구현.

#### [SKIP] OrbitControls 마운트

- 사유: 페이지 500 에러. 코드 분석: `SceneCanvas.tsx:75` — `<OrbitControls makeDefault>` 사용, `isCameraLocked` 스토어 연동.

#### [SKIP] 툴바 렌더링

- 사유: 페이지 500 에러. 코드 분석: `ViewerToolbar.tsx` (explode, grid, wireframe, parts, camera-lock, measure), `ViewerSideToolbar.tsx` (ai, search, edit).

#### [SKIP] DraggablePanel 열기/닫기

- 사유: 페이지 500 에러. 코드 분석: `DraggablePanel.tsx` — AnimatePresence 기반, side tool 상태로 3개 패널(AI, PartInfo, Memo) 토글.

#### [SKIP] Notes 패널 modelId 연동

- 사유: 페이지 500 에러. 코드 분석: `NotesPanel.tsx` — scene-store의 modelId와 selectedObject 사용.

#### [SKIP] AutoFitCamera 동작

- 사유: 페이지 500 에러. 코드 분석: `ModelOBJ.tsx:200-233` — useFrame 내에서 bounding sphere 기반 자동 카메라 위치 계산. `hasSavedCamera` 플래그로 최초 로드 시만 실행.

#### [SKIP] Zoom 슬라이더

- 사유: 페이지 500 에러. 코드 분석: `ViewerZoomSlider.tsx` — 범위 슬라이더 + Three.js 카메라 fov 동기화.

### Phase 5: 채팅 페이지 (`/chat`)

#### [FAIL] 페이지 로드 (500 에러)

- 환경: Mock
- 증상: isomorphic-dompurify jsdom 에러
- 심각도: **Critical**
- 참고: `/study/chat` 도 동일하게 500 에러

#### [SKIP] 세션 사이드바 렌더링

- 사유: 페이지 500 에러. 코드 분석: `ChatSidebar.tsx` — 세션 목록, 새 채팅 버튼, 세션 선택/삭제 구현.

#### [SKIP] SSE 스트리밍 수신

- 사유: 페이지 500 에러. 코드 분석: `use-chat-stream.ts` — ReadableStream 기반 SSE 파싱, `data:` 프리픽스 처리, JSON/plain text 핸들링, 30초 timeout, AbortController cleanup.

#### [SKIP] 마크다운 렌더링

- 사유: 페이지 500 에러. 코드 분석: `ChatMessage.tsx` → `MarkdownRenderer` 사용. `sanitizeMarkdown()` 통해 XSS 방지.

#### [SKIP] 세션 전환 시 히스토리 로드

- 사유: 페이지 500 에러. 코드 분석: `use-chat-session.ts:141-165` — `selectSession()` 함수가 `api.chat.getMessages()` 호출 후 역순 정렬하여 렌더링.

#### [SKIP] 빈 입력 전송 방지

- 사유: 페이지 500 에러. 코드 분석: `use-chat-stream.ts:21` — `if (!content.trim() || !effectiveSessionId) return;` 가드 확인.

#### [SKIP] 긴 메시지 입력 처리

- 사유: 페이지 500 에러. 코드 분석: `use-chat-session.ts:30` — `initialMessage.trim().length <= 5000` 길이 제한 확인. 일반 메시지에는 길이 제한 없음 (잠재 문제).

### Phase 6: API 레이어 비교

#### [PASS] Mock API: health 엔드포인트

- 환경: Mock
- 설명: `mockApi.health.check()` → `{ status: "ok", version: "mock" }` 반환.

#### [PASS] Real API: health 엔드포인트

- 환경: Real
- 설명: `GET /api/v1/health` → `{"status":"ok"}` (200)

#### [PASS] Real API: models 엔드포인트 (인증 불필요)

- 환경: Real
- 설명: `GET /api/v1/models` → `[]` (200). 빈 배열 반환 — 백엔드에 모델 데이터 미등록.

#### [FAIL] Real API: 모델 데이터 비어있음

- 환경: Real
- 증상: `GET /api/v1/models` → `[]`. Mock에는 3개 모델(V4 Engine, Robot Arm, Manual Gearbox)이 있으나 Real API는 비어있음.
- 심각도: **Major** (Real API 환경에서 전체 학습 기능 동작 불가)

#### [PASS] Real API: 인증 필요 엔드포인트 거부

- 환경: Real
- 설명: `GET /api/v1/chat/sessions` → `{"detail":"Missing authorization header"}`. 인증 없이 접근 시 적절한 에러 반환.

#### [PASS] Real API: notes 엔드포인트 인증 요구

- 환경: Real
- 설명: `GET /api/v1/notes?model_id=1` → `{"detail":"Missing authorization header"}`. 동일.

#### [FAIL] 프론트엔드 타입 vs OpenAPI 스키마: 부분 불일치

- 환경: Both
- 증상:
  - `HealthCheck`: OpenAPI에는 `status: string`만 있으나, mock에는 `version: "mock"` 추가 필드 반환 — minor
  - `UserResponse`: 프론트엔드 타입과 OpenAPI 일치 ✅
  - `ModelDetail`, `ChatSessionResponse`, `StudyNoteResponse`: 프론트엔드 타입과 OpenAPI 일치 ✅
  - `ChatMessageResponse.role`: OpenAPI는 `string`, 프론트엔드 타입도 `string` — 일치하나 `"user" | "assistant"` 같은 union이면 더 안전
- 심각도: **Minor**

#### [FAIL] Mock ↔ Real 응답 구조 diff

- 환경: Both
- 증상:
  - Mock `health.check()` → `{ status: "ok", version: "mock" }` vs Real → `{ status: "ok" }` — `version` 필드 불일치
  - Mock `auth.login()` → `{ id: "mock-1", email: "mock@test.com", username: "Mock User" }` 하드코딩 (실제 Clerk 인증 무시)
  - Mock `models.list()` → 3개 모델 vs Real → 빈 배열
- 심각도: **Minor** (Mock 특성상 예상 범위)

#### [SKIP] SSE 스트리밍 비교

- 사유: Real API에 인증 토큰 없어 SSE 테스트 불가. Mock의 SSE 구현은 `data: {text}\n\n` 형식이며 OpenAPI 명세와 일치.

### Phase 7: 코드 분석 기반 추가 테스트

#### [PASS] TypeScript `any` 남용 점검

- 설명: `src/` 전체 검색 결과 `any` 타입 사용 0건. Zod 스키마 기반 검증 레이어도 별도 존재 (`src/lib/validation/`).

#### [PASS] XSS 방지

- 설명: `isomorphic-dompurify` 기반 `sanitizeHtml()`, `sanitizeMarkdown()`, `sanitizeUrl()` 유틸리티 구현. AI 응답 렌더링 시 `sanitizeMarkdown()` 적용 확인 (`ChatInterface.tsx:249`).

#### [PASS] Three.js 리소스 정리

- 설명: `ModelOBJ.tsx:26-43` — `disposeObject()` 함수가 geometry, material, texture 정리. 모델 교체 시 기존 children 순회하며 dispose + remove 처리.

#### [PASS] AbortController cleanup

- 설명: `use-chat-stream.ts:42-47` — 이전 스트림 abort, 30초 timeout 구현. `use-chat-session.ts` — cancelled 플래그 패턴 미사용이나 sessionCreating state로 중복 호출 방지.

#### [PASS] 이벤트 리스너 정리

- 설명: `src/app/page.tsx:136-143` — wheel, touchstart, touchend, keydown, navigate-to-section 리스너 모두 cleanup. `cancelAnimationFrame` 호출 확인.

#### [PASS] Zustand 셀렉터 사용

- 설명: 대부분의 컴포넌트에서 개별 셀렉터 패턴 사용 (`useSceneStore((state) => state.selectedObject)` 등). 불필요한 리렌더 최소화.

#### [PASS] CSS 변수 사용 (하드코딩 색상 없음)

- 설명: `bg-background`, `text-primary`, `bg-neutral-900` 등 Tailwind/CSS 변수 기반. `#fff` 같은 하드코딩 색상 미발견.

#### [PASS] `use client` 지시어

- 설명: 모든 R3F 컴포넌트, 훅 사용 컴포넌트에 `"use client"` 포함 확인.

#### [FAIL] 404 페이지 미구현

- 증상: `/nonexistent-xyz` → 307 (리다이렉트). `src/app/not-found.tsx` 파일 부재. Clerk 미들웨어가 미인증 요청을 리다이렉트하는 것으로 추정.
- 심각도: **Major**
- 관련 파일: `src/middleware.ts` (Clerk 미들웨어)

#### [FAIL] Chat 세션 modelId 하드코딩

- 증상: `use-chat-session.ts:65`, `use-chat-session.ts:100`, `study/page.tsx:47` — 모두 `createSession("1")`로 modelId 하드코딩.
- 심각도: **Major** (여러 모델 지원 시 문제)

#### [FAIL] 일반 메시지 길이 제한 없음

- 증상: `use-chat-session.ts`의 `sendMessage()` 함수에 message 길이 제한 없음. `validatedInitialMessage`에만 5000자 제한 적용.
- 심각도: **Minor** (서버에서 제한 가능)

#### [FAIL] SSE 스트림 timeout 리셋 불완전

- 증상: `use-chat-stream.ts:80` — `clearTimeout(timeoutId)` 호출은 있으나 새 timeout을 재설정하지 않음. 첫 청크 이후 timeout이 해제되어 이후 무한 대기 가능.
- 심각도: **Major**

#### [FAIL] Dead Code 발견

- 증상:
  - `src/components/viewer/Model.tsx` (7,613 bytes) — `ModelOBJ.tsx`와 별도로 존재하는 GLTF 모델 로더. 현재 어디서도 import되지 않음.
  - `src/components/viewer/AutoFitCamera.tsx` — 독립 컴포넌트이나 `ModelOBJ.tsx` 내부에 동일 기능 구현됨. 미사용.
  - `src/components/viewer/ViewerScene.tsx` (762 bytes) — default export이나 `page.tsx`에서 직접 `SceneCanvas` 사용.
  - `src/components/viewer/MemoPanel.tsx` — "메모를 입력하세요" placeholder만 있는 stub. `NotesPanel`이 실제 사용됨.
  - `src/lib/mock-data.ts` — 레거시 mock 데이터. `api/mock.ts`에 동일 기능 구현.
  - `src/proxy.ts` — middleware proxy 파일. 실제 사용 여부 확인 필요.
  - Legacy type aliases: `types/api.ts:429-449` — `Part`, `PartGeometry`, `ChatSession`, `ChatMessage`, `StudyNote` deprecated aliases.
  - `src/components/panels/` 내 다수 Storybook-전용 컴포넌트: `ai-assistant.tsx`, `footer.tsx`, `login-header.tsx`, `navigation.tsx`, `part-sidebar.tsx`, `secondary-nav.tsx`, `tool-bar.tsx` — Storybook stories와 쌍으로만 존재, 실제 앱에서 미사용.
- 심각도: **Minor** (기능 영향 없으나 유지보수 부담)

---

## 발견 사항 (코드 분석)

### Critical Issues

1. **isomorphic-dompurify SSR 호환성 실패**
   - `isomorphic-dompurify` 패키지가 내부적으로 jsdom을 사용하는데, Next.js 16 (webpack mode)의 SSR 환경에서 `default-stylesheet.css` 파일을 찾지 못함
   - 영향: `/chat`, `/viewer`, `/study/chat` 3개 핵심 페이지 모두 500 에러
   - 해결 방안: `dompurify` + `isomorphic-dompurify` 대신 서버 사이드에서는 sanitization을 skip하거나, `dynamic(() => import(...), { ssr: false })` 패턴 적용

2. **Next.js Production 빌드 실패**
   - 위와 동일한 원인으로 `npm run build` 자체가 실패
   - **배포 불가 상태**

### Major Issues

3. **Real API 모델 데이터 부재**: 백엔드 `/api/v1/models` 빈 배열 반환
4. **404 페이지 미구현**: `not-found.tsx` 부재
5. **Chat modelId 하드코딩**: 항상 `"1"` 사용
6. **SSE timeout 리셋 누락**: 첫 청크 이후 timeout 해제

### Minor Issues

7. **Dead code**: Model.tsx, AutoFitCamera.tsx, ViewerScene.tsx, MemoPanel.tsx, mock-data.ts 등
8. **Tailwind v4 CSS 경고**: `var(--spacing/4,4px)` 문법
9. **Mock ↔ Real 응답 차이**: health 엔드포인트의 `version` 필드

---

## 최적화 제안

### 번들 & 로딩 성능

| #   | 현재 상태                             | 개선 방안                                                    | 예상 효과                       | 우선순위 |
| --- | ------------------------------------- | ------------------------------------------------------------ | ------------------------------- | -------- |
| 1   | `isomorphic-dompurify` (jsdom 번들링) | `dompurify` 클라이언트 전용 + dynamic import                 | 번들 ~200KB 절감, SSR 에러 해결 | **P0**   |
| 2   | Three.js 전체 import (`three`)        | Tree-shake 미사용 모듈 또는 `three/examples/jsm` 직접 import | 번들 50-100KB 절감              | P2       |
| 3   | Dead code 파일 11개+                  | 미사용 파일 삭제                                             | 유지보수 부담 감소              | P3       |
| 4   | `html2canvas`, `jspdf` 항상 번들      | dynamic import로 전환 (PDF 출력 시에만 로드)                 | 초기 로드 ~500KB 절감           | P1       |

### 렌더링 성능

| #   | 현재 상태                                                                        | 개선 방안                                       | 예상 효과        | 우선순위 |
| --- | -------------------------------------------------------------------------------- | ----------------------------------------------- | ---------------- | -------- |
| 1   | `ModelOBJ.tsx` useFrame에서 meshes 캐싱 ✅                                       | 이미 최적화됨                                   | -                | -        |
| 2   | Zustand 개별 셀렉터 사용 ✅                                                      | 이미 최적화됨                                   | -                | -        |
| 3   | `ChatInterface.tsx:80` useEffect deps `[]` ESLint 무시                           | 의도적이나 `initialMessages` 변경 시 반영 안 됨 | 미묘한 버그 방지 | P3       |
| 4   | messages state에서 `map(msg => msg.id === aiMessageId ? ...msg : msg)` 패턴 반복 | functional update 유지 중 — 현재 수준 적절      | -                | -        |

### 네트워크 & API

| #   | 현재 상태                                            | 개선 방안                        | 예상 효과      | 우선순위 |
| --- | ---------------------------------------------------- | -------------------------------- | -------------- | -------- |
| 1   | 모든 API 호출에 15s timeout                          | 적절한 수준                      | -              | -        |
| 2   | SSE 스트림 30s timeout (리셋 불완전)                 | 청크 수신 시마다 새 timeout 설정 | 무한 대기 방지 | **P1**   |
| 3   | `ChatSidebar`에서 매 마운트시 세션 목록 fetch        | SWR/React Query 캐싱 도입 고려   | 중복 요청 감소 | P2       |
| 4   | `ChatInterface.ensureSession()` — ref 기반 중복 방지 | 적절한 수준                      | -              | -        |

### 코드 품질

| #   | 현재 상태                                      | 개선 방안                                                        | 예상 효과      | 우선순위 |
| --- | ---------------------------------------------- | ---------------------------------------------------------------- | -------------- | -------- |
| 1   | `any` 타입 0건 ✅                              | 우수                                                             | -              | -        |
| 2   | `types/api.ts`에 deprecated aliases 5개        | 사용처 확인 후 제거                                              | 타입 혼란 방지 | P3       |
| 3   | `ChatInterface.tsx`에 `Message` 타입 중복 정의 | `types/chat.ts`의 `Message` 재사용                               | 타입 중복 제거 | P3       |
| 4   | `createSession("1")` 하드코딩 3곳              | modelId를 context/props로 전달                                   | 다중 모델 지원 | **P1**   |
| 5   | `TODO` 주석 1건 (`mock-data.ts:6`)             | 이미 `api/mock.ts`로 이전됨, 파일 삭제                           | 정리           | P3       |
| 6   | `src/components/panels/` 네이밍 혼재           | PascalCase (ChatInput.tsx) vs kebab-case (ai-assistant.tsx) 통일 | 일관성         | P3       |

---

## 결론

### 전체 평가

SIMVEX 프론트엔드는 **아키텍처 설계와 코드 품질은 양호**하나, **배포 불가 상태**입니다.

**강점:**

- TypeScript strict 준수, `any` 미사용
- Three.js 리소스 관리 (dispose 패턴) 우수
- Zustand 셀렉터 기반 최적화
- XSS 방지 sanitization 레이어 구축
- API 인터페이스 추상화 (Mock ↔ Real 전환)
- 이벤트 리스너 cleanup 일관됨

**치명적 문제:**

- `isomorphic-dompurify` SSR 호환성 실패 → 3개 핵심 페이지 500 에러, 프로덕션 빌드 실패
- Real API 모델 데이터 부재

### 제출 가능 여부

**❌ 현재 상태로는 제출/배포 불가**

isomorphic-dompurify SSR 문제를 해결하면 `/viewer`, `/chat`, `/study/chat` 페이지가 복구되어 핵심 기능의 80%+ 동작 가능. 이 수정은 `sanitize.ts` 한 파일의 import 방식 변경으로 해결 가능하며 예상 작업량 30분 이내.

**최소 수정 후 제출 가능 기준:**

1. ✅ `isomorphic-dompurify` → 클라이언트 전용으로 전환 (P0)
2. ✅ SSE timeout 리셋 수정 (P1)
3. ✅ `createSession("1")` 하드코딩 제거 (P1)
4. ⬜ 404 페이지 추가 (P1)
5. ⬜ Real API 모델 데이터 등록 (백엔드 작업)
