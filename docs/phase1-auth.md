# Phase 1: Auth Pages Structure Analysis

## Overview

The authentication flow consists of two pages: Login and Signup. Both pages follow a consistent vertical layout pattern with a centered form approach on a dark background (#171717). The design is mobile-first with a fixed container width, using rounded corners and a modern, minimal aesthetic.

**Key Design Characteristics:**

- **Dark theme**: Background color #171717 (neutral-900 equivalent)
- **Accent color**: Bright cyan #02eee1 for primary actions
- **Typography**: Pretendard font family (Korean/Latin support)
- **Form pattern**: Centered vertical stack with consistent spacing
- **Mobile-optimized**: Fixed container with padding for responsive behavior

**Flow Pattern:**

- Login → Forgot password → Password recovery
- Login → Create account → Signup
- Signup → Login (if account exists)

## Page: Login - node-id: 160-1146

### Layout Structure

The Login page uses a **centered vertical container** with the following hierarchy:

```
Container (rounded-24, dark bg)
├── Title: "로그인" (centered)
├── Form Section
│   ├── Login Form
│   │   ├── Email Field (labeled "Lable")
│   │   ├── Password Field (labeled "Lable")
│   │   └── Forgot Password Link (right-aligned)
│   └── Button Group
│       ├── Primary Button: "로그인" (filled cyan)
│       └── Secondary Button: "계정 만들기" (outlined cyan)
```

**Layout Type:** Single-column centered form with full-width elements

### Form Structure

1. **Email Input Field** (node-id: 160:945)
   - Component: InputField
   - Type: Text input (email)
   - Label: "Lable" (placeholder - actual: "이메일")
   - Placeholder: "이메일을 입력하세요"
   - Icon: Search icon (right-side, 24px) - likely to be replaced with visibility toggle for password

2. **Password Input Field** (node-id: 160:955)
   - Component: InputField
   - Type: Password input
   - Label: "Lable" (placeholder - actual: "비밀번호")
   - Placeholder: "비밀번호를 입력하세요"
   - Icon: Search icon (right-side, 24px) - likely visibility toggle

3. **Forgot Password Link** (node-id: 160:1109)
   - Component: ALinkButton
   - Text: "아이디/비밀번호 찾기"
   - Position: Right-aligned below password field
   - Style: Secondary text color (#e5e5e5)

4. **Login Button** (node-id: 160:1087)
   - Component: Button (primary variant)
   - Text: "로그인"
   - Style: Filled with accent color (#02eee1)

5. **Create Account Button** (node-id: 160:1093)
   - Component: Button (outline variant)
   - Text: "계정 만들기"
   - Style: Outlined with accent color border (2px)

### Dimensions

| Area                           | Absolute (px)   | Ratio         | Tailwind Mapping      |
| ------------------------------ | --------------- | ------------- | --------------------- |
| Page Container                 | 375 x 812       | 100% (mobile) | w-full h-screen       |
| Form Container                 | 311 x ~600      | 82.9% width   | max-w-sm mx-auto px-8 |
| Container Padding              | 32px horizontal | 8.5%          | px-8                  |
| Container Padding              | 80px vertical   | 9.9%          | py-20                 |
| Title to Form Gap              | 80px            | -             | gap-20                |
| Form to Buttons Gap            | 16px            | -             | gap-4                 |
| Between Buttons Gap            | 4px             | -             | gap-1                 |
| Input Field Height             | 40px            | -             | h-10                  |
| Input Field Padding            | 12px            | -             | p-3                   |
| Button Height                  | 40px            | -             | h-10                  |
| Border Radius (container)      | 24px            | -             | rounded-3xl           |
| Border Radius (inputs/buttons) | 8px             | -             | rounded-lg            |
| Icon Size                      | 24px            | -             | w-6 h-6               |

**Responsive Scaling:**

- Design base: 375px mobile viewport
- Container: 311px (375 - 32\*2)
- For 1920px desktop: Scale proportionally or use max-width constraint

### Colors & Styling

**Background Colors:**

- Page background: `#171717` (var(--color/bg/primary)) → `bg-neutral-900`
- Input background: `white` → `bg-white`
- Primary button background: `#02eee1` (var(--color/bg/interactive/primary)) → `bg-cyan-400` custom
- Secondary button background: `transparent`

**Text Colors:**

- Title: `#fafafa` (var(--color/text/primary)) → `text-neutral-50`
- Labels: `#e5e5e5` (var(--color/text/secondary)) → `text-neutral-200`
- Placeholder: `#737373` (var(--color/text/teritary)) → `text-neutral-500`
- Link: `#e5e5e5` (var(--color/text/secondary)) → `text-neutral-200`
- Button text (primary): `white` → `text-white`
- Button text (secondary): `#02eee1` → `text-cyan-400`

**Border Colors:**

- Input border: `#d4d4d4` (var(--color/icon/teritary)) → `border-neutral-300`
- Button border: `#02eee1` (2px) → `border-2 border-cyan-400`

**Typography:**

- Title: Pretendard SemiBold, 24px, line-height 1.25 → `text-2xl font-semibold leading-tight`
- Body (labels/links): Pretendard Medium, 16px, line-height 1.5 → `text-base font-medium leading-6`
- Input text: Pretendard Regular, 16px, line-height 1.5 → `text-base font-normal leading-6`

### Component Placeholders

**Order from top to bottom:**

1. **Position: Title** → `<h1>` or heading component
   - Text: "로그인"
   - Styling: heading/sm typography style

2. **Position: Form Field 1** → `InputField` component
   - Label: "이메일"
   - Type: email
   - Placeholder: "이메일을 입력하세요"
   - Icon position: right (search icon - should be replaced contextually)

3. **Position: Form Field 2** → `InputField` component
   - Label: "비밀번호"
   - Type: password
   - Placeholder: "비밀번호를 입력하세요"
   - Icon: Eye icon for password visibility toggle

4. **Position: Below password field, right-aligned** → `ALinkButton` component
   - Text: "아이디/비밀번호 찾기"
   - Action: Navigate to password recovery

5. **Position: Button Group Item 1** → `Button` component (primary)
   - Text: "로그인"
   - Variant: filled
   - Action: Submit form

6. **Position: Button Group Item 2** → `Button` component (outline)
   - Text: "계정 만들기"
   - Variant: outline
   - Action: Navigate to signup page

### Special Behaviors

**Form Validation UI Hints:**

- Input fields have border styling (currently neutral-300)
- Error states likely use red border color
- No visible error message containers in current design
- Success/error feedback probably via toast/alert components

**Error States:**

- Input error: Red border color (not specified in design, standard pattern)
- Error message: Would appear below field (not shown in design)
- Form-level errors: Likely displayed at top of form

**Loading States:**

- Login button: Disabled state during submission
- Loading spinner: Likely appears inside button (text replacement)
- Button background: Same color but possibly with opacity

**Focus States:**

- Input fields: Border color change (probably to accent color #02eee1)
- Focus ring: Standard focus-visible ring pattern

**Interactive States:**

- Hover on buttons: Slight color variation (lighter/darker)
- Hover on link: Underline or color change
- Active/pressed: Scale down or darken effect

### z-index Layering

**Current design shows no overlays**, but typical patterns:

- Base layer: Form container (z-0)
- Input icons: Inside input container (z-10)
- Error messages: Above form elements (z-20)
- Loading overlay: Covers form during submission (z-30)
- Toast notifications: Top layer (z-50)

### Screenshot

Path: docs/screenshots/auth-login.png (displayed in Figma MCP tool output)

---

## Page: Signup - node-id: 175-748

### Layout Structure

The Signup page uses the **same centered vertical container** pattern as Login but with more complex form structure:

```
Container (rounded-24, dark bg)
├── Title: "계정 만들기" (centered)
├── Form Section
│   ├── Header Section
│   │   ├── Text: "이전에 생성한 계정이 있으신가요?"
│   │   └── Login Link (inline, underlined)
│   ├── Name Fields (horizontal row)
│   │   ├── First Name Field: "성"
│   │   └── Last Name Field: "이름"
│   ├── Email & Password Stack
│   │   ├── Email Field
│   │   └── Password Fields Group
│   │       ├── Password Field
│   │       └── Password Confirm Field (with help message)
│   └── Submit Button: "계정 만들기" (filled cyan)
```

**Layout Type:** Single-column with mixed horizontal/vertical arrangements

### Form Structure

1. **Pre-form Header** (node-id: 175:724)
   - Component: Text + ALinkButton (inline)
   - Text: "이전에 생성한 계정이 있으신가요?"
   - Link: "로그인" (underlined)
   - Position: Above form fields

2. **First Name Input** (node-id: 175:694) - **LEFT side of horizontal pair**
   - Component: InputField
   - Label: "Lable" (actual: "성")
   - Placeholder: "성"
   - Layout: flex-1 in horizontal row

3. **Last Name Input** (node-id: 175:704) - **RIGHT side of horizontal pair**
   - Component: InputField
   - Label: "Lable" (actual: "이름")
   - Placeholder: "이름"
   - Layout: flex-1 in horizontal row

4. **Email Input Field** (node-id: 175:670)
   - Component: InputField
   - Label: "Lable" (actual: "이메일")
   - Placeholder: "이메일을 입력하세요"
   - Layout: Full width

5. **Password Input Field** (node-id: 175:685)
   - Component: InputField
   - Label: "Lable" (actual: "비밀번호")
   - Placeholder: "비밀번호를 입력하세요"
   - Help message: "8-16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."
   - Layout: Full width with help text below

6. **Password Confirm Field** (node-id: 175:685 - second instance)
   - Component: InputField
   - Label: "Lable" (actual: "비밀번호 확인")
   - Placeholder: "비밀번호를 입력하세요"
   - Note: Same node-id pattern, likely instance of same component

7. **Create Account Button** (node-id: 175:679)
   - Component: Button (primary variant)
   - Text: "계정 만들기"
   - Style: Filled with accent color

### Dimensions

| Area                           | Absolute (px)   | Ratio         | Tailwind Mapping       |
| ------------------------------ | --------------- | ------------- | ---------------------- |
| Page Container                 | 375 x 812       | 100% (mobile) | w-full h-screen        |
| Form Container                 | 311 x ~700      | 82.9% width   | max-w-sm mx-auto px-8  |
| Container Padding              | 32px horizontal | 8.5%          | px-8                   |
| Container Padding              | 80px vertical   | 9.9%          | py-20                  |
| Title to Form Gap              | 80px            | -             | gap-20                 |
| Header to Fields Gap           | 16px            | -             | gap-4                  |
| Name Fields Gap                | 8px             | -             | gap-2                  |
| Field Groups Gap               | 16px            | -             | gap-4                  |
| Password Stack Gap             | 4px             | -             | gap-1                  |
| Fields to Button Gap           | 32px            | -             | gap-8                  |
| Input Field Height             | 40px            | -             | h-10                   |
| Button Height                  | 40px            | -             | h-10                   |
| Help Message Height            | 18px            | -             | text-xs leading-[18px] |
| Border Radius (container)      | 24px            | -             | rounded-3xl            |
| Border Radius (inputs/buttons) | 8px             | -             | rounded-lg             |

**Name Fields Row:**

- Total width: 311px
- Gap: 8px
- Each field: (311 - 8) / 2 = 151.5px
- Flex distribution: flex-1 (equal split)

### Colors & Styling

**Background Colors:**

- Same as Login page
- Page background: `#171717` → `bg-neutral-900`
- Input background: `white` → `bg-white`
- Button background: `#02eee1` → `bg-cyan-400`

**Text Colors:**

- Title: `white` → `text-white` (Note: Different from Login's #fafafa)
- Pre-form text: `white` → `text-white`
- Login link: `#e5e5e5` with underline → `text-neutral-200 underline`
- Labels: `#e5e5e5` → `text-neutral-200`
- Placeholder: `#737373` → `text-neutral-500`
- Help message: `#d4d4d4` → `text-neutral-300`
- Button text: `white` → `text-white`

**Border Colors:**

- Input border: `#d4d4d4` → `border-neutral-300`

**Typography:**

- Title: Pretendard SemiBold, 24px → `text-2xl font-semibold`
- Pre-form text: Pretendard Regular, 16px → `text-base font-normal`
- Link text: Pretendard Regular, 16px, underlined → `text-base underline`
- Labels: Pretendard Medium, 16px → `text-base font-medium`
- Help message: Pretendard Regular, 12px → `text-xs font-normal`

### Component Placeholders

**Order from top to bottom:**

1. **Position: Title** → `<h1>` or heading component
   - Text: "계정 만들기"

2. **Position: Pre-form header** → Text + `ALinkButton` wrapper
   - Question text: "이전에 생성한 계정이 있으신가요?"
   - Link: "로그인" (navigates to login page)

3. **Position: Horizontal Name Row** → Flex container with gap-2
   - **Left**: `InputField` component (First Name)
     - Label: "성"
     - Placeholder: "성"
   - **Right**: `InputField` component (Last Name)
     - Label: "이름"
     - Placeholder: "이름"

4. **Position: Email field** → `InputField` component
   - Label: "이메일"
   - Placeholder: "이메일을 입력하세요"
   - Full width

5. **Position: Password stack** → Flex column with gap-1
   - **Field 1**: `InputField` component
     - Label: "비밀번호"
     - Placeholder: "비밀번호를 입력하세요"
     - Type: password
     - Help text: "8-16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요."

   - **Field 2**: `InputField` component
     - Label: "비밀번호 확인"
     - Placeholder: "비밀번호를 입력하세요"
     - Type: password
     - Validation: Must match password field

6. **Position: Submit button** → `Button` component (primary)
   - Text: "계정 만들기"
   - Action: Submit signup form

### Special Behaviors

**Form Validation UI Hints:**

- Name fields: Required validation (Korean name format)
- Email field: Email format validation
- Password field: Complexity validation (shown via help text)
  - Requirements: 8-16 characters, uppercase, lowercase, numbers, special characters
- Password confirm: Must match first password field
- Real-time validation likely on blur or on change

**Error States:**

- Name fields: "이름을 입력하세요" style messages
- Email: "올바른 이메일 형식이 아닙니다"
- Password: "비밀번호가 요구사항을 충족하지 않습니다" (with specific rules)
- Password confirm: "비밀번호가 일치하지 않습니다"
- Error styling: Red border + error message below field

**Loading States:**

- Submit button: Disabled with loading spinner
- Form fields: Disabled during submission
- Success: Redirect to login or auto-login

**Focus States:**

- Same as Login page
- Focus moves through: First name → Last name → Email → Password → Confirm → Submit

**Interactive States:**

- Help text visibility: Always visible under password field (not conditional)
- Password strength indicator: Not shown in design (optional enhancement)
- Real-time password match indicator: Not shown (optional enhancement)

**Password Validation Requirements (from help text):**

```
8-16자의 영문 대/소문자, 숫자, 특수문자를 사용해 주세요.
Translation: Use 8-16 characters including uppercase, lowercase, numbers, and special characters.

Regex pattern (example):
^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$
```

### z-index Layering

Same layering pattern as Login:

- Base layer: Form container (z-0)
- Input icons: Inside input container (z-10)
- Error messages: Above form elements (z-20)
- Loading overlay: During submission (z-30)
- Success toast: Top layer (z-50)

### Screenshot

Path: docs/screenshots/auth-signup.png (displayed in Figma MCP tool output)

---

## Comparison: Login vs Signup

### Structural Differences

**Layout Pattern:**

- **Login**: Simple vertical stack, all full-width elements
- **Signup**: Mixed layout with horizontal name fields row + vertical stack

**Container Height:**

- **Login**: ~600px (shorter, less content)
- **Signup**: ~700px (taller, more fields)

**Form Complexity:**

- **Login**: 2 input fields + 1 link + 2 buttons = 5 elements
- **Signup**: 4 input fields + help text + pre-form header = more complex

**Button Groups:**

- **Login**: 2 buttons (Login primary + Create Account secondary)
- **Signup**: 1 button (Create Account primary only)

### Form Field Differences

**Login has:**

1. Email field
2. Password field
3. Forgot password link
4. Two action buttons

**Signup has:**

1. Pre-form "Already have account?" section
2. First name field (새로운)
3. Last name field (새로운)
4. Email field (동일)
5. Password field (동일 but with help text)
6. Password confirm field (새로운)
7. One action button

**Additional fields in Signup:**

- **Name fields** (horizontal pair): First name "성" + Last name "이름"
- **Password confirm field**: Validation against first password
- **Help text**: Password requirements explicitly shown
- **Pre-form navigation**: Link back to login

**Field variations:**

- Password field in Signup has help message, Login doesn't
- Signup has inline link in header, Login has link after form

### Shared Elements

**Visual Design System:**

- ✅ Same dark background color (#171717)
- ✅ Same accent color (#02eee1)
- ✅ Same border radius values (24px container, 8px inputs)
- ✅ Same input field height (40px)
- ✅ Same button height (40px)
- ✅ Same typography system (Pretendard font family)
- ✅ Same color tokens (text/secondary, text/tertiary, etc.)

**Component Reusability:**

- ✅ **InputField component**: Used in both pages (4 times in Signup, 2 in Login)
- ✅ **Button component**: Both use primary filled variant
- ✅ **ALinkButton component**: Both use for navigation links
- ✅ **Container layout**: Same padding, gap, rounded corner pattern

**Can they share a base layout component?**

**YES - Recommended structure:**

```tsx
// Shared base layout
<AuthLayout title="로그인 | 계정 만들기">
  <AuthContainer>
    {children}
  </AuthContainer>
</AuthLayout>

// Where AuthContainer provides:
- Dark background (#171717)
- Centered positioning
- Consistent padding (px-8, py-20)
- Rounded corners (rounded-3xl)
- Max width constraint (max-w-sm)
- Vertical flex layout (flex-col)
- Title + content gap (gap-20)
```

**Shared component library needed:**

1. **InputField**: Label + input + optional icon + optional help text
2. **Button**: Primary/outline variants with consistent sizing
3. **ALinkButton**: Text link with underline option
4. **AuthContainer**: Wrapper with consistent dark styling
5. **FormSection**: Gap management for form field groups

**Page-specific differences:**

- Login: Needs forgot password link (right-aligned)
- Login: Needs two-button group (primary + outline)
- Signup: Needs horizontal field row for names
- Signup: Needs pre-form header with inline link
- Signup: Needs password help text display

---

## Implementation Notes

### Responsive Strategy (1920px viewport scaling)

**Current design:** 375px mobile viewport
**Target:** 1920px desktop

**Approach 1 - Centered with max-width:**

```css
Container: max-w-sm (384px) centered on desktop
Result: Form stays mobile-sized, surrounded by dark background
```

**Approach 2 - Scaled container:**

```css
Container: Scale to ~600px width on desktop (maintains proportions)
Font sizes: Scale up slightly (24px title → 32px)
```

**Recommended:** Approach 1 (mobile-sized form centered on desktop)

- Simpler implementation
- Better focus on form (less eye movement)
- Standard pattern for auth pages

### Component Implementation Order

**Phase 1 - Base Components:**

1. `InputField` - Most reused, foundation for forms
2. `Button` - Required for actions
3. `ALinkButton` - Navigation between pages

**Phase 2 - Layout Components:** 4. `AuthContainer` - Shared wrapper 5. `AuthLayout` - Page-level layout with title

**Phase 3 - Pages:** 6. Login page - Simpler, fewer fields 7. Signup page - More complex, builds on Login patterns

### Form Validation Requirements

**Login validation:**

- Email: Required + email format
- Password: Required (no complexity check on login)

**Signup validation:**

- First name: Required + Korean/English character validation
- Last name: Required + Korean/English character validation
- Email: Required + email format + unique check (backend)
- Password: Required + complexity (8-16 chars, upper, lower, number, special)
- Password confirm: Required + must match password field

**Validation timing:**

- On blur: Check format/requirements
- On submit: Final validation + show all errors
- Real-time: Password match indicator (optional enhancement)

### State Management Needs

**Form state:**

- Field values (controlled inputs)
- Validation errors per field
- Form-level error (submission failure)
- Loading state (during submission)
- Success state (for redirects)

**Navigation state:**

- Redirect after successful login/signup
- Return URL (if coming from protected route)

**Suggested approach:**

- React Hook Form for form state
- Zod for validation schemas
- Zustand for auth state (if needed globally)

### API Integration Points

**Login endpoint:**

```typescript
POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string, user: User } | { error: string }
```

**Signup endpoint:**

```typescript
POST /api/auth/signup
Body: {
  firstName: string,
  lastName: string,
  email: string,
  password: string
}
Response: { token: string, user: User } | { error: string }
```

**Password recovery:**

```typescript
POST /api/auth/forgot-password
Body: { email: string }
Response: { message: string } | { error: string }
```

### Accessibility Considerations

**Required for WCAG compliance:**

- All inputs must have associated labels (currently "Lable" placeholders)
- Error messages must be announced by screen readers
- Form submission errors must be clearly communicated
- Focus management during loading/errors
- Keyboard navigation for all interactive elements

**ARIA attributes needed:**

- `aria-label` or `<label>` for each input
- `aria-invalid` for error states
- `aria-describedby` for help text and errors
- `role="alert"` for error messages

### Design Token Mapping

**Create CSS variables or Tailwind config:**

```css
/* Auth page specific tokens */
--auth-bg: #171717;
--auth-accent: #02eee1;
--auth-text-primary: #fafafa;
--auth-text-secondary: #e5e5e5;
--auth-text-tertiary: #737373;
--auth-border: #d4d4d4;

/* Spacing tokens */
--auth-container-padding-x: 32px;
--auth-container-padding-y: 80px;
--auth-title-gap: 80px;
--auth-field-gap: 16px;

/* Size tokens */
--auth-input-height: 40px;
--auth-button-height: 40px;
--auth-icon-size: 24px;

/* Radius tokens */
--auth-container-radius: 24px;
--auth-element-radius: 8px;
```

---

## Next Steps (Phase 2-4)

**Phase 2:** Implement shared components

- InputField with all variants
- Button with primary/outline
- ALinkButton

**Phase 3:** Implement auth pages

- Login page with routing
- Signup page with routing
- Form validation + error handling

**Phase 4:** Integration

- API connection
- Token storage
- Protected route guards
- Success/error toast notifications

---

**Analysis completed:** 2026-02-08
**Design base:** Figma file Vz80RydxWcYHVnn2iuyV0m
**Viewport base:** 375px mobile (scale to 1920px desktop)
**Framework target:** Next.js 16 + React 19 + TypeScript
