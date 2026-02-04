# Model Flickering Prevention - Level 2 Implementation Plan

**Date**: 2026-02-03
**Branch**: `feature/s2-state-persistence` (current)
**Scope**: Level 2 (Recommended) - Hydration delay + Bounds conditional + CameraSync optimization

---

## 📋 Requirements Summary

### Problem Statement

새로고침 시 3D 모델이 깜빡이고 "지지직" 움직이는 현상:

1. Canvas가 Zustand hydration 전에 렌더링
2. Bounds fit과 CameraSync가 충돌하여 카메라 위치 다툼
3. 매 프레임마다 Zustand setState 호출로 불필요한 리렌더

### Goals

- ✅ 새로고침 시 깜빡임 완전 제거
- ✅ 기존 기능 유지 (부품 선택, 카메라 복원, OrbitControls, Auto-fit)
- ✅ 가능한 범위에서 성능 최적화
- ✅ 프로덕션 빌드에서 정상 작동

### Out of Scope (Not Level 2)

- ❌ 로딩 스피너 UI (Level 3)
- ❌ 카메라 트랜지션 애니메이션 (Level 3)
- ❌ Three.js 렌더 루프 재작성
- ❌ 커스텀 카메라 컨트롤러

---

## ✅ Acceptance Criteria

| #   | Criterion                                    | Verification Method                    |
| --- | -------------------------------------------- | -------------------------------------- |
| 1   | 새로고침 시 모델이 깜빡이지 않음             | 브라우저 새로고침 5회 반복 테스트      |
| 2   | 저장된 카메라 위치로 즉시 복원 (지지직 없음) | DevTools localStorage 확인 + 새로고침  |
| 3   | 첫 방문자는 Bounds fit으로 모델 중앙 배치    | 시크릿 모드 테스트                     |
| 4   | 부품 선택 + 하이라이트 정상 작동             | 부품 클릭 → 새로고침 → 하이라이트 유지 |
| 5   | OrbitControls 드래그 중 60fps 유지           | Stats.js로 FPS 모니터링                |
| 6   | CameraSync가 초당 2회 이하로 저장            | Console log로 setState 횟수 확인       |
| 7   | 프로덕션 빌드 정상 작동                      | `pnpm build && pnpm start` 테스트      |

---

## 🏗️ Implementation Plan

### Phase 1: Hydration Delay

**Goal**: Canvas를 Zustand hydration 완료 후에만 렌더링

#### 1.1 Update page.tsx - Add loading state

**File**: `src/app/page.tsx`
**Changes**:

```typescript
// BEFORE
export default function Home() {
  useStoreHydration();
  return (
    <div className="h-screen w-full">
      <SceneCanvas>  // hydration과 무관하게 렌더링됨!
        <Model url="/models/V4_Engine/Crankshaft.glb" />
      </SceneCanvas>
    </div>
  );
}

// AFTER
export default function Home() {
  const isHydrated = useStoreHydration();  // boolean 반환값 사용

  return (
    <div className="h-screen w-full">
      {!isHydrated && (
        <div className="flex h-full items-center justify-center">
          <p className="text-gray-400">Loading...</p>
        </div>
      )}
      {isHydrated && (
        <SceneCanvas>
          <Model url="/models/V4_Engine/Crankshaft.glb" />
        </SceneCanvas>
      )}
    </div>
  );
}
```

**Commit Message**:

```
fix(viewer): delay canvas render until hydration complete
```

**Rationale**: Hydration이 완료될 때까지 Canvas를 렌더링하지 않아 race condition 방지

---

### Phase 2: Conditional Bounds Fit

**Goal**: 저장된 카메라가 있으면 Bounds fit 스킵

#### 2.1 Add hasStoredCamera flag to store

**File**: `src/stores/scene-store.ts`
**Changes**:

```typescript
interface SceneState {
  // ... existing fields

  // Helper flag (not persisted)
  _hasStoredCamera: boolean;
}

export const useSceneStore = create<SceneState>()(
  devtools(
    persist(
      (set, get) => ({
        // ... existing state

        _hasStoredCamera: false, // 초기값

        // ... existing setters
      }),
      {
        name: "simvex-scene-storage",
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
        partialize: (state) => ({
          // _hasStoredCamera 제외 (localStorage에 저장 안 함)
          modelId: state.modelId,
          selectedObject: state.selectedObject,
          cameraPosition: state.cameraPosition,
          cameraRotation: state.cameraRotation,
          explodeLevel: state.explodeLevel,
        }),
        onRehydrateStorage: () => (state) => {
          state?._setHasHydrated(true);

          // 카메라 위치가 기본값이 아니면 저장된 값이 있다고 판단
          const hasCamera =
            state?.cameraPosition &&
            (state.cameraPosition[0] !== 0 ||
              state.cameraPosition[1] !== 0 ||
              state.cameraPosition[2] !== 5);

          if (hasCamera) {
            set({ _hasStoredCamera: true });
          }
        },
      }
    ),
    { name: "SceneStore" }
  )
);
```

**Commit Message**:

```
feat(stores): add stored camera detection flag
```

---

#### 2.2 Update SceneCanvas - Conditional Bounds

**File**: `src/components/viewer/SceneCanvas.tsx`
**Changes**:

```typescript
// BEFORE
export function SceneCanvas({ children, enableControls = true, enableAutoFit = true }) {
  return (
    <Canvas ...>
      <Suspense fallback={null}>
        <CameraSync />
        {enableAutoFit ? (
          <Bounds fit clip observe margin={1.2}>  // 항상 fit 실행!
            {children}
          </Bounds>
        ) : children}
      </Suspense>
    </Canvas>
  );
}

// AFTER
export function SceneCanvas({ children, enableControls = true, enableAutoFit = true }) {
  const hasStoredCamera = useSceneStore((state) => state._hasStoredCamera);

  // 저장된 카메라가 없을 때만 fit 실행
  const shouldFit = enableAutoFit && !hasStoredCamera;

  return (
    <Canvas ...>
      <Suspense fallback={null}>
        <CameraSync />
        {shouldFit ? (
          <Bounds fit clip observe={false} margin={1.2}>  // observe=false로 변경
            {children}
          </Bounds>
        ) : children}
      </Suspense>
    </Canvas>
  );
}
```

**Commit Message**:

```
fix(viewer): skip bounds fit when camera position stored
```

**Rationale**:

- 재방문자는 저장된 카메라 위치 사용
- 첫 방문자만 Bounds fit 실행
- `observe={false}`로 런타임 re-fit 방지

---

### Phase 3: CameraSync Optimization

**Goal**: 매 프레임 setState 제거, OrbitControls 이벤트 기반으로 변경

#### 3.1 Optimize CameraSync - Event-based save

**File**: `src/components/viewer/CameraSync.tsx`
**Changes**:

```typescript
// BEFORE
export function CameraSync() {
  const { camera } = useThree();
  const cameraPosition = useSceneStore((state) => state.cameraPosition);
  const cameraRotation = useSceneStore((state) => state.cameraRotation);
  const setCameraPosition = useSceneStore((state) => state.setCameraPosition);
  const setCameraRotation = useSceneStore((state) => state.setCameraRotation);

  // 복원 (의존성 문제!)
  useEffect(() => {
    if (cameraPosition) {
      camera.position.set(...cameraPosition);
    }
    if (cameraRotation) {
      camera.rotation.set(...cameraRotation);
    }
    camera.updateProjectionMatrix();
  }, [camera, cameraPosition, cameraRotation]); // 무한 루프 위험!

  // 매 프레임 저장 (성능 문제!)
  useEffect(() => {
    let animationFrameId: number;
    const syncCamera = () => {
      setCameraPosition(camera.position.toArray()); // 60fps = 초당 120번 호출!
      setCameraRotation([
        camera.rotation.x,
        camera.rotation.y,
        camera.rotation.z,
      ]);
      animationFrameId = requestAnimationFrame(syncCamera);
    };
    // ...
  }, [camera, setCameraPosition, setCameraRotation]);

  return null;
}

// AFTER
export function CameraSync() {
  const { camera, controls } = useThree();
  const setCameraPosition = useSceneStore((state) => state.setCameraPosition);
  const setCameraRotation = useSceneStore((state) => state.setCameraRotation);
  const hasHydrated = useSceneStore((state) => state._hasHydrated);

  // 1회만 복원 (초기 마운트 시)
  const [hasRestored, setHasRestored] = useState(false);

  useEffect(() => {
    if (!hasHydrated || hasRestored) return;

    const storedPosition = useSceneStore.getState().cameraPosition;
    const storedRotation = useSceneStore.getState().cameraRotation;

    if (storedPosition) {
      camera.position.set(...storedPosition);
    }
    if (storedRotation) {
      camera.rotation.set(...storedRotation);
    }
    camera.updateProjectionMatrix();

    setHasRestored(true);
  }, [camera, hasHydrated, hasRestored]);

  // OrbitControls "end" 이벤트에서만 저장 (드래그 끝날 때)
  useEffect(() => {
    if (!controls) return;

    const handleEnd = () => {
      const pos = camera.position.toArray() as [number, number, number];
      const rot = [camera.rotation.x, camera.rotation.y, camera.rotation.z] as [
        number,
        number,
        number,
      ];

      setCameraPosition(pos);
      setCameraRotation(rot);
    };

    controls.addEventListener("end", handleEnd);
    return () => {
      controls.removeEventListener("end", handleEnd);
    };
  }, [camera, controls, setCameraPosition, setCameraRotation]);

  return null;
}
```

**Commit Message**:

```
perf(viewer): optimize camera sync to save on drag end only
```

**Rationale**:

- 복원: 의존성 배열에서 `cameraPosition/Rotation` 제거 → 무한 루프 방지
- 저장: 매 프레임 대신 OrbitControls `end` 이벤트만 → 60fps → 초당 0-2회로 감소

---

### Phase 4: Verification & Testing

#### 4.1 Manual Testing Checklist

**기능 테스트**:

- [ ] 첫 방문 (시크릿 모드): 모델이 중앙에 배치되고 깜빡이지 않음
- [ ] 재방문: 저장된 카메라 위치로 즉시 복원, 깜빡임 없음
- [ ] 부품 클릭 → 새로고침: 하이라이트 유지
- [ ] OrbitControls 드래그: 부드럽게 작동, FPS 60 유지
- [ ] 드래그 끝나면 위치 저장됨 (localStorage 확인)

**성능 테스트**:

- [ ] Console에 "Zustand setState" 로그 찍어서 초당 2회 이하 확인
- [ ] Stats.js로 60fps 유지 확인

**환경 테스트**:

- [ ] `pnpm dev`: HMR 후에도 정상
- [ ] `pnpm build && pnpm start`: 프로덕션 빌드 정상

---

#### 4.2 Debug Logging (Temporary)

테스트 중에만 사용할 로그 추가:

```typescript
// CameraSync.tsx - handleEnd 함수 내
const handleEnd = () => {
  console.log("[CameraSync] Saving camera position:", pos); // 임시
  setCameraPosition(pos);
  setCameraRotation(rot);
};
```

```typescript
// page.tsx - useStoreHydration 후
console.log("[page.tsx] Hydrated:", isHydrated); // 임시
```

**테스트 완료 후 제거할 것!**

---

## 📦 Git Workflow

### Branch Strategy

- **Current branch**: `feature/s2-state-persistence`
- **Base branch**: `dev`
- **Merge conflicts**: PR #4 (feature/v3-part-selection)와 약간 겹침
  - `page.tsx`: PR #4는 `PartInfoPanel` 추가, 현재는 hydration 로직 추가
  - 충돌 시 두 변경사항 모두 유지하면 됨

### Commit Plan (Atomic Commits)

| Order | File(s)                                 | Commit Message                                                | Why Separate                   |
| ----- | --------------------------------------- | ------------------------------------------------------------- | ------------------------------ |
| 1     | `src/app/page.tsx`                      | `fix(viewer): delay canvas render until hydration complete`   | UI 깜빡임 수정 (논리적 단위)   |
| 2     | `src/stores/scene-store.ts`             | `feat(stores): add stored camera detection flag`              | Store 기능 추가 (논리적 단위)  |
| 3     | `src/components/viewer/SceneCanvas.tsx` | `fix(viewer): skip bounds fit when camera position stored`    | Bounds 로직 수정 (논리적 단위) |
| 4     | `src/components/viewer/CameraSync.tsx`  | `perf(viewer): optimize camera sync to save on drag end only` | 성능 최적화 (논리적 단위)      |

### Commit Message Rules

- ✅ 영어로만 작성
- ✅ 소문자 동사로 시작 (`add`, `fix`, `optimize`)
- ✅ 50자 이내
- ✅ Scope: `viewer`, `stores` 사용
- ❌ Co-Authored-By 넣지 않음 (사용자가 요청하지 않음)

### Example Commit Flow

```bash
# Phase 1
git add src/app/page.tsx
git commit -m "fix(viewer): delay canvas render until hydration complete"

# Phase 2
git add src/stores/scene-store.ts
git commit -m "feat(stores): add stored camera detection flag"

git add src/components/viewer/SceneCanvas.tsx
git commit -m "fix(viewer): skip bounds fit when camera position stored"

# Phase 3
git add src/components/viewer/CameraSync.tsx
git commit -m "perf(viewer): optimize camera sync to save on drag end only"

# Phase 4: Verify
pnpm build
pnpm exec tsc --noEmit

# Push
git push origin feature/s2-state-persistence
```

---

## 🚨 Risk Mitigation

| Risk                                  | Probability | Impact | Mitigation                                              |
| ------------------------------------- | ----------- | ------ | ------------------------------------------------------- |
| **Bounds fit 스킵 시 모델이 화면 밖** | Medium      | High   | 저장된 카메라 위치 검증 로직 추가 (기본값 체크)         |
| **CameraSync 무한 루프**              | Low         | High   | 의존성 배열에서 `cameraPosition/Rotation` 제거          |
| **OrbitControls "end" 이벤트 미발생** | Low         | Medium | Manual testing으로 확인, 필요 시 `change` 이벤트로 폴백 |
| **Hydration 지연으로 빈 화면**        | Low         | Low    | "Loading..." 텍스트로 UX 개선                           |

---

## 📊 Success Metrics

**Before** (현재):

- 새로고침 시 100% 깜빡임
- 카메라 저장: 초당 120회 (60fps × 2 상태)
- Bounds fit: 항상 실행

**After** (Level 2 목표):

- 새로고침 시 0% 깜빡임
- 카메라 저장: 초당 0-2회 (드래그 종료 시만)
- Bounds fit: 첫 방문자만 실행

---

## 🔄 Next Steps (After Level 2)

If Level 2 works well, consider Level 3 enhancements:

- Add loading spinner UI (instead of text)
- Camera transition animation (GSAP or Three.js tween)
- Model change detection (for dynamic URLs)

---

## 📚 References

- [Zustand - SSR and Hydration](https://zustand.docs.pmnd.rs/guides/ssr-and-hydration)
- [React Three Fiber - Performance Pitfalls](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls)
- [Three.js - OrbitControls Events](https://threejs.org/docs/#examples/en/controls/OrbitControls)
- Project Rules: `/Users/justn/Projects/3rd-frontend/CLAUDE.md`
- Git Rules: `~/.claude/git-workflow.md`

---

**Plan Created**: 2026-02-03
**Last Updated**: 2026-02-03
**Status**: Ready for Implementation
