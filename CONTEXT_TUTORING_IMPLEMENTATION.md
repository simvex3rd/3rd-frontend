# Context-Based Tutoring Implementation

## Overview

Implemented context-aware tutoring in the chat interface that automatically injects part information when users ask questions about selected 3D parts.

## Features Implemented

### 1. Part Context Injection

When a user sends a chat message and a part is selected, the system automatically enriches the message with part context:

```typescript
// Original user message: "What is this made of?"
// Enhanced message sent to AI:
[현재 선택된 부품: Crankshaft]
재질: Steel
설명: Main rotating component of the engine

질문: What is this made of?
```

**Key Points:**

- User sees their original message in the chat UI
- AI receives the enriched context for better responses
- Context includes: part name, material, and description

### 2. System Messages on Part Selection

When a user selects a part in the 3D viewer, a system message appears in the chat:

```
"[Part Name] 부품을 선택했습니다. 궁금한 점을 물어보세요!"
```

**Implementation Details:**

- System messages are displayed centered with a subtle background
- Uses `useEffect` to detect part selection changes
- Only triggers when a new part is selected (prevents duplicates)

### 3. Message Type Extension

Extended the `Message` interface to support three roles:

```typescript
interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: Date;
}
```

**Visual Design:**

- **User messages**: Right-aligned, cyan background
- **Assistant messages**: Left-aligned, teal background, markdown support
- **System messages**: Centered, subtle white background, smaller text

## Files Modified

### 1. `src/components/panels/ChatInterface.tsx`

**Changes:**

- Added `useSceneStore` and `usePartData` imports
- Extended `Message` interface with `"system"` role
- Added part context tracking with `prevSelectedRef`
- Implemented system message injection on part selection
- Modified `handleSend` to inject part context into messages
- Added rendering logic for system messages

**Key Functions:**

```typescript
// Part selection effect
useEffect(() => {
  if (selectedPart && selectedPart !== prevSelectedRef.current && partData) {
    const systemMessage: Message = {
      id: `system-${Date.now()}`,
      role: "system",
      content: `"${partData.name}" 부품을 선택했습니다. 궁금한 점을 물어보세요!`,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, systemMessage]);
  }
  prevSelectedRef.current = selectedPart;
}, [selectedPart, partData]);

// Context injection in handleSend
if (partData) {
  contextualMessage = `[현재 선택된 부품: ${partData.name}]
재질: ${partData.material}
${partData.description ? `설명: ${partData.description}` : ""}

질문: ${inputValue.trim()}`;
}
```

### 2. `src/hooks/use-chat-stream.ts`

**Changes:**

- Extended `Message` interface with `"system"` role
- Added `addSystemMessage` function to programmatically add system messages
- Exported `addSystemMessage` in hook return value

**New API:**

```typescript
const { messages, sendMessage, addSystemMessage } = useChatStream(sessionId);

// Add system message
addSystemMessage("Part selected: Crankshaft");
```

## User Experience Flow

### Scenario 1: User selects a part then asks a question

1. User clicks on "Crankshaft" in 3D viewer
2. System message appears: "Crankshaft 부품을 선택했습니다. 궁금한 점을 물어보세요!"
3. User types: "What is this made of?"
4. Chat displays: "What is this made of?" (original message)
5. AI receives enriched context with part details
6. AI responds with part-specific information

### Scenario 2: User asks question with no part selected

1. User types: "How does this engine work?"
2. Chat sends message without part context
3. AI provides general engine information

### Scenario 3: User selects different parts

1. User selects "Piston"
2. System message: "Piston 부품을 선택했습니다..."
3. User selects "Crankshaft"
4. System message: "Crankshaft 부품을 선택했습니다..."
5. Each selection triggers a new notification

## Integration Points

### Data Flow

```
3D Model Click
    ↓
scene-store (setSelectedObject)
    ↓
ChatInterface (useSceneStore)
    ↓
usePartData hook
    ↓
Part context injected into message
    ↓
onSend callback (with enriched message)
    ↓
AI backend
```

### Dependencies

- `useSceneStore`: Provides `selectedObject` state
- `usePartData`: Fetches part details from API
- Part data includes: `name`, `material`, `description`

## Technical Details

### Message ID Generation

- User messages: `${Date.now()}-user`
- Assistant messages: `${Date.now()}-ai`
- System messages: `system-${Date.now()}`

### Context Preservation

The implementation preserves the original user message in the UI while sending the enriched version to the AI. This ensures:

- Clean chat history for users
- Rich context for AI responses
- No confusion about what was actually sent

### Performance Considerations

- Uses `useRef` to track previous selections (prevents re-renders)
- Part data fetching is handled by `usePartData` hook with caching
- System messages only added when part actually changes

## Future Enhancements

1. **Context History**: Track recent part selections for multi-part questions
2. **Context Visualization**: Show active context as a badge or tag
3. **Context Toggle**: Allow users to disable context injection
4. **Smart Context**: Only inject context for relevant questions (using NLP)
5. **Multi-part Context**: Support questions about relationships between parts

## Testing Checklist

- [x] TypeScript compilation passes
- [ ] Build succeeds without errors
- [ ] System message appears when part is selected
- [ ] Context is injected into AI messages
- [ ] User sees original message in chat
- [ ] System messages render correctly (centered, styled)
- [ ] No duplicate system messages on re-selection
- [ ] Context clears when no part is selected

## Code Quality

- No TypeScript errors
- Follows existing code patterns
- Uses proper React hooks (useEffect, useRef)
- Maintains component state correctly
- Proper cleanup and dependency arrays
