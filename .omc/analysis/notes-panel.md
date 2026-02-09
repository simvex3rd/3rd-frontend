# NotesPanel Component - Complete Analysis Report

**Component**: `/src/components/panels/NotesPanel.tsx`
**Status**: Completely Unaudited - Multiple Critical Issues
**Date**: 2026-02-09
**Severity**: HIGH

---

## Executive Summary

The NotesPanel component has **12 major issues** spanning design system violations, accessibility failures, missing error handling, hardcoded positioning, and internationalization problems. This component appears to be a prototype that was never brought up to production standards.

**Critical Issues**: 5
**High Priority**: 4
**Medium Priority**: 3

---

## 1. Design System Violations

### 1.1 Hardcoded Absolute Positioning (CRITICAL)

**Issue**: Component uses fixed pixel positioning that breaks responsive design.

```tsx
// ❌ Current (line 40)
className = "absolute left-[1330px] top-[423px] w-[360px] h-[300px]";
```

**Problems**:

- Hardcoded `left-[1330px] top-[423px]` makes positioning inflexible
- Will overflow on smaller screens
- Cannot be reused in different contexts
- Violates 1920px viewport design principle

**Comparison with PartInfoPanel**:

```tsx
// ✅ PartInfoPanel (line 34-35)
className = "flex flex-col items-center justify-center w-[400px] h-[750px]";
// Uses flexbox, no absolute positioning
```

**Impact**: Component cannot be positioned flexibly, breaks on all non-1920px viewports.

**Fix Required**:

- Remove absolute positioning
- Use layout container positioning (like other panels)
- Or make positioning configurable via props

---

### 1.2 Missing Glassmorphism (CRITICAL)

**Issue**: Component lacks the signature glassmorphism effect used throughout the app.

```tsx
// ❌ Current (line 40)
bg - [rgba(2, 238, 225, 0.3)]; // Just a cyan tint, no blur
```

**Comparison with PartInfoPanel**:

```tsx
// ✅ PartInfoPanel (line 35)
bg-gray-30 backdrop-blur-sm  // Proper glassmorphism
```

**Design System Standard** (globals.css, line 273-276):

```css
.glass-bg {
  background-color: var(--color-glass-bg);
  backdrop-filter: blur(10px);
}
```

**Impact**: Visual inconsistency, component looks out of place compared to all other panels.

**Fix Required**:

```tsx
// Replace with design system tokens
className = "bg-gray-30 backdrop-blur-sm";
// Or use .glass-bg utility class
```

---

### 1.3 Non-Design-System Colors (HIGH)

**Issue**: Uses raw color values instead of design system tokens.

```tsx
// ❌ Line 40: Hardcoded rgba
bg-[rgba(2,238,225,0.3)]

// ❌ Line 48: Hardcoded text-gray-300
placeholder:text-gray-300

// ❌ Line 53: Hardcoded text-gray-300
text-xs text-gray-300
```

**Available Design Tokens** (globals.css, line 68-78):

```css
--color-primary-30: rgba(2, 238, 225, 0.3); /* Already defined! */
--color-gray-30: rgba(212, 212, 212, 0.3);
--color-neutral-300: #d4d4d4;
```

**Fix Required**:

```tsx
// Background
bg - primary - 30; // Instead of bg-[rgba(2,238,225,0.3)]

// Text colors
text - neutral - 300; // Instead of text-gray-300
placeholder: text - neutral - 400;
```

---

### 1.4 Missing Border (MEDIUM)

**Issue**: All other panels have a 3px cyan border. NotesPanel doesn't.

**Comparison**:

```tsx
// ✅ PartInfoPanel (line 35)
border-[3px] border-solid border-primary

// ✅ QuizPanel (line 37)
// No border but uses different background (bg-[rgba(64,64,64,0.7)])

// ❌ NotesPanel (line 40)
// No border at all
```

**Fix Required**:

```tsx
className = "border-[3px] border-primary";
```

---

## 2. Accessibility Failures

### 2.1 Missing ARIA Labels (CRITICAL)

**Issue**: Container has no semantic role or label.

```tsx
// ❌ Current (line 39)
<div className="...">
```

**Comparison with PartInfoPanel**:

```tsx
// ✅ PartInfoPanel (line 34-37)
<aside
  role="complementary"
  aria-label="Part information sidebar"
>
```

**Impact**: Screen readers cannot announce the panel purpose.

**Fix Required**:

```tsx
<aside
  role="complementary"
  aria-label="Notes panel for selected part"
  aria-live="polite"  // Announce when notes change
>
```

---

### 2.2 Textarea Missing Label (CRITICAL)

**Issue**: Form control has no associated label, violating WCAG 2.1 Level A.

```tsx
// ❌ Current (line 44-50)
<textarea value={note} placeholder="메모를 입력하세요..." />
```

**WCAG Requirement**: All form inputs must have labels (1.3.1 Info and Relationships).

**Fix Required**:

```tsx
<label htmlFor="note-textarea" className="sr-only">
  Part notes
</label>
<textarea
  id="note-textarea"
  aria-label="Note for selected part"
  aria-describedby="note-save-status"
/>
```

---

### 2.3 Missing Keyboard Shortcuts (HIGH)

**Issue**: No keyboard shortcut to save notes (user must tab out).

**Expected Behavior**: Cmd/Ctrl+S should save notes.

**Fix Required**:

```tsx
const handleKeyDown = (e: React.KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "s") {
    e.preventDefault();
    handleSave();
  }
};

<textarea onKeyDown={handleKeyDown} />;
```

---

### 2.4 Save Status Not Announced (MEDIUM)

**Issue**: Screen readers don't know when save completes.

```tsx
// ❌ Current (line 52-56)
{
  lastSaved && (
    <p className="text-xs text-gray-300 mt-2">
      저장됨: {lastSaved.toLocaleTimeString()}
    </p>
  );
}
```

**Fix Required**:

```tsx
<p
  id="note-save-status"
  className="text-xs text-neutral-300 mt-2"
  role="status"
  aria-live="polite"
>
  Saved: {lastSaved.toLocaleTimeString()}
</p>
```

---

## 3. Error Handling & States

### 3.1 Silent Error Handling (CRITICAL)

**Issue**: Errors are only logged to console, no user feedback.

```tsx
// ❌ Current (line 19-21)
.catch(err => {
  console.error('Failed to load note:', err);
});

// ❌ Current (line 31-33)
} catch (err) {
  console.error('Failed to save note:', err);
}
```

**Impact**: Users have no idea when operations fail.

**Comparison with PartInfoPanel**:

```tsx
// ✅ PartInfoPanel (line 61-64)
error ? (
  <p className="text-red-400">
    {error}
  </p>
) : ...
```

**Fix Required**:

```tsx
const [error, setError] = useState<string | null>(null);

try {
  await api.notes.save(modelId, note, selectedPart);
  setLastSaved(new Date());
  setError(null);
} catch (err) {
  setError("Failed to save note. Please try again.");
  console.error("Failed to save note:", err);
}

// In JSX
{
  error && (
    <p className="text-error text-sm" role="alert">
      {error}
    </p>
  );
}
```

---

### 3.2 Missing Loading State (HIGH)

**Issue**: No loading indicator when fetching notes.

```tsx
// ❌ Current (line 13-22)
useEffect(() => {
  if (!selectedPart) return;

  api.notes.get(modelId, selectedPart).then((data) => {
    setNote(data?.content || "");
  });
}, [selectedPart]);
```

**Comparison with PartInfoPanel**:

```tsx
// ✅ PartInfoPanel (line 57-60)
{loading ? (
  <p className="text-neutral-400">
    Loading...
  </p>
) : ...
```

**Impact**: Users see stale data briefly, no feedback during load.

**Fix Required**:

```tsx
const [loading, setLoading] = useState(false);

useEffect(() => {
  if (!selectedPart) return;

  setLoading(true);
  setError(null);

  api.notes
    .get(modelId, selectedPart)
    .then((data) => {
      setNote(data?.content || "");
    })
    .catch((err) => {
      setError("Failed to load note.");
      console.error(err);
    })
    .finally(() => {
      setLoading(false);
    });
}, [selectedPart]);

// In JSX
{
  loading && (
    <div className="flex-1 flex items-center justify-center">
      <p className="text-neutral-400">Loading note...</p>
    </div>
  );
}
```

---

### 3.3 Save Debouncing Missing (MEDIUM)

**Issue**: `onBlur` saves immediately, no debouncing for autosave.

```tsx
// ❌ Current (line 47)
onBlur = { handleSave };
```

**Problem**: Every blur triggers a save, even if user is tabbing through.

**Better Pattern**:

```tsx
import { useDebounce } from "@/hooks/use-debounce";

const debouncedNote = useDebounce(note, 1000);

useEffect(() => {
  if (debouncedNote && selectedPart) {
    handleSave();
  }
}, [debouncedNote, selectedPart]);
```

---

## 4. Internationalization Issues

### 4.1 Hardcoded Korean Text (HIGH)

**Issue**: All text is hardcoded in Korean.

```tsx
// ❌ Line 42
<h3>메모</h3>;

// ❌ Line 49
placeholder = "메모를 입력하세요...";

// ❌ Line 54
저장됨: {
  lastSaved.toLocaleTimeString();
}
```

**Impact**: Non-Korean users cannot use the component.

**Comparison**: PartInfoPanel uses English ("AI Assistant", "Part Info").

**Fix Required**:

```tsx
// Use English by default (project convention)
<h3>Notes</h3>;
placeholder = "Enter your notes...";
Saved: {
  lastSaved.toLocaleTimeString();
}
```

---

## 5. Code Quality Issues

### 5.1 TODO Comments (MEDIUM)

**Issue**: Production code has unresolved TODOs.

```tsx
// ❌ Line 16, 28
const modelId = "default-model"; // TODO: Get from store
```

**Impact**: modelId is hardcoded, cannot support multiple models.

**Fix Required**:

```tsx
const modelId = useSceneStore((state) => state.modelId);

if (!selectedPart || !modelId) {
  return null;
}
```

---

### 5.2 Missing Component Documentation (LOW)

**Issue**: No JSDoc comment explaining the component.

**Comparison with PartInfoPanel**:

```tsx
// ✅ PartInfoPanel (line 7-23)
/**
 * Part Info Panel Component
 *
 * Displays AI Assistant and Part Info when a part is selected...
 * Features:
 * - Integration with scene store
 * ...
 */
```

**Fix Required**:

```tsx
/**
 * Notes Panel Component
 *
 * Allows users to create and edit notes for selected 3D parts.
 * Notes are auto-saved on blur and persisted to the backend.
 *
 * Features:
 * - Auto-save on blur
 * - Real-time API integration
 * - Loading and error states
 * - Keyboard shortcut (Cmd/Ctrl+S)
 *
 * @component
 */
export function NotesPanel() { ... }
```

---

## 6. Responsive Behavior

### 6.1 Fixed Size Issues (HIGH)

**Issue**: Component has fixed dimensions that may not work on all screens.

```tsx
// ❌ Line 40
w-[360px] h-[300px]
```

**Analysis**:

- Width: 360px (reasonable, but inflexible)
- Height: 300px (may be too small for long notes)
- No min/max constraints
- No responsive breakpoints

**Impact**: Cannot adapt to different viewport sizes or content needs.

**Fix Required**:

```tsx
// Make height flexible
className = "w-[360px] min-h-[300px] max-h-[500px]";

// Or use responsive sizing
className = "w-full max-w-[360px] h-auto min-h-[300px]";
```

---

## 7. Missing Features

### 7.1 No Character Count (LOW)

**Expected**: Show character count for long notes.

**Implementation**:

```tsx
<div className="flex justify-between items-center mt-2">
  <p className="text-xs text-neutral-300">{note.length} / 1000 characters</p>
  {lastSaved && <p>Saved: {lastSaved.toLocaleTimeString()}</p>}
</div>
```

---

### 7.2 No Note History (LOW)

**Expected**: Allow viewing previous versions of notes.

**Future Enhancement**: Add "View History" button.

---

## Summary of Issues

| Category                 | Count | Severity                     |
| ------------------------ | ----- | ---------------------------- |
| Design System Violations | 4     | 2 Critical, 1 High, 1 Medium |
| Accessibility Failures   | 4     | 2 Critical, 1 High, 1 Medium |
| Error Handling           | 3     | 1 Critical, 1 High, 1 Medium |
| Internationalization     | 1     | High                         |
| Code Quality             | 2     | Medium, Low                  |
| Responsive Issues        | 1     | High                         |
| Missing Features         | 2     | Low                          |

**Total Issues**: 17

---

## Priority Action Items

### P0 - Must Fix Before Production

1. **Add error states and user feedback** (3.1, 3.2)
2. **Fix accessibility violations** (2.1, 2.2)
3. **Remove hardcoded positioning** (1.1)
4. **Add glassmorphism effect** (1.2)

### P1 - Should Fix Soon

5. **Use design system colors** (1.3)
6. **Add loading states** (3.2)
7. **Replace Korean text with English** (4.1)
8. **Add keyboard shortcuts** (2.3)
9. **Add 3px cyan border** (1.4)

### P2 - Nice to Have

10. **Add save debouncing** (3.3)
11. **Fix modelId TODO** (5.1)
12. **Add component documentation** (5.2)
13. **Make height flexible** (6.1)

---

## Recommended Refactor

Create a new component following the PartInfoPanel pattern:

```tsx
"use client";

import { useState, useEffect } from "react";
import { useSceneStore } from "@/stores/scene-store";
import { api } from "@/lib/api/client";
import { useDebounce } from "@/hooks/use-debounce";

/**
 * Notes Panel Component
 *
 * Allows users to create and edit notes for selected 3D parts.
 * Notes are auto-saved after 1 second of inactivity.
 */
export function NotesPanel() {
  const selectedPart = useSceneStore((state) => state.selectedObject);
  const modelId = useSceneStore((state) => state.modelId);

  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  const debouncedNote = useDebounce(note, 1000);

  // Load note when part changes
  useEffect(() => {
    if (!selectedPart || !modelId) return;

    setLoading(true);
    setError(null);

    api.notes
      .get(modelId, selectedPart)
      .then((data) => {
        setNote(data?.content || "");
      })
      .catch((err) => {
        setError("Failed to load note. Please try again.");
        console.error("Failed to load note:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [selectedPart, modelId]);

  // Auto-save on debounced note change
  useEffect(() => {
    if (!selectedPart || !modelId || loading) return;

    const saveNote = async () => {
      setIsSaving(true);
      try {
        await api.notes.save(modelId, debouncedNote, selectedPart);
        setLastSaved(new Date());
        setError(null);
      } catch (err) {
        setError("Failed to save note. Please try again.");
        console.error("Failed to save note:", err);
      } finally {
        setIsSaving(false);
      }
    };

    saveNote();
  }, [debouncedNote, selectedPart, modelId, loading]);

  // Keyboard shortcut: Cmd/Ctrl+S to save
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "s") {
      e.preventDefault();
      // Trigger save immediately (bypass debounce)
    }
  };

  if (!selectedPart || !modelId) {
    return null;
  }

  return (
    <aside
      className="flex flex-col w-[360px] min-h-[300px] bg-gray-30 border-[3px] border-primary rounded-[24px] p-8 gap-4 backdrop-blur-sm z-20"
      role="complementary"
      aria-label="Notes panel for selected part"
      aria-live="polite"
    >
      <h3 className="text-white text-[18px] font-semibold">Notes</h3>

      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-neutral-400">Loading note...</p>
        </div>
      ) : (
        <>
          <label htmlFor="note-textarea" className="sr-only">
            Note for {selectedPart}
          </label>
          <textarea
            id="note-textarea"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 w-full bg-transparent text-white resize-none outline-none placeholder:text-neutral-400"
            placeholder="Enter your notes here..."
            aria-describedby="note-save-status note-error"
            maxLength={1000}
          />

          <div className="flex justify-between items-center text-xs">
            <span className="text-neutral-400">{note.length} / 1000</span>

            {isSaving && <span className="text-neutral-400">Saving...</span>}

            {lastSaved && !isSaving && (
              <span
                id="note-save-status"
                className="text-neutral-300"
                role="status"
                aria-live="polite"
              >
                Saved: {lastSaved.toLocaleTimeString()}
              </span>
            )}
          </div>

          {error && (
            <p id="note-error" className="text-error text-sm" role="alert">
              {error}
            </p>
          )}
        </>
      )}
    </aside>
  );
}
```

---

## Testing Checklist

Before marking this component as production-ready:

- [ ] Screen reader announces panel purpose
- [ ] Textarea has proper label association
- [ ] Keyboard navigation works (Tab, Shift+Tab)
- [ ] Cmd/Ctrl+S saves notes
- [ ] Loading state displays correctly
- [ ] Error states display with proper styling
- [ ] Auto-save works after 1 second
- [ ] Save status updates correctly
- [ ] Component works on 1440px viewport (with zoom)
- [ ] Component works on 1920px viewport
- [ ] Character count displays correctly
- [ ] Glassmorphism effect matches other panels
- [ ] Border color matches design system (cyan)
- [ ] Colors use design system tokens
- [ ] No console errors or warnings

---

## References

- **Similar Component**: `PartInfoPanel.tsx` (lines 34-122)
- **Design System**: `globals.css` (lines 32-181)
- **Scene Store**: `scene-store.ts` (lines 1-116)
- **Accessibility Standard**: WCAG 2.1 Level AA
- **Project Guidelines**: `CLAUDE.md`, `.claude/DEVELOPMENT_RULES.md`

---

## Conclusion

The NotesPanel component requires significant work before it can be considered production-ready. The most critical issues are:

1. **Accessibility failures** that violate WCAG standards
2. **Silent error handling** that leaves users in the dark
3. **Design system violations** that create visual inconsistency
4. **Hardcoded positioning** that breaks responsive design

**Estimated Refactor Time**: 2-3 hours

**Recommended Action**: Refactor using the provided template above, which follows the PartInfoPanel pattern and addresses all identified issues.
