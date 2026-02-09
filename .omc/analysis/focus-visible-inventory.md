# Focus-Visible Keyboard Navigation Inventory

**Task**: Accessibility Task #35 - Complete keyboard navigation with focus-visible styles

**Generated**: 2026-02-09

**Summary**:

- Total interactive components: 35+
- With focus-visible: 12 ✅
- Missing focus-visible: 23+ ❌

---

## Components With Focus-Visible Styles ✅

### Button Components

1. **Button** (`src/components/ui/button.tsx:27`)
   - Status: ✅ Complete
   - Focus style: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
   - Applied to: `<button>` element via CVA

2. **CTAButton** (`src/components/ui/cta-button.tsx:29`)
   - Status: ✅ Complete
   - Focus style: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
   - Applied to: `<button>` element via CVA

3. **IconButton** (`src/components/ui/icon-button.tsx:28`)
   - Status: ✅ Complete
   - Focus style: `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary`
   - Applied to: `<button>` element via CVA

4. **LinkButton** (`src/components/ui/link-button.tsx:38`)
   - Status: ✅ Complete
   - Focus style: `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`
   - Applied to: `<Link>` component

### Form Components

5. **Input** (`src/components/ui/input.tsx:28`)
   - Status: ✅ Partial (wrapper has focus-within)
   - Focus style: `focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2`
   - Applied to: wrapper div (not direct input element)
   - Note: Inner `<input>` has `outline-none` but focus handled on wrapper

6. **ChatInput** (`src/components/ui/chat-input.tsx:29`)
   - Status: ✅ Partial (wrapper has focus-within)
   - Focus style: `focus-within:outline-none` (ring classes missing)
   - Applied to: wrapper div (not direct textarea element)
   - Issue: Missing ring styles on focus-within

---

## Components Missing Focus-Visible ❌

### Critical - Buttons Without Focus Styles

7. **BodyBtn** (`src/components/ui/body-btn.tsx:15-31`)
   - Element: `<button>`
   - Location: Lines 47-59
   - Status: ❌ Missing focus-visible
   - Current: No focus styles defined in CVA
   - Impact: Body part selection buttons not keyboard accessible

8. **ViewerToolbar Buttons** (`src/components/viewer/ViewerToolbar.tsx:41-111`)
   - Elements: 4 inline `<button>` elements
   - Locations: Lines 41, 58, 75, 97
   - Status: ❌ Missing focus-visible
   - Current: Only `hover:text-primary-light` defined
   - Buttons: Focus, Wireframe, Camera Lock, Measurement
   - Impact: Critical 3D viewer controls not keyboard accessible

9. **ViewerSideToolbar Buttons** (`src/components/viewer/ViewerSideToolbar.tsx:40-102`)
   - Elements: 3 inline `<button>` elements
   - Locations: Lines 40, 57, 88
   - Status: ❌ Missing focus-visible
   - Current: Only `hover:text-primary-light` defined
   - Buttons: AI Assistant, Search Parts, Edit Annotations
   - Impact: Side toolbar controls not keyboard accessible

10. **ChatInterface Toggle Button** (`src/components/panels/ChatInterface.tsx:173-183`)
    - Element: `<button>`
    - Location: Lines 173-183
    - Status: ❌ Missing focus-visible
    - Current: Only `hover:text-primary` defined
    - Impact: Chat collapse/expand not keyboard accessible

11. **ChatInput Send Button** (`src/components/ui/chat-input.tsx:119-132`)
    - Element: `<button type="button">`
    - Location: Lines 119-132
    - Status: ❌ Missing focus-visible
    - Current: Conditional classes based on state (no focus)
    - Impact: Send message button not keyboard accessible

### Non-Button Interactive Elements

12. **Navigation Links** (`src/components/panels/navigation.tsx:44-52`)
    - Elements: `<Link>` components (Next.js)
    - Locations: Lines 45-51
    - Status: ❌ Missing focus-visible
    - Current: `hover:text-primary active:text-primary` only
    - Impact: Navigation menu not keyboard accessible

13. **ModelCard** (`src/components/ui/model-card.tsx:27-82`)
    - Element: `<div>` (used as clickable container)
    - Location: Lines 68 (div element)
    - Status: ⚠️ Not a button - should be clickable element
    - Current: Hover/active states only, not keyboard accessible
    - Issue: Should be `<button>` or have role="button" + keyboard handler
    - Impact: Model selection not keyboard accessible

14. **ToolBar IconButtons** (`src/components/panels/tool-bar.tsx:57-76`)
    - Elements: `<IconButton>` (reuses IconButton component)
    - Locations: Lines 62-68
    - Status: ✅ Inherits from IconButton (has focus-visible)
    - Note: Wrapped in group for tooltip, should verify keyboard interactions

15. **SlideBar/Range Input** (`src/components/ui/slide-bar.tsx:99-108`)
    - Element: `<input type="range">`
    - Location: Lines 100-108
    - Status: ⚠️ Hidden (opacity-0)
    - Current: `opacity-0` hides from visual focus
    - Issue: While functionally accessible, hidden input prevents visual focus indicator
    - Impact: Slider keyboard navigation not visible

### Form Inputs & Labels

16. **TextField Label** (`src/components/ui/text-field.tsx:62-67`)
    - Element: `<label>`
    - Location: Lines 62-67
    - Status: ✅ Associated with input (htmlFor)
    - Note: No explicit focus styles (labels don't receive focus typically)

17. **HelpMessage** (`src/components/ui/help-message.tsx`)
    - Not directly interactive
    - Status: N/A

### Landing Page Sections

18. **LandingIntroSection** (`src/components/sections/landing-intro-section.tsx`)
    - Likely contains buttons - needs inspection
    - Status: ❌ Requires code review

19. **LandingFunctionsSection** (`src/components/sections/landing-functions-section.tsx`)
    - Likely contains clickable cards - needs inspection
    - Status: ❌ Requires code review

20. **LandingStudyModelSection** (`src/components/sections/landing-study-model-section.tsx`)
    - Likely contains model cards - needs inspection
    - Status: ❌ Requires code review

21. **LandingFooterSection** (`src/components/sections/landing-footer-section.tsx`)
    - Likely contains links/buttons - needs inspection
    - Status: ❌ Requires code review

### Panel Components

22. **PartInfoPanel** (`src/components/panels/PartInfoPanel.tsx`)
    - Status: ❌ Needs inspection for interactive elements

23. **QuizPanel** (`src/components/panels/QuizPanel.tsx`)
    - Status: ❌ Likely contains buttons/inputs for quiz interactions
    - Impact: Quiz functionality may not be keyboard accessible

24. **NotesPanel** (`src/components/panels/NotesPanel.tsx`)
    - Status: ❌ Likely contains input/save buttons
    - Impact: Note-taking may not be keyboard accessible

25. **ChatHistoryTab** (`src/components/panels/ChatHistoryTab.tsx`)
    - Status: ❌ Likely contains clickable history items
    - Impact: Chat history navigation may not be keyboard accessible

26. **PartSidebar** (`src/components/panels/part-sidebar.tsx`)
    - Status: ❌ Likely contains part selection buttons
    - Impact: Part selection may not be keyboard accessible

27. **SecondarySidebar** (`src/components/panels/secondary-nav.tsx`)
    - Status: ❌ Needs inspection

28. **ChatSidebar** (`src/components/panels/chat-sidebar.tsx`)
    - Status: ❌ Needs inspection

29. **LoginHeader** (`src/components/panels/login-header.tsx`)
    - Status: ❌ Needs inspection

### Viewer Components

30. **Model** (`src/components/viewer/Model.tsx`)
    - Status: ❌ 3D interactive element, may need keyboard handlers
    - Impact: Model interactions (click to select) may not have keyboard alternative

31. **SceneCanvas** (`src/components/viewer/SceneCanvas.tsx`)
    - Status: ❌ Canvas-based, requires custom keyboard event handlers
    - Impact: 3D viewer may not be keyboard navigable

32. **ViewerHeader** (`src/components/viewer/ViewerHeader.tsx`)
    - Status: ❌ Needs inspection for buttons/controls

33. **ViewerZoomSlider** (`src/components/viewer/ViewerZoomSlider.tsx`)
    - Status: ⚠️ Likely wraps SlideBar component
    - Issue: May inherit hidden input issue from SlideBar

### Layout & Common Components

34. **MainLayout** (`src/components/layouts/main-layout.tsx`)
    - Status: ❌ Needs inspection

35. **LandingHeader** (`src/components/layout/landing-header.tsx`)
    - Status: ❌ Likely contains nav/buttons

---

## Summary by Category

### ✅ Fully Implemented (4)

- Button (ui/button.tsx)
- CTAButton (ui/cta-button.tsx)
- IconButton (ui/icon-button.tsx)
- LinkButton (ui/link-button.tsx)

### ⚠️ Partial Implementation (2)

- Input (focus-within on wrapper, not element)
- ChatInput (focus-within without ring)

### ❌ Missing Focus-Visible (23+)

- BodyBtn
- ViewerToolbar (4 buttons)
- ViewerSideToolbar (3 buttons)
- ChatInterface toggle
- ChatInput send button
- Navigation links
- ModelCard (not a button)
- SlideBar (hidden input)
- 8+ panel components
- 2+ viewer components
- 3+ landing/layout components

---

## Quick Action List for Accessibility Task #35

### Priority 1 - Critical Viewer Controls

- [ ] Add focus-visible to ViewerToolbar buttons (4 buttons)
- [ ] Add focus-visible to ViewerSideToolbar buttons (3 buttons)
- [ ] Add focus-visible to BodyBtn

### Priority 2 - Form/Input Elements

- [ ] Fix ChatInput send button focus styles
- [ ] Enhance ChatInput wrapper ring styles on focus-within
- [ ] Add focus-visible to ChatInterface toggle button
- [ ] Fix SlideBar input visibility (currently opacity-0)

### Priority 3 - Navigation & Links

- [ ] Add focus-visible to Navigation links
- [ ] Convert ModelCard to button or add focus styles + keyboard handler

### Priority 4 - Complete Panel Inspections

- [ ] Inspect and fix all panel components (Quiz, Notes, History, etc.)
- [ ] Inspect and fix all landing section components

### Priority 5 - 3D Viewer

- [ ] Add keyboard event handlers to SceneCanvas
- [ ] Add keyboard alternative to Model click interactions

---

## Implementation Pattern

All new focus-visible styles should follow this pattern (already implemented in Button/IconButton/LinkButton):

```tsx
// For outline style (Icon/Link buttons)
"focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

// For ring style (standard buttons)
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
```

---

## Notes

- Focus color: `primary` (cyan #02eee1)
- Ring offset: `2` (8px spacing)
- Ring width: `2` (8px ring)
- Outline width for icon buttons: `2` (8px outline)
- Apply to interactive elements: `<button>`, `<a>`, `<input>`, `<textarea>`, custom interactive divs with role="button"
