# PartInfoPanel Component - Figma Interaction Analysis

**Component:** `/src/components/panels/PartInfoPanel.tsx`
**Figma Reference:** Node 232-967 (side bar-if click part)
**Analysis Date:** 2026-02-09

---

## Executive Summary

The PartInfoPanel component implements the basic structure and static styling from Figma but is **missing all interactive states and animations** that would make the component feel polished and production-ready. The panel currently has minimal transitions and no micro-interactions.

**Completion Status:** ⚠️ **40% Complete**

- ✅ Structure & Layout: Complete
- ✅ Static Styling: Complete
- ❌ Entrance/Exit Animations: Missing
- ❌ Hover Effects: Missing
- ❌ Border Glow Effects: Missing
- ⚠️ Loading States: Partial (no animations)
- ⚠️ Glassmorphism: Partial (needs refinement)

---

## 1. Panel Entrance/Exit Animations

### Status: ❌ **MISSING**

**Current Implementation:**

```tsx
// Line 35: Only basic transition
transition-all duration-300
```

**Issues:**

- No entrance animation when `selectedObject` becomes truthy
- Panel immediately appears without slide-in or fade-in
- No exit animation when panel unmounts
- Abrupt `null` return (line 29-31) causes instant disappearance

**Required Figma Behavior:**

- Slide in from right with 400ms ease-out cubic-bezier
- Fade in opacity 0 → 1 simultaneously
- Scale effect: 0.95 → 1 for depth perception
- Exit: Reverse animation with 300ms duration
- Stagger child animations (icon, title, content boxes)

**Recommended Implementation:**

```tsx
import { motion, AnimatePresence } from "framer-motion";

<AnimatePresence>
  {selectedObject && (
    <motion.aside
      initial={{ x: 50, opacity: 0, scale: 0.95 }}
      animate={{ x: 0, opacity: 1, scale: 1 }}
      exit={{ x: 50, opacity: 0, scale: 0.95 }}
      transition={{
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // ease-out cubic
      }}
    >
      {/* Content with stagger */}
    </motion.aside>
  )}
</AnimatePresence>;
```

---

## 2. Loading State Styling Accuracy

### Status: ⚠️ **PARTIAL - Missing Animations**

**Current Implementation:**

```tsx
// Lines 57-60, 92-95: Static text only
<p className="font-medium text-[16px] leading-[1.5] text-neutral-400 text-center">
  Loading...
</p>
```

**Issues:**

- No loading animation (spinner, pulse, skeleton)
- Generic "Loading..." text lacks visual feedback
- No indication of progress or activity
- Color `text-neutral-400` may be too dim against glassmorphism background

**Required Figma Behavior:**

- Pulsing skeleton loader matching content box shape
- Animated gradient shimmer effect
- Loading dots animation: "Loading" → "Loading." → "Loading.." → "Loading..."
- Subtle pulse on entire content box border

**Recommended Implementation:**

```tsx
{loading ? (
  <div className="w-full h-full flex items-center justify-center">
    {/* Skeleton Loader */}
    <div className="w-full space-y-3 animate-pulse">
      <div className="h-4 bg-primary/20 rounded-full w-3/4 mx-auto" />
      <div className="h-4 bg-primary/20 rounded-full w-1/2 mx-auto" />
    </div>

    {/* OR: Animated Loading Text */}
    <motion.p
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ repeat: Infinity, duration: 1.5 }}
      className="font-medium text-[16px] text-primary"
    >
      Loading<LoadingDots />
    </motion.p>
  </div>
) : ...}
```

---

## 3. Error State Styling

### Status: ⚠️ **PARTIAL - Needs Enhancement**

**Current Implementation:**

```tsx
// Lines 61-64, 96-99: Basic error text
<p className="font-medium text-[16px] leading-[1.5] text-red-400 text-center">
  {error}
</p>
```

**Issues:**

- No error icon or visual indicator
- No retry button or action
- `text-red-400` may clash with cyan/teal theme
- No animation to draw attention to error
- Error text truncation not handled

**Required Figma Behavior:**

- Warning icon with shake animation on appearance
- Error message with fade-in animation
- Red border glow on content box (replacing cyan)
- Retry button with hover effect
- Theme-consistent error color (use design system)

**Recommended Implementation:**

```tsx
{error ? (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex flex-col items-center gap-4"
  >
    {/* Error Icon with Shake */}
    <motion.div
      animate={{ x: [-2, 2, -2, 2, 0] }}
      transition={{ duration: 0.4 }}
    >
      <AlertCircleIcon className="w-8 h-8 text-destructive" />
    </motion.div>

    {/* Error Message */}
    <p className="font-medium text-[14px] text-destructive text-center">
      {error}
    </p>

    {/* Retry Button */}
    <button
      onClick={refetch}
      className="px-4 py-2 bg-primary/20 hover:bg-primary/30 rounded-lg
                 text-primary text-sm font-medium transition-colors"
    >
      Try Again
    </button>
  </motion.div>
) : ...}
```

---

## 4. Icon Hover Effects

### Status: ❌ **MISSING**

**Current Implementation:**

```tsx
// Lines 43-48, 78-83: Static images only
<Image
  src="/icons/ai-assistant.svg"
  alt="AI Assistant"
  width={40}
  height={40}
  className="shrink-0"
/>
```

**Issues:**

- No hover state
- No interactive feedback
- Icons are decorative but could enhance UX
- Missing cursor pointer if icons are clickable

**Required Figma Behavior:**

- Hover: Scale 1.1 with 200ms ease
- Glow effect: Cyan shadow on hover
- Rotation animation: Subtle tilt (2-3 degrees)
- Active state: Scale 0.95 on click
- Tooltip on hover showing section purpose

**Recommended Implementation:**

```tsx
<motion.div
  whileHover={{ scale: 1.1, rotate: 3 }}
  whileTap={{ scale: 0.95 }}
  className="relative cursor-pointer"
  onHoverStart={() => setShowTooltip(true)}
  onHoverEnd={() => setShowTooltip(false)}
>
  <Image
    src="/icons/ai-assistant.svg"
    alt="AI Assistant"
    width={40}
    height={40}
    className="shrink-0 transition-filter duration-200
               hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]"
  />

  {/* Tooltip */}
  <AnimatePresence>
    {showTooltip && (
      <motion.div
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        className="absolute -top-10 left-1/2 -translate-x-1/2
                   bg-gray-900 text-white text-xs px-2 py-1 rounded"
      >
        AI Assistant
      </motion.div>
    )}
  </AnimatePresence>
</motion.div>
```

---

## 5. Border Glow Effects

### Status: ❌ **MISSING**

**Current Implementation:**

```tsx
// Lines 35, 56, 91: Static borders only
border-[3px] border-solid border-primary
```

**Issues:**

- No glow/shadow on border
- No hover intensity change
- No selection highlight effect
- Border feels flat without depth

**Required Figma Behavior:**

- Default: Subtle cyan glow (box-shadow: 0 0 12px cyan-500/30)
- Hover: Intensify glow (box-shadow: 0 0 20px cyan-500/50)
- Active section: Brighter glow + animated pulse
- Smooth transition between states (300ms)

**Recommended Implementation:**

```tsx
// Parent panel (line 35)
<aside
  className="... border-primary
             shadow-[0_0_12px_rgba(6,182,212,0.3)]
             hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]
             transition-shadow duration-300"
>

// Content boxes (lines 56, 91) - Add interactive glow
<div
  className="... border-primary
             shadow-[0_0_8px_rgba(6,182,212,0.2)]
             hover:shadow-[0_0_16px_rgba(6,182,212,0.4)]
             transition-all duration-300
             cursor-pointer"
  onMouseEnter={() => setHoveredBox('ai')}
  onMouseLeave={() => setHoveredBox(null)}
>
```

**Additional: Animated Pulse Effect for Active States**

```css
@keyframes glow-pulse {
  0%,
  100% {
    box-shadow: 0 0 12px rgba(6, 182, 212, 0.3);
  }
  50% {
    box-shadow: 0 0 24px rgba(6, 182, 212, 0.6);
  }
}

/* Apply when loading or active */
.glow-pulse {
  animation: glow-pulse 2s ease-in-out infinite;
}
```

---

## 6. Glassmorphism Accuracy

### Status: ⚠️ **PARTIAL - Needs Refinement**

**Current Implementation:**

```tsx
// Line 35: Basic implementation
bg-gray-30 rounded-[24px] backdrop-blur-sm
```

**Analysis:**

- ✅ Backdrop blur present
- ❌ Missing background noise/texture
- ❌ Inner glow/rim light effect absent
- ❌ Layered transparency not implemented
- ❌ No subtle gradient overlay

**Figma Specification:**

- Background: `rgba(212, 212, 212, 0.3)` with backdrop-blur(10px)
- Noise texture overlay: 2-3% opacity for depth
- Inner border highlight: 1px white at 10% opacity on top edge
- Gradient overlay: Subtle radial from center (light → transparent)
- Multiple backdrop layers for depth

**Required CSS Variables (check `globals.css`):**

```css
/* Ensure these exist in Tailwind config */
--glass-bg: rgba(212, 212, 212, 0.3);
--glass-blur: 10px;
--glass-noise: url("/textures/noise.png");
```

**Recommended Implementation:**

```tsx
<aside
  className="relative ... bg-[rgba(212,212,212,0.3)] backdrop-blur-[10px]"
  style={{
    backgroundImage: `
      radial-gradient(circle at 50% 30%, rgba(255,255,255,0.1) 0%, transparent 60%),
      url('/textures/noise.png')
    `,
    backgroundSize: "cover, 100px 100px",
    backgroundBlend: "overlay",
  }}
>
  {/* Inner rim light */}
  <div
    className="absolute inset-0 rounded-[24px]
                  border-t border-white/10 pointer-events-none"
  />

  {/* Content */}
  {children}
</aside>
```

**Missing Asset:**

- Create or download: `/public/textures/noise.png` (seamless noise pattern)

---

## 7. Content Box Hover Effects

### Status: ❌ **MISSING**

**Current Implementation:**

```tsx
// Lines 56, 91: No hover styles
<div className="w-full h-[250px] bg-gray-30 border-[3px] border-primary rounded-[24px]...">
```

**Issues:**

- Content boxes are static, no feedback on hover
- No indication they could be interactive
- Missed opportunity for micro-interactions

**Required Figma Behavior:**

- Hover: Lift effect (translateY: -2px)
- Background brightening: bg opacity 0.3 → 0.4
- Border glow intensifies (see section 5)
- Scale: 1.0 → 1.01 (subtle growth)
- Cursor changes to pointer if clickable
- Smooth 200ms transition

**Recommended Implementation:**

```tsx
<motion.div
  className="w-full h-[250px] bg-gray-30 border-[3px] border-primary rounded-[24px]
             shadow-[0_0_8px_rgba(6,182,212,0.2)]
             transition-all duration-200 cursor-pointer"
  whileHover={{
    y: -2,
    scale: 1.01,
    boxShadow: "0 0 16px rgba(6,182,212,0.4)",
    backgroundColor: "rgba(212,212,212,0.4)",
  }}
  whileTap={{ scale: 0.99 }}
>
  {/* Content */}
</motion.div>
```

---

## 8. Missing Micro-Interactions

### Additional Opportunities Not in Current Code

#### 8.1 Staggered Content Reveal

**Description:** When panel enters, animate children sequentially instead of simultaneously.

```tsx
<motion.div variants={containerVariants} initial="hidden" animate="visible">
  <motion.div variants={itemVariants}>{/* AI Assistant */}</motion.div>
  <motion.div variants={itemVariants}>{/* Part Info */}</motion.div>
</motion.div>;

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};
```

#### 8.2 Text Transitions

**Description:** Content text should fade/slide when changing, not jump instantly.

```tsx
<AnimatePresence mode="wait">
  <motion.p
    key={partData?.description || "default"}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.2 }}
  >
    {content}
  </motion.p>
</AnimatePresence>
```

#### 8.3 Focus States (Accessibility)

**Description:** Keyboard navigation should show clear focus indicators.

```tsx
// Add to content boxes
className="... focus:ring-2 focus:ring-primary focus:ring-offset-2
           focus:outline-none focus:shadow-[0_0_20px_rgba(6,182,212,0.6)]"
tabIndex={0}
```

#### 8.4 Empty State Animation

**Description:** When no data, show animated empty state instead of plain text.

```tsx
{
  !partData && !loading && !error && (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex flex-col items-center gap-3"
    >
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <SearchIcon className="w-12 h-12 text-primary/50" />
      </motion.div>
      <p className="text-neutral-400 text-sm">No data available</p>
    </motion.div>
  );
}
```

---

## 9. Performance Considerations

### Current Issues

- ❌ No animation optimization (will-change property)
- ❌ No GPU acceleration hints
- ❌ Re-renders on every store update (needs memoization)

### Recommendations

```tsx
// Add to animated elements
style={{ willChange: 'transform, opacity' }}

// Memoize expensive renders
const MemoizedContentBox = React.memo(ContentBox);

// Use CSS transforms (GPU-accelerated) instead of position changes
transform: translateY(-2px)  // ✅ Good
top: -2px                    // ❌ Slower
```

---

## 10. Implementation Priority

### Phase 1: Critical (Complete First) 🔴

1. **Panel Entrance/Exit Animations** - Core UX, most noticeable missing piece
2. **Border Glow Effects** - Defines visual language, matches Figma
3. **Loading State Animations** - User feedback during API calls

### Phase 2: Important (Next) 🟡

4. **Content Box Hover Effects** - Polish and interactivity
5. **Glassmorphism Refinement** - Visual depth and premium feel
6. **Error State Enhancement** - Better error handling UX

### Phase 3: Nice-to-Have (Polish) 🟢

7. **Icon Hover Effects** - Micro-interactions, delight
8. **Staggered Content Reveal** - Attention to detail
9. **Focus States** - Accessibility compliance

---

## 11. Dependencies Required

### New Packages

```bash
# Framer Motion (if not installed)
npm install framer-motion

# Lucide React (for icons)
npm install lucide-react
```

### Assets Needed

- `/public/textures/noise.png` - Glassmorphism texture
- Icon hover states (if using custom SVGs)

---

## 12. Code Smell Analysis

### Current Issues

1. **Line 68:** Korean text in error fallback - should be internationalized or English
2. **Lines 57-60, 92-95:** Duplicated loading/error logic - should be extracted to component
3. **No prop types/TypeScript interfaces** - Component lacks type safety for future extensions
4. **Magic numbers:** 400px, 750px, 250px hardcoded - should use design tokens

### Suggested Refactor

```tsx
// Extract shared components
<LoadingState />
<ErrorState error={error} onRetry={refetch} />
<EmptyState />

// Use design tokens
const PANEL_WIDTH = 400;
const PANEL_HEIGHT = 750;
const CONTENT_BOX_HEIGHT = 250;
```

---

## 13. Testing Checklist

### Manual Testing Required

- [ ] Panel animates smoothly when part is selected
- [ ] Panel exits smoothly when part is deselected
- [ ] Loading states show animation, not static text
- [ ] Error states show icon + retry button
- [ ] Hover on icons triggers scale + glow
- [ ] Content boxes lift on hover
- [ ] Border glow is visible against dark backgrounds
- [ ] Glassmorphism effect shows blur + texture
- [ ] Keyboard navigation works (Tab key)
- [ ] Focus indicators are visible

### Browser Testing

- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (webkit-specific bugs)
- [ ] Mobile viewport (responsive scaling)

---

## 14. Accessibility Gaps

### Current Issues

- ❌ No focus management when panel appears
- ❌ No ARIA live region for loading/error announcements
- ❌ Icons lack interactive role if clickable
- ❌ No keyboard shortcuts for common actions

### Required Fixes

```tsx
// Add ARIA live region
<div role="status" aria-live="polite" aria-atomic="true">
  {loading && "Loading part information"}
  {error && `Error: ${error}`}
</div>;

// Focus management
useEffect(() => {
  if (selectedObject) {
    panelRef.current?.focus();
  }
}, [selectedObject]);

// Keyboard shortcuts
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "Escape") closePanel();
  };
  window.addEventListener("keydown", handleKeyPress);
  return () => window.removeEventListener("keydown", handleKeyPress);
}, []);
```

---

## 15. Final Recommendations

### Immediate Actions (Next 2 Hours)

1. Install Framer Motion: `npm install framer-motion`
2. Implement entrance/exit animations (30 min)
3. Add border glow effects with CSS (20 min)
4. Create loading spinner component (30 min)
5. Test on 1920px and 1440px viewports (20 min)

### Short-Term (Next Session)

6. Refine glassmorphism (add noise texture)
7. Implement all hover effects
8. Extract duplicated loading/error logic
9. Add icon interactions
10. Accessibility audit

### Long-Term (Before Ship)

11. Storybook stories for all states
12. Unit tests for interaction logic
13. Performance profiling (React DevTools)
14. Cross-browser testing
15. Figma design QA review

---

## Conclusion

The PartInfoPanel component has **solid structural foundations** but lacks the **interactive polish** that distinguishes a production-ready component from a prototype. The missing animations, hover effects, and state transitions make the component feel static and unfinished.

**Estimated Time to Complete:**

- Phase 1 (Critical): 3-4 hours
- Phase 2 (Important): 2-3 hours
- Phase 3 (Polish): 2 hours
- **Total:** ~8 hours of focused development

**Priority:** HIGH - This is a primary interaction surface, visible on every part selection.

---

**Report Generated By:** Claude Code Designer Agent
**Review Status:** Ready for Implementation
**Next Step:** Begin Phase 1 implementation with Framer Motion integration
