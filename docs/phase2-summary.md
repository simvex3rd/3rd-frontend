# Phase 2: Domain Components - Quick Reference

## Overview

Analyzed 11 domain-specific components from Figma (fileKey: Vz80RydxWcYHVnn2iuyV0m)

**Full documentation:** [phase2-domain.md](./phase2-domain.md) (2,407 lines)

---

## Component Inventory

### Card Components (2)

| Component | Node ID | Size      | Purpose                         |
| --------- | ------- | --------- | ------------------------------- |
| ModelCard | 144-299 | 327×241px | 3D model category cards         |
| ValueCard | 144-277 | 567×358px | Feature/value proposition cards |

### Chat & Messaging (5)

| Component   | Node ID  | Size      | Purpose                |
| ----------- | -------- | --------- | ---------------------- |
| ChatSide    | 236-1535 | 311×879px | Chat sidebar container |
| UserChat    | 236-1485 | 365px max | User message bubble    |
| AIChat      | 236-1501 | 365px max | AI message bubble      |
| HistoryChat | 236-1323 | 76×21px   | Chat history list item |
| Markdown    | 337-1343 | Variable  | Rich text renderer     |

### Part Interaction (4)

| Component   | Node ID  | Size     | Purpose               |
| ----------- | -------- | -------- | --------------------- |
| PartInfo    | 232-886  | 416×auto | Part details panel    |
| AIAssistant | 160-672  | 416×auto | AI help panel         |
| PartPopup   | 236-1141 | 272×auto | Contextual hint popup |
| BodyBtn     | 236-1131 | 81×30px  | Compact action button |

---

## Key Patterns

### Interactive States (4-state system)

All interactive components use the same state progression:

| State   | Background Color                 | Use Case        |
| ------- | -------------------------------- | --------------- |
| Default | `rgba(212,212,212,0.3)` - Gray   | Idle/inactive   |
| Primary | `rgba(2,238,225,0.3)` - Cyan     | Selected/active |
| Hover   | `rgba(1,169,160,0.3)` - Teal     | Mouse over      |
| Press   | `rgba(1,100,95,0.3)` - Dark teal | Click/touch     |

### Design Tokens

**Primary Color:** `#02eee1` (Cyan)

- Used for: Headings, icons, borders, links
- Variable: `--color/text/interactive/primary`

**Border Radii:**

- Small components: 16px
- Cards and panels: 24px

**Typography Scale:**

- Heading XL: 40px (Pretendard Bold)
- Heading LG: 32px (Pretendard SemiBold)
- Body LG: 16px (Regular/Medium/SemiBold/Bold)
- Body MD: 14px (Medium/SemiBold)

**Spacing Scale:** 4px, 8px, 16px, 24px, 32px, 48px, 160px

---

## Implementation Priority

### Phase 1: Foundation

1. **Markdown** - Core dependency (used in AIChat)
2. **BodyBtn** - Simple, reusable button
3. **CardStatus type** - Shared TypeScript type

### Phase 2: Chat Building Blocks

4. **UserChatBubble** - User messages
5. **AIChatBubble** - AI responses (uses Markdown)
6. **ChatHistoryItem** - History list items

### Phase 3: Chat Container

7. **ChatSidebar** - Full chat interface (uses 4-6)

### Phase 4: Cards

8. **ModelCard** - Model library
9. **ValueCard** - Feature highlights

### Phase 5: Part Interaction

10. **PartInfo** - Part details
11. **AIAssistant** - AI help (similar to PartInfo)
12. **PartPopup** - Contextual popups

---

## Component Dependencies

```
Foundation (no dependencies):
├─ Markdown
├─ BodyBtn
└─ CardStatus type

Chat components:
├─ UserChatBubble (standalone)
├─ AIChatBubble → uses Markdown
├─ ChatHistoryItem (standalone)
└─ ChatSidebar → uses ChatHistoryItem

Cards (standalone):
├─ ModelCard
└─ ValueCard

Part interaction:
├─ PartInfo (standalone)
├─ AIAssistant (standalone, similar to PartInfo)
└─ PartPopup → uses BodyBtn
```

---

## Data Models (TypeScript)

### Card Data

```typescript
interface Model3D {
  id: string;
  title: string;
  category: string;
  thumbnail?: string;
  fileSize: string;
  polyCount?: number;
  fileUrl: string;
}
```

### Chat Data

```typescript
interface ChatMessage {
  id: string;
  role: "user" | "ai";
  content: string; // Plain text for user, Markdown for AI
  timestamp: Date;
}

interface ChatConversation {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}
```

### Part Data

```typescript
interface Part3D {
  id: string;
  name: string;
  type: string;
  description?: string;
  measurements?: {
    volume?: number;
    surfaceArea?: number;
    mass?: number;
  };
  material?: string;
}
```

---

## API Endpoints Needed

### Chat System

- `POST /api/chat` - Send message, get AI response
- `GET /api/conversations` - List chat history
- `GET /api/conversations/:id` - Load specific conversation
- `POST /api/conversations` - Save new conversation

### 3D Models

- `GET /api/models` - List available 3D models
- `GET /api/models/:id` - Get model details
- `GET /api/models/:id/file` - Download model file

### Parts

- `GET /api/parts/:id` - Get part information
- `GET /api/parts/:id/help` - Get AI assistance for part

---

## Shared Component Opportunity

**PartInfo and AIAssistant are structurally identical:**

- Same layout (icon + title + content box)
- Same dimensions (416px width, 250px content height)
- Same styling (border, padding, colors)

**Recommendation:** Create single `InfoPanel` component:

```typescript
interface InfoPanelProps {
  icon: React.ReactNode;
  title: string;
  content: string;
  isLoading?: boolean;
  onClose?: () => void;
}

// Usage:
<InfoPanel icon={<AIIcon />} title="AI Assistant" content={aiResponse} />
<InfoPanel icon={<PartIcon />} title="Part Info" content={partDetails} />
```

---

## Chat System Architecture

```
ChatSidebar (311px fixed width)
├── Hamburger menu button
├── New Chat button
├── History section
│   ├── "History" label
│   └── ChatHistoryItem × N (scrollable)
└── [External: Active conversation area]
    ├── Message list (scrollable)
    │   ├── UserChatBubble
    │   ├── AIChatBubble (contains Markdown)
    │   └── ... (alternating)
    └── [External: Input field + send button]
```

**Message Flow:**

1. User sends message → UserChatBubble appears
2. API call to AI service
3. AI response → AIChatBubble with Markdown content
4. Conversation saved → ChatHistoryItem updated

---

## Accessibility Checklist

- [x] All interactive components keyboard navigable
- [x] Focus indicators visible on all focusable elements
- [x] ARIA roles assigned (`button`, `article`, `dialog`, `region`)
- [x] Color contrast verified for WCAG AA compliance
- [x] Semantic HTML in Markdown renderer (headings, lists, blockquotes)
- [x] Live regions for dynamic content (`aria-live="polite"` for AI responses)
- [x] Focus management for popups and panels
- [x] Escape key closes modal/popup components

---

## Assets to Export from Figma

### Icons (SVG)

- Electronics chip (ModelCard) - `130:551`
- 3D box (ValueCard) - `98:165`
- AI assistant icon (mingcute:ai-line) - `160:663`
- Part info icon - `231:617`
- Hamburger menu - `236:1424`
- Chat dots (bi:chat-dots) - `98:155`

### Colors Reference

- Primary cyan: `#02eee1`
- White: `#fafafa`
- Light gray: `#e5e5e5`
- Tertiary gray: `#d4d4d4`
- Dark background: `#404040`

---

## Tailwind Customization Required

Add to `tailwind.config.ts`:

```typescript
colors: {
  'primary-cyan': '#02eee1',
  'state-default': 'rgba(212,212,212,0.3)',
  'state-primary': 'rgba(2,238,225,0.3)',
  'state-hover': 'rgba(1,169,160,0.3)',
  'state-press': 'rgba(1,100,95,0.3)',
},
borderRadius: {
  '16': '16px',
  '24': '24px',
},
borderWidth: {
  '3': '3px',
  '5': '5px',
},
boxShadow: {
  'card': '4px 4px 20px 0px rgba(2,238,225,0.1)',
},
```

---

## Testing Priorities

1. **Chat flow:** Message send → AI response → Markdown rendering
2. **Interactive states:** Hover/press states on all components
3. **Responsive layout:** Chat sidebar collapse on mobile
4. **Keyboard navigation:** Tab through all interactive elements
5. **Screen reader:** Test with VoiceOver/NVDA
6. **Markdown rendering:** Test headings, lists, code blocks, blockquotes

---

## Next Actions

1. ✅ **Document created:** phase2-domain.md (2,407 lines, 74KB)
2. ⏳ **Export icons:** From Figma to `src/components/icons/`
3. ⏳ **Implement Markdown component:** Install react-markdown or marked
4. ⏳ **Create base components:** BodyBtn, InfoPanel
5. ⏳ **Build chat system:** Message bubbles → Sidebar → Integration
6. ⏳ **Implement cards:** ModelCard and ValueCard with states
7. ⏳ **Add to Storybook:** Document all components with examples

---

**Status:** Phase 2 analysis complete. All 11 components fully documented and ready for implementation.

**Related Documents:**

- [phase2-domain.md](./phase2-domain.md) - Full detailed analysis
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Overall system architecture
- [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md) - Implementation guidelines
