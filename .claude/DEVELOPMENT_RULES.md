# SIMVEX Development Rules

프로젝트 전반에 적용되는 상세 개발 규칙입니다.

## 에러 처리

### 원칙

- **시스템 경계에서만 처리**: API 호출, 사용자 입력, 외부 데이터
- 내부 함수 호출은 신뢰 (불필요한 try-catch 금지)
- 에러는 의미 있는 메시지와 함께 처리

### 올바른 예시

```tsx
// ✅ API 경계에서 처리
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

// ✅ 사용자 입력 검증
function processUserInput(input: string) {
  if (!input || input.trim().length === 0) {
    throw new Error("Input cannot be empty");
  }
  return input.trim().toLowerCase();
}
```

### 잘못된 예시

```tsx
// ❌ 내부 함수에 불필요한 try-catch
function calculateTotal(items: Item[]) {
  try {
    return items.reduce((sum, item) => sum + item.price, 0);
  } catch (error) {
    // items는 신뢰할 수 있는 내부 데이터
    return 0;
  }
}
```

## 타입 안정성

### 원칙

- `any` 사용 최소화 (불가피한 경우만)
- 외부 데이터는 반드시 검증 (Zod, Yup 등)
- 타입 단언(`as`) 대신 타입 가드 사용

### Type vs Interface 사용 기준

프로젝트에서는 **혼용 방식**을 사용하며, 명확한 기준에 따라 선택합니다.

**✅ `type` 사용:**

- 간단한 데이터 구조 (Vector3, Vector4 등)
- Union types (`type Status = "loading" | "success" | "error"`)
- Intersection types (`type Combined = A & B`)
- Tuple types (`type RGB = [number, number, number]`)
- React 컴포넌트 Props (`type ButtonProps = { ... }`)
- Utility types의 결과 (`type Partial<Model> = { ... }`)

**✅ `interface` 사용:**

- 도메인 엔티티 (Model, Part, PartGeometry)
- API 응답 DTO
- Store 타입 (Zustand)
- 확장이 필요한 구조
- 클래스로 구현할 타입

**예시:**

```typescript
// ✅ type - 간단한 구조
type Vector3 = { x: number; y: number; z: number };
type Status = "idle" | "loading" | "success" | "error";

// ✅ interface - 도메인 엔티티
interface Model {
  id: number;
  name: string;
  parts: Part[];
}

interface Part {
  id: number;
  modelId: number;
  name: string;
}

// ✅ type - Union
type ViewMode = "normal" | "exploded" | "wireframe";

// ✅ interface - 확장 가능
interface BaseResponse {
  success: boolean;
  message: string;
}

interface DataResponse<T> extends BaseResponse {
  data: T;
}
```

**주의사항:**

- 같은 도메인 내에서는 일관성 유지
- `Model`, `Part` 등은 모두 interface 사용
- Props는 모두 type 사용 (React 관례)
- 고민되면 interface 우선 (확장성)

### 올바른 예시

```tsx
// ✅ 타입 가드
interface User {
  id: string;
  name: string;
}

function isUser(data: unknown): data is User {
  return (
    typeof data === "object" &&
    data !== null &&
    "id" in data &&
    "name" in data &&
    typeof data.id === "string" &&
    typeof data.name === "string"
  );
}

// ✅ 외부 데이터 검증
async function fetchUser(id: string): Promise<User> {
  const response = await fetch(`/api/users/${id}`);
  const data = await response.json();

  if (!isUser(data)) {
    throw new Error("Invalid user data");
  }

  return data;
}
```

### 잘못된 예시

```tsx
// ❌ any 남용
function process(data: any) {
  return data.items.map((item: any) => item.value);
}

// ❌ 타입 단언 남용
function getUser(data: unknown) {
  return (data as User).name; // 검증 없이 단언
}
```

## 보안

### 필수 체크리스트

- [ ] 사용자 입력 검증 및 sanitize (XSS 방지)
- [ ] API 요청에 CSRF 토큰 포함
- [ ] 환경 변수로 민감 정보 관리 (`.env.local`)
- [ ] 클라이언트에 API 키 노출 금지
- [ ] 서버 컴포넌트에서 인증 확인

### XSS 방지

```tsx
// ✅ 올바른 예 - React가 자동 이스케이프
function SafeComponent({ userInput }: { userInput: string }) {
  return <div>{userInput}</div>;
}

// ❌ 잘못된 예 - XSS 취약점
function UnsafeComponent({ userInput }: { userInput: string }) {
  return <div dangerouslySetInnerHTML={{ __html: userInput }} />;
}

// ✅ 필요 시 sanitize 라이브러리 사용
import DOMPurify from "dompurify";

function SafeHTMLComponent({ html }: { html: string }) {
  const sanitized = DOMPurify.sanitize(html);
  return <div dangerouslySetInnerHTML={{ __html: sanitized }} />;
}
```

### 환경 변수

```tsx
// ✅ 올바른 예 - 환경 변수 사용
const apiKey = process.env.NEXT_PUBLIC_API_KEY;
const secret = process.env.API_SECRET; // 서버 전용

// ❌ 잘못된 예 - 하드코딩
const apiKey = "sk-1234567890abcdef";
```

### 인증

```tsx
// ✅ 서버 컴포넌트에서 인증 확인
import { auth } from "@/lib/auth";

export default async function ProtectedPage() {
  const session = await auth();

  if (!session) {
    redirect("/login");
  }

  return <div>Protected content</div>;
}

// ✅ API 라우트에서 인증 확인
export async function GET(request: Request) {
  const session = await auth();

  if (!session) {
    return new Response("Unauthorized", { status: 401 });
  }

  // ...
}
```

## 성능

### Three.js 최적화

```tsx
// ✅ Instancing으로 draw call 최소화
<instancedMesh args={[geometry, material, 1000]}>
  <boxGeometry />
  <meshStandardMaterial />
</instancedMesh>;

// ✅ LOD (Level of Detail)
import { Lod } from "@react-three/drei";

<Lod distances={[0, 10, 20]}>
  <mesh geometry={highPolyGeo} />
  <mesh geometry={midPolyGeo} />
  <mesh geometry={lowPolyGeo} />
</Lod>;

// ✅ Cleanup 필수
useEffect(() => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial();

  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);
```

### React 최적화

```tsx
// ✅ useMemo로 비싼 계산 메모이제이션
const expensiveValue = useMemo(() => {
  return heavyComputation(data);
}, [data]);

// ✅ useCallback로 함수 메모이제이션
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);

// ✅ React.memo로 컴포넌트 메모이제이션
const MemoizedComponent = React.memo(function Component({ data }) {
  return <div>{data}</div>;
});
```

### Next.js 최적화

```tsx
// ✅ 이미지 최적화
import Image from "next/image";

<Image
  src="/hero.jpg"
  alt="Hero image"
  width={800}
  height={600}
  priority // LCP 개선
/>;

// ✅ 동적 import로 코드 스플리팅
import dynamic from "next/dynamic";

const HeavyComponent = dynamic(() => import("./Heavy"), {
  ssr: false,
  loading: () => <Spinner />,
});

// ✅ 서버 컴포넌트 우선 사용
// app/page.tsx (기본 서버 컴포넌트)
export default async function Page() {
  const data = await fetchData(); // 서버에서 실행
  return <ClientComponent data={data} />;
}
```

## 접근성 (a11y)

### 필수 체크리스트

- [ ] 모든 버튼/링크에 명확한 레이블
- [ ] 이미지에 alt 속성
- [ ] 키보드로 모든 기능 사용 가능
- [ ] 색상 대비 4.5:1 이상
- [ ] 포커스 표시 명확

### 예시

```tsx
// ✅ 명확한 레이블
<button aria-label="Close menu" onClick={handleClose}>
  <X className="h-4 w-4" />
</button>

// ✅ 키보드 접근성
<div
  role="button"
  tabIndex={0}
  onClick={handleClick}
  onKeyDown={(e) => {
    if (e.key === "Enter" || e.key === " ") {
      handleClick();
    }
  }}
>
  Click me
</div>

// ✅ 의미있는 HTML
<nav aria-label="Main navigation">
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

// ❌ 잘못된 예
<button onClick={handleClose}>
  <X className="h-4 w-4" /> {/* 레이블 없음 */}
</button>

<div onClick={handleClick}> {/* role, tabIndex 없음 */}
  Click me
</div>
```

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

// 프리로드로 성능 개선
useGLTF.preload("/models/model.glb");
```

### 이벤트 처리

```tsx
<mesh
  onClick={(e) => {
    e.stopPropagation(); // 이벤트 버블링 방지
    setSelected(e.object.uuid);
  }}
  onPointerOver={(e) => {
    e.stopPropagation();
    setHovered(true);
  }}
  onPointerOut={() => setHovered(false)}
>
  <boxGeometry />
  <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
</mesh>
```

### 조건부 렌더링

```tsx
// ✅ 올바른 예
{
  isVisible && <Component />;
}
{
  isLoading ? <Spinner /> : <Content />;
}

// ❌ 잘못된 예 - 0이 렌더링됨
{
  items.length && <List items={items} />;
}

// ✅ 올바른 예
{
  items.length > 0 && <List items={items} />;
}
```

### API 호출 패턴

```tsx
"use client";

import { useState, useEffect } from "react";

export function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch("/api/data");
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <Spinner />;
  if (error) return <Error message={error} />;
  if (!data) return <Empty />;

  return <div>{/* 데이터 렌더링 */}</div>;
}
```

## 금지 사항 상세

### Three.js/R3F

❌ **절대 하지 말 것:**

- `'use client'` 빼먹기
- Cleanup 없이 geometry/material 생성
- SSR 환경에서 `window`, `document` 직접 사용
- dispose() 호출 없이 메모리 누수
- useFrame 내부에서 무거운 연산

### React

❌ **절대 하지 말 것:**

- Hooks 순서 변경
- useEffect 의존성 배열 무시
- 상태 직접 변경 (불변성 위반)
- 조건부 Hook 호출

```tsx
// ❌ 잘못된 예
if (condition) {
  useEffect(() => {}, []); // 조건부 Hook
}

// ✅ 올바른 예
useEffect(() => {
  if (condition) {
    // 조건부 로직
  }
}, [condition]);
```

### Next.js

❌ **절대 하지 말 것:**

- 클라이언트 컴포넌트 남용 (서버 컴포넌트 우선)
- `<img>` 태그 대신 `<Image>` 사용
- 환경 변수 없이 API 키 하드코딩

### 스타일링

❌ **절대 하지 말 것:**

- 하드코딩된 색상 (`#fff`, `rgb()`, `hsl()`)
- Inline styles (특별한 경우 제외)
- Tailwind 대신 CSS 파일 생성 (global.css 제외)

### Git & 보안

❌ **절대 하지 말 것:**

- 커밋 메시지에 한국어 사용
- API 키, 비밀번호 커밋
- `.env` 파일 커밋
- 사용자 입력 검증 없이 사용
- XSS 취약점 (innerHTML 남용)

## 참고 자료

- [React Best Practices](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Three.js Documentation](https://threejs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
