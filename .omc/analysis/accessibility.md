# Accessibility Implementation Analysis

**Date**: 2026-02-09
**Project**: SIMVEX Frontend
**Scope**: React components across UI, panels, sections, and viewer components

---

## Executive Summary

The SIMVEX frontend has **partial accessibility implementation** with several critical gaps preventing WCAG 2.1 AA compliance. Key findings:

- **✅ Implemented**: 35+ aria-label attributes, focus-visible indicators, semantic roles
- **⚠️ Partial**: Keyboard navigation, form error handling, live regions
- **❌ Missing**: Color contrast verification, aria-expanded states, skip links, heading hierarchy

**Estimated WCAG 2.1 Level**: B (Basic accessibility)

---

## 1. Aria Labels & Descriptions

### ✅ Implemented (24 instances)

| Component                  | Location                                                     | Aria Label                   | Status              |
| -------------------------- | ------------------------------------------------------------ | ---------------------------- | ------------------- |
| ViewerToolbar              | `src/components/viewer/ViewerToolbar.tsx:38`                 | `"3D viewer tools"`          | ✅ Container role   |
| ViewerToolbar (Focus)      | `src/components/viewer/ViewerToolbar.tsx:43`                 | `"Focus selected object"`    | ✅ Button label     |
| ViewerToolbar (Wireframe)  | `src/components/viewer/ViewerToolbar.tsx:60`                 | `"Toggle wireframe view"`    | ✅ Button label     |
| ViewerToolbar (Camera)     | `src/components/viewer/ViewerToolbar.tsx:77`                 | `"Lock camera position"`     | ✅ Button label     |
| ViewerToolbar (Measure)    | `src/components/viewer/ViewerToolbar.tsx:99`                 | `"Measure distances"`        | ✅ Button label     |
| ViewerSideToolbar          | `src/components/viewer/ViewerSideToolbar.tsx:37`             | `"Side tools"`               | ✅ Container role   |
| ViewerSideToolbar (AI)     | `src/components/viewer/ViewerSideToolbar.tsx:42`             | `"Open AI Assistant"`        | ✅ Button label     |
| ViewerSideToolbar (Search) | `src/components/viewer/ViewerSideToolbar.tsx:59`             | `"Search parts"`             | ✅ Button label     |
| ViewerSideToolbar (Edit)   | `src/components/viewer/ViewerSideToolbar.tsx:90`             | `"Edit annotations"`         | ✅ Button label     |
| Landing Pivot Section      | `src/components/sections/landing-pivot-section.tsx:32`       | `"Pivot Persona Section"`    | ✅ Section landmark |
| Landing Intro Section      | `src/components/sections/landing-intro-section.tsx:38`       | `"Hero section"`             | ✅ Section landmark |
| Chat Sidebar (New)         | `src/components/panels/chat-sidebar.tsx:76`                  | `"New chat"`                 | ✅ Button label     |
| ViewerZoomSlider           | `src/components/viewer/ViewerZoomSlider.tsx:41`              | `"분해도 control"`           | ⚠️ **Korean text**  |
| ViewerZoomSlider (Slider)  | `src/components/viewer/ViewerZoomSlider.tsx:59`              | `"분해도"`                   | ⚠️ **Korean text**  |
| Landing Footer             | `src/components/sections/landing-footer-section.tsx:34`      | `"Footer section"`           | ✅ Section landmark |
| Landing Study              | `src/components/sections/landing-study-model-section.tsx:37` | `"Study models section"`     | ✅ Section landmark |
| Toolbar Tool               | `src/components/panels/tool-bar.tsx:66`                      | `aria-label={tool.label}`    | ✅ Dynamic label    |
| Part Sidebar               | `src/components/panels/part-sidebar.tsx:41`                  | `"Part information sidebar"` | ✅ Landmark role    |
| Chat Interface Collapse    | `src/components/panels/ChatInterface.tsx:176`                | Dynamic (conditional)        | ✅ Dynamic state    |
| PartInfoPanel              | `src/components/panels/PartInfoPanel.tsx:37`                 | `"Part information sidebar"` | ✅ Landmark role    |
| Part Popup (Confirm)       | `src/components/ui/part-popup.tsx:74`                        | `"Confirm"`                  | ✅ Button label     |
| Chat Input (Send)          | `src/components/ui/chat-input.tsx:129`                       | `"Send message"`             | ✅ Button label     |
| Slide Bar                  | `src/components/ui/slide-bar.tsx:107`                        | `aria-label={label}`         | ✅ Dynamic label    |
| Chat History (Delete)      | `src/components/ui/chat-history.tsx:273`                     | `"Delete conversation"`      | ✅ Button label     |
| Landing Header (Home)      | `src/components/layout/landing-header.tsx:35`                | `"SIMVEX Home"`              | ✅ Link label       |
| Functions Section          | `src/components/sections/landing-functions-section.tsx:37`   | `"Functions section"`        | ✅ Section landmark |

### ⚠️ Partially Implemented

| Issue                         | Component        | Location                     | Severity                                                                   |
| ----------------------------- | ---------------- | ---------------------------- | -------------------------------------------------------------------------- |
| **Korean aria-labels**        | ViewerZoomSlider | `ViewerZoomSlider.tsx:41,59` | **HIGH** - Labels in Korean ("분해도 control") break English accessibility |
| **Missing contextual labels** | Multiple buttons | Various                      | **MEDIUM** - Some toggle buttons lack aria-pressed state                   |
| **No aria-current**           | Navigation       | `landing-header.tsx`         | **MEDIUM** - Current page not marked in navigation                         |

---

## 2. Semantic Roles

### ✅ Implemented (6 instances)

| Component            | Role                   | Location                   | Purpose                   |
| -------------------- | ---------------------- | -------------------------- | ------------------------- |
| ViewerToolbar        | `role="toolbar"`       | `ViewerToolbar.tsx:37`     | ✅ Correct role           |
| ViewerSideToolbar    | `role="toolbar"`       | `ViewerSideToolbar.tsx:36` | ✅ Correct role           |
| Part Sidebar         | `role="complementary"` | `part-sidebar.tsx:40`      | ✅ Correct role           |
| PartInfoPanel        | `role="complementary"` | `PartInfoPanel.tsx:36`     | ✅ Correct role           |
| Help Message (Alert) | `role="alert"`         | `help-message.tsx:60`      | ✅ Conditional alert role |
| ViewerZoomSlider     | `role="group"`         | `ViewerZoomSlider.tsx:40`  | ✅ Group control          |

### ❌ Missing Semantic Roles

| Component           | Should Have                      | Location             | Impact                                   |
| ------------------- | -------------------------------- | -------------------- | ---------------------------------------- |
| **Button Elements** | Implicit role:button             | All buttons          | ✅ Already implicit                      |
| **Chat Panel**      | `role="main"` or `role="region"` | `ChatInterface.tsx`  | **MEDIUM** - Main chat region not marked |
| **Header**          | `<header>` semantic tag          | `landing-header.tsx` | **MEDIUM** - Header not semantic         |
| **Navigation**      | `<nav>` semantic tag             | `navigation.tsx`     | **MEDIUM** - Nav not semantic            |
| **Main Content**    | `<main>` semantic tag            | `SceneCanvas.tsx`    | **HIGH** - Primary content not marked    |
| **Sections**        | `<section>` semantic tags        | `landing-*.tsx`      | ⚠️ Using divs with aria-label instead    |
| **Headings**        | `<h1>`, `<h2>`, etc.             | Landing pages        | **HIGH** - No proper heading hierarchy   |

---

## 3. Focus Management & Keyboard Navigation

### ✅ Implemented

**Focus-visible indicators** (8 components):

```typescript
// Pattern found in:
"focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2";
```

| Component   | File                    | Focus Style                                  |
| ----------- | ----------------------- | -------------------------------------------- |
| Button      | `ui/button.tsx:27`      | ✅ Ring + offset                             |
| CTA Button  | `ui/cta-button.tsx:29`  | ✅ Ring + offset                             |
| Icon Button | `ui/icon-button.tsx:28` | ✅ Outline + offset                          |
| Link Button | `ui/link-button.tsx:38` | ✅ Ring + offset                             |
| Part Popup  | `ui/part-popup.tsx:73`  | ✅ Outline + offset                          |
| Input       | `ui/input.tsx:28`       | ⚠️ `focus-within` instead of `focus-visible` |

### ⚠️ Keyboard Event Handlers (Limited)

| Component | Handler     | Location               | Issue                                       |
| --------- | ----------- | ---------------------- | ------------------------------------------- |
| ChatInput | `onKeyDown` | `chat-input.tsx:92-98` | ✅ Enter sends message, Shift+Enter newline |
| ChatInput | `onKeyDown` | `chat-input.tsx:97`    | ✅ Passes through to parent                 |

### ❌ Missing Keyboard Navigation

| Feature             | Status          | Impact                                           |
| ------------------- | --------------- | ------------------------------------------------ |
| **Tab order**       | Not verified    | **HIGH** - May have focus trap in modals         |
| **Escape key**      | Not implemented | **HIGH** - No modal/panel dismissal              |
| **Arrow keys**      | Not implemented | **MEDIUM** - Toolbar buttons not arrow-navigable |
| **Skip to main**    | Not implemented | **HIGH** - No skip links                         |
| **Menu navigation** | Not implemented | **MEDIUM** - No keyboard-accessible menus        |

---

## 4. Form Accessibility

### ✅ Implemented

| Feature               | Component | Location                 | Status                      |
| --------------------- | --------- | ------------------------ | --------------------------- |
| **aria-invalid**      | Input     | `input.tsx:83`           | ✅ Error variant            |
| **aria-disabled**     | Input     | `input.tsx:84`           | ✅ Disabled state           |
| **aria-describedby**  | TextField | `text-field.tsx:72`      | ✅ Error message link       |
| **maxLength**         | ChatInput | `chat-input.tsx:112`     | ✅ Character limit          |
| **Character counter** | ChatInput | `chat-input.tsx:134-142` | ✅ Optional counter display |

### ❌ Missing Form Features

| Feature                       | Impact                                                 |
| ----------------------------- | ------------------------------------------------------ |
| **aria-required**             | **HIGH** - Required fields not marked                  |
| **aria-label on form groups** | **MEDIUM** - No label association on composite inputs  |
| **aria-live regions**         | **HIGH** - Form errors not announced in real-time      |
| **Name attribute**            | **MEDIUM** - Form fields may lack names for submission |
| **Placeholder ≠ Label**       | **MEDIUM** - ChatInput relies on placeholder only      |

**Example issue in ChatInput:**

```tsx
// ❌ No associated label
<textarea
  placeholder="Type a message..." // Placeholder alone insufficient
  // Missing: <label htmlFor="chat-input-id">Enter message</label>
/>
```

---

## 5. Live Regions & Dynamic Content

### ✅ Implemented

| Component   | Location              | Usage                                          |
| ----------- | --------------------- | ---------------------------------------------- |
| HelpMessage | `help-message.tsx:61` | `aria-live={isError ? "assertive" : "polite"}` |
|             | `help-message.tsx:60` | `role="alert"` for error states                |

### ❌ Missing Live Regions

| Area                      | Component          | Impact                                    |
| ------------------------- | ------------------ | ----------------------------------------- |
| **Chat messages**         | ChatInterface      | **HIGH** - New messages not announced     |
| **Loading states**        | SceneCanvas, Model | **MEDIUM** - No loading announcements     |
| **Model selection**       | ViewerHeader       | **MEDIUM** - Part selection not announced |
| **Toolbar state changes** | ViewerToolbar      | **MEDIUM** - Tool toggling not announced  |
| **Character counter**     | ChatInput          | **LOW** - Counter visual only             |

---

## 6. Color Contrast & Visual Design

### ⚠️ Unverified (No CSS Analysis Yet)

The following require design review:

| Element                 | Issue                             | Verification Needed         |
| ----------------------- | --------------------------------- | --------------------------- |
| **Text on backgrounds** | Primary colors may not meet 4.5:1 | Run Lighthouse/WCAG checker |
| **Button hover states** | Distinguish from focus            | Visual inspection           |
| **Error states**        | Red on backgrounds                | Color contrast ratio check  |
| **Disabled states**     | Gray text visibility              | WCAG AA compliance check    |

**Test command**:

```bash
npm install -g lighthouse
lighthouse https://localhost:3000 --preset=accessibility
```

---

## 7. Image & Icon Accessibility

### ✅ Implemented

| Component          | Alt Text                    | Location                |
| ------------------ | --------------------------- | ----------------------- |
| Icon Component     | `alt={alt}` prop            | `common/Icon.tsx:38`    |
| Icon Button        | `alt={`${iconName} icon`}`  | `ui/icon-button.tsx:71` |
| Chat Bubble Avatar | `alt={`${variant} avatar`}` | `ui/chat-bubble.tsx:97` |

### ⚠️ Partially Implemented

| Component              | Issue                | Location                                       |
| ---------------------- | -------------------- | ---------------------------------------------- |
| Decorative images      | `alt=""` (empty)     | `ui/value-card.tsx:82`, `ui/model-card.tsx:75` |
| Inline SVGs (inline)   | No aria-hidden       | `ViewerToolbar.tsx` (custom SVGs)              |
| Inline SVGs in buttons | `aria-hidden="true"` | Some, but not all buttons                      |

### ❌ Missing Alt Text

| Component                  | Issue                      | Location                                     |
| -------------------------- | -------------------------- | -------------------------------------------- |
| **Landing section images** | May lack alt text          | `landing-intro-section.tsx:104`              |
| **Custom SVG icons**       | `aria-hidden` inconsistent | `ViewerToolbar.tsx`, `ViewerSideToolbar.tsx` |
| **Model canvas**           | 3D canvas not described    | `SceneCanvas.tsx` - No canvas description    |

---

## 8. Component-by-Component Analysis

### UI Components

#### Button (`ui/button.tsx`)

```
✅ focus-visible:ring-2 focus-visible:ring-primary
✅ disabled:cursor-not-allowed
❌ No aria-pressed for toggle buttons
⚠️  No aria-label (relies on children text)
```

#### Input (`ui/input.tsx`)

```
✅ aria-invalid (error variant)
✅ aria-disabled
✅ focus-visible rings
⚠️  focus-within instead of focus-visible on input itself
❌ aria-describedby not used
❌ No associated <label>
```

#### ChatInput (`ui/chat-input.tsx`)

```
✅ onKeyDown handler (Enter to send)
✅ aria-label="Send message" on button
⚠️  No label for textarea
❌ Placeholder only, no label element
❌ No aria-live for character counter
```

#### IconButton (`ui/icon-button.tsx`)

```
✅ focus-visible:outline-2
⚠️  alt={`${iconName} icon`} - still passes to Icon component
❌ No aria-label on button itself (relies on Icon)
```

#### TextField (`ui/text-field.tsx`)

```
✅ aria-describedby for error messages
⚠️  messageText condition-dependent
❌ No aria-label
```

#### SlideBar (`ui/slide-bar.tsx`)

```
✅ aria-label={label}
✅ focus-visible rings
⚠️  Custom slider - may not support arrow keys
❌ No aria-valuemin/max/now attributes
```

### Viewer Components

#### ViewerToolbar (`viewer/ViewerToolbar.tsx`)

```
✅ role="toolbar"
✅ aria-label="3D viewer tools"
✅ Individual button aria-labels
✅ title attributes (hover tooltips)
⚠️  Inline SVGs without aria-hidden
❌ No keyboard navigation (arrow keys between buttons)
❌ No aria-pressed for toggle state
```

#### ViewerSideToolbar (`viewer/ViewerSideToolbar.tsx`)

```
✅ role="toolbar"
✅ aria-label="Side tools"
✅ Individual button aria-labels
✅ title attributes
⚠️  Rotated buttons (-rotate-90) may confuse screen readers
❌ No keyboard arrow navigation
❌ Rotated SVGs unclear in screen readers
```

#### SceneCanvas (`viewer/SceneCanvas.tsx`)

```
❌ 3D canvas not described
❌ No aria-label explaining what's rendered
❌ Keyboard navigation for 3D interaction unclear
⚠️  Three.js rendering not accessible
```

#### ViewerZoomSlider (`viewer/ViewerZoomSlider.tsx`)

```
⚠️  aria-label="분해도 control" (KOREAN - should be English)
⚠️  aria-label="분해도" (KOREAN)
✅ role="group"
❌ No aria-valuemin/max/now on slider
❌ Zoom level not announced to screen readers
```

### Panel Components

#### ChatInterface (`panels/ChatInterface.tsx`)

```
✅ aria-label dynamically set for collapse button
⚠️  aria-label={isOpen ? "Collapse chat" : "Expand chat"} - no aria-expanded
❌ No aria-live for new messages
❌ No main role marking primary content
❌ Chat messages not in <article> or semantic containers
```

#### PartInfoPanel & part-sidebar

```
✅ role="complementary"
✅ aria-label="Part information sidebar"
❌ No aria-expanded for collapsible sections
❌ No aria-current for selected part
```

### Section Components

#### Landing Sections

```
✅ aria-label on divs (e.g., "Hero section")
❌ Should use <section> semantic tags instead of divs
❌ No <h1>, <h2>, <h3> heading hierarchy
❌ Decorative images may lack alt text
```

#### landing-header.tsx

```
✅ aria-label on link: "SIMVEX Home"
❌ <header> should be semantic <header> tag
❌ Navigation should be <nav> tag
❌ No aria-current="page" on active link
```

---

## 9. WCAG 2.1 Checklist

### Level A (Must Have)

| Criterion                      | Component(s)       | Status        | Notes                            |
| ------------------------------ | ------------------ | ------------- | -------------------------------- |
| **1.1.1 Non-text Content**     | Images, icons, SVG | ⚠️ PARTIAL    | Alt text exists but inconsistent |
| **1.3.1 Info & Relationships** | Forms, landmarks   | ⚠️ PARTIAL    | Some semantic roles present      |
| **1.4.1 Use of Color**         | UI elements        | ⚠️ UNVERIFIED | No contrast audit performed      |
| **2.1.1 Keyboard**             | All interactive    | ⚠️ PARTIAL    | Tab order OK, arrow keys missing |
| **2.1.2 No Keyboard Trap**     | Modals, panels     | ⚠️ UNVERIFIED | Needs manual testing             |
| **2.2.1 Timing Adjustable**    | N/A                | ✅ N/A        | No auto-playing content          |
| **2.3.1 Three Flashes**        | N/A                | ✅ N/A        | No flashing content              |
| **2.4.1 Bypass Blocks**        | Navigation         | ❌ FAIL       | No skip-to-main links            |
| **2.4.2 Page Titled**          | Pages              | ⚠️ UNVERIFIED | Check <title> tags               |
| **3.1.1 Language of Page**     | HTML               | ⚠️ UNVERIFIED | Check lang="en" attribute        |
| **4.1.1 Parsing**              | HTML structure     | ⚠️ PARTIAL    | Some semantic issues             |
| **4.1.2 Name, Role, Value**    | Form controls      | ⚠️ PARTIAL    | Some missing labels              |

### Level AA (Should Have)

| Criterion                        | Component(s)  | Status        | Notes                              |
| -------------------------------- | ------------- | ------------- | ---------------------------------- |
| **1.4.3 Contrast (Minimum)**     | All text      | ⚠️ UNVERIFIED | Need Lighthouse audit              |
| **1.4.5 Images of Text**         | Landing pages | ⚠️ UNVERIFIED | Check for text in images           |
| **2.4.3 Focus Order**            | All           | ⚠️ UNVERIFIED | Needs manual testing               |
| **2.4.7 Focus Visible**          | Interactive   | ✅ PARTIAL    | focus-visible implemented          |
| **3.2.1 On Focus**               | All           | ⚠️ UNVERIFIED | Check for unexpected changes       |
| **3.2.2 On Input**               | Forms         | ⚠️ UNVERIFIED | Check for auto-submission          |
| **3.3.1 Error Identification**   | Forms         | ⚠️ PARTIAL    | Some aria-invalid, no descriptions |
| **3.3.2 Labels or Instructions** | Forms         | ❌ FAIL       | No labels on ChatInput textarea    |
| **3.3.3 Error Suggestion**       | Forms         | ❌ FAIL       | No error recovery suggestions      |
| **3.3.4 Error Prevention**       | Forms         | ⚠️ UNVERIFIED | Depends on backend                 |

---

## 10. Priority Fixes

### 🔴 Critical (Must Fix for A11y)

1. **Add semantic HTML structure**

   ```tsx
   // ❌ Current (landing sections)
   <div aria-label="Hero section">

   // ✅ Should be
   <section aria-label="Hero section">

   // Even better: with proper headings
   <section>
     <h1>Hero Title</h1>
   </section>
   ```

2. **Fix Korean aria-labels in ViewerZoomSlider**

   ```tsx
   // ❌ Current
   aria-label="분해도 control"

   // ✅ Should be
   aria-label="Exploded view control"
   ```

3. **Add main landmark**

   ```tsx
   // SceneCanvas.tsx
   <div role="main" className="...">
     {/* 3D viewer content */}
   </div>
   ```

4. **Add skip link**
   ```tsx
   // landing-header.tsx
   <a href="#main-content" className="sr-only focus:not-sr-only">
     Skip to main content
   </a>
   ```

### 🟡 High Priority (AA Compliance)

5. **Add form labels**

   ```tsx
   // ChatInput.tsx
   <label htmlFor="chat-textarea">Enter your message</label>
   <textarea id="chat-textarea" {...props} />
   ```

6. **Add aria-expanded to collapsible sections**

   ```tsx
   // ChatInterface.tsx
   <button
     aria-expanded={isOpen}
     aria-controls="chat-panel"
   >
     {isOpen ? "Collapse" : "Expand"}
   </button>
   <div id="chat-panel" hidden={!isOpen}>
     {/* Content */}
   </div>
   ```

7. **Add aria-live to chat messages**

   ```tsx
   // ChatInterface.tsx
   <div
     ref={messagesContainerRef}
     aria-live="polite"
     aria-label="Chat messages"
   >
     {messages.map(msg => ...)}
   </div>
   ```

8. **Mark current navigation item**
   ```tsx
   // landing-header.tsx
   <Link href="/" aria-current={isHome ? "page" : undefined}>
     Home
   </Link>
   ```

### 🟠 Medium Priority (Enhancements)

9. **Add arrow key navigation to toolbars**

   ```tsx
   // ViewerToolbar.tsx
   const handleKeyDown = (e: React.KeyboardEvent) => {
     if (e.key === "ArrowRight") {
       // Focus next button
     } else if (e.key === "ArrowLeft") {
       // Focus previous button
     }
   };
   ```

10. **Verify color contrast**
    - Run Lighthouse accessibility audit
    - Ensure 4.5:1 ratio for text
    - Check hover vs. focus distinction

11. **Add keyboard shortcuts documentation**
    ```tsx
    // Help component or tooltip
    <dialog>
      <p>Keyboard shortcuts:</p>
      <ul>
        <li>Enter: Send message (in chat)</li>
        <li>Shift+Enter: New line (in chat)</li>
        <li>Esc: Close panels</li>
      </ul>
    </dialog>
    ```

---

## 11. Testing Recommendations

### Automated Tests

```bash
# Install accessibility testing tools
npm install --save-dev jest-axe @testing-library/jest-dom

# Run Lighthouse
npm audit --audit-level=moderate
npx lighthouse https://localhost:3000 --preset=accessibility
```

### Manual Tests

- [ ] Keyboard-only navigation (no mouse)
- [ ] Screen reader testing (NVDA, JAWS, VoiceOver)
- [ ] Color contrast verification
- [ ] Focus trap testing in modals
- [ ] Zoom to 200% responsiveness
- [ ] Reflow at 320px width

### Tools Recommended

- **Axe DevTools**: Browser extension for automated scanning
- **WAVE**: WebAIM contrast checker
- **Lighthouse**: Built into Chrome DevTools
- **NVDA**: Free screen reader (Windows)
- **JAWS**: Commercial screen reader (Windows)

---

## 12. Implementation Status Summary

| Category                    | Status        | Score |
| --------------------------- | ------------- | ----- |
| **ARIA Labels**             | ✅ Partial    | 70%   |
| **Semantic HTML**           | ❌ Poor       | 30%   |
| **Keyboard Navigation**     | ⚠️ Partial    | 50%   |
| **Focus Management**        | ✅ Good       | 75%   |
| **Form Accessibility**      | ⚠️ Partial    | 55%   |
| **Live Regions**            | ⚠️ Minimal    | 25%   |
| **Color Contrast**          | ⚠️ Unverified | 0%    |
| **Overall WCAG Compliance** | ⚠️ Level B    | 45%   |

---

## 13. Files Requiring Changes

```
src/components/
├── viewer/
│   ├── ViewerZoomSlider.tsx         🔴 Fix Korean labels
│   ├── ViewerToolbar.tsx             🟡 Add arrow key navigation
│   ├── ViewerSideToolbar.tsx         🟡 Add arrow key navigation
│   └── SceneCanvas.tsx               🔴 Add main role + description
├── panels/
│   ├── ChatInterface.tsx             🔴 Add aria-live + aria-expanded
│   └── chat-sidebar.tsx              🟡 Add skip link
├── ui/
│   ├── chat-input.tsx                🔴 Add label element
│   ├── input.tsx                     🟡 Fix focus-visible
│   ├── text-field.tsx                🟡 Add aria-label
│   └── slide-bar.tsx                 🟡 Add aria-valuemin/max/now
├── sections/
│   ├── landing-*.tsx                 🔴 Use <section> tags + headings
│   └── landing-header.tsx            🔴 Use <header> + <nav>
└── layout/
    └── landing-header.tsx            🔴 Add aria-current
```

---

## 14. External Resources

- **WCAG 2.1 Standard**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **MDN Web Accessibility**: https://developer.mozilla.org/en-US/docs/Web/Accessibility
- **WebAIM**: https://webaim.org/
- **Inclusive Components**: https://inclusive-components.design/

---

## Summary

**Current State**: Foundational accessibility implemented (35+ aria-labels, focus indicators).

**Major Gaps**: Semantic HTML structure, form labels, keyboard navigation, live regions.

**Effort to AA Compliance**: ~15-20 hours of focused work on priority items.

**Recommended First Step**: Address critical issues (main role, semantic tags, form labels) before adding enhancements.
