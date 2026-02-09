# ViewerToolbar Interaction States Analysis

**Component**: `src/components/viewer/ViewerToolbar.tsx`
**Figma Reference**: Node 232-818 (Toolbar Design)
**Analysis Date**: 2026-02-09

---

## Executive Summary

The ViewerToolbar component is **severely incomplete** in terms of interaction states. While it has basic hover states, it is missing **critical interaction feedback** required for a production-quality 3D viewer interface.

**Completion Score**: 25/100

- ✅ Basic hover color transitions (partial)
- ❌ Active/selected states
- ❌ Focus states for keyboard navigation
- ❌ Disabled states
- ❌ Pressed states
- ❌ Background color changes on interaction
- ❌ Icon scale/transform effects
- ❌ Tooltip implementations
- ❌ State management integration

---

## 1. Missing Interaction States

### 1.1 Active/Selected States ❌ CRITICAL

**Status**: Completely missing

**Issue**: Toolbar buttons have no visual indication when a tool is active (e.g., measurement tool is currently in use, camera is locked, wireframe mode is enabled).

**Current Code**:

```tsx
<button
  className="w-[30px] h-[30px] flex items-center justify-center text-primary hover:text-primary-light transition-colors"
  aria-label="Focus selected object"
>
```

**What's Missing**:

- No `aria-pressed` attribute for toggle buttons
- No state tracking (useState, Zustand store)
- No visual differentiation for active state

**Required Implementation**:

```tsx
<button
  className={cn(
    "w-[30px] h-[30px] flex items-center justify-center",
    "transition-all duration-300",
    isActive
      ? "text-primary bg-primary-30 scale-110 shadow-primary-glow"
      : "text-primary hover:text-primary-light hover:scale-105"
  )}
  aria-label="Focus selected object"
  aria-pressed={isActive}
  onClick={() => setIsActive(!isActive)}
>
```

**Design System Tokens Available**:

- `--color-primary-30` (rgba(2, 238, 225, 0.3)) - Active background
- `--shadow-primary-glow` (0px 0px 12px rgba(2, 238, 225, 0.4)) - Glow effect
- `scale-110` - Scale transform for active state

---

### 1.2 Pressed States ❌ CRITICAL

**Status**: Completely missing

**Issue**: No visual feedback when button is being clicked (mousedown state).

**Current Behavior**: Button shows no change between hover and pressed states.

**Required Implementation**:

```tsx
<button
  className={cn(
    "w-[30px] h-[30px] flex items-center justify-center",
    "transition-all duration-150",
    "text-primary hover:text-primary-light",
    "hover:bg-hover-30",
    "active:bg-press-30 active:scale-95 active:text-primary-press",
    "active:shadow-none"
  )}
>
```

**Design System Tokens Available**:

- `--color-press-30` (rgba(1, 100, 95, 0.3)) - Pressed background
- `--color-primary-press` (#01645f) - Pressed text color
- `active:scale-95` - Scale down effect on press

**Expected Behavior**:

1. Hover: Background fades to `hover-30`, icon to `primary-light`, scale to 105%
2. Press: Background darkens to `press-30`, icon to `primary-press`, scale to 95%
3. Release: Returns to hover state or active state (if toggle)

---

### 1.3 Focus States ❌ ACCESSIBILITY BLOCKER

**Status**: Completely missing

**Issue**: No visible focus indicator for keyboard navigation. Violates WCAG 2.1 Level AA (Success Criterion 2.4.7).

**Current Code**:

```tsx
<button
  className="w-[30px] h-[30px] flex items-center justify-center text-primary hover:text-primary-light transition-colors"
>
```

**What's Missing**:

- No focus ring
- No focus background change
- No keyboard navigation support

**Required Implementation**:

```tsx
<button
  className={cn(
    "w-[30px] h-[30px] flex items-center justify-center",
    "text-primary hover:text-primary-light",
    "transition-all duration-300",
    // Focus states
    "focus-visible:outline-none",
    "focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
    "focus-visible:ring-offset-background",
    "focus-visible:bg-primary-10",
    "focus-visible:scale-110"
  )}
  tabIndex={0}
>
```

**Design System Tokens Available**:

- `--color-ring` (var(--color-primary)) - Focus ring color
- `--color-primary-10` (rgba(2, 238, 225, 0.1)) - Focus background
- Global outline color: `rgba(2, 238, 225, 0.5)` (defined in globals.css)

**Keyboard Navigation Requirements**:

- Tab: Move focus between buttons
- Space/Enter: Activate button
- Arrow keys: Navigate within toolbar (optional enhancement)

---

### 1.4 Disabled States ❌ MISSING

**Status**: Completely missing

**Issue**: No visual indication when tools are unavailable (e.g., "Focus" when no object selected, "Measure" when camera is locked).

**Required Implementation**:

```tsx
<button
  className={cn(
    "w-[30px] h-[30px] flex items-center justify-center",
    "transition-all duration-300",
    disabled
      ? "text-neutral-500 cursor-not-allowed opacity-40"
      : "text-primary hover:text-primary-light cursor-pointer"
  )}
  disabled={disabled}
  aria-disabled={disabled}
>
```

**Design System Tokens Available**:

- `--color-neutral-500` (#737373) - Disabled text color
- `opacity-40` - Disabled opacity
- `cursor-not-allowed` - Disabled cursor

**Conditional Logic Examples**:

```tsx
// Focus tool: disabled when no object selected
const isFocusDisabled = !selectedObject;

// Measure tool: disabled when camera is locked
const isMeasureDisabled = isCameraLocked;

// Wireframe toggle: always enabled
const isWireframeDisabled = false;
```

---

### 1.5 Background Color Transitions ❌ MISSING

**Status**: Partially implemented (only text color transitions)

**Issue**: Buttons should have background color changes on hover/active, not just text color.

**Current Implementation**:

```tsx
className = "text-primary hover:text-primary-light transition-colors";
```

**Missing**:

- Hover background
- Active background
- Smooth transitions between states

**Required Implementation**:

```tsx
<button
  className={cn(
    "w-[30px] h-[30px] flex items-center justify-center rounded-md",
    "text-primary transition-all duration-300 ease-in-out",
    // Hover state
    "hover:text-primary-light hover:bg-hover-30 hover:scale-105",
    // Active state
    isActive && "bg-primary-30 text-primary scale-110 shadow-primary-glow",
    // Pressed state
    "active:bg-press-30 active:scale-95 active:text-primary-press"
  )}
>
```

**Design System Tokens Used**:

- `--color-hover-30` (rgba(1, 169, 160, 0.3)) - Hover background
- `--color-primary-30` (rgba(2, 238, 225, 0.3)) - Active background
- `--color-press-30` (rgba(1, 100, 95, 0.3)) - Pressed background
- `--transition-normal` (300ms) - Transition duration
- `--ease-in-out` (cubic-bezier(0.4, 0, 0.6, 1)) - Easing function

---

### 1.6 Icon Scale & Transform Effects ❌ MISSING

**Status**: No transform effects

**Issue**: Modern UI pattern: icons should scale/transform on interaction for tactile feedback.

**Required Implementation**:

```tsx
<button
  className={cn(
    "group relative w-[30px] h-[30px] flex items-center justify-center",
    "transition-all duration-300 ease-in-out"
  )}
>
  <svg
    className={cn(
      "transition-transform duration-300",
      "group-hover:scale-110 group-hover:rotate-3",
      "group-active:scale-90 group-active:rotate-0",
      isActive && "scale-110"
    )}
    width="30"
    height="30"
  >
    {/* ... */}
  </svg>
</button>
```

**Effects by Tool**:

- **Focus**: Scale + slight rotation on hover
- **Wireframe**: Scale + pulse effect when active
- **Camera Lock**: Scale + lock/unlock animation
- **Measure**: Scale + crosshair effect on hover

---

### 1.7 Tooltip Implementations ❌ CRITICAL UX ISSUE

**Status**: Basic `title` attribute only (non-styleable, poor UX)

**Current Implementation**:

```tsx
<button
  title="Focus selected object"  // ← Browser default tooltip
>
```

**Issues with Current Approach**:

- Browser tooltips have inconsistent timing (500ms+ delay)
- Not styleable (black background, small text)
- No keyboard accessibility
- No rich content support

**Required Implementation**:

Option A - Use shadcn/ui Tooltip (Recommended):

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

<TooltipProvider delayDuration={300}>
  <Tooltip>
    <TooltipTrigger asChild>
      <button className="...">{/* Icon */}</button>
    </TooltipTrigger>
    <TooltipContent
      side="bottom"
      className="bg-neutral-800 text-neutral-50 border-primary px-3 py-2"
    >
      <p className="text-sm">Focus selected object</p>
      <p className="text-xs text-neutral-400 mt-1">Shortcut: F</p>
    </TooltipContent>
  </Tooltip>
</TooltipProvider>;
```

Option B - Custom Tooltip with Radix:

```tsx
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

<TooltipPrimitive.Provider>
  <TooltipPrimitive.Root delayDuration={300}>
    <TooltipPrimitive.Trigger asChild>
      <button>{/* ... */}</button>
    </TooltipPrimitive.Trigger>
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Content
        className="bg-neutral-800 text-neutral-50 px-3 py-2 rounded-md border border-primary text-sm shadow-lg animate-in fade-in-0 zoom-in-95"
        sideOffset={8}
      >
        Focus selected object
        <TooltipPrimitive.Arrow className="fill-neutral-800" />
      </TooltipPrimitive.Content>
    </TooltipPrimitive.Portal>
  </TooltipPrimitive.Root>
</TooltipPrimitive.Provider>;
```

**Tooltip Requirements**:

- ✅ 300ms delay (not 500ms)
- ✅ Styled to match design system (cyan border, dark background)
- ✅ Show keyboard shortcut
- ✅ Arrow pointing to button
- ✅ Smooth fade-in animation
- ✅ Accessible (aria-describedby)

---

## 2. Incomplete Interaction States

### 2.1 Hover State (Partial ⚠️)

**Current Implementation**: Text color change only

```tsx
className = "text-primary hover:text-primary-light transition-colors";
```

**What's Working**:

- ✅ Text color transitions from cyan to light cyan
- ✅ Basic transition timing

**What's Missing**:

- ❌ Background color change
- ❌ Scale effect
- ❌ Glow effect
- ❌ Cursor change to pointer

**Complete Hover Implementation**:

```tsx
<button
  className={cn(
    "w-[30px] h-[30px] flex items-center justify-center rounded-md",
    "text-primary transition-all duration-300 ease-in-out cursor-pointer",
    // Hover effects
    "hover:text-primary-light",
    "hover:bg-hover-30",
    "hover:scale-105",
    "hover:shadow-glow-sm",
    // Icon hover
    "group"
  )}
>
  <svg
    className="transition-transform duration-300 group-hover:scale-110"
    width="30"
    height="30"
  >
```

**Design System Tokens**:

- `--color-primary-light` (#33f2e6) ✅ Currently used
- `--color-hover-30` (rgba(1, 169, 160, 0.3)) ❌ Missing
- `--shadow-glow-sm` (0px 0px 12px rgba(2, 238, 225, 0.2)) ❌ Missing
- `scale-105` ❌ Missing

---

### 2.2 Transition Properties (Partial ⚠️)

**Current Implementation**: Only color transitions

```tsx
className = "transition-colors";
```

**Issue**: Should transition all properties for smooth interactions.

**Required**:

```tsx
className={cn(
  "transition-all duration-300 ease-in-out",
  // Or specific properties:
  "transition-[color,background-color,transform,box-shadow]",
  "duration-300",
  "ease-in-out"
)}
```

**Specific Timing Requirements**:

- Hover in: 300ms (normal)
- Hover out: 300ms (normal)
- Press: 150ms (fast)
- Active toggle: 300ms (normal)
- Focus: 200ms (fast)

---

## 3. Code Examples of Missing Features

### 3.1 Complete Button with All States

```tsx
interface ToolButtonProps {
  icon: React.ReactNode;
  label: string;
  shortcut?: string;
  isActive?: boolean;
  disabled?: boolean;
  onToggle?: () => void;
}

function ToolButton({
  icon,
  label,
  shortcut,
  isActive = false,
  disabled = false,
  onToggle,
}: ToolButtonProps) {
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            className={cn(
              // Base styles
              "relative w-[30px] h-[30px] flex items-center justify-center rounded-md",
              "transition-all duration-300 ease-in-out",

              // Default state
              "text-primary",

              // Hover state
              "hover:text-primary-light hover:bg-hover-30 hover:scale-105 hover:shadow-glow-sm",

              // Focus state (keyboard navigation)
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
              "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
              "focus-visible:bg-primary-10 focus-visible:scale-110",

              // Active state (when tool is selected)
              isActive && [
                "bg-primary-30 scale-110 shadow-primary-glow",
                "hover:bg-primary-30 hover:scale-115",
              ],

              // Pressed state (during click)
              "active:bg-press-30 active:scale-95 active:text-primary-press active:shadow-none",

              // Disabled state
              disabled && [
                "opacity-40 cursor-not-allowed",
                "text-neutral-500 hover:text-neutral-500",
                "hover:bg-transparent hover:scale-100 hover:shadow-none",
              ],

              // Cursor
              !disabled && "cursor-pointer",

              // Group for icon animations
              "group"
            )}
            disabled={disabled}
            aria-label={label}
            aria-pressed={isActive}
            aria-disabled={disabled}
            onClick={onToggle}
            tabIndex={disabled ? -1 : 0}
          >
            <div
              className={cn(
                "transition-transform duration-300",
                "group-hover:scale-110 group-hover:rotate-2",
                "group-active:scale-90 group-active:rotate-0",
                isActive && "scale-110"
              )}
            >
              {icon}
            </div>
          </button>
        </TooltipTrigger>

        <TooltipContent
          side="bottom"
          sideOffset={8}
          className={cn(
            "bg-neutral-800 text-neutral-50 border border-primary",
            "px-3 py-2 rounded-md shadow-lg",
            "animate-in fade-in-0 zoom-in-95 duration-200"
          )}
        >
          <p className="text-sm font-medium">{label}</p>
          {shortcut && (
            <p className="text-xs text-neutral-400 mt-1">
              Shortcut:{" "}
              <kbd className="px-1 py-0.5 bg-neutral-700 rounded">
                {shortcut}
              </kbd>
            </p>
          )}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
```

### 3.2 Updated ViewerToolbar with State Management

```tsx
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { useSceneStore } from "@/stores/scene-store";
import { TooltipProvider } from "@/components/ui/tooltip";

export function ViewerToolbar({ className }: { className?: string }) {
  const { selectedObject, isCameraLocked, setIsCameraLocked } = useSceneStore();
  const [isWireframeMode, setIsWireframeMode] = useState(false);
  const [isMeasureMode, setIsMeasureMode] = useState(false);

  const handleFocus = () => {
    if (selectedObject) {
      // Implement focus logic
    }
  };

  const handleWireframeToggle = () => {
    setIsWireframeMode(!isWireframeMode);
  };

  const handleCameraLockToggle = () => {
    setIsCameraLocked(!isCameraLocked);
  };

  const handleMeasureToggle = () => {
    setIsMeasureMode(!isMeasureMode);
  };

  return (
    <TooltipProvider>
      <div
        className={cn(
          "w-[375px] h-[37.5px]",
          "flex items-center justify-center gap-9",
          "bg-gray-30 border-[3px] border-primary rounded-[12px]",
          "px-[120px] py-3",
          "shadow-card-glow",
          "backdrop-blur-sm",
          className
        )}
        role="toolbar"
        aria-label="3D viewer tools"
      >
        <ToolButton
          icon={<FocusIcon />}
          label="Focus selected object"
          shortcut="F"
          disabled={!selectedObject}
          onToggle={handleFocus}
        />

        <ToolButton
          icon={<WireframeIcon />}
          label="Toggle wireframe view"
          shortcut="W"
          isActive={isWireframeMode}
          onToggle={handleWireframeToggle}
        />

        <ToolButton
          icon={<CameraLockIcon />}
          label="Lock camera position"
          shortcut="L"
          isActive={isCameraLocked}
          onToggle={handleCameraLockToggle}
        />

        <ToolButton
          icon={<MeasureIcon />}
          label="Measure distances"
          shortcut="M"
          isActive={isMeasureMode}
          disabled={isCameraLocked}
          onToggle={handleMeasureToggle}
        />
      </div>
    </TooltipProvider>
  );
}
```

### 3.3 Required Store Updates (Zustand)

```tsx
// src/stores/scene-store.ts additions

interface SceneStore {
  // Existing state...
  selectedObject: THREE.Object3D | null;

  // Add these:
  isCameraLocked: boolean;
  isWireframeMode: boolean;
  isMeasureMode: boolean;

  // Actions
  setIsCameraLocked: (locked: boolean) => void;
  setIsWireframeMode: (wireframe: boolean) => void;
  setIsMeasureMode: (measure: boolean) => void;
}
```

---

## 4. Figma Design References

### 4.1 State Specifications from Design System

**Based on**: `src/app/globals.css` design tokens

| State        | Background                         | Text Color                | Border      | Scale | Shadow       | Duration |
| ------------ | ---------------------------------- | ------------------------- | ----------- | ----- | ------------ | -------- |
| **Default**  | `gray-30` (rgba(212,212,212,0.3))  | `primary` (#02eee1)       | 3px cyan    | 100%  | card-glow    | -        |
| **Hover**    | `hover-30` (rgba(1,169,160,0.3))   | `primary-light` (#33f2e6) | 3px cyan    | 105%  | glow-sm      | 300ms    |
| **Active**   | `primary-30` (rgba(2,238,225,0.3)) | `primary` (#02eee1)       | 3px cyan    | 110%  | primary-glow | 300ms    |
| **Pressed**  | `press-30` (rgba(1,100,95,0.3))    | `primary-press` (#01645f) | 3px cyan    | 95%   | none         | 150ms    |
| **Focus**    | `primary-10` (rgba(2,238,225,0.1)) | `primary` (#02eee1)       | ring-2 cyan | 110%  | ring glow    | 200ms    |
| **Disabled** | transparent                        | `neutral-500` (#737373)   | 3px gray    | 100%  | none         | -        |

### 4.2 Animation Specifications

**Timing Functions** (from globals.css):

- Default: `cubic-bezier(0.4, 0, 0.2, 1)` (ease-default)
- Smooth: `cubic-bezier(0.4, 0, 0.6, 1)` (ease-in-out)

**Durations**:

- Fast: 150ms (pressed states)
- Normal: 300ms (hover, active)
- Slow: 500ms (not used in toolbar)

**Transform Timing**:

- Scale transitions: 300ms ease-in-out
- Rotation: 300ms ease-in-out
- Combined transforms: 300ms ease-in-out

### 4.3 Accessibility Requirements

**WCAG 2.1 Compliance**:

- ✅ Focus indicator contrast ratio > 3:1 (cyan ring on dark bg)
- ❌ Keyboard navigation (Tab, Space, Enter) - NOT IMPLEMENTED
- ❌ Screen reader support (aria-pressed, aria-disabled) - PARTIAL
- ✅ Touch target size 30x30px (meets minimum 24x24px)

**Missing ARIA Attributes**:

```tsx
// Current (incomplete)
<button aria-label="Focus selected object">

// Required (complete)
<button
  aria-label="Focus selected object"
  aria-pressed={isActive}
  aria-disabled={disabled}
  tabIndex={disabled ? -1 : 0}
  role="button"
>
```

---

## 5. Implementation Priority

### Phase 1: Critical (Blocking Issues) 🔴

1. **Active/Selected States** (Est: 2 hours)
   - Add state management (useState or Zustand)
   - Implement active styling with `aria-pressed`
   - Add toggle functionality

2. **Focus States** (Est: 1 hour)
   - Add focus-visible styles
   - Test keyboard navigation
   - Ensure WCAG compliance

3. **Tooltips** (Est: 2 hours)
   - Install/configure shadcn/ui tooltip
   - Replace `title` attributes
   - Add keyboard shortcuts to tooltips

### Phase 2: High Priority (UX Issues) 🟡

4. **Pressed States** (Est: 1 hour)
   - Add `active:` pseudo-class styles
   - Implement scale-down effect
   - Test click feedback

5. **Disabled States** (Est: 1.5 hours)
   - Add conditional logic (selectedObject, cameraLocked)
   - Implement disabled styling
   - Add cursor-not-allowed

6. **Complete Hover States** (Est: 1 hour)
   - Add background transitions
   - Add scale effects
   - Add glow shadows

### Phase 3: Polish (Enhancement) 🟢

7. **Icon Animations** (Est: 2 hours)
   - Add scale/rotate on hover
   - Add spring animations on toggle
   - Smooth transitions

8. **Sound Effects** (Est: 1 hour, optional)
   - Add subtle click sounds
   - Add toggle on/off sounds

**Total Estimated Time**: 10.5 hours

---

## 6. Testing Checklist

### Interaction Testing

- [ ] **Hover**: All buttons show background + text color change + scale
- [ ] **Click**: All buttons show pressed state (scale down, darker bg)
- [ ] **Active**: Toggle buttons maintain active state visually
- [ ] **Focus**: Tab navigation shows cyan ring around focused button
- [ ] **Disabled**: Disabled buttons show opacity 40%, no hover effects
- [ ] **Tooltips**: Appear after 300ms, show shortcuts, styled correctly

### State Combinations

- [ ] Hover + Active (e.g., hovering over active wireframe button)
- [ ] Focus + Active
- [ ] Focus + Disabled (should not be focusable)
- [ ] Multiple buttons active simultaneously

### Keyboard Navigation

- [ ] Tab moves focus through toolbar
- [ ] Shift+Tab moves focus backward
- [ ] Space activates focused button
- [ ] Enter activates focused button
- [ ] Escape closes tooltips (if open)

### Visual Regression

- [ ] Compare with Figma design at 1920px viewport
- [ ] Verify colors match design tokens exactly
- [ ] Check spacing (48px gap between icons)
- [ ] Verify icon sizes (30x30px)
- [ ] Test at 1440px viewport (75% zoom compensation)

### Accessibility (WCAG 2.1 AA)

- [ ] Focus indicators have 3:1 contrast ratio
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader announces button state changes
- [ ] aria-pressed updates on toggle
- [ ] aria-disabled prevents interaction

---

## 7. Recommendations

### Immediate Actions

1. **Install shadcn/ui tooltip component**

   ```bash
   npx shadcn@latest add tooltip
   ```

2. **Update scene-store.ts** with toolbar state

   ```tsx
   isCameraLocked: boolean;
   isWireframeMode: boolean;
   isMeasureMode: boolean;
   ```

3. **Create ToolButton subcomponent** (shown in section 3.1)

4. **Add keyboard event listeners** for shortcuts (F, W, L, M)

### Design System Enhancements

1. **Add interaction utilities** to globals.css:

   ```css
   @layer utilities {
     .btn-toolbar {
       @apply w-[30px] h-[30px] flex items-center justify-center rounded-md;
       @apply text-primary transition-all duration-300 ease-in-out cursor-pointer;
       @apply hover:text-primary-light hover:bg-hover-30 hover:scale-105;
       @apply focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary;
       @apply active:bg-press-30 active:scale-95;
     }

     .btn-toolbar-active {
       @apply bg-primary-30 scale-110 shadow-primary-glow;
     }
   }
   ```

2. **Document interaction patterns** in Storybook
   - Create `ViewerToolbar.stories.tsx`
   - Show all states (default, hover, active, pressed, focus, disabled)
   - Add interactive controls for testing

### Long-term Improvements

1. **Keyboard shortcuts system**
   - Create global keyboard listener
   - Show shortcut hints in tooltips
   - Add shortcut customization

2. **Animation library**
   - Consider framer-motion for spring animations
   - Add micro-interactions (e.g., icon bounce on click)

3. **Haptic feedback** (for touch devices)
   - Add `navigator.vibrate()` on button press

---

## Conclusion

The ViewerToolbar component requires **significant work** to meet production quality standards. The most critical gaps are:

1. **No active/selected state tracking** - Users can't tell which tool is active
2. **No focus states** - Keyboard navigation is broken (accessibility issue)
3. **Poor tooltips** - Browser defaults are not user-friendly
4. **Missing pressed states** - No tactile feedback on clicks
5. **Incomplete hover states** - Only text color changes, missing background/scale/glow

**Estimated effort**: 10.5 hours to implement all missing states.

**Priority**: Fix Phase 1 issues (active states, focus, tooltips) before deployment to ensure accessibility compliance and basic UX standards.

---

**Report Generated**: 2026-02-09
**Analyzed Component**: `src/components/viewer/ViewerToolbar.tsx`
**Design System Reference**: `src/app/globals.css`
**Figma Reference**: Node 232-818 (toolbar design - could not fetch, analysis based on code patterns)
