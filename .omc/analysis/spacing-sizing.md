# SIMVEX Frontend - Spacing & Sizing Analysis Report

**Generated:** 2026-02-09
**Project:** 3rd-frontend (SIMVEX)
**Scope:** Comprehensive analysis of all Tailwind spacing and sizing utilities across components

---

## Executive Summary

This report analyzes spacing and sizing patterns used throughout the SIMVEX frontend codebase against Figma design specifications. The project uses **1920px as the base design resolution** with **automatic 75% scaling** for viewports ≤1919px.

**Key Findings:**

- ✅ Most components follow the 1920px design standard with absolute pixel values
- ⚠️ Some components use Tailwind default units (gap-2, gap-4, p-6, etc.) which don't scale
- ✅ Custom arbitrary values (px-[16px], py-[12px], etc.) are used correctly for precision
- ⚠️ Minor inconsistencies in some component padding and spacing

---

## Component Analysis

### 1. UI Components (src/components/ui/)

#### Button Component (button.tsx)

**Figma Spec:** 145×40px, 16px font, 8px border radius

```
Found: h-10 w-[145px] px-4 py-0
```

**Status:** ⚠️ PARTIAL MISMATCH

- Width: Correct (145px matches Figma)
- Height: h-10 = 40px ✅
- Padding: px-4 py-0 (16px horizontal, 0px vertical) - Using Tailwind default units
- **Issue:** px-4 = 16px but doesn't scale with 75% zoom. Should use px-[16px] for consistency
- **Impact:** Button horizontal padding won't scale at 1440px viewport

**Recommendation:**

```tsx
// Change from:
"h-10 w-[145px] px-4 py-0";
// To:
"h-[40px] w-[145px] px-[16px] py-[0px]";
```

---

#### ModelCard Component (model-card.tsx)

**Figma Spec:** 332.8×241px, 24px border radius, 5px border, 6px padding

```
Found: w-[332.8px] h-[241px] p-6 rounded-[24px] border-[5px]
       gap-6 (inside flex container)
```

**Status:** ✅ MOSTLY CORRECT

- Dimensions: 332.8×241px ✅ (custom arbitrary values)
- Border radius: 24px ✅ (custom arbitrary)
- Border width: 5px ✅ (custom arbitrary)
- Internal padding: p-6 = 24px (Tailwind default) - **Mismatch**
- Icon gap: gap-6 = 24px (Tailwind default) - **Mismatch**
- Text size: text-[32px] ✅ (custom arbitrary)

**Issues:**

1. p-6 and gap-6 use Tailwind defaults instead of arbitrary values
2. These won't scale consistently with the 75% zoom

**Recommendation:**

```tsx
// Change from:
"p-6" and "gap-6"
// To:
"p-[24px]" and "gap-[24px]"
```

---

#### ChatInterface Component (panels/ChatInterface.tsx)

**Figma Spec:** 442px width, 67px header height, 24px padding/spacing

```
Found:
- w-[442px] ✅
- h-[67px] ✅
- px-[24px] py-[24px] ✅
- space-y-[16px] ✅
- Messages: px-[16px] py-[12px] rounded-[16px] ✅
- Input area: px-[24px] py-[24px] p-[16px] ✅
```

**Status:** ✅ EXCELLENT

- All spacing uses custom arbitrary values
- Perfectly aligned with Figma specs
- Will scale correctly at 75% zoom

---

#### ViewerToolbar Component (viewer/ViewerToolbar.tsx)

**Figma Spec:** 500×50px (scaled to 375×37.5px in code), 3px border, 16px border radius

```
Found:
- w-[375px] h-[37.5px] ✅
- gap-9 (Tailwind default = 36px) ⚠️
- px-[120px] py-3 (py-3 = 12px) ⚠️
- border-[3px] rounded-[12px] ✅
```

**Status:** ⚠️ MIXED QUALITY

- Dimensions: Correct (scaled values)
- Border: Correct (custom arbitrary)
- Gap: gap-9 = 36px (Tailwind) - Should use gap-[36px]
- Vertical padding: py-3 = 12px (Tailwind) - Should use py-[12px]

**Recommendation:**

```tsx
// Change from:
"gap-9" and "py-3"
// To:
"gap-[36px]" and "py-[12px]"
```

---

### 2. Text & Typography Components

#### Help Message (ui/help-message.tsx)

```
Found: text-[12px] h-[18px] leading-[1.5]
```

**Status:** ✅ CORRECT

- Uses custom arbitrary values for precision
- Matches design specs

---

#### MarkdownRenderer (ui/markdown-renderer.tsx)

```
Found mixed usage:
- text-xs → 12px (Tailwind default)
- text-sm → 14px (Tailwind default)
- text-base → 16px (Tailwind default)
- text-[32px], text-[16px], text-[14px] (custom arbitrary)
- p-3, px-1, py-2 (Tailwind defaults)
- py-8 (Tailwind default)
- border-l-4, border-2 (Tailwind defaults)
```

**Status:** ⚠️ INCONSISTENT

- Mix of Tailwind defaults and custom arbitrary values
- Some Tailwind defaults won't scale properly
- Code/blockquote styling uses non-arbitrary units

**Recommendation:** Audit and convert all text/spacing to arbitrary values for consistency

---

#### CTA Button (ui/cta-button.tsx)

```
Found: !text-[24px] !rounded-[18px] !border-[3.75px] !px-2
```

**Status:** ⚠️ MISMATCH

- Uses !px-2 = 8px (Tailwind default with !important override)
- Should use !px-[8px] for consistency
- **Impact:** Scaling inconsistency with 75% zoom

---

### 3. Panel & Layout Components

#### Part Sidebar (panels/part-sidebar.tsx)

```
Found:
- gap-[40px] ✅
- gap-[24px] ✅
- px-[24px] ✅
- py-[24px] ✅
- rounded-[24px] ✅
```

**Status:** ✅ EXCELLENT

- All spacing uses custom arbitrary values
- Consistent with design specs

---

#### Chat Input (ui/chat-input.tsx)

```
Found:
- min-h-[40px] max-h-[120px] ✅
- py-1.5 ⚠️ (1.5 = 6px Tailwind default)
- text-[16px] ✅
- outline-none ✅
```

**Status:** ⚠️ MINOR MISMATCH

- py-1.5 should be py-[6px]

---

### 4. Landing Page Components

#### Landing Intro Section

```
Found:
- w-[1320px] h-[575px] ✅
- px-10 py-12 ⚠️ (Tailwind defaults = 40px, 48px)
- h-[250px] ✅
- border-[3px] rounded-[24px] ✅
- px-[153px] py-[105px] ✅
- gap-[24px] ✅
```

**Status:** ⚠️ MIXED

- Some sections use Tailwind defaults (px-10, py-12)
- Others use correct arbitrary values

---

## Spacing/Sizing Pattern Summary

### Correctly Used Patterns ✅

```
w-[XXXpx]        - Custom width
h-[XXXpx]        - Custom height
px-[XXpx]        - Custom horizontal padding
py-[XXpx]        - Custom vertical padding
p-[XXpx]         - Custom padding all sides
gap-[XXpx]       - Custom gaps
rounded-[XXpx]   - Custom border radius
border-[Xpx]     - Custom border width
text-[XXpx]      - Custom font size
leading-[X.X]    - Custom line height
```

### Problematic Patterns ⚠️

```
px-4, px-6, px-8              - Tailwind defaults (don't scale)
py-2, py-3, py-6, py-8, py-12 - Tailwind defaults (don't scale)
p-3, p-4, p-6, p-8            - Tailwind defaults (don't scale)
gap-2, gap-4, gap-6, gap-8    - Tailwind defaults (don't scale)
rounded-lg, rounded-xl        - Tailwind defaults (don't scale)
h-10, h-12                    - Tailwind defaults (don't scale)
text-xs, text-sm, text-base   - Tailwind defaults (don't scale)
```

---

## Scaling Impact Analysis

### Current Scaling System

```css
@media (max-width: 1919px) {
  body {
    zoom: 0.75 !important;
    min-height: 133.33vh !important;
  }
}
```

### What Scales ✅

- Custom arbitrary values: `px-[16px]`, `text-[32px]`, etc.
- These are converted to inline styles and respect the zoom

### What Doesn't Scale ⚠️

- Tailwind defaults like `px-4`, `gap-6`, `text-base`
- CSS is applied directly, not through inline styles
- These remain at their original size even with zoom applied

### Example Breakdown

```
At 1920px (100% zoom):
- px-[16px] = 16px (scales to 12px at 75%)
- px-4 = 16px (stays 16px, doesn't scale)

At 1440px (75% zoom):
- Custom arbitrary: 16px × 0.75 = 12px ✅
- Tailwind default: 16px (not affected) ⚠️
```

---

## Mismatch Summary by Severity

### 🔴 Critical (Component appears broken/misaligned)

None identified - but scaling issues could cause problems at 1440px

### 🟡 High (Visual mismatch with Figma specs)

1. **Button component** - px-4 padding doesn't scale
2. **ModelCard** - p-6, gap-6 don't scale
3. **ViewerToolbar** - gap-9, py-3 don't scale
4. **MarkdownRenderer** - Multiple Tailwind defaults throughout

### 🟠 Medium (Minor inconsistencies)

1. **CTA Button** - !px-2 should be !px-[8px]
2. **Chat Input** - py-1.5 should be py-[6px]
3. **Landing Intro** - px-10, py-12 should be arbitrary values

### 🟢 Low (Already correct)

1. ChatInterface (perfect)
2. Part Sidebar (perfect)
3. ModelCard dimensions and borders (correct)

---

## Detailed Mismatch Checklist

| Component        | Property   | Current      | Expected             | Status |
| ---------------- | ---------- | ------------ | -------------------- | ------ |
| Button           | px padding | px-4         | px-[16px]            | ⚠️     |
| ModelCard        | padding    | p-6          | p-[24px]             | ⚠️     |
| ModelCard        | gap        | gap-6        | gap-[24px]           | ⚠️     |
| ViewerToolbar    | gap        | gap-9        | gap-[36px]           | ⚠️     |
| ViewerToolbar    | py padding | py-3         | py-[12px]            | ⚠️     |
| CTAButton        | px padding | !px-2        | !px-[8px]            | ⚠️     |
| ChatInput        | py padding | py-1.5       | py-[6px]             | ⚠️     |
| MarkdownRenderer | text sizes | text-xs/sm   | text-[12px/14px]     | ⚠️     |
| MarkdownRenderer | padding    | p-3, px-1    | p-[12px], px-[4px]   | ⚠️     |
| LandingIntro     | padding    | px-10, py-12 | px-[40px], py-[48px] | ⚠️     |

---

## Root Cause Analysis

### Why These Issues Exist

1. **Inconsistent Development Pattern** - Early components used Tailwind defaults, later ones used arbitrary values
2. **Scaling System Not Documented** - Developers unaware of 75% zoom requirement
3. **Code Review Gaps** - Inconsistencies slipped through PR reviews

### Design System Intent

The project uses:

- **1920px base resolution** for all designs
- **Absolute pixel values** throughout (px-[XXX])
- **Automatic 75% scaling** via CSS zoom for smaller viewports

This approach requires:

- ✅ All spacing/sizing as arbitrary values `[XXpx]`
- ✅ No reliance on Tailwind default spacing scale
- ✅ Consistency across all components

---

## Recommendations

### Priority 1: Fix Critical Components (Today)

1. **Button** - Change `px-4` to `px-[16px]`
2. **ModelCard** - Change `p-6 gap-6` to `p-[24px] gap-[24px]`
3. **ViewerToolbar** - Change `gap-9 py-3` to `gap-[36px] py-[12px]`

### Priority 2: Audit & Fix Medium Components (This Sprint)

1. **MarkdownRenderer** - Full audit of all text/spacing
2. **Chat Input** - Change `py-1.5` to `py-[6px]`
3. **CTA Button** - Change `!px-2` to `!px-[8px]`

### Priority 3: Prevent Future Issues (Ongoing)

1. **Code Review Checklist** - Add spacing/sizing verification step
2. **ESLint Rule** - Consider creating custom rule to prevent `px-N`, `py-N`, `gap-N` outside specific contexts
3. **Developer Documentation** - Update CLAUDE.md with spacing requirement details
4. **Component Template** - Create PR template showing correct patterns

### Long-term Solution

Consider extracting common spacing values as Tailwind config to reduce arbitrary values:

```js
// tailwind.config.ts
extend: {
  spacing: {
    'xs': '8px',    // gap-xs instead of gap-[8px]
    'sm': '12px',   // gap-sm instead of gap-[12px]
    'md': '16px',   // gap-md instead of gap-[16px]
    'lg': '24px',   // gap-lg instead of gap-[24px]
    'xl': '32px',   // gap-xl instead of gap-[32px]
    'xxl': '40px',  // gap-xxl instead of gap-[40px]
  }
}
```

---

## Files Requiring Changes

### High Priority

- [ ] `/src/components/ui/button.tsx` - Line 38
- [ ] `/src/components/ui/model-card.tsx` - Lines 27-28, 69
- [ ] `/src/components/viewer/ViewerToolbar.tsx` - Lines 29-30, 32

### Medium Priority

- [ ] `/src/components/ui/cta-button.tsx` - Icon sizing
- [ ] `/src/components/ui/chat-input.tsx` - Line with py-1.5
- [ ] `/src/components/ui/markdown-renderer.tsx` - Multiple lines

### Lower Priority (But Should Address)

- [ ] `/src/components/sections/landing-intro-section.tsx` - px-10, py-12
- [ ] Various components with `text-xs`, `text-sm`, `text-base`

---

## Verification Steps

After fixes, verify:

1. **1920px Viewport (100% zoom)**
   - All components appear identical to current state
   - No visual changes

2. **1440px Viewport (75% zoom)**
   - All spacing/sizing scales down proportionally
   - Spacing relationships maintained
   - No overlap or misalignment

3. **Visual Regression Testing**
   - Compare Storybook snapshots before/after
   - Verify button click targets remain adequate
   - Check text readability

---

## Appendix: Complete Component Spacing Audit

### Perfect Components ✅

- `ChatInterface` - All custom arbitrary values
- `PartSidebar` - All custom arbitrary values
- `MardownRenderer` sections with `text-[XXpx]` - Correct pattern

### Components with Issues ⚠️

- `Button` - 1 issue (padding)
- `ModelCard` - 2 issues (padding, gap)
- `ViewerToolbar` - 2 issues (gap, padding)
- `MarkdownRenderer` - 8+ issues (multiple text sizes and spacing)
- `CTAButton` - 1 issue (padding)
- `ChatInput` - 1 issue (padding)
- `LandingIntroSection` - 2 issues (padding)

**Total Issues Found:** ~20 spacing/sizing mismatches

---

## Conclusion

The codebase has **good foundational practices** with custom arbitrary values in many components, but inconsistent application creates scaling issues at 1440px viewport. The identified issues are straightforward to fix and follow a clear pattern.

**Estimated Fix Time:** 2-3 hours for all priority fixes
**Risk Level:** Low (syntax changes only, no logic changes)
**Testing Effort:** Medium (visual regression testing required)

---

_Report prepared for SIMVEX Frontend Project_
_Analysis completed: 2026-02-09_
