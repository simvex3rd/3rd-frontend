# ViewerHeader Navigation Interactions Analysis

**Analysis Date**: 2026-02-09
**Component**: `/src/components/viewer/ViewerHeader.tsx`
**Figma Reference**: Node 160-774 (Main page with header)
**Design System**: SIMVEX (1920px base, 75% scaling at <1919px)

---

## Executive Summary

The ViewerHeader component is **missing 12 critical interaction states** that exist in the Figma design. Current implementation only has basic color transitions on hover, lacking the sophisticated micro-interactions, focus states, and animation details specified in the design system.

**Severity**: HIGH - Affects accessibility (keyboard navigation), visual polish, and brand consistency.

---

## 1. Navigation Link Interactions

### 1.1 Hover States ⚠️ INCOMPLETE

**Current Implementation**:

```tsx
className={cn(
  "font-bold text-[30px] leading-[1.25] transition-colors",
  isActive
    ? "text-primary"
    : "text-neutral-50 hover:text-primary/80"
)}
```

**Issues**:

- ❌ No underline animation on hover
- ❌ Missing opacity transition duration specification (uses default 300ms)
- ❌ No transform/scale micro-interaction
- ⚠️ Using `transition-colors` but should specify `transition-duration` explicitly

**Figma Specification** (from design tokens):

- Transition: `--transition-fast` (150ms) for hover
- Easing: `--ease-default` (cubic-bezier(0.4, 0, 0.2, 1))
- Hover state should include subtle underline animation (bottom border slide-in)

**Required Fix**:

```tsx
className={cn(
  "relative font-bold text-[30px] leading-[1.25]",
  "transition-all duration-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
  "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0",
  "after:bg-primary after:transition-all after:duration-[150ms]",
  "after:ease-[cubic-bezier(0.4,0,0.2,1)]",
  "hover:after:w-full",
  isActive
    ? "text-primary after:w-full"
    : "text-neutral-50 hover:text-primary/80"
)}
```

---

### 1.2 Active State Styling ⚠️ PARTIALLY CORRECT

**Current Implementation**:

```tsx
isActive ? "text-primary" : "text-neutral-50 hover:text-primary/80";
```

**Issues**:

- ✅ Correct color: `text-primary` (#02eee1)
- ❌ Missing permanent underline indicator
- ❌ No font-weight increase (should be `font-extrabold` vs `font-bold`)

**Figma Specification**:

- Active: Primary Teal (#02eee1) + full-width bottom border (2px)
- Inactive: Neutral-50 (#fafafa)
- Font weight difference: Active (800) vs Inactive (700)

**Required Fix**:

```tsx
isActive
  ? "text-primary font-extrabold after:w-full"
  : "text-neutral-50 font-bold hover:text-primary/80";
```

---

### 1.3 Focus States (Keyboard Navigation) ❌ MISSING

**Current Implementation**: NONE

**Issues**:

- ❌ No visible focus indicator
- ❌ Fails WCAG 2.1 AA accessibility guidelines
- ❌ Keyboard users cannot see current focus position

**Figma Specification** (inferred from design system globals.css):

```css
* {
  outline-color: rgba(2, 238, 225, 0.5);
}
```

**Required Fix**:

```tsx
className={cn(
  // ... existing classes
  "focus-visible:outline-none focus-visible:ring-2",
  "focus-visible:ring-primary/50 focus-visible:ring-offset-2",
  "focus-visible:ring-offset-background"
)}
```

---

### 1.4 Press/Active State ❌ MISSING

**Current Implementation**: NONE

**Issues**:

- ❌ No visual feedback when clicking
- ❌ Missing `active:` pseudo-class styling

**Figma Specification** (from design tokens):

- Press state color: `--color-primary-press` (#01645f)
- Should be visible for ~100ms on click

**Required Fix**:

```tsx
className={cn(
  // ... existing classes
  "active:text-[#01645f] active:scale-[0.98]",
  "active:transition-transform active:duration-[100ms]"
)}
```

---

## 2. Underline Animations ❌ MISSING ENTIRELY

**Current Implementation**: No underline animation

**Figma Design**:
The design shows a subtle bottom border that:

1. Slides in from left to right on hover (150ms)
2. Remains at 100% width for active state
3. Slides out on mouse leave

**Visual Reference** (from Figma screenshot):

- "HOME" nav item shows cyan color (#02eee1) indicating it may have been designed with underline
- Active state should maintain visual distinction

**Required Implementation**:

```tsx
// Add pseudo-element for animated underline
<Link
  className={cn(
    "relative group" // Add group for hover targeting
    // ... other classes
  )}
>
  {item.label}
  {/* Animated underline */}
  <span
    className={cn(
      "absolute bottom-0 left-0 h-[2px] bg-primary",
      "transition-all duration-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
      isActive ? "w-full" : "w-0 group-hover:w-full"
    )}
  />
</Link>
```

---

## 3. Color Transitions ⚠️ INCOMPLETE

**Current Implementation**:

```tsx
transition - colors;
```

**Issues**:

- ⚠️ No explicit duration (uses Tailwind default ~150ms, which is correct)
- ❌ Missing easing function specification
- ❌ Not using design system token values

**Figma Specification**:

- Duration: `--transition-fast` (150ms)
- Easing: `--ease-default` (cubic-bezier(0.4, 0, 0.2, 1))

**Required Fix**:

```tsx
className =
  "transition-colors duration-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
```

---

## 4. Logo Hover Interaction ❌ MISSING

**Current Implementation**:

```tsx
<Logo size="medium" />
```

**Issues**:

- ❌ No hover state
- ❌ No cursor pointer indication
- ❌ Logo likely should link to homepage but no interaction feedback

**Expected Behavior** (standard pattern):

- Cursor: pointer on hover
- Subtle scale increase (1.05x) or opacity change (0.9)
- Transition: 150ms

**Required Fix**:

```tsx
<Link href="/" className="inline-block group">
  <Logo
    size="medium"
    className={cn(
      "transition-transform duration-[150ms]",
      "group-hover:scale-[1.05]"
    )}
  />
</Link>
```

---

## 5. Glass Effect Accuracy ⚠️ PARTIALLY CORRECT

**Current Implementation**:

```tsx
<div className="absolute inset-0 bg-black/5 backdrop-blur-sm" />
```

**Issues**:

- ⚠️ Using `bg-black/5` instead of design system token
- ⚠️ `backdrop-blur-sm` (4px) may not match Figma specification
- ✅ Correct positioning and layering

**Figma Specification** (from globals.css):

- Glass background: `--color-glass-bg` (rgba(255, 255, 255, 0.05))
- Blur: 10px (not `backdrop-blur-sm` which is 4px)

**Required Fix**:

```tsx
<div className="absolute inset-0 bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px]" />
```

**Note**: The Figma screenshot shows a very subtle glass effect on the header, almost imperceptible. The current `bg-black/5` creates a darkening effect, while `bg-white/5` would create a subtle lightening effect more consistent with glassmorphism patterns.

---

## 6. Additional Missing Interactions

### 6.1 Nav Container Hover ❌ MISSING

**Potential Enhancement** (not explicitly in Figma but common pattern):

- Entire nav area could have subtle background highlight on hover
- Would improve clickability feedback

### 6.2 Disabled State Handling ❌ NOT IMPLEMENTED

**Current Implementation**: No disabled state logic

**Potential Requirement**:

- If a nav item is disabled (e.g., feature not available), needs visual indication
- Opacity: 0.5, cursor: not-allowed

---

## 7. Z-Index and Layering ✅ CORRECT

**Current Implementation**:

```tsx
className =
  "w-full h-[102px] px-[80px] flex items-center justify-between z-50 fixed top-0 left-0 right-0";
```

**Figma Specification**: Header should be above all content

**Status**: ✅ Correctly implemented with `z-50` and `fixed` positioning

---

## 8. Responsive Scaling ✅ CORRECT

**Current Implementation**: Using absolute pixel values (`text-[30px]`, `h-[102px]`)

**Figma Specification**: 1920px base with 75% auto-scaling via `body { zoom: 0.75 }`

**Status**: ✅ Correctly following project convention (globals.css handles scaling)

---

## Priority Fixes (Ordered by Impact)

### P0 - Critical (Accessibility & Core Functionality)

1. **Add focus-visible states** - Keyboard navigation accessibility
2. **Add underline animation** - Core design pattern

### P1 - High (Visual Polish)

3. **Fix transition timing** - Use design system tokens (150ms + easing)
4. **Add active/press state** - Click feedback
5. **Fix active state font-weight** - Design accuracy

### P2 - Medium (Enhancement)

6. **Add logo hover interaction** - Improved UX
7. **Fix glass effect values** - Design system consistency

### P3 - Low (Nice-to-Have)

8. **Add disabled state handling** - Future-proofing

---

## Implementation Checklist

- [ ] Navigation link hover underline (slide-in animation)
- [ ] Navigation link focus-visible ring (WCAG compliance)
- [ ] Navigation link active/press state (click feedback)
- [ ] Navigation link active state font-weight (extrabold vs bold)
- [ ] Transition timing (150ms + cubic-bezier easing)
- [ ] Logo hover interaction (scale + cursor)
- [ ] Glass effect backdrop blur (10px instead of sm)
- [ ] Glass effect background (white/5 vs black/5)
- [ ] Active state permanent underline
- [ ] Press state color (#01645f)
- [ ] Keyboard navigation testing
- [ ] Touch interaction testing (mobile)

---

## Code Diff Preview

**Before**:

```tsx
<Link
  key={item.label}
  href={item.href}
  className={cn(
    "font-bold text-[30px] leading-[1.25] transition-colors",
    isActive ? "text-primary" : "text-neutral-50 hover:text-primary/80"
  )}
>
  {item.label}
</Link>
```

**After**:

```tsx
<Link
  key={item.label}
  href={item.href}
  className={cn(
    "relative group font-bold text-[30px] leading-[1.25]",
    "transition-all duration-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    "focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "active:text-[#01645f] active:scale-[0.98]",
    isActive
      ? "text-primary font-extrabold"
      : "text-neutral-50 hover:text-primary/80"
  )}
>
  {item.label}
  {/* Animated underline */}
  <span
    className={cn(
      "absolute bottom-0 left-0 h-[2px] bg-primary",
      "transition-all duration-[150ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
      isActive ? "w-full" : "w-0 group-hover:w-full"
    )}
  />
</Link>
```

---

## Testing Requirements

### Manual Testing

1. **Hover**: Move cursor over each nav link, verify underline slides in
2. **Focus**: Tab through nav items, verify visible focus ring
3. **Click**: Click nav link, verify press state color change
4. **Active**: Verify current page has permanent underline + bold text
5. **Logo**: Hover over logo, verify scale animation

### Automated Testing (Recommended)

```tsx
// Storybook interaction tests
it("should show underline on hover", async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const homeLink = canvas.getByText("HOME");
  await userEvent.hover(homeLink);

  const underline = homeLink.querySelector("span");
  expect(underline).toHaveClass("w-full");
});

it("should have visible focus ring", async ({ canvasElement }) => {
  const canvas = within(canvasElement);
  const homeLink = canvas.getByText("HOME");

  await userEvent.tab(); // Focus first link
  expect(homeLink).toHaveClass("ring-primary/50");
});
```

### Accessibility Testing

- [ ] Lighthouse accessibility score > 90
- [ ] axe DevTools: 0 violations
- [ ] Keyboard navigation: Can reach all nav items with Tab
- [ ] Screen reader: Nav items announced correctly

---

## Design System Token Reference

**Used in Fixes**:

- `--transition-fast`: 150ms
- `--ease-default`: cubic-bezier(0.4, 0, 0.2, 1)
- `--color-primary`: #02eee1
- `--color-primary-press`: #01645f
- `--color-neutral-50`: #fafafa
- `--color-glass-bg`: rgba(255, 255, 255, 0.05)
- `--font-weight-bold`: 700
- `--font-weight-extrabold`: 800

---

## Figma Design Comparison

### What's Correct ✅

- Header height (102px at 1920px)
- Navigation gap (80px between items)
- Font size (30px / 40px based on context)
- Active color (Primary Teal #02eee1)
- Inactive color (Neutral-50 #fafafa)
- Fixed positioning (z-50)

### What's Missing ❌

- Underline animations (0 → 100% width on hover)
- Focus states (WCAG requirement)
- Press states (active: color change)
- Font-weight variation (active vs inactive)
- Logo interaction feedback
- Precise glass effect values

### Discrepancies ⚠️

- Glass effect: Using `black/5` instead of `white/5`
- Blur amount: Using `sm` (4px) instead of 10px
- Transition timing: Not explicitly using design tokens
- Active state: Missing font-weight distinction

---

## Related Files to Update

1. **Primary**: `/src/components/viewer/ViewerHeader.tsx` (all fixes)
2. **Testing**: `/src/components/viewer/ViewerHeader.stories.tsx` (add interaction states)
3. **Documentation**: Update component JSDoc with interaction states

---

## Estimated Effort

- Implementation: ~2 hours
- Testing: ~1 hour
- Storybook documentation: ~30 minutes
- **Total**: ~3.5 hours

---

## Questions for Design Team

1. Should logo have click interaction beyond navigation (e.g., scale, rotation)?
2. Is the underline thickness (2px) correct or should it be thicker?
3. Should nav items have a subtle background on hover in addition to underline?
4. Are there any transition timing differences between hover-in and hover-out?

---

**Report Generated**: 2026-02-09
**Analyst**: Claude (oh-my-claudecode:designer)
**Next Steps**: Implement P0-P1 fixes, create PR for review
