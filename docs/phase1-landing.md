# Phase 1: Landing Page Structure Analysis

## Overview

The Landing Page is a vertically scrolling single-page layout with 4 main sections plus header and footer. The design is based on a **1920px viewport width** with a **dark background (#171717)** and uses **scroll snap** behavior to create distinct section experiences. The primary accent color is cyan (#02eee1) used throughout for interactive elements and highlights.

**Key Design Characteristics:**

- Base viewport: 1920px width
- Background: #171717 (dark gray)
- Primary accent: #02eee1 (cyan)
- Section height: 1024px (for main content sections)
- Horizontal padding: 80px (on all sections)
- Scroll snap: Each major section is a snap point

---

## Section: Complete Landing Page - node-id: 130-652

### Overview

The complete landing page is a vertical flex container that includes:

1. Header (navigation)
2. Intro section (hero)
3. Function section (value propositions)
4. Study Model section (category cards)
5. Footer

**Screenshot Reference:** All sections visible in full-page view

### Layout Structure

```
<Page Container: flex-col, bg-#171717>
  ├─ Header (fixed/sticky at top)
  ├─ Intro Section (1024px height, scroll snap)
  ├─ Function Section (1024px height, scroll snap)
  ├─ Study Model Section (1024px height, scroll snap)
  └─ Footer (auto height)
</Page>
```

### Dimensions

| Area               | Absolute (px) | Ratio | Tailwind Mapping          |
| ------------------ | ------------- | ----- | ------------------------- |
| Page Width         | 1920          | 100%  | w-full                    |
| Horizontal Padding | 80            | 4.17% | px-20                     |
| Section Height     | 1024          | -     | h-screen (viewport-based) |
| Header Height      | ~133          | 6.9%  | h-auto (content-based)    |

### Colors & Styling

- Background: #171717 (dark gray, almost black)
- Primary text: #fafafa (off-white)
- Secondary text: #e5e5e5 (light gray)
- Tertiary text: #d4d4d4 (medium gray)
- Interactive primary: #02eee1 (cyan)
- Interactive backgrounds: rgba(2,238,225,0.3) for primary, rgba(255,255,255,0.3) for secondary
- Border color: rgba(2,238,225,0.2)
- Shadow: 4px 4px 20px 0px rgba(2,238,225,0.1)

### Typography System

| Style           | Font Family | Weight          | Size | Line Height | Usage                     |
| --------------- | ----------- | --------------- | ---- | ----------- | ------------------------- |
| heading/display | Pretendard  | 800 (ExtraBold) | 96px | 1.25        | Main hero headings        |
| heading/2xl     | Pretendard  | 700 (Bold)      | 52px | 1.25        | Section headings          |
| heading/xl      | Pretendard  | 700 (Bold)      | 40px | 1.25        | Card titles, nav labels   |
| heading/lg      | Pretendard  | 600 (SemiBold)  | 32px | 1.25        | Button text, sub-headings |
| body/regular    | Pretendard  | 400 (Regular)   | 16px | normal      | Footer text               |
| body/semibold   | Pretendard  | 600 (SemiBold)  | 24px | normal      | Card descriptions         |

### Component Placeholders

**Header (node-id: 130:396):**

- Left: Logo component (73.6px × 69.1px image + text)
- Center: Navigation component with 4 Label components (소개, 기능, 학습 모델, 문의)
- Right: Two CTAButton components (로그인/가입, 시작하기)

**Intro Section (node-id: 130:647):**

- Left side: Text content + CTAButton component
- Right side: MainVisual component (970px × 477px placeholder)

**Function Section (node-id: 130:648):**

- Top: Heading text
- Center: 3 ValueCard components in horizontal row (567px × 358px each)
  - Each card contains: Icon component + heading + description text

**Study Model Section (node-id: 130:651):**

- Top: Heading text
- Center: 5 ModelCard components in horizontal row (equal flex-1 sizing, 241px height)
  - Each card contains: Icon component + label text

**Footer (node-id: 96:162):**

- Left: Logo + copyright text
- Right: Privacy Policy + Terms of Service links

### Scroll Snap Structure

- Each main section (Intro, Function, Study Model) is a scroll snap point
- Vertical scroll only
- Snap alignment: start (sections snap to top of viewport)
- Creates a "page-like" experience while maintaining continuous scroll

### z-index Layering

- Header: z-10 or higher (if sticky/fixed)
- Content sections: z-1 (base layer)
- No overlapping modals or popups visible in base state

---

## Section: Intro - node-id: 147-317

### Layout Structure

Horizontal two-column layout with left-aligned text content and right-aligned visual.

```
<Section: flex-row, items-center, justify-between, h-1024px, px-80px>
  ├─ Left Column (792px width)
  │   ├─ Heading (display size, 96px)
  │   ├─ Subheading (40px, with cyan highlights)
  │   └─ CTAButton component
  └─ Right Column (970px width)
      └─ MainVisual placeholder (970px × 477px)
</Section>
```

### Dimensions

| Area                | Absolute (px) | Ratio           | Tailwind Mapping       |
| ------------------- | ------------- | --------------- | ---------------------- |
| Container           | 1920 × 1024   | 100% × viewport | w-full h-screen        |
| Horizontal Padding  | 80            | 4.17%           | px-20                  |
| Left Column         | 792           | 41.25%          | w-[792px] or ~w-2/5    |
| Right Column        | 970           | 50.52%          | w-[970px] or ~w-1/2    |
| Gap between columns | ~78           | 4.06%           | justify-between (auto) |
| Main Visual         | 970 × 477     | -               | w-[970px] h-[477px]    |
| Text gap            | 40            | -               | gap-10                 |

### Colors & Styling

- Background: #171717 (inherited from parent)
- Main heading: #fafafa (white)
- Subheading base: #e5e5e5 (light gray)
- Subheading highlights: #02eee1 (cyan) - "3D 인터랙션", "AI 튜터"
- CTA Button background: rgba(2,238,225,0.3)
- CTA Button border: rgba(2,238,225,0.2), 5px width
- CTA Button shadow: 4px 4px 20px 0px rgba(2,238,225,0.1)
- CTA Button text: #fafafa
- Border radius: 24px (buttons)

### Component Placeholders

**Left Column Components:**

1. **Heading Text Block** (96px font):
   - Line 1: "이론을 넘어,"
   - Line 2: "현실로 들어서다."
   - Font: Pretendard ExtraBold, 96px, line-height 1.25

2. **Subheading Text Block** (40px font):
   - Line 1: "복잡한 공학 시스템,"
   - Line 2: "3D 인터랙션과 AI 튜터로 완벽하게 마스터하세요."
   - Font: Pretendard Bold, 40px, line-height 1.25
   - Mixed colors: #e5e5e5 (base), #02eee1 (highlights)

3. **CTAButton Component** (210px × auto):
   - Text: "지금 바로 학습 시작하기"
   - Variant: primary (cyan background)
   - Padding: 24px horizontal, 16px vertical

**Right Column Component:**

- **MainVisual Component**: 970px × 477px image placeholder
  - Currently shows crossed-box placeholder in design
  - Will contain 3D preview or hero image

### Special Behaviors

- Text content is vertically centered in the section
- MainVisual is also vertically centered
- Responsive breakpoint consideration: At smaller screens, switch to vertical stack
- CTA button hover state: Likely brightness increase or scale effect

### Screenshot

Path: docs/screenshots/landing-intro.png (captured from Figma)

---

## Section: ClickIntro - node-id: 147-394

### Overview

This appears to be the complete landing page WITH the header included and showing the intro section in its scrolled state. It represents the "clicked intro" navigation state, showing the full page context.

### Layout Structure

Same as the complete landing page (130-652), but this represents a specific navigation state or variant.

### Key Difference from Intro (147-317)

- **Intro (147-317)**: Section only, no header
- **ClickIntro (147-394)**: Full page including header + all sections

This variant is likely used for:

- Navigation link targeting
- Scroll-to-section behavior
- Active state visualization

### Dimensions

Same as complete landing page (130-652).

### Component Placeholders

Identical to complete landing page, includes:

- Header with navigation (active state on "소개" label)
- All four main sections
- Footer

### Screenshot

Path: docs/screenshots/landing-click-intro.png (captured from Figma)

---

## Section: Function - node-id: 147-327

### Layout Structure

Vertical flex layout with centered heading and horizontal card grid.

```
<Section: flex-col, items-center, justify-center, h-1024px, px-80px, gap-80px>
  ├─ Heading Text (96px, centered)
  └─ ValueCards Container (flex-row, gap-48px)
      ├─ ValueCard 1 (3D 몰입형 인터랙션)
      ├─ ValueCard 2 (AI 기반 맞춤형 튜터링)
      └─ ValueCard 3 (정교한 데이터 시각화)
</Section>
```

### Dimensions

| Area               | Absolute (px) | Ratio           | Tailwind Mapping |
| ------------------ | ------------- | --------------- | ---------------- |
| Container          | 1920 × 1024   | 100% × viewport | w-full h-screen  |
| Horizontal Padding | 80            | 4.17%           | px-20            |
| Section Gap        | 80            | -               | gap-20           |
| Card Width         | 567           | 29.53%          | w-[567px]        |
| Card Height        | 358           | -               | h-[358px]        |
| Card Gap           | 48            | -               | gap-12           |
| Total Cards Width  | 1761          | 91.72%          | 3 cards + 2 gaps |
| Icon Size          | 147 × 147     | -               | size-[147px]     |
| Card Content Gap   | 32            | -               | gap-8            |

### Colors & Styling

- Background: #171717 (inherited)
- Heading base: #fafafa
- Heading highlight: #02eee1 ("학습 경험을 혁신")
- Card background: rgba(212,212,212,0.3) (semi-transparent gray)
- Card border: rgba(2,238,225,0.2), 5px width
- Card border radius: 24px
- Card shadow: 4px 4px 20px 0px rgba(2,238,225,0.1)
- Card title color: #02eee1 (cyan)
- Card description color: #d4d4d4 (tertiary gray)

### Component Placeholders

**Heading:**

- Text: "당신의 학습 경험을 혁신합니다"
- Font: Pretendard ExtraBold, 96px, line-height 1.25
- Mixed colors: #fafafa (base) + #02eee1 ("학습 경험을 혁신")

**ValueCard Components (567px × 358px each):**

1. **Card 1 - 3D Interaction:**
   - Icon: GardenBox3DStroke component (147px × 147px)
   - Title: "3D 몰입형 인터랙션" (40px, cyan)
   - Description: "보고 만지고 분해하며,\n이론을 직관적인 경험으로 바꿉니다." (24px)

2. **Card 2 - AI Tutoring:**
   - Icon: BiChatDots component (147px × 147px)
   - Title: "AI 기반 맞춤형 튜터링" (40px, cyan)
   - Description: "궁금증은 바로 해결!\nAI 튜터가 당신의 이해를 돕습니다." (24px)

3. **Card 3 - Data Visualization:**
   - Icon: CilChartLine component (147px × 147px)
   - Title: "정교한 데이터 시각화" (40px, cyan)
   - Description: "숨겨진 공학 원리,\n정밀한 데이터를 통해 완벽하게 파악합니다." (24px)

**Card Internal Structure:**

```
<Card: 567px × 358px, rounded-24px, centered content>
  <Content Container: flex-col, gap-32px, centered, width-335px>
    ├─ Icon Component (147px × 147px)
    ├─ Title Text (40px)
    └─ Description Text (24px, 2 lines)
  </Content>
</Card>
```

### Special Behaviors

- Cards have equal width and are horizontally centered
- Icons are custom SVG components (not standard iconography)
- Hover state likely: scale up slightly or brightness increase
- Card content is absolutely centered both horizontally and vertically

### Screenshot

Path: docs/screenshots/landing-function.png (captured from Figma)

---

## Section: Study Model - node-id: 147-354

### Layout Structure

Vertical flex layout with heading and horizontal card row (5 cards).

```
<Section: flex-col, items-center, justify-center, h-1024px, px-80px, gap-24px>
  ├─ Heading Text (52px, left-aligned to content)
  └─ ModelCards Container (flex-row, gap-24px, equal flex distribution)
      ├─ ModelCard 1 (회로공학)
      ├─ ModelCard 2 (화학공학)
      ├─ ModelCard 3 (전기공학)
      ├─ ModelCard 4 (기계공학)
      └─ ModelCard 5 (항공우주공학)
</Section>
```

### Dimensions

| Area               | Absolute (px) | Ratio           | Tailwind Mapping            |
| ------------------ | ------------- | --------------- | --------------------------- |
| Container          | 1920 × 1024   | 100% × viewport | w-full h-screen             |
| Horizontal Padding | 80            | 4.17%           | px-20                       |
| Section Gap        | 24            | -               | gap-6                       |
| Card Height        | 241           | -               | h-[241px]                   |
| Card Width         | ~340 (flex-1) | ~17.7% each     | flex-1 (equal distribution) |
| Cards Gap          | 24            | -               | gap-6                       |
| Total Cards Area   | 1760          | 91.67%          | Full width minus padding    |
| Icon Size          | 113-123px     | -               | Variable per icon           |
| Icon to Label Gap  | ~101px        | -               | Vertical spacing            |

### Colors & Styling

- Background: #171717 (inherited)
- Heading base: #e5e5e5 (light gray)
- Heading emphasis: Same color, no highlights in this section
- Card background: rgba(212,212,212,0.3)
- Card border: rgba(2,238,225,0.2), 5px width
- Card border radius: 24px
- Card shadow: 4px 4px 20px 0px rgba(2,238,225,0.1)
- Card label color: #02eee1 (cyan)

### Component Placeholders

**Heading:**

- Text: "다양한 분야의 핵심 모델을 탐색하세요"
- Font: Pretendard Bold, 52px, line-height 1.25
- Color: #e5e5e5 with partial emphasis on "다양한 분야"

**ModelCard Components (flex-1 × 241px each):**

1. **Card 1 - Electronics:**
   - Icon: iconoir:electronics-chip (114px × 114px)
   - Label: "회로공학" (32px, cyan)

2. **Card 2 - Chemistry:**
   - Icon: lets-icons:chemistry-light (114px × 114px)
   - Label: "화학공학" (32px, cyan)

3. **Card 3 - Electrical:**
   - Icon: mage:electricity (114px × 114px)
   - Label: "전기공학" (32px, cyan)

4. **Card 4 - Mechanical:**
   - Icon: solar:settings-linear (123px × 123px)
   - Label: "기계공학" (32px, cyan)

5. **Card 5 - Aerospace:**
   - Icon: streamline-ultimate:space-rocket-earth (114px × 114px)
   - Label: "항공우주공학" (32px, cyan)

**Card Internal Structure:**

```
<Card: flex-1 × 241px, rounded-24px>
  ├─ Icon Component (centered, top-offset)
  └─ Label Text (centered, bottom-offset: calc(50% + 50.5px))
</Card>
```

### Special Behaviors

- Cards use flex-1 for equal width distribution (responsive to container width)
- Icons are vertically positioned at top-center of card
- Labels are positioned at bottom-center of card
- Hover state likely: card background brightness or border glow effect
- Cards are clickable navigation elements (link to model detail pages)

### Screenshot

Path: docs/screenshots/landing-study-model.png (captured from Figma)

---

## Header Component - node-id: 130:396

### Layout Structure

Horizontal flex layout with three sections: logo, navigation, and action buttons.

```
<Header: flex-row, items-center, gap-48px, px-80px, py-32px>
  ├─ Logo (325px width)
  ├─ Navigation (flex-1, gap-80px)
  │   ├─ Label (소개)
  │   ├─ Label (기능)
  │   ├─ Label (학습 모델)
  │   └─ Label (문의)
  └─ Action Buttons (flex-row, gap-16px)
      ├─ CTAButton (로그인/가입, default variant)
      └─ CTAButton (시작하기, primary variant)
</Header>
```

### Dimensions

| Area               | Absolute (px) | Ratio  | Tailwind Mapping      |
| ------------------ | ------------- | ------ | --------------------- |
| Header Width       | 1920          | 100%   | w-full                |
| Horizontal Padding | 80            | 4.17%  | px-20                 |
| Vertical Padding   | 32            | -      | py-8                  |
| Logo Width         | 325           | 16.93% | w-[325px]             |
| Logo Image         | 73.6 × 69.1   | -      | w-[73.6px] h-[69.1px] |
| Logo Gap           | 17.22         | -      | gap-4                 |
| Nav Gap            | 80            | -      | gap-20                |
| Label Width        | 70            | -      | w-[70px]              |
| Label Height       | 48            | -      | h-12                  |
| Button Width       | 210           | -      | w-[210px]             |
| Button Gap         | 16            | -      | gap-4                 |

### Colors & Styling

- Background: Transparent (overlays page background)
- Logo text: #fafafa
- Nav labels: #fafafa
- Nav labels active: Possibly brighter or underlined
- Button default: rgba(255,255,255,0.3)
- Button primary: rgba(2,238,225,0.3)
- Button border: rgba(2,238,225,0.2), 5px
- Button text: #fafafa

### Component Placeholders

**Logo Component:**

- Image: 73.6px × 69.1px (SIMVEX icon)
- Text: SIMVEX wordmark (proportional width)
- Combined width: 325px

**Navigation Labels (4 items):**

- Label 1: "소개" (Intro)
- Label 2: "기능" (Function)
- Label 3: "학습 모델" (Study Model)
- Label 4: "문의" (Contact)
- Each: 70px wide, 48px tall, 40px font

**Action Buttons (2 items):**

- Button 1: "로그인/가입" (Login/Signup), default variant
- Button 2: "시작하기" (Get Started), primary variant
- Each: 210px wide, 32px font

### Special Behaviors

- Likely sticky/fixed positioning (z-index: 10+)
- Navigation labels are clickable scroll-to-section anchors
- Active nav label may have underline or color change
- Buttons have hover states (brightness/scale)

---

## Footer Component - node-id: 96:162

### Layout Structure

Horizontal flex layout with left-aligned branding and right-aligned links.

```
<Footer: flex-col, items-center, px-80px, py-40px>
  <Content: flex-row, items-end, justify-end, px-80px, py-10px>
    ├─ Left Pane (163px width)
    │   ├─ Logo (smaller version)
    │   ├─ Copyright "© 2026"
    │   └─ "All rights reserved."
    └─ Right Pane (flex-1, flex-row, justify-end, gap-40px)
        ├─ "Privacy Policy"
        └─ "Terms of Service"
  </Content>
</Footer>
```

### Dimensions

| Area               | Absolute (px) | Ratio | Tailwind Mapping |
| ------------------ | ------------- | ----- | ---------------- |
| Footer Width       | 1920          | 100%  | w-full           |
| Horizontal Padding | 80            | 4.17% | px-20            |
| Vertical Padding   | 40            | -     | py-10            |
| Left Pane Width    | 163           | 8.49% | w-[163px]        |
| Left Pane Height   | 239           | -     | h-[239px]        |
| Logo Image         | 36.9 × 34.7   | -     | Smaller version  |
| Logo Gap           | 8.637         | -     | gap-2            |
| Links Gap          | 40            | -     | gap-10           |
| Link Font Size     | 32            | -     | text-[32px]      |

### Colors & Styling

- Background: Transparent (over #171717)
- Logo text: #fafafa
- Copyright: #d4d4d4 (tertiary)
- Rights text: #fafafa
- Links: #fafafa
- Link hover: Likely #02eee1 or brighter

### Component Placeholders

**Left Pane:**

- Logo component (smaller version)
- Copyright text: "© 2026" (16px, tertiary color)
- Rights text: "All rights reserved." (16px, white)

**Right Pane:**

- Link 1: "Privacy Policy" (32px, semibold)
- Link 2: "Terms of Service" (32px, semibold)

### Special Behaviors

- Links are clickable (navigate to policy pages or open modals)
- Link hover state: color change to cyan or underline

---

## Design Tokens Summary

### Spacing Scale

- spacing/8: 8px
- spacing/16: 16px
- spacing/24: 24px
- spacing/32: 32px
- spacing/40: 40px
- spacing/48: 48px
- spacing/80: 80px

### Border Radius

- radius/24: 24px (used consistently for all cards and buttons)

### Color Palette

**Background:**

- bg/primary: #171717

**Text:**

- text/primary: #fafafa
- text/secondary: #e5e5e5
- text/tertiary: #d4d4d4
- text/interactive/primary: #02eee1
- text/interactive/inverse: #fafafa

**Interactive:**

- interactive/primary/bg: rgba(2,238,225,0.3)
- interactive/secondary/bg: rgba(255,255,255,0.3)
- interactive/border: rgba(2,238,225,0.2)

**Effects:**

- shadow/glow: 4px 4px 20px 0px rgba(2,238,225,0.1)
- card/bg: rgba(212,212,212,0.3)

### Typography Units

- unit/96: 96px (display heading)
- unit/52: 52px (2xl heading)
- unit/40: 40px (xl heading)
- unit/32: 32px (lg heading)
- unit/24: 24px (body large)
- unit/16: 16px (body regular)

---

## Scroll Snap Structure

The landing page uses CSS Scroll Snap to create a paginated experience:

```css
/* Container */
scroll-snap-type: y mandatory;

/* Each section */
scroll-snap-align: start;
```

**Snap Points (in order):**

1. **Top of page**: Header is visible
2. **Intro Section**: Snaps to top of section (node-id: 130:647 or 147:317)
3. **Function Section**: Snaps to top of section (node-id: 147:327)
4. **Study Model Section**: Snaps to top of section (node-id: 147:354)
5. **Footer**: Naturally appears after last section

**Scroll Behavior:**

- Vertical scroll only (no horizontal scroll)
- Smooth snapping between sections
- Mouse wheel or trackpad: advances one section at a time
- Navigation links: smooth scroll to target section with snap
- Mobile: Touch swipe advances sections

**Implementation Notes:**

- Each section should be a direct child of the scroll container
- Use `scroll-behavior: smooth` for animated transitions
- Navigation click handlers should use `scrollIntoView({ behavior: 'smooth', block: 'start' })`

---

## Responsive Breakpoints Considerations

While the design is based on 1920px, the layout should adapt:

**Desktop (1920px):** Base design as documented

**Laptop (1440px):**

- Maintain layout structure
- Proportional scaling of padding and gaps
- Card sizes should flex down proportionally

**Tablet (768px):**

- Stack Intro section vertically (text above visual)
- Function cards: 2 columns or vertical stack
- Study Model cards: 3 columns then 2 on wrap, or horizontal scroll

**Mobile (375px):**

- All sections stack vertically
- Single column layouts
- Cards at full width or horizontal scroll
- Header: Hamburger menu for navigation

---

## Asset Requirements

### Images

- Logo image: SVG or PNG with transparency
- Logo text: SVG or PNG with transparency
- Main Visual (Intro): 970px × 477px (or larger for retina)
- All icons: SVG format for crisp rendering at any size

### Icon Components (147px × 147px base size)

1. garden:box-3d-stroke-16 (3D box icon)
2. bi:chat-dots (chat bubbles icon)
3. cil:chart-line (chart/graph icon)
4. iconoir:electronics-chip (circuit chip icon)
5. lets-icons:chemistry-light (chemistry flask icon)
6. mage:electricity (lightning bolt icon)
7. solar:settings-linear (gear/cog icon)
8. streamline-ultimate:space-rocket-earth (rocket icon)

### Fonts

- Pretendard font family with weights:
  - 400 (Regular)
  - 600 (SemiBold)
  - 700 (Bold)
  - 800 (ExtraBold)

---

## Implementation Priority

**Phase 1A - Core Structure:**

1. Page container with scroll snap
2. Header component (sticky)
3. Footer component
4. Basic section layouts

**Phase 1B - Content Sections:** 5. Intro section with text + placeholder 6. Function section with 3 cards 7. Study Model section with 5 cards

**Phase 1C - Components:** 8. CTAButton component (default + primary variants) 9. Label component (navigation) 10. Logo component 11. ValueCard component 12. ModelCard component

**Phase 1D - Interactions:** 13. Navigation scroll-to-section 14. Hover states for all interactive elements 15. Responsive breakpoints 16. Icon components

**Phase 1E - Polish:** 17. Animations and transitions 18. Focus states for accessibility 19. Loading states 20. Performance optimization

---

## Notes for Phase 2 (Component Breakdown)

The following components identified in this phase need detailed analysis in Phase 2:

1. **CTAButton** - Two variants (default, primary), needs hover/focus/active states
2. **Label** - Navigation labels, needs active state indication
3. **Logo** - Two sizes (header, footer), needs to be linkable
4. **ValueCard** - Three instances, needs hover state, icon variations
5. **ModelCard** - Five instances, needs hover state, clickable behavior
6. **Icon Components** - 8 different icons, need to be reusable SVG components
7. **MainVisual** - Placeholder for 3D content or hero image

Each component will be analyzed for:

- Props and variants
- Internal structure
- States (default, hover, focus, active, disabled)
- Accessibility requirements
- Responsive behavior
- Animation/transition needs

---

## Accessibility Considerations

**Keyboard Navigation:**

- All interactive elements must be keyboard accessible
- Tab order: Header buttons → Navigation links → Section CTAs → Cards → Footer links
- Focus indicators must be visible (cyan outline: 2px solid #02eee1)

**Screen Readers:**

- Semantic HTML: `<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`
- Heading hierarchy: h1 (page title) → h2 (section headings) → h3 (card titles)
- Image alt text: Logo = "SIMVEX", MainVisual = descriptive text, Icons = decorative (aria-hidden="true")
- ARIA labels for navigation: `aria-label="Main navigation"`

**Color Contrast:**

- Heading (#fafafa on #171717): 17.99:1 (AAA)
- Secondary text (#e5e5e5 on #171717): 15.09:1 (AAA)
- Tertiary text (#d4d4d4 on #171717): 11.86:1 (AAA)
- Cyan accent (#02eee1 on #171717): 11.63:1 (AAA)
- All text meets WCAG 2.1 Level AAA

**Motion:**

- Respect `prefers-reduced-motion` for scroll snap and animations
- Provide alternative navigation without scroll snap for users who prefer it

---

## End of Phase 1 Analysis

This document provides the complete structural analysis of the Landing Page from Figma. All sections have been documented with:

- Layout structure (grid/flex patterns)
- Dimensions (absolute px, ratios, Tailwind mappings)
- Colors and styling (hex values, rgba, design tokens)
- Component placeholders (what goes where)
- Special behaviors (scroll snap, hover states, interactions)
- Screenshots captured and referenced

**Next Steps:**

- Phase 2: Individual component deep-dive analysis
- Phase 3: Component implementation
- Phase 4: Integration and testing
