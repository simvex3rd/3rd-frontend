# 개발 가이드

## UI 컴포넌트 작성

### shadcn/ui 컴포넌트 추가

```bash
npx shadcn@latest add button card dialog dropdown-menu input
```

### 사용 예시

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>제목</CardTitle>
      </CardHeader>
      <CardContent>
        <Button variant="outline">클릭</Button>
      </CardContent>
    </Card>
  );
}
```

## Three.js 컴포넌트 작성

### 기본 구조

```tsx
"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Mesh } from "three";

export function RotatingCube() {
  const meshRef = useRef<Mesh>(null);

  // 매 프레임마다 실행 (애니메이션)
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
```

### Props를 받는 컴포넌트

```tsx
interface CubeProps {
  position?: [number, number, number];
  color?: string;
  scale?: number;
}

export function Cube({
  position = [0, 0, 0],
  color = "orange",
  scale = 1,
}: CubeProps) {
  return (
    <mesh position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
```

### 이벤트 처리

```tsx
export function InteractiveCube() {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);

  return (
    <mesh
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={clicked ? 1.5 : 1}
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
    </mesh>
  );
}
```

### 3D 모델 로딩

```tsx
import { useGLTF } from "@react-three/drei";
import { Suspense } from "react";

function Model() {
  const { scene } = useGLTF("/models/robot.glb");
  return <primitive object={scene} />;
}

export function Scene() {
  return (
    <Suspense fallback={<Loader />}>
      <Model />
    </Suspense>
  );
}

// 모델 프리로드 (성능 향상)
useGLTF.preload("/models/robot.glb");
```

## 상태 관리 (Zustand)

### Store 생성

```tsx
// src/stores/viewer-store.ts
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface ViewerState {
  isGridVisible: boolean;
  selectedObjectId: string | null;
  toggleGrid: () => void;
  selectObject: (id: string | null) => void;
}

export const useViewerStore = create<ViewerState>()(
  devtools(
    (set) => ({
      isGridVisible: true,
      selectedObjectId: null,
      toggleGrid: () =>
        set((state) => ({
          isGridVisible: !state.isGridVisible,
        })),
      selectObject: (id) => set({ selectedObjectId: id }),
    }),
    { name: "ViewerStore" }
  )
);
```

### Store 사용

```tsx
export function GridToggle() {
  const { isGridVisible, toggleGrid } = useViewerStore();

  return (
    <Button onClick={toggleGrid}>
      {isGridVisible ? "그리드 숨기기" : "그리드 보기"}
    </Button>
  );
}

export function Scene() {
  const isGridVisible = useViewerStore((state) => state.isGridVisible);

  return <>{isGridVisible && <gridHelper args={[10, 10]} />}</>;
}
```

### 비동기 액션

```tsx
interface DataState {
  data: any[];
  loading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
}

export const useDataStore = create<DataState>()((set) => ({
  data: [],
  loading: false,
  error: null,
  fetchData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await fetch("/api/data");
      const data = await response.json();
      set({ data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },
}));
```

## 스타일링

### Tailwind CSS 사용

```tsx
export function MyComponent() {
  return (
    <div className="flex items-center gap-4 rounded-lg bg-background p-4">
      <span className="text-sm font-medium text-foreground">텍스트</span>
      <Button className="ml-auto">버튼</Button>
    </div>
  );
}
```

### CSS 변수 (디자인 토큰)

```tsx
// globals.css에 정의된 변수 사용
<div
  style={{
    background: "var(--background)",
    color: "var(--foreground)",
  }}
/>
```

### 조건부 스타일링 (cn 헬퍼)

```tsx
import { cn } from "@/lib/utils";

export function Button({ variant = "default", className }) {
  return (
    <button
      className={cn(
        "rounded px-4 py-2",
        variant === "primary" && "bg-primary text-primary-foreground",
        variant === "outline" && "border border-input",
        className
      )}
    >
      버튼
    </button>
  );
}
```

## 성능 최적화

### Three.js 최적화

**1. Instancing (동일 객체 다수)**

```tsx
import { useRef, useMemo } from "react";
import { InstancedMesh } from "three";

export function ManyBoxes() {
  const ref = useRef<InstancedMesh>(null);

  const positions = useMemo(() => {
    const temp = [];
    for (let i = 0; i < 1000; i++) {
      temp.push([
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
        Math.random() * 10 - 5,
      ]);
    }
    return temp;
  }, []);

  return (
    <instancedMesh ref={ref} args={[null, null, 1000]}>
      <boxGeometry args={[0.1, 0.1, 0.1]} />
      <meshStandardMaterial />
    </instancedMesh>
  );
}
```

**2. LOD (Level of Detail)**

```tsx
import { Lod } from "@react-three/drei";

export function OptimizedModel() {
  return (
    <Lod distances={[0, 10, 20]}>
      <mesh geometry={highPolyGeo} material={material} />
      <mesh geometry={midPolyGeo} material={material} />
      <mesh geometry={lowPolyGeo} material={material} />
    </Lod>
  );
}
```

### React 최적화

**1. Memoization**

```tsx
const MemoizedComponent = memo(ExpensiveComponent);

const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);

const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

**2. 동적 Import**

```tsx
import dynamic from "next/dynamic";

const Heavy3DScene = dynamic(() => import("./Heavy3DScene"), {
  ssr: false,
  loading: () => <Loader />,
});
```

## Storybook 작성

### 기본 Story

```tsx
// src/components/ui/MyButton.stories.tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { MyButton } from "./MyButton";

const meta = {
  title: "UI/MyButton",
  component: MyButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline"],
    },
  },
} satisfies Meta<typeof MyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    label: "클릭",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    label: "취소",
    variant: "secondary",
  },
};
```

### R3F 컴포넌트 Story

```tsx
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { MyCube } from "./MyCube";

export const ThreeDCube: Story = {
  render: () => (
    <div style={{ height: "400px" }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <MyCube />
        <OrbitControls />
        <Environment preset="sunset" />
      </Canvas>
    </div>
  ),
};
```

## 테스팅 (나중에 추가 예정)

_테스팅 프레임워크 도입 후 작성 예정_
