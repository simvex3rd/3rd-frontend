# ViewerZoomSlider Interaction Analysis

**Component:** `src/components/viewer/ViewerZoomSlider.tsx`
**Analysis Date:** 2026-02-09
**Status:** Missing critical interaction states

---

## Executive Summary

The ViewerZoomSlider component implements basic functionality but **lacks all interactive hover, focus, and transition states** found in modern UI patterns and likely specified in Figma designs. The component currently uses an invisible native input with a custom visual thumb, but provides no visual feedback for user interactions.

**Critical Issues:** 5 major categories of missing interactions
**Severity:** High - Poor user experience and accessibility

---

## 1. Slider Thumb Interactions ⚠️ CRITICAL

### Current State

```tsx
<div
  className="absolute top-[12.5px] h-[32px] w-[120px] bg-primary-30 border-2 border-primary rounded-full pointer-events-none transition-all duration-150 shadow-slider-thumb"
  style={{ left: `${explodeLevel * (sliderWidth - 120)}px` }}
/>
```

### Missing Interactions

#### ❌ Hover State

**Expected Behavior:**

- Background: `bg-primary-30` → `bg-hover-30` (rgba(1, 169, 160, 0.3))
- Border: `border-primary` → `border-primary-hover`
- Shadow: Enhanced glow effect
- Cursor: Change to `cursor-grab`

**Design Token Available:** `--color-hover-30: rgba(1, 169, 160, 0.3)`

**Implementation Gap:**

```tsx
// ❌ Current: pointer-events-none (no interaction)
// ✅ Should be: Interactive with hover effects

className =
  "hover:bg-hover-30 hover:border-primary-hover hover:shadow-glow-sm cursor-grab active:cursor-grabbing";
```

#### ❌ Active/Dragging State

**Expected Behavior:**

- Background: `bg-press-30` (rgba(1, 100, 95, 0.3))
- Border: `border-primary-press`
- Cursor: `cursor-grabbing`
- Scale: Slight scale up (1.05) for tactile feedback

**Design Token Available:** `--color-press-30: rgba(1, 100, 95, 0.3)`

**Implementation Gap:**

```tsx
// Missing active state classes
className = "active:bg-press-30 active:border-primary-press active:scale-105";
```

#### ❌ Focus State (Accessibility)

**Expected Behavior:**

- Outline: 2px cyan ring with offset
- Shadow: Primary glow for visibility
- Keyboard navigation: Clear visual indicator

**Implementation Gap:**

```tsx
// Input has no visual focus indicator (it's invisible)
// Custom thumb doesn't sync with input focus state
```

---

## 2. Slider Track Interactions ⚠️ HIGH PRIORITY

### Current State

```tsx
<div className="h-[16px] bg-[#d9d9d9] rounded-full relative w-full shadow-track-inset" />
```

### Missing Interactions

#### ❌ Hover State

**Expected Behavior:**

- Background lightens slightly
- Cursor changes to pointer to indicate clickability
- Subtle glow effect

**Implementation Gap:**

```tsx
// ❌ Current: Static track, no hover feedback
// ✅ Should be:
className =
  "hover:bg-neutral-300 cursor-pointer transition-colors duration-150";
```

#### ❌ Progress Indicator

**Common Pattern:** Show filled portion of track

- Left side (0 → current value): Primary color
- Right side (current value → max): Neutral gray

**Implementation Gap:**

```tsx
// Missing filled track visualization
// Most sliders show progress with a colored fill
```

#### ❌ Click-to-Jump Functionality

**Expected Behavior:**

- Clicking track should move thumb to that position
- Smooth animation to new value

**Implementation Gap:**

```tsx
// Native input underneath does this, but no visual feedback
// No transition animation configured
```

---

## 3. Compact Mode Transition ⚠️ MEDIUM PRIORITY

### Current State

```tsx
const sliderWidth = compact ? 720 : 900; // Width changes instantly

<div
  className={cn("h-[57px] overflow-hidden relative", className)}
  style={{ width: `${sliderWidth}px` }}
>
```

### Missing Interactions

#### ❌ Smooth Width Transition

**Expected Behavior:**

- Animated transition: 1200px → 960px (or 900px → 720px scaled)
- Duration: 300ms (--transition-normal)
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

**Design Token Available:** `--transition-normal: 300ms`

**Implementation Gap:**

```tsx
// ❌ Current: Instant width change (no transition class)
// ✅ Should be:
className = "transition-[width] duration-300 ease-default";
```

#### ❌ Thumb Position Recalculation

**Expected Behavior:**

- Thumb repositions smoothly as container width changes
- Maintains proportional position (explodeLevel ratio)

**Current:** Width changes, thumb jumps instantly

**Implementation Gap:**

```tsx
// Missing transition on thumb left position during resize
// Should sync with container width transition
```

---

## 4. Plus/Minus Buttons ⚠️ CRITICAL

### Current State

**Buttons are completely missing from implementation**

### Expected Components (Based on Figma Design)

#### ❌ Plus Button (Right Side)

**Expected Behavior:**

- Position: Right edge of slider
- Icon: Plus symbol (24px)
- Function: Increment explodeLevel by 0.1
- States: Default, Hover, Press, Disabled (at max value)

**Implementation Gap:**

```tsx
// Component completely missing
// Should be:
<button
  onClick={() => setExplodeLevel(Math.min(1, explodeLevel + 0.1))}
  disabled={explodeLevel >= 1}
  className="text-primary hover:text-primary-hover active:text-primary-press disabled:text-neutral-300"
  aria-label="Increase explode level"
>
  <PlusIcon />
</button>
```

#### ❌ Minus Button (Left Side)

**Expected Behavior:**

- Position: Left edge of slider
- Icon: Minus symbol (24px)
- Function: Decrement explodeLevel by 0.1
- States: Default, Hover, Press, Disabled (at min value)

**Implementation Gap:**

```tsx
// Component completely missing
// Should follow same pattern as Plus button
```

---

## 5. Value Display Feedback ⚠️ MEDIUM PRIORITY

### Current State

**No visual feedback for current value**

### Missing Features

#### ❌ Tooltip on Hover/Drag

**Expected Behavior:**

- Shows current explode level percentage
- Appears above thumb on hover
- Updates in real-time during drag
- Example: "45%" or "Explode: 0.45"

**Implementation Gap:**

```tsx
// No tooltip component
// No value display mechanism
```

#### ❌ Value Label

**Alternative/Additional Pattern:**

- Permanent label showing current value
- Position: Inside or near thumb
- Updates live during interaction

**Implementation Gap:**

```tsx
// No text display of current value
// User has no numeric feedback
```

#### ❌ Snap Points or Markers

**Enhanced UX:**

- Visual markers at key positions (0%, 25%, 50%, 75%, 100%)
- Optional: Snap to these points when close
- Helps users achieve precise values

**Implementation Gap:**

```tsx
// No visual markers on track
// No snap-to-grid functionality
```

---

## 6. Animation Smoothness ⚠️ LOW PRIORITY

### Current State

```tsx
transition-all duration-150
```

### Issues

#### ⚠️ Wrong Transition Property

**Problem:** `transition-all` can cause performance issues

- Transitions ALL properties (including layout-affecting ones)
- Can trigger unnecessary repaints

**Fix:**

```tsx
// ❌ Current
className = "transition-all duration-150";

// ✅ Better
className =
  "transition-[left,background-color,border-color,box-shadow] duration-150";
```

#### ⚠️ Missing Easing Function

**Current:** Default linear easing (jarring)

**Fix:**

```tsx
// Add easing
className = "ease-default"; // cubic-bezier(0.4, 0, 0.2, 1)
```

---

## 7. Accessibility Issues ⚠️ CRITICAL

### Current State

```tsx
<input
  type="range"
  className="absolute left-0 top-[12.5px] h-[32px] opacity-0 cursor-pointer z-20"
  aria-label="분해도"
/>
```

### Missing Features

#### ❌ Focus Visible Indicator

**Problem:** Input is invisible, custom thumb doesn't show focus state

**Fix:**

```tsx
// Sync focus state between input and custom thumb
const [isFocused, setIsFocused] = useState(false);

<input
  onFocus={() => setIsFocused(true)}
  onBlur={() => setIsFocused(false)}
  className="focus:outline-none" // Prevent default outline
/>

<div
  className={cn(
    "custom-thumb",
    isFocused && "ring-2 ring-primary ring-offset-2 shadow-primary-glow"
  )}
/>
```

#### ❌ Keyboard Navigation Feedback

**Problem:** Arrow keys work (native input) but no visual feedback

**Expected:**

- Visual pulse or highlight when value changes via keyboard
- Announced to screen readers

#### ❌ ARIA Live Region

**Missing:** Screen reader announcements for value changes

**Fix:**

```tsx
<div aria-live="polite" aria-atomic="true" className="sr-only">
  Explode level: {Math.round(explodeLevel * 100)}%
</div>
```

---

## Comparison: Design System Patterns

### Other Components in Codebase

#### Button Component (`src/components/ui/button.tsx`)

**Implemented States:**

- ✅ Hover: `hover:bg-primary-hover`
- ✅ Active: `active:bg-primary-press`
- ✅ Focus: `focus-visible:ring-2`
- ✅ Disabled: `disabled:bg-neutral-100`
- ✅ Transitions: `transition-colors duration-150`

#### ViewerToolbar Component

**Implemented States:**

- ✅ Hover: `hover:text-primary-light`
- ✅ Transitions: `transition-colors`
- ⚠️ Missing: Active states, focus indicators

#### ViewerSideToolbar Component

**Implemented States:**

- ✅ Hover: `hover:text-primary-light`
- ✅ Transitions: `transition-colors`
- ⚠️ Missing: Active states, focus indicators

### Conclusion

**ViewerZoomSlider is significantly behind other components in interaction polish.**

---

## Design Tokens Available (from globals.css)

### Colors for States

```css
--color-primary: #02eee1; /* Default */
--color-primary-hover: #01a9a0; /* Hover */
--color-primary-press: #01645f; /* Active/Press */
--color-primary-30: rgba(2, 238, 225, 0.3); /* Default bg */
--color-hover-30: rgba(1, 169, 160, 0.3); /* Hover bg */
--color-press-30: rgba(1, 100, 95, 0.3); /* Press bg */
```

### Shadows for Interaction

```css
--shadow-primary-glow: 0px 0px 12px rgba(2, 238, 225, 0.4);
--shadow-glow-sm: 0px 0px 12px rgba(2, 238, 225, 0.2);
--shadow-slider-thumb: 4px 4px 10px 2px rgba(0, 0, 0, 0.25);
```

### Transitions

```css
--transition-fast: 150ms;
--transition-normal: 300ms;
--ease-default: cubic-bezier(0.4, 0, 0.2, 1);
```

**All necessary tokens exist. Implementation is purely missing.**

---

## Priority Recommendations

### 🔴 Critical (Implement First)

1. **Thumb hover/active states** - Core interaction feedback
2. **Plus/Minus buttons** - Likely in Figma design
3. **Focus states** - Accessibility requirement
4. **Button hover states** - Expected UX pattern

### 🟡 High Priority (Implement Next)

5. **Track hover feedback** - Improves discoverability
6. **Compact mode transition** - Visual polish
7. **Value tooltip** - User feedback

### 🟢 Medium Priority (Nice to Have)

8. **Progress fill on track** - Common pattern
9. **ARIA live announcements** - Enhanced accessibility
10. **Snap points/markers** - Advanced UX

### ⚪ Low Priority (Polish)

11. **Optimized transitions** - Performance
12. **Thumb scale animation** - Micro-interaction

---

## Implementation Checklist

### Immediate Actions

- [ ] Add hover state to thumb (`hover:bg-hover-30`, `hover:border-primary-hover`)
- [ ] Add active state to thumb (`active:bg-press-30`, `active:border-primary-press`)
- [ ] Implement focus state sync between input and custom thumb
- [ ] Add plus/minus buttons with full state variants
- [ ] Add track hover effect
- [ ] Implement compact mode width transition

### Accessibility

- [ ] Add visible focus indicator on custom thumb
- [ ] Implement ARIA live region for value changes
- [ ] Test keyboard navigation with visual feedback
- [ ] Verify screen reader announcements

### Enhancement

- [ ] Add value tooltip on hover/drag
- [ ] Implement progress fill on track
- [ ] Add smooth transitions to all state changes
- [ ] Add snap points or value markers (optional)

---

## Code Example: Complete Interaction Implementation

```tsx
"use client";

import { cn } from "@/lib/utils";
import { useSceneStore } from "@/stores/scene-store";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

export function ViewerZoomSlider({ className, compact = false }) {
  const explodeLevel = useSceneStore((state) => state.explodeLevel);
  const setExplodeLevel = useSceneStore((state) => state.setExplodeLevel);
  const sliderWidth = compact ? 720 : 900;

  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleIncrement = () => {
    setExplodeLevel(Math.min(1, explodeLevel + 0.1));
  };

  const handleDecrement = () => {
    setExplodeLevel(Math.max(0, explodeLevel - 0.1));
  };

  return (
    <div
      className={cn(
        "h-[57px] overflow-hidden relative transition-[width] duration-300 ease-default",
        className
      )}
      style={{ width: `${sliderWidth}px` }}
      role="group"
      aria-label="Explode control"
    >
      {/* Minus Button */}
      <button
        onClick={handleDecrement}
        disabled={explodeLevel <= 0}
        className="absolute left-[10px] top-[12.5px] w-[32px] h-[32px] flex items-center justify-center text-primary hover:text-primary-hover active:text-primary-press disabled:text-neutral-300 transition-colors duration-150 z-30"
        aria-label="Decrease explode level"
      >
        <Minus size={20} />
      </button>

      {/* Track Container */}
      <div className="absolute left-[50px] top-[10.5px] right-[50px] flex flex-col items-start p-[10px]">
        {/* Track */}
        <div className="h-[16px] bg-[#d9d9d9] rounded-full relative w-full shadow-track-inset hover:bg-neutral-300 cursor-pointer transition-colors duration-150">
          {/* Progress Fill */}
          <div
            className="absolute left-0 top-0 h-full bg-primary-30 rounded-full transition-[width] duration-150"
            style={{ width: `${explodeLevel * 100}%` }}
          />
        </div>
      </div>

      {/* Invisible Native Input */}
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={explodeLevel}
        onChange={(e) => setExplodeLevel(Number(e.target.value))}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        className="absolute left-[50px] top-[12.5px] right-[50px] h-[32px] opacity-0 z-20"
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
        aria-label="Explode level"
        aria-valuemin={0}
        aria-valuemax={1}
        aria-valuenow={explodeLevel}
      />

      {/* Custom Thumb */}
      <div
        className={cn(
          "absolute top-[12.5px] h-[32px] w-[120px] rounded-full border-2 pointer-events-none transition-[left,background-color,border-color,box-shadow,transform] duration-150 ease-default",
          // State-based styling
          isDragging && "bg-press-30 border-primary-press scale-105",
          !isDragging &&
            isHovered &&
            "bg-hover-30 border-primary-hover shadow-glow-sm",
          !isDragging &&
            !isHovered &&
            "bg-primary-30 border-primary shadow-slider-thumb",
          isFocused && "ring-2 ring-primary ring-offset-2 shadow-primary-glow"
        )}
        style={{
          left: `${50 + explodeLevel * (sliderWidth - 100 - 120)}px`,
        }}
      >
        {/* Value Label (Optional) */}
        {(isHovered || isDragging) && (
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-800 text-primary text-xs rounded whitespace-nowrap">
            {Math.round(explodeLevel * 100)}%
          </div>
        )}
      </div>

      {/* Plus Button */}
      <button
        onClick={handleIncrement}
        disabled={explodeLevel >= 1}
        className="absolute right-[10px] top-[12.5px] w-[32px] h-[32px] flex items-center justify-center text-primary hover:text-primary-hover active:text-primary-press disabled:text-neutral-300 transition-colors duration-150 z-30"
        aria-label="Increase explode level"
      >
        <Plus size={20} />
      </button>

      {/* ARIA Live Region */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        Explode level: {Math.round(explodeLevel * 100)} percent
      </div>
    </div>
  );
}
```

---

## Figma Design Verification Needed

**Unable to verify exact Figma specifications** without direct access. The following should be checked:

1. **Plus/Minus button design** - Size, position, styling
2. **Thumb hover state** - Exact color values and shadow
3. **Value display** - Tooltip vs label vs none
4. **Compact mode animation** - Duration and easing
5. **Track markers** - Any visual indicators at specific values
6. **Active state feedback** - Scale, color, shadow changes

**Recommendation:** Review Figma link in component header comment:
`https://www.figma.com/design/Vz80RydxWcYHVnn2iuyV0m?node-id=160-576`

---

## Conclusion

The ViewerZoomSlider component is **functionally complete but interaction-incomplete**. It lacks the visual feedback and state management that users expect from modern UI controls. The implementation is approximately **40% complete** when measured against standard interaction patterns.

**Next Steps:**

1. Review Figma designs for exact specifications
2. Implement critical interactions (thumb states, buttons)
3. Add accessibility features (focus states, ARIA)
4. Polish with transitions and feedback mechanisms

**Estimated Implementation Time:** 3-4 hours for full interactive polish
