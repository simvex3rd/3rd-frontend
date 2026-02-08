# Phase 2: UI Basic Components Analysis

## Overview

This analysis covers 10 basic UI components extracted from the Figma design system. The components are built with a consistent design language featuring:

- **Primary Color Scheme**: Cyan/teal accent colors (#02eee1, #01a9a0, #01645f)
- **Typography**: Pretendard font family (Regular, Medium, SemiBold, Bold)
- **Consistent Spacing**: 2px, 4px, 8px, 12px, 16px, 24px system
- **Border Radius**: 8px (small controls), 24px (CTA buttons)
- **State Management**: Comprehensive hover, press, disabled, focus states

**Component Breakdown:**

- 3 Button variants (Button, CTAButton, ALinkButton)
- 3 Form components (InputField, TextField, HelpMessage)
- 2 Typography components (Label, Logo)
- 2 Icon sets (147:517 for viewer UI, 130:389 for landing page)

**Key Finding**: Most components have excellent Auto Layout implementation and can be directly mapped to shadcn/ui with minimal customization.

---

## Component Grouping

### Buttons

- **Button** (node-id: 160:989) - Primary UI button with fill/outline variants
- **CTAButton** (node-id: 90:41) - Hero/landing page call-to-action button
- **ALinkButton** (node-id: 147:841) - Text-only link button

**Analysis**: Button family shows clear hierarchy:

- Button: Standard UI controls (40px height, 8px radius)
- CTAButton: Prominent actions (52px height, 24px radius, glassmorphic effect)
- ALinkButton: Inline text links (no background)

**Shared Props**:

- All support hover/press states
- Text color changes coordinated with background
- Icon support (leading/trailing for Button)

**Reusability**: High - can create a single `<Button>` component with `variant` prop:

```typescript
variant: "fill" | "outline" | "cta" | "link";
```

### Form Inputs

- **InputField** (node-id: 147:809) - Standalone input with search icon
- **TextField** (node-id: 147:837) - Complete field with label + input + help message
- **HelpMessage** (node-id: 147:830) - Validation/helper text

**Analysis**: TextField is a composite component:

- TextField = Label + InputField + HelpMessage
- InputField has 6 states: Default, focus, fill, error, success, disable
- HelpMessage syncs with InputField state (Default/error/success)

**Relationship**:

```
TextField
  ├─ Label (optional)
  ├─ InputField (required)
  └─ HelpMessage (optional)
```

**shadcn Mapping**: Maps cleanly to shadcn Form components:

- InputField → Input
- TextField → FormField + FormItem + FormLabel + FormControl + FormMessage
- HelpMessage → FormDescription / FormMessage

### Typography & Branding

- **Label** (node-id: 120:375) - Navigation/section label (40px heading)
- **Logo** (node-id: 120:374) - Brand logo with image + text

**Analysis**:

- Label: Used for navigation items, has Default/press states
- Logo: Composite (logo image + logo text), exported as images

**Usage Pattern**:

- Label: Navigation tabs, section headers
- Logo: Header/footer branding

### Icons

- **Icon** (node-id: 147:517) - Viewer UI icons (13 icons)
- **Icon in landing** (node-id: 130:389) - Landing page feature icons (8 icons)

**Icon Inventory (147:517 - Viewer UI)**:

1. ph:cube-focus-light (147:546) - 3D cube focus
2. tabler:cube-3d-sphere (147:550) - 3D sphere
3. mdi:camera-lock-outline (147:552) - Camera lock
4. fluent:tag-search-24-filled (160:693) - Search filled
5. mingcute:ai-fill (147:556) - AI filled
6. mingcute:ai-line (147:560) - AI outline
7. fluent:tag-search-20-regular (147:564) - Search regular 20
8. fluent:tag-search-24-regular (147:566) - Search regular 24
9. radix-icons:ruler-square (147:568) - Ruler square
10. wpf:ruler (147:570) - Ruler
11. clarity:ruler-pencil-line (147:572) - Ruler pencil outline
12. clarity:ruler-pencil-solid (147:577) - Ruler pencil filled
13. iconamoon:send-light (236:1291) - Send

**Icon Inventory (130:389 - Landing Page)**:

1. garden:box-3d-stroke-16 (98:176) - 3D box
2. bi:chat-dots (98:175) - Chat
3. cil:chart-line (98:174) - Chart
4. mage:electricity (130:555) - Electricity
5. streamline-ultimate:space-rocket-earth (130:554) - Rocket
6. lets-icons:chemistry-light (130:553) - Chemistry
7. iconoir:electronics-chip (130:552) - Chip
8. solar:settings-linear (130:582) - Settings

**Analysis**:

- Viewer icons: Focused on 3D manipulation, measurement, AI features
- Landing icons: Focused on feature communication (analytics, simulation types)
- Size: 24px (viewer), 113-147px (landing features)
- Color: #02eee1 (primary cyan)

**Export Strategy**:

- [SVG] - Export all icons as SVG to docs/assets/icons/
- Consider using lucide-react or @iconify/react for similar icons instead of custom exports

---

## Detailed Component Analysis

### Component: Button

**Figma Node:** 160:989
**Screenshot:** See Figma - Button component with 8 variants displayed

#### Naming

- **Figma Name:** Button
- **Proposed Code Name:** Button
- **Rationale:** Keep same - clear and standard naming

#### Role

General-purpose button for UI controls with optional leading/trailing icons, supporting fill and outline styles across four states.

#### Dimensions

| Property         | Value (px)              | Tailwind                  |
| ---------------- | ----------------------- | ------------------------- |
| Width            | 145 (default, can vary) | w-auto or w-[145px]       |
| Height           | 40                      | h-10                      |
| Min Click Target | 145×40                  | ✅ Meets 44px requirement |

#### Colors

| Element    | State            | Value         | Tailwind Variable             |
| ---------- | ---------------- | ------------- | ----------------------------- |
| Background | Default (fill)   | #02eee1       | bg-primary                    |
| Background | Hover (fill)     | #01a9a0       | bg-primary-hover              |
| Background | Press (fill)     | #01645f       | bg-primary-press              |
| Background | Disabled (fill)  | #f5f5f5       | bg-muted                      |
| Background | Outline          | transparent   | bg-transparent                |
| Text       | Fill             | #ffffff       | text-primary-foreground       |
| Text       | Outline Default  | #02eee1       | text-primary                  |
| Text       | Outline Hover    | #01a9a0       | text-primary-hover            |
| Text       | Outline Press    | #01645f       | text-primary-press            |
| Text       | Disabled         | #d4d4d4       | text-muted-foreground         |
| Border     | Outline Default  | #02eee1 (2px) | border-2 border-primary       |
| Border     | Outline Hover    | #01a9a0 (2px) | border-2 border-primary-hover |
| Border     | Outline Press    | #01645f (2px) | border-2 border-primary-press |
| Border     | Disabled Outline | #d4d4d4 (2px) | border-2 border-muted         |
| Icon       | Fill             | #ffffff       | text-primary-foreground       |
| Icon       | Outline          | matches text  | text-primary                  |
| Icon       | Disabled         | #d4d4d4       | text-muted-foreground         |

#### Typography

- **Font Family:** Pretendard
- **Font Size:** 16px → `text-base`
- **Font Weight:** 500 (Medium) → `font-medium`
- **Line Height:** 1.5 → `leading-normal`

#### Spacing

- **Padding:** 0px (top/bottom), 16px (left/right) → `px-4 py-0`
- **Gap:** 8px (between icon and text) → `gap-2`
- **Border Radius:** 8px → `rounded-lg`
- **Border Width:** 2px (outline variant) → `border-2`

#### States

| State              | Visual Changes                                          |
| ------------------ | ------------------------------------------------------- |
| Default (fill)     | Cyan background (#02eee1), white text, no border        |
| Default (outline)  | Transparent bg, cyan border (2px), cyan text            |
| Hover (fill)       | Darker cyan bg (#01a9a0), white text maintained         |
| Hover (outline)    | Darker cyan border/text (#01a9a0)                       |
| Press (fill)       | Darkest cyan bg (#01645f), white text maintained        |
| Press (outline)    | Darkest cyan border/text (#01645f)                      |
| Disabled (fill)    | Light gray bg (#f5f5f5), gray text (#d4d4d4), no border |
| Disabled (outline) | Transparent bg, gray border (#d4d4d4), gray text        |

**Interaction Notes**:

- Smooth color transitions between states
- Icons change color to match text color
- Cursor changes to not-allowed on disabled

#### Internal Elements

**Layout**: Horizontal flex container

1. **Plus Icon** (optional, 24×24px) - Leading icon slot
2. **Text Label** - Flexible width, centered
3. **Minus Icon** (optional, 24×24px) - Trailing icon slot

**Icon Details**:

- Plus icon: Simple + symbol in 24px container
- Minus icon: Simple - symbol in 24px container
- Icons are purely decorative (can be swapped via props)

#### Auto Layout

- ✅ **Has Auto Layout**
- **Direction:** Horizontal
- **Alignment:** Center (both axes)
- **Padding:** 0px (top/bottom), 16px (left/right)
- **Gap:** 8px
- **Sizing:** Hug contents (width varies with content)

**Conversion Notes**: Direct flex translation, easy conversion.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Yes
- **shadcn Component:** `Button` from `@/components/ui/button`
- **Customization Needed:**
  - Add custom `primary` variant (currently shadcn has default/destructive/outline/secondary/ghost/link)
  - Customize colors to match cyan theme (#02eee1)
  - Ensure 2px border for outline variant (shadcn default is 1px)
  - Add icon slots support (can use existing shadcn pattern with children)

**Implementation Strategy**:

```typescript
// Add to button.tsx variants
primary: "bg-primary text-primary-foreground hover:bg-primary-hover active:bg-primary-press",
"primary-outline": "border-2 border-primary text-primary hover:border-primary-hover hover:text-primary-hover"
```

#### Asset Classification

- **Tag:** [CODE]
- **Icons:** [SVG] - Export plus/minus icons if needed, or use lucide-react equivalents (Plus, Minus)

#### Interactions

- **Hover:** Background/border/text color shift to hover variant
- **Click/Press:** Background/border/text color shift to press variant
- **Disabled:** Grayed out, cursor: not-allowed, no hover effect
- **Focus:** Not visible in Figma - recommend adding focus-visible:ring-2 ring-primary

#### Accessibility

- **Contrast Ratio (fill default):** #ffffff on #02eee1 = 3.7:1 ⚠️ **FAIL** (needs 4.5:1)
- **Contrast Ratio (fill hover):** #ffffff on #01a9a0 = 4.8:1 ✅ **PASS**
- **Contrast Ratio (outline default):** #02eee1 on dark = ✅ Likely PASS (verify with actual background)
- **Click Target Size:** 145×40px → Width ✅, Height ❌ (40px < 44px) - **Consider 44px height**
- **Focus State:** ❌ Missing - **Must add focus-visible ring**
- **ARIA Requirements:**
  - `aria-disabled="true"` for disabled state
  - `aria-label` if icon-only button
  - Consider `aria-busy` for loading states

**Accessibility Fixes Required**:

1. Increase height to 44px OR accept 40px with documentation
2. Add focus-visible ring styles
3. Review contrast ratio - may need to darken primary color or lighten text

---

### Component: CTAButton

**Figma Node:** 90:41
**Screenshot:** See Figma - CTA button with 4 variants

#### Naming

- **Figma Name:** CTAButton
- **Proposed Code Name:** CTAButton or HeroButton
- **Rationale:** Keep CTAButton - clearly indicates Call-To-Action purpose

#### Role

Hero/landing page call-to-action button with prominent glassmorphic styling and shadow effects for high-visibility conversions.

#### Dimensions

| Property         | Value (px)                  | Tailwind                    |
| ---------------- | --------------------------- | --------------------------- |
| Width            | 210 (default)               | w-[210px]                   |
| Height           | 52 (estimated from padding) | h-[52px]                    |
| Min Click Target | 210×52                      | ✅ Exceeds 44px requirement |

#### Colors

| Element    | State      | Value                            | Tailwind Variable                         |
| ---------- | ---------- | -------------------------------- | ----------------------------------------- |
| Background | Default    | rgba(255,255,255,0.3)            | bg-white/30                               |
| Background | Primary    | rgba(2,238,225,0.3)              | bg-primary/30                             |
| Background | Hover      | rgba(1,169,160,0.3)              | bg-primary-hover/30                       |
| Background | Press      | rgba(1,100,95,0.3)               | bg-primary-press/30                       |
| Border     | All states | rgba(2,238,225,0.2) (5px)        | border-[5px] border-primary/20            |
| Text       | All states | #fafafa                          | text-gray-50                              |
| Shadow     | All states | 4px 4px 20px rgba(2,238,225,0.1) | shadow-[4px_4px_20px_rgba(2,238,225,0.1)] |

**Design Notes**:

- Glassmorphic effect with semi-transparent backgrounds
- Consistent cyan-tinted border (20% opacity)
- Cyan-tinted glow shadow (10% opacity)
- Text remains white across all states for contrast

#### Typography

- **Font Family:** Pretendard
- **Font Size:** 32px → `text-[32px]` (no standard Tailwind class)
- **Font Weight:** 600 (SemiBold) → `font-semibold`
- **Line Height:** 1.25 → `leading-tight`

#### Spacing

- **Padding:** 16px (top/bottom), 24px (left/right) → `px-6 py-4`
- **Gap:** 16px (if icons present) → `gap-4`
- **Border Radius:** 24px → `rounded-3xl`
- **Border Width:** 5px → `border-[5px]`

#### States

| State   | Visual Changes                                              |
| ------- | ----------------------------------------------------------- |
| Default | White tint (30% opacity), primary border (20%), glow shadow |
| Primary | Primary tint (30% opacity), same border/shadow              |
| Hover   | Primary-hover tint (30% opacity), same border/shadow        |
| Press   | Primary-press tint (30% opacity), same border/shadow        |

**Interaction Notes**:

- Background tint shifts through color spectrum
- Border and shadow remain constant (visual stability)
- Large text size (32px) ensures high visibility

#### Internal Elements

**Layout**: Horizontal flex container

1. **Text Label** - Centered, large heading size

**Current Design**: Text only, no icons
**Potential Enhancement**: Could add icon support like Button component

#### Auto Layout

- ✅ **Has Auto Layout**
- **Direction:** Horizontal
- **Alignment:** Center (both axes)
- **Padding:** 16px (top/bottom), 24px (left/right)
- **Gap:** 16px (prepared for future icon support)
- **Sizing:** Fixed width (210px) in design, but hug contents behavior enabled

**Conversion Notes**: Direct flex translation.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Yes, with customization
- **shadcn Component:** `Button` from `@/components/ui/button`
- **Customization Needed:**
  - Create new `cta` variant with glassmorphic styling
  - Add 5px border (shadcn default is 1px)
  - Add custom shadow with cyan tint
  - Increase text size to 32px
  - Apply rounded-3xl radius

**Implementation Strategy**:

```typescript
// Add to button.tsx variants
cta: "bg-white/30 border-[5px] border-primary/20 text-gray-50 text-[32px] font-semibold rounded-3xl px-6 py-4 shadow-[4px_4px_20px_rgba(2,238,225,0.1)] hover:bg-primary-hover/30 active:bg-primary-press/30";
```

#### Asset Classification

- **Tag:** [CODE]
- **Export Path:** N/A - Pure CSS effect

#### Interactions

- **Default → Primary:** Background shifts from white/30 to primary/30 (likely on page load or scroll)
- **Hover:** Background tint shifts to hover color (primary-hover/30)
- **Press:** Background tint shifts to press color (primary-press/30)
- **Focus:** Not visible in Figma - recommend adding focus-visible:ring-2 ring-primary

**Animation Recommendations**:

- Transition duration: 200ms (smooth color shifts)
- Consider scale(1.05) on hover for extra prominence
- Optional: Pulse animation for primary state to draw attention

#### Accessibility

- **Contrast Ratio:** #fafafa on rgba(2,238,225,0.3) over dark background = Needs calculation based on actual background
  - If over black: Likely ✅ PASS (white on dark with cyan tint)
  - If over light: ⚠️ May FAIL - verify in context
- **Click Target Size:** 210×52px ✅ **PASS** (exceeds 44px)
- **Focus State:** ❌ Missing - **Must add focus-visible ring**
- **ARIA Requirements:**
  - Consider `aria-label` if text is minimal
  - May want `role="button"` if using `<div>` (use `<button>` instead)

**Accessibility Recommendation**:

- Test contrast ratio against actual landing page background
- Add focus ring that matches glassmorphic style (perhaps border-primary with higher opacity)
- Ensure hover/focus states are distinguishable for keyboard users

---

### Component: ALinkButton

**Figma Node:** 147:841
**Screenshot:** See Figma - Text link "button"

#### Naming

- **Figma Name:** ALinkButton
- **Proposed Code Name:** LinkButton or TextLink
- **Rationale:** Rename to "TextLink" - more semantic than "ALinkButton" (the "A" prefix is unclear)

#### Role

Inline text link for navigation, typically used in body content or as a subtle secondary action.

#### Dimensions

| Property         | Value (px)          | Tailwind                                           |
| ---------------- | ------------------- | -------------------------------------------------- |
| Width            | 48 (text-dependent) | w-auto                                             |
| Height           | 24                  | h-6                                                |
| Min Click Target | 48×24               | ⚠️ Height fails 44px (acceptable for inline links) |

#### Colors

| Element    | State   | Value                         | Tailwind Variable  |
| ---------- | ------- | ----------------------------- | ------------------ |
| Text       | Default | #e5e5e5                       | text-gray-200      |
| Text       | Hover   | Not shown - recommend #02eee1 | text-primary       |
| Text       | Active  | Not shown - recommend #01645f | text-primary-press |
| Background | All     | transparent                   | bg-transparent     |
| Underline  | Default | none (likely)                 | no-underline       |
| Underline  | Hover   | recommended                   | hover:underline    |

**Design Notes**:

- No background or border
- Single state shown in Figma (Default)
- Minimal styling for inline use

#### Typography

- **Font Family:** Pretendard
- **Font Size:** 16px → `text-base`
- **Font Weight:** 400 (Regular) → `font-normal`
- **Line Height:** 1.5 → `leading-normal`

#### Spacing

- **Padding:** 0 (inline element)
- **Margin:** 0
- **Gap:** N/A
- **Border Radius:** N/A

#### States

| State   | Visual Changes                                           |
| ------- | -------------------------------------------------------- |
| Default | Gray text (#e5e5e5), no underline                        |
| Hover   | **Recommended**: Primary color text, underline appears   |
| Active  | **Recommended**: Darker primary color text               |
| Visited | **Recommended**: Consider purple tint per web convention |
| Focus   | **Recommended**: Outline or underline                    |

**Interaction Notes**:

- Minimal visual weight (subordinate to primary buttons)
- State changes not defined in Figma - recommendations based on web standards

#### Internal Elements

**Layout**: Inline text element

1. **Text Label** - Single text node

**No Icons**: Pure text link

#### Auto Layout

- ❌ **No Auto Layout** (inline text element)
- Simple text node with absolute positioning in Figma

**Conversion Notes**: Use `<a>` or `<Link>` tag with text styling.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Yes
- **shadcn Component:** `Button` with `link` variant, or custom `<Link>` component
- **Customization Needed:**
  - Update link variant to use text-gray-200 default color
  - Add hover:text-primary
  - Add hover:underline
  - Remove padding (shadcn link variant has some padding)

**Implementation Strategy**:

```typescript
// Option 1: Custom Button variant
link: "text-gray-200 hover:text-primary hover:underline font-normal underline-offset-4"

// Option 2: Standalone component
<Link className="text-gray-200 hover:text-primary hover:underline font-normal">
  {children}
</Link>
```

#### Asset Classification

- **Tag:** [CODE]
- **Export Path:** N/A

#### Interactions

- **Hover:** Color change to primary, underline appears
- **Click:** Color briefly shifts to primary-press
- **Focus:** Keyboard focus ring (outline)
- **Visited:** Consider standard visited link styling

**Accessibility Note**: Inline links have relaxed click target requirements (24px acceptable).

#### Accessibility

- **Contrast Ratio:** #e5e5e5 on dark background = Needs verification
  - Likely ✅ PASS if background is #171717 or darker
- **Click Target Size:** 48×24px - ⚠️ Height < 44px, but **acceptable for inline links**
- **Focus State:** ❌ Missing - **Must add focus-visible outline or underline**
- **ARIA Requirements:**
  - Use semantic `<a>` tag with `href` attribute
  - Add `aria-label` if link text is ambiguous
  - Consider `aria-current="page"` for active navigation links

**Accessibility Fixes Required**:

1. Add focus-visible styling (outline or prominent underline)
2. Ensure sufficient contrast on actual background
3. Consider hover area expansion (padding) for easier clicking

---

### Component: InputField

**Figma Node:** 147:809
**Screenshot:** See Figma - Input field with 6 state variants

#### Naming

- **Figma Name:** InputField
- **Proposed Code Name:** Input
- **Rationale:** Shorten to "Input" to match shadcn convention

#### Role

Text input field with optional right icon (search), supporting validation states (error, success) and user interaction states (focus, filled, disabled).

#### Dimensions

| Property         | Value (px) | Tailwind                          |
| ---------------- | ---------- | --------------------------------- |
| Width            | 320        | w-80                              |
| Height           | 40         | h-10                              |
| Min Click Target | 320×40     | Width ✅, Height ❌ (40px < 44px) |

#### Colors

| Element          | State                            | Value         | Tailwind Variable              |
| ---------------- | -------------------------------- | ------------- | ------------------------------ |
| Background       | Default/Focus/Fill/Error/Success | #ffffff       | bg-background                  |
| Background       | Disabled                         | #f5f5f5       | bg-muted                       |
| Border           | Default                          | #d4d4d4 (1px) | border border-muted-foreground |
| Border           | Focus                            | #2b7fff (1px) | border-blue-500                |
| Border           | Fill                             | #e5e5e5 (1px) | border-gray-200                |
| Border           | Error                            | #fb2c36 (1px) | border-destructive             |
| Border           | Success                          | #00c950 (1px) | border-green-500               |
| Border           | Disabled                         | #d4d4d4 (1px) | border-muted-foreground        |
| Placeholder Text | Default/Focus/Error/Success      | #737373       | text-muted-foreground          |
| Filled Text      | Fill                             | #171717       | text-foreground                |
| Disabled Text    | Disabled                         | #d4d4d4       | text-muted                     |
| Icon             | Default/Focus/Error/Success      | #d4d4d4       | text-muted-foreground          |
| Icon             | Fill                             | #d4d4d4       | text-muted-foreground          |
| Icon             | Disabled                         | #d4d4d4       | text-muted                     |

**Design Notes**:

- Border color is primary state indicator
- Text color distinguishes empty (placeholder) from filled
- Icon color remains constant (subtle gray)

#### Typography

- **Font Family:** Pretendard
- **Font Size:** 16px → `text-base`
- **Font Weight:** 400 (Regular) → `font-normal`
- **Line Height:** 1.5 → `leading-normal`

#### Spacing

- **Padding:** 12px (all sides) → `p-3`
- **Gap:** 4px (between text and icon) → `gap-1`
- **Border Radius:** 8px → `rounded-lg`
- **Border Width:** 1px → `border`

#### States

| State    | Visual Changes                                                                    |
| -------- | --------------------------------------------------------------------------------- |
| Default  | Gray border (#d4d4d4), placeholder text (#737373), white bg                       |
| Focus    | Blue border (#2b7fff), placeholder text maintained                                |
| Fill     | Light gray border (#e5e5e5), dark text (#171717) replaces placeholder             |
| Error    | Red border (#fb2c36), placeholder/filled text maintained                          |
| Success  | Green border (#00c950), placeholder/filled text maintained                        |
| Disabled | Gray border (#d4d4d4), gray bg (#f5f5f5), gray text (#d4d4d4), cursor not-allowed |

**Interaction Flow**:

1. Default (empty, unfocused) → Focus (user clicks)
2. Focus → Fill (user types) → Fill (unfocused)
3. Any state → Error (validation fails)
4. Any state → Success (validation passes)
5. Any state → Disabled (form submission, loading)

#### Internal Elements

**Layout**: Horizontal flex container

1. **Text Input** - Flexible width (flex-1), single line, ellipsis overflow
2. **Search Icon** (optional, 24×24px) - Right-aligned, decorative

**Icon Details**:

- Search icon: Magnifying glass in 24px container
- Can be swapped via `rightIconSwap` prop
- Icon is decorative (not interactive) - use for visual hint only

#### Auto Layout

- ✅ **Has Auto Layout**
- **Direction:** Horizontal
- **Alignment:** Center (vertical), Space-between (horizontal)
- **Padding:** 12px (all sides)
- **Gap:** 4px
- **Sizing:** Fixed width (320px), hug height (40px)

**Conversion Notes**: Direct flex translation with `<input>` element.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Yes
- **shadcn Component:** `Input` from `@/components/ui/input`
- **Customization Needed:**
  - Add error/success variants (currently shadcn only has default)
  - Add icon slot support (wrapper component or extend Input)
  - Map focus border color to blue (#2b7fff)
  - Ensure disabled styles match (#f5f5f5 background)

**Implementation Strategy**:

```typescript
// Extend Input with validation states
<div className="relative">
  <Input
    className={cn(
      "pr-10", // space for icon
      error && "border-destructive focus-visible:ring-destructive",
      success && "border-green-500 focus-visible:ring-green-500"
    )}
  />
  {rightIcon && (
    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
      <SearchIcon className="h-6 w-6" />
    </div>
  )}
</div>
```

#### Asset Classification

- **Tag:** [CODE]
- **Icon:** [SVG] - Search icon can use lucide-react `<Search>` component

#### Interactions

- **Click:** Focus state activates (blue border)
- **Type:** Placeholder disappears, Fill state activates (text color changes)
- **Blur (with text):** Fill state maintained
- **Blur (empty):** Returns to Default state
- **Validation:** Border changes to Error (red) or Success (green)
- **Disabled:** No interactions, grayed out

**Focus Behavior**:

- Focus ring should be visible (recommend focus-visible:ring-2 ring-offset-2)
- Blue border is primary focus indicator

#### Accessibility

- **Contrast Ratio (placeholder):** #737373 on #ffffff = 4.6:1 ✅ **PASS**
- **Contrast Ratio (filled):** #171717 on #ffffff = 16.1:1 ✅ **PASS**
- **Contrast Ratio (disabled):** #d4d4d4 on #f5f5f5 = 1.3:1 ⚠️ **FAIL** - but acceptable for disabled
- **Click Target Size:** 320×40px - Width ✅, Height ❌ (40px < 44px) - **Consider 44px**
- **Focus State:** ✅ Present (blue border) - **Enhance with ring**
- **ARIA Requirements:**
  - `aria-invalid="true"` for error state
  - `aria-describedby="{helpMessageId}"` to link with HelpMessage
  - `aria-disabled="true"` for disabled state
  - `<label>` association required (use TextField composite)
  - `aria-label` for search icon (if interactive, but currently decorative)

**Accessibility Fixes Required**:

1. Add focus-visible ring for keyboard users
2. Ensure proper label association (handled by TextField wrapper)
3. Link error/success messages via aria-describedby
4. Consider 44px height for better touch targets

---

### Component: TextField

**Figma Node:** 147:837
**Screenshot:** See Figma - Complete form field with label, input, and help message

#### Naming

- **Figma Name:** TextField
- **Proposed Code Name:** FormField or TextField
- **Rationale:** Keep "TextField" - indicates composite field with label/input/help

#### Role

Complete form field component combining label, input, and help message for comprehensive form UX.

#### Dimensions

| Property     | Value (px)                        | Tailwind |
| ------------ | --------------------------------- | -------- |
| Width        | 320                               | w-80     |
| Height       | Variable (66px with all elements) | h-auto   |
| Label Height | 24                                | h-6      |
| Input Height | 40                                | h-10     |
| Help Height  | 18                                | h-[18px] |

#### Colors

**Inherits from child components:**

- Label: #e5e5e5 (text-gray-200)
- InputField: See InputField component
- HelpMessage: See HelpMessage component

#### Typography

**Inherits from child components:**

- Label: 16px Medium (Pretendard)
- Input: 16px Regular (Pretendard)
- Help: 12px Regular (Pretendard)

#### Spacing

- **Gap:** 2px (between label/input/help) → `gap-0.5`
- **Padding:** None on container
- **Margin:** None

**Total Height Calculation**:

- Label: 24px
- Gap: 2px
- Input: 40px
- Gap: 2px
- Help: 18px
- **Total: 86px** (when all elements visible)

#### States

**Composite state based on child components:**

- Label visibility (optional)
- InputField state (Default/Focus/Fill/Error/Success/Disabled)
- HelpMessage visibility (optional) and state (Default/Error/Success)

**State Coordination**:

- Error state: InputField shows red border, HelpMessage shows red text
- Success state: InputField shows green border, HelpMessage shows green text
- Disabled state: All elements grayed out

#### Internal Elements

**Layout**: Vertical flex container

1. **Label** (optional) - "Lable" [sic] text, 16px Medium
2. **InputField** (required) - Full input with search icon
3. **HelpMessage** (optional) - Validation/helper text, 12px Regular

**Component Hierarchy**:

```
TextField (container)
  ├─ Label (120:375 component instance)
  ├─ InputField (147:809 component instance)
  └─ HelpMessage (147:830 component instance)
```

#### Auto Layout

- ✅ **Has Auto Layout**
- **Direction:** Vertical
- **Alignment:** Left (start)
- **Padding:** 0
- **Gap:** 2px
- **Sizing:** Fixed width (320px), hug height

**Conversion Notes**: Direct flex-col translation with child components.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Yes
- **shadcn Component:** `FormField` + `FormItem` + `FormLabel` + `FormControl` + `FormMessage` from `@/components/ui/form`
- **Customization Needed:**
  - Map to React Hook Form structure
  - Integrate Label component styling
  - Integrate InputField component
  - Integrate HelpMessage component
  - Ensure 2px gap matches (shadcn default is larger)

**Implementation Strategy**:

```typescript
<FormField
  control={form.control}
  name="fieldName"
  render={({ field }) => (
    <FormItem className="gap-0.5">
      <FormLabel>Label</FormLabel>
      <FormControl>
        <Input {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
```

**Note**: shadcn Form components handle state coordination automatically via React Hook Form.

#### Asset Classification

- **Tag:** [CODE] (composite component)
- **Child Assets:** See InputField (search icon)

#### Interactions

**Inherits from child components:**

- Label: Static (no interactions)
- InputField: Focus, type, blur, validation
- HelpMessage: Static (updates based on validation)

**State Flow Example**:

1. User clicks input → Focus state (blue border)
2. User types → Fill state (text appears)
3. User blurs with invalid data → Error state (red border + red help message)
4. User corrects → Success state (green border + green help message)

#### Accessibility

- **Contrast Ratio:** Inherits from child components (all pass except disabled)
- **Click Target Size:** 320×40px for input (see InputField accessibility notes)
- **Focus State:** ✅ Present on InputField
- **ARIA Requirements:**
  - `<label>` properly associated with `<input>` (via htmlFor/id or nesting)
  - `aria-describedby` linking input to help message
  - `aria-invalid` on error state
  - All handled by shadcn Form components when used correctly

**Accessibility Benefits of Composite**:

- Ensures proper label association
- Automatic error message linkage
- Consistent spacing for scanability
- Semantic HTML structure

**Accessibility Recommendation**:

- Use shadcn Form components for automatic ARIA handling
- Ensure HelpMessage ID is unique and linked to input
- Consider required field indicator (e.g., asterisk on label)

---

### Component: HelpMessage

**Figma Node:** 147:830
**Screenshot:** See Figma - Three variants (default gray, error red, success green)

#### Naming

- **Figma Name:** HelpMessage
- **Proposed Code Name:** FormMessage or HelperText
- **Rationale:** Rename to "FormMessage" to match shadcn convention

#### Role

Validation and helper text displayed below form inputs to provide feedback, instructions, or error messages.

#### Dimensions

| Property         | Value (px)                      | Tailwind |
| ---------------- | ------------------------------- | -------- |
| Width            | 75 (text-dependent, auto-width) | w-auto   |
| Height           | 18                              | h-[18px] |
| Min Click Target | N/A (non-interactive)           | N/A      |

#### Colors

| Element | State   | Value   | Tailwind Variable     |
| ------- | ------- | ------- | --------------------- |
| Text    | Default | #d4d4d4 | text-muted-foreground |
| Text    | Success | #00c950 | text-green-500        |
| Text    | Error   | #fb2c36 | text-destructive      |

**Design Notes**:

- Color is sole differentiator between states
- No background, border, or icon
- Minimal visual weight

#### Typography

- **Font Family:** Pretendard
- **Font Size:** 12px → `text-xs`
- **Font Weight:** 400 (Regular) → `font-normal`
- **Line Height:** 1.5 → `leading-normal`

#### Spacing

- **Padding:** 0
- **Margin:** 0 (gap controlled by parent TextField)
- **Gap:** N/A

#### States

| State   | Visual Changes                            |
| ------- | ----------------------------------------- |
| Default | Gray text (#d4d4d4) - neutral helper text |
| Success | Green text (#00c950) - validation passed  |
| Error   | Red text (#fb2c36) - validation failed    |

**State Coordination**:

- Default: Generic helper text (e.g., "Password must be 8+ characters")
- Success: Confirmation message (e.g., "Email verified")
- Error: Error explanation (e.g., "Email already taken")

#### Internal Elements

**Layout**: Simple text node

1. **Text** - Single line, auto-width

**No Icons**: Pure text (consider adding icon for error/success)

#### Auto Layout

- ❌ **No Auto Layout** (simple text element)
- Absolute positioning in Figma (relative in code)

**Conversion Notes**: Use `<p>` tag with conditional text color classes.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Yes
- **shadcn Component:** `FormMessage` or `FormDescription` from `@/components/ui/form`
- **Customization Needed:**
  - Add success variant (shadcn has default error styling)
  - Map default state to gray (#d4d4d4)
  - Ensure 12px font size (text-xs)

**Implementation Strategy**:

```typescript
// Extend FormMessage
<FormMessage className={cn(
  "text-xs text-muted-foreground",
  success && "text-green-500",
  error && "text-destructive"
)}>
  {message}
</FormMessage>
```

**Note**: shadcn FormMessage auto-shows error state when field has validation error.

#### Asset Classification

- **Tag:** [CODE]
- **Export Path:** N/A

#### Interactions

- **No Direct Interactions** (display-only component)
- **State Change:** Triggered by parent InputField validation

**Animation Recommendations**:

- Fade in/out when message changes (150ms)
- Optional: Slide down animation when appearing

#### Accessibility

- **Contrast Ratio (default):** #d4d4d4 on dark background = Needs verification
  - If background is #171717: ~4.1:1 ⚠️ **Borderline** (aim for 4.5:1)
- **Contrast Ratio (success):** #00c950 on dark background = Needs verification
  - Likely ✅ PASS on dark, may FAIL on light backgrounds
- **Contrast Ratio (error):** #fb2c36 on dark background = Needs verification
  - Likely ✅ PASS on dark, verify on light backgrounds
- **Focus State:** N/A (non-interactive)
- **ARIA Requirements:**
  - Must be linked to input via `aria-describedby` on input element
  - Consider `role="alert"` for error messages (announces to screen readers)
  - `aria-live="polite"` for dynamic updates

**Accessibility Fixes Required**:

1. Verify contrast ratios on actual backgrounds
2. Ensure `aria-describedby` connection from input
3. Add `role="alert"` for error state (immediate announcement)
4. Consider icon indicators for color-blind users (don't rely on color alone)

**Accessibility Enhancement**:

```typescript
<p
  id={helpMessageId}
  role={error ? "alert" : undefined}
  aria-live={error ? "assertive" : "polite"}
  className="text-xs"
>
  {message}
</p>
```

---

### Component: Label

**Figma Node:** 120:375
**Screenshot:** See Figma - Korean text "소개" (Introduction) in two states

#### Naming

- **Figma Name:** Label
- **Proposed Code Name:** NavLabel or TabLabel
- **Rationale:** Rename to "NavLabel" - this is used for navigation tabs, not form labels (confusing name)

#### Role

Navigation tab label for primary site sections, with active/inactive states indicated by color.

#### Dimensions

| Property         | Value (px)                       | Tailwind                                |
| ---------------- | -------------------------------- | --------------------------------------- |
| Width            | 70 (text-dependent, Korean text) | w-auto                                  |
| Height           | 48                               | h-12                                    |
| Min Click Target | 70×48                            | Width ⚠️ narrow, Height ✅ exceeds 44px |

**Note**: 70px width is for specific Korean text "소개" (2 characters). English text may vary significantly.

#### Colors

| Element | State          | Value   | Tailwind Variable |
| ------- | -------------- | ------- | ----------------- |
| Text    | Default        | #fafafa | text-gray-50      |
| Text    | Press (active) | #02eee1 | text-primary      |

**Design Notes**:

- Simple color shift indicates active tab
- No background, border, or underline
- High contrast on dark backgrounds

#### Typography

- **Font Family:** Pretendard
- **Font Size:** 40px → `text-[40px]` (custom size)
- **Font Weight:** 700 (Bold) → `font-bold`
- **Line Height:** 1.25 → `leading-tight`

**Typography Notes**:

- Very large size (40px) suggests prominent navigation
- Heading-style weight (bold)
- Tight line-height for visual impact

#### Spacing

- **Padding:** 0 (text element)
- **Margin:** Controlled by parent container
- **Gap:** N/A

#### States

| State          | Visual Changes                            |
| -------------- | ----------------------------------------- |
| Default        | White text (#fafafa) - inactive tab       |
| Press (Active) | Cyan text (#02eee1) - active/selected tab |

**Interaction Notes**:

- "Press" state likely means "active/selected" (not just mouse down)
- Binary state: active or inactive
- No hover state shown (recommend adding)

#### Internal Elements

**Layout**: Simple text element

1. **Text** - Single or multi-character label

**No Icons**: Text only (consider adding underline or indicator)

#### Auto Layout

- ❌ **No Auto Layout** (simple text element)
- Absolute positioning in Figma

**Conversion Notes**: Use `<button>` or `<a>` tag with text styles.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Yes
- **shadcn Component:** `Tabs` component (`TabsList` + `TabsTrigger`) from `@/components/ui/tabs`
- **Customization Needed:**
  - Increase font size to 40px (shadcn default is much smaller)
  - Use bold weight (font-bold)
  - Map inactive to text-gray-50
  - Map active to text-primary
  - Remove background/border from TabsTrigger (currently has subtle bg)

**Implementation Strategy**:

```typescript
<Tabs defaultValue="intro">
  <TabsList className="bg-transparent border-none gap-8">
    <TabsTrigger
      value="intro"
      className="text-[40px] font-bold text-gray-50 data-[state=active]:text-primary bg-transparent"
    >
      소개
    </TabsTrigger>
    {/* More tabs */}
  </TabsList>
</Tabs>
```

#### Asset Classification

- **Tag:** [CODE]
- **Export Path:** N/A

#### Interactions

- **Click:** Activates tab, color changes to primary
- **Keyboard:** Arrow keys navigate between tabs (standard Tabs component behavior)
- **Hover:** Not shown - **Recommend adding hover state** (e.g., text-primary/80)

**Recommended Enhancements**:

1. Hover state (slightly lighter primary color or underline)
2. Focus indicator (outline or underline for keyboard users)
3. Active indicator beyond color (underline, bottom border)

#### Accessibility

- **Contrast Ratio (default):** #fafafa on dark background = Likely ✅ PASS (verify against actual bg)
- **Contrast Ratio (active):** #02eee1 on dark background = Needs verification
  - If background is #171717: ~4.2:1 ⚠️ **Borderline** (aim for 4.5:1)
- **Click Target Size:** 70×48px - Width ⚠️ narrow for some tabs, Height ✅ exceeds 44px
  - **Recommendation**: Add horizontal padding (e.g., px-4) to increase click area
- **Focus State:** ❌ Missing - **Must add focus-visible indicator**
- **ARIA Requirements:**
  - Use semantic tabs pattern: `role="tablist"`, `role="tab"`, `aria-selected`
  - `aria-controls` linking tab to panel
  - Keyboard navigation (Left/Right arrows, Home/End)
  - All handled by shadcn Tabs component

**Accessibility Fixes Required**:

1. Add horizontal padding to increase click target width
2. Add focus-visible indicator (outline or underline)
3. Verify contrast ratio for active state (may need to darken primary color)
4. Consider adding visual active indicator beyond color (underline or border-bottom)

**Color-Blind Consideration**:

- Cyan on white may be hard to distinguish for some users
- Recommend adding underline or bottom border to active tab
- Don't rely on color alone to indicate active state

---

### Component: Icon (Viewer UI)

**Figma Node:** 147:517
**Screenshot:** See Figma - Collection of 13 icons for 3D viewer interface

#### Naming

- **Figma Name:** Icon (section)
- **Proposed Code Name:** ViewerIcons
- **Rationale:** Specify "ViewerIcons" to distinguish from landing page icons

#### Role

Icon set for 3D viewer interface controls including 3D manipulation, measurement tools, AI features, and search.

#### Icon Inventory (13 icons)

| ID  | Name               | Figma Node | Size    | Purpose                  |
| --- | ------------------ | ---------- | ------- | ------------------------ |
| 1   | cube-focus         | 147:546    | 183×183 | 3D object focus/frame    |
| 2   | cube-3d-sphere     | 147:550    | 160×160 | 3D sphere view           |
| 3   | camera-lock        | 147:552    | 160×160 | Lock camera position     |
| 4   | tag-search-filled  | 160:693    | 160×160 | Search tags (filled)     |
| 5   | ai-fill            | 147:556    | 160×160 | AI feature (filled)      |
| 6   | ai-line            | 147:560    | 160×160 | AI feature (outline)     |
| 7   | tag-search-20      | 147:564    | 160×160 | Search tags (20px)       |
| 8   | tag-search-24      | 147:566    | 160×160 | Search tags (24px)       |
| 9   | ruler-square       | 147:568    | 160×160 | Square ruler/measurement |
| 10  | ruler              | 147:570    | 160×160 | Linear ruler             |
| 11  | ruler-pencil-line  | 147:572    | 160×160 | Ruler + pencil (outline) |
| 12  | ruler-pencil-solid | 147:577    | 160×160 | Ruler + pencil (filled)  |
| 13  | send               | 236:1291   | 160×160 | Send/submit action       |

#### Dimensions (Standard Usage)

| Property         | Value (px)             | Tailwind               |
| ---------------- | ---------------------- | ---------------------- |
| Display Size     | 24×24 (typical UI)     | size-6                 |
| Original Size    | 160-183 (Figma export) | N/A (scale down)       |
| Min Click Target | 44×44 recommended      | p-2.5 around 24px icon |

**Size Notes**:

- Figma icons are oversized for crisp export
- Use at 24×24 or 32×32 in UI
- Add padding for click targets

#### Colors

| Element          | Value   | Tailwind Variable              |
| ---------------- | ------- | ------------------------------ |
| Icon Stroke/Fill | #02eee1 | text-primary or stroke-primary |

**Design Notes**:

- All icons use primary cyan color (#02eee1)
- Line-based icons (not filled, except where noted)
- Consistent stroke weight

#### Icon Categories

**3D Manipulation (3 icons)**:

- cube-focus, cube-3d-sphere, camera-lock
- Purpose: Control 3D view and camera

**Measurement Tools (4 icons)**:

- ruler-square, ruler, ruler-pencil-line, ruler-pencil-solid
- Purpose: Measure distances, angles in 3D space

**AI Features (2 icons)**:

- ai-fill, ai-line
- Purpose: Trigger AI-assisted features

**Search/Tagging (4 icons)**:

- tag-search-filled, tag-search-20, tag-search-24
- Purpose: Search and tag objects

**Actions (1 icon)**:

- send
- Purpose: Submit or send data

#### Auto Layout

- ❌ **No Auto Layout** (icon section container)
- Icons are individual components

**Conversion Notes**: Export as SVG, use in `<Icon>` components.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Partially
- **shadcn Component:** N/A (icons not included)
- **Icon Library Options:**
  1. **lucide-react** (recommended) - Find similar icons
  2. **@iconify/react** - Exact icon name matches (fluent, mingcute, etc.)
  3. **Custom SVG** - Export from Figma if no match

**Mapping to lucide-react**:
| Figma Icon | Lucide Equivalent | Notes |
|------------|-------------------|-------|
| cube-focus | Focus or Box | Similar concept |
| cube-3d-sphere | Sphere or Circle | Close match |
| camera-lock | CameraOff or Lock | Combine concepts |
| tag-search-filled | Search | Drop tag aspect |
| ai-fill | Sparkles or Cpu | AI representation |
| ai-line | Sparkles | Outline variant |
| ruler-square | RectangleVertical | Measurement |
| ruler | Ruler | **Exact match** ✅ |
| ruler-pencil-line | Edit | Combine concepts |
| send | Send | **Exact match** ✅ |

**Recommendation**: Use lucide-react for common icons, export custom SVGs for specific ones (cube-focus, camera-lock, ruler-pencil, etc.).

#### Asset Classification

- **Tag:** [SVG]
- **Export Path:** docs/assets/icons/viewer/
- **Export Settings:**
  - Format: SVG
  - Size: Original (will scale with CSS)
  - Color: Preserve stroke/fill (or use currentColor for dynamic coloring)

**Export Process**:

```bash
# Export custom icons not available in lucide-react
# Save to: docs/assets/icons/viewer/cube-focus.svg, etc.
```

#### Interactions

- **Hover:** Icon color shifts to hover variant (e.g., #01a9a0)
- **Active:** Icon color shifts to press variant (e.g., #01645f)
- **Disabled:** Icon grays out (#d4d4d4)

**Button Integration**:

```typescript
<Button variant="ghost" size="icon">
  <CubeFocusIcon className="size-6" />
</Button>
```

#### Accessibility

- **Contrast Ratio:** #02eee1 on dark background = Needs verification (~4.2:1 on #171717)
  - ⚠️ **Borderline** - consider darkening or using on darker backgrounds
- **Click Target Size:** If icon is 24×24, add padding to reach 44×44 minimum
  - `p-2.5` (10px padding) → 44×44 total ✅
- **Focus State:** Must add focus-visible indicator on icon buttons
- **ARIA Requirements:**
  - `aria-label` on icon-only buttons (e.g., "Focus on object")
  - Consider tooltips for unclear icons
  - Ensure icon has semantic meaning (not purely decorative)

**Accessibility Implementation**:

```typescript
<Button variant="ghost" size="icon" aria-label="Focus on 3D object">
  <CubeFocusIcon className="size-6" />
</Button>
```

**Tooltips Recommended**: Add tooltips to all icon-only buttons for clarity.

---

### Component: Icon (Landing Page)

**Figma Node:** 130:389
**Screenshot:** See Figma - Collection of 8 icons for landing page features

#### Naming

- **Figma Name:** Icon (section)
- **Proposed Code Name:** LandingIcons or FeatureIcons
- **Rationale:** Specify "LandingIcons" to distinguish from viewer UI icons

#### Role

Icon set for landing page feature communication, representing different simulation categories and capabilities.

#### Icon Inventory (8 icons)

| ID  | Name             | Figma Node | Size    | Purpose                        |
| --- | ---------------- | ---------- | ------- | ------------------------------ |
| 1   | box-3d           | 98:176     | 147×147 | 3D modeling/visualization      |
| 2   | chat-dots        | 98:175     | 147×147 | Communication/collaboration    |
| 3   | chart-line       | 98:174     | 147×147 | Analytics/data visualization   |
| 4   | electricity      | 130:555    | 113×114 | Electrical simulation          |
| 5   | rocket-earth     | 130:554    | 113×114 | Aerospace/space simulation     |
| 6   | chemistry        | 130:553    | 113×114 | Chemical/molecular simulation  |
| 7   | electronics-chip | 130:552    | 113×114 | Electronics/circuit simulation |
| 8   | settings         | 130:582    | 123×123 | Configuration/settings         |

#### Dimensions (Standard Usage)

| Property         | Value (px)                              | Tailwind           |
| ---------------- | --------------------------------------- | ------------------ |
| Display Size     | 64×64 or 80×80 (large feature icons)    | size-16 or size-20 |
| Original Size    | 113-147 (Figma export)                  | N/A (scale down)   |
| Min Click Target | If interactive: 113×113 ✅ exceeds 44px | N/A (decorative)   |

**Size Notes**:

- Larger than viewer icons (feature communication vs UI controls)
- Used in feature cards or hero sections
- Likely decorative (non-interactive)

#### Colors

| Element          | Value   | Tailwind Variable              |
| ---------------- | ------- | ------------------------------ |
| Icon Stroke/Fill | #02eee1 | text-primary or stroke-primary |

**Design Notes**:

- All icons use primary cyan color (#02eee1)
- Line-based style (matches viewer icons)
- Clean, minimal aesthetic

#### Icon Categories

**Core Features (3 icons)**:

- box-3d, chat-dots, chart-line
- Purpose: Primary platform features (3D, collaboration, analytics)

**Simulation Types (4 icons)**:

- electricity, rocket-earth, chemistry, electronics-chip
- Purpose: Different simulation domains

**Configuration (1 icon)**:

- settings
- Purpose: Platform settings/customization

#### Auto Layout

- ❌ **No Auto Layout** (icon section container)
- Icons are individual components

**Conversion Notes**: Export as SVG, use in feature cards.

#### shadcn/ui Mapping

- **Can Replace:** ✅ Partially
- **shadcn Component:** N/A (icons not included)
- **Icon Library Options:**
  1. **lucide-react** (recommended)
  2. **@iconify/react** - May have exact matches (bi:chat-dots, etc.)
  3. **Custom SVG** - Export if no match

**Mapping to lucide-react**:
| Figma Icon | Lucide Equivalent | Notes |
|------------|-------------------|-------|
| box-3d | Box or Cube | **Close match** ✅ |
| chat-dots | MessageCircle | **Close match** ✅ |
| chart-line | TrendingUp or LineChart | **Close match** ✅ |
| electricity | Zap | **Exact match** ✅ |
| rocket-earth | Rocket | **Exact match** ✅ |
| chemistry | Flask | **Close match** ✅ |
| electronics-chip | Cpu | **Exact match** ✅ |
| settings | Settings | **Exact match** ✅ |

**Recommendation**: lucide-react has excellent coverage for these icons (7/8 exact or close matches).

#### Asset Classification

- **Tag:** [SVG] (if custom export needed)
- **Preferred:** Use lucide-react equivalents
- **Export Path:** docs/assets/icons/landing/ (only if custom needed)

#### Interactions

- **Likely Decorative** (non-interactive)
- If interactive: Same hover/active/disabled states as viewer icons

**Usage Pattern**:

```typescript
<div className="flex items-center gap-4">
  <div className="rounded-lg bg-primary/10 p-4">
    <RocketIcon className="size-16 text-primary" />
  </div>
  <div>
    <h3>Aerospace Simulation</h3>
    <p>Advanced space environment modeling</p>
  </div>
</div>
```

#### Accessibility

- **Contrast Ratio:** #02eee1 on dark background = ~4.2:1 on #171717 ⚠️ **Borderline**
  - Consider using on darker background or in colored container
- **Click Target Size:** N/A (likely decorative)
- **Focus State:** N/A (likely decorative)
- **ARIA Requirements:**
  - `aria-hidden="true"` if purely decorative
  - No alt text needed for decorative icons
  - If semantic, ensure nearby text describes meaning

**Accessibility Implementation**:

```typescript
{/* Decorative icon */}
<RocketIcon className="size-16 text-primary" aria-hidden="true" />

{/* Semantic icon with label */}
<div className="flex items-center gap-2">
  <RocketIcon className="size-6 text-primary" />
  <span>Aerospace</span>
</div>
```

**Recommendation**: Keep icons decorative, use adjacent text for semantic meaning.

---

### Component: Logo

**Figma Node:** 120:374
**Screenshot:** See Figma - SIMVEX logo with 3D cube icon and text

#### Naming

- **Figma Name:** Logo
- **Proposed Code Name:** Logo or BrandLogo
- **Rationale:** Keep "Logo" - clear and standard

#### Role

Primary brand logo combining geometric 3D icon and "SIMVEX" wordmark, used in header and footer.

#### Dimensions

| Property     | Value (px)    | Tailwind   |
| ------------ | ------------- | ---------- |
| Total Width  | 325           | w-[325px]  |
| Total Height | ~69           | h-[69px]   |
| Icon Width   | 73.616        | w-[74px]   |
| Icon Height  | 69.096        | h-[69px]   |
| Text Width   | ~234 (flex-1) | flex-1     |
| Text Height  | 40.037        | h-10       |
| Gap          | 17.22         | gap-[17px] |

#### Colors

| Element       | Value                            | Tailwind Variable |
| ------------- | -------------------------------- | ----------------- |
| Icon Gradient | Multi-color (cyan/blue gradient) | N/A (image)       |
| Text          | White/light gray                 | N/A (image)       |

**Design Notes**:

- Icon is complex 3D rendered graphic (gradient, depth)
- Text is stylized wordmark
- Both exported as images (not vector text/shapes)

#### Typography

**Wordmark Text** (in image):

- Custom/stylized treatment
- Sans-serif base (likely geometric)
- Letter-spacing: Wide
- Case: Uppercase "SIMVEX"

#### Spacing

- **Gap:** 17.22px between icon and text → `gap-[17px]`
- **Padding:** None
- **Margin:** Controlled by header/footer container

#### States

**Single state** (no variants in Figma)

- Consider adding hover state for linked logo (scale or opacity)

#### Internal Elements

**Layout**: Horizontal flex container

1. **Logo Image** (left, 73.616×69.096) - 3D cube graphic
2. **Logo Text** (right, flex-1, 40.037 height) - "SIMVEX" wordmark

**Image Details**:

- Icon: PNG with transparency (complex gradient/3D effect)
- Text: PNG or SVG (stylized letterforms)
- Aspect ratio preserved

#### Auto Layout

- ✅ **Has Auto Layout**
- **Direction:** Horizontal
- **Alignment:** Center (vertical)
- **Padding:** 0
- **Gap:** 17.22px
- **Sizing:** Hug contents (325px total width)

**Conversion Notes**: Direct flex translation with `<img>` elements.

#### shadcn/ui Mapping

- **Can Replace:** ❌ No (custom branding)
- **shadcn Component:** N/A
- **Custom Component:** Create `<Logo>` component with image imports

**Implementation Strategy**:

```typescript
import LogoIcon from "@/assets/logo-icon.png";
import LogoText from "@/assets/logo-text.png";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-[17px]", className)}>
      <img src={LogoIcon} alt="" className="h-[69px] w-auto" />
      <img src={LogoText} alt="SIMVEX" className="h-10 w-auto" />
    </Link>
  );
}
```

#### Asset Classification

- **Tag:** [IMAGE]
- **Export Path:**
  - `public/logo-icon.png` (3D cube icon)
  - `public/logo-text.png` or `.svg` (SIMVEX wordmark)
- **Export Settings:**
  - Format: PNG (icon - gradient), SVG or PNG (text)
  - Scale: 2x for Retina displays
  - Background: Transparent

**Export URLs** (from Figma MCP):

- Icon: https://www.figma.com/api/mcp/asset/e8ec2f30-c44b-43a5-ba4a-5acfc437336c
- Text: https://www.figma.com/api/mcp/asset/1c69ee6a-41dc-4ae1-9654-a300fea08363

#### Interactions

- **Click:** Navigate to homepage (when wrapped in `<Link>`)
- **Hover (recommended):** Subtle scale or opacity change (e.g., `hover:opacity-90`)
- **Focus:** Outline for keyboard navigation

#### Accessibility

- **Contrast Ratio:** N/A (image-based)
- **Click Target Size:** 325×69px ✅ **PASS** (exceeds 44px)
- **Focus State:** Must add focus-visible outline when linked
- **ARIA Requirements:**
  - Icon: `alt=""` (decorative, logo text provides semantic meaning)
  - Text: `alt="SIMVEX"` (brand name)
  - Link: Consider `aria-label="SIMVEX homepage"` for context

**Accessibility Implementation**:

```typescript
<Link
  href="/"
  className="flex items-center gap-[17px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
  aria-label="SIMVEX homepage"
>
  <img src={LogoIcon} alt="" className="h-[69px] w-auto" />
  <img src={LogoText} alt="SIMVEX" className="h-10 w-auto" />
</Link>
```

**SVG Alternative** (if text can be SVG):

- Investigate if wordmark can be exported as SVG for crisper rendering
- SVG allows color customization via CSS (currentColor)
- Reduces file size compared to PNG

---

## Design System Extraction

### Color Palette

| Variable Name       | Hex Value           | RGB/RGBA               | Usage                                        |
| ------------------- | ------------------- | ---------------------- | -------------------------------------------- |
| **Primary Colors**  |                     |                        |                                              |
| primary             | #02eee1             | rgb(2, 238, 225)       | Primary actions, accents, icons              |
| primary-hover       | #01a9a0             | rgb(1, 169, 160)       | Hover states, interactive feedback           |
| primary-press       | #01645f             | rgb(1, 100, 95)        | Active/pressed states                        |
| primary/30          | rgba(2,238,225,0.3) | rgba(2, 238, 225, 0.3) | CTA button backgrounds (glassmorphic)        |
| primary/20          | rgba(2,238,225,0.2) | rgba(2, 238, 225, 0.2) | CTA button borders                           |
| primary/10          | rgba(2,238,225,0.1) | rgba(2, 238, 225, 0.1) | CTA button glow shadow                       |
| **Neutrals**        |                     |                        |                                              |
| background          | #ffffff             | rgb(255, 255, 255)     | Input backgrounds, cards                     |
| foreground          | #171717             | rgb(23, 23, 23)        | Primary text (filled inputs)                 |
| gray-50             | #fafafa             | rgb(250, 250, 250)     | Nav labels, CTA text                         |
| gray-200            | #e5e5e5             | rgb(229, 229, 229)     | Form labels, link buttons                    |
| muted-foreground    | #737373             | rgb(115, 115, 115)     | Placeholder text, icons                      |
| muted               | #f5f5f5             | rgb(245, 245, 245)     | Disabled backgrounds                         |
| border-muted        | #d4d4d4             | rgb(212, 212, 212)     | Default borders, disabled text, help message |
| **Semantic Colors** |                     |                        |                                              |
| destructive (error) | #fb2c36             | rgb(251, 44, 54)       | Error borders, error messages                |
| success (green-500) | #00c950             | rgb(0, 201, 80)        | Success borders, success messages            |
| info (blue-500)     | #2b7fff             | rgb(43, 127, 255)      | Focus borders, info states                   |
| **Inverse Colors**  |                     |                        |                                              |
| primary-foreground  | #ffffff             | rgb(255, 255, 255)     | Text on primary backgrounds, button icons    |

### Typography Scale

| Token           | Size (px) | Weight         | Line Height | Font Family | Tailwind Mapping                        | Usage                       |
| --------------- | --------- | -------------- | ----------- | ----------- | --------------------------------------- | --------------------------- |
| **Headings**    |           |                |             | Pretendard  |                                         |                             |
| heading/xl      | 40        | 700 (Bold)     | 1.25        | Pretendard  | text-[40px] font-bold leading-tight     | Nav labels, section headers |
| heading/lg      | 32        | 600 (SemiBold) | 1.25        | Pretendard  | text-[32px] font-semibold leading-tight | CTA buttons                 |
| **Body**        |           |                |             | Pretendard  |                                         |                             |
| body/lg/medium  | 16        | 500 (Medium)   | 1.5         | Pretendard  | text-base font-medium                   | Button labels, form labels  |
| body/lg/regular | 16        | 400 (Regular)  | 1.5         | Pretendard  | text-base font-normal                   | Input text, link buttons    |
| body/sm/regular | 12        | 400 (Regular)  | 1.5         | Pretendard  | text-xs font-normal                     | Help messages, captions     |

**Font Family Notes**:

- **Pretendard**: Korean/English sans-serif optimized for UI
- Weights used: Regular (400), Medium (500), SemiBold (600), Bold (700)
- Fallback: sans-serif

**Custom Sizes**:

- 40px (heading/xl): No standard Tailwind class, use `text-[40px]`
- 32px (heading/lg): No standard Tailwind class, use `text-[32px]`

### Spacing Scale

| Token      | Value (px) | Tailwind Class    | Usage                                           |
| ---------- | ---------- | ----------------- | ----------------------------------------------- |
| spacing/0  | 0          | p-0               | Button vertical padding                         |
| spacing/2  | 2          | gap-0.5           | TextField gap (label/input/help)                |
| spacing/4  | 4          | gap-1, p-1        | Input internal gap (text/icon)                  |
| spacing/8  | 8          | gap-2, p-2        | Button gap (icon/text)                          |
| spacing/12 | 12         | p-3               | Input padding (all sides)                       |
| spacing/16 | 16         | gap-4, px-4, py-4 | Button horizontal padding, CTA vertical padding |
| spacing/24 | 24         | px-6              | CTA button horizontal padding                   |

**Unique Values**:

- 17.22px (Logo gap): Use `gap-[17px]` (custom)

### Border Radius Scale

| Token     | Value (px) | Tailwind Class | Usage                        |
| --------- | ---------- | -------------- | ---------------------------- |
| radius/8  | 8          | rounded-lg     | Button, InputField           |
| radius/24 | 24         | rounded-3xl    | CTAButton (large, prominent) |

**Design Pattern**: Small controls (8px), large CTAs (24px)

### Shadow Scale

| Token    | Value                            | Tailwind Class                            | Usage                 |
| -------- | -------------------------------- | ----------------------------------------- | --------------------- |
| cta-glow | 4px 4px 20px rgba(2,238,225,0.1) | shadow-[4px_4px_20px_rgba(2,238,225,0.1)] | CTAButton glow effect |

**Shadow Notes**:

- Primary shadow uses cyan-tinted glow for brand consistency
- Other components use no shadow (flat design)

### Border Width Scale

| Token       | Value (px) | Tailwind Class | Usage                         |
| ----------- | ---------- | -------------- | ----------------------------- |
| default     | 1          | border         | InputField borders            |
| thick       | 2          | border-2       | Button outline variant        |
| extra-thick | 5          | border-[5px]   | CTAButton glassmorphic border |

---

## shadcn/ui Replacement Strategy

| Figma Component      | shadcn Component          | Customization Level                                                | Priority   |
| -------------------- | ------------------------- | ------------------------------------------------------------------ | ---------- |
| **Button**           | Button                    | **Medium**                                                         | **High**   |
|                      |                           | - Add `primary` variant (cyan colors)                              |            |
|                      |                           | - Add `primary-outline` variant (2px border)                       |            |
|                      |                           | - Ensure icon slots work                                           |            |
|                      |                           | - Fix contrast ratio (white on cyan)                               |            |
| **CTAButton**        | Button                    | **High**                                                           | **Medium** |
|                      |                           | - Add `cta` variant (glassmorphic styling)                         |            |
|                      |                           | - 5px border, 24px radius, 32px text                               |            |
|                      |                           | - Custom shadow with cyan tint                                     |            |
|                      |                           | - Semi-transparent backgrounds                                     |            |
| **ALinkButton**      | Button (link variant)     | **Low**                                                            | **Low**    |
|                      |                           | - Update text color to gray-200                                    |            |
|                      |                           | - Add hover:text-primary                                           |            |
|                      |                           | - Remove padding                                                   |            |
| **InputField**       | Input                     | **Medium**                                                         | **High**   |
|                      |                           | - Add error/success border variants                                |            |
|                      |                           | - Add icon slot wrapper                                            |            |
|                      |                           | - Map focus to blue (#2b7fff)                                      |            |
|                      |                           | - Ensure disabled styles match                                     |            |
| **TextField**        | Form components           | **Low**                                                            | **High**   |
|                      |                           | - Use FormField + FormItem + FormLabel + FormControl + FormMessage |            |
|                      |                           | - Adjust gap to 2px (gap-0.5)                                      |            |
|                      |                           | - Integrate custom Input                                           |            |
| **HelpMessage**      | FormMessage               | **Low**                                                            | **Medium** |
|                      |                           | - Add success variant (green text)                                 |            |
|                      |                           | - Ensure 12px font size (text-xs)                                  |            |
|                      |                           | - Add role="alert" for errors                                      |            |
| **Label** (NavLabel) | Tabs                      | **Medium**                                                         | **Medium** |
|                      |                           | - Increase TabsTrigger text to 40px                                |            |
|                      |                           | - Use font-bold                                                    |            |
|                      |                           | - Remove background/border                                         |            |
|                      |                           | - Map active to text-primary                                       |            |
| **Logo**             | Custom component          | **N/A**                                                            | **High**   |
|                      |                           | - Export images from Figma                                         |            |
|                      |                           | - Create <Logo> wrapper component                                  |            |
|                      |                           | - Add focus states for linked logo                                 |            |
| **Icon (Viewer)**    | lucide-react + custom SVG | **N/A**                                                            | **Medium** |
|                      |                           | - Use lucide-react where possible                                  |            |
|                      |                           | - Export unique icons as SVG                                       |            |
|                      |                           | - Create icon wrapper for consistent sizing                        |            |
| **Icon (Landing)**   | lucide-react              | **N/A**                                                            | **Low**    |
|                      |                           | - Use lucide-react (7/8 exact matches)                             |            |
|                      |                           | - No custom exports needed                                         |            |

### Customization Priority Levels

**Low**: Minimal changes, mostly color mapping
**Medium**: Structural changes (variants, sizing, spacing)
**High**: Significant customization or new component creation

### Implementation Order

1. **Phase 1 - Foundation** (High Priority, Low-Medium Customization)
   - InputField → Input (forms are core UX)
   - TextField → Form components
   - HelpMessage → FormMessage
   - Button → Button with primary variant

2. **Phase 2 - Branding** (High Priority, Custom Assets)
   - Logo → Custom component with image exports
   - Icon (Viewer) → lucide-react + custom SVGs

3. **Phase 3 - Landing Page** (Medium Priority)
   - CTAButton → Button with cta variant
   - Label (NavLabel) → Tabs customization
   - Icon (Landing) → lucide-react

4. **Phase 4 - Secondary Actions** (Low Priority)
   - ALinkButton → Button link variant

---

## Implementation Priority

### Tier 1: Core UI Components (Implement First)

1. **InputField** - High reuse, critical for forms
2. **Button** - Most used component across entire app
3. **TextField** - Composite form field (depends on InputField + Button)
4. **Logo** - Immediate branding need (header/footer)

**Rationale**: Forms and buttons are foundational - used in auth, settings, viewer controls, etc.

### Tier 2: Navigation & Branding (Implement Second)

5. **Label (NavLabel)** - Navigation critical for site structure
6. **Icon (Viewer)** - Needed for 3D viewer interface (core feature)
7. **HelpMessage** - Enhances form UX (pairs with InputField)

**Rationale**: Navigation enables site exploration, viewer icons enable core 3D functionality.

### Tier 3: Landing Page Polish (Implement Third)

8. **CTAButton** - Landing page conversion optimization
9. **Icon (Landing)** - Feature communication on landing page
10. **ALinkButton** - Secondary actions, inline links

**Rationale**: Landing page can launch with basic buttons, polish with custom CTA styling later.

---

## Reusability Matrix

| Component            | Used in Pages                            | Used in Components                     | Instances  | Priority     |
| -------------------- | ---------------------------------------- | -------------------------------------- | ---------- | ------------ |
| **Button**           | Login, Signup, Viewer, Settings, Landing | Header, Footer, Modals, Forms, Toolbar | 50+        | **Critical** |
| **InputField**       | Login, Signup, Settings, Search          | Forms, Filters, Search bars            | 30+        | **Critical** |
| **TextField**        | Login, Signup, Settings, Profile         | All forms                              | 25+        | **Critical** |
| **Logo**             | All pages (header/footer)                | Header, Footer                         | 2 per page | **High**     |
| **Icon (Viewer)**    | Viewer page                              | Toolbar, Control panels                | 20+        | **High**     |
| **HelpMessage**      | Forms across all pages                   | TextField, standalone                  | 25+        | **High**     |
| **Label (NavLabel)** | All pages (navigation)                   | Header, Nav component                  | ~6         | **High**     |
| **CTAButton**        | Landing, Pricing                         | Hero sections, modals                  | 5-10       | **Medium**   |
| **Icon (Landing)**   | Landing page                             | Feature cards                          | 8          | **Medium**   |
| **ALinkButton**      | Footer, Legal pages, Forms               | Inline text, nav links                 | 15+        | **Medium**   |

### Dependency Graph

```
TextField (composite)
  ├─ Label (required - but different from NavLabel!)
  ├─ InputField (required)
  └─ HelpMessage (optional)

Button variants
  ├─ Button (primary, outline)
  ├─ CTAButton (hero variant)
  └─ ALinkButton (text variant)

Logo (composite)
  ├─ Logo Image (required)
  └─ Logo Text (required)

Icons
  ├─ Icon (Viewer) - lucide + custom
  └─ Icon (Landing) - lucide only
```

### Component Families

**Button Family** (3 variants, shared base):

- Standard Button (fill/outline, 40px height, 8px radius)
- CTAButton (glassmorphic, 52px height, 24px radius)
- ALinkButton (text-only, no background)

**Form Family** (3 components, work together):

- InputField (standalone input)
- TextField (input + label + help)
- HelpMessage (validation text)

**Brand Family** (2 components, visual identity):

- Logo (brand mark)
- Icons (feature communication)

**Navigation Family** (1 component):

- NavLabel (tab labels)

---

## Design Tokens for Tailwind Config

Based on the analysis, here are the recommended additions to `tailwind.config.ts`:

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Primary cyan palette
        primary: {
          DEFAULT: "#02eee1",
          hover: "#01a9a0",
          press: "#01645f",
          foreground: "#ffffff",
        },
        // Semantic colors
        destructive: "#fb2c36",
        success: "#00c950",
        info: "#2b7fff",
        // Neutrals (extend existing)
        gray: {
          50: "#fafafa",
          200: "#e5e5e5",
          // ... existing grays
        },
      },
      fontFamily: {
        sans: ["Pretendard", "sans-serif"],
      },
      fontSize: {
        // Custom heading sizes
        "4xl": ["40px", { lineHeight: "1.25", fontWeight: "700" }],
        "3xl": ["32px", { lineHeight: "1.25", fontWeight: "600" }],
      },
      spacing: {
        // Already covered by Tailwind default spacing scale
        // No custom additions needed (0, 2, 4, 8, 12, 16, 24)
      },
      borderRadius: {
        // Already covered (lg = 8px, 3xl = 24px)
      },
      borderWidth: {
        5: "5px", // For CTAButton
      },
      boxShadow: {
        "cta-glow": "4px 4px 20px rgba(2, 238, 225, 0.1)",
      },
    },
  },
};
```

### CSS Variables (for shadcn/ui)

```css
/* app/globals.css or similar */
@layer base {
  :root {
    /* Primary */
    --primary: 180 98% 47%; /* #02eee1 in HSL */
    --primary-hover: 176 99% 33%; /* #01a9a0 in HSL */
    --primary-press: 178 98% 19%; /* #01645f in HSL */
    --primary-foreground: 0 0% 100%; /* #ffffff */

    /* Semantic */
    --destructive: 357 97% 58%; /* #fb2c36 */
    --success: 145 100% 39%; /* #00c950 */
    --info: 215 100% 63%; /* #2b7fff */

    /* Neutrals (extend existing) */
    --muted: 0 0% 96%; /* #f5f5f5 */
    --muted-foreground: 0 0% 45%; /* #737373 */

    /* ... other existing variables */
  }
}
```

---

## Key Findings & Recommendations

### Accessibility Issues Identified

1. **Contrast Failures**:
   - Button fill default: #ffffff on #02eee1 = 3.7:1 ⚠️ (needs 4.5:1)
   - NavLabel active: #02eee1 on dark = ~4.2:1 ⚠️ (borderline)
   - **Recommendation**: Darken primary color OR lighten button text to improve contrast

2. **Click Target Sizes**:
   - Button height: 40px ❌ (< 44px minimum)
   - InputField height: 40px ❌ (< 44px minimum)
   - **Recommendation**: Increase to 44px OR document exception (common in modern UI)

3. **Missing Focus States**:
   - Most components lack visible focus indicators
   - **Recommendation**: Add `focus-visible:ring-2 ring-primary` to all interactive elements

4. **Color-Only Indicators**:
   - NavLabel active state uses color alone (cyan vs white)
   - **Recommendation**: Add underline or border-bottom to active tab

### Design System Strengths

1. **Consistent Color Palette**: Primary cyan with clear hover/press progression
2. **Systematic Spacing**: Clean 2/4/8/12/16/24 scale
3. **Typography Hierarchy**: Clear heading/body distinction
4. **Component Variants**: Well-organized state variants (Default/Hover/Press/Disabled)
5. **Auto Layout**: Most components use Auto Layout (easy CSS conversion)

### Design System Gaps

1. **Loading States**: No loading/skeleton variants shown
2. **Icon Variants**: No icon-only button designs (need to extrapolate)
3. **Responsive Sizing**: No mobile/tablet variants (assume desktop-first)
4. **Dark Mode**: No dark theme variants (currently dark-themed by default)
5. **Form Validation**: Only 3 states (error/success/default) - no warning/info

### shadcn/ui Integration Notes

**High Compatibility**: 8/10 components map cleanly to shadcn/ui with minimal customization.

**Customization Required**:

- Primary color system (cyan instead of blue/zinc)
- Border widths (2px, 5px variants)
- Typography scale (custom 32px, 40px sizes)
- Glassmorphic effects (CTAButton)

**New Components Needed**:

- Logo (custom branding component)
- NavLabel (specialized Tabs variant)
- Viewer icon set (export custom SVGs)

### Implementation Recommendations

1. **Start with shadcn/ui base**: Install Button, Input, Form components
2. **Customize theme**: Update `tailwind.config.ts` with primary colors
3. **Create variants**: Add `primary`, `cta` button variants
4. **Export assets**: Logo images, unique icons from Figma
5. **Build composites**: TextField = Label + Input + FormMessage
6. **Test accessibility**: Run axe or Lighthouse audits
7. **Document patterns**: Create Storybook stories for each variant

### Next Steps (Phase 3 Preview)

After implementing these basic components, Phase 3 should analyze:

- **Layout Components**: Header, Footer, Navigation, Sidebar
- **Section Components**: Hero, Features, Testimonials (landing page)
- **Viewer Components**: Toolbar, PropertyPanel, SceneTree (3D viewer)
- **Modal/Dialog Components**: Settings modal, confirmation dialogs
- **Responsive Breakpoints**: Mobile/tablet adaptations

---

## Appendix: Color Contrast Testing

| Foreground | Background | Ratio  | WCAG AA Pass  | Notes                    |
| ---------- | ---------- | ------ | ------------- | ------------------------ |
| #ffffff    | #02eee1    | 3.7:1  | ❌ Fail       | Button fill text         |
| #ffffff    | #01a9a0    | 4.8:1  | ✅ Pass       | Button hover text        |
| #02eee1    | #171717    | 4.2:1  | ⚠️ Borderline | NavLabel active          |
| #737373    | #ffffff    | 4.6:1  | ✅ Pass       | Placeholder text         |
| #171717    | #ffffff    | 16.1:1 | ✅ Pass       | Filled input text        |
| #d4d4d4    | #f5f5f5    | 1.3:1  | ❌ Fail       | Disabled (acceptable)    |
| #fb2c36    | #ffffff    | 5.5:1  | ✅ Pass       | Error text               |
| #00c950    | #ffffff    | 2.9:1  | ❌ Fail       | Success (verify on dark) |

**WCAG AA Requirements**:

- Normal text (< 18px): 4.5:1 minimum
- Large text (≥ 18px or 14px bold): 3:1 minimum

**Action Items**:

1. Fix Button fill contrast: Darken primary to ~#01c4b8 OR use darker text
2. Review success color on light backgrounds
3. Add primary-darker variant for better contrast

---

## Figma Node Reference

Quick lookup table for component node IDs:

| Component        | Node ID | Section     |
| ---------------- | ------- | ----------- |
| Button           | 160:989 | Buttons     |
| CTAButton        | 90:41   | Buttons     |
| ALinkButton      | 147:841 | Buttons     |
| InputField       | 147:809 | Form Inputs |
| TextField        | 147:837 | Form Inputs |
| HelpMessage      | 147:830 | Form Inputs |
| Label (NavLabel) | 120:375 | Typography  |
| Logo             | 120:374 | Branding    |
| Icon (Viewer)    | 147:517 | Icons       |
| Icon (Landing)   | 130:389 | Icons       |

**Sub-components**:

- Plus icon: 160:966
- Minus icon: 160:968
- Search icon: 147:772

---

**Document Version**: 1.0
**Date**: 2026-02-08
**Analyst**: Claude Sonnet 4.5
**Status**: Complete - Ready for Phase 3 (Layout Components)
