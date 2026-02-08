# Phase 1: Main Page Structure Analysis

## Overview

The Main application page is the core interface of the SIMVEX 3D simulation platform. It features a clean, dark-themed layout optimized for 3D visualization work, with a horizontal toolbar, vertical sidebar tools, and an integrated chat interface. The design is based on a 1920px viewport width and uses a combination of Flexbox layouts for responsive component arrangement.

**Key Characteristics:**

- Dark theme (#171717 primary background) optimized for 3D rendering
- Fixed header (133px height) with logo and navigation
- Main content area (879px height) with flexible 3D viewer space
- Floating toolbar controls with cyan accent color (#02eee1)
- Collapsible chat sidebar for AI assistance
- Total viewport: 1920px × 1012px (header + main content)

## Main Page - node-id: 375:1338

### Layout Structure

The main application uses a **vertical Flexbox layout** (`flex-col`) with two primary sections stacked:

```
┌─────────────────────────────────────────────────────────────┐
│ Header (login header) - 1920px × 133px                      │ ← Fixed height
├─────────────────────────────────────────────────────────────┤
│ Main Content Area - 1920px × 879px                         │
│ ┌──────────────────────────────────┬────────────────────┐  │
│ │ 3D Viewer Area (flex-1)          │ Side Tools (50px)  │  │
│ │ ┌──────────────────────────┐     │ ┌────────────────┐ │  │
│ │ │ Toolbar (500px × 50px)    │     │ │ Vertical Tools │ │  │
│ │ └──────────────────────────┘     │ │ (rotated 90°)  │ │  │
│ │                                   │ └────────────────┘ │  │
│ │ [3D Canvas Rendering Area]        │                    │  │
│ │                                   │                    │  │
│ │ ┌──────────────────────────┐     │                    │  │
│ │ │ SlideBar (1200px × 57px)  │     │                    │  │
│ │ └──────────────────────────┘     │                    │  │
│ └──────────────────────────────────┴────────────────────┘  │
└─────────────────────────────────────────────────────────────┘

Optional Chat Sidebar (overlays or pushes from left):
┌──────────┐
│ ChatSide │ 311px × 879px
│ (toggle) │
└──────────┘
```

### Layout Method

**Overall Container:** Vertical Flexbox (`flex flex-col`)

- Header: Fixed height (133px)
- Main: Fixed height (879px)

**Main Content Area:** Horizontal Flexbox (`flex justify-between`)

- Left section: Flex-grow container (`flex-1`) for 3D viewer + controls
- Right section: Fixed width (50px) for rotated vertical toolbar

**3D Viewer Section:** Vertical Flexbox (`flex flex-col justify-between`)

- Top: Horizontal toolbar (500px × 50px)
- Center: Flexible 3D canvas space (grows to fill)
- Bottom: Zoom slider (1200px × 57px)

### Area Breakdown

#### Header (login header)

**node-id:** 130:770

- **Position:** Top of page, full width
- **Dimensions:**
  - Width: 1920px (100%) → `w-full`
  - Height: 133.096px → `h-[133px]`
  - Ratio: Full width, 13.1% of total height
- **Layout:** Horizontal Flexbox (`flex gap-[48px]`)
- **Role:** Primary navigation and branding
- **Component placeholders:**
  - Logo (325px width): Logo image (73.616px × 69.096px) + Logo text (234px × 40px)
  - Main navigation: 4 nav items (HOME, STUDY, CAD, LAB) - each 70px × 48px
- **Padding:** 80px horizontal, 32px vertical → `px-[80px] py-[32px]`
- **Background:** Inherits from parent (#171717)
- **Typography:**
  - Font: Pretendard Bold
  - Size: 40px (unit/40)
  - Color: #fafafa (text/interactive/inverse)
  - Line height: 1.25

**Navigation Structure:**

```
Logo (325px) [gap: 48px] Navigation Items (280px total with gaps)
├─ Logo Image (73.616px × 69.096px)
├─ Logo Text (234px × 40px)
└─ Nav: HOME | STUDY | CAD | LAB (70px each, 80px gaps between)
```

#### Main Content Container

**node-id:** 160:776

- **Position:** Below header
- **Dimensions:**
  - Width: 1920px (100%) → `w-[1920px]`
  - Height: 879px → `h-[879px]`
  - Ratio: Full width, 86.9% of total height
- **Layout:** Horizontal Flexbox (`flex justify-between`)
- **Padding:** 80px horizontal, 40px vertical → `px-[80px] py-[40px]`
- **Background:** #171717 (bg/primary)
- **Gap:** Natural spacing from `justify-between`

#### 3D Viewer Area (Center-Left)

**node-id:** I160:776;160:772

- **Position:** Left side of main content, takes remaining space
- **Dimensions:**
  - Width: ~1710px (calculated: 1920 - 160 padding - 50 side tools) → `flex-[1_0_0]` (flex-1)
  - Height: 733px (879 - 80 padding - 66px from controls) → `h-[733px]`
  - Ratio: ~89% of content width
- **Layout:** Vertical Flexbox (`flex flex-col justify-between`)
- **Role:** Primary 3D canvas rendering area with floating controls
- **Component placeholders:**
  - **Top:** Horizontal ToolBar (500px × 50px) - 4 tool icons
  - **Center:** 3D Canvas (Three.js rendering area) - grows to fill
  - **Bottom:** SlideBar/Zoom control (1200px × 57px)
- **Background:** Transparent (3D canvas will render here)
- **Special notes:**
  - This is where the R3F Canvas component will mount
  - Controls float above/below the 3D space
  - Gap of `justify-between` pushes toolbar to top, slider to bottom

**Toolbar (Horizontal) - node-id: 156:922**

- Dimensions: 500px × 50px → `w-[500px] h-[50px]`
- Position: Top of 3D viewer area
- Layout: Horizontal Flexbox (`gap-[48px]`)
- Padding: 160px horizontal, 16px vertical → `px-[160px] py-[16px]`
- Background: rgba(212,212,212,0.3) with cyan border
- Border: 3px solid #02eee1 → `border-3 border-[#02eee1]`
- Border radius: 16px → `rounded-[16px]`
- Shadow: `4px 4px 20px 0px rgba(2,238,225,0.1)`
- Icons (4 total, 40px × 40px each):
  1. ph:cube-focus-light (Object selection)
  2. tabler:cube-3d-sphere (3D primitives)
  3. mdi:camera-lock-outline (Camera controls)
  4. clarity:ruler-pencil-line (Measurement tools)

**SlideBar/Zoom Control - node-id: 160:577**

- Dimensions: 1200px × 57px → `w-[1200px] h-[57px]`
- Position: Bottom of 3D viewer area
- Components:
  - Track: 1200px × 16px, #d9d9d9, rounded-full, top offset 21px
  - Track shadow: `inset 0px 4px 4px 0px rgba(0,0,0,0.25)`
  - Thumb: 120px × 32px, rgba(2,238,225,0.3) with #02eee1 border
  - Thumb border: 2px solid #02eee1
  - Thumb shadow: `4px 4px 10px 2px rgba(0,0,0,0.25)`
- Purpose: Zoom level control for 3D viewport

#### Side Tools (Right Panel)

**node-id:** 160:724

- **Position:** Right edge of main content
- **Dimensions:**
  - Width: 50px → `w-[50px]`
  - Height: 300px (visible area) → `h-[300px]`
  - Ratio: 2.6% of content width
- **Layout:** Rotated container (`rotate-90`)
  - Inner toolbar: 300px × 50px (before rotation)
  - After rotation: appears as 50px wide vertical strip
- **Role:** Vertical tool palette for AI and search functions
- **Component placeholders:**
  - Rotated ToolBar component with 2 icons (also rotated -90° to stay upright):
    1. mingcute:ai-line (AI assistant toggle)
    2. fluent:tag-search-24-regular (Part search)
- **Background:** Same as horizontal toolbar
- **Border/Shadow:** Matches horizontal toolbar styling
- **Gap:** 16px between icons → `gap-[16px]`
- **Special behavior:**
  - Entire toolbar rotated 90° clockwise
  - Icons rotated -90° to appear upright
  - Clicking AI icon toggles chat sidebar

#### Chat Side Panel (Left, Toggleable)

**node-id:** 236:1536

- **Position:** Left edge, overlays or pushes content (toggleable)
- **Dimensions:**
  - Width: 311px → `w-[311px]`
  - Height: 879px (full main content height) → `h-[879px]`
  - Ratio: 16.2% of viewport width
- **Layout:** Vertical Flexbox (`flex flex-col gap-[160px]`)
- **Role:** AI chat interface and conversation history
- **Component placeholders:**
  - **Top:** Hamburger menu icon (40px × 40px) - collapse/expand
  - **Middle:** Navigation section
    - "New Chat" button with chat-dots icon (147px × 147px icon)
    - "History" section with list of history items (76px wide)
      - Each history item: 76px × 21px, 7px gap between
      - 7 history items shown
  - **Bottom:** Chat messages area (UserChat, AIChat components)
  - **Input field:** 896px × 40px (when chat is active)
- **Padding:** 24px all sides → `p-[24px]`
- **Background:** #404040 (bg/secondary)
- **Border:** None visible (could add shadow when active)
- **Typography:**
  - Headers: Pretendard SemiBold, 16px, #e5e5e5 (text/secondary)
  - History items: Pretendard Medium, 14px, #d4d4d4 (text/tertiary)
- **Collapsible:** Yes, triggered by hamburger or AI icon in side tools
- **Z-index note:** Should overlay above 3D viewer when active

### Dimensions & Proportions Summary

| Area                    | Width (px) | Width (%) | Width (Tailwind) | Height (px) | Height (Tailwind) |
| ----------------------- | ---------- | --------- | ---------------- | ----------- | ----------------- |
| **Overall Viewport**    | 1920       | 100%      | w-full           | 1012        | h-[1012px]        |
| **Header**              | 1920       | 100%      | w-full           | 133         | h-[133px]         |
| **Main Content**        | 1920       | 100%      | w-[1920px]       | 879         | h-[879px]         |
| **3D Viewer Container** | ~1710      | 89%       | flex-1           | 733         | h-[733px]         |
| **Horizontal Toolbar**  | 500        | 26%       | w-[500px]        | 50          | h-[50px]          |
| **Zoom SlideBar**       | 1200       | 62.5%     | w-[1200px]       | 57          | h-[57px]          |
| **Side Tools**          | 50         | 2.6%      | w-[50px]         | 300         | h-[300px]         |
| **Chat Sidebar**        | 311        | 16.2%     | w-[311px]        | 879         | h-[879px]         |

**With Chat Open:**
| Area | Adjusted Width | Notes |
|------|---------------|-------|
| Chat Sidebar | 311px | Fixed |
| Available for 3D | ~1529px | Reduced from ~1710px |

### Colors & Styling

#### Background Colors

- **Primary background:** `#171717` (var(--color/bg/primary)) - Main canvas
- **Secondary background:** `#404040` (var(--color/bg/secondary)) - Chat sidebar
- **Interactive overlay:** `rgba(212,212,212,0.3)` - Toolbar backgrounds
- **Slider track:** `#d9d9d9` - Zoom slider background
- **Accent overlay:** `rgba(2,238,225,0.3)` - Active/hover states

#### Border & Accent Colors

- **Primary accent:** `#02eee1` (var(--color/border/interactive/primary)) - Cyan
  - Used for: All toolbar borders, slider thumb border, active states
  - Width: 3px for toolbars, 2px for slider thumb
  - Creates strong visual identity

#### Text Colors

- **Primary text:** `#fafafa` (var(--color/text/interactive/inverse)) - Navigation
- **Secondary text:** `#e5e5e5` (var(--color/text/secondary)) - Chat headers
- **Tertiary text:** `#d4d4d4` (var(--color/text/tertiary)) - Chat history

#### Shadows & Effects

- **Toolbar glow:** `4px 4px 20px 0px rgba(2,238,225,0.1)` - Subtle cyan glow
- **Slider track inset:** `inset 0px 4px 4px 0px rgba(0,0,0,0.25)` - Depth
- **Slider thumb shadow:** `4px 4px 10px 2px rgba(0,0,0,0.25)` - Elevation

#### Typography System

**Headers (Navigation):**

- Font family: Pretendard Bold (var(--typography/heading/font-family))
- Font size: 40px (var(--unit/40))
- Font weight: 700 (heading/xl/font-weight)
- Line height: 1.25
- Letter spacing: 0

**Body Large Semibold (Chat headers):**

- Font family: Pretendard SemiBold (var(--typography/body/font-family))
- Font size: 16px (var(--unit/16))
- Font weight: 600 (body/lg/semibold/font-weight)
- Line height: 1.5
- Letter spacing: 0

**Body Medium (Chat history):**

- Font family: Pretendard Medium
- Font size: 14px (var(--unit/14))
- Font weight: 500 (body/md/medium/font-weight)
- Line height: 1.5
- Letter spacing: 0

#### Border Radius

- **Toolbar/controls:** 16px (var(--radius/16))
- **Slider elements:** 99999px (var(--radius/circle)) - Full rounded

### Component Placeholders by Area

#### Header Area

- **Logo Component** (node-id: I130:770;130:238)
  - Logo image: 73.616px × 69.096px (SVG/PNG asset)
  - Logo text: 234px × 40.037px (SVG/PNG asset)
  - Gap: 17.22px
  - Total width: 325px

- **Navigation Labels** (4 items)
  - Component: `Label` component (or simple button/link)
  - Dimensions: 70px × 48px each
  - Text: HOME, STUDY, CAD, LAB
  - State variants: Default, Press (likely hover/active states)
  - Interactive: Click to navigate to different sections

#### 3D Viewer Area

**Toolbar Components (Horizontal):**

1. **PhCubeFocusLight** - Object selection tool
   - Icon: ph:cube-focus-light (40px × 40px)
   - Purpose: Select and focus on 3D objects

2. **TablerCube3DSphere** - 3D primitive creation
   - Icon: tabler:cube-3d-sphere (40px × 40px)
   - Purpose: Add basic 3D shapes (cube, sphere, etc.)

3. **MdiCameraLockOutline** - Camera controls
   - Icon: mdi:camera-lock-outline (40px × 40px)
   - Purpose: Lock/unlock camera, adjust view settings

4. **ClarityRulerPencilLine** - Measurement tools
   - Icon: clarity:ruler-pencil-line (40px × 40px)
   - Purpose: Measure distances, angles in 3D space

**Slider Component:**

- **SlideBar** - Zoom control
  - Track: 1200px × 16px gray bar
  - Thumb: 120px × 32px draggable handle
  - Purpose: Control zoom level of 3D viewport
  - Values: Likely 0-100% or specific zoom levels

#### Side Tools Area

**Vertical Toolbar Components (Rotated):**

1. **MingcuteAiLine** - AI assistant
   - Icon: mingcute:ai-line (40px × 40px, rotated -90°)
   - Purpose: Toggle AI chat sidebar
   - State: Active when chat is open

2. **FluentTagSearch24Regular** - Part search
   - Icon: fluent:tag-search-24-regular (40px × 40px, rotated -90°)
   - Purpose: Search for parts/components in library
   - Interaction: Opens search panel/modal

#### Chat Sidebar Area

**Navigation Components:**

- **Hamburger Menu** - Toggle button
  - Icon: Hamburger icon (40px × 40px)
  - Purpose: Collapse/expand chat sidebar

- **New Chat Button**
  - Icon: bi:chat-dots (147px × 147px - oversized, likely needs adjustment)
  - Text: "New Chat"
  - Purpose: Start new AI conversation

- **History List**
  - Header: "History" text
  - Items: 7 × HistoryChat components (76px × 21px each)
  - Purpose: Access previous chat conversations

**Chat Message Components:**
(Referenced from other artboards: 251:1585)

- **UserChat** (node-id: 236:1504)
  - Dimensions: 432px × 49px (slide bar/user chat)
  - Purpose: Display user messages

- **AIChat** (node-id: 236:1505)
  - Dimensions: 569px × 127px (slide bar/ai chat)
  - Purpose: Display AI responses
  - Likely supports markdown formatting (node: 337:1350)

- **Input Field** (node-id: 236:1315)
  - Dimensions: 896px × 40px (when in ai chat view)
  - Or: 362px × 40px (in popup view - node: 251:1586)
  - Purpose: Text input for chat messages

### Special Behaviors

#### Resizable Panels

- **Chat Sidebar:** Toggleable (show/hide)
  - Trigger: Hamburger icon OR AI icon in side tools
  - Animation: Slide in/out from left
  - When closed: 3D viewer area expands to full width
  - When open: 3D viewer area width reduced by 311px

#### Collapsible Sections

- **Chat History:** Scrollable list
  - Shows 7 items by default
  - Likely scrolls to show more history items
  - Each item clickable to load previous conversation

#### Toggle Behavior

- **AI Chat Panel:**
  - Default state: Closed
  - Open trigger: Click AI icon in side tools OR click elsewhere
  - Close trigger: Click hamburger menu, click AI icon again, or click outside
  - Transition: Smooth slide animation (300ms recommended)

#### Responsive Behavior Hints

Based on 1920px design:

- **At 1680px:** Chat sidebar might need to overlay instead of push
- **At 1440px:** Toolbar icons might need to scale down or reduce padding
- **At 1280px:** Chat sidebar should definitely overlay
- **Mobile:** Not designed for this view (likely separate responsive design)

### z-index Layering

**Base Levels (0-10):**

- 0: Background (#171717)
- 1: 3D Canvas (Three.js renderer)

**UI Controls (10-50):**

- 10: Zoom slider (bottom of viewer)
- 15: Horizontal toolbar (top of viewer)
- 20: Side tools (right edge)
- 25: Header navigation

**Overlays (50-100):**

- 50: Chat sidebar (when open)
- 60: Popup menus from toolbar icons
- 65: Part popup (node: 251:1590 - 272px × 78px)
- 70: Markdown preview (node: 337:1350 - 266px × 210px)

**Modals/Tooltips (100+):**

- 100: Chat popup (compact view, node: 254:1655 - 442px × 694px)
- 110: Tooltips for toolbar icons
- 120: Context menus
- 130: Error notifications/alerts

**Layering Notes:**

- Chat sidebar should slide over 3D viewer, not push it
- Toolbar popups should appear above all viewer content
- Modals should dim/blur background content
- Tooltips should appear on hover with slight delay (300ms)

### Interactions

#### Navigation Between Areas

**Header Navigation:**

- Click HOME/STUDY/CAD/LAB → Navigate to different main sections
- Logo click → Return to home/landing page
- Navigation items show hover state (likely underline or color change)

**Toolbar Interactions:**

- Click tool icon → Activate tool mode (3D cursor changes)
- Active tool → Icon highlighted with cyan border/background
- Hover → Show tooltip with tool name
- Some tools → Open additional option panel/popup

**Side Tools:**

- Click AI icon → Toggle chat sidebar open/closed
- Click search icon → Open part search panel/modal
- Icons rotate with toolbar but stay upright for readability

**Chat Sidebar:**

- Click hamburger → Close sidebar
- Click "New Chat" → Clear current conversation, start fresh
- Click history item → Load that conversation
- Type in input field → Send message on Enter key
- AI responses → Stream in character by character

**3D Viewer:**

- Mouse drag → Rotate camera (orbit controls)
- Scroll wheel → Zoom in/out (also controlled by slider)
- Click object → Select object (highlight with cyan outline)
- Right click → Context menu for selected object
- Keyboard shortcuts → Tool activation (1-4 for toolbar tools)

#### Mode Switches

- **Tool Modes:** Selection, Creation, Camera, Measurement
  - Only one active at a time
  - Indicated by cyan highlight on toolbar

- **Chat States:**
  - Closed (default)
  - Open (AI assistance available)
  - Active conversation (messages visible)

#### Keyboard Shortcuts (Indicated)

Based on toolbar arrangement:

- `1` → Selection tool (PhCubeFocusLight)
- `2` → 3D primitives (TablerCube3DSphere)
- `3` → Camera controls (MdiCameraLockOutline)
- `4` → Measurement (ClarityRulerPencilLine)
- `Tab` → Toggle chat sidebar
- `Esc` → Deselect objects, close popups
- `/` → Focus search (side tools)

### Screenshot

Path: `/Users/justn/Projects/3rd-frontend/docs/screenshots/main-page.png`

Note: Screenshot shows multiple artboard variations including hover/press states for tools, part popup overlay, and chat interface states.

---

## Implementation Notes

### Priority Order

1. **Header + Navigation** - Simple static layout
2. **Main container structure** - Flexbox grid
3. **3D Viewer area** - Empty container for R3F Canvas
4. **Horizontal toolbar** - Floating UI with icons
5. **Zoom slider** - Interactive control
6. **Side tools** - Rotated toolbar
7. **Chat sidebar** - Collapsible panel (can be Phase 2)

### Critical Measurements

- Header height: **133px** (fixed)
- Main content height: **879px** (fixed)
- Toolbar width: **500px** (centered)
- Slider width: **1200px** (centered)
- Chat width: **311px** (when open)
- Side tools: **50px** (fixed)

### Design Tokens to Extract

From Figma variables (need to map to Tailwind/CSS):

- `--color/bg/primary`: #171717
- `--color/bg/secondary`: #404040
- `--color/border/interactive/primary`: #02eee1
- `--color/text/interactive/inverse`: #fafafa
- `--color/text/secondary`: #e5e5e5
- `--color/text/tertiary`: #d4d4d4
- `--spacing/80`: 80px
- `--spacing/48`: 48px
- `--spacing/40`: 40px
- `--spacing/32`: 32px
- `--spacing/24`: 24px
- `--spacing/16`: 16px
- `--spacing/8`: 8px
- `--radius/16`: 16px
- `--radius/circle`: 99999px
- `--unit/40`: 40px
- `--unit/16`: 16px
- `--unit/14`: 14px

### Next Steps

1. Set up CSS variables/Tailwind config for design tokens
2. Create base layout components (Header, MainContent, ViewerArea)
3. Implement toolbar components with icon imports
4. Add slider component with drag functionality
5. Create chat sidebar with toggle animation
6. Integrate R3F Canvas into viewer area
7. Wire up tool interactions and state management
