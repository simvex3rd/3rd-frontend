# Phase 2: Domain Components Analysis

## Overview

This document provides a comprehensive analysis of 11 domain-specific components from the SIMVEX Figma design. These components are categorized into three functional groups:

1. **Card Components** - Display content items (ModelCard, ValueCard)
2. **Chat & Messaging** - Chat interface system (ChatSide, UserChat, AIChat, HistoryChat, Markdown)
3. **Part Interaction** - 3D viewer interaction components (PartInfo, PartPopup, BodyBtn, AIAssistant)

**Figma File:** Vz80RydxWcYHVnn2iuyV0m

---

## Component Grouping

### Card Components

- **ModelCard** (144-299) - 3D model library item cards
- **ValueCard** (144-277) - Value proposition display cards

**Shared Patterns:**

- Border radius: 24px (`rounded-[24px]`)
- Border: 5px solid rgba(2,238,225,0.2) - cyan with transparency
- Shadow: 4px 4px 20px 0px rgba(2,238,225,0.1) - subtle cyan glow
- 4 interactive states: Default (gray), Primary (cyan), Hover (teal), Press (dark teal)
- Consistent state color progression:
  - Default: `rgba(212,212,212,0.3)` - gray
  - Primary: `rgba(2,238,225,0.3)` - bright cyan
  - Hover: `rgba(1,169,160,0.3)` - teal
  - Press: `rgba(1,100,95,0.3)` - dark teal

### Chat & Messaging

- **ChatSide** (236-1535) - Main chat sidebar container
- **UserChat** (236-1485) - User message bubble
- **AIChat** (236-1501) - AI response message bubble
- **HistoryChat** (236-1323) - Chat history list item
- **Markdown** (337-1343) - Rich text content renderer

**Chat Architecture:**

```
ChatSide (full sidebar)
├── Hamburger menu (40×40px)
├── New Chat button (with icon)
├── History section
│   ├── "History" label
│   └── HistoryChat items (7 visible)
└── [Active conversation area - not in this component]

Conversation Flow:
UserChat → API → AIChat (contains Markdown)
```

### Part Interaction

- **PartInfo** (232-886) - Part details information panel
- **PartPopup** (236-1141) - Part quick info popup with action button
- **BodyBtn** (236-1131) - Body part selector button (4 states)
- **AIAssistant** (160-672) - AI helper interface panel

**Interaction Pattern:**
These components appear when users interact with 3D parts in the viewer. They provide contextual information and AI assistance.

---

## Detailed Component Analysis

### Component: ModelCard

**Figma Node:** 144-299
**Screenshot:** docs/screenshots/model-card.png (4 states shown vertically)

#### Naming

- **Figma Name:** ModelCard
- **Proposed Code Name:** `ModelCard` or `Model3DCard`
- **Rationale:** Clear indication this is for 3D model library items

#### Role

Displays a 3D model category or individual model with an icon and title. Used in the StudyModel section of the landing page to showcase different engineering disciplines or available models.

#### Dimensions

- **Size:** 327.2px × 241px
- **Aspect Ratio:** ~1.36:1 (slightly wider than square)
- **Tailwind:** `w-[327.2px] h-[241px]` or responsive: `w-full aspect-[327/241]`

#### Data Structure (TypeScript Interface)

```typescript
interface ModelCardProps {
  id?: string;
  icon?: React.ReactNode; // SVG icon component
  status?: "Default" | "primary" | "hover" | "press";
  text: string; // e.g., "기계공학" (Mechanical Engineering)
  category?: string;
  onClick?: () => void;
}
```

#### Internal Elements

1. **Background Container**
   - Border radius: 24px
   - Border: 5px solid rgba(2,238,225,0.2)
   - Shadow: `shadow-[4px_4px_20px_0px_rgba(2,238,225,0.1)]`
   - Background changes based on state (see States section)

2. **Icon (Centered)**
   - Size: 113px × 114px
   - Position: Centered horizontally, slightly above center vertically
   - Default icon: Electronics chip (iconoir:electronics-chip)
   - Transform: `translate(-50%, -50%)` for centering
   - Asset URL available from Figma MCP

3. **Title Text**
   - Position: Bottom center, 50.5px from vertical center
   - Typography:
     - Font: Pretendard SemiBold
     - Size: 32px (heading/lg)
     - Weight: 600
     - Line height: 1.25
   - Color varies by state:
     - Default: `#02eee1` (primary cyan)
     - Primary/Hover/Press: `#fafafa` (inverse/white)
   - Alignment: Center
   - Transform: `translate(-50%, 0)` for horizontal centering

#### Layout Structure

```
┌─────────────────────────────┐
│                             │
│                             │
│      [Icon 113×114]         │
│                             │
│                             │
│        기계공학              │
│                             │
└─────────────────────────────┘
     327.2px × 241px
```

#### Colors

| Element    | State               | Color                    | CSS Variable                       |
| ---------- | ------------------- | ------------------------ | ---------------------------------- |
| Background | Default             | `rgba(212,212,212,0.3)`  | -                                  |
| Background | Primary             | `rgba(2,238,225,0.3)`    | -                                  |
| Background | Hover               | `rgba(1,169,160,0.3)`    | -                                  |
| Background | Press               | `rgba(1,100,95,0.3)`     | -                                  |
| Border     | All                 | `rgba(2,238,225,0.2)`    | -                                  |
| Text       | Default             | `#02eee1`                | `--color/text/interactive/primary` |
| Text       | Primary/Hover/Press | `#fafafa`                | `--color/text/interactive/inverse` |
| Icon       | All                 | `#02eee1` (primary cyan) | -                                  |

#### Spacing

- Border width: 5px
- Border radius: 24px
- Icon position: Centered, ~27.5px above center
- Text position: 50.5px below center
- Internal padding: Implicit (icon and text positioned absolutely)

#### States

| State       | Background              | Text Color    | Border           | Use Case           |
| ----------- | ----------------------- | ------------- | ---------------- | ------------------ |
| **Default** | Gray (0.3 opacity)      | Cyan #02eee1  | Cyan 0.2 opacity | Initial/idle state |
| **Primary** | Cyan (0.3 opacity)      | White #fafafa | Cyan 0.2 opacity | Selected/active    |
| **Hover**   | Teal (0.3 opacity)      | White #fafafa | Cyan 0.2 opacity | Mouse over         |
| **Press**   | Dark teal (0.3 opacity) | White #fafafa | Cyan 0.2 opacity | Click/touch        |

**State Transitions:**

- Default → Hover (on mouse enter)
- Hover → Press (on mouse down)
- Press → Primary (on click completion, if selectable)
- Primary → Default (on deselect)

#### Grid Layout Context

- **Used in:** Landing page, StudyModel section
- **Cards per row:** Likely 3-4 based on card width (~327px)
- **Gap:** 16-24px estimated (not specified in component)
- **Responsive:**
  - Desktop: 3-4 per row
  - Tablet: 2 per row
  - Mobile: 1 per row

#### Auto Layout

- Container: Fixed size (327.2px × 241px)
- Internal elements: Absolute positioning with transforms for centering
- Icon: `top: calc(50% - 27.5px)`, `left: calc(50% + 0.4px)`
- Text: `top: calc(50% + 50.5px)`, `left: calc(50% - 0.1px)`

#### shadcn/ui Mapping

- **Base:** Custom component (no direct shadcn/ui equivalent)
- **Alternative:** shadcn/ui `Card` component with custom styling
- **Implementation:**
  ```tsx
  <Card className="relative w-[327.2px] h-[241px] border-5 rounded-[24px]">
    <CardContent className="flex flex-col items-center justify-center h-full">
      {icon}
      <CardTitle>{text}</CardTitle>
    </CardContent>
  </Card>
  ```

#### Asset Classification

- **Tag:** [CODE] with [IMAGE] icon dependency
- **Icon Assets:**
  - Electronics chip SVG: `https://www.figma.com/api/mcp/asset/d454461e-7c0f-4fe5-bd4f-caaf2cc7ca8c`
  - Other category icons to be exported (mechanical, electrical, etc.)
- **Export Format:** SVG for icons (vector scalability)

#### Interactions

- **Hover:** Background color changes, text color changes to white
- **Click:** Navigates to model category page or loads model into 3D viewer
- **Keyboard:** Focusable, activatable with Enter/Space
- **Touch:** Press state visible on touch devices

#### Accessibility

- **Role:** `button` or `article` (depending on clickability)
- **Label:** Text content serves as accessible name
- **Alt text:** Icon should have `aria-hidden="true"` (decorative)
- **Focus:** Visible focus ring (outline)
- **Keyboard:** Tab-navigable, Enter/Space to activate
- **Color contrast:**
  - Default state: Cyan text on gray background (check contrast ratio)
  - Primary/Hover/Press: White text on colored background (good contrast)

---

### Component: ValueCard

**Figma Node:** 144-277
**Screenshot:** docs/screenshots/value-card.png (4 states shown)

#### Naming

- **Figma Name:** ValueCard
- **Proposed Code Name:** `ValueCard` or `FeatureCard`
- **Rationale:** Represents value propositions/features of the platform

#### Role

Displays a key value proposition or feature of SIMVEX with an icon, title, and description. Used in the landing page to communicate benefits to users.

#### Dimensions

- **Size:** 567px × 358px
- **Aspect Ratio:** ~1.58:1 (horizontal orientation)
- **Tailwind:** `w-[567px] h-[358px]` or responsive: `w-full aspect-[567/358]`

#### Data Structure (TypeScript Interface)

```typescript
interface ValueCardProps {
  id?: string;
  icon?: React.ReactNode; // SVG icon component
  status?: "Default" | "primary" | "hover" | "press";
  title: string; // e.g., "3D 몰입형 인터랙션"
  text: string; // Description text (multi-line)
  onClick?: () => void;
}
```

#### Internal Elements

1. **Background Container**
   - Border radius: 24px
   - Border: 5px solid rgba(2,238,225,0.2)
   - Shadow: `shadow-[4px_4px_20px_0px_rgba(2,238,225,0.1)]`
   - Size: 567px × 358px

2. **Content Wrapper**
   - Position: Centered (translate -50%, -50%)
   - Width: 335px (fixed inner content width)
   - Flex column layout
   - Gap: 32px between elements

3. **Icon (Top)**
   - Size: 147px × 147px
   - Position: Centered horizontally
   - Example: 3D box icon (garden:box-3d-stroke-16)
   - Overflow: Hidden (clipped to bounds)

4. **Title**
   - Typography:
     - Font: Pretendard Bold
     - Size: 40px (heading/xl)
     - Weight: 700
     - Line height: 1.25
   - Color varies by state:
     - Default: `#02eee1` (primary cyan)
     - Primary/Hover/Press: `#fafafa` (white)
   - Alignment: Center

5. **Description Text**
   - Typography:
     - Font: Pretendard SemiBold
     - Size: 24px
     - Weight: 600
     - Line height: Normal
   - Color: `#d4d4d4` (tertiary gray) - same for all states
   - Alignment: Center
   - Multi-line: 2 lines visible in design
   - Text: "보고 만지고 분해하며, 이론을 직관적인 경험으로 바꿉니다."

#### Layout Structure

```
┌───────────────────────────────────┐
│                                   │
│        [Icon 147×147]             │
│                                   │
│     3D 몰입형 인터랙션             │
│                                   │
│   보고 만지고 분해하며,            │
│   이론을 직관적인 경험으로 바꿉니다. │
│                                   │
└───────────────────────────────────┘
        567px × 358px
```

#### Colors

| Element     | State               | Color                    | CSS Variable                       |
| ----------- | ------------------- | ------------------------ | ---------------------------------- |
| Background  | Default             | `rgba(212,212,212,0.3)`  | -                                  |
| Background  | Primary             | `rgba(2,238,225,0.3)`    | -                                  |
| Background  | Hover               | `rgba(1,169,160,0.3)`    | -                                  |
| Background  | Press               | `rgba(1,100,95,0.3)`     | -                                  |
| Border      | All                 | `rgba(2,238,225,0.2)`    | -                                  |
| Title       | Default             | `#02eee1`                | `--color/text/interactive/primary` |
| Title       | Primary/Hover/Press | `#fafafa`                | `--color/text/interactive/inverse` |
| Description | All                 | `#d4d4d4`                | `--color/text/teritary`            |
| Icon        | All                 | `#02eee1` (primary cyan) | -                                  |

#### Spacing

- Border width: 5px
- Border radius: 24px
- Content wrapper width: 335px (centered within 567px card)
- Gap between elements: 32px (`gap-[var(--spacing/32,32px)]`)
- Internal padding: Calculated by centering (116px horizontal padding)

#### States

Same state pattern as ModelCard:

| State       | Background | Title Color   | Description Color | Use Case             |
| ----------- | ---------- | ------------- | ----------------- | -------------------- |
| **Default** | Gray       | Cyan #02eee1  | Gray #d4d4d4      | Initial state        |
| **Primary** | Cyan       | White #fafafa | Gray #d4d4d4      | Selected/highlighted |
| **Hover**   | Teal       | White #fafafa | Gray #d4d4d4      | Mouse over           |
| **Press**   | Dark teal  | White #fafafa | Gray #d4d4d4      | Click/touch          |

#### Grid Layout Context

- **Used in:** Landing page, Features/Values section
- **Cards per row:** Likely 2 per row (567px each)
- **Gap:** 24-32px estimated
- **Responsive:**
  - Desktop: 2 per row
  - Tablet: 1 per row
  - Mobile: 1 per row (full width)

#### Auto Layout

- Container: Fixed size (567px × 358px)
- Content: Flex column with 32px gap, centered
- Items: Center-aligned, shrink-0 (no shrinking)

#### shadcn/ui Mapping

- **Base:** shadcn/ui `Card` component
- **Implementation:**
  ```tsx
  <Card className="w-[567px] h-[358px] border-5 rounded-[24px]">
    <CardContent className="flex flex-col items-center justify-center gap-8 h-full">
      {icon}
      <CardTitle className="text-4xl">{title}</CardTitle>
      <CardDescription className="text-2xl">{text}</CardDescription>
    </CardContent>
  </Card>
  ```

#### Asset Classification

- **Tag:** [CODE] with [IMAGE] icon dependency
- **Icon Assets:**
  - 3D box SVG: `https://www.figma.com/api/mcp/asset/01aefb97-81f3-454f-901f-d4eeb520b56d`
  - Other feature icons to be exported
- **Export Format:** SVG for icons

#### Interactions

- **Hover:** Background color changes, title color changes to white
- **Click:** May trigger modal with more details or scroll to section
- **Keyboard:** Focusable if interactive
- **Touch:** Press state on mobile

#### Accessibility

- **Role:** `article` or `button` (if clickable)
- **Heading:** Title should be `<h3>` or appropriate heading level
- **Alt text:** Icon decorative (`aria-hidden="true"`)
- **Focus:** Visible focus indicator if interactive
- **Color contrast:** Verify cyan on gray meets WCAG AA (4.5:1)

---

### Component: AIAssistant

**Figma Node:** 160-672
**Screenshot:** docs/screenshots/ai-assistant.png

#### Naming

- **Figma Name:** ai assistant
- **Proposed Code Name:** `AIAssistant` or `AIAssistantPanel`
- **Rationale:** Clear identifier for AI helper interface

#### Role

Displays AI-generated assistance or explanations related to 3D models or parts. Provides contextual help to users during their interaction with the 3D viewer.

#### Dimensions

- **Width:** 416px (fixed)
- **Height:** Auto (based on content)
- **Content area:** 416px × 250px (fixed height for content box)
- **Total height:** ~303px (16px gap + header + content)

#### Data Structure (TypeScript Interface)

```typescript
interface AIAssistantProps {
  title?: string; // Default: "AI Assistant"
  text: string; // AI response content
  isLoading?: boolean;
  onClose?: () => void;
}
```

#### Internal Elements

1. **Header Section**
   - Flex row layout, 16px gap
   - Items: Icon + Title
   - Alignment: Center

2. **AI Icon**
   - Size: 37px × 37px
   - Icon: mingcute:ai-line
   - Color: Primary cyan (#02eee1)
   - Asset URL: `https://www.figma.com/api/mcp/asset/7381f398-3d15-40d5-8e41-824e5c70e1a0`

3. **Title Text**
   - Typography:
     - Font: Pretendard SemiBold
     - Size: 32px (heading/lg)
     - Weight: 600
     - Line height: 1.25
   - Color: `#02eee1` (primary cyan)
   - Text: "AI Assistant"

4. **Content Box**
   - Size: 416px × 250px (fixed)
   - Background: `rgba(212,212,212,0.3)` (gray)
   - Border: 3px solid `#02eee1` (primary cyan)
   - Border radius: 24px
   - Padding: 153px horizontal, 105px vertical (for centering placeholder)

5. **Content Text**
   - Typography:
     - Font: Pretendard Medium
     - Size: 16px (body/lg)
     - Weight: 500
     - Line height: 1.5
   - Color: White (#ffffff)
   - Placeholder: "부품 설명어쩌궁.."

#### Layout Structure

```
┌────────────────────────────┐
│ [AI Icon] AI Assistant     │ ← Header (37px height)
├────────────────────────────┤ ← 16px gap
│                            │
│                            │
│   부품 설명어쩌궁..         │ ← Content box (250px)
│                            │
│                            │
└────────────────────────────┘
      416px width
```

#### Colors

| Element                | Color                   | CSS Variable                         |
| ---------------------- | ----------------------- | ------------------------------------ |
| Header icon            | `#02eee1`               | `--color/text/interactive/primary`   |
| Header title           | `#02eee1`               | `--color/text/interactive/primary`   |
| Content box background | `rgba(212,212,212,0.3)` | -                                    |
| Content box border     | `#02eee1` (3px)         | `--color/border/interactive/primary` |
| Content text           | `#ffffff` (white)       | -                                    |

#### Spacing

- Gap between header and content: 16px (`gap-[var(--spacing/16,16px)]`)
- Gap between icon and title: 16px
- Content box padding: 153px × 105px (centered text)
- Border width: 3px
- Border radius: 24px

#### States

| State         | Visual Changes                             |
| ------------- | ------------------------------------------ |
| **Default**   | Static display                             |
| **Loading**   | Could show skeleton or loading animation   |
| **Populated** | Text replaces placeholder, padding adjusts |
| **Error**     | Border could turn red, error message shown |

#### Auto Layout

- Main container: Flex column, 16px gap
- Header: Flex row, 16px gap, center-aligned
- Content box: Fixed size, center-aligned text

#### shadcn/ui Mapping

- **Base:** Custom component or shadcn/ui `Card` with custom header
- **Implementation:**
  ```tsx
  <div className="flex flex-col gap-4 w-[416px]">
    <div className="flex items-center gap-4">
      <AIIcon />
      <h3 className="text-3xl font-semibold text-primary">AI Assistant</h3>
    </div>
    <Card className="h-[250px] border-3 border-primary">
      <CardContent className="flex items-center justify-center h-full p-4">
        <p className="text-white">{text}</p>
      </CardContent>
    </Card>
  </div>
  ```

#### Asset Classification

- **Tag:** [CODE] with [SVG] icon
- **Icon Asset:** AI icon SVG from Figma
- **Export Format:** Inline SVG or icon component

#### Interactions

- **Display:** Appears when user requests AI help
- **Close:** May have close button (not shown in design)
- **Scroll:** Content box should scroll if text is long
- **Copy:** Users may want to copy AI response

#### Accessibility

- **Role:** `region` or `complementary`
- **Label:** "AI Assistant" as accessible name
- **Icon:** Decorative (`aria-hidden="true"`)
- **Focus:** Should be focusable if dismissible
- **Keyboard:** Esc to close (if modal-like)
- **Screen reader:** Announce when content updates

---

### Component: PartInfo

**Figma Node:** 232-886
**Screenshot:** docs/screenshots/part-info.png

#### Naming

- **Figma Name:** part info
- **Proposed Code Name:** `PartInfo` or `PartInfoPanel`
- **Rationale:** Displays information about selected 3D parts

#### Role

Shows detailed information about a selected 3D part in the viewer. Provides technical specifications, measurements, or descriptions to help users understand the component.

#### Dimensions

- **Width:** 416px (same as AIAssistant)
- **Height:** Auto (based on content)
- **Content area:** 416px × 250px
- **Total height:** ~304px

#### Data Structure (TypeScript Interface)

```typescript
interface PartInfoProps {
  title?: string; // Default: "Part Info"
  text: string; // Part description/details
  partData?: {
    name: string;
    type: string;
    volume?: number;
    surfaceArea?: number;
    material?: string;
  };
  onClose?: () => void;
}
```

#### Internal Elements

1. **Header Section**
   - Flex row layout, 16px gap
   - Items: Icon + Title
   - Alignment: Start (not center)

2. **Part Icon**
   - Size: 37px × 38px
   - Custom part info icon (vector)
   - Color: Primary cyan (#02eee1)
   - Asset URL: `https://www.figma.com/api/mcp/asset/a159cfcc-6354-4ba1-a5a6-5e223a618120`

3. **Title Text**
   - Typography: Same as AIAssistant
     - Font: Pretendard SemiBold
     - Size: 32px (heading/lg)
     - Weight: 600
     - Line height: 1.25
   - Color: `#02eee1`
   - Text: "Part Info"

4. **Content Box**
   - Size: 416px × 250px (fixed)
   - Background: `rgba(212,212,212,0.3)` (gray)
   - Border: 3px solid `#02eee1`
   - Border radius: 24px
   - Padding: 153px × 105px (centered placeholder)

5. **Content Text**
   - Typography: Same as AIAssistant
     - Font: Pretendard Medium
     - Size: 16px (body/lg)
     - Weight: 500
     - Line height: 1.5
   - Color: White (#ffffff)
   - Placeholder: "부품 설명어쩌궁.."

#### Layout Structure

```
┌────────────────────────────┐
│ [Part Icon] Part Info      │ ← Header
├────────────────────────────┤ ← 16px gap
│                            │
│   부품 설명어쩌궁..         │ ← Content (250px)
│                            │
└────────────────────────────┘
      416px width
```

#### Colors

Same as AIAssistant:

| Element                | Color                   | CSS Variable                         |
| ---------------------- | ----------------------- | ------------------------------------ |
| Header icon            | `#02eee1`               | `--color/text/interactive/primary`   |
| Header title           | `#02eee1`               | `--color/text/interactive/primary`   |
| Content box background | `rgba(212,212,212,0.3)` | -                                    |
| Content box border     | `#02eee1` (3px)         | `--color/border/interactive/primary` |
| Content text           | `#ffffff`               | -                                    |

#### Spacing

Identical to AIAssistant:

- Gap between elements: 16px
- Content padding: 153px × 105px
- Border: 3px
- Border radius: 24px

#### States

| State            | Visual Changes         |
| ---------------- | ---------------------- |
| **Empty**        | Shows placeholder text |
| **Loaded**       | Shows part details     |
| **No selection** | Hidden or grayed out   |
| **Loading**      | Skeleton or spinner    |

#### Auto Layout

Same structure as AIAssistant:

- Flex column, 16px gap
- Header: Flex row with icon + text
- Content box: Fixed size

#### shadcn/ui Mapping

- **Base:** Same pattern as AIAssistant
- **Implementation:** Nearly identical component with different icon/title

#### Asset Classification

- **Tag:** [CODE] with [SVG] icon
- **Icon Asset:** Part info vector icon

#### Interactions

- **Trigger:** Appears when user clicks on a 3D part
- **Update:** Content changes when different part is selected
- **Close:** Dismiss button or click outside
- **Position:** May be positioned near selected part in viewer

#### Accessibility

- **Role:** `region` or `complementary`
- **Label:** "Part Information" as accessible name
- **Live region:** `aria-live="polite"` for content updates
- **Focus management:** Focus when opened
- **Keyboard:** Esc to close

#### Similarity to AIAssistant

**Note:** PartInfo and AIAssistant are structurally identical, differing only in:

- Icon (different SVG)
- Title text ("Part Info" vs "AI Assistant")
- Content source (part data vs AI response)

**Recommendation:** Create a single reusable `InfoPanel` component with props for icon, title, and content.

---

### Component: PartPopup

**Figma Node:** 236-1141
**Screenshot:** docs/screenshots/part-popup.png

#### Naming

- **Figma Name:** part popup
- **Proposed Code Name:** `PartPopup` or `PartHintPopup`
- **Rationale:** Popup that appears near parts with hints or actions

#### Role

A small popup that appears near 3D parts to provide quick hints or actions. Includes a question and a confirmation button. Used for contextual interactions in the 3D viewer.

#### Dimensions

- **Width:** 272px (fixed)
- **Height:** Auto (based on content, ~78px estimated)
- **Border radius:** 16px (bottom-left, bottom-right, top-right) - speech bubble style

#### Data Structure (TypeScript Interface)

```typescript
interface PartPopupProps {
  text: string; // Question or hint text
  buttonText?: string; // Default: "YES"
  onConfirm: () => void;
  onDismiss?: () => void;
  position?: { x: number; y: number }; // Positioning near 3D part
}
```

#### Internal Elements

1. **Container**
   - Width: 272px
   - Background: `rgba(212,212,212,0.3)` (translucent gray)
   - Border: 2px solid `#02eee1` (primary cyan)
   - Border radius: 16px (except top-left - speech bubble style)
   - Padding: 16px horizontal, 8px vertical
   - Gap: 4px between elements

2. **Question Text**
   - Typography:
     - Font: Pretendard Medium
     - Size: 14px (body/md)
     - Weight: 500
     - Line height: 1.5
   - Color: `#e5e5e5` (secondary gray)
   - Alignment: Center
   - Text: "분해 순서에 대한 힌트가 필요하신가요?" (Do you need a hint about disassembly order?)
   - Multi-line: Yes (wraps)

3. **Action Button (BodyBtn component)**
   - Width: 81px
   - Height: Auto (~30px)
   - Background: `rgba(115,115,115,0.3)` (darker gray)
   - Border: 2px solid `#02eee1`
   - Border radius: 16px
   - Padding: 0px horizontal, 8px vertical
   - Text: "YES"
   - Typography:
     - Font: Pretendard SemiBold
     - Size: 14px (body/md)
     - Weight: 600
   - Alignment: Right (self-aligned to right edge of popup)

#### Layout Structure

```
┌──────────────────────────────┐
│ 분해 순서에 대한 힌트가       │
│ 필요하신가요?                 │
├──────────────────────────────┤
│                        [YES] │
└──────────────────────────────┘
         272px width
```

#### Colors

| Element              | Color                   | CSS Variable                       |
| -------------------- | ----------------------- | ---------------------------------- |
| Container background | `rgba(212,212,212,0.3)` | -                                  |
| Container border     | `#02eee1` (2px)         | `--color/icon/interactive/primary` |
| Question text        | `#e5e5e5`               | `--color/text/secondary`           |
| Button background    | `rgba(115,115,115,0.3)` | -                                  |
| Button border        | `#02eee1` (2px)         | `--color/icon/interactive/primary` |
| Button text          | `#e5e5e5`               | `--color/text/secondary`           |

#### Spacing

- Container padding: 16px horizontal, 8px vertical
- Gap between text and button: 4px (`gap-[var(--spacing/4,4px)]`)
- Button padding: 0px horizontal, 8px vertical
- Border width: 2px
- Border radius: 16px

#### States

| State            | Visual Changes                                 |
| ---------------- | ---------------------------------------------- |
| **Default**      | As designed                                    |
| **Button Hover** | Button background changes (see BodyBtn states) |
| **Button Press** | Button background darker (see BodyBtn)         |
| **Dismissed**    | Fade out animation                             |

#### Auto Layout

- Main container: Flex column, 4px gap
- Items aligned: End (right-aligned)
- Text: Full width, centered
- Button: Self-aligned to right

#### Speech Bubble Style

- **Missing corner:** Top-left corner is square (0px radius)
- **Implication:** Popup "points" to something in the top-left direction
- **CSS:** `rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px]` (no rounded-tl)

#### shadcn/ui Mapping

- **Base:** Custom component or shadcn/ui `Popover` with custom styling
- **Button:** Uses BodyBtn component (see next section)
- **Implementation:**
  ```tsx
  <Popover>
    <PopoverContent className="w-[272px] border-2 border-primary rounded-bl-[16px] rounded-br-[16px] rounded-tr-[16px]">
      <div className="flex flex-col gap-1 items-end">
        <p className="text-sm text-center w-full">{text}</p>
        <BodyBtn onClick={onConfirm}>YES</BodyBtn>
      </div>
    </PopoverContent>
  </Popover>
  ```

#### Asset Classification

- **Tag:** [CODE]
- **Dependencies:** BodyBtn component

#### Interactions

- **Trigger:** Appears when user hovers or clicks on a part that has hints
- **Position:** Absolute positioning near the 3D part in viewport
- **Confirm:** Clicking "YES" triggers hint display or action
- **Dismiss:** Clicking outside or pressing Esc
- **Animation:** Fade in/out, possibly slide in

#### Accessibility

- **Role:** `dialog` or `tooltip` (depending on implementation)
- **Label:** Question text serves as accessible name
- **Focus trap:** Focus should move to button when opened
- **Keyboard:** Tab to button, Enter to confirm, Esc to close
- **Screen reader:** Announce question when opened

---

### Component: BodyBtn

**Figma Node:** 236-1131
**Screenshot:** docs/screenshots/body-btn.png (4 states shown)

#### Naming

- **Figma Name:** body btn
- **Proposed Code Name:** `BodyBtn` or `CompactButton`
- **Rationale:** Small button used in popups and body part interactions

#### Role

A small, compact button used throughout the interface for quick actions. Features 4 interactive states for visual feedback. Used in PartPopup and potentially other compact UI elements.

#### Dimensions

- **Width:** 81px (fixed)
- **Height:** Auto (~30-34px based on padding)
- **Aspect Ratio:** ~2.5:1 (wide rectangle)

#### Data Structure (TypeScript Interface)

```typescript
interface BodyBtnProps {
  text?: string; // Default: "button"
  status?: "Default" | "primary" | "hover" | "press";
  onClick?: () => void;
  disabled?: boolean;
}
```

#### Internal Elements

1. **Button Container**
   - Border: 2px solid `#02eee1` (primary cyan)
   - Border radius: 16px
   - Padding: 0px horizontal, 8px vertical
   - Width: 81px
   - Background varies by state

2. **Button Text**
   - Typography:
     - Font: Pretendard SemiBold
     - Size: 14px (body/md)
     - Weight: 600
     - Line height: 1.5
   - Color: `#e5e5e5` (secondary gray) - same for all states
   - Alignment: Center

#### Layout Structure

```
┌─────────┐
│ button  │
└─────────┘
  81px × ~30px
```

#### Colors

| Element    | State   | Color                               |
| ---------- | ------- | ----------------------------------- |
| Background | Default | `rgba(115,115,115,0.3)` (dark gray) |
| Background | Primary | `rgba(2,238,225,0.3)` (cyan)        |
| Background | Hover   | `rgba(1,169,160,0.3)` (teal)        |
| Background | Press   | `rgba(1,100,95,0.3)` (dark teal)    |
| Border     | All     | `#02eee1` (2px solid)               |
| Text       | All     | `#e5e5e5` (secondary gray)          |

#### Spacing

- Padding: 0px horizontal, 8px vertical
- Border width: 2px
- Border radius: 16px

#### States

| State       | Background              | Border   | Text       | Use Case         |
| ----------- | ----------------------- | -------- | ---------- | ---------------- |
| **Default** | Dark gray (0.3 opacity) | Cyan 2px | Light gray | Idle state       |
| **Primary** | Cyan (0.3 opacity)      | Cyan 2px | Light gray | Selected/active  |
| **Hover**   | Teal (0.3 opacity)      | Cyan 2px | Light gray | Mouse over       |
| **Press**   | Dark teal (0.3 opacity) | Cyan 2px | Light gray | Click/touch down |

**State Progression:** Default → Hover → Press → (action) → Default or Primary

#### Auto Layout

- Container: Flex, center-aligned items
- Padding: justify-between (even though single element)
- Text: Centered, no shrink

#### shadcn/ui Mapping

- **Base:** shadcn/ui `Button` component with custom variant
- **Variant:** Create `compact` variant
- **Implementation:**
  ```tsx
  <Button
    variant="compact"
    size="sm"
    className="w-[81px] border-2 border-primary rounded-[16px]"
  >
    {text}
  </Button>
  ```

#### Asset Classification

- **Tag:** [CODE]
- **Dependencies:** None (pure CSS)

#### Interactions

- **Hover:** Background color transitions to teal
- **Click:** Background transitions to dark teal, then triggers action
- **Keyboard:** Focus visible, activatable with Enter/Space
- **Touch:** Press state visible on touch devices

#### Accessibility

- **Role:** `button` (native)
- **Label:** Text content
- **Focus:** Visible focus ring
- **Keyboard:** Tab-navigable, Enter/Space to activate
- **States:** `:hover`, `:active`, `:focus` styles
- **Disabled:** `disabled` attribute if applicable

#### Usage Context

- Used in **PartPopup** for "YES" confirmation
- Potentially used in other compact UI elements
- May be used for body part selection buttons (hence "BodyBtn" name)

---

### Component: ChatSide

**Figma Node:** 236-1535
**Screenshot:** docs/screenshots/chat-side.png

#### Naming

- **Figma Name:** chat side
- **Proposed Code Name:** `ChatSidebar` or `ChatPanel`
- **Rationale:** Sidebar container for the entire chat interface

#### Role

Main container for the chat interface. Provides navigation, chat history list, and serves as the container for active conversations. This is a layout component that composes other chat components.

#### Dimensions

- **Width:** 311px (fixed sidebar width)
- **Height:** 879px (viewport height or fixed)
- **Layout:** Full-height sidebar

#### Data Structure (TypeScript Interface)

```typescript
interface ChatSidebarProps {
  isOpen: boolean;
  onToggleMenu: () => void;
  onNewChat: () => void;
  historyItems: ChatHistory[];
  onSelectHistory: (id: string) => void;
}

interface ChatHistory {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
}
```

#### Internal Elements

1. **Hamburger Menu Button**
   - Size: 40px × 40px
   - Position: Top of sidebar
   - Icon: Three horizontal lines (hamburger)
   - Color: Primary cyan
   - Asset URL: `https://www.figma.com/api/mcp/asset/b1c48290-14cf-4bdf-a2b1-f92c11934bf6`

2. **New Chat Button**
   - Flex row layout
   - Icon: Chat dots icon (bi:chat-dots) - 147px × 147px (likely error, should be ~24px)
   - Icon asset: `https://www.figma.com/api/mcp/asset/a15ae239-8d1b-4959-bda2-718d2c52de5a`
   - Text: "New Chat"
   - Typography:
     - Font: Pretendard SemiBold
     - Size: 16px (body/lg)
     - Weight: 600
     - Line height: 1.5
   - Color: `#e5e5e5` (secondary)
   - Gap: 8px between icon and text

3. **History Section**
   - Flex column layout
   - Gap: 7px between items
   - Label: "History" (same typography as "New Chat")
   - Items: HistoryChat components (7 visible in design)

4. **HistoryChat Items**
   - Size: 76px × 21px each
   - Typography:
     - Font: Pretendard Medium
     - Size: 14px (body/md)
     - Weight: 500
     - Line height: 1.5
   - Color: `#d4d4d4` (tertiary gray)
   - Text: "history chat" (placeholder)

#### Layout Structure

```
┌─────────────────────┐
│ [☰]                 │ ← Hamburger (40×40)
│                     │
│                     │ ← 160px gap
│                     │
│ [💬] New Chat       │ ← New chat button
│                     │
│ History             │ ← 48px gap
│ history chat        │
│ history chat        │
│ history chat        │
│ history chat        │
│ history chat        │
│ history chat        │
│ history chat        │
│                     │
└─────────────────────┘
    311px × 879px
```

#### Colors

| Element            | Color               | CSS Variable             |
| ------------------ | ------------------- | ------------------------ |
| Sidebar background | `#404040`           | `--color/bg/secondary`   |
| Hamburger icon     | `#02eee1` (assumed) | -                        |
| New Chat icon      | `#e5e5e5`           | -                        |
| New Chat text      | `#e5e5e5`           | `--color/text/secondary` |
| History label      | `#e5e5e5`           | `--color/text/secondary` |
| History items      | `#d4d4d4`           | `--color/text/teritary`  |

#### Spacing

- Padding: 24px all around (`p-[var(--spacing/24,24px)]`)
- Gap between hamburger and content: 160px (`gap-[var(--spacing/160,160px)]`)
- Gap between New Chat and History: 48px (`gap-[var(--spacing/48,48px)]`)
- Gap between history items: 7px
- Gap in New Chat button: 8px

#### Layout Flow

1. **Hamburger menu** (shrink-0, fixed size)
2. **Large gap** (160px spacer)
3. **Main content** (flex-1, fills remaining space)
   - **New Chat button**
   - **48px gap**
   - **History section**
     - History label
     - History items (scrollable if overflow)

#### Auto Layout

- Main container: Flex column, 160px gap
- Content section: Flex column (flex-1), 48px gap
- New Chat: Flex row, 8px gap, center-aligned
- History: Flex column, 7px gap

#### shadcn/ui Mapping

- **Base:** Custom sidebar component or Sheet component
- **Scrolling:** History section should be scrollable
- **Implementation:**
  ```tsx
  <aside className="w-[311px] h-[879px] bg-secondary p-6 flex flex-col gap-40">
    <Button variant="ghost" size="icon">
      <HamburgerIcon />
    </Button>
    <div className="flex-1 flex flex-col gap-12 overflow-hidden">
      <Button variant="ghost" className="justify-start gap-2">
        <ChatIcon />
        <span>New Chat</span>
      </Button>
      <div className="flex flex-col gap-2 overflow-y-auto">
        <h3 className="font-semibold">History</h3>
        {historyItems.map((item) => (
          <HistoryChat key={item.id} {...item} />
        ))}
      </div>
    </div>
  </aside>
  ```

#### Asset Classification

- **Tag:** [CODE] with [SVG] icons
- **Icons:** Hamburger, chat dots
- **Export:** SVG icons

#### Interactions

- **Hamburger:** Toggles sidebar collapse/expand
- **New Chat:** Creates new conversation, clears active chat
- **History items:** Clicking loads that conversation
- **Hover:** History items highlight on hover
- **Scroll:** History section scrollable if many items

#### Accessibility

- **Role:** `complementary` or `navigation`
- **Label:** "Chat sidebar" or "Chat navigation"
- **Hamburger button:** `aria-label="Toggle menu"`
- **New Chat button:** Clear label
- **History list:** Semantic list (`<ul>`)
- **Keyboard:** All buttons tab-navigable
- **Focus management:** Focus on first history item when section is activated

#### Responsive Behavior

- **Desktop:** 311px fixed width, always visible
- **Tablet:** Collapsible, overlay on top of content
- **Mobile:** Full-width drawer, slides in from left

---

### Component: UserChat (SlideBarUserChat)

**Figma Node:** 236-1485
**Screenshot:** docs/screenshots/user-chat.png

#### Naming

- **Figma Name:** slide bar/user chat
- **Proposed Code Name:** `UserChatBubble` or `MessageBubbleUser`
- **Rationale:** Message bubble for user-generated messages

#### Role

Displays a message sent by the user in the chat interface. Part of the conversation flow, alternates with AIChat messages.

#### Dimensions

- **Width:** 365px (max width, can be narrower based on content)
- **Height:** Auto (based on text content)
- **Min height:** ~40px (8px padding × 2 + text line height)

#### Data Structure (TypeScript Interface)

```typescript
interface UserChatBubbleProps {
  text: string; // User's message (supports multi-line)
  timestamp?: Date;
  id: string;
}
```

#### Internal Elements

1. **Message Bubble Container**
   - Background: `rgba(2,238,225,0.3)` (cyan, 0.3 opacity)
   - Border radius: 16px (bottom-left, top-left, top-right) - no bottom-right
   - Padding: 16px horizontal, 8px vertical
   - Max width: 365px
   - Alignment: Left side of chat area

2. **Message Text**
   - Typography:
     - Font: Pretendard Regular
     - Size: 16px (body/lg)
     - Weight: 400
     - Line height: 1.5
   - Color: `#fafafa` (primary white)
   - Text wrapping: Yes (whitespace-pre-wrap)
   - Flex: 1 0 0 (fills available space)

#### Layout Structure

```
┌────────────────────┐
│ user chat          │
└────────────────────┘
   365px max width
   (rounded on 3 corners, flat bottom-right)
```

#### Colors

| Element    | Color                 | CSS Variable           |
| ---------- | --------------------- | ---------------------- |
| Background | `rgba(2,238,225,0.3)` | -                      |
| Text       | `#fafafa`             | `--color/text/primary` |

#### Spacing

- Padding: 16px horizontal, 8px vertical
- Border radius: 16px (except bottom-right)

#### Bubble Shape

- **Speech bubble style:** Flat bottom-right corner indicates message direction (from left/user)
- **CSS:** `rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px]`

#### Auto Layout

- Container: Flex, justify-between (even though single text element)
- Text: flex-1, fills space, wraps

#### shadcn/ui Mapping

- **Base:** Custom component (no direct shadcn equivalent)
- **Alternative:** `Card` with custom styling
- **Implementation:**
  ```tsx
  <div className="max-w-[365px] bg-primary/30 px-4 py-2 rounded-bl-[16px] rounded-tl-[16px] rounded-tr-[16px]">
    <p className="text-white whitespace-pre-wrap">{text}</p>
  </div>
  ```

#### Asset Classification

- **Tag:** [CODE]
- **Dependencies:** None

#### Interactions

- **Display:** Appears immediately after user sends message
- **Hover:** No special hover state
- **Select:** User may be able to select/copy text
- **Context menu:** Right-click for copy/delete options

#### Accessibility

- **Role:** `article` or part of `log` region
- **Label:** "You" or "User message"
- **Time:** If timestamp shown, use `<time>` element
- **Screen reader:** Should read in conversation order

#### Usage in Chat Flow

```
[UserChat: "What is this part?"]
[AIChat: "This is a piston. It converts..."]
[UserChat: "How does it work?"]
[AIChat: "The piston moves up and down..."]
```

---

### Component: AIChat (SlideBarAiChat)

**Figma Node:** 236-1501
**Screenshot:** docs/screenshots/ai-chat.png

#### Naming

- **Figma Name:** slide bar/ai chat
- **Proposed Code Name:** `AIChatBubble` or `MessageBubbleAI`
- **Rationale:** Message bubble for AI-generated responses

#### Role

Displays a message from the AI assistant in the chat interface. Contains AI-generated explanations, answers, or assistance. May include Markdown formatting.

#### Dimensions

- **Width:** 365px (max width, same as UserChat)
- **Height:** Auto (based on content)
- **Min height:** ~40px

#### Data Structure (TypeScript Interface)

```typescript
interface AIChatBubbleProps {
  text: string; // AI response (Markdown format)
  timestamp?: Date;
  id: string;
  isStreaming?: boolean; // For typing animation
}
```

#### Internal Elements

1. **Message Bubble Container**
   - Background: `rgba(1,169,160,0.3)` (teal, 0.3 opacity)
   - Border radius: 16px (bottom-right, top-left, top-right) - no bottom-left
   - Padding: 16px horizontal, 8px vertical
   - Max width: 365px
   - Alignment: Right side of chat area (typically)

2. **Message Text/Content**
   - Typography: Same as UserChat
     - Font: Pretendard Regular
     - Size: 16px (body/lg)
     - Weight: 400
     - Line height: 1.5
   - Color: `#fafafa` (primary white)
   - Content: Renders Markdown (uses Markdown component internally)

#### Layout Structure

```
┌────────────────────┐
│ AI chat            │
└────────────────────┘
   365px max width
   (rounded on 3 corners, flat bottom-left)
```

#### Colors

| Element    | Color                 | CSS Variable           |
| ---------- | --------------------- | ---------------------- |
| Background | `rgba(1,169,160,0.3)` | -                      |
| Text       | `#fafafa`             | `--color/text/primary` |

#### Spacing

- Padding: 16px horizontal, 8px vertical
- Border radius: 16px (except bottom-left)

#### Bubble Shape

- **Speech bubble style:** Flat bottom-left corner indicates AI origin (from right/AI)
- **CSS:** `rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px]`
- **Difference from UserChat:** Opposite corner is flat (bottom-left vs bottom-right)

#### Auto Layout

Same as UserChat:

- Container: Flex, items center/between
- Text: flex-1, wraps

#### shadcn/ui Mapping

- **Base:** Custom component
- **Implementation:**
  ```tsx
  <div className="max-w-[365px] bg-teal/30 px-4 py-2 rounded-br-[16px] rounded-tl-[16px] rounded-tr-[16px]">
    <Markdown content={text} />
  </div>
  ```

#### Asset Classification

- **Tag:** [CODE]
- **Dependencies:** Markdown component for rendering formatted content

#### Interactions

- **Display:** Appears after AI processes user query
- **Streaming:** Text may appear character-by-character (typing effect)
- **Hover:** No special hover state
- **Select:** Users can select/copy text
- **Actions:** May have "Copy" or "Regenerate" buttons

#### Accessibility

- **Role:** `article` or part of `log` region
- **Label:** "AI Assistant" or "AI response"
- **Live region:** `aria-live="polite"` if streaming
- **Screen reader:** Should read in conversation order

#### Difference from UserChat

| Aspect           | UserChat                   | AIChat                     |
| ---------------- | -------------------------- | -------------------------- |
| Background color | Cyan (rgba(2,238,225,0.3)) | Teal (rgba(1,169,160,0.3)) |
| Bubble corner    | Flat bottom-right          | Flat bottom-left           |
| Alignment        | Left side                  | Right side (typically)     |
| Content          | Plain text                 | Markdown formatted         |

---

### Component: HistoryChat

**Figma Node:** 236-1323
**Screenshot:** docs/screenshots/history-chat.png

#### Naming

- **Figma Name:** history chat
- **Proposed Code Name:** `ChatHistoryItem` or `ConversationHistoryItem`
- **Rationale:** List item representing a past conversation

#### Role

Displays a single conversation in the chat history list. Shows the conversation title or first message. Clickable to load that conversation.

#### Dimensions

- **Width:** 76px (seems narrow, likely flexible in implementation)
- **Height:** 21px (single line of text)
- **Layout:** Text only, no additional decoration

#### Data Structure (TypeScript Interface)

```typescript
interface ChatHistoryItemProps {
  id: string;
  title: string; // Conversation title or first message
  timestamp?: Date;
  isActive?: boolean;
  onClick: () => void;
}
```

#### Internal Elements

1. **Text Label**
   - Typography:
     - Font: Pretendard Medium
     - Size: 14px (body/md)
     - Weight: 500
     - Line height: 1.5
   - Color: `#d4d4d4` (tertiary gray)
   - Truncation: Single line, ellipsis if too long
   - Text: "history chat" (placeholder)

#### Layout Structure

```
history chat
└─ 76×21px (single line text)
```

#### Colors

| Element    | State   | Color                    | CSS Variable                       |
| ---------- | ------- | ------------------------ | ---------------------------------- |
| Text       | Default | `#d4d4d4`                | `--color/text/teritary`            |
| Text       | Hover   | `#e5e5e5` (lighter)      | `--color/text/secondary`           |
| Text       | Active  | `#02eee1` (cyan)         | `--color/text/interactive/primary` |
| Background | Hover   | `rgba(255,255,255,0.05)` | -                                  |

#### Spacing

- No padding (text only)
- Spacing between items: 7px (defined in ChatSide parent)

#### States

| State       | Visual Changes                                 |
| ----------- | ---------------------------------------------- |
| **Default** | Gray text                                      |
| **Hover**   | Lighter gray text, subtle background highlight |
| **Active**  | Cyan text (indicates current conversation)     |
| **Focus**   | Focus ring for keyboard navigation             |

#### Auto Layout

- Container: Relative position, fixed height
- Text: Fills container (inset-0), truncates

#### shadcn/ui Mapping

- **Base:** Custom list item or Button with `variant="ghost"`
- **Implementation:**
  ```tsx
  <Button
    variant="ghost"
    className="h-[21px] w-full justify-start px-0 text-sm text-tertiary hover:text-secondary"
    onClick={onClick}
  >
    <span className="truncate">{title}</span>
  </Button>
  ```

#### Asset Classification

- **Tag:** [CODE]
- **Dependencies:** None

#### Interactions

- **Click:** Loads the conversation into active chat area
- **Hover:** Text color changes to lighter gray
- **Right-click:** Context menu (delete, rename)
- **Keyboard:** Arrow keys to navigate, Enter to select

#### Accessibility

- **Role:** `button` or `listitem` within a list
- **Label:** Conversation title
- **State:** `aria-current="page"` if active conversation
- **Keyboard:** Tab/Arrow navigation, Enter to activate
- **Focus:** Visible focus indicator

#### Usage Context

- **Parent:** ChatSide component, History section
- **Quantity:** Multiple items (7 visible in design, scrollable)
- **Order:** Likely most recent first (chronological)

#### Implementation Note

The 76px width seems arbitrary and likely reflects the placeholder text width. In implementation, this should be flexible width (e.g., `w-full`) with text truncation.

---

### Component: Markdown

**Figma Node:** 337-1343
**Screenshot:** docs/screenshots/markdown.png

#### Naming

- **Figma Name:** markdown
- **Proposed Code Name:** `MarkdownRenderer` or `RichTextContent`
- **Rationale:** Renders Markdown-formatted content in chat messages

#### Role

Renders rich text content with Markdown formatting inside AI chat messages. Supports headings, lists, code blocks, formulas, and blockquotes. Provides visual hierarchy and emphasis for AI responses.

#### Dimensions

- **Width:** 276px (in example)
- **Height:** 217px (in example, variable based on content)
- **Layout:** Flex column, auto height

#### Data Structure (TypeScript Interface)

```typescript
interface MarkdownRendererProps {
  content: string; // Markdown string
  className?: string;
}

// Example content structure (parsed):
interface MarkdownContent {
  title?: string; // Heading
  paragraphs?: string[]; // Body text
  lists?: string[][]; // Bullet points
  codeBlocks?: { language: string; code: string }[];
  formulas?: string[]; // Math formulas
  blockquotes?: string[]; // Quotes/highlights
}
```

#### Internal Elements

This component is a renderer, so elements vary based on content. The example shows:

1. **Heading/Title**
   - Typography:
     - Font: Pretendard Bold
     - Size: 16px (body/lg)
     - Weight: 700
     - Line height: 1.5
   - Color: `#fafafa` (primary white)
   - Text: "제목" (Title)

2. **Body Text / List Items**
   - Typography:
     - Font: Pretendard Medium
     - Size: 14px (body/md)
     - Weight: 500
     - Line height: 1.5
   - Color: `#d4d4d4` (tertiary gray)
   - Text: "Components: 리스트(Bullet Points) - 작동 순서 or 부품 특징"
   - Overflow: Hidden with ellipsis
   - Height: 49px (showing 2 lines, then truncated)

3. **Formula/Code Block**
   - Background: `rgba(1,100,95,0.5)` (dark teal, 0.5 opacity)
   - Border: 2px solid `#02eee1` (primary cyan)
   - Border radius: 16px
   - Padding: 16px all around
   - Typography:
     - Font: Pretendard Medium
     - Size: 14px (body/md)
     - Weight: 500
     - Line height: 1.5
   - Color: `#fafafa` (white)
   - Text: "공학 공식" (Engineering formula)
   - Alignment: Center

4. **Blockquote**
   - Typography: Same as body text
     - Font: Pretendard Medium
     - Size: 14px
     - Weight: 500
     - Line height: 1.5
   - Color: `#02eee1` (primary cyan) - **different from body**
   - Text: "인용구(Blockquote) - AI 튜터의 핵심 요약이나 주의 사항"
   - Overflow: Hidden with ellipsis

#### Layout Structure

```
┌────────────────────────────┐
│ 제목 (Title)                │ ← Heading (white, bold)
├────────────────────────────┤
│ Components:                │
│ 리스트(Bullet Points)       │ ← Body (gray, truncated)
├────────────────────────────┤
│ ┌────────────────────────┐ │
│ │    공학 공식            │ │ ← Code/Formula (bordered box)
│ └────────────────────────┘ │
├────────────────────────────┤
│ 인용구(Blockquote) - AI... │ ← Blockquote (cyan)
└────────────────────────────┘
       276px × 217px
```

#### Colors

| Element            | Color                | CSS Variable                       |
| ------------------ | -------------------- | ---------------------------------- |
| Heading text       | `#fafafa`            | `--color/text/primary`             |
| Body text          | `#d4d4d4`            | `--color/text/teritary`            |
| Formula background | `rgba(1,100,95,0.5)` | -                                  |
| Formula border     | `#02eee1` (2px)      | `--color/icon/interactive/primary` |
| Formula text       | `#fafafa`            | `--color/text/primary`             |
| Blockquote text    | `#02eee1`            | `--color/text/interactive/primary` |

#### Spacing

- Gap between elements: 16px (`gap-[var(--spacing/16,16px)]`)
- Formula box padding: 16px all around
- Formula box border: 2px
- Formula box radius: 16px

#### Markdown Element Mapping

| Markdown Syntax                | Rendered Element  | Styling                        |
| ------------------------------ | ----------------- | ------------------------------ |
| `# Heading` or `## Heading`    | Title             | White, bold, 16px              |
| `- List item` or `1. Item`     | List / Paragraph  | Gray, 14px, truncated          |
| `` `code` `` or ` ```code``` ` | Formula box       | Teal bg, cyan border, centered |
| `> Blockquote`                 | Blockquote        | Cyan text, 14px                |
| **Bold** or _Italic_           | Inline formatting | TBD (not shown in example)     |
| `[Link](url)`                  | Hyperlink         | Cyan underlined (TBD)          |

#### Supported Markdown Features

Based on the design example:

- ✅ Headings (H1/H2 likely)
- ✅ Paragraphs
- ✅ Lists (bullet and numbered)
- ✅ Code blocks / Formulas
- ✅ Blockquotes
- ⚠️ **Bold** / _Italic_ (likely supported, not shown)
- ⚠️ Links (likely supported, not shown)
- ❌ Images (probably not supported in chat)
- ❌ Tables (probably not supported)

#### Auto Layout

- Main container: Flex column, 16px gap
- Elements: Stack vertically, shrink-0 or flex-1 based on content
- Overflow: Scrollable if content is very long

#### shadcn/ui Mapping

- **Base:** Custom component wrapping a Markdown library
- **Library Options:**
  - `react-markdown` (popular, flexible)
  - `marked` + custom renderer
  - `remark` + `rehype` (unified ecosystem)
- **Implementation:**

  ```tsx
  import ReactMarkdown from "react-markdown";

  <ReactMarkdown
    className="flex flex-col gap-4"
    components={{
      h1: ({ children }) => (
        <h1 className="text-white font-bold">{children}</h1>
      ),
      p: ({ children }) => <p className="text-tertiary text-sm">{children}</p>,
      code: ({ children }) => (
        <div className="bg-teal/50 border-2 border-primary rounded-[16px] p-4 text-center">
          <code className="text-white">{children}</code>
        </div>
      ),
      blockquote: ({ children }) => (
        <blockquote className="text-primary text-sm">{children}</blockquote>
      ),
    }}
  >
    {content}
  </ReactMarkdown>;
  ```

#### Asset Classification

- **Tag:** [CODE]
- **Dependencies:** Markdown parsing library (react-markdown, marked, etc.)

#### Interactions

- **Render:** Static content display (no editing)
- **Copy:** Users can select and copy formatted content
- **Links:** If present, should be clickable
- **Code:** May have "Copy code" button

#### Accessibility

- **Headings:** Proper semantic HTML (`<h1>`, `<h2>`)
- **Lists:** Semantic `<ul>` or `<ol>`
- **Code blocks:** `<pre><code>` with language attribute
- **Blockquotes:** `<blockquote>` element
- **Color contrast:** Verify all text colors meet WCAG AA
- **Screen reader:** Properly structured HTML ensures good screen reader experience

#### Truncation Behavior

The example shows text truncation (49px height, "overflow-hidden", "text-ellipsis"). This suggests:

- **Initial display:** Truncated to 2-3 lines
- **Expansion:** "Show more" button or auto-expand on interaction
- **Use case:** Prevents very long AI responses from overwhelming the chat

---

## Chat System Architecture

### Component Hierarchy

```
ChatSidebar (container)
├── Hamburger button (toggle)
├── New Chat button
├── History section
│   ├── "History" label
│   └── ChatHistoryItem × N (scrollable list)
│       └── Individual conversation titles
└── [Active conversation area - separate component]
    ├── Conversation header (not in analyzed components)
    ├── Message list (scrollable)
    │   ├── UserChatBubble
    │   ├── AIChatBubble (contains MarkdownRenderer)
    │   ├── UserChatBubble
    │   ├── AIChatBubble
    │   └── ... (alternating)
    └── Input area (TextField + Send button - not analyzed)
```

### Message Flow

1. **User sends message:**
   - Text entered in input field
   - Submit triggers API call
   - UserChatBubble appears immediately (optimistic UI)

2. **AI processes:**
   - Loading indicator (typing dots, spinner, etc.)
   - API returns response (Markdown string)

3. **AI response rendered:**
   - AIChatBubble created
   - MarkdownRenderer parses and displays formatted content
   - Streaming: Characters appear progressively

4. **Conversation saved:**
   - Conversation added to history
   - ChatHistoryItem created/updated in sidebar

### State Management

```typescript
interface ChatState {
  // Sidebar state
  isSidebarOpen: boolean;
  historyItems: ChatHistory[];

  // Active conversation
  activeConversationId: string | null;
  messages: ChatMessage[];
  isAITyping: boolean;

  // Input
  inputText: string;
}

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string; // Plain text for user, Markdown for AI
  timestamp: Date;
}

interface ChatHistory {
  id: string;
  title: string; // First message or custom title
  lastMessage: string;
  timestamp: Date;
  messageCount: number;
}
```

### API Integration

```typescript
// Send message to AI
async function sendMessage(message: string): Promise<string> {
  const response = await fetch("/api/chat", {
    method: "POST",
    body: JSON.stringify({ message }),
  });
  const data = await response.json();
  return data.response; // Markdown string
}

// Load conversation history
async function loadConversation(id: string): Promise<ChatMessage[]> {
  const response = await fetch(`/api/conversations/${id}`);
  return response.json();
}

// Save conversation
async function saveConversation(messages: ChatMessage[]): Promise<string> {
  const response = await fetch("/api/conversations", {
    method: "POST",
    body: JSON.stringify({ messages }),
  });
  const data = await response.json();
  return data.id; // New conversation ID
}
```

### Responsive Layout

**Desktop (>1024px):**

```
┌───────────────────────────────────┐
│ Sidebar │ Active Conversation     │
│ (311px) │ (Flex 1)                │
│         │                         │
│ History │ Messages                │
│ Items   │ [User]                  │
│         │ [AI]                    │
│         │ [User]                  │
│         │ [Input]                 │
└───────────────────────────────────┘
```

**Tablet (768-1024px):**

```
Sidebar collapses to overlay
Button to toggle sidebar
Active conversation full width
```

**Mobile (<768px):**

```
Full-screen conversation view
Hamburger menu opens drawer with sidebar
Bubbles full width with smaller max-width
```

---

## Card System Patterns

### Shared Card Architecture

Both ModelCard and ValueCard follow the same structural pattern:

#### Common Properties

| Property                | Value                                | Notes                         |
| ----------------------- | ------------------------------------ | ----------------------------- |
| Border radius           | 24px                                 | Consistent rounded corners    |
| Border width            | 5px                                  | Thicker border for prominence |
| Border color            | rgba(2,238,225,0.2)                  | Cyan with transparency        |
| Shadow                  | 4px 4px 20px 0px rgba(2,238,225,0.1) | Subtle cyan glow              |
| States                  | 4 (Default, Primary, Hover, Press)   | Interactive feedback          |
| State color progression | Gray → Cyan → Teal → Dark Teal       | Consistent across both cards  |

#### State Color System

```css
/* Default state - Inactive/Idle */
background: rgba(212, 212, 212, 0.3); /* Gray */

/* Primary state - Selected/Active */
background: rgba(2, 238, 225, 0.3); /* Bright cyan */

/* Hover state - Mouse over */
background: rgba(1, 169, 160, 0.3); /* Teal */

/* Press state - Click/Touch */
background: rgba(1, 100, 95, 0.3); /* Dark teal */
```

#### Text Color Inversion

| State               | Text Color        | Variable                           |
| ------------------- | ----------------- | ---------------------------------- |
| Default             | `#02eee1` (cyan)  | `--color/text/interactive/primary` |
| Primary/Hover/Press | `#fafafa` (white) | `--color/text/interactive/inverse` |

**Rationale:** Default state uses cyan text on gray for contrast. Active states use white text on colored backgrounds for better readability.

### Differences Between Card Types

| Aspect             | ModelCard                      | ValueCard                  |
| ------------------ | ------------------------------ | -------------------------- |
| **Size**           | 327.2px × 241px (~1.36:1)      | 567px × 358px (~1.58:1)    |
| **Orientation**    | Vertical focus                 | Horizontal emphasis        |
| **Icon size**      | 113×114px                      | 147×147px                  |
| **Title size**     | 32px (heading/lg)              | 40px (heading/xl)          |
| **Content**        | Icon + Title only              | Icon + Title + Description |
| **Layout**         | Centered, absolute positioning | Flex column, gap-based     |
| **Use case**       | Model categories/items         | Feature highlights         |
| **Grid placement** | 3-4 per row                    | 2 per row                  |

### Reusable Card Base

To maximize code reuse, consider creating a base `Card` component:

```typescript
interface BaseCardProps {
  size: "small" | "large"; // ModelCard vs ValueCard
  status?: "Default" | "primary" | "hover" | "press";
  icon: React.ReactNode;
  title: string;
  description?: string; // Optional for ValueCard
  onClick?: () => void;
}
```

**Benefits:**

- Shared state logic
- Consistent styling
- Easier maintenance
- Single source of truth for colors

---

## Data Models

### TypeScript Interfaces

```typescript
// ========================================
// CARD COMPONENTS
// ========================================

interface Model3DCardProps {
  id: string;
  icon: React.ReactNode; // Category icon (electronics, mechanical, etc.)
  text: string; // Category name (e.g., "기계공학")
  status?: CardStatus;
  onClick?: () => void;
}

interface Model3D {
  id: string;
  title: string;
  category: string;
  thumbnail?: string; // URL or local path
  fileSize: string; // e.g., "2.3 MB"
  polyCount?: number;
  tags?: string[];
  fileUrl: string; // Path to 3D model file (.glb, .obj, etc.)
}

interface ValueCardProps {
  id?: string;
  icon: React.ReactNode; // Feature icon
  title: string; // e.g., "3D 몰입형 인터랙션"
  text: string; // Description (multi-line)
  status?: CardStatus;
  onClick?: () => void;
}

type CardStatus = "Default" | "primary" | "hover" | "press";

// ========================================
// CHAT COMPONENTS
// ========================================

interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string; // Plain text for user, Markdown for AI
  timestamp: Date;
  metadata?: {
    model?: string; // AI model used
    tokens?: number; // Token count
    processingTime?: number; // ms
  };
}

interface ChatConversation {
  id: string;
  title: string; // Generated from first message or custom
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  context?: {
    selectedPart?: string; // If chat is about a specific part
    viewerState?: any; // Viewer camera/selection state
  };
}

interface ChatHistoryItemProps {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: Date;
  isActive?: boolean;
  onClick: () => void;
}

interface UserChatBubbleProps {
  message: ChatMessage; // role = 'user'
  timestamp?: Date;
}

interface AIChatBubbleProps {
  message: ChatMessage; // role = 'ai'
  timestamp?: Date;
  isStreaming?: boolean; // For typing animation
}

interface MarkdownRendererProps {
  content: string; // Markdown string
  className?: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  historyItems: ChatConversation[];
  activeConversationId: string | null;
  onToggleMenu: () => void;
  onNewChat: () => void;
  onSelectHistory: (id: string) => void;
}

// ========================================
// PART INTERACTION COMPONENTS
// ========================================

interface Part3D {
  id: string;
  name: string; // e.g., "Piston"
  type: string; // e.g., "Moving Part", "Static Part"
  description?: string; // Detailed description
  measurements?: {
    volume?: number; // cm³
    surfaceArea?: number; // cm²
    mass?: number; // g
    dimensions?: { x: number; y: number; z: number }; // mm
  };
  material?: string; // e.g., "Aluminum Alloy"
  parentAssembly?: string; // Reference to parent
  childParts?: string[]; // References to children
  metadata?: {
    partNumber?: string;
    manufacturer?: string;
    specifications?: Record<string, any>;
  };
}

interface PartInfoProps {
  part: Part3D | null;
  title?: string; // Default: "Part Info"
  onClose?: () => void;
}

interface AIAssistantProps {
  content: string; // AI-generated help text
  title?: string; // Default: "AI Assistant"
  isLoading?: boolean;
  onClose?: () => void;
}

interface PartPopupProps {
  text: string; // Question or hint text
  buttonText?: string; // Default: "YES"
  onConfirm: () => void;
  onDismiss?: () => void;
  position?: { x: number; y: number }; // Positioning in viewport
}

interface BodyBtnProps {
  text: string;
  status?: CardStatus; // Reuse same status type as cards
  onClick?: () => void;
  disabled?: boolean;
}

// ========================================
// SHARED / UTILITY TYPES
// ========================================

interface Position2D {
  x: number;
  y: number;
}

interface Dimensions {
  width: number;
  height: number;
}

interface InteractiveState {
  status: CardStatus;
  isHovered: boolean;
  isPressed: boolean;
  isFocused: boolean;
}
```

---

## Implementation Priority

Recommended order for implementing these components:

### Phase 1: Foundation (Start here)

1. **Markdown** - Core dependency for chat system
2. **BodyBtn** - Simple component, used by others
3. **CardStatus type** - Shared type for interactive states

### Phase 2: Chat Building Blocks

4. **UserChatBubble** - User message display
5. **AIChatBubble** - AI message display (uses Markdown)
6. **ChatHistoryItem** - History list item

### Phase 3: Chat Container

7. **ChatSidebar** - Assembles chat UI (uses items 4-6)

### Phase 4: Cards

8. **ModelCard** - Model library cards
9. **ValueCard** - Feature/value proposition cards

### Phase 5: Part Interaction

10. **PartInfo** - Part details panel
11. **AIAssistant** - AI help panel (similar to PartInfo)
12. **PartPopup** - Contextual popup with actions

### Rationale for Order:

- **Markdown first:** Dependency for AIChat
- **Chat components early:** Core user interaction
- **Cards mid-priority:** Landing page content, less critical for MVP
- **Part interaction last:** Requires 3D viewer integration

---

## Component Dependencies

Visual representation of which components depend on others:

```
Markdown (0 dependencies)
  └─ Used by: AIChatBubble

BodyBtn (0 dependencies)
  └─ Used by: PartPopup

CardStatus type (0 dependencies)
  └─ Used by: ModelCard, ValueCard, BodyBtn

UserChatBubble (0 dependencies)

AIChatBubble
  └─ Uses: Markdown

ChatHistoryItem (0 dependencies)

ChatSidebar
  └─ Uses: ChatHistoryItem

ModelCard (0 dependencies)

ValueCard (0 dependencies)

PartInfo (0 dependencies)

AIAssistant (0 dependencies)
  └─ Note: Structurally identical to PartInfo

PartPopup
  └─ Uses: BodyBtn
```

### Shared Dependency on UI Basics

All domain components depend on Phase 1 UI basic components (from previous analysis):

- **TextField** - Used in chat input (not analyzed in this phase)
- **Button** - Base for BodyBtn, New Chat, etc.
- **IconButton** - Hamburger menu
- **Card** (shadcn/ui) - Base for custom cards
- **Popover** - Base for PartPopup

---

## Design Token Summary

### Colors

| Token Name                           | Value     | Usage                                 |
| ------------------------------------ | --------- | ------------------------------------- |
| `--color/text/interactive/primary`   | `#02eee1` | Primary cyan - headings, links, icons |
| `--color/text/interactive/inverse`   | `#fafafa` | White text on colored backgrounds     |
| `--color/text/primary`               | `#fafafa` | White text on dark backgrounds        |
| `--color/text/secondary`             | `#e5e5e5` | Light gray text                       |
| `--color/text/teritary`              | `#d4d4d4` | Tertiary gray text                    |
| `--color/border/interactive/primary` | `#02eee1` | Cyan borders                          |
| `--color/icon/interactive/primary`   | `#02eee1` | Cyan icons                            |
| `--color/bg/secondary`               | `#404040` | Dark gray backgrounds (sidebar)       |

### Spacing

| Token Name      | Value |
| --------------- | ----- |
| `--spacing/4`   | 4px   |
| `--spacing/8`   | 8px   |
| `--spacing/16`  | 16px  |
| `--spacing/24`  | 24px  |
| `--spacing/32`  | 32px  |
| `--spacing/48`  | 48px  |
| `--spacing/160` | 160px |

### Radius

| Token Name    | Value |
| ------------- | ----- |
| `--radius/16` | 16px  |
| `--radius/24` | 24px  |

### Typography

| Token Name         | Font                | Size | Weight | Line Height |
| ------------------ | ------------------- | ---- | ------ | ----------- |
| `heading/xl`       | Pretendard Bold     | 40px | 700    | 1.25        |
| `heading/lg`       | Pretendard SemiBold | 32px | 600    | 1.25        |
| `body/lg/bold`     | Pretendard Bold     | 16px | 700    | 1.5         |
| `body/lg/semibold` | Pretendard SemiBold | 16px | 600    | 1.5         |
| `body/lg/regular`  | Pretendard Regular  | 16px | 400    | 1.5         |
| `body/lg/medium`   | Pretendard Medium   | 16px | 500    | 1.5         |
| `body/md/semibold` | Pretendard SemiBold | 14px | 600    | 1.5         |
| `body/md/medium`   | Pretendard Medium   | 14px | 500    | 1.5         |

### Units

| Token Name  | Value |
| ----------- | ----- |
| `--unit/14` | 14px  |
| `--unit/16` | 16px  |
| `--unit/32` | 32px  |
| `--unit/40` | 40px  |

---

## Tailwind Configuration

Based on the analyzed components, here are the custom values to add to `tailwind.config.ts`:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Interactive colors
        "primary-cyan": "#02eee1",
        "interactive-inverse": "#fafafa",
        "text-primary": "#fafafa",
        "text-secondary": "#e5e5e5",
        "text-tertiary": "#d4d4d4",
        "bg-secondary": "#404040",

        // State backgrounds (with opacity)
        "state-default": "rgba(212,212,212,0.3)",
        "state-primary": "rgba(2,238,225,0.3)",
        "state-hover": "rgba(1,169,160,0.3)",
        "state-press": "rgba(1,100,95,0.3)",

        // Specific component colors
        "formula-bg": "rgba(1,100,95,0.5)",
        "button-bg": "rgba(115,115,115,0.3)",
      },

      spacing: {
        "160": "160px", // Large gap in ChatSidebar
      },

      borderRadius: {
        "16": "16px",
        "24": "24px",
      },

      borderWidth: {
        "3": "3px",
        "5": "5px",
      },

      fontSize: {
        "14": ["14px", { lineHeight: "1.5" }],
        "16": ["16px", { lineHeight: "1.5" }],
        "32": ["32px", { lineHeight: "1.25" }],
        "40": ["40px", { lineHeight: "1.25" }],
      },

      fontWeight: {
        "400": "400", // Regular
        "500": "500", // Medium
        "600": "600", // SemiBold
        "700": "700", // Bold
      },

      boxShadow: {
        card: "4px 4px 20px 0px rgba(2,238,225,0.1)",
      },

      maxWidth: {
        "chat-bubble": "365px",
        "model-card": "327.2px",
        "value-card": "567px",
      },
    },
  },
};
```

---

## Accessibility Summary

### Key Accessibility Considerations

#### Interactive Components (Cards, Buttons)

- ✅ Keyboard navigable (Tab, Enter, Space)
- ✅ Focus indicators visible
- ✅ ARIA roles (`button`, `article`)
- ✅ Color contrast checked (cyan #02eee1 on gray backgrounds)
- ⚠️ Verify contrast ratios meet WCAG AA (4.5:1)

#### Chat Interface

- ✅ Message roles clear (user vs AI)
- ✅ Timestamps for context
- ✅ Scrollable containers (keyboard accessible)
- ✅ Live regions for streaming AI responses (`aria-live="polite"`)
- ✅ Proper heading hierarchy in Markdown

#### Markdown Content

- ✅ Semantic HTML (headings, lists, blockquotes)
- ✅ Code blocks with language attributes
- ✅ Links accessible (if present)
- ✅ Proper reading order

#### Popups & Panels

- ✅ Focus management (focus moves to popup on open)
- ✅ Keyboard close (Esc key)
- ✅ Proper ARIA roles (`dialog`, `complementary`)
- ✅ Accessible labels

### Color Contrast Verification Needed

| Element           | Foreground | Background            | Ratio | Status   |
| ----------------- | ---------- | --------------------- | ----- | -------- |
| Default card text | #02eee1    | rgba(212,212,212,0.3) | TBD   | ⚠️ Check |
| Primary card text | #fafafa    | rgba(2,238,225,0.3)   | TBD   | ⚠️ Check |
| Body text         | #d4d4d4    | #404040               | TBD   | ⚠️ Check |
| Blockquote        | #02eee1    | #171717 (dark)        | TBD   | ⚠️ Check |

**Action:** Run contrast checker on these combinations before implementation.

---

## Next Steps

### Immediate Actions

1. **Verify screenshots:** Ensure all 11 component screenshots are captured correctly
2. **Extract icons:** Export SVG icons from Figma for:
   - Electronics chip (ModelCard)
   - 3D box (ValueCard)
   - AI assistant icon
   - Part info icon
   - Hamburger menu
   - Chat dots
3. **Create base components:**
   - Implement Markdown renderer first
   - Create shared `InteractiveCard` base for ModelCard/ValueCard
4. **Set up design tokens:**
   - Add colors, spacing, typography to Tailwind config
   - Create CSS variables for consistency

### Phase-by-Phase Implementation

Follow the **Implementation Priority** section above:

1. Foundation (Markdown, BodyBtn, types)
2. Chat building blocks (message bubbles, history items)
3. Chat container (sidebar)
4. Cards (model, value)
5. Part interaction (info panels, popups)

### Integration Considerations

- **Chat system:** Needs WebSocket or polling for real-time AI responses
- **3D viewer:** Part interaction components need viewer state integration
- **State management:** Zustand stores for chat history, active conversation, selected parts
- **API endpoints:**
  - POST `/api/chat` - Send message, get AI response
  - GET `/api/conversations` - Load history
  - GET `/api/conversations/:id` - Load specific conversation
  - GET `/api/parts/:id` - Get part information

### Testing Priorities

1. **Chat flow:** User sends message → AI responds → Markdown renders
2. **History navigation:** Click history item → Conversation loads
3. **Interactive states:** Hover, press, active states work correctly
4. **Responsive layout:** Chat sidebar collapses on mobile
5. **Accessibility:** Keyboard navigation, screen reader support

---

## Conclusion

This Phase 2 analysis covers 11 domain-specific components organized into three functional groups:

1. **Card Components (2):** ModelCard, ValueCard
2. **Chat & Messaging (5):** ChatSidebar, UserChat, AIChat, HistoryChat, Markdown
3. **Part Interaction (4):** PartInfo, AIAssistant, PartPopup, BodyBtn

All components have been documented with:

- ✅ Figma node IDs and screenshots
- ✅ Dimensions and layout structures
- ✅ TypeScript data interfaces
- ✅ Color palettes and spacing
- ✅ Interactive states
- ✅ shadcn/ui mappings
- ✅ Accessibility considerations
- ✅ Component dependencies

**Key Patterns Identified:**

- Consistent state system (Default/Primary/Hover/Press) across interactive components
- Reusable panel structure (PartInfo and AIAssistant are nearly identical)
- Speech bubble corners indicate message direction
- Cyan (#02eee1) as primary brand color throughout
- 16px and 24px as primary border radius values

**Ready for Implementation:** All components are fully specified and ready for development in the priority order listed above.
