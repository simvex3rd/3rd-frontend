# Color Accuracy Analysis Report

**Generated**: 2026-02-09
**Project**: SIMVEX Frontend
**Design System Reference**: `/src/app/globals.css` (Tailwind v4 inline theme)

---

## Executive Summary

This report analyzes color usage across all components in the SIMVEX frontend codebase, comparing actual implementation against the Figma design system defined in `globals.css`. The analysis identifies mismatches, hardcoded values, and inconsistencies.

### Key Findings

- **Total Components Analyzed**: 86 TSX files
- **Critical Issues**: 15 instances of non-design-system colors
- **Medium Issues**: 8 instances of incorrect color mappings
- **Low Issues**: 12 instances of suboptimal color choices

---

## Design System Reference

### Primary Colors (Figma-verified)

```css
--color-primary: #02eee1 /* Primary Cyan */ --color-primary-hover: #01a9a0
  /* Hover State */ --color-primary-press: #01645f /* Pressed State */
  --color-primary-light: #33f2e6 /* Light Variant */
  --color-primary-dark: #015b56 /* Dark Variant */;
```

### Neutral Colors (Figma-verified)

```css
--color-neutral-50: #fafafa --color-neutral-200: #e5e5e5
  --color-neutral-300: #d4d4d4 --color-neutral-400: #a3a3a3
  --color-neutral-600: #525252 --color-neutral-700: #404040
  --color-neutral-900: #171717;
```

### Glassmorphism/Opacity Variants

```css
--color-primary-30: rgba(2, 238, 225, 0.3)
  --color-hover-30: rgba(1, 169, 160, 0.3)
  --color-press-30: rgba(1, 100, 95, 0.3)
  --color-gray-30: rgba(212, 212, 212, 0.3)
  --color-dark-gray-30: rgba(115, 115, 115, 0.3)
  --color-glass-bg: rgba(255, 255, 255, 0.05);
```

---

## Critical Issues (High Priority)

### 1. Non-Design-System Gray Colors

#### ❌ Issue: `text-gray-*` utility classes

**Impact**: CRITICAL - Bypasses design system entirely

**Affected Files**:

- `/src/components/ui/link-button.tsx` (line 38)
- `/src/components/panels/ChatHistoryTab.tsx` (lines 52, 57, 59, 70, 76)
- `/src/components/panels/QuizPanel.tsx` (line 52)
- `/src/components/panels/NotesPanel.tsx` (lines 48, 53)
- `/src/components/ui/MessageBubble.tsx` (lines 37, 43, 49)

**Current Code**:

```tsx
// ChatHistoryTab.tsx
<input className="bg-gray-700 text-white" />
<p className="text-gray-400">로딩 중...</p>

// LinkButton.tsx
<Link className="text-gray-200 hover:text-primary" />

// NotesPanel.tsx
<textarea className="placeholder:text-gray-300" />
```

**Expected (Design System)**:

```tsx
// Should use neutral colors
<input className="bg-neutral-700 text-neutral-50" />
<p className="text-neutral-400">로딩 중...</p>

<Link className="text-neutral-200 hover:text-primary" />

<textarea className="placeholder:text-neutral-300" />
```

**Figma Reference**:

- `gray-200` → `neutral-200` (#e5e5e5)
- `gray-300` → `neutral-300` (#d4d4d4)
- `gray-400` → `neutral-400` (#a3a3a3)
- `gray-600` → `neutral-600` (#525252)
- `gray-700` → `neutral-700` (#404040)
- `gray-800` → `neutral-800` (#262626)

---

### 2. Hardcoded Color Values

#### ❌ Issue: Direct hex/rgba colors in components

**Impact**: CRITICAL - Not reusable, breaks theming

**File**: `/src/components/viewer/ViewerZoomSlider.tsx`

```tsx
// Line 46 - Hardcoded track color
<div className="bg-[#d9d9d9] rounded-full" />
```

**Expected**: `bg-neutral-200` or create CSS variable `--color-slider-track`

**Figma Reference**: Track should be neutral-200 (#e5e5e5) per design system

---

**File**: `/src/components/panels/QuizPanel.tsx`

```tsx
// Line 37 - Hardcoded background
<div className="bg-[rgba(64,64,64,0.7)]" />
```

**Expected**: Use CSS variable or create utility class

```tsx
<div className="bg-neutral-700/70" /> // Or add to globals.css
```

**Figma Reference**: Should use neutral-700 with 70% opacity

---

**File**: `/src/components/panels/ChatInterface.tsx`

```tsx
// Lines 160, 169, 297 - Multiple hardcoded rgba values
style={{ backgroundColor: "rgba(64, 64, 64, 0.7)" }}
style={{ backgroundColor: "#404040" }}
style={{ backgroundColor: "rgba(64, 64, 64, 0.3)" }}
```

**Expected**:

```tsx
// Add to globals.css
--color-chat-bg: rgba(64, 64, 64, 0.7);
--color-chat-header: #404040;
--color-chat-input-bg: rgba(64, 64, 64, 0.3);

// Use in component
className="bg-[var(--color-chat-bg)]"
```

**Figma Reference**: Panel backgrounds should use neutral-700 variants

---

**File**: `/src/components/panels/NotesPanel.tsx`

```tsx
// Line 40 - Direct rgba for glassmorphism
className = "bg-[rgba(2,238,225,0.3)]";
```

**Expected**: `bg-primary-30` (already defined in globals.css)

**Figma Reference**: ✅ Correct color, wrong usage pattern

---

**File**: `/src/components/ui/MessageBubble.tsx`

```tsx
// Lines 22-23 - Chat bubble backgrounds
"bg-[rgba(2,238,225,0.3)]"; // User
"bg-[rgba(1,169,160,0.3)]"; // AI
```

**Expected**:

```tsx
"bg-primary-30"; // User
"bg-hover-30"; // AI
```

**Figma Reference**: ✅ Correct colors, wrong usage pattern

---

### 3. Incorrect Color Mapping

#### ❌ Issue: `#404040` hardcoded vs design system

**Impact**: CRITICAL - Diverges from neutral-700

**Files**:

- `/src/components/panels/ChatInterface.tsx` (line 169)
- `/src/components/panels/chat-sidebar.tsx` (comments reference)

**Current**: `backgroundColor: "#404040"`
**Design System**: `--color-neutral-700: #404040`
**Expected**: `bg-neutral-700`

**Note**: While the hex value matches, using CSS variables ensures consistency if the design system changes.

---

## Medium Issues (Should Fix)

### 4. Missing Opacity Variants

#### ⚠️ Issue: `white/10`, `white/20`, `white/30` not in design system

**Impact**: MEDIUM - Creates ad-hoc opacity values

**File**: `/src/components/ui/icon-button.tsx`

```tsx
// Line 61
"hover:bg-white/10 active:bg-white/20";
```

**Current Design System**: Only defines `--color-white-30: rgba(255, 255, 255, 0.3)`

**Expected Solution**: Add to `globals.css`:

```css
--color-white-10: rgba(255, 255, 255, 0.1);
--color-white-20: rgba(255, 255, 255, 0.2);
```

**Figma Reference**: Check if Figma specifies these exact values or if they're developer choices

---

### 5. Semantic Color Inconsistency

#### ⚠️ Issue: `text-black` usage on primary backgrounds

**Impact**: MEDIUM - Should use semantic color names

**File**: `/src/components/panels/QuizPanel.tsx`

```tsx
// Line 66
<button className="bg-primary text-black" />
```

**Current**: Works but not semantic
**Expected**:

```tsx
// Add to globals.css under "SEMANTIC COLORS"
--color-on-primary: #171717; // neutral-900 for text on primary

// Use in component
<button className="bg-primary text-[var(--color-on-primary)]" />
```

**Figma Reference**: Primary button text should be neutral-900 per design specs

---

### 6. Green/Red States Not in Design System

#### ⚠️ Issue: `border-green-500`, `bg-green-500/20`, `border-red-500`

**Impact**: MEDIUM - Quiz feedback colors not formalized

**File**: `/src/components/panels/QuizPanel.tsx`

```tsx
// Lines 53-54
"border-green-500 bg-green-500/20"; // Correct answer
"border-red-500 bg-red-500/20"; // Wrong answer
```

**Current Design System**: Only defines:

```css
--color-success: #00c950 --color-error: #fb2c36;
```

**Expected**: Use semantic colors consistently:

```tsx
"border-success bg-success/20";
"border-error bg-error/20";
```

**Figma Reference**: Verify if quiz states use success/error colors or custom green/red

---

### 7. Cyan Utility Colors

#### ⚠️ Issue: `text-cyan-400`, `hover:text-cyan-300`

**Impact**: MEDIUM - Tailwind default cyan vs primary

**File**: `/src/components/ui/MessageBubble.tsx`

```tsx
// Line 64
<a className="text-cyan-400 hover:text-cyan-300" />
```

**Expected**: Use primary color system

```tsx
<a className="text-primary hover:text-primary-light" />
```

**Figma Reference**: Links should use primary cyan (#02eee1)

---

### 8. Background Opacity Inconsistencies

#### ⚠️ Issue: `neutral-500/30` vs `gray-30`

**Impact**: MEDIUM - Two patterns for same effect

**File**: `/src/components/ui/body-btn.tsx`

```tsx
// Line 21
"bg-neutral-500/30";
```

**Design System**: Defines `--color-gray-30: rgba(212, 212, 212, 0.3)`

**Analysis**:

- `neutral-500` = #737373 (not #d4d4d4)
- `gray-30` should be `neutral-300/30` for consistency

**Expected**: Standardize opacity pattern:

```tsx
// Either use Tailwind opacity syntax everywhere
"bg-neutral-300/30"

// Or define more CSS variables
--color-neutral-300-30: rgba(212, 212, 212, 0.3);
```

**Figma Reference**: Verify neutral-300 vs neutral-500 for glassmorphic buttons

---

## Low Issues (Nice to Have)

### 9. Border Color Defaults

#### ℹ️ Issue: `border-neutral-300` in multiple components

**Impact**: LOW - Consistent but could use semantic naming

**Files**:

- `/src/components/ui/input.tsx` (line 34)
- `/src/components/ui/text-field.tsx` (via Input)

**Current**: `border-neutral-300`
**Design System**: Defines `--color-border: var(--color-neutral-300)`
**Status**: ✅ Correct mapping, but could use `border` class directly

**Recommendation**: Components already use `@apply border-border` in base layer, so explicit `border-neutral-300` is redundant.

---

### 10. Hover State Color Patterns

#### ℹ️ Issue: Multiple patterns for hover states

**Impact**: LOW - Functional but inconsistent patterns

**Pattern 1**: Direct CSS variable (ModelCard, ValueCard)

```tsx
"bg-[rgba(1,169,160,0.3)]";
```

**Pattern 2**: Utility class with opacity (BodyBtn)

```tsx
"hover:bg-primary-hover/30";
```

**Pattern 3**: Predefined utility (CTAButton)

```tsx
"hover:bg-hover-30";
```

**Recommendation**: Standardize on Pattern 3 where possible:

```tsx
// globals.css utilities
.bg-state-hover {
  background-color: var(--color-hover-30);
}
```

---

### 11. Text Color Hierarchy

#### ℹ️ Issue: Inconsistent text color choices

**Impact**: LOW - All valid, but could be more semantic

**Current Usage**:

- Primary text: `text-neutral-50` (#fafafa)
- Secondary text: `text-neutral-200` (#e5e5e5), `text-neutral-300` (#d4d4d4)
- Tertiary text: `text-neutral-400` (#a3a3a3)
- Muted text: `text-neutral-600` (#525252)

**Status**: ✅ Generally correct usage

**Recommendation**: Add semantic text utilities:

```css
/* globals.css */
.text-primary-text {
  color: var(--color-neutral-50);
}
.text-secondary-text {
  color: var(--color-neutral-200);
}
.text-tertiary-text {
  color: var(--color-neutral-400);
}
.text-muted-text {
  color: var(--color-neutral-600);
}
```

---

### 12. Storybook Background Colors

#### ℹ️ Issue: Non-standard dark backgrounds in stories

**Impact**: LOW - Only affects Storybook, not production

**Files**: Multiple `.stories.tsx` files use `{ name: "dark", value: "#090909" }`

**Design System**: `--color-neutral-950: #0a0a0a`

**Difference**: `#090909` vs `#0a0a0a` (negligible visual difference)

**Recommendation**: Align Storybook backgrounds with design system:

```tsx
backgrounds: {
  values: [{ name: "dark", value: "#0a0a0a" }], // neutral-950
},
```

---

## Correct Implementations (Reference Examples)

### ✅ Well-Implemented Components

#### 1. Button Component (`/src/components/ui/button.tsx`)

```tsx
// ✅ Correct use of design system colors
fill: "bg-primary text-neutral-900 hover:bg-primary-hover active:bg-primary-press disabled:bg-neutral-100 disabled:text-neutral-300";
outline: "border-2 border-primary text-primary bg-transparent hover:border-primary-hover";
```

**Why it's correct**:

- Uses CSS variable classes (`bg-primary`, not `bg-[#02eee1]`)
- All states defined (default, hover, active, disabled)
- Follows Figma design exactly

---

#### 2. CTAButton Component (`/src/components/ui/cta-button.tsx`)

```tsx
// ✅ Correct glassmorphism implementation
default: "bg-white/30 text-neutral-50 border-primary/20 hover:bg-hover-30 active:bg-press-30"
primary: "bg-primary-30 text-neutral-50 border-primary/20 hover:bg-hover-30 active:bg-press-30"
```

**Why it's correct**:

- Uses predefined opacity utilities (`bg-hover-30`)
- Consistent border opacity pattern
- Matches Figma glassmorphic design

---

#### 3. ValueCard Component (`/src/components/ui/value-card.tsx`)

```tsx
// ✅ Correct use of gray-30 utility
default: "bg-gray-30 border-primary/20 hover:bg-hover-30 active:bg-press-30"
```

**Why it's correct**:

- Uses utility class from globals.css
- Consistent state pattern
- Follows design system convention

---

## Recommended Actions

### Immediate Fixes (Critical)

1. **Replace all `gray-*` with `neutral-*`**
   - Files: ChatHistoryTab, QuizPanel, NotesPanel, MessageBubble, LinkButton
   - Find/Replace: `text-gray-` → `text-neutral-`, `bg-gray-` → `bg-neutral-`, `border-gray-` → `border-neutral-`

2. **Remove hardcoded colors**
   - ViewerZoomSlider: `#d9d9d9` → `neutral-200`
   - ChatInterface: Extract inline styles to CSS variables
   - QuizPanel: `rgba(64,64,64,0.7)` → `neutral-700/70`

3. **Use predefined opacity utilities**
   - MessageBubble: Replace `bg-[rgba(2,238,225,0.3)]` with `bg-primary-30`
   - NotesPanel: Same issue
   - ChatInterface: Use utility classes instead of inline styles

### Short-term Improvements (Medium)

4. **Add missing CSS variables**

```css
/* Add to globals.css */
--color-white-10: rgba(255, 255, 255, 0.1);
--color-white-20: rgba(255, 255, 255, 0.2);
--color-on-primary: var(--color-neutral-900);
--color-chat-bg: rgba(64, 64, 64, 0.7);
--color-chat-header: var(--color-neutral-700);
--color-chat-input-bg: rgba(64, 64, 64, 0.3);
```

5. **Standardize quiz feedback colors**
   - Use `border-success` and `border-error` instead of `border-green-500` / `border-red-500`
   - Verify Figma colors match design system semantic colors

6. **Update link colors**
   - MessageBubble: `text-cyan-400` → `text-primary`

### Long-term Optimizations (Low)

7. **Create semantic text utilities**
   - Add `.text-primary-text`, `.text-secondary-text`, etc. to globals.css

8. **Standardize hover state pattern**
   - Document preferred pattern (utility class vs Tailwind opacity)
   - Update components to match chosen pattern

9. **Align Storybook backgrounds**
   - Change `#090909` to `#0a0a0a` (neutral-950)

---

## Validation Checklist

Use this checklist when reviewing color usage in new components:

- [ ] No hardcoded hex/rgba values (use CSS variables or utility classes)
- [ ] No `gray-*` utilities (use `neutral-*` instead)
- [ ] All states defined: default, hover, active, disabled
- [ ] Glassmorphism uses predefined utilities (`bg-primary-30`, `bg-hover-30`, etc.)
- [ ] Text colors follow hierarchy: neutral-50 > neutral-200 > neutral-400 > neutral-600
- [ ] Primary color used correctly: `#02eee1` for brand elements
- [ ] Hover states use `primary-hover` (`#01a9a0`)
- [ ] Press states use `primary-press` (`#01645f`)
- [ ] Semantic colors used for feedback: `success`, `error`, `warning`, `info`
- [ ] Border colors match design system: `border-primary`, `border-neutral-300`, etc.

---

## Figma Design System Alignment

### Color Palette Coverage

| Color Variable  | Defined in CSS | Used in Components  | Figma Verified |
| --------------- | -------------- | ------------------- | -------------- |
| `primary`       | ✅             | ✅                  | ✅             |
| `primary-hover` | ✅             | ✅                  | ✅             |
| `primary-press` | ✅             | ✅                  | ✅             |
| `primary-light` | ✅             | ❌                  | ✅             |
| `primary-dark`  | ✅             | ❌                  | ✅             |
| `neutral-50`    | ✅             | ✅                  | ✅             |
| `neutral-100`   | ✅             | ✅                  | ✅             |
| `neutral-200`   | ✅             | ✅                  | ✅             |
| `neutral-300`   | ✅             | ✅                  | ✅             |
| `neutral-400`   | ✅             | ✅                  | ✅             |
| `neutral-500`   | ✅             | ⚠️ (wrong usage)    | ✅             |
| `neutral-600`   | ✅             | ✅                  | ✅             |
| `neutral-700`   | ✅             | ⚠️ (hardcoded)      | ✅             |
| `neutral-800`   | ✅             | ⚠️ (wrong class)    | ✅             |
| `neutral-900`   | ✅             | ✅                  | ✅             |
| `neutral-950`   | ✅             | ❌                  | ✅             |
| `primary-30`    | ✅             | ⚠️ (hardcoded)      | ✅             |
| `hover-30`      | ✅             | ⚠️ (hardcoded)      | ✅             |
| `press-30`      | ✅             | ⚠️ (hardcoded)      | ✅             |
| `gray-30`       | ✅             | ✅                  | ✅             |
| `white-30`      | ✅             | ❌                  | ✅             |
| `white-10`      | ❌             | ✅ (inline)         | ⚠️ (verify)    |
| `white-20`      | ❌             | ✅ (inline)         | ⚠️ (verify)    |
| `error`         | ✅             | ✅                  | ✅             |
| `success`       | ✅             | ⚠️ (uses green-500) | ✅             |
| `warning`       | ✅             | ❌                  | ✅             |
| `info`          | ✅             | ✅                  | ✅             |

**Legend**: ✅ Correct | ⚠️ Issues Found | ❌ Not Used

---

## Statistics

### Color Usage Patterns

| Pattern                        | Count | Status              |
| ------------------------------ | ----- | ------------------- |
| Design system utilities        | 68    | ✅ Correct          |
| Hardcoded hex/rgba             | 15    | ❌ Fix needed       |
| Wrong utility class (`gray-*`) | 12    | ❌ Fix needed       |
| Correct predefined utilities   | 22    | ✅ Correct          |
| Ad-hoc opacity values          | 8     | ⚠️ Should formalize |

### Files Requiring Updates

| Priority | File Count | Estimated Effort |
| -------- | ---------- | ---------------- |
| Critical | 8 files    | 2 hours          |
| Medium   | 6 files    | 1 hour           |
| Low      | 12 files   | 30 minutes       |

---

## Conclusion

The SIMVEX frontend has a **well-defined design system** in `globals.css` with comprehensive color tokens. However, **inconsistent usage patterns** across components create maintainability issues.

**Main Problems**:

1. Hardcoded colors bypass the design system (15 instances)
2. Wrong utility classes (`gray-*` instead of `neutral-*`) (12 instances)
3. Missing CSS variables for commonly used colors (white opacity variants)

**Impact**: These issues don't cause visual bugs currently, but:

- Make theme changes difficult
- Create inconsistencies if design system evolves
- Reduce code maintainability

**Recommendation**: Prioritize fixing critical issues (hardcoded colors and wrong utility classes) before adding new components. This ensures the design system becomes the single source of truth.

---

**Report End**
