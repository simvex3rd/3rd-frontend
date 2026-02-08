# Phase 3: Page-Component Matching

## Overview

This document maps all components identified in Phase 1 (page structures) and Phase 2 (component analysis) to create a comprehensive implementation plan. It includes component-page matrices, dependency trees, reusability analysis, and prioritized implementation order.

**Total Pages Analyzed:** 4 (Landing, Login, Signup, Main)
**Total Components Identified:** 30+
**Mapping Coverage:** 100%

**Documents Referenced:**

- Phase 1: Landing (`phase1-landing.md`)
- Phase 1: Auth (`phase1-auth.md`)
- Phase 1: Main (`phase1-main.md`)
- Phase 2: UI Basic (`phase2-ui-basic.md`)
- Phase 2: Layout (`phase2-layout.md`)
- Phase 2: Domain (`phase2-domain.md`)

---

## Page Breakdown

### Landing Page (/)

**Figma Reference:** node-id=130-652
**Route:** `/`
**Sections:** Navigation, Intro, Function, StudyModel, Footer

#### Component Dependency Tree

```
Landing Page (/)
├── AppHeader (LoginHeader variant="Landing")
│   ├── Logo (120-374) [IMAGE]
│   │   ├── Logo Image (73.6×69.1px)
│   │   └── Logo Text (234×40px)
│   ├── Navigation (130-135) - Korean labels
│   │   └── Label (120-375) × 4
│   │       ├── "소개" (Introduction)
│   │       ├── "기능" (Features)
│   │       ├── "학습 모델" (Study Model)
│   │       └── "문의" (Contact)
│   └── CTA Buttons
│       ├── CTAButton (90-41) "로그인/가입" [Default variant]
│       └── CTAButton (90-41) "시작하기" [Primary variant]
│
├── Intro Section (147-317)
│   ├── Heading Text [96px]
│   ├── Subheading Text [40px, mixed colors]
│   ├── CTAButton (90-41) "지금 바로 학습 시작하기"
│   └── [MainVisual - IMAGE EXPORT NEEDED] (970×477px)
│
├── Function Section (147-327)
│   ├── Heading Text [96px, cyan highlight]
│   └── ValueCard (144-277) × 3
│       ├── Card 1: 3D Interaction
│       │   ├── Icon (130-389) - garden:box-3d-stroke [SVG]
│       │   ├── Title "3D 몰입형 인터랙션"
│       │   └── Description text
│       ├── Card 2: AI Tutoring
│       │   ├── Icon (130-389) - bi:chat-dots [SVG]
│       │   ├── Title "AI 기반 맞춤형 튜터링"
│       │   └── Description text
│       └── Card 3: Data Visualization
│           ├── Icon (130-389) - cil:chart-line [SVG]
│           ├── Title "정교한 데이터 시각화"
│           └── Description text
│
├── Study Model Section (147-354)
│   ├── Heading Text [52px]
│   └── ModelCard (144-299) × 5
│       ├── Card 1: Electronics "회로공학"
│       │   └── Icon - iconoir:electronics-chip [SVG]
│       ├── Card 2: Chemistry "화학공학"
│       │   └── Icon - lets-icons:chemistry-light [SVG]
│       ├── Card 3: Electrical "전기공학"
│       │   └── Icon - mage:electricity [SVG]
│       ├── Card 4: Mechanical "기계공학"
│       │   └── Icon - solar:settings-linear [SVG]
│       └── Card 5: Aerospace "항공우주공학"
│           └── Icon - streamline-ultimate:space-rocket-earth [SVG]
│
└── Footer (96-162)
    ├── Logo (120-374) [IMAGE - smaller version]
    ├── Copyright text "© 2026"
    ├── Rights text "All rights reserved."
    └── Legal Links
        ├── ALinkButton "Privacy Policy"
        └── ALinkButton "Terms of Service"
```

#### Components Used (Detailed)

| Component          | Node-ID | Instances | Location               | Notes                           |
| ------------------ | ------- | --------- | ---------------------- | ------------------------------- |
| **AppHeader**      | 130-188 | 1         | Top                    | LoginHeader variant="Landing"   |
| **Logo**           | 120-374 | 2         | Header + Footer        | Different sizes                 |
| **Label**          | 120-375 | 4         | Navigation             | Korean text                     |
| **CTAButton**      | 90-41   | 3         | Header (2) + Intro (1) | Default + Primary variants      |
| **ValueCard**      | 144-277 | 3         | Function section       | Horizontal grid layout          |
| **ModelCard**      | 144-299 | 5         | Study Model section    | Equal flex distribution         |
| **Icon (Landing)** | 130-389 | 8         | Cards                  | 3 ValueCard + 5 ModelCard icons |
| **Footer**         | 96-162  | 1         | Bottom                 | -                               |
| **ALinkButton**    | 147-841 | 2         | Footer                 | Legal links                     |
| **[MainVisual]**   | -       | 1         | Intro                  | IMAGE EXPORT NEEDED             |

**Total Component Instances:** 28

---

### Login Page (/login)

**Figma Reference:** node-id=160-1146
**Route:** `/login`

#### Component Dependency Tree

```
Login Page (/login)
├── AppHeader (LoginHeader variant="login")
│   ├── Logo (120-374) [IMAGE]
│   ├── Navigation (130-135) - Korean labels
│   │   └── Label (120-375) × 4
│   └── User Display
│       ├── CTAButton "jun1 님" [Default variant]
│       └── CTAButton "시작하기" [Primary variant]
│
├── Auth Container (centered, 311×~600px)
│   ├── Title "로그인" [h1, 24px SemiBold]
│   │
│   ├── TextField × 2 (stacked)
│   │   ├── Email TextField
│   │   │   ├── Label "이메일"
│   │   │   ├── InputField (147-809)
│   │   │   │   ├── Input element
│   │   │   │   └── [Search Icon - decorative] [SVG]
│   │   │   └── HelpMessage (optional, hidden initially)
│   │   │
│   │   └── Password TextField
│   │       ├── Label "비밀번호"
│   │       ├── InputField (147-809)
│   │       │   ├── Input element (type="password")
│   │       │   └── [Eye Icon - toggle visibility] [SVG]
│   │       └── HelpMessage (optional)
│   │
│   ├── ALinkButton (147-841) "아이디/비밀번호 찾기"
│   │   └── [Right-aligned below password]
│   │
│   └── Button Group (vertical stack)
│       ├── Button (160-989) "로그인" [Primary fill variant]
│       └── Button (160-989) "계정 만들기" [Outline variant]
│
└── [Background decoration - optional]
```

#### Components Used

| Component       | Node-ID | Instances | Location                   | Notes                       |
| --------------- | ------- | --------- | -------------------------- | --------------------------- |
| **AppHeader**   | 130-188 | 1         | Top                        | LoginHeader variant="login" |
| **Logo**        | 120-374 | 1         | Header                     | -                           |
| **Label**       | 120-375 | 4         | Navigation                 | -                           |
| **CTAButton**   | 90-41   | 2         | Header                     | User name + Start           |
| **TextField**   | 147-837 | 2         | Form                       | Email + Password            |
| **InputField**  | 147-809 | 2         | Within TextFields          | -                           |
| **Label**       | 120-375 | 2         | Form labels                | "이메일", "비밀번호"        |
| **HelpMessage** | 147-830 | 2         | Below inputs (conditional) | Validation messages         |
| **ALinkButton** | 147-841 | 1         | Below password             | Forgot password             |
| **Button**      | 160-989 | 2         | Form actions               | Login + Create Account      |

**Total Component Instances:** 17 (excluding header shared components)

---

### Signup Page (/signup)

**Figma Reference:** node-id=175-748
**Route:** `/signup`

#### Component Dependency Tree

```
Signup Page (/signup)
├── AppHeader (LoginHeader variant="login")
│   ├── Logo (120-374) [IMAGE]
│   ├── Navigation (130-135)
│   │   └── Label (120-375) × 4
│   └── CTAButtons
│       ├── CTAButton "jun1 님"
│       └── CTAButton "시작하기"
│
├── Auth Container (centered, 311×~700px)
│   ├── Title "계정 만들기" [h1, 24px SemiBold]
│   │
│   ├── Pre-form Header (inline text + link)
│   │   ├── Text "이전에 생성한 계정이 있으신가요?"
│   │   └── ALinkButton (147-841) "로그인" [underlined]
│   │
│   ├── Name Fields Row (horizontal, gap-8px)
│   │   ├── TextField (First Name)
│   │   │   ├── Label "성"
│   │   │   ├── InputField (147-809)
│   │   │   └── HelpMessage (conditional)
│   │   │
│   │   └── TextField (Last Name)
│   │       ├── Label "이름"
│   │       ├── InputField (147-809)
│   │       └── HelpMessage (conditional)
│   │
│   ├── TextField (Email)
│   │   ├── Label "이메일"
│   │   ├── InputField (147-809)
│   │   └── HelpMessage (conditional)
│   │
│   ├── TextField (Password)
│   │   ├── Label "비밀번호"
│   │   ├── InputField (147-809)
│   │   └── HelpMessage "8-16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
│   │
│   ├── TextField (Password Confirm)
│   │   ├── Label "비밀번호 확인"
│   │   ├── InputField (147-809)
│   │   └── HelpMessage (conditional, match validation)
│   │
│   └── Button (160-989) "계정 만들기" [Primary fill variant]
│
└── [Background decoration - optional]
```

#### Components Used

| Component       | Node-ID | Instances | Location          | Notes                               |
| --------------- | ------- | --------- | ----------------- | ----------------------------------- |
| **AppHeader**   | 130-188 | 1         | Top               | Same as Login                       |
| **Logo**        | 120-374 | 1         | Header            | -                                   |
| **Label**       | 120-375 | 4         | Navigation        | -                                   |
| **CTAButton**   | 90-41   | 2         | Header            | -                                   |
| **TextField**   | 147-837 | 5         | Form              | First/Last name, Email, Password ×2 |
| **InputField**  | 147-809 | 5         | Within TextFields | -                                   |
| **Label**       | 120-375 | 5         | Form labels       | -                                   |
| **HelpMessage** | 147-830 | 5         | Below inputs      | 1 always visible, 4 conditional     |
| **ALinkButton** | 147-841 | 1         | Pre-form header   | "로그인" link                       |
| **Button**      | 160-989 | 1         | Form submit       | Create Account                      |

**Total Component Instances:** 25 (excluding header shared components)

---

### Main Application Page (/viewer or /main)

**Figma Reference:** node-id=375-1338
**Route:** `/viewer` or `/main`

#### Component Dependency Tree

```
Main Page (/viewer)
├── AppHeader (LoginHeader variant="main")
│   ├── Logo (120-374) [IMAGE]
│   └── MainNavigation (130-279) - English labels
│       └── Label (120-375) × 4
│           ├── "HOME"
│           ├── "STUDY"
│           ├── "CAD"
│           └── "LAB"
│
├── Main Content Container (1920×879px)
│   ├── ChatSidebar (236-1535) [Toggleable, 311px width]
│   │   ├── Hamburger Button [40×40px icon]
│   │   │   └── Icon - hamburger menu [SVG]
│   │   ├── New Chat Button
│   │   │   ├── Icon (130-389) - bi:chat-dots [SVG - 147px in design, should be ~24px]
│   │   │   └── Text "New Chat"
│   │   ├── History Section
│   │   │   ├── Label "History"
│   │   │   └── ChatHistoryItem (236-1323) × N (7 visible, scrollable)
│   │   │       └── Text "history chat" (placeholder)
│   │   └── [Active Conversation Area - separate implementation]
│   │       ├── UserChatBubble (236-1485) × N
│   │       │   └── Text content
│   │       ├── AIChatBubble (236-1501) × N
│   │       │   └── Markdown (337-1343)
│   │       │       ├── Heading
│   │       │       ├── Body text
│   │       │       ├── Code/Formula block (bordered)
│   │       │       └── Blockquote
│   │       └── TextField [Input area - not in Phase 2]
│   │           ├── Input
│   │           └── Send button
│   │
│   ├── 3D Viewer Area (flex-1, ~1710px width when sidebar closed)
│   │   ├── Toolbar (160-723) [Horizontal, top]
│   │   │   ├── ToolbarItem (375-1336) × 4
│   │   │   │   ├── PhCubeFocusLight [SVG - Object selection]
│   │   │   │   ├── TablerCube3DSphere [SVG - 3D view]
│   │   │   │   ├── MdiCameraLockOutline [SVG - Camera lock]
│   │   │   │   └── ClarityRulerPencilLine [SVG - Measurement]
│   │   │   └── [Container: 500×50px, glassmorphic]
│   │   │
│   │   ├── [Three.js Canvas] - R3F rendering area
│   │   │   ├── 3D Scene
│   │   │   ├── Camera controls
│   │   │   ├── Lighting
│   │   │   └── Part meshes (interactive)
│   │   │
│   │   ├── PartPopup (236-1141) [On part hover/click]
│   │   │   ├── Question text
│   │   │   └── BodyBtn (236-1131) "YES"
│   │   │       └── [4 states: Default/Primary/Hover/Press]
│   │   │
│   │   └── ZoomSlider (160-577) [Bottom, horizontal]
│   │       ├── Slidebar (full: 1200px, 10 levels)
│   │       └── SlidebarPartClick (compact: 960px, 8 levels)
│   │           └── [Same component, different config]
│   │
│   ├── Side Tools (Right edge, rotated)
│   │   └── Toolbar (160-723) [Vertical variant, bar="side"]
│   │       └── ToolbarItem × 2 (rotated -90°)
│   │           ├── MingcuteAiLine [SVG - AI assistant toggle]
│   │           └── FluentTagSearch24Regular [SVG - Part search]
│   │
│   └── PartInfoSidebar (232-967) [Toggleable, right side]
│       ├── AIAssistant (160-672) [Top panel]
│       │   ├── Header
│       │   │   ├── Icon - mingcute:ai-line [SVG]
│       │   │   └── Title "AI Assistant"
│       │   └── Content Box (416×250px)
│       │       └── Text content
│       │
│       └── PartInfo (232-886) [Bottom panel]
│           ├── Header
│           │   ├── Icon - part info [SVG]
│           │   └── Title "Part Info"
│           └── Content Box (416×250px)
│               └── Text content
│
└── [No Footer on main app]
```

#### Components Used

| Component           | Node-ID  | Instances | Location                       | Notes                      |
| ------------------- | -------- | --------- | ------------------------------ | -------------------------- |
| **AppHeader**       | 130-188  | 1         | Top                            | LoginHeader variant="main" |
| **Logo**            | 120-374  | 1         | Header                         | -                          |
| **MainNavigation**  | 130-279  | 1         | Header                         | English labels             |
| **Label**           | 120-375  | 4         | Navigation                     | HOME/STUDY/CAD/LAB         |
| **ChatSidebar**     | 236-1535 | 1         | Left (toggleable)              | Full sidebar container     |
| **ChatHistoryItem** | 236-1323 | N         | Sidebar                        | 7 visible, scrollable      |
| **UserChatBubble**  | 236-1485 | N         | Chat area                      | Variable count             |
| **AIChatBubble**    | 236-1501 | N         | Chat area                      | Variable count             |
| **Markdown**        | 337-1343 | N         | Inside AIChatBubble            | Rich content renderer      |
| **TextField**       | 147-837  | 1         | Chat input                     | -                          |
| **Toolbar**         | 160-723  | 2         | Viewer (horizontal + vertical) | 2 variants                 |
| **ToolbarItem**     | 375-1336 | 6         | Toolbars                       | 4 horizontal + 2 vertical  |
| **ZoomSlider**      | 160-577  | 1         | Viewer bottom                  | Responsive width           |
| **PartPopup**       | 236-1141 | 1         | On part interaction            | Conditional                |
| **BodyBtn**         | 236-1131 | 1         | Inside PartPopup               | -                          |
| **PartInfoSidebar** | 232-967  | 1         | Right (toggleable)             | Container                  |
| **AIAssistant**     | 160-672  | 1         | Info sidebar                   | Top panel                  |
| **PartInfo**        | 232-886  | 1         | Info sidebar                   | Bottom panel               |

**Total Component Instances:** 19+ fixed + N dynamic (chat messages)

---

## Component Reusability Matrix

| Component           | Landing | Login  | Signup | Main   | Total Pages | Instances | Priority     |
| ------------------- | ------- | ------ | ------ | ------ | ----------- | --------- | ------------ |
| **Logo**            | ✓ (2×)  | ✓      | ✓      | ✓      | 4           | 5         | **Critical** |
| **Label**           | ✓ (4×)  | ✓ (4×) | ✓ (4×) | ✓ (4×) | 4           | 16        | **Critical** |
| **AppHeader**       | ✓       | ✓      | ✓      | ✓      | 4           | 4         | **Critical** |
| **InputField**      | -       | ✓ (2×) | ✓ (5×) | ✓ (1×) | 3           | 8         | **Critical** |
| **TextField**       | -       | ✓ (2×) | ✓ (5×) | ✓ (1×) | 3           | 8         | **Critical** |
| **Button**          | -       | ✓ (2×) | ✓ (1×) | -      | 2           | 3         | **High**     |
| **CTAButton**       | ✓ (3×)  | ✓ (2×) | ✓ (2×) | -      | 3           | 7         | **High**     |
| **ALinkButton**     | ✓ (2×)  | ✓ (1×) | ✓ (1×) | -      | 3           | 4         | **Medium**   |
| **HelpMessage**     | -       | ✓ (2×) | ✓ (5×) | -      | 2           | 7         | **High**     |
| **Footer**          | ✓       | -      | -      | -      | 1           | 1         | **Low**      |
| **ValueCard**       | ✓ (3×)  | -      | -      | -      | 1           | 3         | **Medium**   |
| **ModelCard**       | ✓ (5×)  | -      | -      | -      | 1           | 5         | **Medium**   |
| **Navigation**      | ✓ (4×)  | ✓ (4×) | ✓ (4×) | -      | 3           | 12        | **Critical** |
| **MainNavigation**  | -       | -      | -      | ✓ (4×) | 1           | 4         | **High**     |
| **ChatSidebar**     | -       | -      | -      | ✓      | 1           | 1         | **High**     |
| **ChatHistoryItem** | -       | -      | -      | ✓ (N)  | 1           | N         | **High**     |
| **UserChatBubble**  | -       | -      | -      | ✓ (N)  | 1           | N         | **High**     |
| **AIChatBubble**    | -       | -      | -      | ✓ (N)  | 1           | N         | **High**     |
| **Markdown**        | -       | -      | -      | ✓ (N)  | 1           | N         | **Critical** |
| **Toolbar**         | -       | -      | -      | ✓ (2×) | 1           | 2         | **High**     |
| **ToolbarItem**     | -       | -      | -      | ✓ (6×) | 1           | 6         | **High**     |
| **ZoomSlider**      | -       | -      | -      | ✓      | 1           | 1         | **Medium**   |
| **PartPopup**       | -       | -      | -      | ✓      | 1           | 1         | **Medium**   |
| **BodyBtn**         | -       | -      | -      | ✓      | 1           | 1         | **Medium**   |
| **PartInfoSidebar** | -       | -      | -      | ✓      | 1           | 1         | **Medium**   |
| **AIAssistant**     | -       | -      | -      | ✓      | 1           | 1         | **Medium**   |
| **PartInfo**        | -       | -      | -      | ✓      | 1           | 1         | **Medium**   |

**Sort Order:** By total pages (descending), then by instances

---

## Implementation Priority

### Phase 1: Foundation (Week 1 - Days 1-2)

**Goal:** Core components used across all/most pages. Nothing else can be built without these.

1. **Design Tokens** ← `tailwind.config.ts`
   - Colors (cyan system, neutrals, semantic)
   - Typography (Pretendard, 5 weights)
   - Spacing (4-160px scale)
   - Border radius (8px, 16px, 24px)
   - Shadows (cyan glow)
   - **Dependencies:** None
   - **Blocks:** Everything

2. **Logo** ← IMAGE export (used on 4 pages, 5 instances)
   - Export from Figma: Logo image + Logo text
   - Two sizes: Header (73.6×69.1px) + Footer (36.9×34.7px)
   - **Dependencies:** None
   - **Blocks:** All headers, footer

3. **Label** ← CODE (used on 4 pages, 16 instances)
   - Simple text component with states
   - **Dependencies:** Design tokens
   - **Blocks:** All navigation

4. **Markdown** ← CODE + Library (critical for chat)
   - Install `react-markdown`
   - Custom styling for headings, code blocks, blockquotes
   - **Dependencies:** Design tokens
   - **Blocks:** AIChatBubble, entire chat system

5. **Icon Components** ← SVG exports
   - Landing icons (8): box-3d, chat-dots, chart-line, electricity, rocket, chemistry, chip, settings
   - Viewer icons (13): cube-focus, cube-3d-sphere, camera-lock, search, ai (filled/line), ruler variants, send
   - **Alternative:** Use lucide-react where possible
   - **Dependencies:** None
   - **Blocks:** All cards, toolbars, chat

### Phase 2: Building Blocks (Week 1 - Days 3-5)

**Goal:** Components used on 2+ pages or as foundations for composites.

6. **InputField** ← CODE (auth pages, 8 instances)
   - 6 states: Default, Focus, Fill, Error, Success, Disabled
   - Icon slot (right-side)
   - **Dependencies:** Design tokens, icons
   - **Blocks:** TextField, all forms

7. **HelpMessage** ← CODE (7 instances)
   - 3 states: Default, Success, Error
   - **Dependencies:** Design tokens
   - **Blocks:** TextField

8. **TextField** ← COMPOSITE (8 instances)
   - Combines: Label + InputField + HelpMessage
   - **Dependencies:** Label, InputField, HelpMessage
   - **Blocks:** All forms

9. **Button** ← CODE (3 instances, but base for CTAButton)
   - 2 variants: Fill, Outline
   - 4 states: Default, Hover, Press, Disabled
   - Icon slots (leading/trailing)
   - **Dependencies:** Design tokens
   - **Blocks:** CTAButton, all buttons

10. **CTAButton** ← CODE extends Button (7 instances)
    - Glassmorphic styling
    - Larger size (52px height vs 40px)
    - 4 states with semi-transparent backgrounds
    - **Dependencies:** Button (or standalone)
    - **Blocks:** Landing page, headers

11. **ALinkButton** ← CODE (4 instances)
    - Text-only link
    - **Dependencies:** Design tokens
    - **Blocks:** Footer, auth forms

### Phase 3: Layout Containers (Week 2 - Days 1-2)

**Goal:** Page structure components that contain other components.

12. **AppHeader** ← COMPOSITE (4 pages)
    - 3 variants: Landing, Main, Login
    - **Dependencies:** Logo, Label/Navigation, CTAButton
    - **Blocks:** All pages

13. **Navigation** ← COMPOSITE (Korean labels, 3 pages)
    - **Dependencies:** Label × 4
    - **Blocks:** Landing, auth pages

14. **MainNavigation** ← COMPOSITE (English labels, 1 page)
    - **Dependencies:** Label × 4
    - **Blocks:** Main app

15. **Footer** ← COMPOSITE (1 page)
    - **Dependencies:** Logo, ALinkButton × 2
    - **Blocks:** Landing page only

### Phase 4: Chat System (Week 2 - Days 3-5)

**Goal:** Complete chat interface (core feature of main app).

16. **UserChatBubble** ← CODE
    - Speech bubble with flat bottom-right corner
    - **Dependencies:** Design tokens
    - **Blocks:** Chat interface

17. **AIChatBubble** ← CODE
    - Speech bubble with flat bottom-left corner
    - **Dependencies:** Markdown, design tokens
    - **Blocks:** Chat interface

18. **ChatHistoryItem** ← CODE
    - List item with hover/active states
    - **Dependencies:** Design tokens
    - **Blocks:** ChatSidebar

19. **ChatSidebar** ← COMPOSITE
    - **Dependencies:** ChatHistoryItem, icons, buttons
    - **Blocks:** Main app chat feature

### Phase 5: Viewer UI (Week 3 - Days 1-3)

**Goal:** 3D viewer controls and interactions.

20. **ToolbarItem** ← CODE
    - 3 states: Default, Hover, Press
    - Icon-only button with background changes
    - **Dependencies:** Icons, design tokens
    - **Blocks:** Toolbar

21. **Toolbar** ← COMPOSITE
    - 2 variants: Horizontal (4 tools), Vertical (2 tools)
    - **Dependencies:** ToolbarItem × 6
    - **Blocks:** Main app viewer

22. **ZoomSlider** ← CODE
    - Range slider with custom styling
    - 2 configs: Full (1200px, 10 levels), Compact (960px, 8 levels)
    - **Dependencies:** Design tokens, shadcn Slider
    - **Blocks:** Main app viewer

23. **BodyBtn** ← CODE
    - Compact button with 4 states
    - **Dependencies:** Design tokens
    - **Blocks:** PartPopup

24. **PartPopup** ← COMPOSITE
    - Speech bubble popup with action button
    - **Dependencies:** BodyBtn, design tokens
    - **Blocks:** Main app part interactions

### Phase 6: Landing Page Cards (Week 3 - Days 4-5)

**Goal:** Landing page content cards (not blocking MVP).

25. **ValueCard** ← CODE (3 instances)
    - 4 states: Default, Primary, Hover, Press
    - Large card (567×358px)
    - **Dependencies:** Icons, design tokens
    - **Blocks:** Landing page features section

26. **ModelCard** ← CODE (5 instances)
    - 4 states: Default, Primary, Hover, Press
    - Medium card (327×241px)
    - **Dependencies:** Icons, design tokens
    - **Blocks:** Landing page study model section

### Phase 7: Part Info Panels (Week 4 - Days 1-2)

**Goal:** Contextual information panels for 3D parts.

27. **AIAssistant** ← CODE
    - Info panel with icon header + content box
    - **Dependencies:** Icons, design tokens
    - **Blocks:** PartInfoSidebar

28. **PartInfo** ← CODE (structurally identical to AIAssistant)
    - Info panel with different icon/title
    - **Dependencies:** Icons, design tokens
    - **Blocks:** PartInfoSidebar
    - **Note:** Consider merging with AIAssistant into generic `InfoPanel`

29. **PartInfoSidebar** ← COMPOSITE
    - **Dependencies:** AIAssistant, PartInfo
    - **Blocks:** Main app part info feature

### Phase 8: Polish & Optimization (Week 4 - Days 3-5)

**Goal:** Enhance UX, performance, and accessibility.

30. **Animations & Transitions**
    - Smooth state changes (200ms)
    - Hover effects
    - Panel slide-ins
    - Chat message fade-ins

31. **Loading States**
    - Skeleton screens for cards
    - Spinner for chat responses
    - Progress indicators

32. **Error Boundaries**
    - Component-level error handling
    - Graceful degradation

33. **Accessibility Enhancements**
    - Focus management
    - Keyboard navigation
    - Screen reader testing
    - ARIA attributes

34. **Performance Optimization**
    - Code splitting by route
    - Lazy loading for cards
    - Memo for expensive components
    - Virtual scrolling for chat history

---

## Component Dependencies Graph

```
Design Tokens (tailwind.config.ts)
│
├─ Logo [IMAGE] (standalone)
│  └─ Used by: AppHeader, Footer
│
├─ Label (standalone)
│  └─ Used by: Navigation, MainNavigation, TextField
│
├─ Icon Components [SVG] (standalone)
│  └─ Used by: ValueCard, ModelCard, Toolbar, ChatSidebar, AIAssistant, PartInfo
│
├─ Markdown (standalone, library)
│  └─ Used by: AIChatBubble
│
├─ InputField (standalone)
│  └─ Used by: TextField
│
├─ HelpMessage (standalone)
│  └─ Used by: TextField
│
├─ TextField (composite: Label + InputField + HelpMessage)
│  └─ Used by: Login form, Signup form, Chat input
│
├─ Button (standalone)
│  ├─ Extended by: CTAButton
│  └─ Used by: Auth forms
│
├─ CTAButton (extends Button or standalone)
│  └─ Used by: AppHeader, Landing intro
│
├─ ALinkButton (standalone)
│  └─ Used by: Footer, Auth forms
│
├─ Navigation (composite: Label × 4)
│  └─ Used by: AppHeader (Landing/Auth variants)
│
├─ MainNavigation (composite: Label × 4)
│  └─ Used by: AppHeader (Main variant)
│
├─ AppHeader (composite: Logo + Navigation/MainNavigation + CTAButtons)
│  └─ Used by: All pages
│
├─ Footer (composite: Logo + ALinkButton × 2)
│  └─ Used by: Landing page
│
├─ UserChatBubble (standalone)
│  └─ Used by: Chat interface
│
├─ AIChatBubble (composite: Markdown)
│  └─ Used by: Chat interface
│
├─ ChatHistoryItem (standalone)
│  └─ Used by: ChatSidebar
│
├─ ChatSidebar (composite: ChatHistoryItem × N)
│  └─ Used by: Main app
│
├─ ToolbarItem (standalone)
│  └─ Used by: Toolbar
│
├─ Toolbar (composite: ToolbarItem × 4 or 2)
│  └─ Used by: Main app viewer (2 instances)
│
├─ ZoomSlider (standalone, shadcn Slider)
│  └─ Used by: Main app viewer
│
├─ BodyBtn (standalone)
│  └─ Used by: PartPopup
│
├─ PartPopup (composite: BodyBtn)
│  └─ Used by: Main app part interactions
│
├─ ValueCard (standalone)
│  └─ Used by: Landing features section
│
├─ ModelCard (standalone)
│  └─ Used by: Landing study model section
│
├─ AIAssistant (standalone)
│  └─ Used by: PartInfoSidebar
│
├─ PartInfo (standalone, similar to AIAssistant)
│  └─ Used by: PartInfoSidebar
│
└─ PartInfoSidebar (composite: AIAssistant + PartInfo)
   └─ Used by: Main app
```

### Build Order (Dependencies First)

**Level 0 (No dependencies):**

1. Design Tokens
2. Logo [IMAGE]
3. Icon Components [SVG]
4. Label
5. Markdown
6. InputField
7. HelpMessage
8. Button
9. ALinkButton
10. UserChatBubble
11. ChatHistoryItem
12. ToolbarItem
13. ZoomSlider
14. BodyBtn
15. ValueCard
16. ModelCard
17. AIAssistant
18. PartInfo

**Level 1 (Depends on Level 0):** 19. TextField (Label + InputField + HelpMessage) 20. CTAButton (Button or standalone) 21. Navigation (Label × 4) 22. MainNavigation (Label × 4) 23. AIChatBubble (Markdown) 24. Toolbar (ToolbarItem) 25. PartPopup (BodyBtn)

**Level 2 (Depends on Level 1):** 26. AppHeader (Logo + Navigation/MainNavigation + CTAButton) 27. Footer (Logo + ALinkButton) 28. ChatSidebar (ChatHistoryItem) 29. PartInfoSidebar (AIAssistant + PartInfo)

**Level 3 (Page assembly):** 30. Landing Page (AppHeader + Cards + Footer) 31. Login Page (AppHeader + TextFields + Buttons) 32. Signup Page (AppHeader + TextFields + Buttons) 33. Main App Page (AppHeader + ChatSidebar + Toolbar + Viewer + PartInfoSidebar)

---

## Missing Components Analysis

### Identified in Phase 1 but Not in Phase 2

1. **MainVisual** (Landing Intro section)
   - **Type:** [IMAGE] or [VIDEO]
   - **Size:** 970×477px
   - **Current State:** Placeholder crossed box in Figma
   - **Action:** Export from Figma or create 3D preview render
   - **Priority:** Medium (Landing page visual polish)

2. **Legal Links Container** (Footer)
   - **Type:** [CODE]
   - **Components:** Uses existing ALinkButton × 2
   - **Action:** Simple flex container, no new component needed
   - **Priority:** Low (trivial implementation)

3. **Auth Form Container**
   - **Type:** [CODE]
   - **Current State:** Not in Figma as separate component
   - **Action:** Create `AuthFormLayout` wrapper component
   - **Structure:**
     ```tsx
     <AuthFormLayout title="로그인">{children}</AuthFormLayout>
     ```
   - **Styling:** Centered container (311px max-width), dark bg, rounded corners
   - **Priority:** Low (simple wrapper)

4. **Three.js Canvas Wrapper**
   - **Type:** [CODE] - Not a Figma component
   - **Action:** Create R3F Canvas component
   - **Dependencies:** Three.js, React Three Fiber, Drei
   - **Priority:** High (core viewer functionality)

5. **Background Decorations**
   - **Type:** [IMAGE] or [CSS]
   - **Current State:** Not visible in designs
   - **Action:** Check if Figma has hidden layers or use CSS gradients
   - **Priority:** Low (visual polish)

6. **Chat Input Area** (Main app)
   - **Type:** [CODE] - Composite
   - **Components:** TextField + Send button
   - **Current State:** Referenced but not detailed in Phase 2
   - **Action:** Implement using existing TextField + Button/Icon
   - **Priority:** High (chat functionality)

7. **Send Button/Icon** (Chat input)
   - **Type:** [SVG] Icon
   - **Icon:** iconamoon:send-light (already identified in Phase 2)
   - **Action:** Use from Icon (147:517) set
   - **Priority:** High (chat functionality)

### Action Items

- [ ] **Export MainVisual** from Figma (Landing Intro)
  - Check with designer: Static image or animated 3D preview?
  - Export at 2x resolution for Retina displays
  - Format: PNG with transparency or MP4 loop

- [ ] **Create AuthFormLayout** component
  - Wrapper for login/signup forms
  - Minimal logic, mostly styling

- [ ] **Implement Three.js Canvas**
  - R3F Canvas component with basic scene
  - Camera controls (OrbitControls)
  - Lighting setup
  - GLTF model loader

- [ ] **Chat Input Composite**
  - TextField + Send button layout
  - Enter key handling
  - Auto-resize textarea (optional)

- [ ] **Verify all icons exported**
  - Landing icons (8) ✓ documented
  - Viewer icons (13) ✓ documented
  - Check if missing any UI icons (hamburger, eye, etc.)

---

## File Structure Recommendations

Based on component relationships and pages:

```
src/
├── components/
│   ├── ui/                      # shadcn/ui + basic components
│   │   ├── button.tsx           # Button (shadcn base)
│   │   ├── input.tsx            # InputField (shadcn base)
│   │   ├── label.tsx            # Label (shadcn base)
│   │   ├── slider.tsx           # Slider (shadcn, for ZoomSlider)
│   │   ├── sheet.tsx            # Sheet (shadcn, for sidebars)
│   │   ├── popover.tsx          # Popover (shadcn, for PartPopup)
│   │   ├── cta-button.tsx       # CTAButton (custom variant)
│   │   ├── link-button.tsx      # ALinkButton (text link)
│   │   ├── nav-label.tsx        # Label variant for navigation
│   │   ├── help-message.tsx     # HelpMessage (form validation)
│   │   ├── text-field.tsx       # TextField (composite)
│   │   └── body-button.tsx      # BodyBtn (compact button)
│   │
│   ├── layout/                  # Layout components
│   │   ├── app-header.tsx       # Header with 3 variants (landing/auth/main)
│   │   ├── navigation.tsx       # Korean nav labels
│   │   ├── main-navigation.tsx  # English nav labels
│   │   ├── footer.tsx           # Footer
│   │   ├── auth-layout.tsx      # Auth form wrapper
│   │   ├── toolbar.tsx          # Viewer toolbar (horizontal/vertical)
│   │   ├── toolbar-item.tsx     # Toolbar icon button
│   │   └── zoom-slider.tsx      # Zoom control slider
│   │
│   ├── domain/                  # Domain-specific components
│   │   ├── cards/
│   │   │   ├── value-card.tsx   # Feature value prop cards
│   │   │   └── model-card.tsx   # 3D model category cards
│   │   │
│   │   ├── chat/
│   │   │   ├── chat-sidebar.tsx        # Full sidebar container
│   │   │   ├── chat-bubble.tsx         # User + AI bubble variants
│   │   │   ├── chat-history-item.tsx   # History list item
│   │   │   ├── chat-input.tsx          # Input + send button
│   │   │   └── markdown-renderer.tsx   # Rich text renderer
│   │   │
│   │   └── parts/
│   │       ├── info-panel.tsx          # Generic panel (PartInfo + AIAssistant)
│   │       ├── part-info-sidebar.tsx   # Sidebar container
│   │       └── part-popup.tsx          # Hint popup
│   │
│   ├── viewer/                  # Three.js specific (R3F)
│   │   ├── canvas.tsx           # Main R3F Canvas
│   │   ├── scene.tsx            # 3D Scene setup
│   │   ├── camera.tsx           # Camera + controls
│   │   ├── lights.tsx           # Lighting setup
│   │   ├── model-loader.tsx     # GLTF loader
│   │   └── part-mesh.tsx        # Interactive part mesh
│   │
│   └── common/                  # Shared assets
│       ├── logo.tsx             # Logo component
│       └── icons/               # Custom SVG icons
│           ├── viewer-icons.tsx # 3D viewer icons (13)
│           └── landing-icons.tsx # Landing page icons (8)
│
├── app/                         # Next.js pages (App Router)
│   ├── page.tsx                 # Landing page (/)
│   ├── login/
│   │   └── page.tsx             # Login (/login)
│   ├── signup/
│   │   └── page.tsx             # Signup (/signup)
│   └── viewer/
│       └── page.tsx             # Main app (/viewer)
│
├── lib/
│   ├── three/                   # Three.js utilities
│   │   ├── scene-setup.ts       # Scene initialization
│   │   ├── part-picker.ts       # Raycasting for part selection
│   │   └── measurements.ts      # Measurement tools
│   │
│   └── utils/
│       ├── cn.ts                # Class name utility
│       └── validation.ts        # Form validation helpers
│
├── stores/                      # Zustand stores
│   ├── scene-store.ts           # 3D scene state
│   ├── ui-store.ts              # UI state (sidebars, modals)
│   ├── chat-store.ts            # Chat messages & history
│   └── auth-store.ts            # Auth state
│
├── hooks/
│   ├── use-three/               # Three.js hooks
│   │   ├── use-part-selection.ts
│   │   └── use-camera-controls.ts
│   │
│   └── use-ui/                  # UI hooks
│       ├── use-chat.ts
│       └── use-sidebar.ts
│
└── types/                       # TypeScript types
    ├── components.ts            # Component prop types
    ├── three.ts                 # 3D types
    ├── chat.ts                  # Chat types
    └── api.ts                   # API types
```

### Component Organization Rationale

**ui/** - Basic building blocks (buttons, inputs, labels)

- Reusable across entire app
- No domain logic
- Mostly shadcn/ui with custom variants

**layout/** - Structural components (headers, toolbars, wrappers)

- Define page structure
- Compose ui/ components
- Minimal business logic

**domain/** - Feature-specific components (cards, chat, parts)

- Contain domain knowledge
- Compose ui/ and layout/ components
- Business logic and state

**viewer/** - Three.js/R3F specific

- Isolated from other components
- Heavy dependencies (Three.js)
- Performance-critical

**common/** - Brand assets (logo, icons)

- Static resources
- No dependencies

---

## Testing Strategy by Reusability

### Critical (4 pages) - Must have comprehensive tests

**Components:** Logo, Label, AppHeader

**Test Coverage:**

- Unit tests for all variants
- Integration tests with parent components
- Visual regression tests (Storybook Chromatic)
- Accessibility tests (jest-axe)

**Test Cases (AppHeader example):**

- [ ] Renders all 3 variants correctly
- [ ] Navigation links work
- [ ] Logo links to home
- [ ] CTA buttons trigger actions
- [ ] Responsive behavior (mobile hamburger)
- [ ] Keyboard navigation
- [ ] Screen reader announcements

### High (2-3 pages) - Should have good test coverage

**Components:** InputField, TextField, Button, CTAButton, Navigation, MainNavigation, ChatSidebar, Markdown

**Test Coverage:**

- Unit tests for states and variants
- Integration tests with forms
- Accessibility tests
- User interaction tests (click, type, submit)

**Test Cases (TextField example):**

- [ ] Renders label, input, help message
- [ ] Shows validation errors
- [ ] Handles user input
- [ ] Supports controlled/uncontrolled modes
- [ ] Keyboard navigation (Tab, Enter)
- [ ] Screen reader labels

### Medium (1 page, multiple instances) - Unit tests

**Components:** ValueCard, ModelCard, ChatBubbles, Toolbar, ToolbarItem

**Test Coverage:**

- Unit tests for rendering
- State tests (hover, press)
- Snapshot tests

**Test Cases (ValueCard example):**

- [ ] Renders all 4 states
- [ ] Icon displays correctly
- [ ] Text wraps properly
- [ ] Click handler fires
- [ ] Hover state transitions

### Low (1 page, single instance) - Smoke tests

**Components:** Footer, ZoomSlider, PartPopup, PartInfoSidebar

**Test Coverage:**

- Smoke tests (renders without crashing)
- Basic interaction tests

**Test Cases (Footer example):**

- [ ] Renders without errors
- [ ] Links are clickable
- [ ] Logo appears

---

## Next Steps

### Phase 3 Design System (Unified Tokens)

**Action:** Let Design System agent extract unified design tokens from all Phase 1 & 2 documents.

**Expected Output:**

- Complete color palette with HSL values
- Typography scale with all variants
- Spacing system (4-160px)
- Border radius system
- Shadow definitions
- Animation/transition timings

**File:** `docs/phase3-design-system.md`

### Phase 4 Implementation Plan

**Action:** Create detailed coding plan based on this matching document.

**Expected Output:**

- Week-by-week implementation schedule
- Component implementation order with justifications
- Storybook story requirements
- Test coverage goals
- API integration points

**File:** `docs/phase4-implementation-plan.md`

### Asset Export Checklist

**Images:**

- [ ] Logo image (header size: 73.6×69.1px) - SVG
- [ ] Logo text (header size: 234×40px) - SVG
- [ ] Logo image (footer size: 36.9×34.7px) - SVG
- [ ] Logo text (footer size: proportional) - SVG
- [ ] MainVisual (970×477px) - PNG/MP4

**Icons - Landing (8):**

- [ ] garden:box-3d-stroke-16 (3D box)
- [ ] bi:chat-dots (Chat)
- [ ] cil:chart-line (Chart)
- [ ] mage:electricity (Electricity)
- [ ] streamline-ultimate:space-rocket-earth (Rocket)
- [ ] lets-icons:chemistry-light (Chemistry)
- [ ] iconoir:electronics-chip (Chip)
- [ ] solar:settings-linear (Settings)

**Icons - Viewer (13):**

- [ ] ph:cube-focus-light (Cube focus)
- [ ] tabler:cube-3d-sphere (3D sphere)
- [ ] mdi:camera-lock-outline (Camera lock)
- [ ] fluent:tag-search-24-filled (Search filled)
- [ ] mingcute:ai-fill (AI filled)
- [ ] mingcute:ai-line (AI outline)
- [ ] fluent:tag-search-20-regular (Search 20)
- [ ] fluent:tag-search-24-regular (Search 24)
- [ ] radix-icons:ruler-square (Ruler square)
- [ ] wpf:ruler (Ruler)
- [ ] clarity:ruler-pencil-line (Ruler pencil outline)
- [ ] clarity:ruler-pencil-solid (Ruler pencil filled)
- [ ] iconamoon:send-light (Send)

**Icons - UI (3):**

- [ ] Hamburger menu (40×40px)
- [ ] Eye icon (password visibility toggle)
- [ ] Part info custom icon (37×38px)

**Export Strategy:**

1. Check lucide-react for equivalent icons first
2. Use @iconify/react for exact name matches (fluent, mingcute, etc.)
3. Export custom SVGs from Figma only if no library match

### API Design Considerations

**Endpoints Needed:**

**Auth:**

- `POST /api/auth/login` - Login user
- `POST /api/auth/signup` - Register user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user

**Chat:**

- `POST /api/chat` - Send message, get AI response
- `GET /api/conversations` - List conversation history
- `GET /api/conversations/:id` - Get specific conversation
- `POST /api/conversations` - Create new conversation
- `DELETE /api/conversations/:id` - Delete conversation

**3D Models:**

- `GET /api/models` - List available models
- `GET /api/models/:id` - Get model metadata
- `GET /api/models/:id/file` - Download model file (.glb)

**Parts:**

- `GET /api/parts/:id` - Get part information
- `GET /api/parts/:id/hints` - Get disassembly hints

**Data Formats:**

```typescript
// ChatMessage
{
  id: string;
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

// Part3D
{
  id: string;
  name: string;
  type: string;
  description: string;
  measurements: {
    volume: number;
    surfaceArea: number;
    mass: number;
  }
}

// Model3D
{
  id: string;
  title: string;
  category: string;
  fileUrl: string;
  thumbnail: string;
}
```

---

## Conclusion

This Phase 3 document provides comprehensive mapping between pages and components, with:

✅ **4 pages fully mapped** with dependency trees
✅ **30+ components identified** and categorized
✅ **Reusability matrix** showing usage across pages
✅ **Implementation priority** in 8 phases over 4 weeks
✅ **Dependency graph** showing build order
✅ **Missing components** identified with action items
✅ **File structure** recommendations
✅ **Testing strategy** by component importance
✅ **Asset export checklist** with 24+ items

**Key Findings:**

1. **High Reuse Components (4 pages):** Logo, Label, AppHeader
   - These are **critical path** items - block everything

2. **Multi-Page Components (2-3 pages):** InputField, TextField, Button, CTAButton
   - **High priority** - used across auth and landing

3. **Single-Page Components:** Chat system, Viewer controls, Cards
   - Can be built in **parallel** after foundations

4. **Missing Pieces:** MainVisual image, AuthFormLayout wrapper, Chat input area
   - All **low complexity**, quick to implement

5. **Dependency Depth:** Maximum 3 levels (Design Tokens → Components → Composites → Pages)
   - **Clear build path** from bottom to top

**Implementation Path:**

1. Week 1: Foundation + Building Blocks (12 components)
2. Week 2: Layout + Chat System (7 components)
3. Week 3: Viewer UI + Cards (7 components)
4. Week 4: Part Info + Polish (4+ components)

**Total Time Estimate:** 4 weeks for full implementation

**Ready for:** Phase 4 detailed implementation planning and development kickoff.
