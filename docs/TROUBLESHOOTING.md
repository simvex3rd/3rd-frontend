# 문제 해결 가이드

## 빌드 & 런타임 에러

### "ReferenceError: window is not defined"

**증상:**

```
ReferenceError: window is not defined
```

**원인:**

- SSR 환경 (서버)에서 브라우저 전용 API (`window`, `document` 등) 사용

**해결:**

1. 컴포넌트에 `'use client'` 추가

```tsx
"use client";

export function MyComponent() {
  // window 사용 가능
}
```

2. 동적 import + SSR 비활성화

```tsx
import dynamic from "next/dynamic";

const ClientOnlyComponent = dynamic(() => import("./ClientOnly"), {
  ssr: false,
});
```

3. useEffect 내부에서 사용

```tsx
useEffect(() => {
  if (typeof window !== "undefined") {
    // window 사용
  }
}, []);
```

---

### "Module not found: Can't resolve '@/components/...'"

**증상:**

```
Module not found: Can't resolve '@/components/ui/button'
```

**원인:**

- 파일이 존재하지 않거나 경로 alias 설정 오류

**해결:**

1. 파일 존재 확인

```bash
ls src/components/ui/button.tsx
```

2. `tsconfig.json`의 paths 설정 확인

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

3. Dev 서버 재시작

```bash
pnpm dev
```

---

### "Error: Rendered more hooks than during the previous render"

**증상:**

```
Error: Rendered more hooks than during the previous render
```

**원인:**

- 조건문 내부에서 hooks 사용
- 반복문 내부에서 hooks 사용

**해결:**

```tsx
// ❌ 잘못된 예
if (condition) {
  const [state, setState] = useState();
}

// ✅ 올바른 예
const [state, setState] = useState();
if (condition) {
  // state 사용
}
```

---

## Three.js 관련 문제

### Three.js 씬이 보이지 않음

**체크리스트:**

1. **Canvas 높이 설정**

```tsx
// ❌ 높이 없음
<Canvas>...</Canvas>

// ✅ 높이 설정
<Canvas style={{ height: '100vh' }}>...</Canvas>
```

2. **카메라 위치**

```tsx
// 카메라가 (0,0,0)에 있으면 객체와 겹침
<Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
```

3. **조명 추가**

```tsx
<Canvas>
  <ambientLight intensity={0.5} />
  <directionalLight position={[10, 10, 5]} />
  {/* 객체들 */}
</Canvas>
```

4. **객체 위치 확인**

```tsx
// 객체가 카메라 뒤에 있지 않은지 확인
<mesh position={[0, 0, -10]}> {/* 카메라 뒤 */}
```

---

### "THREE.WebGLRenderer: Context Lost"

**증상:**

- 3D 씬이 갑자기 사라짐
- 콘솔에 "Context Lost" 경고

**원인:**

- GPU 메모리 부족
- 너무 많은 Three.js 인스턴스
- 메모리 누수

**해결:**

1. 컴포넌트 언마운트 시 cleanup

```tsx
useEffect(() => {
  const geometry = new THREE.BoxGeometry();
  const material = new THREE.MeshBasicMaterial();

  return () => {
    geometry.dispose();
    material.dispose();
  };
}, []);
```

2. Instancing 사용 (동일 객체 다수)

```tsx
<instancedMesh args={[geometry, material, count]} />
```

3. 텍스처 크기 최적화

```tsx
// 2048x2048 대신 512x512 사용
```

---

### 성능 저하 (FPS 낮음)

**진단:**

```tsx
import { Stats } from "@react-three/drei";

<Canvas>
  <Stats />
</Canvas>;
```

**최적화 방법:**

1. **Draw call 줄이기**

```tsx
// Instancing 사용
<instancedMesh args={[geo, mat, 1000]} />
```

2. **그림자 비활성화 (필요한 경우만)**

```tsx
<Canvas shadows={false}>
```

3. **LOD 사용**

```tsx
import { Lod } from "@react-three/drei";

<Lod distances={[0, 10, 20]}>
  <mesh geometry={high} />
  <mesh geometry={mid} />
  <mesh geometry={low} />
</Lod>;
```

4. **Frustum culling 확인**

```tsx
// 카메라 밖 객체는 자동으로 렌더링 안 됨
mesh.frustumCulled = true; // 기본값
```

---

## Storybook 관련 문제

### Storybook에서 Tailwind 스타일 안 먹힘

**원인:**

- `.storybook/preview.ts`에서 CSS import 누락

**해결:**

```tsx
// .storybook/preview.ts
import "../src/app/globals.css"; // 추가
```

---

### Storybook에서 "Module not found: next/..."

**원인:**

- Storybook이 Next.js 모듈 해석 못함

**해결:**

```tsx
// next/image 대신 img 사용
// next/link 대신 a 사용 (Story 내부에서만)
```

---

## Git Hooks 관련 문제

### pre-commit hook이 실행 안 됨

**원인:**

- Husky 설치 누락

**해결:**

```bash
pnpm install
```

혹은

```bash
npx husky install
```

---

### Commitlint가 한글 커밋 메시지 거부

**원인:**

- subject는 영문 소문자로 시작해야 함

**해결:**

```bash
# ❌ 잘못된 예
git commit -m "feat(ui): 버튼 추가"

# ✅ 올바른 예
git commit -m "feat(ui): add button component"
```

---

## 개발 환경 문제

### Hot reload가 느림

**해결:**

1. Turbopack 사용 확인

```bash
pnpm dev  # 이미 Turbopack 활성화됨
```

2. `.next` 폴더 삭제

```bash
rm -rf .next
pnpm dev
```

3. Node 버전 확인

```bash
nvm use  # .nvmrc의 24.12.0 사용
```

---

### pnpm install 에러

**"EACCES: permission denied"**

```bash
# node_modules 삭제 후 재시도
rm -rf node_modules pnpm-lock.yaml
pnpm install
```

**"No matching version found"**

```bash
# 패키지 버전 확인
pnpm view <package-name> versions
```

---

## 추가 도움

- [Next.js Docs](https://nextjs.org/docs)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Three.js Docs](https://threejs.org/docs/)
- [Zustand Docs](https://docs.pmnd.rs/zustand)

문제가 해결되지 않으면 GitHub Issues에 제보해주세요.
