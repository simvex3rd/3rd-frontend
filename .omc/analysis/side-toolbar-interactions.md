# ViewerSideToolbar Interaction Analysis Report

**Component:** `src/components/viewer/ViewerSideToolbar.tsx`
**Analysis Date:** 2026-02-09
**Design System Reference:** SIMVEX 4-State Interactive System
**Figma Reference:** Node 160-724

---

## Executive Summary

The ViewerSideToolbar component is **critically incomplete** for interaction states. It only implements 2 out of 6 required interaction states (Default + Hover), missing 67% of expected interactions per the SIMVEX design system.

**Completion Status:** 🔴 33% (2/6 states implemented)

**Critical Gaps:**

- No active/selected state tracking
- No press state visual feedback
- No focus state for keyboard navigation
- No disabled state support
- Missing rotation-aware interaction handling

---

## SIMVEX Design System - 4-State Interactive Pattern

According to `docs/phase2-summary.md` and `docs/phase3-design-system.md`, **ALL** interactive components must implement this state progression:

| State       | Background Color                 | Text/Icon Color | Use Case             |
| ----------- | -------------------------------- | --------------- | -------------------- |
| **Default** | `rgba(212,212,212,0.3)` - Gray   | `#02eee1` Cyan  | Idle/inactive tool   |
| **Primary** | `rgba(2,238,225,0.3)` - Cyan     | `#02eee1` Cyan  | Selected/active tool |
| **Hover**   | `rgba(1,169,160,0.3)` - Teal     | `#33f2e6` Light | Mouse over           |
| **Press**   | `rgba(1,100,95,0.3)` - Dark teal | `#01a9a0` Hover | Click/touch down     |

**Additional Required States:**

- **Focus:** Visible outline for keyboard navigation (cyan ring)
- **Disabled:** Reduced opacity + no interaction

---

## Current Implementation Status

### ✅ Implemented States (2/6)

#### 1. Default State

```tsx
className =
  "w-[30px] h-[30px] flex items-center justify-center -rotate-90 text-primary";
```

- Background: Inherited from container `bg-gray-30` ✅
- Icon color: `text-primary` (#02eee1) ✅
- Container: 225×37.5px, border-[3px] border-primary, rounded-[12px] ✅

#### 2. Hover State

```tsx
hover:text-primary-light transition-colors
```

- Icon color change: `#02eee1` → `#33f2e6` (primary-light) ✅
- Transition: `transition-colors` (uses CSS variable, ~300ms) ✅

---

## ❌ Missing Interactions (4/6)

### 1. Active/Selected State (CRITICAL)

**Severity:** 🔴 High
**Impact:** Users cannot see which tool is currently selected

**Expected Behavior:**

```tsx
// Tool should track active state
const [activeTool, setActiveTool] = useState<'ai' | 'search' | 'edit' | null>(null);

// Button should reflect active state
className={cn(
  "w-[30px] h-[30px] flex items-center justify-center -rotate-90",
  "text-primary transition-colors",
  activeTool === 'ai' ? "bg-primary-30" : "", // Selected tool gets cyan background
  "hover:text-primary-light"
)}
```

**Missing Elements:**

- No state management for selected tool
- No visual distinction for active tool
- Container background doesn't change to `rgba(2,238,225,0.3)`

**Design System Reference:**

- `docs/phase2-summary.md` line 50: "Primary | rgba(2,238,225,0.3) - Cyan | Selected/active"
- Similar pattern in ViewerHeader navigation (lines 58-60)

---

### 2. Press State (CRITICAL)

**Severity:** 🔴 High
**Impact:** No tactile feedback during click/touch interaction

**Expected Behavior:**

```tsx
// Add active (press) state
className={cn(
  "w-[30px] h-[30px] flex items-center justify-center -rotate-90",
  "text-primary transition-all duration-150",
  "hover:text-primary-light hover:bg-hover-30",
  "active:bg-press-30 active:text-primary-hover", // Press state
)}
```

**Missing Elements:**

- No `active:` pseudo-class styles
- Background doesn't darken to `rgba(1,100,95,0.3)` on press
- Icon doesn't change to `#01a9a0` (primary-hover) on press

**Design System Reference:**

- `docs/phase3-design-system.md` line 52: "Press | rgba(1,100,95,0.3) - Dark teal | Click/touch"
- CSS variable available: `--color-press-30` (globals.css line 78)

---

### 3. Focus State (ACCESSIBILITY - CRITICAL)

**Severity:** 🔴 High (WCAG 2.1 AA Requirement)
**Impact:** Keyboard users cannot see which button has focus

**Expected Behavior:**

```tsx
className={cn(
  "w-[30px] h-[30px] flex items-center justify-center -rotate-90",
  "text-primary transition-colors",
  "hover:text-primary-light",
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary",
  "focus-visible:outline-offset-2"
)}
```

**Missing Elements:**

- No `focus-visible:` styles
- No visible outline for keyboard navigation
- No focus ring (cyan, 2px width)

**Accessibility Audit:**

- **WCAG 2.4.7 (Focus Visible):** ❌ FAIL
- Keyboard users cannot tab through toolbar buttons
- Screen reader accessible (aria-label present ✅) but visual focus missing

**Design System Reference:**

- `docs/phase3-design-system.md` line 973: "Priority 1 (Critical): Add focus-visible indicators to all interactive elements"
- `globals.css` line 186: `outline-color: rgba(2, 238, 225, 0.5);` (global fallback exists)

---

### 4. Disabled State

**Severity:** 🟡 Medium
**Impact:** Cannot indicate unavailable tools (e.g., edit requires part selection)

**Expected Behavior:**

```tsx
interface ButtonProps {
  disabled?: boolean;
  onClick?: () => void;
}

className={cn(
  "w-[30px] h-[30px] flex items-center justify-center -rotate-90",
  "text-primary transition-colors",
  disabled
    ? "opacity-40 cursor-not-allowed"
    : "hover:text-primary-light cursor-pointer"
)}
disabled={disabled}
aria-disabled={disabled}
```

**Missing Elements:**

- No `disabled` prop
- No visual indication for disabled state
- No cursor change
- Context: "Edit annotations" requires a selected part

**Design System Reference:**

- `docs/phase3-design-system.md` line 48: "Neutral-100 | #f5f5f5 | Disabled backgrounds"

---

### 5. Rotation-Aware Interaction Handling

**Severity:** 🟡 Medium
**Impact:** Icon rotation may interfere with CSS transform transitions

**Current Implementation:**

```tsx
// Container rotated 90° (becomes vertical toolbar)
className="w-[225px] h-[37.5px] ... rotate-90"

// Icons counter-rotated -90° to appear upright
<button className="-rotate-90">
  <svg>...</svg>
</button>
```

**Potential Issues:**

1. Hover area might not align with visual button area due to rotation
2. Transition animations may behave unexpectedly with nested rotations
3. Touch target size unclear after rotation (30px × 30px → still 30px?)

**Recommended Fix:**

```tsx
// Use transform-gpu for smoother rotation
className="w-[30px] h-[30px] flex items-center justify-center",
style={{ transform: 'rotate(-90deg)' }}

// Or apply rotation at parent level with explicit positioning
```

**Testing Needed:**

- Verify hover detection area matches visual button
- Check touch target size meets 44×44px WCAG AAA guideline
- Test on touch devices (iOS Safari, Android Chrome)

---

### 6. Icon Transition Animations

**Severity:** 🟢 Low (Enhancement)
**Impact:** Smooth micro-interactions improve perceived quality

**Current Implementation:**

```tsx
transition - colors; // Only color transitions
```

**Enhancement Opportunities:**

```tsx
// Add scale on hover for tactile feedback
className={cn(
  "w-[30px] h-[30px] flex items-center justify-center -rotate-90",
  "text-primary transition-all duration-150",
  "hover:text-primary-light hover:scale-110",
  "active:scale-95" // Press down effect
)}
```

**Design System Timing:**

- Fast: 150ms (hover feedback, icon changes) - `--transition-fast`
- Normal: 300ms (default transitions) - `--transition-normal`
- Currently uses `transition-colors` (no explicit duration, defaults to 300ms)

**Reference:**

- `docs/phase3-design-system.md` lines 499-501: Duration scale
- Similar pattern in ViewerToolbar.tsx (line 42)

---

## Comparison: ViewerToolbar vs ViewerSideToolbar

Both toolbars share identical interaction gaps:

| Feature         | ViewerToolbar (Top) | ViewerSideToolbar (Right) | Note                              |
| --------------- | ------------------- | ------------------------- | --------------------------------- |
| Default state   | ✅                  | ✅                        | Both implemented                  |
| Hover state     | ✅                  | ✅                        | Both use hover:text-primary-light |
| Active/Selected | ❌                  | ❌                        | Neither tracks selection          |
| Press state     | ❌                  | ❌                        | Neither has active: styles        |
| Focus state     | ❌                  | ❌                        | Neither WCAG compliant            |
| Disabled state  | ❌                  | ❌                        | Neither supports disabled         |

**Conclusion:** Both toolbar components need the same interaction upgrades. Fix can be applied to both simultaneously.

---

## Container Background Issue

**Current Container:**

```tsx
className = "... bg-gray-30 border-[3px] border-primary ...";
```

**Problem:** Container has static `bg-gray-30` background. Buttons don't have individual backgrounds, so active/hover/press states cannot show background color changes per button.

**Expected Behavior:**
Individual buttons should have their own background layers that change based on state:

```tsx
// Button-level backgrounds
<button
  className={cn(
    "w-[30px] h-[30px] flex items-center justify-center -rotate-90",
    "rounded-lg transition-all duration-150", // Add border radius for button area
    "text-primary",
    // State backgrounds
    isActive && "bg-primary-30",
    "hover:bg-hover-30 hover:text-primary-light",
    "active:bg-press-30 active:text-primary-hover"
  )}
>
```

**Design System Pattern:**

- ViewerHeader navigation links have individual hover states (line 60)
- BodyBtn component has full 4-state background system (docs/phase2-domain.md)

---

## Accessibility Audit (WCAG 2.1)

### ❌ Failures

1. **2.4.7 Focus Visible (AA)** - No visible focus indicator
   - Severity: High
   - Fix: Add focus-visible outline

2. **2.5.5 Target Size (AAA)** - Buttons are 30×30px (< 44×44px)
   - Severity: Medium (AAA guideline, not AA requirement)
   - Current: 30px × 30px after rotation
   - Fix: Increase to 33×33px minimum (33 × 1.3333 zoom = 44px at 75% body zoom)

3. **1.4.13 Content on Hover or Focus (AA)** - No timeout or dismiss mechanism
   - Severity: Low
   - Not applicable unless tooltips are added

### ✅ Passes

1. **4.1.2 Name, Role, Value (A)** - aria-label present on all buttons ✅
2. **1.4.3 Contrast (Minimum) (AA)** - Primary cyan on dark background = 8.1:1 ✅
3. **2.1.1 Keyboard (A)** - Buttons are keyboard accessible (but not visually) ⚠️

---

## Implementation Priority

### P0 - Critical (Ship Blockers)

1. **Focus states** - WCAG AA requirement, must fix before production
2. **Active/Selected state** - Core UX, users need to know which tool is active
3. **Press state** - Standard UI feedback expectation

### P1 - Important (Should Fix)

4. **Disabled state** - Contextual tool availability (edit requires selection)
5. **Button background layers** - Enable per-button state visualization

### P2 - Enhancement (Nice to Have)

6. **Rotation-aware handling** - Verify touch targets work correctly
7. **Icon transition animations** - Scale/transform micro-interactions

---

## Recommended Implementation

### Step 1: Add State Management

```tsx
interface ViewerSideToolbarProps {
  className?: string;
  activeTool?: "ai" | "search" | "edit" | null;
  onToolChange?: (tool: "ai" | "search" | "edit") => void;
  disabledTools?: ("ai" | "search" | "edit")[];
}

export function ViewerSideToolbar({
  className,
  activeTool = null,
  onToolChange,
  disabledTools = [],
}: ViewerSideToolbarProps) {
  const handleToolClick = (tool: "ai" | "search" | "edit") => {
    if (!disabledTools.includes(tool)) {
      onToolChange?.(tool);
    }
  };

  // ... rest of component
}
```

### Step 2: Update Button Styling

```tsx
<button
  onClick={() => handleToolClick("ai")}
  disabled={disabledTools.includes("ai")}
  className={cn(
    "w-[33px] h-[33px] flex items-center justify-center -rotate-90",
    "rounded-lg transition-all duration-150",
    "text-primary",
    // State backgrounds
    activeTool === "ai" && "bg-primary-30",
    !disabledTools.includes("ai") && [
      "hover:bg-hover-30 hover:text-primary-light hover:scale-110",
      "active:bg-press-30 active:text-primary-hover active:scale-95",
      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary focus-visible:outline-offset-2",
    ],
    disabledTools.includes("ai") && "opacity-40 cursor-not-allowed"
  )}
  aria-label="Open AI Assistant"
  aria-pressed={activeTool === "ai"}
  aria-disabled={disabledTools.includes("ai")}
  title="AI Assistant"
>
  {/* SVG icon */}
</button>
```

### Step 3: Add CSS Variables (if not present)

```css
/* globals.css - already exists ✅ */
--color-primary-30: rgba(2, 238, 225, 0.3);
--color-hover-30: rgba(1, 169, 160, 0.3);
--color-press-30: rgba(1, 100, 95, 0.3);
```

### Step 4: Update Tailwind Config (if needed)

```typescript
// tailwind.config.ts - already configured ✅
colors: {
  'primary-30': 'var(--color-primary-30)',
  'hover-30': 'var(--color-hover-30)',
  'press-30': 'var(--color-press-30)',
}
```

---

## Testing Checklist

### Visual Testing

- [ ] Default state: Gray background, cyan icons
- [ ] Hover state: Teal background, light cyan icons, subtle scale
- [ ] Active state: Cyan background, cyan icons
- [ ] Press state: Dark teal background, hover cyan icons, scale down
- [ ] Focus state: Cyan outline visible on keyboard tab
- [ ] Disabled state: 40% opacity, no-drop cursor

### Interaction Testing

- [ ] Click selects tool (activeTool updates)
- [ ] Click again deselects tool (activeTool = null)
- [ ] Hover on disabled tool shows no-drop cursor
- [ ] Click on disabled tool does nothing
- [ ] Keyboard Tab cycles through buttons
- [ ] Keyboard Enter/Space activates focused button
- [ ] Focus outline visible and clear

### Rotation Testing

- [ ] Hover area matches visual button area
- [ ] Touch targets work on iOS Safari
- [ ] Touch targets work on Android Chrome
- [ ] Icons appear upright after rotation
- [ ] Transitions work smoothly with nested rotations

### Accessibility Testing

- [ ] Screen reader announces button labels
- [ ] Screen reader announces pressed state
- [ ] Screen reader announces disabled state
- [ ] Keyboard-only navigation works completely
- [ ] Focus order is logical (top to bottom)
- [ ] WCAG 2.4.7 Focus Visible passes axe audit

---

## Design System Compliance Summary

| Requirement                      | Status | Compliance       |
| -------------------------------- | ------ | ---------------- |
| 4-state interactive pattern      | 🔴     | 33% (2/4)        |
| Focus visible (WCAG 2.4.7)       | 🔴     | FAIL             |
| Color contrast (WCAG 1.4.3)      | 🟢     | PASS             |
| Touch target size (WCAG 2.5.5)   | 🟡     | 30px (AAA: 44px) |
| Keyboard accessible (WCAG 2.1.1) | 🟡     | Partial          |
| ARIA labels (WCAG 4.1.2)         | 🟢     | PASS             |

**Overall Grade:** 🔴 D- (40/100)
**Ship Ready:** ❌ No (critical accessibility issues)

---

## Similar Components Needing Same Fixes

1. **ViewerToolbar.tsx** - Top horizontal toolbar (identical issues)
2. **ViewerZoomSlider.tsx** - Thumb needs focus state
3. **ViewerHeader.tsx** - Navigation links (has hover, missing press/focus)

**Recommended:** Create shared `ToolbarButton` component to DRY up the implementation.

---

## References

**Documentation:**

- `docs/phase2-summary.md` - 4-state interactive system (lines 43-52)
- `docs/phase3-design-system.md` - Complete design tokens
- `docs/phase3-design-system.md` - Accessibility audit (lines 963-988)
- `src/app/globals.css` - CSS variables (lines 69-78)

**Related Components:**

- `src/components/viewer/ViewerToolbar.tsx` - Top toolbar (same pattern)
- `src/components/viewer/ViewerHeader.tsx` - Navigation with hover states

**Figma:**

- Node 160-724: Side Toolbar design
- Node 156-922: Top Toolbar design (reference)

---

## Next Actions

1. **Implement focus states** (P0) - 30 minutes
2. **Add state management** (P0) - 1 hour
3. **Implement press states** (P0) - 30 minutes
4. **Add disabled state support** (P1) - 45 minutes
5. **Test rotation interaction** (P1) - 1 hour
6. **Create shared ToolbarButton component** (P2) - 2 hours
7. **Update ViewerToolbar.tsx** (P2) - 30 minutes (reuse ToolbarButton)

**Total Estimated Time:** 6.25 hours

---

**Report Status:** ✅ Complete
**Analyst:** Claude Sonnet 4.5
**Component Status:** 🔴 Needs Critical Updates
