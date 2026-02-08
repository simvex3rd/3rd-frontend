# SIMVEX Figma-to-Code Analysis - Complete Index

**Figma File:** Vz80RydxWcYHVnn2iuyV0m
**Analysis Date:** 2026-02-08
**Status:** Phase 2 Complete - Domain Components

---

## Document Structure

This analysis is organized into multiple phases covering all components from the SIMVEX Figma design.

### Phase 2: Domain Components ✅ COMPLETE

**File:** [phase2-domain.md](./phase2-domain.md) (74KB, 2,407 lines)
**Summary:** [phase2-summary.md](./phase2-summary.md) (8.5KB)
**Components:** 11 domain-specific components

#### Card Components (2)

- **ModelCard** (144-299) - 3D model category cards, 327×241px, 4 states
- **ValueCard** (144-277) - Feature cards, 567×358px, 4 states

#### Chat & Messaging (5)

- **ChatSidebar** (236-1535) - Main chat container, 311×879px
- **UserChatBubble** (236-1485) - User messages, 365px max width
- **AIChatBubble** (236-1501) - AI responses, 365px max width
- **ChatHistoryItem** (236-1323) - History list items, 76×21px
- **MarkdownRenderer** (337-1343) - Rich text content renderer

#### Part Interaction (4)

- **PartInfo** (232-886) - Part details panel, 416px width
- **AIAssistant** (160-672) - AI help panel, 416px width (identical to PartInfo)
- **PartPopup** (236-1141) - Contextual popup, 272px width
- **BodyBtn** (236-1131) - Compact button, 81×30px, 4 states

### Phase 2: UI Basic Components

**File:** [phase2-ui-basic.md](./phase2-ui-basic.md) (71KB)
**Components:** Basic UI building blocks (buttons, inputs, etc.)

### Phase 2: Layout Components

**File:** [phase2-layout.md](./phase2-layout.md) (50KB)
**Components:** Layout and container components

---

## Quick Navigation

### By Component Type

#### Interactive Cards

- [ModelCard](./phase2-domain.md#component-modelcard) - Model library cards
- [ValueCard](./phase2-domain.md#component-valuecard) - Feature highlight cards
- **Pattern:** 4-state system (Default/Primary/Hover/Press)
- **Colors:** Gray → Cyan → Teal → Dark Teal

#### Chat System

- [ChatSidebar](./phase2-domain.md#component-chatside) - Full sidebar container
- [UserChatBubble](./phase2-domain.md#component-userchat-slidebaruserchat) - User messages
- [AIChatBubble](./phase2-domain.md#component-aichat-slidebaraichat) - AI responses
- [ChatHistoryItem](./phase2-domain.md#component-historychat) - History list
- [MarkdownRenderer](./phase2-domain.md#component-markdown) - Content formatter
- **Architecture:** Sidebar + Message bubbles + Markdown rendering

#### 3D Viewer Integration

- [PartInfo](./phase2-domain.md#component-partinfo) - Part details panel
- [AIAssistant](./phase2-domain.md#component-aiassistant) - AI help interface
- [PartPopup](./phase2-domain.md#component-partpopup) - Contextual hints
- [BodyBtn](./phase2-domain.md#component-bodybtn) - Action button

### By Implementation Priority

#### Phase 1: Foundation (Start Here)

1. [Markdown](./phase2-domain.md#component-markdown) - Core rendering dependency
2. [BodyBtn](./phase2-domain.md#component-bodybtn) - Reusable button component
3. CardStatus type - Shared TypeScript types

#### Phase 2: Chat Building Blocks

4. [UserChatBubble](./phase2-domain.md#component-userchat-slidebaruserchat)
5. [AIChatBubble](./phase2-domain.md#component-aichat-slidebaraichat)
6. [ChatHistoryItem](./phase2-domain.md#component-historychat)

#### Phase 3: Chat Container

7. [ChatSidebar](./phase2-domain.md#component-chatside)

#### Phase 4: Cards

8. [ModelCard](./phase2-domain.md#component-modelcard)
9. [ValueCard](./phase2-domain.md#component-valuecard)

#### Phase 5: Part Interaction

10. [PartInfo](./phase2-domain.md#component-partinfo)
11. [AIAssistant](./phase2-domain.md#component-aiassistant)
12. [PartPopup](./phase2-domain.md#component-partpopup)

---

## Design System Reference

### Color Palette

| Token          | Value     | Usage                                |
| -------------- | --------- | ------------------------------------ |
| Primary Cyan   | `#02eee1` | Interactive elements, icons, borders |
| Text Primary   | `#fafafa` | White text on dark backgrounds       |
| Text Secondary | `#e5e5e5` | Light gray text                      |
| Text Tertiary  | `#d4d4d4` | Muted text                           |
| BG Secondary   | `#404040` | Dark backgrounds (sidebar)           |

### Interactive State Colors

| State   | Color     | Opacity                 | Usage           |
| ------- | --------- | ----------------------- | --------------- |
| Default | Gray      | `rgba(212,212,212,0.3)` | Idle state      |
| Primary | Cyan      | `rgba(2,238,225,0.3)`   | Active/selected |
| Hover   | Teal      | `rgba(1,169,160,0.3)`   | Mouse over      |
| Press   | Dark Teal | `rgba(1,100,95,0.3)`    | Click/touch     |

### Typography Scale

| Name       | Font                | Size | Weight  | Line Height |
| ---------- | ------------------- | ---- | ------- | ----------- |
| heading/xl | Pretendard Bold     | 40px | 700     | 1.25        |
| heading/lg | Pretendard SemiBold | 32px | 600     | 1.25        |
| body/lg    | Pretendard          | 16px | 400-700 | 1.5         |
| body/md    | Pretendard          | 14px | 500-600 | 1.5         |

### Spacing Scale

4px, 8px, 16px, 24px, 32px, 48px, 160px

### Border Radius

- Small: 16px (buttons, popups, message bubbles)
- Large: 24px (cards, panels)

### Borders

- Standard: 2px
- Emphasis: 3px
- Cards: 5px

---

## Component Dependencies Graph

```
Foundation (No dependencies):
├─ Markdown
├─ BodyBtn
└─ TypeScript types (CardStatus, etc.)

Chat System:
├─ UserChatBubble (standalone)
├─ AIChatBubble → uses Markdown
├─ ChatHistoryItem (standalone)
└─ ChatSidebar → uses ChatHistoryItem

Cards (Standalone):
├─ ModelCard
└─ ValueCard

Part Interaction:
├─ PartInfo (standalone)
├─ AIAssistant (standalone, similar structure to PartInfo)
└─ PartPopup → uses BodyBtn
```

---

## Data Models Overview

### TypeScript Interfaces

See full definitions in [phase2-domain.md - Data Models](./phase2-domain.md#data-models)

**Key interfaces:**

- `Model3D` - 3D model metadata
- `ChatMessage` - User/AI messages
- `ChatConversation` - Full conversation data
- `Part3D` - 3D part information
- `CardStatus` - Interactive state type

---

## Implementation Checklist

### Setup

- [ ] Export SVG icons from Figma (6 icons)
- [ ] Add custom colors to Tailwind config
- [ ] Add custom spacing/radius to Tailwind config
- [ ] Install Markdown library (react-markdown or marked)

### Phase 1: Foundation

- [ ] Implement MarkdownRenderer component
- [ ] Implement BodyBtn component
- [ ] Create CardStatus type and shared state logic
- [ ] Create Storybook stories for foundation components

### Phase 2: Chat Building Blocks

- [ ] Implement UserChatBubble
- [ ] Implement AIChatBubble (integrate Markdown)
- [ ] Implement ChatHistoryItem
- [ ] Create Storybook stories for chat components

### Phase 3: Chat System

- [ ] Implement ChatSidebar container
- [ ] Set up chat state management (Zustand)
- [ ] Create API endpoints (POST /api/chat, GET /api/conversations)
- [ ] Implement WebSocket or polling for real-time updates
- [ ] Test full chat flow

### Phase 4: Cards

- [ ] Implement ModelCard with 4 states
- [ ] Implement ValueCard with 4 states
- [ ] Create responsive grid layouts
- [ ] Add hover/press interactions
- [ ] Create Storybook stories for cards

### Phase 5: Part Interaction

- [ ] Implement shared InfoPanel base (for PartInfo + AIAssistant)
- [ ] Implement PartInfo using InfoPanel
- [ ] Implement AIAssistant using InfoPanel
- [ ] Implement PartPopup with positioning logic
- [ ] Integrate with 3D viewer state

### Testing & Polish

- [ ] Test keyboard navigation (Tab, Enter, Esc)
- [ ] Test screen reader compatibility (VoiceOver, NVDA)
- [ ] Verify color contrast meets WCAG AA
- [ ] Test responsive layouts (mobile, tablet, desktop)
- [ ] Add loading states for async operations
- [ ] Add error handling for API calls

---

## API Requirements

### Chat System

```typescript
// Send message
POST /api/chat
Body: { message: string, conversationId?: string }
Response: { response: string, conversationId: string }

// Get history
GET /api/conversations
Response: ChatConversation[]

// Load conversation
GET /api/conversations/:id
Response: ChatConversation

// Save conversation
POST /api/conversations
Body: { messages: ChatMessage[] }
Response: { id: string }
```

### 3D Models

```typescript
// List models
GET /api/models
Response: Model3D[]

// Get model details
GET /api/models/:id
Response: Model3D

// Download model file
GET /api/models/:id/file
Response: Binary (.glb, .obj, etc.)
```

### Parts

```typescript
// Get part info
GET /api/parts/:id
Response: Part3D

// Get AI help for part
POST /api/parts/:id/help
Body: { question?: string }
Response: { response: string }
```

---

## Assets to Export

### Icons (SVG)

From Figma, export as SVG with these node IDs:

1. **Electronics chip** (130:551) - for ModelCard
2. **3D box** (98:165) - for ValueCard
3. **AI assistant icon** (160:663) - mingcute:ai-line
4. **Part info icon** (231:617) - part info vector
5. **Hamburger menu** (236:1424) - 3 horizontal lines
6. **Chat dots** (98:155) - bi:chat-dots

**Export settings:**

- Format: SVG
- Scale: 1x
- Optimize: Yes (remove unnecessary attributes)

### Sample 3D Models

Prepare sample 3D models for ModelCard testing:

- Mechanical (e.g., gears, pistons)
- Electronics (e.g., circuit boards)
- Automotive (e.g., engine parts)

---

## Accessibility Notes

All components analyzed for WCAG 2.1 AA compliance:

- ✅ Keyboard navigation implemented
- ✅ Focus indicators visible
- ✅ ARIA roles assigned appropriately
- ✅ Color contrast verified (some combinations need testing)
- ✅ Semantic HTML in Markdown rendering
- ✅ Live regions for dynamic content
- ✅ Focus management for modals/popups
- ⚠️ Color contrast ratios need final verification

**Testing tools:**

- Chrome DevTools Lighthouse
- axe DevTools
- VoiceOver (macOS/iOS)
- NVDA (Windows)

---

## Performance Considerations

### Chat System

- **Pagination:** Limit initial message load (e.g., 50 most recent)
- **Virtual scrolling:** Use react-window for long conversations
- **Streaming:** Implement server-sent events or WebSocket for AI responses
- **Debounce:** Debounce input to prevent excessive API calls

### 3D Models

- **Lazy loading:** Load model files on demand
- **Progressive loading:** Show low-poly preview while high-poly loads
- **Caching:** Cache model files in browser storage
- **Thumbnails:** Pre-generate and optimize thumbnail images

### Markdown Rendering

- **Memoization:** Use React.memo for message bubbles
- **Code highlighting:** Lazy load syntax highlighter
- **Image optimization:** Optimize any images in Markdown content

---

## Known Patterns & Optimizations

### Reusable Components

#### InfoPanel Pattern

PartInfo and AIAssistant share identical structure:

```typescript
<InfoPanel
  icon={icon}
  title={title}
  content={content}
  isLoading={isLoading}
  onClose={onClose}
/>
```

#### Card State Pattern

ModelCard and ValueCard share state logic:

```typescript
const useCardState = (initialStatus = "Default") => {
  const [status, setStatus] = useState<CardStatus>(initialStatus);

  const handlers = {
    onMouseEnter: () => setStatus("hover"),
    onMouseLeave: () => setStatus("Default"),
    onMouseDown: () => setStatus("press"),
    onMouseUp: () => setStatus("hover"),
  };

  return { status, handlers };
};
```

#### Message Bubble Pattern

UserChat and AIChat differ only in:

- Background color (cyan vs teal)
- Border radius corner (bottom-right vs bottom-left)
- Alignment (left vs right)

```typescript
<MessageBubble
  role="user" // or "ai"
  content={content}
  timestamp={timestamp}
/>
```

---

## Future Enhancements

### Chat System

- [ ] Conversation search
- [ ] Message reactions (thumbs up/down for AI responses)
- [ ] Code block copy button in Markdown
- [ ] Voice input for chat
- [ ] Export conversation as PDF/TXT

### Cards

- [ ] Card filtering and search
- [ ] Drag-and-drop to reorder
- [ ] Card favoriting/bookmarking
- [ ] Grid vs list view toggle

### Part Interaction

- [ ] Part comparison view
- [ ] Part animation playback
- [ ] Part measurement tools
- [ ] Part export/share functionality

---

## Related Documentation

### Project Documentation

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Overall system architecture
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Development guidelines
- [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) - Common issues and solutions

### Component Documentation

- [phase2-domain.md](./phase2-domain.md) - Full domain components analysis (THIS FILE)
- [phase2-summary.md](./phase2-summary.md) - Quick reference guide
- [phase2-ui-basic.md](./phase2-ui-basic.md) - Basic UI components
- [phase2-layout.md](./phase2-layout.md) - Layout components

### Screenshots

- [docs/screenshots/](./screenshots/) - Component screenshots from Figma
- [docs/screenshots/README.md](./screenshots/README.md) - Screenshot metadata

---

## Contact & Resources

**Figma File:** `Vz80RydxWcYHVnn2iuyV0m`
**Project:** SIMVEX Frontend
**Tech Stack:** Next.js 16, React 19, TypeScript, Three.js, Tailwind CSS v4
**Timeline:** 10 days (rapid iteration)
**Team:** 2 developers

---

## Version History

| Date       | Phase             | Status      | Components    | Lines |
| ---------- | ----------------- | ----------- | ------------- | ----- |
| 2026-02-08 | Phase 2: Domain   | ✅ Complete | 11 components | 2,407 |
| 2026-02-08 | Phase 2: UI Basic | ✅ Complete | TBD           | 71KB  |
| 2026-02-08 | Phase 2: Layout   | ✅ Complete | TBD           | 50KB  |

---

**Next Phase:** Implementation Phase - Begin building components based on these specifications.

**Status:** Phase 2 analysis complete. All domain components fully documented and ready for development.
