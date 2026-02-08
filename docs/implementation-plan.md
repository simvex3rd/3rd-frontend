# SIMVEX Frontend Implementation Plan

**Project:** SIMVEX - 3D Simulation Platform Frontend
**Timeline:** 4 weeks (20 working days)
**Team:** 2 developers (parallelizable tasks marked)
**Tech Stack:** Next.js 16, React 19, TypeScript 5.9, Tailwind CSS v4, Three.js, Zustand

---

## Executive Summary

### Project Scope

**Pages:** 4 (Landing, Login, Signup, Main Application)
**Components:** 30+ unique components
**Design System:** 47 color tokens, 8 typography sizes, 14 spacing values
**Timeline:** 4 weeks with daily deployments

### Key Findings from Analysis

1. **High Design Consistency** (4/5 stars) - Well-structured design system with minimal inconsistencies
2. **Component Reusability** - Logo, Label, AppHeader used across all 4 pages (critical path items)
3. **Clear Dependencies** - Maximum 3 dependency levels (Tokens → Components → Composites → Pages)
4. **5 Accessibility Issues** identified with specific fixes provided
5. **No missing components** - All designs complete and ready for implementation

### Critical Risks and Dependencies

**Risk 1: Primary Button Contrast Failure**

- Impact: High (accessibility violation)
- Probability: High (design issue)
- Mitigation: Use dark text (#171717) instead of white on cyan buttons → 8.1:1 ✅
- Timeline: Fix in Week 1, Day 1 (design token setup)

**Risk 2: Three.js Integration Complexity**

- Impact: Medium (viewer functionality)
- Probability: Medium (library compatibility)
- Mitigation: Start with simple R3F canvas in Week 3, defer advanced features
- Contingency: Use static 3D screenshots if integration fails

**Risk 3: Chat System Real-time Updates**

- Impact: Medium (user experience)
- Probability: Low (well-understood technology)
- Mitigation: Use server-sent events or WebSocket, have polling fallback
- Contingency: Simple request-response without streaming

**Risk 4: Timeline Pressure (10 days original)**

- Impact: High (scope vs time)
- Probability: High (aggressive timeline)
- Mitigation: 4-week realistic plan with MVP/enhancement split
- Contingency: Defer landing page polish, viewer advanced features

### Success Criteria

**Functional:**

- ✅ All 4 pages fully functional and navigable
- ✅ Authentication flow (signup → login → main app)
- ✅ Chat system (send message → AI response → save history)
- ✅ 3D viewer (load model → interact → select parts)
- ✅ Responsive on mobile (375px), tablet (768px), desktop (1920px)

**Quality:**

- ✅ 80%+ test coverage (unit + integration + E2E)
- ✅ WCAG 2.1 AA compliant (zero critical violations)
- ✅ Lighthouse score >90 (performance, accessibility, best practices)
- ✅ Build time <30s
- ✅ First Contentful Paint <1.5s

**Technical:**

- ✅ TypeScript strict mode (zero `any` types except unavoidable)
- ✅ Zero ESLint errors, zero build warnings
- ✅ All components in Storybook with stories
- ✅ API endpoints documented and tested

---

## Implementation Phases with Agent Teams

### Week 1: Foundation (Days 1-5)

#### Day 1-2: Design System Setup

**Agent Team:** 2 agents in parallel

**Agent A: Tooling & Configuration**

- Set up Next.js 16 project (if not initialized)
- Configure TypeScript strict mode
- Install dependencies:
  - React 19, Next.js 16
  - Tailwind CSS v4
  - shadcn/ui (Button, Input, Label, Slider, Sheet, Popover)
  - Three.js, React Three Fiber, Drei
  - Zustand (state management)
  - react-markdown, remark-gfm (Markdown rendering)
- Configure ESLint, Prettier, Husky pre-commit hooks
- Set up Storybook 10

**Agent B: Design Tokens**

- Extract design tokens from `phase3-design-system.md`
- Create `tailwind.config.ts` with:
  - 47 color tokens (primary cyan system, neutrals, semantic)
  - 8 typography sizes (12px-96px scale)
  - 14 spacing values (0-160px)
  - 4 border radius values (8, 16, 24, full)
  - 4 shadow definitions (card-glow, slider-thumb, etc.)
  - 4 border widths (1, 2, 3, 5px)
- Create `src/app/globals.css` with CSS variables for shadcn/ui
- Apply accessibility fixes:
  - Fix button contrast: Use `#171717` text on `#02eee1` background
  - Fix NavLabel contrast: Darken primary to `#01c4b8` or add underline
  - Fix error message contrast: Lighten to `#ff4d54`
- Test all tokens in Storybook design system page

**Dependencies:** None
**Deliverables:**

- `tailwind.config.ts` (complete with all custom tokens)
- `src/app/globals.css` (shadcn/ui CSS variables)
- `package.json` (all dependencies installed)
- `.eslintrc.json`, `.prettierrc` (linting configured)
- `.storybook/` (Storybook configured)
- Storybook design tokens documentation page

**Quality Gate:**

- [ ] All custom Tailwind classes generate correctly
- [ ] Storybook loads without errors
- [ ] Design token page displays all colors, typography, spacing
- [ ] Accessibility fixes verified (contrast ratios meet WCAG AA)

---

#### Day 3: Asset Export & Core Components Part 1

**Agent Team:** 3 agents in parallel

**Agent A: Asset Export**

- Export all assets from Figma using node IDs from `phase3-matching.md`:
  - Logo (header: 73.6×69.1px, footer: 36.9×34.7px) - SVG + PNG fallback
  - MainVisual hero image (970×477px) - WebP + PNG fallback
  - Landing icons (8 icons) - SVG
  - Viewer icons (13 icons) - SVG
  - UI icons (3 icons: hamburger, eye, part info) - SVG
- Optimize assets:
  - Run SVGO on all SVGs
  - Compress PNGs with TinyPNG
  - Convert hero to WebP
- Create asset manifest JSON with alt texts
- Save to `/public/` structure:
  - `/public/logo/`
  - `/public/icons/landing/`
  - `/public/icons/viewer/`
  - `/public/icons/ui/`
  - `/public/images/hero/`

**Agent B: Logo Component**

- Read `phase2-ui-basic.md` Logo section
- Create `src/components/common/logo.tsx`
- Two size variants (header, footer)
- Linkable wrapper with `<Link>` from Next.js
- Focus states for accessibility
- Create Storybook story with both sizes
- Write unit tests (render, link click)

**Agent C: Label Component**

- Read `phase2-ui-basic.md` Label section
- Create `src/components/ui/nav-label.tsx` (rename from "Label" for clarity)
- Support Default/Press states (inactive/active)
- Typography: Pretendard Bold, 40px
- Create Storybook story with all states
- Write unit tests (render, state changes)

**Dependencies:** Day 1-2 (design tokens)
**Deliverables:**

- All assets in `/public/` (24+ files)
- Asset manifest JSON
- `src/components/common/logo.tsx` + `.stories.tsx` + `.test.tsx`
- `src/components/ui/nav-label.tsx` + `.stories.tsx` + `.test.tsx`

**Quality Gate:**

- [ ] All assets exported and optimized (<500KB total)
- [ ] Logo renders in both sizes
- [ ] Label shows active state correctly
- [ ] Storybook stories work
- [ ] Unit tests pass

---

#### Day 4: Core UI Components Part 2

**Agent Team:** 3 agents in parallel

**Agent A: Button Component**

- Read `phase2-ui-basic.md` Button section
- Install shadcn Button: `npx shadcn@latest add button`
- Customize with variants:
  - `primary`: filled cyan background (with dark text fix)
  - `primary-outline`: 2px cyan border, transparent bg
  - Keep existing shadcn variants (default, destructive, ghost, link)
- Add icon slots (leading/trailing)
- 4 states: Default, Hover, Press, Disabled
- Create Storybook stories (all variants + states)
- Write unit tests (click, disabled, icons)

**Agent B: InputField Component**

- Read `phase2-ui-basic.md` InputField section
- Install shadcn Input: `npx shadcn@latest add input`
- Extend with validation states:
  - Default (gray border)
  - Focus (blue border #2b7fff)
  - Fill (light gray border, text appears)
  - Error (red border #fb2c36)
  - Success (green border #00c950)
  - Disabled (gray bg #f5f5f5)
- Add icon slot (right side) for search/eye icons
- Create Storybook stories (all 6 states)
- Write unit tests (typing, validation, focus)

**Agent C: HelpMessage Component**

- Read `phase2-ui-basic.md` HelpMessage section
- Create `src/components/ui/help-message.tsx`
- 3 text color states:
  - Default: `#d4d4d4` (neutral)
  - Success: `#00c950` (green)
  - Error: `#ff4d54` (red, fixed for contrast)
- Typography: 12px Regular
- Add `role="alert"` for errors
- Add `aria-live="polite"` for dynamic updates
- Create Storybook stories
- Write unit tests

**Dependencies:** Day 1-2 (design tokens), Day 3 (icons for InputField)
**Deliverables:**

- `src/components/ui/button.tsx` (customized shadcn)
- `src/components/ui/input.tsx` (customized shadcn)
- `src/components/ui/help-message.tsx`
- Storybook stories for all 3
- Unit tests (80%+ coverage target)

**Quality Gate:**

- [ ] Button primary variant uses dark text (accessibility fix applied)
- [ ] InputField shows all 6 states correctly
- [ ] HelpMessage announces errors to screen readers
- [ ] All tests pass

---

#### Day 5: Composite Components

**Agent Team:** 3 agents in parallel

**Agent A: TextField Component**

- Read `phase2-ui-basic.md` TextField section
- Install shadcn Label: `npx shadcn@latest add label`
- Create `src/components/ui/text-field.tsx` (composite)
- Structure: Label + InputField + HelpMessage
- Gap: 2px between elements (gap-0.5)
- Props for optional label/help text
- Integrate with React Hook Form
- Create Storybook stories (complete examples)
- Write integration tests (form validation flow)

**Agent B: CTAButton Component**

- Read `phase2-ui-basic.md` CTAButton section
- Create `src/components/ui/cta-button.tsx`
- Glassmorphic styling:
  - 4 background states (white/30, primary/30, hover/30, press/30)
  - 5px border with primary/20
  - Cyan glow shadow
  - 24px border radius
  - 32px text size
- Typography: Pretendard SemiBold, 32px
- Create Storybook stories (all 4 states)
- Write unit tests

**Agent C: ALinkButton Component**

- Read `phase2-ui-basic.md` ALinkButton section
- Create `src/components/ui/link-button.tsx` (rename from ALinkButton)
- Text-only link with hover underline
- Typography: Pretendard Regular, 16px
- Colors: Default #e5e5e5, Hover #02eee1
- Create Storybook story
- Write unit tests

**Dependencies:** Day 4 (Button, InputField, HelpMessage)
**Deliverables:**

- `src/components/ui/text-field.tsx` + stories + tests
- `src/components/ui/cta-button.tsx` + stories + tests
- `src/components/ui/link-button.tsx` + stories + tests

**Quality Gate:**

- [ ] TextField composition works with React Hook Form
- [ ] CTAButton glassmorphic effect renders correctly
- [ ] All components accessible via keyboard
- [ ] 80%+ test coverage on Week 1 components

---

### Week 2: Building Blocks & Auth Pages (Days 6-10)

#### Day 6: Layout Components Part 1

**Agent Team:** 2 agents in parallel

**Agent A: Navigation Components**

- Read `phase2-layout.md` Navigation sections
- Create `src/components/layout/navigation.tsx` (Korean labels: 소개, 기능, 학습 모델, 문의)
- Create `src/components/layout/main-navigation.tsx` (English labels: HOME, STUDY, CAD, LAB)
- Reuses NavLabel component × 4
- Gap: 80px between labels
- Create Storybook stories
- Write unit tests

**Agent B: AppHeader Component**

- Read `phase2-layout.md` LoginHeader section (rename to AppHeader)
- Create `src/components/layout/app-header.tsx`
- 3 variants controlled by `variant` prop:
  - `landing`: Logo + Korean nav + "로그인/가입" + "시작하기"
  - `main`: Logo + English nav (no buttons)
  - `login`: Logo + Korean nav + "jun1 님" + "시작하기"
- Padding: 80px horizontal, 32px vertical
- Responsive: Hamburger menu on mobile (not designed, simple implementation)
- Create Storybook stories (all 3 variants)
- Write unit tests

**Dependencies:** Week 1 (Logo, NavLabel, CTAButton)
**Deliverables:**

- `src/components/layout/navigation.tsx` + stories + tests
- `src/components/layout/main-navigation.tsx` + stories + tests
- `src/components/layout/app-header.tsx` + stories + tests

**Quality Gate:**

- [ ] AppHeader switches variants correctly
- [ ] Navigation labels link to correct sections/routes
- [ ] Responsive hamburger menu works on mobile

---

#### Day 7: Layout Components Part 2 & Footer

**Agent Team:** 2 agents in parallel

**Agent A: Footer Component**

- Read `phase2-layout.md` Footer section
- Create `src/components/layout/footer.tsx`
- Structure: Two-column (Logo + copyright | Legal links)
- Logo smaller size (36.9×34.7px)
- Legal links: "Privacy Policy", "Terms of Service"
- Typography: 16px Regular (copyright), 32px SemiBold (links)
- Create Storybook story
- Write unit tests

**Agent B: AuthFormLayout Component**

- Not in Figma, but needed for consistency
- Create `src/components/layout/auth-layout.tsx`
- Centered container (311px max-width)
- Dark background, rounded corners (24px)
- Padding: 32px horizontal, 80px vertical
- Title prop (h1, 24px SemiBold)
- Accepts children (form content)
- Create Storybook story with example form

**Dependencies:** Week 1 (Logo, LinkButton)
**Deliverables:**

- `src/components/layout/footer.tsx` + story + tests
- `src/components/layout/auth-layout.tsx` + story

---

#### Day 8: Auth Pages - Login

**Agent Team:** 1 agent (page assembly)

**Tasks:**

- Read `phase1-auth.md` Login section
- Read `phase3-matching.md` Login page tree
- Create `src/app/login/page.tsx`
- Structure:
  - AppHeader (variant="login")
  - AuthFormLayout (title="로그인")
    - TextField (Email)
    - TextField (Password with eye icon toggle)
    - LinkButton (right-aligned) "아이디/비밀번호 찾기"
    - Button (primary) "로그인"
    - Button (outline) "계정 만들기"
- Form validation with React Hook Form + Zod
- API integration (mock for now): `POST /api/auth/login`
- Success: Redirect to `/viewer`
- Error: Show error message below form
- Create E2E test (Playwright)

**Dependencies:** Week 2 Days 6-7 (AppHeader, AuthFormLayout, TextField, Button)
**Deliverables:**

- `src/app/login/page.tsx` (complete page)
- `src/lib/auth.ts` (auth utilities)
- Zod validation schemas
- E2E test

**Quality Gate:**

- [ ] Form validation works (email format, required fields)
- [ ] Submit triggers API call
- [ ] Error states display correctly
- [ ] Redirect to /viewer on success

---

#### Day 9: Auth Pages - Signup

**Agent Team:** 1 agent (page assembly)

**Tasks:**

- Read `phase1-auth.md` Signup section
- Create `src/app/signup/page.tsx`
- Structure:
  - AppHeader (variant="login")
  - AuthFormLayout (title="계정 만들기")
    - Pre-form text + link "이전에 생성한 계정이 있으신가요? 로그인"
    - Horizontal row: TextField (First Name) + TextField (Last Name)
    - TextField (Email)
    - TextField (Password with validation rules help text)
    - TextField (Password Confirm with match validation)
    - Button (primary) "계정 만들기"
- Form validation:
  - Name: Required, Korean/English characters
  - Email: Required, valid format, unique (backend check)
  - Password: 8-16 chars, uppercase, lowercase, number, special char
  - Confirm: Must match password
- API integration (mock): `POST /api/auth/signup`
- Success: Auto-login or redirect to login
- Create E2E test

**Dependencies:** Week 2 Day 8 (auth utilities)
**Deliverables:**

- `src/app/signup/page.tsx` (complete page)
- Enhanced validation schemas
- E2E test

**Quality Gate:**

- [ ] All 5 fields validate correctly
- [ ] Password rules enforced
- [ ] Password match validation works
- [ ] E2E test passes

---

#### Day 10: Markdown Renderer

**Agent Team:** 1 agent

**Tasks:**

- Read `phase2-domain.md` Markdown section
- Install dependencies:
  - `react-markdown`
  - `remark-gfm` (GitHub Flavored Markdown)
  - Optional: `react-syntax-highlighter` (code blocks)
- Create `src/components/domain/chat/markdown-renderer.tsx`
- Custom component overrides:
  - `h1`, `h2`: White text, bold (16px)
  - `p`: Tertiary gray text (14px)
  - `code` (inline): Cyan text
  - `pre > code`: Dark teal background, cyan border, centered
  - `blockquote`: Cyan text (14px)
  - `ul`, `ol`: Tertiary gray, proper indentation
- Apply styling from `phase2-domain.md` Markdown section
- Sanitize HTML (disable raw HTML in markdown)
- Create Storybook stories (various markdown examples)
- Write unit tests (renders headings, code, blockquotes)

**Dependencies:** Week 1 (design tokens)
**Deliverables:**

- `src/components/domain/chat/markdown-renderer.tsx`
- Storybook stories with examples
- Unit tests (80%+ coverage)

**Quality Gate:**

- [ ] All markdown elements render correctly
- [ ] Code blocks have proper styling
- [ ] Blockquotes use cyan color
- [ ] No XSS vulnerabilities (HTML disabled)

**Week 2 Quality Gate:**

- ✅ Auth pages fully functional (login, signup)
- ✅ Form validation working end-to-end
- ✅ Layout components complete (header, footer)
- ✅ Markdown renderer ready for chat system
- ✅ 75%+ overall test coverage

---

### Week 3: Features & Viewer UI (Days 11-15)

#### Day 11-12: Chat System Components

**Agent Team:** 3 agents in parallel (Day 11), 2 agents (Day 12)

**Day 11, Agent A: Chat Bubbles**

- Read `phase2-domain.md` UserChat, AIChat sections
- Create `src/components/domain/chat/user-chat-bubble.tsx`
  - Background: `rgba(2,238,225,0.3)` (cyan)
  - Border radius: 16px (flat bottom-right corner)
  - Max width: 365px
  - Typography: 16px Regular
- Create `src/components/domain/chat/ai-chat-bubble.tsx`
  - Background: `rgba(1,169,160,0.3)` (teal)
  - Border radius: 16px (flat bottom-left corner)
  - Integrates MarkdownRenderer for content
  - Max width: 365px
- Create Storybook stories
- Write unit tests

**Day 11, Agent B: Chat History & State**

- Read `phase2-domain.md` HistoryChat section
- Create `src/components/domain/chat/chat-history-item.tsx`
  - Size: 76×21px (flexible width in implementation)
  - Typography: 14px Medium
  - States: Default (gray), Hover (lighter), Active (cyan)
- Create `src/stores/chat-store.ts` (Zustand)
  - State: messages, conversations, activeConversationId, isAITyping
  - Actions: sendMessage, loadHistory, selectConversation, newChat
- Create TypeScript types in `src/types/chat.ts`
- Write unit tests for store

**Day 11, Agent C: Chat Input**

- Create `src/components/domain/chat/chat-input.tsx`
- Structure: TextField + Send button (iconamoon:send-light icon)
- Layout: Horizontal with gap
- Enter key sends message
- Shift+Enter for new line
- Disable during AI response
- Create Storybook story
- Write unit tests

**Day 12, Agent A: ChatSidebar Assembly**

- Read `phase2-domain.md` ChatSide section
- Create `src/components/domain/chat/chat-sidebar.tsx`
- Structure:
  - Hamburger menu button (toggle)
  - New Chat button (icon + text)
  - History section (label + scrollable list of ChatHistoryItem)
  - Active conversation area (messages + input)
- Width: 311px, Height: 100% viewport
- Background: #404040
- Padding: 24px
- Gap: 160px (consider reducing to 48px as noted in analysis)
- Scrollable history list
- Create Storybook story
- Write integration tests

**Day 12, Agent B: Chat API Integration**

- Create `src/app/api/chat/route.ts` (Next.js route handler)
- Mock AI response for now (replace with OpenAI/Anthropic later)
- Implement endpoints:
  - `POST /api/chat` - Send message, get AI response
  - Streaming response with Server-Sent Events
- Create `src/app/api/conversations/route.ts`
  - `GET /api/conversations` - List history
  - `POST /api/conversations` - Create new conversation
- Create `src/app/api/conversations/[id]/route.ts`
  - `GET /api/conversations/[id]` - Load specific conversation
- Test API endpoints with Postman/REST client

**Dependencies:** Week 2 Day 10 (Markdown), Week 1 (UI components)
**Deliverables:**

- `src/components/domain/chat/user-chat-bubble.tsx` + tests
- `src/components/domain/chat/ai-chat-bubble.tsx` + tests
- `src/components/domain/chat/chat-history-item.tsx` + tests
- `src/components/domain/chat/chat-input.tsx` + tests
- `src/components/domain/chat/chat-sidebar.tsx` + tests
- `src/stores/chat-store.ts` + tests
- `src/types/chat.ts`
- API route handlers
- Storybook stories for all components

**Quality Gate:**

- [ ] Chat bubbles display correctly (different corners)
- [ ] Markdown renders in AI messages
- [ ] History list scrollable with many items
- [ ] Chat state management works (Zustand store)
- [ ] API endpoints return mock data correctly

---

#### Day 13: Landing Page Cards

**Agent Team:** 2 agents in parallel

**Agent A: ValueCard Component**

- Read `phase2-domain.md` ValueCard section
- Create `src/components/domain/cards/value-card.tsx`
- Size: 567×358px
- 4 states with backgrounds:
  - Default: `rgba(212,212,212,0.3)`
  - Primary: `rgba(2,238,225,0.3)`
  - Hover: `rgba(1,169,160,0.3)`
  - Press: `rgba(1,100,95,0.3)`
- Border: 5px solid `rgba(2,238,225,0.2)`
- Border radius: 24px
- Shadow: cyan glow
- Structure: Icon (147×147px) + Title (40px) + Description (24px)
- Content wrapper: 335px width, 32px gap, centered
- Create Storybook stories (all 4 states)
- Write unit tests

**Agent B: ModelCard Component**

- Read `phase2-domain.md` ModelCard section
- Create `src/components/domain/cards/model-card.tsx`
- Size: 327.2×241px
- Same 4 state system as ValueCard
- Structure: Icon (113×114px) + Title (32px)
- Icon centered, title at bottom
- Create Storybook stories (all 4 states)
- Write unit tests

**Dependencies:** Week 1 (icons exported)
**Deliverables:**

- `src/components/domain/cards/value-card.tsx` + stories + tests
- `src/components/domain/cards/model-card.tsx` + stories + tests

**Quality Gate:**

- [ ] Both cards show all 4 states correctly
- [ ] State transitions smooth (200ms)
- [ ] Hover/press interactions work
- [ ] Icons display at correct sizes

---

#### Day 14: Landing Page Assembly

**Agent Team:** 1 agent

**Tasks:**

- Read `phase1-landing.md` (all sections)
- Read `phase3-matching.md` Landing page tree
- Create `src/app/page.tsx` (root page)
- Structure:
  - AppHeader (variant="landing")
  - Intro Section
    - Two-column layout (text left, visual right)
    - Heading: "이론을 넘어, 현실로 들어서다." (96px ExtraBold)
    - Subheading with cyan highlights
    - CTAButton: "지금 바로 학습 시작하기"
    - MainVisual image (970×477px)
  - Function Section
    - Heading: "당신의 학습 경험을 혁신합니다" (96px, cyan highlight)
    - 3 ValueCards in row (gap: 48px)
  - Study Model Section
    - Heading: "다양한 분야의 핵심 모델을 탐색하세요" (52px)
    - 5 ModelCards in row (equal flex, gap: 24px)
  - Footer
- Scroll snap behavior:
  - Container: `scroll-snap-type: y mandatory`
  - Sections: `scroll-snap-align: start`
- Responsive layout (mobile: stack, tablet: 2 cols, desktop: as designed)
- Add scroll-triggered animations (optional)
- Create E2E test (scroll through all sections)

**Dependencies:** Week 3 Days 11-13 (all landing components)
**Deliverables:**

- `src/app/page.tsx` (complete landing page)
- Responsive CSS
- E2E test

**Quality Gate:**

- [ ] All sections visible and scrollable
- [ ] Scroll snap works smoothly
- [ ] Cards clickable and navigate correctly
- [ ] Responsive on mobile/tablet/desktop
- [ ] Lighthouse score >85

---

#### Day 15: Viewer UI Components

**Agent Team:** 3 agents in parallel

**Agent A: Toolbar & ToolbarItem**

- Read `phase2-layout.md` Toolbar, ToolbarItem sections
- Create `src/components/layout/toolbar-item.tsx`
  - Size: 40×40px
  - 3 states: Default (transparent), Hover (gray bg), Press (cyan bg)
  - Border radius: 8px (on hover/press)
  - Icons: 40px size
- Create `src/components/layout/toolbar.tsx`
  - 2 variants: Horizontal (500×50px, 4 tools) | Vertical (50×300px, 2 tools)
  - Background: `rgba(212,212,212,0.3)`
  - Border: 3px cyan
  - Shadow: cyan glow
  - Icons for horizontal: cube-focus, cube-3d-sphere, camera-lock, ruler-pencil
  - Icons for vertical: ai-line, tag-search (rotated -90°)
- Create Storybook stories
- Write unit tests

**Agent B: ZoomSlider Component**

- Read `phase2-layout.md` Slidebar section
- Install shadcn Slider: `npx shadcn@latest add slider`
- Create `src/components/layout/zoom-slider.tsx`
- 2 configurations:
  - Full: 1200px width, 10 levels (zoom1-zoom10)
  - Compact: 960px width, 8 levels (zoom1-zoom8)
- Track: 16px (full) or 12px (compact), #d9d9d9
- Track shadow: inset 0px 4px 4px rgba(0,0,0,0.25)
- Thumb: 120×32px, cyan border, semi-transparent bg
- Thumb shadow: 4px 4px 10px 2px rgba(0,0,0,0.25)
- Create Storybook stories
- Write unit tests

**Agent C: BodyBtn & PartPopup**

- Read `phase2-domain.md` BodyBtn, PartPopup sections
- Create `src/components/domain/parts/body-button.tsx`
  - Size: 81×30px
  - 4 states (same bg system as cards)
  - Border: 2px cyan
  - Border radius: 16px
  - Typography: 14px SemiBold
- Create `src/components/domain/parts/part-popup.tsx`
  - Size: 272px width
  - Speech bubble style (flat top-left corner)
  - Question text + BodyBtn "YES"
  - Background: `rgba(212,212,212,0.3)`
  - Border: 2px cyan
- Create Storybook stories
- Write unit tests

**Dependencies:** Week 1 (icons), Week 1 (UI components)
**Deliverables:**

- `src/components/layout/toolbar-item.tsx` + stories + tests
- `src/components/layout/toolbar.tsx` + stories + tests
- `src/components/layout/zoom-slider.tsx` + stories + tests
- `src/components/domain/parts/body-button.tsx` + stories + tests
- `src/components/domain/parts/part-popup.tsx` + stories + tests

**Quality Gate:**

- [ ] Toolbar icons highlight on click (active state)
- [ ] ZoomSlider draggable with 10/8 discrete levels
- [ ] PartPopup positions correctly near 3D parts
- [ ] All components keyboard accessible

**Week 3 Quality Gate:**

- ✅ Landing page live and polished
- ✅ Chat system functional end-to-end
- ✅ Viewer UI components ready for 3D integration
- ✅ All cards working with hover/press states
- ✅ Lighthouse score >85

---

### Week 4: Integration, Polish & Launch (Days 16-20)

#### Day 16: Part Info Panels & Main App Assembly

**Agent Team:** 2 agents in parallel

**Agent A: Part Info Components**

- Read `phase2-domain.md` PartInfo, AIAssistant sections
- Create `src/components/domain/parts/info-panel.tsx` (shared base)
  - Size: 416px width, auto height
  - Structure: Header (icon + title) + Content box (416×250px)
  - Background: `rgba(212,212,212,0.3)`
  - Border: 3px cyan
  - Border radius: 24px
  - Gap: 16px
- Create `src/components/domain/parts/part-info.tsx` (uses InfoPanel)
  - Icon: part info custom icon
  - Title: "Part Info"
- Create `src/components/domain/parts/ai-assistant.tsx` (uses InfoPanel)
  - Icon: mingcute:ai-line
  - Title: "AI Assistant"
- Create `src/components/domain/parts/part-info-sidebar.tsx` (container)
  - Stacks PartInfo + AIAssistant vertically
  - Gap: 32px
  - Toggleable visibility
- Create Storybook stories
- Write unit tests

**Agent B: Main Application Page Assembly**

- Read `phase1-main.md` (complete)
- Read `phase3-matching.md` Main page tree
- Create `src/app/viewer/page.tsx`
- Structure:
  - AppHeader (variant="main")
  - Main content grid:
    - ChatSidebar (left, toggleable, 311px)
    - 3D Viewer area (center, flex-1)
      - Toolbar (horizontal, top)
      - [R3F Canvas placeholder - simple scene]
      - ZoomSlider (bottom)
    - Side tools (right edge, vertical toolbar)
    - PartInfoSidebar (right, toggleable, overlays viewer)
- Layout:
  - When chat open: viewer width reduced by 311px, slider switches to compact (960px)
  - When part selected: info sidebar slides in from right
- Create E2E test (navigate to viewer, toggle sidebars)

**Dependencies:** Week 3 (all viewer components, chat system)
**Deliverables:**

- `src/components/domain/parts/info-panel.tsx` + tests
- `src/components/domain/parts/part-info.tsx` + tests
- `src/components/domain/parts/ai-assistant.tsx` + tests
- `src/components/domain/parts/part-info-sidebar.tsx` + tests
- `src/app/viewer/page.tsx` (complete main app)
- E2E test

**Quality Gate:**

- [ ] Main app layout renders correctly
- [ ] Chat sidebar toggles smoothly
- [ ] Part info sidebar toggles independently
- [ ] Responsive layout adjusts properly

---

#### Day 17: Three.js Canvas Setup

**Agent Team:** 1 agent

**Tasks:**

- Install dependencies (already done Week 1):
  - Three.js, React Three Fiber, Drei
- Create `src/components/viewer/canvas.tsx`
  - R3F Canvas with camera setup
  - Background: transparent (inherits #171717)
- Create `src/components/viewer/scene.tsx`
  - Basic scene with grid helper
  - Ambient + directional lighting
- Create `src/components/viewer/camera-controls.tsx`
  - OrbitControls from Drei
  - Zooming, panning, rotating enabled
- Create `src/components/viewer/model-loader.tsx`
  - useGLTF hook for loading .glb files
  - Suspense wrapper with loading state
  - Error boundary for failed loads
- Create `src/components/viewer/part-mesh.tsx`
  - Interactive mesh with click detection
  - Hover state (outline)
  - Selected state (cyan highlight)
- Integrate into `/viewer` page (replace placeholder)
- Load sample 3D model (simple gear or cube)
- Create Storybook story (isolated canvas)
- Write unit tests (mocked Three.js)

**Dependencies:** Week 4 Day 16 (main app page)
**Deliverables:**

- `src/components/viewer/canvas.tsx`
- `src/components/viewer/scene.tsx`
- `src/components/viewer/camera-controls.tsx`
- `src/components/viewer/model-loader.tsx`
- `src/components/viewer/part-mesh.tsx`
- Sample 3D model (public/models/sample.glb)
- Storybook story
- Unit tests

**Quality Gate:**

- [ ] 3D model loads and displays
- [ ] Orbit controls work (mouse drag, zoom)
- [ ] Click detection works on parts
- [ ] Loading state displays during load
- [ ] No memory leaks (dispose() called properly)

---

#### Day 18: Accessibility Fixes & Testing

**Agent Team:** 3 agents in parallel

**Agent A: Accessibility Audit & Fixes**

- Read `phase3-design-system.md` Accessibility section
- Run Lighthouse audit on all 4 pages
- Run axe-core automated tests
- Apply remaining fixes from analysis:
  1. ✅ Button contrast (already fixed Week 1)
  2. Add focus-visible rings to all interactive elements
  3. Increase button/input heights to 44px (or document exception)
  4. Add ARIA labels to all icon-only buttons
  5. Add underline to active NavLabel (don't rely on color alone)
- Manual testing:
  - Keyboard navigation (Tab through all pages)
  - Screen reader (VoiceOver on macOS)
  - Color-blind simulation (Chrome DevTools)
- Create accessibility report
- Fix all critical issues

**Agent B: Unit Test Coverage**

- Run coverage report: `pnpm test:coverage`
- Identify untested components (<80% coverage)
- Write missing unit tests:
  - All UI components (button, input, etc.)
  - All domain components (cards, chat, parts)
  - Stores (Zustand)
  - Hooks (if any custom hooks)
- Target: 80%+ overall coverage
- Focus on critical paths (auth flow, chat system)

**Agent C: E2E Tests**

- Install Playwright (if not done)
- Create E2E test suite:
  1. Landing page flow: Scroll sections → Click CTA → Navigate to signup
  2. Auth flow: Signup → Login → Redirect to viewer
  3. Chat flow: Open sidebar → Send message → Receive AI response → View history
  4. Viewer flow: Select tool → Click part → View part info → Close panel
- Create test helpers (auth, API mocks)
- Run all E2E tests in CI environment

**Dependencies:** All previous work (complete application)
**Deliverables:**

- Accessibility report (WCAG AA compliance)
- All accessibility fixes applied
- Unit test coverage >80%
- E2E test suite (4+ critical flows)
- Test documentation

**Quality Gate:**

- [ ] Lighthouse accessibility score >95
- [ ] Zero critical axe-core violations
- [ ] All interactive elements keyboard accessible
- [ ] Screen reader announces correctly
- [ ] Test coverage >80%
- [ ] All E2E tests pass

---

#### Day 19: Performance Optimization & Bug Fixes

**Agent Team:** 3 agents in parallel

**Agent A: Performance Optimization**

- Run Lighthouse performance audit
- Identify bottlenecks:
  - Large bundle size → Code splitting
  - Slow page loads → Image optimization
  - Slow interactions → Memoization
- Optimizations:
  - Code splitting: Dynamic imports for heavy components (3D viewer, Markdown)
  - Image optimization: Use Next.js Image component, WebP format
  - React optimization: React.memo on cards, useMemo for expensive calculations
  - Bundle analysis: Run `pnpm build` and analyze bundle size
  - Lazy loading: Defer non-critical components
- Virtual scrolling: Add to chat history if >100 items
- Test performance after each optimization
- Target: Lighthouse performance >90

**Agent B: Integration Testing & Bug Triage**

- Test cross-page navigation:
  - Landing → Login → Signup → Login → Viewer
  - Back button works correctly
  - State persists appropriately (chat history, viewer settings)
- Test state management:
  - Chat history persists across page reloads
  - Viewer state (selected tool, zoom level) persists
  - Auth state (logged in) persists
- Test error scenarios:
  - Network error during chat → Show error message
  - Failed 3D model load → Show error boundary
  - Invalid form input → Show validation errors
- Create bug list with priorities
- Fix all critical/high bugs

**Agent C: Loading States & Error Boundaries**

- Add loading states to all async operations:
  - Chat: "AI is thinking..." skeleton
  - 3D viewer: Loading progress bar for models
  - Auth: Button spinner during login/signup
  - History: Skeleton list while loading
- Create error boundaries:
  - Page-level error boundary (catches crashes)
  - Component-level error boundaries (3D viewer, chat)
- Add error recovery UI:
  - "Retry" buttons
  - "Report issue" links
  - Graceful degradation (show fallback content)
- Test error scenarios

**Dependencies:** Week 4 Days 16-18 (complete app)
**Deliverables:**

- Performance optimization report
- Bundle analysis report
- Bug list with resolutions
- Loading states on all async operations
- Error boundaries implemented
- Integration test results

**Quality Gate:**

- [ ] Lighthouse performance >90
- [ ] Bundle size <500KB (gzipped)
- [ ] FCP <1.5s, LCP <2.5s
- [ ] All critical bugs fixed
- [ ] All loading states implemented
- [ ] Error recovery works correctly

---

#### Day 20: Production Readiness & Deployment

**Agent Team:** 1 agent (or manual)

**Tasks:**

**Morning: Final Checks**

- Run all tests:
  - `pnpm test` (unit tests)
  - `pnpm test:e2e` (E2E tests)
  - `pnpm lint` (ESLint)
  - `pnpm type-check` (TypeScript)
- Final Lighthouse audits on all 4 pages:
  - Performance >90
  - Accessibility >95
  - Best Practices >95
  - SEO >90
- Final accessibility audit:
  - Keyboard navigation
  - Screen reader
  - Color contrast
  - WCAG AA checklist
- Security audit:
  - No secrets in code
  - API endpoints authenticated
  - Input sanitization in place
  - CORS configured correctly

**Afternoon: Production Build**

- Create production build: `pnpm build`
- Verify build output:
  - No errors, no warnings
  - Bundle size acceptable
  - All routes generated correctly
- Test production build locally: `pnpm start`
  - All pages load correctly
  - All features work in production mode
  - No console errors

**Deploy to Staging:**

- Push to `dev` branch
- Vercel auto-deploys to staging
- Smoke test on staging:
  - Test all 4 pages
  - Test critical flows (auth, chat, viewer)
  - Test on mobile device (real device, not emulator)
- Performance test on staging (real network conditions)

**Deploy to Production (if approved):**

- Merge `dev` → `main` (PR with detailed changelog)
- Vercel deploys to production
- Smoke test on production
- Monitor for errors (Sentry, Vercel Analytics)
- Announce launch to team

**Deliverables:**

- Production build (no errors)
- Staging deployment (tested)
- Production deployment (if approved)
- Deployment documentation
- Monitoring setup (Vercel Analytics, Sentry)
- Handoff documentation (README, API docs, architecture)

**Quality Gate:**

- [ ] All tests pass (unit, E2E, lint, type-check)
- [ ] Lighthouse scores: Performance >90, Accessibility >95, Best Practices >95, SEO >90
- [ ] WCAG AA compliant (zero critical violations)
- [ ] Production build successful
- [ ] Staging deployment tested
- [ ] All critical flows work in production

**Week 4 Quality Gate:**

- ✅ All 4 pages deployed and functional
- ✅ Three.js viewer working (basic functionality)
- ✅ 80%+ test coverage
- ✅ Lighthouse >90 (performance, accessibility)
- ✅ WCAG AA compliant
- ✅ Zero critical bugs
- ✅ Production-ready

---

## Complete File Structure

```
3rd-frontend/
├── .storybook/
│   ├── main.ts                      # Storybook configuration
│   └── preview.ts                   # Global decorators & themes
│
├── docs/
│   ├── phase1-landing.md            # Landing page analysis
│   ├── phase1-auth.md               # Auth pages analysis
│   ├── phase1-main.md               # Main app analysis
│   ├── phase2-ui-basic.md           # UI components analysis
│   ├── phase2-layout.md             # Layout components analysis
│   ├── phase2-domain.md             # Domain components analysis
│   ├── phase3-matching.md           # Page-component mapping
│   ├── phase3-design-system.md      # Design tokens extraction
│   ├── implementation-plan.md       # This file
│   ├── screenshots/                 # Figma screenshots
│   └── assets/                      # Analysis assets
│
├── public/
│   ├── logo/
│   │   ├── logo-header.svg          # Day 3 - 73.6×69.1px
│   │   ├── logo-footer.svg          # Day 3 - 36.9×34.7px
│   │   └── logo-header.png          # Fallback
│   ├── icons/
│   │   ├── landing/                 # Day 3 - 8 icons
│   │   │   ├── box-3d.svg
│   │   │   ├── chat-dots.svg
│   │   │   ├── chart-line.svg
│   │   │   ├── electricity.svg
│   │   │   ├── rocket.svg
│   │   │   ├── chemistry.svg
│   │   │   ├── chip.svg
│   │   │   └── settings.svg
│   │   ├── viewer/                  # Day 3 - 13 icons
│   │   │   ├── cube-focus.svg
│   │   │   ├── cube-3d-sphere.svg
│   │   │   ├── camera-lock.svg
│   │   │   ├── search-filled.svg
│   │   │   ├── ai-fill.svg
│   │   │   ├── ai-line.svg
│   │   │   ├── search-20.svg
│   │   │   ├── search-24.svg
│   │   │   ├── ruler-square.svg
│   │   │   ├── ruler.svg
│   │   │   ├── ruler-pencil-line.svg
│   │   │   ├── ruler-pencil-solid.svg
│   │   │   └── send.svg
│   │   └── ui/                      # Day 3 - 3 icons
│   │       ├── hamburger.svg
│   │       ├── eye.svg
│   │       └── part-info.svg
│   ├── images/
│   │   └── hero/                    # Day 3
│   │       ├── main-visual.webp     # 970×477px
│   │       └── main-visual.png      # Fallback
│   └── models/                      # Day 17
│       └── sample.glb               # Sample 3D model
│
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout
│   │   ├── page.tsx                 # Day 14 - Landing page
│   │   ├── globals.css              # Day 1-2 - CSS variables
│   │   ├── login/
│   │   │   └── page.tsx             # Day 8 - Login page
│   │   ├── signup/
│   │   │   └── page.tsx             # Day 9 - Signup page
│   │   ├── viewer/
│   │   │   └── page.tsx             # Day 16 - Main app
│   │   └── api/
│   │       ├── auth/
│   │       │   ├── login/route.ts
│   │       │   └── signup/route.ts
│   │       ├── chat/route.ts        # Day 12
│   │       └── conversations/
│   │           ├── route.ts         # Day 12
│   │           └── [id]/route.ts    # Day 12
│   │
│   ├── components/
│   │   ├── ui/                      # shadcn/ui + customs
│   │   │   ├── button.tsx           # Day 4 - shadcn customized
│   │   │   ├── button.stories.tsx
│   │   │   ├── button.test.tsx
│   │   │   ├── input.tsx            # Day 4 - shadcn customized
│   │   │   ├── input.stories.tsx
│   │   │   ├── input.test.tsx
│   │   │   ├── label.tsx            # Day 5 - shadcn
│   │   │   ├── slider.tsx           # Day 15 - shadcn
│   │   │   ├── sheet.tsx            # shadcn (for sidebars)
│   │   │   ├── popover.tsx          # shadcn (for popups)
│   │   │   ├── nav-label.tsx        # Day 3 - custom
│   │   │   ├── help-message.tsx     # Day 4 - custom
│   │   │   ├── text-field.tsx       # Day 5 - composite
│   │   │   ├── cta-button.tsx       # Day 5 - custom
│   │   │   └── link-button.tsx      # Day 5 - custom
│   │   │
│   │   ├── layout/                  # Layout components
│   │   │   ├── app-header.tsx       # Day 6
│   │   │   ├── app-header.stories.tsx
│   │   │   ├── app-header.test.tsx
│   │   │   ├── navigation.tsx       # Day 6 - Korean labels
│   │   │   ├── main-navigation.tsx  # Day 6 - English labels
│   │   │   ├── footer.tsx           # Day 7
│   │   │   ├── footer.stories.tsx
│   │   │   ├── auth-layout.tsx      # Day 7 - auth wrapper
│   │   │   ├── toolbar.tsx          # Day 15
│   │   │   ├── toolbar.stories.tsx
│   │   │   ├── toolbar-item.tsx     # Day 15
│   │   │   └── zoom-slider.tsx      # Day 15
│   │   │
│   │   ├── domain/                  # Domain-specific
│   │   │   ├── cards/
│   │   │   │   ├── value-card.tsx   # Day 13
│   │   │   │   ├── value-card.stories.tsx
│   │   │   │   ├── value-card.test.tsx
│   │   │   │   ├── model-card.tsx   # Day 13
│   │   │   │   ├── model-card.stories.tsx
│   │   │   │   └── model-card.test.tsx
│   │   │   │
│   │   │   ├── chat/
│   │   │   │   ├── user-chat-bubble.tsx      # Day 11
│   │   │   │   ├── ai-chat-bubble.tsx        # Day 11
│   │   │   │   ├── chat-history-item.tsx     # Day 11
│   │   │   │   ├── chat-input.tsx            # Day 11
│   │   │   │   ├── chat-sidebar.tsx          # Day 12
│   │   │   │   ├── markdown-renderer.tsx     # Day 10
│   │   │   │   └── *.stories.tsx / *.test.tsx
│   │   │   │
│   │   │   └── parts/
```
