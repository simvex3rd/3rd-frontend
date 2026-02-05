# Design Tokens

SIMVEX 프로젝트의 디자인 토큰 시스템입니다. 일관된 디자인 언어를 유지하기 위해 하드코딩된 값 대신 토큰을 사용하세요.

## Typography

### Font Family

- **Sans-serif**: Pretendard Variable (한국어 최적화 폰트)
- **Monospace**: Geist Mono

```tsx
// CSS
font-family: var(--font-sans);
font-family: var(--font-mono);

// Tailwind
className="font-sans"
className="font-mono"
```

### Heading Typography

**Line-height: 125%**

| Token             | Size            | Usage                  |
| ----------------- | --------------- | ---------------------- |
| `heading-xs`      | 14px / 0.875rem | Small headings, labels |
| `heading-sm`      | 24px / 1.5rem   | Card titles            |
| `heading-md`      | 28px / 1.75rem  | Section titles         |
| `heading-lg`      | 32px / 2rem     | Page titles            |
| `heading-xl`      | 40px / 2.5rem   | Hero titles            |
| `heading-2xl`     | 52px / 3.25rem  | Large hero titles      |
| `heading-display` | 96px / 6rem     | Display text           |

```tsx
// CSS Variables
font-size: var(--heading-lg);
line-height: var(--heading-line-height); // 1.25

// Tailwind (custom utility classes recommended)
// Add to globals.css:
@layer utilities {
  .text-heading-xs { font-size: var(--heading-xs); line-height: var(--heading-line-height); }
  .text-heading-sm { font-size: var(--heading-sm); line-height: var(--heading-line-height); }
  .text-heading-md { font-size: var(--heading-md); line-height: var(--heading-line-height); }
  .text-heading-lg { font-size: var(--heading-lg); line-height: var(--heading-line-height); }
  .text-heading-xl { font-size: var(--heading-xl); line-height: var(--heading-line-height); }
  .text-heading-2xl { font-size: var(--heading-2xl); line-height: var(--heading-line-height); }
  .text-heading-display { font-size: var(--heading-display); line-height: var(--heading-line-height); }
}
```

### Body Typography

**Line-height: 150%**

| Token     | Size            | Usage                |
| --------- | --------------- | -------------------- |
| `body-sm` | 12px / 0.75rem  | Captions, small text |
| `body-md` | 14px / 0.875rem | Default body text    |
| `body-lg` | 16px / 1rem     | Large body text      |

**Font Weights:**

| Token           | Value | Usage           |
| --------------- | ----- | --------------- |
| `font-regular`  | 400   | Regular text    |
| `font-medium`   | 500   | Emphasized text |
| `font-semibold` | 600   | Subheadings     |
| `font-bold`     | 700   | Strong emphasis |

```tsx
// CSS Variables
font-size: var(--body-md);
line-height: var(--body-line-height); // 1.5
font-weight: var(--font-semibold);

// Tailwind (custom utility classes recommended)
@layer utilities {
  .text-body-sm { font-size: var(--body-sm); line-height: var(--body-line-height); }
  .text-body-md { font-size: var(--body-md); line-height: var(--body-line-height); }
  .text-body-lg { font-size: var(--body-lg); line-height: var(--body-line-height); }
}
```

## Spacing

**Base unit: 4px**

| Token         | Value    | Pixels | Usage            |
| ------------- | -------- | ------ | ---------------- |
| `spacing-0`   | 0        | 0px    | No space         |
| `spacing-px`  | 1px      | 1px    | Borders          |
| `spacing-0_5` | 0.125rem | 2px    | Hairline spacing |
| `spacing-1`   | 0.25rem  | 4px    | Tiny spacing     |
| `spacing-2`   | 0.5rem   | 8px    | Extra small      |
| `spacing-3`   | 0.75rem  | 12px   | Small            |
| `spacing-4`   | 1rem     | 16px   | Default          |
| `spacing-6`   | 1.5rem   | 24px   | Medium           |
| `spacing-8`   | 2rem     | 32px   | Large            |
| `spacing-12`  | 3rem     | 48px   | Extra large      |
| `spacing-16`  | 4rem     | 64px   | 2x large         |
| `spacing-24`  | 6rem     | 96px   | 3x large         |

```tsx
// CSS Variables
margin-bottom: var(--spacing-4);
padding: var(--spacing-6);
gap: var(--spacing-2);

// Tailwind (use standard Tailwind spacing)
className="mb-4 p-6 gap-2"
```

## Colors

Colors are defined using shadcn/ui's color system with OKLCH color space for better perceptual uniformity.

### Light Mode

```css
--background: oklch(1 0 0); /* White */
--foreground: oklch(0.145 0 0); /* Near black */
--primary: oklch(0.205 0 0); /* Dark gray */
--primary-foreground: oklch(0.985 0 0); /* White */
--secondary: oklch(0.97 0 0); /* Light gray */
--accent: oklch(0.97 0 0); /* Light gray */
--destructive: oklch(0.577 0.245 27.325); /* Red */
--border: oklch(0.922 0 0); /* Light border */
```

### Dark Mode

```css
--background: oklch(0.145 0 0); /* Near black */
--foreground: oklch(0.985 0 0); /* White */
--primary: oklch(0.922 0 0); /* Light gray */
--primary-foreground: oklch(0.205 0 0); /* Dark gray */
--secondary: oklch(0.269 0 0); /* Dark gray */
--accent: oklch(0.269 0 0); /* Dark gray */
--destructive: oklch(0.704 0.191 22.216); /* Red */
--border: oklch(1 0 0 / 10%); /* Subtle border */
```

### Usage

```tsx
// Always use semantic color tokens, never hardcode colors
// ❌ BAD
className="bg-[#000000] text-[#ffffff]"
style={{ color: '#3b82f6' }}

// ✅ GOOD
className="bg-background text-foreground"
className="bg-primary text-primary-foreground"
className="border-border"
```

## Border Radius

```css
--radius: 0.625rem; /* Base radius (10px) */
--radius-sm: calc(var(--radius) - 4px);
--radius-md: calc(var(--radius) - 2px);
--radius-lg: var(--radius);
--radius-xl: calc(var(--radius) + 4px);
--radius-2xl: calc(var(--radius) + 8px);
```

```tsx
// Tailwind
className = "rounded-lg"; // Uses var(--radius)
className = "rounded-sm"; // Uses calc(var(--radius) - 4px)
```

## Best Practices

### ✅ DO

- Use design tokens consistently across the project
- Use Tailwind utility classes when possible
- Follow the spacing scale (4px base)
- Use semantic color names (`bg-primary` not `bg-gray-900`)
- Use Pretendard Variable font for better rendering with variable weights

### ❌ DON'T

- Hardcode pixel values or colors
- Use arbitrary values in Tailwind (`p-[13px]`)
- Mix spacing units (stick to the scale)
- Use inline styles for design tokens
- Use non-system fonts without design approval

## Examples

### Button Component

```tsx
<button
  className={cn(
    "inline-flex items-center justify-center",
    "px-4 py-2 gap-2", // spacing-4, spacing-2
    "text-body-md font-medium", // typography
    "bg-primary text-primary-foreground",
    "rounded-md", // radius
    "transition-colors",
    "hover:bg-primary/90"
  )}
>
  Click me
</button>
```

### Card Component

```tsx
<div
  className={cn(
    "p-6 space-y-4", // spacing-6, spacing-4
    "bg-card text-card-foreground",
    "border border-border",
    "rounded-lg" // radius
  )}
>
  <h3 className="text-heading-md font-semibold">Card Title</h3>
  <p className="text-body-md text-muted-foreground">Card description text</p>
</div>
```

## Customization

To add or modify design tokens:

1. Update CSS variables in `src/app/globals.css`
2. Update this documentation
3. Update Storybook examples if applicable
4. Ensure Figma designs match the tokens

## Resources

- **Pretendard Font**: https://github.com/orioncactus/pretendard
- **shadcn/ui Colors**: https://ui.shadcn.com/docs/theming
- **Tailwind CSS**: https://tailwindcss.com/docs
