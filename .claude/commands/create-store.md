# Create Zustand Store

Create a new Zustand store with devtools middleware.

## Store Template

Create a file in `src/stores/{name}-store.ts`:

```tsx
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface {Name}State {
  // State properties
  exampleValue: string;

  // Actions
  setExampleValue: (value: string) => void;
  resetStore: () => void;
}

const initialState = {
  exampleValue: '',
};

export const use{Name}Store = create<{Name}State>()(
  devtools(
    (set) => ({
      ...initialState,

      setExampleValue: (value) => set({ exampleValue: value }),

      resetStore: () => set(initialState),
    }),
    { name: '{Name}Store' }
  )
);
```

## Usage Example

Create a usage example file `src/stores/{name}-store.example.tsx`:

```tsx
import { use{Name}Store } from './{name}-store';

export function ExampleComponent() {
  const { exampleValue, setExampleValue } = use{Name}Store();

  return (
    <div>
      <p>Value: {exampleValue}</p>
      <button onClick={() => setExampleValue('new value')}>
        Update
      </button>
    </div>
  );
}

// Selector pattern (prevents unnecessary re-renders)
export function OptimizedComponent() {
  const exampleValue = use{Name}Store((state) => state.exampleValue);

  return <p>{exampleValue}</p>;
}
```

## Steps

1. Ask for the store name
2. Ask what state properties are needed
3. Ask what actions are needed
4. Create the store file
5. Create the usage example file
6. Run `pnpm format`
7. Suggest adding the store to the relevant components
