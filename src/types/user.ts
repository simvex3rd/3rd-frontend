/**
 * User type definition based on ERD users table
 *
 * ERD Mapping:
 * - DB: users (snake_case)
 * - TS: User (camelCase)
 *
 * @see docs/TYPE_MAPPING.md for full ERD mapping
 */

/**
 * User entity from database
 * Synced from Clerk authentication system
 */
export interface User {
  /**
   * Clerk user ID (varchar)
   * Format: "user_2N..."
   */
  id: string;

  /**
   * User email address (nullable in DB)
   * Can be null for OAuth providers without email
   */
  email: string | null;

  /**
   * Username
   * Required field in database
   */
  username: string;

  /**
   * Account creation timestamp
   */
  createdAt: Date;

  /**
   * Last login timestamp
   */
  lastLogin: Date;
}

/**
 * User creation payload (for API requests)
 */
export interface CreateUserPayload {
  id: string;
  email: string | null;
  username: string;
}

/**
 * User update payload (for PATCH /api/users/me)
 */
export interface UpdateUserPayload {
  username?: string;
}
