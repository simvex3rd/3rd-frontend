# Canvas Zoom & Centering Troubleshooting

## 문제 상황

**증상:**

- React Three Fiber Canvas가 viewport를 제대로 채우지 못함
- 3D 모델이 화면 왼쪽 위에 치우쳐서 렌더링됨
- Body에 `zoom: 0.75` CSS 속성이 적용된 환경

**환경:**

- Next.js 16 + React 19
- React Three Fiber 9.5
- Viewport: 1440×760px
- CSS: `body { zoom: 0.75 }`

---

## 시도한 해결책들

### 1차 시도: 수동 리사이즈 핸들러

```tsx
// ❌ 실패
function ResizeHandler() {
  const { gl, camera } = useThree();
  useEffect(() => {
    const updateSize = () => {
      gl.setSize(window.innerWidth, window.innerHeight, false);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, [gl, camera]);
  return null;
}
```

**문제:** Canvas element는 viewport 크기로 설정되지만, container가 여전히 zoom 영향을 받아서 작게 렌더링됨.

### 2차 시도: 큰 고정 크기 컨테이너

```tsx
// ❌ 실패
<div style={{ width: "4000px", height: "2100px" }}>
  <Canvas />
</div>
```

**문제:** Container가 커지면서 canvas는 viewport를 덮지만, **카메라가 container 중심을 보게 되어** 모델이 왼쪽 위로 치우침.

**측정 결과:**

- Container center: (1500, 788)
- Viewport center: (720, 380)
- Offset: (-780, -408) ← 모델이 이만큼 왼쪽 위로 이동

### 3차 시도: inset-0 + transform-origin

```tsx
// ❌ 실패
<div
  className="absolute inset-0"
  style={{
    transform: "scale(1.3333)",
    transformOrigin: "center",
  }}
>
  <Canvas />
</div>
```

**문제:** `inset-0`로 container가 viewport 왼쪽 위에 붙어있어서 `transformOrigin: 'center'`가 제대로 작동하지 않음. Scale은 container의 왼쪽 위 모서리를 기준으로 적용됨.

**측정 결과:**

- Canvas center: (540, 285)
- Viewport center: (720, 380)
- Offset: (-180, -95) ← 여전히 왼쪽 위로 치우침

---

## 최종 해결책

### ✅ 성공: 중앙 정렬 + Transform

```tsx
<div
  className="absolute left-1/2 top-1/2 z-0"
  style={{
    width: "100vw",
    height: "100vh",
    transform: "translate(-50%, -50%) scale(1.3333)",
  }}
>
  <SceneCanvas>
    <Model url="/models/V4_Engine/Crankshaft-draco.glb" />
  </SceneCanvas>
</div>
```

**핵심 원리:**

1. `left: 50%, top: 50%` - Container를 viewport 중심으로 이동
2. `translate(-50%, -50%)` - Container 자신의 크기를 기준으로 중앙 정렬
3. `scale(1.3333)` - Zoom 0.75 보정 (1 / 0.75 = 1.3333)

**작동 방식:**

```
Container: 100vw × 100vh (좌표계)
Transform: translate(-50%, -50%) scale(1.3333)

1. Container가 viewport 중심에 배치됨
2. Scale로 확대: 100vw × 1.3333 = 133.33vw
3. Body zoom 적용: 133.33vw × 0.75 = 100vw (viewport와 일치!)
4. Container 중심 = Viewport 중심
5. 카메라가 보는 중심 = Viewport 중심
6. 모델이 정확히 중앙에 렌더링됨 ✅
```

**측정 결과:**

- Canvas center: (720, 380)
- Viewport center: (720, 380)
- Offset: (0, 0) ← **완벽하게 중앙!**

---

## 핵심 교훈

### 1. CSS Zoom과 Canvas의 상호작용

- React Three Fiber는 container의 `clientWidth/clientHeight`를 사용
- CSS `zoom`은 `clientWidth`에도 영향을 줌
- Container가 1000px이면 zoom: 0.75 적용 시 clientWidth = 750px

### 2. Transform Origin의 중요성

- `inset-0` + `transformOrigin: 'center'`는 예상대로 작동하지 않음
- Container가 왼쪽 위에 붙어있으면 center 기준이 의미 없음
- **명시적으로 중앙에 배치**해야 함: `left: 50%, top: 50%`

### 3. 카메라 좌표계

- Three.js 카메라는 Canvas의 중심을 (0, 0, 0)으로 인식
- Container 크기를 키우면 Canvas 중심이 viewport 중심에서 벗어남
- **Container 중심 = Viewport 중심**을 유지해야 모델이 중앙에 배치됨

### 4. 올바른 스케일 보정

```
zoom: 0.75 → scale: 1.3333 (1 / 0.75)
zoom: 0.5  → scale: 2      (1 / 0.5)
zoom: x    → scale: 1/x
```

---

## 참고 자료

### React Three Fiber 관련

- [Canvas resize prop](https://github.com/pmndrs/react-three-fiber/discussions/2439)
- [useThree setSize](https://github.com/pmndrs/react-three-fiber/discussions/1133)

### CSS Transform

- [MDN: transform-origin](https://developer.mozilla.org/en-US/docs/Web/CSS/transform-origin)
- [CSS Zoom vs Transform Scale](https://stackoverflow.com/questions/7289024/css-zoom-vs-css3-transform-scale)

---

## 디버깅 팁

### Canvas 위치 측정

```js
const canvas = document.querySelector("canvas");
const rect = canvas.getBoundingClientRect();
console.log({
  center: {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2,
  },
  viewport: {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  },
});
```

### Container Transform 확인

```js
const container = canvas.parentElement;
console.log(getComputedStyle(container).transform);
// 예: "matrix(1.3333, 0, 0, 1.3333, 0, 0)"
```

### Zoom 영향 확인

```js
console.log({
  bodyZoom: getComputedStyle(document.body).zoom,
  containerClient: container.clientWidth,
  containerOffset: container.offsetWidth,
});
```
