# SIMVEX Frontend - Figma Gap Implementation Plan (REVISED)

**Plan ID:** figma-gap-fix-revised
**Created:** 2026-02-09
**Status:** Ready for Execution
**Revision of:** figma-gap-fix.md
**Scope:** Functional implementation only -- NO sizing/scaling, NO viewer styling changes

---

## Revision Summary

This plan revises `figma-gap-fix.md` with the following strategic changes:

| Original Plan                            | Revised Plan         | Reason                                        |
| ---------------------------------------- | -------------------- | --------------------------------------------- |
| Phase 0 (Sizing/Scaling) as prerequisite | **REMOVED ENTIRELY** | Previous canvas issues; conservative approach |
| Viewer styling changes                   | **FORBIDDEN**        | Risk of breaking canvas zoom compensation     |
| 5 phases (0-4)                           | **4 phases (1-4)**   | Phase 0 eliminated                            |
| "Make it perfect"                        | **"Make it work"**   | Functional over cosmetic                      |

### What Changed

1. **Phase 0 is GONE** -- No `px-4` to `px-[16px]` conversions, no spacing changes anywhere
2. **Viewer components are READ-ONLY for styling** -- Only add onClick handlers and state connections
3. **DO NOT TOUCH list:**
   - `SceneCanvas.tsx` styling
   - `Model.tsx` transform/scale
   - Canvas zoom compensation (`scale(1.3333)`)
   - `ViewerToolbar.tsx` positioning/spacing (`gap-9`, `py-3`, etc.)
   - `ViewerSideToolbar.tsx` positioning/spacing (`gap-3`, `py-3`, etc.)
   - `ViewerZoomSlider.tsx` border/sizing
   - `ViewerHeader.tsx` layout/spacing
   - `globals.css` zoom system
4. **Phase 4 is minimal** -- Only critical accessibility and critical color fixes

---

## Context

### Original Request

Fix Figma-vs-implementation gaps discovered in 19 comprehensive analysis reports.

### Revised User Directive

- Skip ALL sizing/scaling work (Phase 0)
- Do NOT touch viewer component styling
- Focus on making things WORK, not making them pixel-perfect
- Conservative, safe approach throughout

### Research Findings (unchanged)

- **State management gap:** `ui-store.ts` and `app-store.ts` referenced in docs but never created -- blocks ALL toolbar/panel interactions
- **Toolbar buttons:** Purely visual with ZERO click handlers
- **Chat panel:** Uses local `useState`, no cross-component communication
- **Missing components:** Dialog, Toast, Loading -- needed for user feedback

---

## Work Objectives

### Core Objective

Transform the SIMVEX viewer from a static visual mockup into a **functional, interactive** application. Toolbar buttons work. Panels toggle. State is centralized. User feedback exists.

### Deliverables

1. **Phase 1:** `ui-store.ts` created, toolbar buttons wired to state, chat panel externally controllable
2. **Phase 2:** Dialog, Toast, Loading components created via shadcn/ui
3. **Phase 3:** Toolbar buttons have onClick handlers, active states, keyboard support
4. **Phase 4:** Critical-only color fixes and accessibility fixes (conservative scope)

### Definition of Done

- [ ] `ui-store.ts` exists and manages all panel toggles + toolbar active states
- [ ] Every toolbar button has an onClick handler connected to ui-store
- [ ] Chat panel toggles via `useUIStore().toggleChat()`
- [ ] Dialog, Toast, and Loading components exist and are importable
- [ ] Build passes with zero errors (`pnpm build`)
- [ ] NO viewer styling has been modified (gap-9, py-3, scale, etc. untouched)
- [ ] Canvas zoom compensation is untouched

---

## Guardrails

### MUST Have

- `ui-store.ts` as centralized UI state (Phase 1)
- Working toolbar button onClick handlers (Phase 1)
- Dialog + Toast + Loading components (Phase 2)
- No breaking changes to existing 3D canvas behavior
- Each phase ends with a passing build

### MUST NOT Have (CRITICAL -- READ CAREFULLY)

**Viewer styling -- DO NOT TOUCH:**

- `ViewerToolbar.tsx`: Do NOT change `gap-9`, `py-3`, or any positioning/layout classes
- `ViewerSideToolbar.tsx`: Do NOT change `gap-3`, `py-3`, or any positioning/layout classes
- `ViewerHeader.tsx`: Do NOT change any layout, spacing, or positioning
- `ViewerZoomSlider.tsx`: Do NOT change `border-2` or any sizing
- `SceneCanvas.tsx`: Do NOT change any styling whatsoever
- `Model.tsx`: Do NOT change transform, scale, or position
- Canvas zoom compensation (`scale(1.3333)` in viewer page): Do NOT touch
- `globals.css` zoom system: Do NOT touch

**General restrictions:**

- No Tailwind spacing conversions (`px-4` to `px-[16px]` etc.) -- Phase 0 is removed
- No new npm dependencies without user approval
- No changes to `scene-store.ts` (unless adding new 3D state)
- No mobile responsive work
- No changes to `.stories.tsx` files

---

## Phase 1: State Management Architecture (CRITICAL -- DO FIRST)

**Goal:** Create `ui-store.ts` to unblock all toolbar/panel interaction work.
**Time Estimate:** 3-4 hours
**Risk:** LOW (additive, no breaking changes)
**Dependency:** None (Phase 0 removed)
**Commit Strategy:** 2 commits

### Why This Is Phase 1

Without centralized UI state, toolbar buttons cannot:

- Toggle the chat panel open/closed
- Track which tool is active (focus, wireframe, camera lock, measure)
- Coordinate panel visibility (opening one may close another)
- Persist user preferences across navigation

Currently: toolbar buttons are purely visual with ZERO click handlers. Chat panel uses local `useState`. No cross-component communication exists.

### Task 1.1: Create ui-store.ts

**New file:** `src/stores/ui-store.ts`

**State shape:**

```typescript
interface UIState {
  // Panel toggles
  isChatOpen: boolean;
  isPartInfoVisible: boolean;
  isNotesVisible: boolean;

  // Toolbar active states
  activeViewerTool: "focus" | "wireframe" | "camera-lock" | "measure" | null;
  activeSideTool: "ai" | "search" | "edit" | null;

  // View modes
  isWireframeMode: boolean;
  isCameraLocked: boolean;

  // Actions
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  setViewerTool: (tool: UIState["activeViewerTool"]) => void;
  setSideTool: (tool: UIState["activeSideTool"]) => void;
  toggleWireframe: () => void;
  toggleCameraLock: () => void;
  resetToolbar: () => void;
}
```

**Pattern:** Follow `src/stores/scene-store.ts` exactly -- `create()` + `devtools()` + partial `persist()`.

**Persistence:** Only persist `isChatOpen` and view mode flags. Do NOT persist active tool (resets on page load).

**Acceptance:**

- Store creates without errors
- DevTools show "UIStore" in Zustand browser extension
- All actions callable from any component via `useUIStore()`

**Commit:** `feat(stores): create ui-store for centralized UI state management`

### Task 1.2: Wire ChatInterface to ui-store

**File:** `src/components/panels/ChatInterface.tsx`

**Changes:**

1. Import `useUIStore` instead of local `useState` for `isOpen`
2. Replace `const [isOpen, setIsOpen] = useState(defaultOpen)` with `const { isChatOpen, toggleChat } = useUIStore()`
3. Keep `defaultOpen` prop for initial value (set in store if needed)
4. Replace `setIsOpen(!isOpen)` with `toggleChat()`

**IMPORTANT:** Do NOT change any styling, spacing, or layout classes in ChatInterface.

**Acceptance:**

- Chat panel opens/closes as before
- `useUIStore.getState().isChatOpen` reflects current state
- External components can call `useUIStore.getState().openChat()` to open chat

### Task 1.3: Wire ViewerToolbar to ui-store (FUNCTIONALITY ONLY)

**File:** `src/components/viewer/ViewerToolbar.tsx`

**ALLOWED changes:**

1. Import `useUIStore`
2. Add `onClick` handlers to all 4 buttons:
   - Focus: `setViewerTool('focus')`
   - Wireframe: `toggleWireframe()`
   - Camera Lock: `toggleCameraLock()`
   - Measure: `setViewerTool('measure')`
3. Add minimal visual active state using ONLY conditional className logic (e.g., `cn(existingClasses, isActive && "text-primary")`)

**FORBIDDEN changes:**

- Do NOT change `gap-9`, `py-3`, or any existing spacing/layout classes
- Do NOT change icon sizes, container dimensions, or positioning
- Do NOT add hover/press/focus styles (that is Phase 3 scope, and will also be conservative)

### Task 1.4: Wire ViewerSideToolbar to ui-store (FUNCTIONALITY ONLY)

**File:** `src/components/viewer/ViewerSideToolbar.tsx`

**ALLOWED changes:**

1. Import `useUIStore`
2. Add `onClick` handlers:
   - AI Assistant: `setSideTool('ai'); openChat();`
   - Search Parts: `setSideTool('search')`
   - Edit/Annotate: `setSideTool('edit')`
3. Add minimal visual active state (conditional className only)

**FORBIDDEN changes:**

- Do NOT change `gap-3`, `py-3`, or any existing spacing/layout classes
- Do NOT change icon sizes, container dimensions, or positioning

### Task 1.5: Update viewer/page.tsx layout logic

**File:** `src/app/viewer/page.tsx`

**Changes:**

1. Import `useUIStore`
2. Use `isChatOpen` from store for chat width logic
3. Use store state for PartInfoPanel visibility:
   ```tsx
   const showPartInfo = hasPartSelected && isPartInfoVisible;
   ```

**IMPORTANT:** Do NOT change canvas container, zoom compensation div, or any positioning/layout.

**Commit:** `feat(viewer): wire toolbars and chat panel to centralized ui-store`

---

## Phase 2: Core Missing Components (P0 Blockers)

**Goal:** Create Dialog, Toast, and Loading components that the entire app needs.
**Time Estimate:** 10-14 hours
**Risk:** MEDIUM (new components, need thorough testing)
**Dependency:** None (can run in parallel with Phase 1)
**Commit Strategy:** 1 commit per component system

### Task 2.1: Dialog/Modal Component System

**New files:**

- `src/components/ui/dialog.tsx` (base component via shadcn/ui)
- Variants: Confirmation, Settings, Help

**Implementation approach:**

1. Install shadcn/ui Dialog primitive (user approval required for dependency)
2. Style with SIMVEX design tokens (glassmorphism background, primary border)
3. Implement focus trap and keyboard nav (ESC to close)
4. Add ARIA roles: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

**Acceptance:**

- Dialog opens centered on screen
- ESC closes dialog
- Tab traps focus inside dialog
- Overlay click closes dialog (optional per variant)
- Screen reader announces dialog title

**Commit:** `feat(ui): create dialog/modal component system with focus trap`

### Task 2.2: Toast/Notification System

**New files:**

- `src/components/ui/toast.tsx` (base component)
- `src/components/ui/toaster.tsx` (container/provider)
- `src/hooks/use-toast.ts` (hook for triggering toasts)

**Implementation approach:**

1. Use shadcn/ui Toast primitive or build from scratch with Radix
2. Queue system: max 3 visible toasts, FIFO
3. Auto-dismiss: 5 seconds default
4. Variants: success (green), error (red), info (blue), warning (yellow)

**ARIA:**

- `role="alert"` on toast container
- `aria-live="polite"` for info, `aria-live="assertive"` for errors

**Acceptance:**

- `toast.success("Saved!")` shows green toast top-right
- Toast auto-dismisses after 5 seconds
- Close button removes toast immediately
- Multiple toasts stack vertically

**Commit:** `feat(ui): create toast notification system with queue`

### Task 2.3: Loading Components (Spinner + Skeleton)

**New files:**

- `src/components/ui/spinner.tsx` (animated spinner)
- `src/components/ui/skeleton.tsx` (content placeholder)

**Spinner variants:**

- `sm`: inline, buttons
- `md`: sections
- `lg`: full-page
- Color: primary by default, customizable

**Skeleton variants:**

- Text: single line placeholder
- Card: model card placeholder
- Avatar: circular placeholder
- Uses `animate-pulse`

**ARIA:**

- `aria-busy="true"` on loading containers
- `aria-label="Loading"` on spinners

**Acceptance:**

- Spinner animates smoothly
- Skeleton pulses appropriately
- Both render correctly

**Commit:** `feat(ui): create spinner and skeleton loading components`

---

## Phase 3: Interactions (CONSERVATIVE)

**Goal:** Make toolbar buttons functional with minimal, safe visual feedback.
**Time Estimate:** 8-12 hours
**Risk:** LOW-MEDIUM (conservative approach reduces risk)
**Dependency:** Phase 1 (ui-store must exist)
**Commit Strategy:** 1 commit per major component group

### CONSERVATIVE APPROACH

Phase 3 in the original plan included extensive hover/press/focus/disabled styling changes to viewer components. The revised approach:

- Add onClick handlers ONLY (most done in Phase 1)
- Add MINIMAL active state indication (conditional className, no layout changes)
- Do NOT add hover animations, press scale effects, or focus rings to viewer toolbar buttons
- Tooltip component is still created (it is a new file, not modifying existing viewer components)

### Task 3.1: ViewerToolbar Active State Indication (MINIMAL)

**File:** `src/components/viewer/ViewerToolbar.tsx`

**ALLOWED:** Add conditional className for active state only:

```tsx
// Example: just a color/opacity change, nothing structural
className={cn(existingClasses, isActive && "opacity-100")}
```

**FORBIDDEN:**

- `hover:bg-*`, `active:scale-*`, `focus-visible:ring-*` additions
- Any layout/spacing changes
- Touch target size changes

### Task 3.2: ViewerSideToolbar Active State Indication (MINIMAL)

**File:** `src/components/viewer/ViewerSideToolbar.tsx`

Same conservative rules as Task 3.1.

### Task 3.3: ViewerZoomSlider Functionality

**File:** `src/components/viewer/ViewerZoomSlider.tsx`

**ALLOWED:**

- Connect slider value to scene-store `explodeLevel`
- Add onChange handler for slider interaction

**FORBIDDEN:**

- Changing `border-2` or any existing styling
- Adding hover/press/drag visual effects
- Changing button/thumb dimensions

### Task 3.4: Tooltip Component (NEW FILE -- SAFE)

**New file:** `src/components/ui/tooltip.tsx`

This is a new file, so no risk of breaking existing components.

- Positioning: top (default), bottom, left, right
- Delay: 300ms on hover before showing
- `role="tooltip"`, accessible via `aria-describedby`

**NOTE:** Integrating tooltips INTO viewer toolbar buttons is OPTIONAL and should only be done if it can be achieved by wrapping existing buttons without changing their internal styling.

### Task 3.5: ViewerHeader Minimal Interaction (CONSERVATIVE)

**File:** `src/components/viewer/ViewerHeader.tsx`

**ALLOWED:**

- Add onClick handlers for navigation links (wire to router)
- Add `aria-current="page"` for active nav item

**FORBIDDEN:**

- Hover animation additions
- Layout/spacing changes
- Logo scale effects
- Font weight changes

**Commit:** `feat(viewer): add toolbar functionality and tooltip component`

---

## Phase 4: Critical-Only Polish (MINIMAL SCOPE)

**Goal:** Fix ONLY critical color and accessibility issues. Conservative scope.
**Time Estimate:** 6-10 hours
**Risk:** LOW (small, targeted changes)
**Dependency:** None specific
**Commit Strategy:** 1 commit per category

### WHAT IS "CRITICAL"

Only fix issues that:

1. Make the app unusable (broken functionality)
2. Fail WCAG AA at the most basic level (color contrast on error text)
3. Prevent keyboard navigation entirely

Do NOT fix:

- Cosmetic color mismatches (gray-_ vs neutral-_)
- Glassmorphism differences from Figma
- Animation timing inconsistencies
- Touch target sizes (viewer buttons stay as-is)

### Task 4.1: Critical Color Fixes ONLY

**Scope:** ONLY fix colors that cause usability issues

**Allowed fixes:**

- Error text color that fails WCAG AA contrast: `#fb2c36` to a passing variant
- Inline `backgroundColor` styles in ChatInterface that may cause readability issues

**NOT allowed (deferred):**

- `gray-*` to `neutral-*` conversions (cosmetic)
- Glassmorphism background corrections (cosmetic)
- Opacity variant additions to CSS (cosmetic)

**Commit:** `fix(ui): fix critical color contrast issues`

### Task 4.2: Critical Accessibility Fixes ONLY

**Scope:** Bare minimum accessibility

**Allowed fixes:**

1. Korean `aria-label` values to English (functional correctness)
2. Add `<main>` landmark to viewer page layout (if trivially safe)
3. `aria-busy="true"` on loading containers (new components from Phase 2)

**NOT allowed (deferred):**

- Touch target size changes on viewer toolbar buttons
- Focus ring additions to viewer components
- Skip navigation links
- Extensive ARIA role additions

**Commit:** `fix(a11y): fix korean aria-labels and add basic landmarks`

---

## Dependencies & Critical Path

```
Phase 1 (State Management) -----> Phase 3 (Interactions)
    |                                  |
    | (no Phase 0 dependency)          | (depends on ui-store)
    |                                  |
Phase 2 (Components) -----> (standalone, parallel with Phase 1)
    |
Phase 4 (Critical Polish) -----> (standalone, parallel with anything)

Critical Path: Phase 1 -> Phase 3
Parallel Track: Phase 2 (runs alongside Phase 1)
Parallel Track: Phase 4 (runs alongside anything)
```

**Recommended execution order for 2-person team:**

| Day      | Person A                                  | Person B                                |
| -------- | ----------------------------------------- | --------------------------------------- |
| Day 1 AM | Phase 1: Task 1.1 (ui-store)              | Phase 2: Task 2.1 (Dialog)              |
| Day 1 PM | Phase 1: Tasks 1.2-1.5 (wiring)           | Phase 2: Task 2.2 (Toast)               |
| Day 2 AM | Phase 3: Tasks 3.1-3.3 (toolbar states)   | Phase 2: Task 2.3 (Loading)             |
| Day 2 PM | Phase 3: Tasks 3.4-3.5 (tooltip + header) | Phase 4: Tasks 4.1-4.2 (critical fixes) |
| Day 3 AM | Integration testing                       | Bug fixes                               |
| Day 3 PM | Bug fixes + QA                            | QA                                      |

**Estimated total: 3 focused days (24-30 hours of actual work)**

---

## Time Estimates (Realistic)

| Phase                                | Optimistic | Expected | Pessimistic |
| ------------------------------------ | ---------- | -------- | ----------- |
| ~~Phase 0: Sizing/Scaling~~          | ~~2h~~     | ~~3h~~   | ~~4h~~      |
| Phase 1: State Management            | 3h         | 4h       | 6h          |
| Phase 2: Core Components             | 8h         | 12h      | 16h         |
| Phase 3: Interactions (conservative) | 6h         | 8h       | 12h         |
| Phase 4: Critical Polish (minimal)   | 3h         | 5h       | 8h          |
| **Total**                            | **20h**    | **29h**  | **42h**     |

Savings vs original plan: ~16 hours expected (Phase 0 removed + reduced Phase 3/4 scope)

---

## Risk Mitigation

### Risk 1: ~~Phase 0 causes visual regressions~~ ELIMINATED

Phase 0 is removed. No sizing/scaling changes. Zero risk of visual regression from spacing conversions.

### Risk 2: ui-store conflicts with existing scene-store

**Probability:** Very Low
**Impact:** Low
**Mitigation:**

- Stores are completely independent (different Zustand instances)
- ui-store only manages 2D UI state, never touches 3D scene state

### Risk 3: shadcn/ui Dialog/Toast requires new dependencies

**Probability:** High
**Impact:** Low
**Mitigation:**

- Must get user approval before `pnpm add` any package
- If denied: implement from scratch using Radix primitives (already in project)

### Risk 4: Toolbar onClick handlers break 3D canvas events

**Probability:** Very Low (reduced from Medium)
**Impact:** High
**Mitigation:**

- We are ONLY adding onClick handlers, not changing any layout or pointer-events
- Toolbar buttons already have `pointer-events-auto` (isolated from canvas)
- All click handlers are UI-only state changes, not direct Three.js calls
- No styling changes to viewer components eliminates CSS cascade risks

### Risk 5: ~~Timeline pressure~~ REDUCED

With Phase 0 removed and Phase 3/4 scoped down, the plan fits in 3 focused days instead of 4.

---

## Commit Strategy

| #     | Message                                                              | Phase | Files Changed               |
| ----- | -------------------------------------------------------------------- | ----- | --------------------------- |
| ~~1~~ | ~~`fix(ui): convert all spacing to arbitrary pixel values`~~         | ~~0~~ | ~~REMOVED~~                 |
| 1     | `feat(stores): create ui-store for centralized UI state management`  | 1     | 1 new file                  |
| 2     | `feat(viewer): wire toolbars and chat panel to centralized ui-store` | 1     | 4 files                     |
| 3     | `feat(ui): create dialog/modal component system with focus trap`     | 2     | 1-2 new files               |
| 4     | `feat(ui): create toast notification system with queue`              | 2     | 2-3 new files               |
| 5     | `feat(ui): create spinner and skeleton loading components`           | 2     | 2 new files                 |
| 6     | `feat(viewer): add toolbar functionality and tooltip component`      | 3     | 3-5 files (minimal changes) |
| 7     | `fix(ui): fix critical color contrast issues`                        | 4     | 2-3 files                   |
| 8     | `fix(a11y): fix korean aria-labels and add basic landmarks`          | 4     | 3-5 files                   |

Total: 8 commits (down from 11). All on `dev` branch.

---

## Success Criteria

### Phase 1 Complete When:

- [ ] `src/stores/ui-store.ts` exists and exports `useUIStore`
- [ ] Toolbar buttons have onClick handlers connected to store
- [ ] Chat panel toggles via `useUIStore().toggleChat()`
- [ ] DevTools shows UIStore with correct state
- [ ] NO viewer styling has been modified

### Phase 2 Complete When:

- [ ] `<Dialog>` component renders, traps focus, closes on ESC
- [ ] `toast.success("msg")` shows toast notification
- [ ] `<Spinner size="md" />` renders animated spinner
- [ ] `<Skeleton variant="text" />` renders pulsing placeholder

### Phase 3 Complete When:

- [ ] Every toolbar button triggers its corresponding store action on click
- [ ] Active toolbar tool has minimal visual indication
- [ ] Tooltip component exists as a reusable new file
- [ ] NO viewer component spacing/layout has been modified

### Phase 4 Complete When:

- [ ] Error text color passes WCAG AA contrast
- [ ] Korean aria-labels replaced with English
- [ ] Basic landmarks present on viewer page

### Overall Success:

- [ ] All Phase 1-3 success criteria met
- [ ] Phase 4 critical fixes applied
- [ ] Build passes, no console errors
- [ ] Viewer page is interactive (not just a static mockup)
- [ ] **Canvas zoom, viewer layout, and all viewer styling are UNTOUCHED**

---

## Explicitly DO NOT TOUCH (Reference List)

This is the definitive list of files and properties that must NOT be modified for styling:

| File                                          | Protected Properties                                     |
| --------------------------------------------- | -------------------------------------------------------- |
| `src/components/viewer/ViewerToolbar.tsx`     | `gap-9`, `py-3`, all positioning classes                 |
| `src/components/viewer/ViewerSideToolbar.tsx` | `gap-3`, `py-3`, all positioning classes                 |
| `src/components/viewer/ViewerHeader.tsx`      | All layout, spacing, positioning                         |
| `src/components/viewer/ViewerZoomSlider.tsx`  | `border-2`, all sizing                                   |
| `src/components/viewer/SceneCanvas.tsx`       | Everything (do not modify)                               |
| `src/components/viewer/Model.tsx`             | transform, scale, position                               |
| `src/app/viewer/page.tsx`                     | Canvas container div, `scale(1.3333)`, zoom compensation |
| `src/app/globals.css`                         | `zoom: 0.75`, min-height, all zoom-related rules         |

**Rule:** If a change touches ANY of the above, STOP and reconsider. Find an alternative that achieves the functional goal without modifying styling.

---

## Out of Scope (Explicitly Excluded)

Everything from the original plan's out-of-scope list, PLUS:

1. **Phase 0 sizing/scaling conversions** -- Entire phase removed
2. **Viewer component styling changes** -- Forbidden by user directive
3. **Hover/press/focus animations on viewer toolbar** -- Too risky
4. **Touch target size changes** -- Would modify viewer button dimensions
5. **Glassmorphism corrections** -- Cosmetic, deferred
6. **Animation timing normalization** -- Cosmetic, deferred
7. **Non-critical color system fixes** -- gray-_ to neutral-_ is cosmetic, deferred

---

**Plan created by:** Prometheus (Strategic Planning Consultant)
**Revision reason:** User directive to skip Phase 0, protect viewer styling, take conservative approach
**Based on:** Original figma-gap-fix.md plan + user revision requirements
**Ready for execution via:** `/oh-my-claudecode:start-work figma-gap-fix-revised`
