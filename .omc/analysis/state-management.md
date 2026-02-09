# State Management Architecture Gap Analysis

**Date**: 2026-02-09
**Analyzer**: architect-medium (Oracle)
**Scope**: UI State Management vs. Documentation

---

## Summary

Critical state management architecture gap identified. CLAUDE.md references `ui-store.ts` and `app-store.ts` that don't exist. Only `scene-store.ts` exists, managing 3D scene state. All UI interaction states (toolbar active states, panel toggles, chat interface collapse) are scattered across component-local `useState`, creating a fragmented state architecture that blocks centralized interaction state fixes.

---

## Findings

### 1. Current State Architecture

#### Existing Store: `src/stores/scene-store.ts`

**Purpose**: 3D Scene State (Correctly Scoped)

State managed:

- `src/stores/scene-store.ts:18-20` - `modelId: string | null` - Currently loaded model
- `src/stores/scene-store.ts:24-26` - `selectedObject: string | null` - Selected 3D mesh name
- `src/stores/scene-store.ts:30-36` - Camera state (`position`, `rotation`, `target`, `hasSavedCamera`)
- `src/stores/scene-store.ts:48-50` - `explodeLevel: number` - Explode animation level (0-1)

**Persistence**: localStorage via Zustand persist middleware
**Architecture**: Clean separation of 3D scene concerns

#### Missing Stores (Referenced in CLAUDE.md)

- `src/stores/ui-store.ts` - **Does NOT exist** (referenced line: CLAUDE.md "상태 관리" section)
- `src/stores/app-store.ts` - **Does NOT exist** (referenced line: CLAUDE.md "상태 관리" section)

### 2. Scattered UI State Patterns

#### ChatInterface Panel Toggle

- `src/components/panels/ChatInterface.tsx:52` - `const [isOpen, setIsOpen] = useState(defaultOpen);`
- **Issue**: Panel collapse state is local, cannot be controlled externally
- **Impact**: Cannot programmatically expand/collapse chat from toolbar or other components

#### Quiz Panel State

- `src/components/panels/QuizPanel.tsx:23-25` - Local state:
  ```tsx
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  ```
- **Issue**: Quiz state trapped in component, no persistence or global access

#### Notes Panel State

- `src/components/panels/NotesPanel.tsx:9-10` - Local state:
  ```tsx
  const [note, setNote] = useState("");
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  ```
- **Issue**: Note state local to component, visibility controlled by parent logic

#### Chat Sidebar Conversation State

- `src/components/panels/chat-sidebar.tsx:35` - Type definition shows `isActive` prop expected
- **Pattern**: Active conversation state passed as props, but no global store manages this
- **Issue**: No centralized conversation history management

### 3. Toolbar Components - Zero State Management

#### ViewerToolbar (Top Horizontal)

- `src/components/viewer/ViewerToolbar.tsx:40-111` - 4 buttons with NO state:
  - Focus tool (line 41-55)
  - Wireframe toggle (line 58-72)
  - Camera lock (line 75-93)
  - Measurement tool (line 97-111)
- **Issue**: Buttons have no active/inactive state, no click handlers, purely presentational

#### ViewerSideToolbar (Right Vertical)

- `src/components/viewer/ViewerSideToolbar.tsx:40-102` - 3 buttons with NO state:
  - AI Assistant (line 40-54)
  - Search parts (line 57-85)
  - Edit/Annotate (line 88-102)
- **Issue**: Same as ViewerToolbar - no state, no handlers, no functionality

#### ViewerZoomSlider

- `src/components/viewer/ViewerZoomSlider.tsx:28-34` - **CORRECT PATTERN**:
  ```tsx
  const explodeLevel = useSceneStore((state) => state.explodeLevel);
  const setExplodeLevel = useSceneStore((state) => state.setExplodeLevel);
  ```
- **Why Correct**: Global state in `scene-store` because it affects 3D scene rendering

---

## Diagnosis

### Root Cause: No UI State Store

**Problem**: Documentation promises UI state management via `ui-store.ts`, but it was never implemented. This creates three critical issues:

1. **Fragmented State**: Each component manages its own UI state in isolation
2. **No Cross-Component Communication**: Toolbars cannot trigger panel actions
3. **Architectural Inconsistency**: Viewer page at `src/app/viewer/page.tsx:25-88` only imports `scene-store`, expects UI state to exist elsewhere

### Why This Blocks Interaction Fixes

Current interaction requirements need:

- **Toolbar → Panel Communication**: "AI Assistant" button should toggle chat panel
- **Tool State Persistence**: "Wireframe toggle" should remember on/off state
- **Multi-Panel Coordination**: Opening one panel may need to close others
- **Global UI Modes**: Measurement mode should disable other interactions

**None of this is possible without centralized UI state.**

---

## Recommendations

### 1. [Priority 1] - Create ui-store.ts - [2-3 hours] - [High Impact]

**Purpose**: Manage all viewer UI interaction states

**Required State**:

```typescript
// src/stores/ui-store.ts (NEW FILE)
interface UIState {
  // Panel toggles
  isChatOpen: boolean;
  isPartInfoVisible: boolean; // Currently derived from selectedObject, should be explicit
  isNotesVisible: boolean;
  isQuizVisible: boolean;

  // Toolbar active states
  activeViewerTool: "focus" | "wireframe" | "camera-lock" | "measure" | null;
  activeSideTool: "ai" | "search" | "edit" | null;

  // View modes
  isWireframeMode: boolean;
  isCameraLocked: boolean;
  isMeasurementMode: boolean;

  // UI layout
  viewerLayout: "default" | "focused" | "split"; // For future multi-panel layouts

  // Actions
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  setViewerTool: (tool: UIState["activeViewerTool"]) => void;
  setSideTool: (tool: UIState["activeSideTool"]) => void;
  toggleWireframe: () => void;
  toggleCameraLock: () => void;
  toggleMeasurement: () => void;
  resetToolbar: () => void; // Clear all active tools
}
```

**Why These States**:

- Panel toggles enable toolbar → panel communication
- Active tool tracking enables visual feedback (highlight active buttons)
- Mode flags enable conditional Three.js rendering (wireframe, locked camera)
- Layout state enables responsive UI adjustments

**Persistence**: Partial persistence (user preferences only, not active tools)

**File Reference**: Follow pattern from `src/stores/scene-store.ts:65-116`

### 2. [Priority 2] - Refactor ChatInterface to use ui-store - [1 hour] - [Medium Impact]

**Changes Needed**:

```typescript
// src/components/panels/ChatInterface.tsx
// REMOVE: const [isOpen, setIsOpen] = useState(defaultOpen);
// ADD: const { isChatOpen, toggleChat } = useUIStore();
```

**Benefits**:

- Toolbar "AI Assistant" button can call `openChat()`
- Chat state survives component remount
- External components can check chat state for layout adjustments

**File**: `src/components/panels/ChatInterface.tsx:52`

### 3. [Priority 3] - Add click handlers to Toolbars - [2 hours] - [High Impact]

**ViewerToolbar Changes**:

```typescript
// src/components/viewer/ViewerToolbar.tsx
const { activeViewerTool, setViewerTool, toggleWireframe, toggleCameraLock, toggleMeasurement } = useUIStore();

// Focus button (line 41)
onClick={() => {
  setViewerTool('focus');
  // TODO: Implement camera.lookAt(selectedObject) logic
}}
className={cn(
  "w-[30px] h-[30px] flex items-center justify-center transition-colors",
  activeViewerTool === 'focus' ? "text-primary" : "text-neutral-400"
)}

// Wireframe button (line 58)
onClick={toggleWireframe}
className={cn(..., isWireframeMode ? "text-primary" : "text-neutral-400")}

// Similar for camera-lock, measure
```

**ViewerSideToolbar Changes**:

```typescript
// src/components/viewer/ViewerSideToolbar.tsx
const { activeSideTool, setSideTool, openChat } = useUIStore();

// AI Assistant button (line 40)
onClick={() => {
  setSideTool('ai');
  openChat(); // Opens chat panel
}}
```

**Files**:

- `src/components/viewer/ViewerToolbar.tsx:40-111`
- `src/components/viewer/ViewerSideToolbar.tsx:40-102`

### 4. [Priority 4] - Update viewer page layout logic - [1 hour] - [Low Impact]

**Current Logic**:

```typescript
// src/app/viewer/page.tsx:28
const hasPartSelected = !!selectedObject;
// Line 82: {hasPartSelected && <PartInfoPanel />}
```

**Improved Logic**:

```typescript
const { isPartInfoVisible } = useUIStore();
const hasPartSelected = !!selectedObject;
const showPartInfo = hasPartSelected && isPartInfoVisible; // User can hide even when selected

// Line 82: {showPartInfo && <PartInfoPanel />}
```

**Why**: Gives user control to hide panel even when part is selected (more flexibility)

**File**: `src/app/viewer/page.tsx:28, 82`

### 5. [Priority 5] - Create app-store.ts (Optional) - [1 hour] - [Low Impact]

**Purpose**: Global app-level state (authentication, settings, loading states)

**Recommended State**:

```typescript
// src/stores/app-store.ts (NEW FILE)
interface AppState {
  // Auth (if using Clerk)
  isAuthenticated: boolean;
  userId: string | null;

  // Global loading
  isInitializing: boolean;

  // Settings
  theme: "light" | "dark"; // Future: theme switching
  language: "ko" | "en";

  // Network
  isOnline: boolean;
  lastSyncTime: Date | null;
}
```

**Priority**: Lower than ui-store because current app doesn't have complex global state needs

---

## Impact Assessment

### On Interaction State Fixes

**Current Blockers**:

1. ❌ Toolbar buttons cannot trigger panel actions (no shared state)
2. ❌ Tools cannot maintain active/inactive visual state (no state tracking)
3. ❌ Wireframe/measurement modes cannot affect rendering (no mode flags in accessible store)
4. ❌ Chat panel cannot be controlled externally (local state only)

**After ui-store.ts Implementation**:

1. ✅ Toolbar → Panel communication via shared Zustand store
2. ✅ Active tool highlighting via `activeViewerTool` state
3. ✅ Three.js can read `isWireframeMode`, `isMeasurementMode` from store
4. ✅ Any component can control chat panel via `toggleChat()` action

### On Developer Experience

**Current**:

- Developer adds toolbar button → must manually connect to panels via props drilling or context
- State scattered across 10+ components, no single source of truth
- Zustand DevTools only shows `scene-store`, missing 90% of UI state

**After Implementation**:

- Developer adds toolbar button → imports `useUIStore`, calls action
- All UI state in one place, easy to debug
- Zustand DevTools shows complete state picture (scene + ui + app)

### On Testing

**Current**:

- Cannot test toolbar-panel integration (no shared state to mock)
- Each component needs separate test setup for local state

**After Implementation**:

- Centralized store enables integration testing
- Mock `useUIStore` once, test all interactions
- Storybook can control store state for all UI states

---

## Architecture Decision Records

### Why Separate ui-store from scene-store?

**Reasoning**:

- **scene-store**: 3D rendering concerns (camera, selection, explode level)
  - Persistence: Yes (restore view on reload)
  - Subscribers: Three.js components, Canvas, Camera

- **ui-store**: 2D interface concerns (panels, toolbars, modes)
  - Persistence: Partial (preferences only, not active tools)
  - Subscribers: UI components, layout logic

**Separation Benefits**:

1. Clear mental model: 3D vs 2D state
2. Independent evolution: Can change UI without affecting 3D
3. Performance: Subscribers only re-render on relevant state changes
4. Testing: Mock scene state without UI state, and vice versa

### Why Not Context API?

**Zustand Advantages**:

- No provider wrapping needed (simpler DX)
- DevTools integration out-of-box
- Middleware ecosystem (persist, devtools)
- Better performance (no unnecessary re-renders)
- Already used in project (consistency)

### Why Not Combine All State?

**Anti-Pattern**: Single mega-store

```typescript
// ❌ DON'T DO THIS
interface AppState {
  // Scene
  selectedObject: string | null;
  cameraPosition: [number, number, number];
  // UI
  isChatOpen: boolean;
  activeViewerTool: string | null;
  // App
  isAuthenticated: boolean;
  theme: string;
  // ... 50+ fields
}
```

**Problems**:

- Every subscriber re-renders on any state change
- Hard to reason about dependencies
- Impossible to debug state flow
- Testing requires massive mock objects

**Zustand Best Practice**: Multiple focused stores with clear boundaries

---

## Migration Path

### Phase 1: Create Store (Zero Breaking Changes)

1. Create `src/stores/ui-store.ts` with initial state
2. Add DevTools middleware for debugging
3. No components import it yet - just infrastructure

### Phase 2: Migrate ChatInterface (Low Risk)

1. Update `ChatInterface.tsx` to use `useUIStore`
2. Keep `defaultOpen` prop for backward compat
3. Test chat toggle works identically

### Phase 3: Wire Up Toolbars (Medium Risk)

1. Add click handlers to toolbar buttons
2. Connect to ui-store actions
3. Add visual active states
4. Test each button individually

### Phase 4: Integrate with Three.js (High Value)

1. Read `isWireframeMode` in Three.js material setup
2. Read `isCameraLocked` in OrbitControls setup
3. Read `isMeasurementMode` to enable measurement overlay
4. Test rendering modes work correctly

### Phase 5: Create app-store (Optional)

1. Only if authentication/global settings needed
2. Extract any remaining global state
3. Final architecture cleanup

---

## File Creation Checklist

### Required New Files

- [ ] `src/stores/ui-store.ts` - Primary UI state store
- [ ] `src/stores/ui-store.test.ts` - Unit tests for store logic
- [ ] `src/hooks/use-ui/index.ts` - Custom hook wrappers (optional sugar)

### Files to Modify

- [ ] `src/components/panels/ChatInterface.tsx` - Replace local state with store
- [ ] `src/components/viewer/ViewerToolbar.tsx` - Add click handlers + store
- [ ] `src/components/viewer/ViewerSideToolbar.tsx` - Add click handlers + store
- [ ] `src/app/viewer/page.tsx` - Update layout logic to use store
- [ ] `CLAUDE.md` - Update state management section to reflect reality

### Optional New Files

- [ ] `src/stores/app-store.ts` - Global app state (low priority)

---

## Risk Analysis

### Low Risk

- Creating new store (additive, no breaking changes)
- Migrating ChatInterface (self-contained component)

### Medium Risk

- Toolbar integration (many buttons, need comprehensive testing)
- Three.js integration (could affect rendering performance)

### High Risk

- None identified (architecture is straightforward)

### Mitigation

1. **Incremental rollout**: One component at a time
2. **Feature flags**: Keep old code paths until new code proven
3. **Comprehensive testing**: Unit + integration + visual regression
4. **Storybook validation**: Test all UI states in isolation

---

## Next Steps

### For Implementation Team

1. **Review this analysis** with team lead (5 min)
2. **Create ui-store.ts** following template in Recommendation #1 (2 hours)
3. **Add Storybook stories** for toolbar states before implementing (1 hour)
4. **Implement toolbar handlers** one at a time, test each (4 hours)
5. **Update documentation** in CLAUDE.md to remove references to non-existent stores (15 min)

### For Architect Review

- **Decision needed**: Should PartInfoPanel visibility be user-controllable or always-show-when-selected?
- **Decision needed**: Should active tool state be mutually exclusive (only one tool active) or allow multiple?
- **Performance concern**: Is Zustand subscription granularity sufficient or need selectors optimization?

---

## Conclusion

**Critical Gap Confirmed**: Documentation references state architecture that doesn't exist. Current implementation has only scene state, zero UI state management. This directly blocks interaction state fixes identified by architect.

**Recommended Action**: Implement ui-store.ts as Priority 1, following Zustand patterns already established in scene-store.ts. This unblocks all toolbar-panel interactions and provides foundation for sophisticated UI state management.

**Effort Estimate**: 8-10 hours total for full implementation (ui-store + toolbar wiring + testing)

**Business Impact**: Without this, viewer remains a static UI mockup. With this, becomes interactive tool with persistent user preferences and proper tool state management.

---

**End of Analysis**
