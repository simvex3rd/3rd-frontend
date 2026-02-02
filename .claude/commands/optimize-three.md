# Optimize Three.js Performance

Analyze and optimize Three.js performance in the current component or scene.

## Performance Checklist

### 1. Instancing (for multiple identical objects)

Instead of:

```tsx
{
  Array.from({ length: 100 }).map((_, i) => (
    <mesh key={i}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  ));
}
```

Use:

```tsx
<instancedMesh args={[geometry, material, 100]}>
  <boxGeometry />
  <meshStandardMaterial />
</instancedMesh>
```

### 2. LOD (Level of Detail)

```tsx
import { Lod } from "@react-three/drei";

<Lod distances={[0, 10, 20]}>
  <mesh geometry={highPolyGeo} />
  <mesh geometry={midPolyGeo} />
  <mesh geometry={lowPolyGeo} />
</Lod>;
```

### 3. Geometry/Material Disposal

```tsx
useEffect(() => {
  const geo = new THREE.BoxGeometry();
  const mat = new THREE.MeshBasicMaterial();

  return () => {
    geo.dispose();
    mat.dispose();
  };
}, []);
```

### 4. Memoization

```tsx
const geometry = useMemo(() => new THREE.BoxGeometry(), []);
const material = useMemo(() => new THREE.MeshBasicMaterial(), []);
```

### 5. Frustum Culling

```tsx
// Enabled by default, but ensure it's not disabled
mesh.frustumCulled = true;
```

### 6. Texture Optimization

- Use power-of-two textures (512, 1024, 2048)
- Compress textures (JPG for photos, PNG for transparency)
- Use mipmaps
- Share textures across materials

### 7. Draw Call Reduction

- Merge geometries when possible
- Use instancing
- Share materials

### 8. Shadow Optimization

```tsx
<Canvas shadows="basic">
  {" "}
  {/* or 'soft', 'variance' */}
  <directionalLight castShadow shadow-mapSize={[512, 512]} />
</Canvas>
```

## Analysis Steps

1. Check current FPS with Stats:

   ```tsx
   import { Stats } from "@react-three/drei";
   <Canvas>
     <Stats />
   </Canvas>;
   ```

2. Count draw calls in browser DevTools (Performance tab)

3. Check for memory leaks (multiple renders increasing memory)

4. Profile with React DevTools

5. Apply optimizations based on bottlenecks

## Common Issues

- **Low FPS**: Too many draw calls → Use instancing
- **High memory**: Not disposing geometries/materials
- **Slow loading**: Large textures → Compress/resize
- **Lag on interaction**: Too many objects → Use LOD or culling
