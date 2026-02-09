# SIMVEX Frontend - Figma Gap Implementation Plan

**Plan ID:** figma-gap-fix
**Created:** 2026-02-09
**Status:** Ready for Execution
**Scope:** 170+ issues from 19 analysis reports, prioritized into actionable phases

---

## Executive Summary

This plan addresses the gap between Figma designs and the current SIMVEX frontend implementation. Based on 19 analysis reports covering 85+ files and 170+ issues, work is organized into 5 phases with Phase 0 (sizing/scaling consistency) as a non-negotiable prerequisite.

**Key Constraints:**

- 2-person team, 10-day project window
- Daily 1-2 deployments (fast iteration)
- 1920px baseline design with 75% CSS zoom scaling at 1440px
- Phase 0 MUST complete before any other work begins

**Total Estimated Effort:** 55-70 hours across all phases
**Critical Path:** Phase 0 (3h) -> Phase 1 (10-14h) -> Phase 2 (18-24h) -> Phase 3 (12-16h) -> Phase 4 (12-16h)

---

## Context

### Original Request

Fix ALL Figma-vs-implementation gaps discovered in 19 comprehensive analysis reports. User mandate: sizing/scaling consistency is NON-NEGOTIABLE and must be done first.

### Interview Summary

- Phase 0 (sizing/scaling) is the absolute prerequisite
- Focus on "making it work well, not perfect"
- P0/P1 issues are the priority after Phase 0
- 10-day timeline with 2-person team

### Research Findings

- **19 analysis reports** consolidated into MASTER_REPORT.md
- **170+ issues** across spacing, interactions, accessibility, typography, color, glassmorphism, responsiveness, animations, missing components
- **Implementation completeness:** 64%
- **Design system compliance:** 78%
- **State management gap:** ui-store.ts and app-store.ts referenced in docs but never created -- blocks all toolbar/panel interactions
- **Scaling issue root cause:** Mix of Tailwind defaults (don't scale with CSS zoom) and arbitrary pixel values (scale correctly)

---

## Work Objectives

### Core Objective

Transform the SIMVEX frontend from a static visual mockup (64% complete) into a functional, interactive 3D viewer application with consistent sizing, working toolbar controls, centralized state management, and proper user feedback systems.

### Deliverables

1. **Phase 0:** All components use `[Xpx]` arbitrary values -- zero Tailwind default spacing in production components
2. **Phase 1:** `ui-store.ts` created, toolbar buttons wired to state, chat panel externally controllable
3. **Phase 2:** Dialog, Toast, Loading components created via shadcn/ui
4. **Phase 3:** All viewer toolbar/sidebar buttons have active states, hover/press/focus feedback
5. **Phase 4:** Color system violations fixed, glassmorphism corrected, accessibility critical fixes

### Definition of Done

- [ ] Zero Tailwind default spacing utilities (px-4, py-3, gap-6, etc.) in production component files
- [ ] `ui-store.ts` exists and manages all panel toggles + toolbar active states
- [ ] Every toolbar button has an onClick handler connected to ui-store
- [ ] Dialog, Toast, and Loading components exist and are importable
- [ ] All hardcoded colors replaced with CSS variables or design tokens
- [ ] Build passes with zero errors (`pnpm build`)
- [ ] Visual regression: 1920px viewport looks identical to current state
- [ ] 1440px viewport: all spacing scales proportionally (no overflow, no misalignment)

---

## Guardrails

### MUST Have

- All spacing/sizing uses arbitrary pixel values `[Xpx]` (Phase 0)
- `ui-store.ts` as centralized UI state (Phase 1)
- Working toolbar button handlers (Phase 2+)
- Dialog + Toast + Loading components (Phase 2)
- No breaking changes to existing 3D canvas behavior
- Each phase ends with a passing build

### MUST NOT Have

- Tailwind default spacing in production components (px-4, py-3, gap-6, h-10, text-sm, rounded-lg)
- Hardcoded colors (#fff, rgb(), gray-\* utilities)
- New npm dependencies without user approval
- Changes to the CSS zoom scaling system in globals.css
- Changes to scene-store.ts (unless adding new 3D state)
- Mobile responsive work (out of scope for this plan -- separate effort)
- Changes to .stories.tsx files in Phase 0 (stories can keep Tailwind defaults, they don't ship)

---

## Phase 0: Sizing/Scaling Consistency (MUST - DO FIRST)

**Goal:** Every production component uses arbitrary pixel values for spacing/sizing. Zero Tailwind defaults in shipped code.
**Time Estimate:** 2-3 hours
**Risk:** LOW (syntax-only changes, no logic changes)
**Commit Strategy:** Single atomic commit: `fix(ui): convert all spacing to arbitrary pixel values for zoom scaling`

### The Rule

```
WRONG: px-4 py-3 gap-6 p-6 h-10 text-sm rounded-lg
RIGHT: px-[16px] py-[12px] gap-[24px] p-[24px] h-[40px] text-[14px] rounded-[8px]
```

Why: CSS `zoom: 0.75` scales arbitrary pixel values but NOT Tailwind default spacing utilities. At 1440px viewport, `px-4` stays 16px while `px-[16px]` correctly becomes 12px.

### Task 0.1: Fix UI Base Components

**Files & Exact Changes:**

#### `src/components/ui/button.tsx`

| Line | Current                    | Fix                                     |
| ---- | -------------------------- | --------------------------------------- |
| 27   | `rounded-lg`               | `rounded-[8px]`                         |
| 27   | `text-base`                | `text-[16px]`                           |
| 38   | `h-10 w-[145px] px-4 py-0` | `h-[40px] w-[145px] px-[16px] py-[0px]` |
| 39   | `h-8 px-3 text-sm`         | `h-[32px] px-[12px] text-[14px]`        |
| 40   | `h-12 px-6`                | `h-[48px] px-[24px]`                    |
| 74   | `h-6 w-6`                  | `h-[24px] w-[24px]`                     |
| 76   | `h-6 w-6`                  | `h-[24px] w-[24px]`                     |

**Acceptance:** Button renders identically at 1920px. At 1440px, padding scales to 12px (was stuck at 16px).

#### `src/components/ui/model-card.tsx`

| Line | Current | Fix          |
| ---- | ------- | ------------ |
| 28   | `p-6`   | `p-[24px]`   |
| 69   | `gap-6` | `gap-[24px]` |

**Acceptance:** ModelCard padding and icon gap scale at 1440px.

#### `src/components/ui/card.tsx`

| Line | Current           | Fix                                           |
| ---- | ----------------- | --------------------------------------------- |
| 27   | `rounded-lg`      | `rounded-[8px]`                               |
| 27   | `shadow-sm`       | keep (shadow-sm is fine, not a spacing issue) |
| 44   | `space-y-1.5 p-6` | `space-y-[6px] p-[24px]`                      |
| 68   | `text-sm`         | `text-[14px]`                                 |
| 75   | `p-6 pt-0`        | `p-[24px] pt-[0px]`                           |
| 82   | `p-6 pt-0`        | `p-[24px] pt-[0px]`                           |

#### `src/components/ui/input.tsx`

| Line | Current     | Fix                   |
| ---- | ----------- | --------------------- |
| 28   | `h-10`      | `h-[40px]`            |
| 28   | `gap-1`     | `gap-[4px]`           |
| 28   | `px-3 py-3` | `px-[12px] py-[12px]` |
| 28   | `text-base` | `text-[16px]`         |
| 90   | `h-6 w-6`   | `h-[24px] w-[24px]`   |

#### `src/components/ui/chat-input.tsx`

| Line | Current          | Fix                            |
| ---- | ---------------- | ------------------------------ |
| 29   | `gap-2`          | `gap-[8px]`                    |
| 29   | `px-3 py-2`      | `px-[12px] py-[8px]`           |
| 101  | `gap-1`          | `gap-[4px]`                    |
| 110  | `py-1.5`         | `py-[6px]`                     |
| 124  | `mb-1` `h-8 w-8` | `mb-[4px]` `h-[32px] w-[32px]` |
| 131  | `h-5 w-5`        | `h-[20px] w-[20px]`            |
| 137  | `text-xs`        | `text-[12px]`                  |
| 148  | `text-xs`        | `text-[12px]`                  |

#### `src/components/ui/chat-bubble.tsx`

| Line | Current          | Fix                      |
| ---- | ---------------- | ------------------------ |
| 26   | `gap-3`          | `gap-[12px]`             |
| 41   | `gap-1`          | `gap-[4px]`              |
| 56   | `px-4 py-3`      | `px-[16px] py-[12px]`    |
| 56   | `text-base`      | `text-[16px]`            |
| 93   | `w-10 h-10`      | `w-[40px] h-[40px]`      |
| 113  | `text-sm` `px-2` | `text-[14px]` `px-[8px]` |

#### `src/components/ui/cta-button.tsx`

| Line               | Current | Fix         |
| ------------------ | ------- | ----------- |
| ~line with `!px-2` | `!px-2` | `!px-[8px]` |

#### `src/components/ui/help-message.tsx`

| Line | Current   | Fix           |
| ---- | --------- | ------------- |
| 26   | `text-xs` | `text-[12px]` |

#### `src/components/ui/icon-button.tsx`

| Line | Current      | Fix              |
| ---- | ------------ | ---------------- |
| 61   | `rounded-xl` | `rounded-[12px]` |

#### `src/components/ui/part-popup.tsx`

| Line | Current             | Fix                              |
| ---- | ------------------- | -------------------------------- |
| 27   | `gap-1` `px-4 py-2` | `gap-[4px]` `px-[16px] py-[8px]` |
| 27   | `border-2`          | `border-[2px]`                   |

#### `src/components/ui/user-chat-label.tsx`

| Line | Current                                     | Fix                                                  |
| ---- | ------------------------------------------- | ---------------------------------------------------- |
| 35   | `px-4 py-2`                                 | `px-[16px] py-[8px]`                                 |
| 35   | `rounded-tl-lg rounded-tr-lg rounded-bl-lg` | `rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px]` |
| 40   | `text-base`                                 | `text-[16px]`                                        |

#### `src/components/ui/label.tsx`

| Line | Current     | Fix           |
| ---- | ----------- | ------------- |
| 35   | `text-base` | `text-[16px]` |

#### `src/components/ui/link-button.tsx`

| Line | Current     | Fix           |
| ---- | ----------- | ------------- |
| 38   | `text-base` | `text-[16px]` |

#### `src/components/ui/text-field.tsx`

| Line | Current     | Fix           |
| ---- | ----------- | ------------- |
| 59   | `gap-0.5`   | `gap-[2px]`   |
| 64   | `text-base` | `text-[16px]` |

### Task 0.2: Fix Viewer Components

#### `src/components/viewer/ViewerToolbar.tsx`

| Line | Current | Fix          |
| ---- | ------- | ------------ |
| 30   | `gap-9` | `gap-[36px]` |
| 32   | `py-3`  | `py-[12px]`  |

#### `src/components/viewer/ViewerSideToolbar.tsx`

| Line | Current | Fix          |
| ---- | ------- | ------------ |
| 29   | `gap-3` | `gap-[12px]` |
| 31   | `py-3`  | `py-[12px]`  |

#### `src/components/viewer/ViewerZoomSlider.tsx`

| Line | Current    | Fix            |
| ---- | ---------- | -------------- |
| 67   | `border-2` | `border-[2px]` |

### Task 0.3: Fix Panel Components

#### `src/components/panels/PartInfoPanel.tsx`

| Line | Current       | Fix                   |
| ---- | ------------- | --------------------- |
| 35   | `p-12 gap-8`  | `p-[48px] gap-[32px]` |
| 40   | `gap-4`       | `gap-[16px]`          |
| 42   | `gap-4`       | `gap-[16px]`          |
| 56   | `px-10 py-12` | `px-[40px] py-[48px]` |
| 75   | `gap-4`       | `gap-[16px]`          |
| 77   | `gap-4`       | `gap-[16px]`          |
| 91   | `px-10 py-12` | `px-[40px] py-[48px]` |
| 101  | `gap-2`       | `gap-[8px]`           |

#### `src/components/panels/part-sidebar.tsx`

| Line | Current      | Fix                   |
| ---- | ------------ | --------------------- |
| 39   | `p-12 gap-8` | `p-[48px] gap-[32px]` |
| 44   | `gap-4`      | `gap-[16px]`          |
| 46   | `gap-4`      | `gap-[16px]`          |
| 69   | `gap-4`      | `gap-[16px]`          |
| 71   | `gap-4`      | `gap-[16px]`          |
| 87   | `gap-2`      | `gap-[8px]`           |

#### `src/components/panels/ChatInterface.tsx`

Already uses arbitrary values throughout (excellent). Only minor fixes:
| Line | Current | Fix |
|------|---------|-----|
| 175 | `p-2 -ml-2` | `p-[8px] -ml-[8px]` |
| 187 | `gap-2` | `gap-[8px]` |

#### `src/components/panels/NotesPanel.tsx`

| Line | Current        | Fix                     |
| ---- | -------------- | ----------------------- |
| 40   | `p-8`          | `p-[32px]`              |
| 42   | `text-lg mb-4` | `text-[18px] mb-[16px]` |
| 53   | `text-xs mt-2` | `text-[12px] mt-[8px]`  |

#### `src/components/panels/QuizPanel.tsx`

| Line | Current          | Fix                        |
| ---- | ---------------- | -------------------------- |
| 37   | `p-6`            | `p-[24px]`                 |
| 38   | `text-2xl mb-4`  | `text-[24px] mb-[16px]`    |
| 42   | `space-y-3 mb-6` | `space-y-[12px] mb-[24px]` |
| 49   | `p-4`            | `p-[16px]`                 |
| 49   | `border-2`       | `border-[2px]`             |
| 66   | `px-6 py-3`      | `px-[24px] py-[12px]`      |
| 72   | `p-4`            | `p-[16px]`                 |

#### `src/components/panels/ChatHistoryTab.tsx`

| Line | Current          | Fix                            |
| ---- | ---------------- | ------------------------------ |
| 43   | `p-4`            | `p-[16px]`                     |
| 44   | `text-xl mb-4`   | `text-[20px] mb-[16px]`        |
| 52   | `mb-4 px-3 py-2` | `mb-[16px] px-[12px] py-[8px]` |
| 67   | `p-3`            | `p-[12px]`                     |
| 76   | `text-xs mt-1`   | `text-[12px] mt-[4px]`         |

#### `src/components/panels/chat-sidebar.tsx`

| Line | Current          | Fix                    |
| ---- | ---------------- | ---------------------- |
| 54   | `p-6 gap-40`     | `p-[24px] gap-[160px]` |
| 71   | `gap-12`         | `gap-[48px]`           |
| 75   | `gap-2`          | `gap-[8px]`            |
| 91   | `gap-1`          | `gap-[4px]`            |
| 92   | `text-base mb-1` | `text-[16px] mb-[4px]` |

#### `src/components/panels/secondary-nav.tsx`

| Line | Current           | Fix                             |
| ---- | ----------------- | ------------------------------- |
| 41   | `h-12 gap-6 px-4` | `h-[48px] gap-[24px] px-[16px]` |
| 47   | `text-xs`         | `text-[12px]`                   |

#### `src/components/panels/ai-assistant.tsx`

| Line | Current | Fix          |
| ---- | ------- | ------------ |
| 23   | `gap-4` | `gap-[16px]` |
| 29   | `gap-4` | `gap-[16px]` |

#### `src/components/panels/footer.tsx`

| Line | Current     | Fix           |
| ---- | ----------- | ------------- |
| 72   | `text-base` | `text-[16px]` |
| 73   | `text-base` | `text-[16px]` |

#### `src/components/panels/tool-bar.tsx`

| Line | Current                                  | Fix                                                        |
| ---- | ---------------------------------------- | ---------------------------------------------------------- |
| 29   | `rounded-2xl`                            | `rounded-[16px]`                                           |
| 29   | `border-3`                               | `border-[3px]`                                             |
| 33   | `gap-12 px-40 py-4`                      | `gap-[48px] px-[160px] py-[16px]`                          |
| 34   | `gap-4 px-4 py-16`                       | `gap-[16px] px-[16px] py-[64px]`                           |
| 69   | `-top-12 rounded-md px-3 py-1.5 text-xs` | `-top-[48px] rounded-[6px] px-[12px] py-[6px] text-[12px]` |

### Task 0.4: Fix Layout & Section Components

#### `src/components/layouts/main-layout.tsx`

| Line | Current      | Fix                   |
| ---- | ------------ | --------------------- |
| 54   | `px-8 py-12` | `px-[32px] py-[48px]` |

#### `src/components/layout/landing-header.tsx`

| Line | Current | Fix         |
| ---- | ------- | ----------- |
| 16   | `px-20` | `px-[80px]` |
| 46   | `px-2`  | `px-[8px]`  |
| 48   | `px-2`  | `px-[8px]`  |
| 60   | `!px-2` | `!px-[8px]` |
| 67   | `!px-2` | `!px-[8px]` |

#### `src/components/ui/markdown-renderer.tsx`

| Line | Current           | Fix                        |
| ---- | ----------------- | -------------------------- |
| 51   | `gap-4`           | `gap-[16px]`               |
| 52   | `gap-2`           | `gap-[8px]`                |
| 122  | `px-1`            | `px-[4px]`                 |
| 137  | `border-2 p-4`    | `border-[2px] p-[16px]`    |
| 144  | `border-l-4 pl-4` | `border-l-[4px] pl-[16px]` |
| 162  | `my-4`            | `my-[16px]`                |
| 188  | `px-4 py-2`       | `px-[16px] py-[8px]`       |
| 193  | `px-4 py-2`       | `px-[16px] py-[8px]`       |

### Task 0.5: Fix Auth Pages

#### `src/app/sign-in/[[...sign-in]]/page.tsx`

| Line | Current                    | Fix                                           |
| ---- | -------------------------- | --------------------------------------------- |
| 22   | `h-8 w-8`                  | `h-[32px] w-[32px]`                           |
| 53   | `px-4`                     | `px-[16px]`                                   |
| 55   | `gap-20 px-8 py-20`        | `gap-[80px] px-[32px] py-[80px]`              |
| 71   | `gap-4`                    | `gap-[16px]`                                  |
| 77   | `gap-1`                    | `gap-[4px]`                                   |
| 81   | `gap-0.5`                  | `gap-[2px]`                                   |
| 101  | `gap-0.5`                  | `gap-[2px]`                                   |
| 134  | `gap-2 p-3 text-sm border` | `gap-[8px] p-[12px] text-[14px] border-[1px]` |
| 135  | `h-4 w-4`                  | `h-[16px] w-[16px]`                           |
| 142  | `gap-1`                    | `gap-[4px]`                                   |
| 149  | `gap-2`                    | `gap-[8px]`                                   |
| 153  | `h-5 w-5`                  | `h-[20px] w-[20px]`                           |
| 164  | `gap-2`                    | `gap-[8px]`                                   |

#### `src/app/sign-up/[[...sign-up]]/page.tsx`

Same pattern as sign-in. Convert all Tailwind defaults to arbitrary pixel values.

### Task 0.6: Verification

**After all changes:**

1. Run `pnpm build` -- must pass with zero errors
2. Open at 1920px viewport -- components must look identical to before
3. Open at 1440px viewport -- all spacing must scale proportionally
4. Specifically check:
   - Button padding (should be 12px at 1440px, not 16px)
   - ModelCard internal spacing
   - ViewerToolbar gap between icons
   - PartInfoPanel padding
   - Chat interface spacing
   - Auth page form spacing

**Commit:** `fix(ui): convert all spacing to arbitrary pixel values for consistent zoom scaling`

---

## Phase 1: State Management Architecture (BLOCKER)

**Goal:** Create `ui-store.ts` to unblock all toolbar/panel interaction work.
**Time Estimate:** 3-4 hours
**Risk:** LOW (additive, no breaking changes)
**Dependency:** Phase 0 complete
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

**Acceptance:**

- Chat panel opens/closes as before
- `useUIStore.getState().isChatOpen` reflects current state
- External components can call `useUIStore.getState().openChat()` to open chat

### Task 1.3: Wire ViewerToolbar to ui-store

**File:** `src/components/viewer/ViewerToolbar.tsx`

**Changes:**

1. Import `useUIStore`
2. Add `onClick` handlers to all 4 buttons:
   - Focus: `setViewerTool('focus')`
   - Wireframe: `toggleWireframe()`
   - Camera Lock: `toggleCameraLock()`
   - Measure: `setViewerTool('measure')`
3. Add visual active state: `cn(..., activeViewerTool === 'focus' ? "text-primary bg-primary/20" : "text-primary")`

### Task 1.4: Wire ViewerSideToolbar to ui-store

**File:** `src/components/viewer/ViewerSideToolbar.tsx`

**Changes:**

1. Import `useUIStore`
2. Add `onClick` handlers:
   - AI Assistant: `setSideTool('ai'); openChat();`
   - Search Parts: `setSideTool('search')`
   - Edit/Annotate: `setSideTool('edit')`
3. Add visual active state per button

### Task 1.5: Update viewer/page.tsx layout logic

**File:** `src/app/viewer/page.tsx`

**Changes:**

1. Import `useUIStore`
2. Use `isChatOpen` from store for chat width logic
3. Use store state for PartInfoPanel visibility:
   ```tsx
   const showPartInfo = hasPartSelected && isPartInfoVisible;
   ```

**Commit:** `feat(viewer): wire toolbars and chat panel to centralized ui-store`

---

## Phase 2: Core Missing Components (P0 Blockers)

**Goal:** Create Dialog, Toast, and Loading components that the entire app needs.
**Time Estimate:** 10-14 hours
**Risk:** MEDIUM (new components, need thorough testing)
**Dependency:** Phase 0 complete (these components must use arbitrary pixel values from day one)
**Commit Strategy:** 1 commit per component system

### Task 2.1: Dialog/Modal Component System

**New files:**

- `src/components/ui/dialog.tsx` (base component via shadcn/ui)
- Variants: Confirmation, Settings, Help

**Implementation approach:**

1. Install shadcn/ui Dialog primitive (user approval required for dependency)
2. Style with SIMVEX design tokens (glassmorphism background, primary border, 24px radius)
3. Implement focus trap and keyboard nav (ESC to close)
4. Add ARIA roles: `role="dialog"`, `aria-modal="true"`, `aria-labelledby`

**Sizing (1920px baseline):**

- Width: `w-[480px]` (confirmation), `w-[640px]` (settings)
- Padding: `p-[32px]`
- Border radius: `rounded-[24px]`
- Border: `border-[3px] border-primary`
- Background: `bg-gray-30 backdrop-blur-md`

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

**Sizing (1920px baseline):**

- Width: `w-[360px]`
- Padding: `p-[16px]`
- Border radius: `rounded-[16px]`
- Position: top-right, `top-[24px] right-[24px]`

**ARIA:**

- `role="alert"` on toast container
- `aria-live="polite"` for info, `aria-live="assertive"` for errors

**Acceptance:**

- `toast.success("Saved!")` shows green toast top-right
- Toast auto-dismisses after 5 seconds
- Close button removes toast immediately
- Multiple toasts stack vertically with `gap-[8px]`

**Commit:** `feat(ui): create toast notification system with queue`

### Task 2.3: Loading Components (Spinner + Skeleton)

**New files:**

- `src/components/ui/spinner.tsx` (animated spinner)
- `src/components/ui/skeleton.tsx` (content placeholder)

**Spinner variants:**

- `sm`: `w-[16px] h-[16px]` (inline, buttons)
- `md`: `w-[32px] h-[32px]` (sections)
- `lg`: `w-[64px] h-[64px]` (full-page)
- Color: primary by default, customizable

**Skeleton variants:**

- Text: `h-[16px] rounded-[4px]` (single line)
- Card: `w-[332.8px] h-[241px] rounded-[24px]` (model card placeholder)
- Avatar: `w-[40px] h-[40px] rounded-full`
- Uses `animate-pulse` with `bg-neutral-700`

**ARIA:**

- `aria-busy="true"` on loading containers
- `aria-label="Loading"` on spinners

**Acceptance:**

- Spinner animates smoothly
- Skeleton pulses with neutral-700 background
- Both render correctly at 1920px and 1440px

**Commit:** `feat(ui): create spinner and skeleton loading components`

---

## Phase 3: Interaction States & Toolbar Functionality (P1)

**Goal:** Make all toolbar buttons functional with proper visual feedback.
**Time Estimate:** 12-16 hours
**Risk:** MEDIUM (touches many files, needs visual QA)
**Dependency:** Phase 1 (ui-store must exist), Phase 2 (loading states for tools)
**Commit Strategy:** 1 commit per major component group

### Task 3.1: ViewerToolbar Full Interaction States

**File:** `src/components/viewer/ViewerToolbar.tsx`

Add to each button:

- **Hover:** `hover:bg-primary/20 hover:text-primary-hover`
- **Active/Selected:** `bg-primary/30 text-primary ring-[2px] ring-primary`
- **Press:** `active:scale-95 active:bg-primary/40`
- **Focus:** `focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]`
- **Disabled:** `disabled:opacity-50 disabled:cursor-not-allowed`

Add tooltip on hover (depends on Task 3.4):

- "Focus Object", "Toggle Wireframe", "Lock Camera", "Measure Distance"

**Acceptance:**

- Clicking Focus highlights the focus button
- Clicking Wireframe toggles between on/off with distinct visual
- Camera Lock shows locked state
- Only one viewer tool active at a time (except wireframe which is a toggle)

### Task 3.2: ViewerSideToolbar Full Interaction States

**File:** `src/components/viewer/ViewerSideToolbar.tsx`

Same interaction pattern as Task 3.1:

- Hover, active, press, focus, disabled states
- AI Assistant button opens chat panel when clicked
- Visual feedback shows which side tool is active

### Task 3.3: ViewerZoomSlider Functionality

**File:** `src/components/viewer/ViewerZoomSlider.tsx`

**Changes:**

- Connect slider value to scene-store `explodeLevel`
- Add zoom in/out buttons (+ and - buttons missing from implementation)
- Button sizes: `w-[30px] h-[30px]` with plus/minus SVG icons
- Hover states on buttons and thumb
- Dragging state on thumb: `scale-110` + `shadow-lg`

### Task 3.4: Tooltip Component

**New file:** `src/components/ui/tooltip.tsx`

- Positioning: top (default), bottom, left, right
- Delay: 300ms on hover before showing
- Styling: `bg-neutral-700 text-neutral-50 px-[12px] py-[6px] rounded-[8px] text-[12px]`
- Arrow indicator
- `role="tooltip"`, accessible via `aria-describedby`

### Task 3.5: ViewerHeader Interaction States

**File:** `src/components/viewer/ViewerHeader.tsx`

- Nav link underline animation on hover (slide-in from left)
- Active state with `font-semibold` + underline
- Focus states for keyboard navigation
- Logo hover: subtle scale `hover:scale-105`

**Commit:** `feat(viewer): implement toolbar interaction states and tooltip component`

---

## Phase 4: Visual Polish & Accessibility (P1)

**Goal:** Fix color system violations, glassmorphism mismatches, and critical accessibility issues.
**Time Estimate:** 12-16 hours
**Risk:** LOW-MEDIUM
**Dependency:** Phase 0 complete
**Commit Strategy:** 1 commit per category

### Task 4.1: Color System Fixes

**Scope:** 27 color issues across 8 components

**Changes:**

1. Replace hardcoded colors with CSS variables:
   - `rgba(64,64,64,0.7)` in ChatInterface -> `bg-gray-30` or CSS variable
   - `#d9d9d9` in ViewerZoomSlider -> `bg-neutral-200`
   - All `gray-*` utilities -> `neutral-*` (design system standard)

2. Add missing opacity variants to CSS:
   - `--color-white-10`, `--color-white-20` etc.

3. Fix specific files:
   - `ChatInterface.tsx`: Replace inline `backgroundColor` style with Tailwind class
   - `NotesPanel.tsx`: Replace `text-gray-300` with `text-neutral-300`
   - `QuizPanel.tsx`: Replace `bg-gray-600`, `border-gray-400`, `border-gray-600`
   - `ChatHistoryTab.tsx`: Replace `bg-gray-700`, `text-gray-400`
   - `MessageBubble.tsx`: Replace `bg-gray-800`, `bg-gray-700`

**Commit:** `fix(ui): replace hardcoded colors with design system tokens`

### Task 4.2: Glassmorphism Corrections

**Scope:** 3 components with wrong glass effects

1. **ChatInterface:** Background should be `rgba(212,212,212,0.3)` (gray-30), currently `rgba(64,64,64,0.7)`. Blur should be `backdrop-blur-md` (12px).

2. **QuizPanel:** Missing `backdrop-blur-sm` entirely. Add `backdrop-blur-sm` to container.

3. **ViewerHeader:** Tint should be `bg-white/5` for viewer context, currently may use `bg-black/5`. Verify and fix.

**Commit:** `fix(ui): correct glassmorphism backgrounds and blur values`

### Task 4.3: Critical Accessibility Fixes

**Scope:** P0 accessibility issues only (not full WCAG audit)

1. **Touch targets:** Increase all 30x30px buttons to 44x44px minimum
   - ViewerToolbar buttons: `w-[30px] h-[30px]` -> `w-[44px] h-[44px]` (keep icon at 30px, add padding)
   - ViewerSideToolbar buttons: same fix
   - Chat history delete button

2. **Focus indicators:** Add `focus-visible:ring-[2px] focus-visible:ring-primary focus-visible:ring-offset-[2px]` to:
   - All toolbar buttons
   - Chat input
   - Quiz answer buttons
   - Notes textarea

3. **Korean aria-labels -> English:**
   - Scan all components for Korean `aria-label` values
   - Replace with English equivalents

4. **Color contrast fixes:**
   - Error text: `#fb2c36` -> `#ff4d54` (4.7:1 ratio, passes AA)
   - Help message error variant: same fix

5. **Landmarks:**
   - Add `<main>` to viewer page layout
   - Add skip link: "Skip to main content"

**Commit:** `fix(a11y): fix touch targets, focus indicators, contrast, and landmarks`

### Task 4.4: Animation Timing Normalization

**Scope:** 5 components with non-standard durations

1. Fix `duration-200` -> `duration-150` or `duration-300` in:
   - `icon-button.tsx`
   - `card.tsx`
   - `chat-bubble.tsx`

2. Landing section animations: `duration-700` -> `duration-500` max

**Commit:** `fix(ui): normalize animation durations to design system standards`

---

## Dependencies & Critical Path

```
Phase 0 (Sizing)
    |
    +---> Phase 1 (State Management)
    |         |
    |         +---> Phase 3 (Interactions) -- depends on ui-store
    |
    +---> Phase 2 (Components) -- parallel with Phase 1
    |         |
    |         +---> Phase 3 (Interactions) -- uses Tooltip from Phase 2
    |
    +---> Phase 4 (Polish) -- parallel with Phase 1/2

Critical Path: Phase 0 -> Phase 1 -> Phase 3
Parallel Track: Phase 0 -> Phase 2 (can run alongside Phase 1)
Parallel Track: Phase 0 -> Phase 4 (can run alongside everything)
```

**Recommended execution order for 2-person team:**

| Day      | Person A                       | Person B                     |
| -------- | ------------------------------ | ---------------------------- |
| Day 1 AM | Phase 0 (both pair)            | Phase 0 (both pair)          |
| Day 1 PM | Phase 1 (ui-store)             | Phase 2.1 (Dialog)           |
| Day 2 AM | Phase 1 (wiring)               | Phase 2.2 (Toast)            |
| Day 2 PM | Phase 3.1-3.2 (toolbar states) | Phase 2.3 (Loading)          |
| Day 3 AM | Phase 3.3-3.4 (zoom + tooltip) | Phase 4.1 (colors)           |
| Day 3 PM | Phase 3.5 (header states)      | Phase 4.2-4.3 (glass + a11y) |
| Day 4 AM | Integration testing            | Phase 4.4 (animations)       |
| Day 4 PM | Bug fixes + QA                 | Bug fixes + QA               |

**Estimated total: 4 focused days (32-40 hours of actual work)**

---

## Time Estimates (Realistic)

| Phase                     | Optimistic | Expected | Pessimistic |
| ------------------------- | ---------- | -------- | ----------- |
| Phase 0: Sizing/Scaling   | 2h         | 3h       | 4h          |
| Phase 1: State Management | 3h         | 4h       | 6h          |
| Phase 2: Core Components  | 8h         | 12h      | 16h         |
| Phase 3: Interactions     | 10h        | 14h      | 18h         |
| Phase 4: Polish & A11y    | 8h         | 12h      | 16h         |
| **Total**                 | **31h**    | **45h**  | **60h**     |

Buffer: Add 20% for unforeseen issues = **~54 hours expected**

---

## Risk Mitigation

### Risk 1: Phase 0 causes visual regressions

**Probability:** Low
**Impact:** Medium
**Mitigation:**

- Changes are syntax-only (`px-4` -> `px-[16px]` is the SAME value at 1920px)
- Test at both 1920px and 1440px after every file
- If ANY regression: revert that file, investigate zoom behavior

### Risk 2: ui-store conflicts with existing scene-store

**Probability:** Very Low
**Impact:** Low
**Mitigation:**

- Stores are completely independent (different Zustand instances)
- ui-store only manages 2D UI state, never touches 3D scene state
- No shared state between stores

### Risk 3: shadcn/ui Dialog/Toast requires new dependencies

**Probability:** High
**Impact:** Low
**Mitigation:**

- Must get user approval before `pnpm add` any package
- If denied: implement from scratch using Radix primitives (already in project)
- Fallback: minimal custom implementation without external deps

### Risk 4: Toolbar interaction changes break 3D canvas events

**Probability:** Medium
**Impact:** High
**Mitigation:**

- Toolbar buttons use `pointer-events-auto` already (isolated from canvas)
- All click handlers are UI-only (state changes), not direct Three.js calls
- Three.js integration (wireframe mode, camera lock) is Phase 3 stretch goal

### Risk 5: Timeline pressure (10-day project)

**Probability:** Medium
**Impact:** Medium
**Mitigation:**

- Phase 0 + Phase 1 are non-negotiable (do first, fast)
- Phase 2 components can be minimal viable (basic dialog, basic toast)
- Phase 3 interactions can be incremental (start with hover/active, add animation later)
- Phase 4 can be scoped down (focus on top 3 a11y fixes only)

---

## Commit Strategy

| #   | Message                                                                   | Phase | Files Changed |
| --- | ------------------------------------------------------------------------- | ----- | ------------- |
| 1   | `fix(ui): convert all spacing to arbitrary pixel values for zoom scaling` | 0     | ~30 files     |
| 2   | `feat(stores): create ui-store for centralized UI state management`       | 1     | 1 new file    |
| 3   | `feat(viewer): wire toolbars and chat panel to centralized ui-store`      | 1     | 4 files       |
| 4   | `feat(ui): create dialog/modal component system with focus trap`          | 2     | 1-2 new files |
| 5   | `feat(ui): create toast notification system with queue`                   | 2     | 2-3 new files |
| 6   | `feat(ui): create spinner and skeleton loading components`                | 2     | 2 new files   |
| 7   | `feat(viewer): implement toolbar interaction states and tooltip`          | 3     | 5 files       |
| 8   | `fix(ui): replace hardcoded colors with design system tokens`             | 4     | 8 files       |
| 9   | `fix(ui): correct glassmorphism backgrounds and blur values`              | 4     | 3 files       |
| 10  | `fix(a11y): fix touch targets, focus indicators, contrast, landmarks`     | 4     | 10+ files     |
| 11  | `fix(ui): normalize animation durations to design system standards`       | 4     | 5 files       |

All commits on `dev` branch, PR to `main` after Phase 3 complete.

---

## Success Criteria

### Phase 0 Complete When:

- [ ] `grep -rn "px-[0-9]\|py-[0-9]\|p-[0-9]\|gap-[0-9]\|h-[0-9]\|w-[0-9]\|text-xs\|text-sm\|text-base\|text-lg\|text-xl\|text-2xl\|rounded-sm\|rounded-md\|rounded-lg\|rounded-xl\|rounded-2xl" src/components/ src/app/` returns ZERO matches in non-story files
- [ ] `pnpm build` passes
- [ ] 1920px viewport: no visual changes
- [ ] 1440px viewport: all spacing scales correctly

### Phase 1 Complete When:

- [ ] `src/stores/ui-store.ts` exists and exports `useUIStore`
- [ ] Toolbar buttons have click handlers connected to store
- [ ] Chat panel toggles via `useUIStore().toggleChat()`
- [ ] DevTools shows UIStore with correct state

### Phase 2 Complete When:

- [ ] `<Dialog>` component renders, traps focus, closes on ESC
- [ ] `toast.success("msg")` shows green toast top-right
- [ ] `<Spinner size="md" />` renders animated spinner
- [ ] `<Skeleton variant="text" />` renders pulsing placeholder

### Phase 3 Complete When:

- [ ] Every toolbar button visually indicates active/inactive state
- [ ] Hover/press/focus states on all interactive elements
- [ ] Tooltip appears on toolbar icon hover after 300ms
- [ ] Zoom slider thumb is draggable

### Phase 4 Complete When:

- [ ] Zero hardcoded colors in production components
- [ ] Glassmorphism backgrounds match Figma specs
- [ ] All touch targets >= 44x44px
- [ ] Focus indicators visible on keyboard navigation
- [ ] Error text color passes WCAG AA contrast

### Overall Success:

- [ ] All Phase 0-3 success criteria met
- [ ] At least 80% of Phase 4 criteria met
- [ ] Build passes, no console errors
- [ ] Viewer page is interactive (not just a static mockup)

---

## Out of Scope (Explicitly Excluded)

These items from the analysis reports are NOT included in this plan:

1. **Mobile responsiveness** (35% complete) -- Separate plan needed, 15-20h effort
2. **Chat API integration** (streaming, persistence) -- Backend dependency, 8-10h
3. **Part Info API integration** -- Backend dependency, 4-6h
4. **Form components** (Checkbox, Radio, Switch, Dropdown) -- P2 priority, 10-15h
5. **Advanced chat features** (file upload, message actions) -- P2 priority
6. **Storybook updates** -- Stories can keep Tailwind defaults, they don't ship to production
7. **Testing** (unit, integration, E2E) -- Separate effort, 10-15h
8. **Performance optimization** -- Not blocking MVP
9. **Context menu** (right-click on 3D model) -- P3 future enhancement
10. **Light mode / theme switching** -- Future enhancement

---

**Plan created by:** Prometheus (Strategic Planning Consultant)
**Based on:** 19 analysis reports, 4 source file deep-reads, full grep audit
**Ready for execution via:** `/oh-my-claudecode:start-work figma-gap-fix`
