# Phase 2: Layout Components Analysis

## Overview

This document analyzes 9 layout and navigation components from the SIMVEX Figma design. These components form the structural foundation of the application, including navigation bars, headers, footers, sidebars, toolbars, and interactive controls.

**Key Findings:**

- **Naming Inconsistency**: "Slidebar" vs "Sidebar" (typo in Figma)
- **Component Variants**: Multiple navigation variants for different contexts (landing, main app, login)
- **Interactive Elements**: Zoom sliders, collapsible sidebars, toolbar with multiple states
- **Design System**: Consistent use of primary color (#02eee1), glassmorphism effects, rounded corners
- **Typography**: Pretendard font family (Bold, SemiBold, Regular)

---

## Component Grouping

### Navigation Components

1. **Navigation** (130-135) - Landing page navigation labels only
2. **MainNavigation** (130-279) - Main app navigation with English labels
3. **LoginHeader** (130-188) - Full header component with 3 variants (Landing/Main/Login)

**Analysis:**

- `Navigation` and `MainNavigation` are **label-only components** (just the menu items)
- `LoginHeader` is the **complete header** that includes logo + navigation + CTA buttons
- `LoginHeader` has 3 states controlled by `tap` prop: "Landing", "main", "login"
  - **Landing**: Logo + Korean navigation + "로그인/가입" + "시작하기" buttons
  - **Main**: Logo + English navigation (HOME/STUDY/CAD/LAB)
  - **Login**: Logo + Korean navigation + "jun1 님" + "시작하기" buttons

**Recommendation:**

- Rename `Navigation` → `LandingNavLabels` (Korean labels)
- Rename `MainNavigation` → `MainNavLabels` (English labels)
- Keep `LoginHeader` as the primary header component
- Consider creating a base `Header` component that accepts navigation items as props

---

### Sidebar Components

1. **Slidebar** (160-577) - Horizontal zoom slider (10 zoom levels)
2. **SidebarIfClickPart** (232-967) - Vertical sidebar with AI Assistant and Part Info panels
3. **SlidebarPartClick** (232-1062) - Shorter horizontal slider (8 zoom levels)

**Analysis:**

- **Naming Issue**: "Slidebar" is a typo, should be "Slider" (these are range sliders, not sidebars)
- `Slidebar` and `SlidebarPartClick` are **variants of the same slider component**
  - `Slidebar`: 1200px wide, 10 zoom levels (zoom1-zoom10)
  - `SlidebarPartClick`: 960px wide, 8 zoom levels (zoom1-zoom8)
  - Both share identical visual design (gray track + cyan handle)
- `SidebarIfClickPart` is a **completely different component** - a vertical sidebar panel

**Recommended Naming:**

- `Slidebar` → `ZoomSlider` (full width variant)
- `SlidebarPartClick` → `ZoomSlider` (shorter variant, same component)
- `SidebarIfClickPart` → `InfoSidebar` or `PartInfoPanel`

**State Management:**

- Sliders are controlled components with zoom state
- Sidebar appears to be toggle-able (click part to show info)

---

### Toolbar & Footer

1. **Footer** (96-162) - Site footer with logo, copyright, and legal links
2. **Toolbar** (160-723) - Tool palette with 2 variants (horizontal/vertical)
3. **ToolbarItem** (375-1336) - Individual toolbar icons with 3 states (Default/hover/press)

**Analysis:**

- `Footer` is standalone, used on landing page
- `Toolbar` has 2 orientations:
  - **Default (bar="Default")**: Horizontal, 500×50px, 4 tools (3D viewer controls)
  - **Side (bar="side")**: Vertical, 50×300px, 2 tools rotated -90° (AI + Search)
- `ToolbarItem` provides individual icon components with hover/press states

---

## Detailed Component Analysis

---

### Component: Navigation (Landing Nav Labels)

**Figma Node:** 130-135
**Screenshot:** (Korean navigation labels: 소개, 기능, 학습 모델, 문의)

#### Naming

- **Figma Name:** Navigation
- **Proposed Code Name:** `LandingNavLabels` or `NavLabelGroup`
- **Rationale:** This is NOT a complete navigation component, just the label items. Clarifies it's for landing page and avoids confusion with MainNavigation.

#### Role

Label group for landing page navigation menu items (Korean text).

#### Dimensions

| Property | Value (px)           | Ratio         | Tailwind |
| -------- | -------------------- | ------------- | -------- |
| Width    | Auto (content-based) | -             | w-auto   |
| Height   | 48px                 | Fixed         | h-12     |
| Gap      | 80px                 | Between items | gap-20   |

#### Layout

- **Method:** Flexbox horizontal
- **Alignment:** `items-center`
- **Contains:** 4 Label components
- **Labels:**
  1. "소개" (Introduction) - default prop
  2. "기능" (Features)
  3. "학습 모델" (Learning Model)
  4. "문의" (Contact)

#### Colors

- **Text:** `#fafafa` (var(--color/text/interactive/inverse))
- **Background:** Transparent

#### Typography

| Property    | Value                                          |
| ----------- | ---------------------------------------------- |
| Font Family | Pretendard:Bold                                |
| Font Size   | 40px (var(--unit/40))                          |
| Font Weight | 700 (var(--typography/heading/xl/font-weight)) |
| Line Height | 1.25                                           |
| Text Align  | Center                                         |

#### Spacing

- **Padding:** None on container
- **Gap:** 80px between labels (var(--spacing/80))
- **Label Size:** 70×48px each

#### States

- No interactive states defined in this component variant
- Likely needs: hover (underline/color change), active (current page indicator)

#### Auto Layout

- Horizontal auto layout with 80px gap
- Content-based width
- Items are shrink-0 (fixed width labels)

#### shadcn/ui Mapping

- **N/A** - Custom component
- Could use `NavigationMenu` from shadcn/ui as base

#### Asset Classification

- **CODE** - Text-based, no images

#### Interactions

- Should link to page sections (smooth scroll for landing page)
- Needs hover states (missing in design)
- Current page indicator (missing in design)

#### Accessibility

- Need `<nav>` wrapper
- Each label should be `<a>` with href
- aria-current="page" for active item
- Keyboard navigation (Tab, Enter)

---

### Component: MainNavigation (Main App Nav Labels)

**Figma Node:** 130-279
**Screenshot:** (English navigation labels: HOME, STUDY, CAD, LAB)

#### Naming

- **Figma Name:** main navigation
- **Proposed Code Name:** `MainNavLabels` or `AppNavLabels`
- **Rationale:** Clarifies this is the label group for the main application (vs landing page).

#### Role

Label group for main application navigation menu items (English text).

#### Dimensions

| Property | Value (px)           | Ratio         | Tailwind |
| -------- | -------------------- | ------------- | -------- |
| Width    | Auto (content-based) | -             | w-auto   |
| Height   | 48px                 | Fixed         | h-12     |
| Gap      | 80px                 | Between items | gap-20   |

#### Layout

- **Method:** Flexbox horizontal
- **Alignment:** `items-center`
- **Contains:** 4 Label components
- **Labels:**
  1. "HOME"
  2. "STUDY"
  3. "CAD"
  4. "LAB"

#### Colors

- **Text:** `#fafafa` (var(--color/text/interactive/inverse))
- **Background:** Transparent

#### Typography

| Property    | Value                 |
| ----------- | --------------------- |
| Font Family | Pretendard:Bold       |
| Font Size   | 40px (var(--unit/40)) |
| Font Weight | 700                   |
| Line Height | 1.25                  |
| Text Align  | Center                |

#### Spacing

- **Padding:** None on container
- **Gap:** 80px between labels
- **Label Size:** 70×48px each

#### Comparison with Navigation (Landing)

| Aspect    | Navigation (Landing)   | MainNavigation (Main)    |
| --------- | ---------------------- | ------------------------ |
| Language  | Korean (소개, 기능...) | English (HOME, STUDY...) |
| Target    | Landing page sections  | App routes               |
| Structure | Identical              | Identical                |
| Styling   | Identical              | Identical                |

**Recommendation:** These should be the **same component** with different data props:

```tsx
<NavLabels
  items={[
    { label: "소개", href: "#intro" },
    { label: "기능", href: "#features" },
    // ...
  ]}
/>
```

#### shadcn/ui Mapping

- **N/A** - Custom component

#### Asset Classification

- **CODE** - Text-based

#### Interactions

- Link to app routes (/home, /study, /cad, /lab)
- Highlight active route
- Hover state needed

#### Accessibility

- Same as Navigation component
- Use React Router `NavLink` with activeClassName

---

### Component: LoginHeader (Full Header Component)

**Figma Node:** 130-188
**Screenshot:** (Shows 3 variants - Landing with Korean nav, Main with English nav, Login with username)

#### Naming

- **Figma Name:** Login Header
- **Proposed Code Name:** `AppHeader` or `SiteHeader`
- **Rationale:** This component is used for all pages (landing, main, login), not just login. "AppHeader" is more accurate.

#### Role

Primary site header with logo, navigation, and CTA buttons. Adapts based on context (landing/main/login).

#### Dimensions

| Property  | Value (px) | Ratio                | Tailwind              |
| --------- | ---------- | -------------------- | --------------------- |
| Width     | 1920px     | 100vw                | w-full max-w-[1920px] |
| Height    | ~112px     | Auto (padding-based) | h-auto                |
| Padding X | 80px       | Fixed                | px-20                 |
| Padding Y | 32px       | Fixed                | py-8                  |

#### Positioning

- **Position Type:** Likely `fixed` or `sticky` (not specified in Figma)
- **z-index:** Should be high (e.g., 50) to stay on top
- **Background:** Semi-transparent dark (not visible in screenshot, likely rgba(0,0,0,0.8) or glassmorphism)

#### Structure

**Layout:** Flexbox horizontal with 3 main sections:

1. **Logo** (left, 325px wide)
   - Logo image (73.616×69.096px)
   - Logo text (40.037px height)
   - Gap: 17.22px

2. **Navigation** (center, flex-1)
   - Landing variant: Korean labels (소개, 기능, 학습 모델, 문의)
   - Main variant: English labels (HOME, STUDY, CAD, LAB)
   - Gap: 80px between labels

3. **CTA Buttons** (right)
   - Button 1: "로그인/가입" (Default) or "jun1 님" (Login variant)
   - Button 2: "시작하기" (Primary variant)
   - Gap: 16px

#### Variants (tap prop)

| Variant     | Logo | Navigation        | Button 1    | Button 2  |
| ----------- | ---- | ----------------- | ----------- | --------- |
| **Landing** | ✓    | Korean (소개...)  | 로그인/가입 | 시작하기  |
| **main**    | ✓    | English (HOME...) | ❌ Hidden   | ❌ Hidden |
| **login**   | ✓    | Korean (소개...)  | jun1 님     | 시작하기  |

#### Colors

- **Logo:** Cyan gradient (#02eee1 tones)
- **Nav Text:** #fafafa
- **Button 1 (Default):**
  - Background: rgba(255,255,255,0.3)
  - Border: 5px solid rgba(2,238,225,0.2)
  - Text: #fafafa
- **Button 2 (Primary):**
  - Background: rgba(2,238,225,0.3)
  - Border: 5px solid #02eee1
  - Text: #fafafa

#### Typography

**Navigation:**

- Font: Pretendard:Bold
- Size: 40px
- Weight: 700
- Line Height: 1.25

**Buttons:**

- Font: Pretendard:SemiBold
- Size: 32px (var(--unit/32))
- Weight: 600
- Line Height: 1.25

#### Spacing

| Element        | Padding/Gap        | Tailwind   |
| -------------- | ------------------ | ---------- |
| Container      | 80px (x), 32px (y) | px-20 py-8 |
| Main gap       | 48px               | gap-12     |
| Logo gap       | 17.22px            | gap-4      |
| Nav gap        | 80px               | gap-20     |
| Button gap     | 16px               | gap-4      |
| Button padding | 24px (x), 16px (y) | px-6 py-4  |

#### Button Dimensions

| Property      | Value                            |
| ------------- | -------------------------------- |
| Width         | 210px (fixed)                    |
| Height        | Auto (content + padding)         |
| Border        | 5px solid                        |
| Border Radius | 24px (var(--radius/24))          |
| Shadow        | 4px 4px 20px rgba(2,238,225,0.1) |

#### States

| State             | Changes                                      |
| ----------------- | -------------------------------------------- |
| Default           | As designed                                  |
| Scrolled (sticky) | Background opacity increase? (not specified) |
| Mobile            | Hamburger menu (not designed yet)            |

#### Internal Elements

**Logo Component:**

- Logo image (SVG/PNG export needed)
- Logo text (SVG/PNG export needed)
- Clickable, links to home

**Navigation Component:**

- Reuses `Navigation` or `MainNavigation` components
- Conditional rendering based on `tap` prop

**CTA Buttons:**

- Reuses `CTAButton` component
- Variant props: "Default" | "primary"

#### Auto Layout

- Top-level: Horizontal flex
- Logo: Horizontal flex (image + text)
- Navigation: Horizontal flex (labels)
- Buttons: Horizontal flex (2 buttons)
- All use `content-stretch` for vertical alignment

#### Responsive Behavior

**Not designed in Figma, but recommended:**

- **Desktop (1920px):** Full layout as shown
- **Laptop (1440px):** Reduce padding to 40px
- **Tablet (768px):**
  - Hamburger menu icon
  - Logo only, buttons move to drawer
- **Mobile (375px):**
  - Small logo + hamburger
  - Full-screen menu overlay

#### Interactions

- **Logo:** Click to return to home/landing
- **Nav items:** Click to navigate to pages/sections
- **Login button:** Open login modal or redirect to /login
- **시작하기 (Start):** Redirect to main app or signup
- **Sticky behavior:** Header sticks to top on scroll (recommended)

#### Accessibility

- `<header>` element with `role="banner"`
- Logo wrapped in `<a>` with aria-label="SIMVEX Home"
- `<nav>` element for navigation
- Keyboard navigation for all interactive elements
- Focus indicators on hover/focus
- Skip to main content link (hidden, visible on focus)

#### Asset Classification

- **Logo Image:** IMAGE (SVG recommended) - Export from Figma
- **Logo Text:** IMAGE (SVG recommended) - Export from Figma
- **Buttons:** CODE (use existing CTAButton component)
- **Navigation:** CODE (use existing Label/Navigation components)

---

### Component: Footer

**Figma Node:** 96-162
**Screenshot:** (Shows SIMVEX logo, copyright, and legal links)

#### Naming

- **Figma Name:** Footer
- **Proposed Code Name:** `SiteFooter` or `LandingFooter`
- **Rationale:** Clear, semantic name. Add "Landing" if only used on landing page.

#### Role

Site footer with branding, copyright notice, and legal links (Privacy Policy, Terms of Service).

#### Dimensions

| Property  | Value (px)    | Ratio         | Tailwind              |
| --------- | ------------- | ------------- | --------------------- |
| Width     | 1920px        | 100vw         | w-full max-w-[1920px] |
| Height    | Auto (~280px) | Content-based | h-auto                |
| Padding X | 80px          | Fixed         | px-20                 |
| Padding Y | 40px          | Fixed         | py-10                 |

#### Positioning

- **Position Type:** Static (bottom of page)
- **Background:** Dark background (appears to be #171717 or similar)

#### Structure

**Two-column layout:**

**Left Column (163px wide):**

1. **Logo** (smaller version)
   - Logo image (36.921×34.654px)
   - Logo text (20.08px height)
   - Gap: 8.637px
2. **Copyright:** "© 2026"
3. **Rights:** "All rights reserved."

**Right Column (flex-1, right-aligned):**

- Legal links: "Privacy Policy" | "Terms of Service"

#### Layout

```
┌─────────────────────────────────────────────────┐
│  Logo (img+text)           Privacy | Terms      │
│  © 2026                                          │
│  All rights reserved.                            │
└─────────────────────────────────────────────────┘
```

#### Colors

| Element     | Color             | Variable                              |
| ----------- | ----------------- | ------------------------------------- |
| Background  | #171717 (assumed) | bg-background                         |
| Logo Text   | #fafafa           | var(--color/text/interactive/inverse) |
| Copyright   | #d4d4d4           | var(--color/text/teritary)            |
| Rights Text | #fafafa           | var(--color/text/interactive/inverse) |
| Legal Links | #fafafa           | var(--color/text/interactive/inverse) |

#### Typography

**Logo Area:**

- Renders as images (smaller 50% scale of header logo)

**Copyright Text:**

- Font: Pretendard:Regular
- Size: 16px
- Line Height: 1.406
- Color: #d4d4d4 (tertiary text)

**Rights Text:**

- Font: Pretendard:Regular
- Size: 16px
- Line Height: normal
- Color: #fafafa

**Legal Links:**

- Font: Pretendard:SemiBold
- Size: 32px (var(--unit/32))
- Weight: 600 (var(--typography/heading/lg/font-weight))
- Line Height: 1.25
- Color: #fafafa

#### Spacing

| Element           | Value              | Tailwind    |
| ----------------- | ------------------ | ----------- |
| Container padding | 80px (x), 40px (y) | px-20 py-10 |
| Outer gap         | 48px               | gap-12      |
| Left column gap   | 8px                | gap-2       |
| Logo gap          | 8.637px            | gap-2       |
| Legal links gap   | 40px               | gap-10      |

**Left Column (pane left):**

- Width: 163px
- Height: 239px
- Padding Y: 75px
- Gap: 8px

#### States

| Element     | States                              |
| ----------- | ----------------------------------- |
| Legal Links | Default, Hover (underline?), Active |

#### Auto Layout

- **Main container:** Horizontal flex
- **Left pane:** Vertical flex (logo + copyright + rights)
- **Logo:** Horizontal flex (image + text)
- **Right pane:** Horizontal flex, right-aligned

#### shadcn/ui Mapping

- **N/A** - Custom component
- Could use `Separator` between legal links

#### Asset Classification

- **Logo Image:** IMAGE (SVG) - Same as header but smaller
- **Logo Text:** IMAGE (SVG) - Same as header but smaller
- **Legal Links:** CODE - Text links

#### Interactions

- **Legal Links:** Click to navigate to /privacy-policy, /terms-of-service
- **Logo:** Optional click to scroll to top

#### Accessibility

- `<footer>` element with `role="contentinfo"`
- Legal links should be actual `<a>` elements
- Copyright should use `<p>` with semantic markup
- Consider adding social media links (not in current design)
- Keyboard navigable links
- ARIA labels if needed

#### Responsive Behavior

**Desktop (1920px):** As designed
**Laptop (1440px):** Reduce padding
**Tablet (768px):** Stack vertically (logo/copyright on top, links below)
**Mobile (375px):**

- Single column layout
- Links stack vertically
- Smaller padding (24px)

---

### Component: Slidebar (Zoom Slider - Full Width)

**Figma Node:** 160-577
**Screenshot:** (Shows 10 horizontal sliders at different zoom positions)

#### Naming

- **Figma Name:** Slidebar (typo - should be Slider or Slidebar)
- **Proposed Code Name:** `ZoomSlider` or `RangeSlider`
- **Rationale:** This is a zoom control slider (range input), not a sidebar. "Slidebar" is confusing with "Sidebar".

#### Role

Horizontal zoom control slider with 10 discrete levels (zoom1 to zoom10).

#### Dimensions

| Property | Value (px) | Ratio      | Tailwind   |
| -------- | ---------- | ---------- | ---------- |
| Width    | 1200px     | Full width | w-[1200px] |
| Height   | 57px       | Fixed      | h-[57px]   |

**Track:**

- Width: 1200px
- Height: 16px
- Border Radius: 99999px (circle)
- Position: Top 21px (vertically centered)

**Handle (Thumb):**

- Width: 120px
- Height: 32px
- Border Radius: 99999px (circle)
- Border: 2px solid #02eee1
- Position: Top 13px (centered on track)

#### Colors

| Element           | Color                              | Variable                                |
| ----------------- | ---------------------------------- | --------------------------------------- |
| Track             | #d9d9d9                            | Custom gray                             |
| Track Shadow      | inset 0px 4px 4px rgba(0,0,0,0.25) | -                                       |
| Handle Background | rgba(2,238,225,0.3)                | Semi-transparent cyan                   |
| Handle Border     | #02eee1                            | var(--color/border/interactive/primary) |
| Handle Shadow     | 4px 4px 10px 2px rgba(0,0,0,0.25)  | -                                       |

#### Spacing

- **Container height:** 57px
- **Track top:** 21px (centers 16px track)
- **Handle top:** 13px (centers 32px handle)

#### States / Zoom Levels

The component has 10 variants controlled by `zoom` prop:

| Zoom Level | Handle Left Position |
| ---------- | -------------------- |
| zoom1      | 0px (0%)             |
| zoom2      | 120px (10%)          |
| zoom3      | 240px (20%)          |
| zoom4      | 360px (30%)          |
| zoom5      | 480px (40%)          |
| zoom6      | 600px (50%)          |
| zoom7      | 720px (60%)          |
| zoom8      | 840px (70%)          |
| zoom9      | 960px (80%)          |
| zoom10     | 1080px (90%)         |

**Handle Step:** 120px (10% of 1200px)

#### Auto Layout

- Relative positioned container
- Absolute positioned track and handle
- Handle left position calculated as: `(zoom_level - 1) × 120px`

#### shadcn/ui Mapping

- **Slider** component from shadcn/ui
- Configure with:
  - min: 1
  - max: 10
  - step: 1
  - value: zoom level

#### Asset Classification

- **CODE** - Fully CSS-based, no images

#### Interactions

- **Drag:** Click and drag handle to adjust zoom
- **Click:** Click on track to jump to position
- **Keyboard:** Arrow keys to increment/decrement (accessibility)
- **Change event:** Emit zoom level on change

#### Implementation Notes

```tsx
// Suggested implementation
<Slider
  min={1}
  max={10}
  step={1}
  value={[zoomLevel]}
  onValueChange={([value]) => setZoomLevel(value)}
  className="w-[1200px] h-[57px]"
/>
```

**CSS Customization needed:**

- Track height: 16px
- Track color: #d9d9d9
- Handle size: 120×32px
- Handle border: 2px #02eee1
- Handle background: rgba(2,238,225,0.3)

#### Accessibility

- `<input type="range">` semantics
- aria-label: "Zoom level"
- aria-valuemin: 1
- aria-valuemax: 10
- aria-valuenow: current zoom level
- aria-valuetext: "Zoom level {level}"
- Keyboard support (arrows, home, end)

#### Responsive Behavior

- **Desktop (1920px):** Full 1200px width
- **Laptop (1440px):** Scale to 960px (use SlidebarPartClick variant)
- **Tablet/Mobile:** Not designed, likely hide or use compact vertical slider

---

### Component: SidebarIfClickPart (Info Sidebar)

**Figma Node:** 232-967
**Screenshot:** (Shows vertical sidebar with AI Assistant and Part Info sections)

#### Naming

- **Figma Name:** Side bar-if click part
- **Proposed Code Name:** `PartInfoSidebar` or `InfoPanel`
- **Rationale:** Describes purpose (shows part information) rather than trigger condition ("if click part").

#### Role

Vertical sidebar panel that displays contextual information when a 3D part is selected. Contains two sections: AI Assistant and Part Info.

#### Dimensions

| Property      | Value (px)            | Ratio | Tailwind       |
| ------------- | --------------------- | ----- | -------------- |
| Width         | 400px                 | Fixed | w-[400px]      |
| Height        | 750px                 | Fixed | h-[750px]      |
| Padding       | 48px all sides        | Fixed | p-12           |
| Gap           | 32px between sections | Fixed | gap-8          |
| Border        | 3px solid #02eee1     | -     | border-3       |
| Border Radius | 24px                  | -     | rounded-[24px] |

#### Positioning

- **Position Type:** Likely `fixed` or `absolute` on right side of viewport
- **z-index:** High (above canvas, below modals)
- **Entrance:** Slide in from right or fade in

#### Structure

Two stacked sections:

**1. AI Assistant Section (top)**

- Header: AI icon + "AI Assistant" text
- Content box: 250px height, placeholder text "부품 설명어쩌궁.."

**2. Part Info Section (bottom)**

- Header: Part icon + "Part Info" text
- Content box: 250px height, placeholder text "부품 설명어쩌궁.."

#### Colors

| Element                | Color                 | Variable                                |
| ---------------------- | --------------------- | --------------------------------------- |
| Container Background   | rgba(212,212,212,0.3) | Semi-transparent gray                   |
| Container Border       | #02eee1               | var(--color/border/interactive/primary) |
| Section Title          | #02eee1               | var(--color/text/interactive/primary)   |
| Content Box Background | rgba(212,212,212,0.3) | Same as container                       |
| Content Box Border     | #02eee1               | var(--color/border/interactive/primary) |
| Content Text           | #ffffff               | white                                   |
| Icon Color             | #02eee1               | Primary cyan                            |

#### Typography

**Section Headers:**

- Font: Pretendard:SemiBold
- Size: 32px (var(--unit/32))
- Weight: 600 (var(--typography/heading/lg/font-weight))
- Line Height: 1.25
- Color: #02eee1

**Content Text:**

- Font: Pretendard:Medium
- Size: 16px (var(--unit/16))
- Weight: 500 (var(--typography/body/lg/medium/font-weight))
- Line Height: 1.5
- Color: #ffffff

#### Spacing

| Element               | Value                | Tailwind                     |
| --------------------- | -------------------- | ---------------------------- |
| Container padding     | 48px                 | p-12                         |
| Section gap           | 32px                 | gap-8                        |
| Header icon gap       | 16px                 | gap-4                        |
| Header-to-content gap | 16px                 | gap-4                        |
| Content box padding   | 153px (x), 105px (y) | Large padding (questionable) |

**Note:** Content box padding (153px, 105px) seems excessive for a 250px height box. This centers a single line of text but wastes space. Recommend 24px padding instead.

#### Internal Elements

**AI Assistant Icon:**

- Component: `mingcute:ai-line`
- Size: 37×37px
- Color: #02eee1 (primary)

**Part Info Icon:**

- Component: Custom part icon (vector)
- Size: 37×38px
- Color: #02eee1 (primary)

**Content Boxes:**

- Width: 100% (container width - padding)
- Height: 250px (fixed)
- Border: 3px solid #02eee1
- Border Radius: 24px
- Background: rgba(212,212,212,0.3)

#### States

| State     | Description                       |
| --------- | --------------------------------- |
| Hidden    | Sidebar off-screen or opacity 0   |
| Visible   | Sidebar slides in, fully opaque   |
| Loading   | Content shows skeleton or spinner |
| Populated | Content shows actual part data    |

#### Auto Layout

- **Container:** Vertical flex, gap-8
- **Each Section:** Vertical flex, gap-4
- **Header:** Horizontal flex, gap-4, items-center

#### shadcn/ui Mapping

- **Sheet** component (slide-out panel)
- **Card** for content boxes (optional)
- **Separator** between sections (optional)

#### Asset Classification

- **AI Icon:** SVG (from icon library)
- **Part Icon:** SVG (custom, export from Figma)
- **Structure:** CODE

#### Interactions

- **Trigger:** Click on 3D part in viewer
- **Close:** Click outside, ESC key, or close button (not shown in design)
- **Content:** Dynamically populated based on selected part
- **AI Assistant:** Could have "Ask AI" button to generate description
- **Part Info:** Show technical specs (dimensions, material, etc.)

#### Accessibility

- `role="complementary"` or `role="region"`
- aria-label="Part information panel"
- Focus trap when open
- ESC to close
- Focus returns to triggering element on close
- Headings for each section (h2 or h3)
- Content boxes should be semantic (not just styled divs)

#### Responsive Behavior

**Desktop (1920px):** Fixed 400px width on right
**Laptop (1440px):** Overlay with backdrop
**Tablet/Mobile:** Full-screen modal or bottom sheet

#### Implementation Notes

- Use `Sheet` component from shadcn/ui
- Position: right
- Width: 400px
- Animate slide-in from right
- Add close button (X) in top-right corner
- Consider collapsible sections if content grows
- Real data integration:
  - AI Assistant: API call to get AI-generated description
  - Part Info: Fetch from 3D model metadata

---

### Component: SlidebarPartClick (Zoom Slider - Compact)

**Figma Node:** 232-1062
**Screenshot:** (Shows 8 horizontal sliders at different zoom positions)

#### Naming

- **Figma Name:** Slidebar part click (unclear naming)
- **Proposed Code Name:** `ZoomSlider` (same component as Slidebar)
- **Rationale:** This is the **same component** as `Slidebar`, just with different dimensions (960px vs 1200px, 8 levels vs 10).

#### Role

Compact zoom control slider with 8 discrete levels (zoom1 to zoom8). Used when sidebar is open and horizontal space is limited.

#### Dimensions

| Property | Value (px) | Ratio        | Tailwind  |
| -------- | ---------- | ------------ | --------- |
| Width    | 960px      | Compact      | w-[960px] |
| Height   | 57px       | Same as full | h-[57px]  |

**Track:**

- Width: 956px (slightly narrower than container)
- Height: 12px (smaller than full variant: 16px → 12px)
- Border Radius: 99999px
- Position: Top 23px

**Handle:**

- Width: 120px (same as full variant)
- Height: 32px (same as full variant)
- Border Radius: 99999px
- Border: 2px solid #02eee1
- Position: Top 13px

#### Colors

Identical to `Slidebar` (full width variant):

- Track: #d9d9d9
- Track shadow: inset 0px 4px 4px rgba(0,0,0,0.25)
- Handle: rgba(2,238,225,0.3) background, #02eee1 border
- Handle shadow: 4px 4px 10px 2px rgba(0,0,0,0.25)

#### Spacing

- **Container:** 960×57px
- **Track height:** 12px (vs 16px in full variant)
- **Track top:** 23px (vs 21px in full variant)
- **Handle:** Same as full variant (32px height)

#### States / Zoom Levels

8 variants (vs 10 in full variant):

| Zoom Level | Handle Left Position |
| ---------- | -------------------- |
| zoom1      | 0px (0%)             |
| zoom2      | 120px (12.5%)        |
| zoom3      | 240px (25%)          |
| zoom4      | 360px (37.5%)        |
| zoom5      | 480px (50%)          |
| zoom6      | 600px (62.5%)        |
| zoom7      | 720px (75%)          |
| zoom8      | 840px (87.5%)        |

**Handle Step:** 120px (same as full variant, but only 8 steps)

#### Comparison: Slidebar vs SlidebarPartClick

| Property     | Slidebar (Full)   | SlidebarPartClick (Compact) |
| ------------ | ----------------- | --------------------------- |
| Width        | 1200px            | 960px                       |
| Track Width  | 1200px            | 956px                       |
| Track Height | 16px              | 12px                        |
| Zoom Levels  | 10 (zoom1-zoom10) | 8 (zoom1-zoom8)             |
| Handle Size  | 120×32px          | 120×32px                    |
| Use Case     | Full screen       | When sidebar open           |

#### Auto Layout

Same as `Slidebar` - relative container with absolute positioned track/handle.

#### shadcn/ui Mapping

Same `Slider` component, different config:

- min: 1
- max: 8 (vs 10)
- step: 1
- width: 960px (vs 1200px)

#### Asset Classification

- **CODE** - CSS-based

#### Interactions

Same as `Slidebar` - drag, click, keyboard

#### Accessibility

Same as `Slidebar`

#### Implementation Recommendation

**DO NOT create two separate components.** Use a single `ZoomSlider` component with props:

```tsx
<ZoomSlider
  maxZoom={10} // or 8 for compact variant
  width={1200} // or 960 for compact variant
  value={zoomLevel}
  onChange={setZoomLevel}
/>
```

Or better, make it responsive:

```tsx
<ZoomSlider
  variant="full" // or "compact"
  value={zoomLevel}
  onChange={setZoomLevel}
/>
```

---

### Component: Toolbar (Tool Palette)

**Figma Node:** 160-723
**Screenshot:** (Shows horizontal and vertical toolbar variants)

#### Naming

- **Figma Name:** Toolbar
- **Proposed Code Name:** `ToolPalette` or `ViewerToolbar`
- **Rationale:** "Toolbar" is fine, but "ViewerToolbar" clarifies it's for the 3D viewer specifically.

#### Role

Tool palette for 3D viewer interactions. Contains icon buttons for view controls (camera, 3D mode, screenshot, ruler). Has 2 orientation variants.

#### Dimensions

**Default (Horizontal):**
| Property | Value (px) | Tailwind |
|----------|------------|----------|
| Width | 500px | w-[500px] |
| Height | 50px | h-[50px] |
| Padding X | 160px | px-40 (excessive?) |
| Padding Y | 16px | py-4 |
| Gap | 48px | gap-12 |

**Side (Vertical):**
| Property | Value (px) | Tailwind |
|----------|------------|----------|
| Width | 50px | w-[50px] |
| Height | 300px | h-[300px] |
| Padding X | 16px | py-4 (rotated) |
| Padding Y | 160px | px-40 (rotated) |
| Gap | 16px | gap-4 |

#### Positioning

- **Position Type:** Likely `absolute` or `fixed`
- **Default (horizontal):** Bottom center of viewport
- **Side (vertical):** Left or right edge of viewport

#### Colors

| Element    | Color                            | Variable                                |
| ---------- | -------------------------------- | --------------------------------------- |
| Background | rgba(212,212,212,0.3)            | Semi-transparent gray                   |
| Border     | #02eee1 (3px)                    | var(--color/border/interactive/primary) |
| Shadow     | 4px 4px 20px rgba(2,238,225,0.1) | Subtle glow                             |

#### Spacing

**Horizontal variant:**

- Padding: 160px × 16px (seems excessive horizontally)
- Gap: 48px between icons
- Total content width: ~160px (4 icons × 40px)
- Container: 500px (lots of empty space)

**Vertical variant:**

- Padding: 16px × 160px (rotated)
- Gap: 16px between icons
- Total content height: ~80px (2 icons × 40px)
- Container: 300px (lots of empty space)

**Note:** The excessive padding suggests this might be a design error, or the toolbar is meant to have more tools in production.

#### Border & Shadow

- **Border:** 3px solid #02eee1
- **Border Radius:** 16px (var(--radius/16))
- **Shadow:** 4px 4px 20px rgba(2,238,225,0.1) - subtle cyan glow

#### States

Controlled by `bar` prop:

- **"Default":** Horizontal layout with 4 tools
- **"side":** Vertical layout with 2 tools (rotated -90°)

#### Internal Elements

**Default (Horizontal) - 4 Tools:**

1. **PhCubeFocusLight** - Focus on selected object
2. **TablerCube3DSphere** - 3D view mode
3. **MdiCameraLockOutline** - Lock/unlock camera
4. **ClarityRulerPencilLine** - Measurement tool

**Side (Vertical) - 2 Tools (rotated -90°):**

1. **MingcuteAiLine** - AI Assistant toggle
2. **FluentTagSearch24Regular** - Part search

**All icons:**

- Size: 40×40px
- State variants: Default, hover, press (see ToolbarItem)

#### Auto Layout

- **Container:** Flexbox
  - Default: horizontal (`flex-row`)
  - Side: vertical (`flex-col`)
- **Alignment:** `items-center justify-center`
- **Gap:** 48px (default) or 16px (side)

#### shadcn/ui Mapping

- **N/A** - Custom component
- Could use `ToggleGroup` if tools are mutually exclusive
- Icons can use `Button` variant="ghost"

#### Asset Classification

- **Container:** CODE
- **Icons:** SVG (from icon libraries or Figma exports)

#### Interactions

- **Click tool:** Activate tool mode
- **Active tool:** Visual indicator (background color change - see ToolbarItem press state)
- **Hover:** Show tooltip with tool name
- **Keyboard:** Number keys 1-4 for quick access?

#### Accessibility

- `role="toolbar"` on container
- aria-label="3D viewer tools"
- Each button has aria-label with tool name
- Keyboard navigation (Tab, Arrow keys)
- aria-pressed="true" for active tool
- Tooltips for tool names

#### Responsive Behavior

**Desktop:** Horizontal at bottom center
**Laptop:** Same
**Tablet/Mobile:** Vertical on side, or hide some tools

#### Implementation Notes

```tsx
<Toolbar orientation="horizontal">
  {" "}
  {/* or "vertical" */}
  <ToolbarButton icon={CubeFocus} label="Focus" />
  <ToolbarButton icon={Cube3D} label="3D View" />
  <ToolbarButton icon={CameraLock} label="Lock Camera" />
  <ToolbarButton icon={Ruler} label="Measure" />
</Toolbar>
```

**Dynamic tools based on orientation:**

```tsx
const tools = {
  horizontal: [focus, view3d, camera, ruler],
  vertical: [aiAssistant, search],
};
```

---

### Component: ToolbarItem (Individual Tool Button)

**Figma Node:** 375-1336
**Screenshot:** (Shows 6 different tool icons with 3 states each)

#### Naming

- **Figma Name:** Frame (node-id suggests this is the container for item variants)
- **Proposed Code Name:** `ToolbarButton` or `ToolButton`
- **Rationale:** More descriptive than "ToolbarItem". Indicates it's an interactive button.

#### Role

Individual tool button with icon and 3 interactive states (Default, hover, press). Used within Toolbar component.

#### Dimensions

| Property      | Value (px)             | Tailwind   |
| ------------- | ---------------------- | ---------- |
| Width         | 40px                   | w-10       |
| Height        | 40px                   | h-10       |
| Border Radius | 8px (on hover/press)   | rounded-lg |
| Icon Size     | ~30px (varies by icon) | -          |

#### Available Icons (with states)

**1. PhCubeFocusLight** (Cube focus)

- States: Default, hover, press
- Icon: 3D cube with focus frame

**2. TablerCube3DSphere** (3D sphere view)

- States: Default, hover, status3
- Icon: Wireframe sphere

**3. MdiCameraLockOutline** (Camera lock)

- States: Default, hover, status3
- Icon: Camera with lock

**4. ClarityRulerPencilLine** (Measurement)

- States: Default, hover, status3
- Icon: Ruler with pencil

**5. MingcuteAiLine** (AI assistant)

- States: Default, hover, press
- Icon: AI sparkle

**6. FluentTagSearch24Regular** (Part search)

- States: Default, hover, press
- Icon: Tag with magnifying glass

#### Colors by State

| State             | Background     | Icon Color      | Border Radius |
| ----------------- | -------------- | --------------- | ------------- |
| **Default**       | Transparent    | ~#a1a1a1 (gray) | None          |
| **hover**         | #a1a1a1 (gray) | #171717 (dark)  | 8px           |
| **press/status3** | #02eee1 (cyan) | #171717 (dark)  | 8px           |

**Color Variables:**

- Default icon: Not specified (appears gray in exports)
- Hover background: var(--color/bg/interactive/hover, #a1a1a1)
- Press background: var(--color/bg/interactive/primary, #02eee1)

#### States

| State       | When                    | Visual                               |
| ----------- | ----------------------- | ------------------------------------ |
| **Default** | Tool inactive, no hover | Transparent background, gray icon    |
| **hover**   | Mouse over              | Gray background, dark icon, rounded  |
| **press**   | Tool active/selected    | Cyan background, dark icon, rounded  |
| **status3** | Alternative press state | Same as press (naming inconsistency) |

**Note:** "status3" appears to be the same as "press" - Figma naming inconsistency.

#### Spacing

- **No padding** - Icon fills 40×40px container
- **Icon positioning:** Centered, varies by icon shape

#### Auto Layout

- **Container:** 40×40px fixed size
- **Icon:** Centered within container (absolute positioned or flex centered)

#### States Implementation

```tsx
// Suggested state management
type ToolState = "default" | "hover" | "active";

const bgClass = {
  default: "",
  hover: "bg-neutral-500 rounded-lg",
  active: "bg-primary rounded-lg",
};
```

#### shadcn/ui Mapping

- **Button** component with variant="ghost"
- **Toggle** for active state
- Custom styling for hover/active states

#### Asset Classification

- **Icons:** SVG (export from Figma or use icon library)
- **Structure:** CODE

#### Interactions

- **Hover:** Background appears, icon darkens
- **Click:** Activates tool, press state visible
- **Active tool:** Press state persists until another tool selected
- **Keyboard:** Space/Enter to activate when focused

#### Accessibility

- `<button>` element
- aria-label with tool name (e.g., "Focus on object")
- aria-pressed="true" when active
- Focus indicator (outline on keyboard focus)
- Tooltip on hover (optional but recommended)

#### Implementation Notes

```tsx
<ToolbarButton
  icon={PhCubeFocusLight}
  label="Focus"
  isActive={activeTool === "focus"}
  onClick={() => setActiveTool("focus")}
/>
```

**Icon components:** Each icon should be a React component that accepts `status` prop:

```tsx
<PhCubeFocusLight
  status={isActive ? "press" : isHovered ? "hover" : "Default"}
/>
```

**Simplification:** The individual icon components (PhCubeFocusLight, etc.) can be replaced with a single `Icon` component that loads SVGs:

```tsx
<Icon name="cube-focus" status={status} />
```

---

## Sidebar Variants Analysis

### Identified Components

1. **Slidebar** (160-577) - Horizontal zoom slider, 1200px, 10 levels
2. **SlidebarPartClick** (232-1062) - Horizontal zoom slider, 960px, 8 levels
3. **SidebarIfClickPart** (232-967) - Vertical info panel, 400×750px

### Analysis

**Slidebar vs SlidebarPartClick:**

- These are **NOT different components** - they are **size variants** of the same slider
- Identical visual design (gray track, cyan handle, shadows)
- Only differences: width (1200 vs 960), max zoom (10 vs 8), track height (16 vs 12)
- Should be **one component** with responsive sizing or variant prop

**SidebarIfClickPart:**

- **Completely different component** - vertical panel, not a slider
- Name is confusing ("Slidebar" vs "Sidebar")
- Should be renamed to distinguish from sliders

### Recommended Naming

| Figma Name         | Issue             | Proposed Name       | Type        |
| ------------------ | ----------------- | ------------------- | ----------- |
| Slidebar           | Typo, confusing   | `ZoomSlider`        | Range input |
| SlidebarPartClick  | Redundant variant | `ZoomSlider` (same) | Range input |
| SidebarIfClickPart | Unclear trigger   | `PartInfoSidebar`   | Panel       |

### State Management

**ZoomSlider:**

```tsx
// Single component with variants
<ZoomSlider
  variant="full" // full (1200px, 10 levels) or compact (960px, 8 levels)
  value={zoomLevel} // 1-10 or 1-8
  onChange={setZoomLevel}
/>
```

**PartInfoSidebar:**

```tsx
// Controlled visibility
<PartInfoSidebar
  isOpen={selectedPart !== null}
  partId={selectedPart?.id}
  onClose={() => setSelectedPart(null)}
/>
```

**Layout Integration:**

```tsx
// When sidebar opens, shrink slider
{
  isSidebarOpen ? (
    <ZoomSlider variant="compact" />
  ) : (
    <ZoomSlider variant="full" />
  );
}
```

---

## Navigation Variants Analysis

### Components

1. **Navigation** (130-135) - Korean labels (소개, 기능, 학습 모델, 문의)
2. **MainNavigation** (130-279) - English labels (HOME, STUDY, CAD, LAB)
3. **LoginHeader** (130-188) - Full header with 3 variants (Landing, main, login)

### Shared Elements

All three share:

- **Typography:** Pretendard:Bold, 40px, white text
- **Layout:** Horizontal flex, 80px gap
- **Dimensions:** 70×48px per label

### Unique Elements

**Navigation (Landing):**

- Korean text
- Used on landing page
- Links to page sections (smooth scroll)

**MainNavigation (Main):**

- English text
- Used in main app
- Links to app routes

**LoginHeader (Complete Header):**

- Contains logo + navigation + buttons
- 3 variants based on context
- Combines all elements into full header

### Recommendation: Component Architecture

**Option 1: Single Header Component**

```tsx
<AppHeader variant="landing" | "main" | "login" />
```

- Handles all logic internally
- Simplest API
- Less flexible

**Option 2: Composable Components**

```tsx
<AppHeader>
  <AppHeader.Logo />
  <AppHeader.Nav items={landingNavItems} />
  <AppHeader.Actions>
    <Button>Login</Button>
    <Button>Start</Button>
  </AppHeader.Actions>
</AppHeader>
```

- Maximum flexibility
- More complex
- Better for customization

**Option 3: Hybrid (Recommended)**

```tsx
// Pre-configured variants
<LandingHeader />
<MainHeader />
<LoginHeader userName="jun1" />

// All use shared base
<Header logo={<Logo />} nav={<Nav items={...} />} actions={<Actions />} />
```

### Component Hierarchy

```
AppHeader (base)
├── Logo (shared)
├── NavLabels (parameterized)
│   ├── items: NavItem[]
│   └── variant: 'landing' | 'main'
└── CTAButtons (conditional)
    ├── LoginButton (landing/login)
    └── StartButton (all variants)
```

---

## Design System Extraction

### Color Palette

| Token                   | Hex                   | Usage                         | Variable                           |
| ----------------------- | --------------------- | ----------------------------- | ---------------------------------- |
| **Primary**             | #02eee1               | Borders, active states, icons | --color/border/interactive/primary |
| **Primary (30% alpha)** | rgba(2,238,225,0.3)   | Backgrounds, glass effects    | -                                  |
| **Primary (20% alpha)** | rgba(2,238,225,0.2)   | Borders, subtle effects       | -                                  |
| **Primary (10% alpha)** | rgba(2,238,225,0.1)   | Shadows, glows                | -                                  |
| **White**               | #fafafa               | Primary text, icons           | --color/text/interactive/inverse   |
| **White (30% alpha)**   | rgba(255,255,255,0.3) | Glass backgrounds             | -                                  |
| **Gray Light**          | #d4d4d4               | Secondary text                | --color/text/teritary              |
| **Gray Mid**            | #a1a1a1               | Hover states                  | --color/bg/interactive/hover       |
| **Gray Dark**           | rgba(212,212,212,0.3) | Panel backgrounds             | -                                  |
| **Gray Track**          | #d9d9d9               | Slider tracks                 | -                                  |
| **Dark Background**     | #171717               | Page background               | (assumed)                          |

### Typography System

| Style              | Font                | Size | Weight | Line Height | Usage                                |
| ------------------ | ------------------- | ---- | ------ | ----------- | ------------------------------------ |
| **Heading XL**     | Pretendard:Bold     | 40px | 700    | 1.25        | Navigation labels                    |
| **Heading LG**     | Pretendard:SemiBold | 32px | 600    | 1.25        | Buttons, section titles, legal links |
| **Body LG Medium** | Pretendard:Medium   | 16px | 500    | 1.5         | Content text                         |
| **Body SM**        | Pretendard:Regular  | 16px | 400    | 1.406       | Copyright, small text                |

**Font Family:** Pretendard (Korean-optimized)

- Bold: 700
- SemiBold: 600
- Medium: 500
- Regular: 400

### Spacing System

| Token         | Value (px) | Tailwind     | Usage                           |
| ------------- | ---------- | ------------ | ------------------------------- |
| --spacing/8   | 8px        | gap-2        | Tight gaps (footer logo)        |
| --spacing/16  | 16px       | gap-4, p-4   | Standard gaps, padding          |
| --spacing/24  | 24px       | gap-6, p-6   | Medium gaps                     |
| --spacing/32  | 32px       | gap-8, p-8   | Large gaps, header padding      |
| --spacing/40  | 40px       | gap-10, p-10 | Legal links gap, footer padding |
| --spacing/48  | 48px       | gap-12, p-12 | XL gaps, sidebar padding        |
| --spacing/80  | 80px       | gap-20, p-20 | Navigation gaps, header padding |
| --spacing/160 | 160px      | p-40         | Toolbar padding (excessive?)    |

### Border Radius System

| Token           | Value (px) | Tailwind       | Usage                          |
| --------------- | ---------- | -------------- | ------------------------------ |
| --radius/8      | 8px        | rounded-lg     | Toolbar icons (hover/press)    |
| --radius/16     | 16px       | rounded-2xl    | Toolbar container              |
| --radius/24     | 24px       | rounded-[24px] | Buttons, panels, content boxes |
| --radius/circle | 99999px    | rounded-full   | Slider track & handle          |

### Shadow System

| Type                  | Value                              | Usage                    |
| --------------------- | ---------------------------------- | ------------------------ |
| **Button/Panel Glow** | 4px 4px 20px rgba(2,238,225,0.1)   | Buttons, toolbar, header |
| **Slider Handle**     | 4px 4px 10px 2px rgba(0,0,0,0.25)  | Slider thumb             |
| **Track Inset**       | inset 0px 4px 4px rgba(0,0,0,0.25) | Slider track depth       |

### Border System

| Type               | Value                         | Usage                     |
| ------------------ | ----------------------------- | ------------------------- |
| **Primary Border** | 3px solid #02eee1             | Panels, sidebars, toolbar |
| **Button Border**  | 5px solid rgba(2,238,225,0.2) | CTA buttons               |
| **Active Border**  | 2px solid #02eee1             | Slider handle             |

### Glassmorphism Effect

Consistent pattern across components:

```css
background: rgba(212, 212, 212, 0.3); /* or rgba(255,255,255,0.3) */
border: 3px solid rgba(2, 238, 225, 0.2);
backdrop-filter: blur(10px); /* add if not in Figma */
box-shadow: 4px 4px 20px rgba(2, 238, 225, 0.1);
```

---

## Implementation Priority

### Phase 1: Foundation (Week 1)

1. **AppHeader** - Used on all pages, blocks other work
2. **Footer** - Simple, can be done in parallel
3. **Design tokens** - Extract colors, typography, spacing to CSS variables

### Phase 2: Viewer UI (Week 1-2)

4. **Toolbar** - Core viewer functionality
5. **ToolbarButton** - Needed by Toolbar
6. **ZoomSlider** - Core viewer control

### Phase 3: Advanced Features (Week 2)

7. **PartInfoSidebar** - Feature enhancement, not blocking

### Rationale

- **Header first:** Every page needs it, nothing can be fully tested without it
- **Footer second:** Landing page completion
- **Toolbar/Slider together:** Core 3D viewer controls
- **Sidebar last:** Enhancement feature, can be skipped for MVP

---

## Component Dependencies

### Dependency Tree

```
AppHeader
├── Logo (IMAGE - export from Figma)
├── NavLabels
│   └── Label (reusable text component)
├── CTAButton (from Phase 1 - ui-basic-components.md)
└── No dependencies

Footer
├── Logo (IMAGE - export from Figma, smaller version)
└── No dependencies

Toolbar
├── ToolbarButton
│   ├── PhCubeFocusLight (SVG icon)
│   ├── TablerCube3DSphere (SVG icon)
│   ├── MdiCameraLockOutline (SVG icon)
│   ├── ClarityRulerPencilLine (SVG icon)
│   ├── MingcuteAiLine (SVG icon)
│   └── FluentTagSearch24Regular (SVG icon)
└── No dependencies

ZoomSlider
└── shadcn/ui Slider (install dependency)

PartInfoSidebar
├── shadcn/ui Sheet (install dependency)
└── Icon components (mingcute:ai-line, part info icon)
```

### Asset Export Checklist

**Images to Export from Figma:**

- [ ] Logo image (full size for header) - SVG preferred
- [ ] Logo text (full size for header) - SVG preferred
- [ ] Logo image (small for footer) - SVG preferred
- [ ] Logo text (small for footer) - SVG preferred
- [ ] Part info icon (custom) - SVG

**Icons (check if available in icon libraries first):**

- [ ] mingcute:ai-line - Check @iconify/react
- [ ] fluent:tag-search-24-regular - Check @iconify/react
- [ ] clarity:ruler-pencil-line - Check @iconify/react
- [ ] mdi:camera-lock-outline - Check @iconify/react
- [ ] tabler:cube-3d-sphere - Check @iconify/react
- [ ] ph:cube-focus-light - Check @iconify/react

If not in libraries, export from Figma as SVG.

---

## Design Issues & Questions for Designer

### Naming Inconsistencies

1. **"Slidebar"** - Typo? Should be "Slider" or "Sidebar"?
2. **"ToolbarItem" vs "Frame"** - Figma node-id 375-1336 is named "Frame"
3. **"status3" vs "press"** - Same state with different names across icons

### Missing States

1. **Navigation hover states** - How should labels look on hover?
2. **Active page indicator** - How to show current page in navigation?
3. **Header on scroll** - Does it change (background, shadow)?
4. **Sidebar close button** - Not shown in design
5. **Mobile layouts** - No responsive designs provided

### Design Questions

1. **Toolbar padding** - 160px horizontal padding seems excessive (80% empty space). Intentional?
2. **Content box padding** - 153×105px padding in sidebar leaves little room for actual content
3. **Slidebar variants** - Should these be responsive (auto-switch based on screen width)?
4. **Header variants** - Should main app header have CTA buttons?
5. **Footer placement** - Landing page only, or all pages?

### Accessibility Gaps

1. **Focus indicators** - No focus states designed for keyboard navigation
2. **Button labels** - Toolbar icons need text labels or tooltips
3. **Color contrast** - Gray text (#d4d4d4) on dark background may fail WCAG AA
4. **Screen reader text** - Need aria-labels for icon-only buttons

### Technical Constraints

1. **Fixed widths** - 1920px designs won't work on smaller screens
2. **Korean/English switching** - Need internationalization strategy
3. **Dynamic content** - Sidebar placeholder text ("부품 설명어쩌궁..") - what's the real content?

---

## Next Steps

### For Development Team

1. **Review this document** - Validate component analysis and naming
2. **Export assets** - Use Figma export or MCP tools to get SVGs
3. **Install dependencies** - shadcn/ui Slider, Sheet components
4. **Create base components** - Start with AppHeader (blocks other work)
5. **Set up design tokens** - CSS variables for colors, spacing, typography
6. **Implement in priority order** - Header → Footer → Toolbar → Slider → Sidebar

### For Design Team

1. **Clarify naming** - Confirm "Slidebar" → "Slider" rename
2. **Add missing states** - Navigation hover, active page indicator, focus states
3. **Design responsive layouts** - Tablet (768px) and mobile (375px) variants
4. **Review spacing** - Confirm excessive toolbar/content padding is intentional
5. **Provide real content** - Replace placeholder text with actual examples
6. **Accessibility audit** - Add focus states, improve contrast, add labels

### For Product Team

1. **Define header strategy** - Which variant on which pages?
2. **Internationalization** - Korean vs English switching logic
3. **Sidebar behavior** - When does it open/close? Persistent or modal?
4. **Toolbar tools** - Finalize which tools are needed (more than shown?)
5. **Footer content** - Update "© 2026" to actual year, add social links?

---

## Conclusion

This phase analyzed 9 layout components that form the structural foundation of the SIMVEX application. Key findings:

**Strengths:**

- Consistent design system (colors, typography, spacing)
- Beautiful glassmorphism aesthetic
- Clear component variants for different contexts

**Challenges:**

- Naming inconsistencies (Slidebar vs Sidebar)
- Missing responsive designs
- Excessive padding in some components
- No hover/focus states for accessibility

**Recommendations:**

1. Consolidate slider variants into single responsive component
2. Rename components for clarity (Slidebar → ZoomSlider, etc.)
3. Add missing interactive states (hover, focus, active)
4. Design mobile layouts before implementation
5. Extract design tokens to CSS variables for consistency

**Next Phase:** Interactive components (modals, forms, cards) - Phase 3.
