/**
 * Study note type definition based on ERD study_notes table
 *
 * ERD Mapping:
 * - DB: study_notes (snake_case)
 * - TS: StudyNote (camelCase)
 *
 * @see docs/TYPE_MAPPING.md for full ERD mapping
 */

/**
 * Study note entity
 * User's notes on 3D models or specific parts
 */
export interface StudyNote {
  /**
   * Note ID (auto-increment)
   */
  id: number;

  /**
   * User ID (FK: users.id)
   * Clerk user ID format: "user_2N..."
   */
  userId: string;

  /**
   * Model ID (FK: models.id)
   * Required: Note must be associated with a model
   */
  modelId: number;

  /**
   * Part ID (FK: parts.id, nullable)
   * Optional: Note can be about entire model or specific part
   */
  partId: number | null;

  /**
   * Note content (markdown supported, nullable in DB)
   * Can be null if note is just a placeholder
   */
  content: string | null;

  /**
   * Last update timestamp (nullable in DB)
   */
  updatedAt: Date | null;
}

/**
 * Create note payload (for POST /api/notes)
 */
export interface CreateNotePayload {
  modelId: number;
  partId?: number | null;
  content: string;
}

/**
 * Update note payload (for PATCH /api/notes/[id])
 */
export interface UpdateNotePayload {
  content?: string;
  partId?: number | null;
}

/**
 * Note filter options (for GET /api/notes)
 */
export interface NoteFilterOptions {
  modelId?: number;
  partId?: number;
  limit?: number;
  offset?: number;
}
