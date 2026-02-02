# Create Three.js Component

Create a new Three.js/R3F component with the following structure:

## Component Template

Create a file in `src/components/viewer/{ComponentName}.tsx`:

```tsx
'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

interface {ComponentName}Props {
  position?: [number, number, number];
  scale?: number;
  color?: string;
}

export function {ComponentName}({
  position = [0, 0, 0],
  scale = 1,
  color = 'orange',
}: {ComponentName}Props) {
  const meshRef = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      // Add animation logic here
      meshRef.current.rotation.y += delta;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}
```

## Storybook Story

Also create `src/components/viewer/{ComponentName}.stories.tsx`:

```tsx
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { {ComponentName} } from './{ComponentName}';

const meta = {
  title: 'Viewer/{ComponentName}',
  component: {ComponentName},
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof {ComponentName}>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => (
    <div style={{ height: '400px', width: '600px' }}>
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} />
        <{ComponentName} {...args} />
        <OrbitControls />
      </Canvas>
    </div>
  ),
  args: {
    position: [0, 0, 0],
    scale: 1,
    color: 'orange',
  },
};
```

## Steps

1. Ask for the component name
2. Create the component file with the template above
3. Create the Storybook story
4. Run `pnpm format` to format the files
5. Confirm creation and suggest next steps
