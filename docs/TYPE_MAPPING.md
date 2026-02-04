# ERD to TypeScript Type Mapping

This document describes the mapping between the PostgreSQL database schema (ERD) and TypeScript type definitions in the frontend.

## Overview

**Database:** PostgreSQL with snake_case naming
**Frontend:** TypeScript with camelCase naming
**Auto-conversion:** Backend should convert snake_case to camelCase in API responses

## Table of Contents

- [Naming Conventions](#naming-conventions)
- [Data Type Mapping](#data-type-mapping)
- [Entity Mappings](#entity-mappings)
  - [Users](#users)
  - [Chat Sessions](#chat-sessions)
  - [Chat Messages](#chat-messages)
  - [Models](#models)
  - [Parts](#parts)
  - [Part Geometries](#part-geometries)
  - [Study Notes](#study-notes)
- [JSONB Field Handling](#jsonb-field-handling)
- [Foreign Key Relationships](#foreign-key-relationships)

---

## Naming Conventions

### Database (PostgreSQL)

```
Table names: snake_case (users, chat_sessions, part_geometries)
Column names: snake_case (user_id, created_at, initial_pos)
```

### TypeScript

```typescript
Interface names: PascalCase (User, ChatSession, PartGeometry)
Property names: camelCase (userId, createdAt, initialPos)
```

### Conversion Rules

| Database        | TypeScript    | Example        |
| --------------- | ------------- | -------------- |
| `users`         | `User`        | Interface name |
| `chat_sessions` | `ChatSession` | Interface name |
| `user_id`       | `userId`      | Property name  |
| `created_at`    | `createdAt`   | Property name  |
| `initial_pos`   | `initialPos`  | Property name  |

---

## Data Type Mapping

### Primitive Types

| PostgreSQL   | TypeScript | Notes                            |
| ------------ | ---------- | -------------------------------- |
| `integer`    | `number`   | Auto-increment IDs, foreign keys |
| `varchar(N)` | `string`   | Text with length limit           |
| `text`       | `string`   | Unlimited text                   |
| `timestamp`  | `Date`     | Date/time (ISO 8601 in JSON)     |
| `boolean`    | `boolean`  | True/false                       |

### Complex Types

| PostgreSQL | TypeScript  | Notes                            |
| ---------- | ----------- | -------------------------------- |
| `jsonb`    | `Object`    | JSON objects (see JSONB section) |
| `NULL`     | `T \| null` | Nullable fields                  |

---

## Entity Mappings

### Users

**Database Table: `users`**

```sql
CREATE TABLE users (
  id varchar PRIMARY KEY,      -- Clerk user ID
  email varchar NOT NULL,
  username varchar,
  created_at timestamp NOT NULL,
  last_login timestamp NOT NULL
);
```

**TypeScript Interface: `User`**

```typescript
// src/types/user.ts
export interface User {
  id: string; // Clerk user ID (format: "user_2N...")
  email: string;
  username: string | null;
  createdAt: Date;
  lastLogin: Date;
}
```

**Field Mapping:**
| Database | TypeScript | Type | Notes |
|----------|-----------|------|-------|
| `id` | `id` | `string` | Clerk user ID |
| `email` | `email` | `string` | Required |
| `username` | `username` | `string \| null` | Nullable |
| `created_at` | `createdAt` | `Date` | Auto timestamp |
| `last_login` | `lastLogin` | `Date` | Updated on login |

---

### Chat Sessions

**Database Table: `chat_sessions`**

```sql
CREATE TABLE chat_sessions (
  id serial PRIMARY KEY,
  user_id varchar NOT NULL REFERENCES users(id),
  model_id integer NOT NULL REFERENCES models(id),
  title varchar NOT NULL,
  last_response_id varchar,
  created_at timestamp NOT NULL
);
```

**TypeScript Interface: `ChatSession`**

```typescript
// src/types/chat.ts
export interface ChatSession {
  id: number;
  userId: string; // FK: users.id
  modelId: number; // FK: models.id
  title: string;
  lastResponseId: string | null;
  createdAt: Date;
}
```

**Field Mapping:**
| Database | TypeScript | Type | Notes |
|----------|-----------|------|-------|
| `id` | `id` | `number` | Auto-increment |
| `user_id` | `userId` | `string` | FK to users |
| `model_id` | `modelId` | `number` | FK to models |
| `title` | `title` | `string` | Session title |
| `last_response_id` | `lastResponseId` | `string \| null` | Nullable |
| `created_at` | `createdAt` | `Date` | Auto timestamp |

---

### Chat Messages

**Database Table: `chat_messages`**

```sql
CREATE TABLE chat_messages (
  id serial PRIMARY KEY,
  session_id integer NOT NULL REFERENCES chat_sessions(id),
  role varchar NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  created_at timestamp NOT NULL
);
```

**TypeScript Interface: `ChatMessage`**

```typescript
// src/types/chat.ts
export interface ChatMessage {
  id: number;
  sessionId: number; // FK: chat_sessions.id
  role: "user" | "assistant" | "system";
  content: string;
  createdAt: Date;
}
```

**Field Mapping:**
| Database | TypeScript | Type | Notes |
|----------|-----------|------|-------|
| `id` | `id` | `number` | Auto-increment |
| `session_id` | `sessionId` | `number` | FK to chat_sessions |
| `role` | `role` | `'user' \| 'assistant' \| 'system'` | Enum type |
| `content` | `content` | `string` | Message text |
| `created_at` | `createdAt` | `Date` | Auto timestamp |

---

### Models

**Database Table: `models`**

```sql
CREATE TABLE models (
  id serial PRIMARY KEY,
  name varchar NOT NULL,
  description text,
  thumbnail_url varchar,
  file_url varchar
);
```

**TypeScript Interface: `Model`**

```typescript
// src/types/model.ts (existing)
export interface Model {
  id: number;
  name: string;
  description: string | null;
  thumbnailUrl: string | null;
  fileUrl: string | null;
}
```

**Field Mapping:**
| Database | TypeScript | Type | Notes |
|----------|-----------|------|-------|
| `id` | `id` | `number` | Auto-increment |
| `name` | `name` | `string` | Model name |
| `description` | `description` | `string \| null` | Nullable |
| `thumbnail_url` | `thumbnailUrl` | `string \| null` | Image URL |
| `file_url` | `fileUrl` | `string \| null` | GLB file URL |

---

### Parts

**Database Table: `parts`**

```sql
CREATE TABLE parts (
  id serial PRIMARY KEY,
  model_id integer NOT NULL REFERENCES models(id),
  name varchar NOT NULL,
  description text,
  material varchar,
  metadata jsonb
);
```

**TypeScript Interface: `Part`**

```typescript
// src/types/model.ts (existing)
export interface Part {
  id: number;
  modelId: number; // FK: models.id
  name: string;
  description: string | null;
  material: string | null;
  metadata: PartMetadata;
}

export interface PartMetadata {
  weight?: string;
  manufacturer?: string;
  partNumber?: string;
  tolerance?: string;
  [key: string]: unknown; // Extensible
}
```

**Field Mapping:**
| Database | TypeScript | Type | Notes |
|----------|-----------|------|-------|
| `id` | `id` | `number` | Auto-increment |
| `model_id` | `modelId` | `number` | FK to models |
| `name` | `name` | `string` | Part name |
| `description` | `description` | `string \| null` | Nullable |
| `material` | `material` | `string \| null` | Nullable |
| `metadata` | `metadata` | `PartMetadata` | JSONB (see below) |

---

### Part Geometries

**Database Table: `part_geometries`**

```sql
CREATE TABLE part_geometries (
  id serial PRIMARY KEY,
  part_id integer NOT NULL REFERENCES parts(id),
  initial_pos jsonb NOT NULL,      -- {x, y, z}
  initial_rot jsonb NOT NULL,      -- {x, y, z, w}
  initial_scale jsonb NOT NULL,    -- {x, y, z}
  exploded_pos jsonb NOT NULL      -- {x, y, z}
);
```

**TypeScript Interface: `PartGeometry`**

```typescript
// src/types/model.ts (existing)
export interface PartGeometry {
  id: number;
  partId: number; // FK: parts.id
  initialPos: Vector3;
  initialRot: Vector4;
  initialScale: Vector3;
  explodedPos: Vector3;
}

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;
}
```

**Field Mapping:**
| Database | TypeScript | Type | Notes |
|----------|-----------|------|-------|
| `id` | `id` | `number` | Auto-increment |
| `part_id` | `partId` | `number` | FK to parts |
| `initial_pos` | `initialPos` | `Vector3` | JSONB → Object |
| `initial_rot` | `initialRot` | `Vector4` | JSONB → Object (quaternion) |
| `initial_scale` | `initialScale` | `Vector3` | JSONB → Object |
| `exploded_pos` | `explodedPos` | `Vector3` | JSONB → Object |

---

### Study Notes

**Database Table: `study_notes`**

```sql
CREATE TABLE study_notes (
  id serial PRIMARY KEY,
  user_id varchar NOT NULL REFERENCES users(id),
  model_id integer NOT NULL REFERENCES models(id),
  part_id integer REFERENCES parts(id),
  content text NOT NULL,
  updated_at timestamp NOT NULL
);
```

**TypeScript Interface: `StudyNote`**

```typescript
// src/types/note.ts
export interface StudyNote {
  id: number;
  userId: string; // FK: users.id
  modelId: number; // FK: models.id
  partId: number | null; // FK: parts.id (nullable)
  content: string;
  updatedAt: Date;
}
```

**Field Mapping:**
| Database | TypeScript | Type | Notes |
|----------|-----------|------|-------|
| `id` | `id` | `number` | Auto-increment |
| `user_id` | `userId` | `string` | FK to users |
| `model_id` | `modelId` | `number` | FK to models |
| `part_id` | `partId` | `number \| null` | Optional FK to parts |
| `content` | `content` | `string` | Markdown text |
| `updated_at` | `updatedAt` | `Date` | Last modified |

---

## JSONB Field Handling

### Vector3 (Position, Scale)

**Database (JSONB):**

```json
{
  "x": 0,
  "y": 0,
  "z": 0
}
```

**TypeScript:**

```typescript
export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

// Usage
const position: Vector3 = { x: 0, y: 0, z: 0 };
```

---

### Vector4 (Rotation Quaternion)

**Database (JSONB):**

```json
{
  "x": 0,
  "y": 0,
  "z": 0,
  "w": 1
}
```

**TypeScript:**

```typescript
export interface Vector4 {
  x: number;
  y: number;
  z: number;
  w: number;
}

// Usage
const rotation: Vector4 = { x: 0, y: 0, z: 0, w: 1 };
```

---

### PartMetadata (Extensible Object)

**Database (JSONB):**

```json
{
  "weight": "12.5kg",
  "manufacturer": "SIMVEX",
  "partNumber": "CRK-001",
  "tolerance": "±0.01mm"
}
```

**TypeScript:**

```typescript
export interface PartMetadata {
  weight?: string;
  manufacturer?: string;
  partNumber?: string;
  tolerance?: string;
  [key: string]: unknown; // Allow additional fields
}

// Usage
const metadata: PartMetadata = {
  weight: "12.5kg",
  manufacturer: "SIMVEX",
  customField: "customValue", // Extensible
};
```

---

## Foreign Key Relationships

### Entity Relationship Diagram (ERD)

```
users (id varchar)
  ↓ 1:N
chat_sessions (user_id → users.id)
  ↓ 1:N
chat_messages (session_id → chat_sessions.id)

models (id integer)
  ↓ 1:N
parts (model_id → models.id)
  ↓ 1:1
part_geometries (part_id → parts.id)

users (id varchar)
  ↓ 1:N
study_notes (user_id → users.id)
  ↑
  └─ model_id → models.id
  └─ part_id → parts.id (nullable)
```

### TypeScript Relationships

**1. User → Chat Sessions**

```typescript
// One user has many chat sessions
interface User {
  id: string;
  // ... other fields
}

interface ChatSession {
  userId: string; // FK: User.id
  // ... other fields
}
```

**2. Chat Session → Messages**

```typescript
// One session has many messages
interface ChatSession {
  id: number;
  // ... other fields
}

interface ChatMessage {
  sessionId: number; // FK: ChatSession.id
  // ... other fields
}
```

**3. Model → Parts → Geometries**

```typescript
// One model has many parts
interface Model {
  id: number;
  // ... other fields
}

interface Part {
  modelId: number; // FK: Model.id
  // ... other fields
}

// One part has one geometry
interface PartGeometry {
  partId: number; // FK: Part.id
  // ... other fields
}
```

**4. Study Notes (Multiple FKs)**

```typescript
// Study note belongs to user, model, and optionally part
interface StudyNote {
  userId: string; // FK: User.id
  modelId: number; // FK: Model.id
  partId: number | null; // FK: Part.id (optional)
  // ... other fields
}
```

---

## API Response Format

All API endpoints should return data in camelCase, wrapped in a standard response:

```typescript
// Success response
{
  "success": true,
  "data": {
    "id": 1,
    "userId": "user_2N...",
    "modelId": 1,
    "title": "Learning Crankshaft",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}

// Error response
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Chat session not found"
  }
}
```

**See `src/types/api.ts` for full API type definitions.**

---

## Conversion Utilities (Backend)

Backend should implement automatic snake_case ↔ camelCase conversion:

**Example (Node.js):**

```typescript
// Backend utility
function toCamelCase(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    result[camelKey] = value;
  }
  return result;
}

// Usage in API route
const dbRow = await db.query("SELECT * FROM users WHERE id = $1", [userId]);
const response = toCamelCase(dbRow); // user_id → userId
return res.json({ success: true, data: response });
```

---

## Date Handling

**Database:** PostgreSQL `timestamp` (UTC)
**API Response:** ISO 8601 string (e.g., `"2024-01-15T10:30:00Z"`)
**TypeScript:** `Date` object

**Backend:**

```typescript
// Convert Date to ISO string before sending
const response = {
  createdAt: new Date(dbRow.created_at).toISOString(),
};
```

**Frontend:**

```typescript
// Parse ISO string to Date
const data: ApiResponse<User> = await fetch("/api/users/me").then((r) =>
  r.json()
);
const user: User = {
  ...data.data,
  createdAt: new Date(data.data.createdAt),
  lastLogin: new Date(data.data.lastLogin),
};
```

---

## Summary

| Concept          | Database                   | TypeScript           |
| ---------------- | -------------------------- | -------------------- |
| **Naming**       | snake_case                 | camelCase            |
| **Tables**       | users, chat_sessions       | User, ChatSession    |
| **Primary Keys** | `id` (integer/varchar)     | `id` (number/string) |
| **Foreign Keys** | `user_id`                  | `userId`             |
| **JSONB**        | `{"x": 0, "y": 0, "z": 0}` | `Vector3` interface  |
| **Timestamps**   | `timestamp` → ISO string   | `Date` object        |
| **Nullability**  | `NULL`                     | `T \| null`          |

**Key Files:**

- `src/types/user.ts` - User type
- `src/types/chat.ts` - ChatSession, ChatMessage
- `src/types/note.ts` - StudyNote
- `src/types/model.ts` - Model, Part, PartGeometry (existing)
- `src/types/api.ts` - API response wrappers

**Next Steps:**

1. Backend team implements snake_case → camelCase conversion
2. Frontend fetches data and validates with TypeScript types
3. Use `zod` for runtime validation if needed
