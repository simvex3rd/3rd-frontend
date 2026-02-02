# SIMVEX Frontend

A high-performance 3D simulation and visualization platform built with React Three Fiber and Next.js.

## Tech Stack

- **Framework:** Next.js 16.1.6 (App Router)
- **React:** 19.2.3
- **TypeScript:** 5.9.3
- **3D Graphics:** Three.js 0.182.0, React Three Fiber 9.5.0, Drei 10.7.7
- **Styling:** Tailwind CSS v4.1.18
- **State Management:** Zustand 5.0.11
- **Animation:** Motion 12.29.3
- **UI Components:** shadcn/ui (New York style)

## Prerequisites

- Node.js 24.12.0 (use `nvm use` to load from `.nvmrc`)
- pnpm 10.28.0

## Getting Started

### Installation

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Storybook

```bash
pnpm storybook
```

Open [http://localhost:6006](http://localhost:6006) to view component stories.

### Build

```bash
pnpm build
pnpm start
```

## Project Structure

```
src/
├── app/                 # Next.js App Router
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── viewer/          # 3D viewer components
│   ├── panels/          # UI panels and controls
│   └── common/          # Shared components
├── hooks/               # Custom React hooks
│   ├── use-three/       # Three.js specific hooks
│   └── use-ui/          # UI state hooks
├── types/               # TypeScript types
├── lib/                 # Utilities
│   └── three/           # Three.js utilities
└── stores/              # Zustand stores
```

## Code Quality

### Linting

```bash
pnpm lint          # Check for issues
pnpm lint:fix      # Auto-fix issues
```

### Formatting

```bash
pnpm format        # Format all files
pnpm format:check  # Check formatting
```

### Git Hooks

- **pre-commit:** Runs linting and formatting on staged files
- **commit-msg:** Validates commit message format

#### Commit Message Format

```
<type>(<scope>): <subject>

Example: feat(viewer): add camera orbit controls
```

**Types:** feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert

**Scopes:** viewer, ui, panels, hooks, types, lib, stores, config, deps

## Development Guidelines

### Adding UI Components

```bash
npx shadcn@latest add button
```

### Creating Three.js Components

- Place 3D components in `src/components/viewer/`
- Use R3F hooks (`useFrame`, `useThree`)
- Follow performance best practices (instancing, LOD, etc.)

### State Management

- Use Zustand for global state
- Create stores in `src/stores/`
- Keep scene state separate from UI state

## Performance Optimization

- Code splitting with Next.js dynamic imports
- Three.js object pooling for repeated geometries
- Use `<Suspense>` for lazy-loaded 3D assets
- Enable stats in development: `NEXT_PUBLIC_ENABLE_STATS=true`

## Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

See `.env.example` for available variables.

## Contributing

1. Create a feature branch
2. Make changes following code guidelines
3. Ensure all lints and builds pass
4. Commit with conventional commit format
5. Submit pull request

## License

[Your License Here]
