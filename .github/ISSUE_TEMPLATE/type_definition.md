---
name: Type Definition Issue
about: Report issues with TypeScript types or ERD mismatches
title: "fix(types): "
labels: types
assignees: ""
---

## Type Issue Description

Describe the type mismatch or error.

## Current Type Definition

```typescript
// Current incorrect type
export interface Example {
  field: string; // Wrong
}
```

## Expected Type Definition

```typescript
// Expected correct type
export interface Example {
  field: string | null; // Correct per ERD
}
```

## ERD Reference

**Table**: [e.g., users, chat_sessions]
**Column**: [e.g., email, title]
**DB Type**: [e.g., varchar nullable, text NOT NULL]

## Files Affected

- `src/types/example.ts`
- `src/components/example/Example.tsx` (if usage needs updating)

## Impact

- [ ] Type safety issue
- [ ] Runtime error risk
- [ ] API integration blocker
- [ ] Other: ******\_\_\_******

## Related Issues

Closes #\_\_\_
