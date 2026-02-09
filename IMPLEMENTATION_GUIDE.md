# SIMVEX Frontend - Implementation Guide for Ralph Loop

**Date:** 2026-02-09
**Scope:** Iteration 1/20 - P0 Blockers & Core Interactions
**Total Tasks:** 9 delegated, parallel execution
**Estimated Effort:** 64-86 hours

---

## Quick Reference: Task Dependencies

### Phase 1: Foundation Components (Required first)

These must be completed before other components can integrate them.

```
Task #32: Dialog System (4-6h)
Task #33: Toast System (4-5h)
Task #34: Loading States (3-4h)
    ↓ (blocking)
Task #35: Accessibility Fixes (10-15h)
Task #36-40: Interaction States (parallel)
```

### Phase 2: Interaction States (Can run parallel with Phase 1)

These don't block each other but depend on foundation components.

```
Task #36: Toolbar Interactions (10-15h)
Task #37: Zoom Slider + Header (6-10h)
Task #38: Chat Interactions (8-10h)
Task #40: Part Panel Animations (8-10h)
Task #39: Color + Spacing (5-7h)
```

---

## Task Descriptions & Implementation Details

### Task #32: Dialog/Modal Component System

**Effort:** 4-6 hours
**Owner:** executor-high
**Priority:** P0 CRITICAL

**What to Create:**

- Base Dialog component with shadcn/ui or Radix UI
- ConfirmDialog, SettingsDialog, AlertDialog, HelpDialog variants
- Full keyboard navigation and ARIA support
- Smooth animations (fade/scale, 300ms)

**Files to Create:**

```
src/components/ui/dialog.tsx (main component)
src/components/ui/dialog.stories.tsx (Storybook)
src/lib/hooks/use-dialog.ts (optional hook)
```

**Design System Reference:**

- Colors: neutral-900 (bg), neutral-50 (text), primary (action)
- Animations: 300ms ease-out
- Shadow: shadow-lg
- Border: rounded-lg

**Acceptance Criteria:**
✓ No TypeScript errors
✓ All variants render correctly
✓ Keyboard nav (ESC to close, Tab within)
✓ Focus trap working
✓ Storybook stories complete

---

### Task #33: Toast Notification System

**Effort:** 4-5 hours
**Owner:** executor
**Priority:** P0 CRITICAL

**What to Create:**

- Toast component (single notification)
- ToastProvider component (global state)
- useToast hook (simple API)
- Variants: success, error, info, warning

**Files to Create:**

```
src/components/ui/toast.tsx (display)
src/components/ui/toast-provider.tsx (context)
src/hooks/use-toast.ts (hook)
src/components/ui/toast.stories.tsx (Storybook)
```

**Features:**

- Auto-dismiss after 5s (configurable)
- Multiple toast queue (max 3 visible)
- Position: top-right corner
- Animations: slide in/out 300ms
- ARIA live regions for accessibility

**Usage Example:**

```tsx
const { addToast } = useToast();
addToast("success", "Saved!", "Your changes have been saved", 3000);
```

**Acceptance Criteria:**
✓ Toasts appear and dismiss
✓ Queue management working
✓ Auto-dismiss timer functional
✓ Multiple toasts stack properly
✓ Storybook stories complete

---

### Task #34: Loading Spinner & Skeleton Components

**Effort:** 3-4 hours
**Owner:** executor
**Priority:** P0 CRITICAL

**What to Create:**

- Spinner component (rotating loader)
- Skeleton component (placeholder content)
- ProgressBar component (progress indicator)
- Variants: text, card, avatar, image

**Files to Create:**

```
src/components/ui/spinner.tsx (Spinner + variants)
src/components/ui/skeleton.tsx (Skeleton + variants)
src/components/ui/progress-bar.tsx (ProgressBar)
src/components/ui/*.stories.tsx (Storybook)
```

**Spinner Details:**

- Use Loader2 from lucide-react
- Sizes: sm (24px), md (32px), lg (48px)
- Animation: 2s linear infinite rotation
- Colors: primary, neutral, inherit

**Skeleton Details:**

- Base shimmer animation (2s infinite)
- Variants: SkeletonText, SkeletonCard, SkeletonAvatar
- Configurable dimensions

**Acceptance Criteria:**
✓ All animations smooth
✓ Sizing responsive
✓ No jank or stuttering
✓ Storybook stories complete
✓ Accessible (no screen reader issues)

---

### Task #35: Fix Critical Accessibility Issues

**Effort:** 10-15 hours
**Owner:** executor-high
**Priority:** P0 CRITICAL

**7 Major Fixes Required:**

#### 1. Color Contrast (1h)

- Fix 4 color pairs failing 4.5:1 minimum
- Test with WebAIM contrast checker
- Use design system colors only

#### 2. Keyboard Navigation (3-4h)

- Tab order logical (left-right, top-bottom)
- Arrow keys for sliders/toolbars
- Enter/Space for buttons
- Escape for modals/panels

#### 3. Focus Indicators (2h)

- All focusable elements need visible focus ring
- Pattern: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary`
- Min 2px ring width

#### 4. Touch Target Sizes (1h)

- Minimum 44×44px (currently 30×30px)
- Adjust padding: px-3 py-3 instead of px-1 py-1
- Files: ViewerToolbar, ViewerZoomSlider, ViewerSideToolbar

#### 5. Skip Links (30m)

- Add hidden skip link at top
- Link to #main-content
- Becomes visible on focus

#### 6. Fix Korean aria-labels (30m)

- "분해도 control" → "Explode control"
- "분해도" → "Explode amount"
- All labels in English only

#### 7. Add Main Content Role (30m)

- Wrap primary content in `<main role="main">`

**Files to Modify:**

- src/app/layout.tsx
- src/components/viewer/ViewerToolbar.tsx
- src/components/viewer/ViewerZoomSlider.tsx
- src/components/viewer/ViewerSideToolbar.tsx
- src/components/panels/ChatInterface.tsx
- Landing pages

**Acceptance Criteria:**
✓ Focus indicators visible
✓ Keyboard navigation functional
✓ Color contrast ≥ 4.5:1
✓ Touch targets ≥ 44×44px
✓ Skip links working
✓ No Korean in aria-labels
✓ WCAG 2.1 Level A passing

---

### Task #36: Implement Toolbar Interaction States

**Effort:** 10-15 hours
**Owner:** executor
**Priority:** P1 HIGH

**ViewerToolbar Fixes:**

1. **Active State** (3h)
   - Track which tool is active (Focus, Wireframe, Camera, Measure)
   - Visual: primary-30 background + primary-glow shadow
   - Scale: scale-110

2. **Pressed State** (2h)
   - Use `active:` pseudo-class
   - Scale: scale-95, darker color
   - Smooth transitions: 300ms

3. **Focus State** (1h)
   - ring-2 ring-primary pattern
   - Focus-visible (not focus)

4. **Hover State** (1h)
   - Scale: scale-105, lighter color
   - Transitions: 200ms

**ViewerSideToolbar Fixes:**

1. **Active State** (2h)
   - Track active tool (AI, Search, Edit)
   - Store in Zustand
   - Visual feedback

2. **Rotation-Aware** (2h)
   - Handle toolbar rotation on smaller screens
   - Maintain click targets

3. **Icon Transitions** (1h)
   - Animate icon changes
   - Scale transitions: 200ms

**Files to Modify:**

- src/components/viewer/ViewerToolbar.tsx
- src/components/viewer/ViewerSideToolbar.tsx

**Acceptance Criteria:**
✓ Active state visual feedback clear
✓ Focus visible on all elements
✓ Hover smooth and consistent
✓ No TypeScript errors
✓ Keyboard navigation works
✓ aria-pressed states added

---

### Task #37: Implement Zoom Slider & Header Interaction States

**Effort:** 6-10 hours
**Owner:** executor
**Priority:** P1 HIGH

**ViewerZoomSlider Fixes:**

1. **CRITICAL: Add Plus/Minus Buttons** (2h)
   - Currently missing entirely!
   - Buttons: 44×44px (WCAG minimum)
   - Icons: Minus and Plus from lucide-react
   - Click: decrease/increase zoom by 10%

2. **Slider Interactions** (1h)
   - Thumb hover: scale-125
   - Thumb active: scale-115
   - Track hover: bg-hover-30
   - Focus: ring-2 ring-primary

3. **Value Display** (1h)
   - Show zoom percentage (0-100%)
   - Position: center above slider
   - Update on drag/click

4. **Accessibility** (1h)
   - aria-label: "Zoom slider"
   - aria-valuemin/max/now
   - Keyboard: arrow keys to adjust

**ViewerHeader Fixes:**

1. **Navigation Underline Animation** (1h)
   - Underline appears left-to-right on hover
   - Duration: 300ms
   - Active link: permanent underline + bold

2. **Logo Hover** (30m)
   - Scale: hover:scale-105
   - Smooth: 200ms

3. **Glass Effect** (30m)
   - Fix tint: white/5 (not black/5)
   - Verify blur amount

4. **Link Focus States** (30m)
   - ring-2 ring-primary
   - aria-current="page" for active

**Files to Modify:**

- src/components/viewer/ViewerZoomSlider.tsx
- src/components/layout/ViewerHeader.tsx

**Acceptance Criteria:**
✓ Plus/minus buttons functional
✓ Slider fully operable (mouse + keyboard)
✓ Zoom percentage displays
✓ Navigation animations smooth
✓ Focus indicators visible
✓ No TypeScript errors

---

### Task #38: Implement Chat Interface Interactions & Animations

**Effort:** 8-10 hours
**Owner:** executor
**Priority:** P1 HIGH

**ChatInterface Fixes:**

1. **Message Animations** (2h)
   - Slide in from bottom + fade
   - Duration: 300ms
   - Stagger: 100ms between messages

2. **Typing Indicator** (1h)
   - Show "Assistant is typing..."
   - Animated dots: 600ms cycle
   - Below last assistant message

3. **Send Button Feedback** (1h)
   - Disabled while sending
   - Show spinner
   - Hover/press states

4. **Scroll Behavior** (1h)
   - Auto-scroll to newest message
   - Smooth: 300ms
   - Don't force scroll if user scrolled up

5. **Focus Management** (1h)
   - Focus input after send
   - Clear input
   - Show feedback

6. **Input Feedback** (1h)
   - Character count
   - Disable if empty
   - Focus ring

**MessageBubble Fixes:**

1. **Hover Effects** (1h)
   - Show timestamp
   - Show copy/delete buttons
   - Transitions: 200ms

2. **Code Block** (30m)
   - Copy button
   - Syntax highlighting
   - Scrollable

**Files to Modify:**

- src/components/panels/ChatInterface.tsx
- src/components/ui/MessageBubble.tsx

**Acceptance Criteria:**
✓ Animations smooth
✓ Typing indicator working
✓ Button feedback clear
✓ Auto-scroll functional
✓ Focus management proper
✓ No TypeScript errors

---

### Task #39: Fix Color System & Spacing Consistency

**Effort:** 5-7 hours
**Owner:** executor
**Priority:** P1 HIGH

**Color System Fixes:**

1. **Replace Hardcoded Colors** (1.5h)
   - ChatInterface: rgba(64,64,64,0.7) → design system
   - ViewerZoomSlider: #d9d9d9 → neutral-200
   - Grep for #[hex] patterns
   - Replace with CSS variables or Tailwind

2. **Gray → Neutral** (1h)
   - Replace all gray-_ with neutral-_
   - Design system uses neutral, not gray
   - Example: gray-100 → neutral-100

3. **Opacity Variants** (1h)
   - Add: white-10, white-20, white-30, etc.
   - Use in glassmorphism and overlays

**Spacing Consistency:**

1. **Standardize Patterns** (2h)
   - Use arbitrary pixel values consistently
   - Pattern: px-[80px] (not p-2, p-4)
   - All spacing scales at 75% on 1440px

2. **Fix 1440px Scaling** (1h)
   - Test at 1440px with 75% zoom
   - Ensure arbitrary values used

**Glassmorphism Fixes:**

1. **ChatInterface** (30m)
   - Wrong background and blur
   - Reference Figma spec

2. **QuizPanel** (20m)
   - Missing backdrop blur
   - Add white/5 background

3. **ViewerHeader** (10m)
   - Fix tint to white/5

**Files to Modify:**

- Multiple components (search for hardcoded colors)
- src/app/globals.css
- tailwind.config.ts

**Acceptance Criteria:**
✓ No hardcoded colors
✓ All gray-\* replaced
✓ Spacing consistent
✓ 1440px scaling works
✓ Glassmorphism accurate
✓ No TypeScript errors

---

### Task #40: Implement Part Info Panel Animations & States

**Effort:** 8-10 hours
**Owner:** executor
**Priority:** P1 HIGH

**PartInfoPanel Fixes:**

1. **Entrance/Exit Animations** (1.5h)
   - Slide in from right: 300ms
   - Slide out: 300ms
   - Scale effect: 95% → 100%
   - Backdrop fade

2. **Border Glow** (1h)
   - Active state: primary-glow
   - Shadow: subtle, animated
   - Fade in/out: 600ms

3. **Icon Interactions** (1h)
   - Close button: scale on hover
   - All icons: scale-110 on hover
   - Smooth: 200ms

4. **Loading Animation** (1h)
   - Show spinner while loading
   - Skeleton content
   - Fade out when ready

5. **Error State** (1h)
   - Error icon + message
   - Shake animation (keyframe)
   - Retry button prominent

6. **Content Reveal** (30m)
   - Staggered entrance
   - Fade + slide-up per item
   - Stagger: 50ms

7. **Collapse/Expand** (1h)
   - Toggle sections
   - Chevron rotation
   - Smooth slide: 300ms

**Accessibility:**

1. **Focus Management** (30m)
   - Trap focus within panel
   - Return focus on close

2. **ARIA Attributes** (30m)
   - role="complementary"
   - aria-label, aria-hidden, aria-expanded

**Files to Modify:**

- src/components/panels/PartInfoPanel.tsx

**Acceptance Criteria:**
✓ Animations smooth
✓ Loading/error states clear
✓ Focus management proper
✓ Fully accessible
✓ Mobile responsive
✓ No TypeScript errors

---

## Implementation Checklist

### Phase 1: Foundation (Required First)

- [ ] Task #32: Dialog System complete
  - [ ] Base component implemented
  - [ ] All variants working
  - [ ] Storybook stories created
  - [ ] No TypeScript errors

- [ ] Task #33: Toast System complete
  - [ ] Toast + Provider + Hook implemented
  - [ ] Queue management working
  - [ ] All variants styled
  - [ ] Storybook stories created

- [ ] Task #34: Loading States complete
  - [ ] Spinner, Skeleton, ProgressBar
  - [ ] All animations smooth
  - [ ] Storybook stories created

### Phase 2: Accessibility (Critical Path)

- [ ] Task #35: Accessibility complete
  - [ ] All focus indicators visible
  - [ ] Keyboard nav fully functional
  - [ ] Color contrast passing
  - [ ] Touch targets 44×44px
  - [ ] WCAG 2.1 Level A passing

### Phase 3: Interactions (Parallel)

- [ ] Task #36: Toolbar interactions complete
  - [ ] Active states implemented
  - [ ] All buttons have proper states
  - [ ] Keyboard nav working

- [ ] Task #37: Zoom slider + header complete
  - [ ] Plus/minus buttons added
  - [ ] Slider fully functional
  - [ ] Header animations smooth

- [ ] Task #38: Chat interactions complete
  - [ ] Message animations working
  - [ ] Typing indicator present
  - [ ] All states working

- [ ] Task #40: Part panel animations complete
  - [ ] Entrance/exit animations
  - [ ] Loading/error states
  - [ ] Collapse/expand working

### Phase 4: Design System

- [ ] Task #39: Color + spacing complete
  - [ ] No hardcoded colors
  - [ ] Spacing consistent
  - [ ] 1440px scaling working
  - [ ] Glassmorphism accurate

### Final Verification

- [ ] All tasks completed
- [ ] No TypeScript errors
- [ ] No console warnings
- [ ] All accessibility tests passing
- [ ] Visual QA on modified components
- [ ] Mobile responsiveness verified

---

## Git Commit Strategy

After each task completes, create an atomic commit:

```bash
# Task #32
git add src/components/ui/dialog.*
git commit -m "feat(ui): add dialog/modal component system with variants"

# Task #33
git add src/components/ui/toast.* src/hooks/use-toast.ts
git commit -m "feat(ui): add toast notification system with queue management"

# Task #34
git add src/components/ui/spinner.tsx src/components/ui/skeleton.tsx src/components/ui/progress-bar.tsx
git commit -m "feat(ui): add loading spinners and skeleton components"

# Task #35
git add src/components/viewer/ src/components/layout/ src/app/layout.tsx
git commit -m "fix(a11y): fix critical WCAG 2.1 accessibility issues - keyboard nav, focus, contrast, touch targets"

# Task #36
git add src/components/viewer/ViewerToolbar.tsx src/components/viewer/ViewerSideToolbar.tsx
git commit -m "feat(viewer): add toolbar interaction states - active, hover, focus, press"

# Task #37
git add src/components/viewer/ViewerZoomSlider.tsx src/components/layout/ViewerHeader.tsx
git commit -m "feat(viewer): implement zoom slider buttons and header animations"

# Task #38
git add src/components/panels/ChatInterface.tsx src/components/ui/MessageBubble.tsx
git commit -m "feat(chat): add message animations, typing indicator, and interaction states"

# Task #40
git add src/components/panels/PartInfoPanel.tsx
git commit -m "feat(panels): add part info panel animations and state transitions"

# Task #39
git add src/components/ src/app/globals.css tailwind.config.ts
git commit -m "fix(design): standardize color system and spacing consistency"
```

---

## Estimated Timeline

- **Phase 1 (Foundation):** 11-15 hours (can start immediately)
- **Phase 2 (Accessibility):** 10-15 hours (can overlap with Phase 1)
- **Phase 3 (Interactions):** 32-43 hours (parallel execution)
- **Phase 4 (Design):** 5-7 hours (can overlap)

**Total Iteration 1:** ~64-86 hours
**Recommended Duration:** 1-2 weeks with team of 3-4 developers

---

## Success Criteria

After Iteration 1 completes, the project should:

✅ Have zero P0 blockers remaining
✅ Have 80+ interaction states implemented
✅ Pass WCAG 2.1 Level A accessibility
✅ Have all components keyboard accessible
✅ Have consistent animations throughout
✅ Use design system colors exclusively
✅ Have responsive spacing working at 1440px
✅ Have Storybook stories for all new components

---

## Next Steps (Iteration 2)

After verification:

1. Review all changes
2. Run accessibility audit (WAVE, Lighthouse)
3. Visual QA on all modified components
4. Plan Iteration 2: Missing components (Form controls, Dropdown, Tooltip)

---

**Document Updated:** 2026-02-09
**Status:** Ready for execution
**Owner:** Ralph Loop Orchestration
