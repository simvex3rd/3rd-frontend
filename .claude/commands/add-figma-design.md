# Add Figma Design to Storybook

Link a Figma design to a Storybook story for side-by-side comparison.

## Steps

1. Ask for the Figma URL (file, prototype, component, or frame)
2. Ask which story file to update
3. Add the design parameter to the story

## Figma URL Types

You can link:

- **Figma File**: `https://www.figma.com/file/ABC123/Project-Name`
- **Prototype**: `https://www.figma.com/proto/ABC123/...`
- **Component**: `https://www.figma.com/file/ABC123/...?node-id=123:456`
- **Frame**: Any specific frame within a file

## Implementation

Add the `design` parameter to your story:

```tsx
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "./Button";

const meta = {
  title: "UI/Button",
  component: Button,
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/ABC123/Design-System?node-id=123:456",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};
```

## Multiple Designs

You can link multiple designs to one story:

```tsx
parameters: {
  design: [
    {
      type: "figma",
      name: "Desktop",
      url: "https://www.figma.com/file/.../desktop",
    },
    {
      type: "figma",
      name: "Mobile",
      url: "https://www.figma.com/file/.../mobile",
    },
  ],
},
```

## Per-Story Design

You can also add designs to individual stories:

```tsx
export const Primary: Story = {
  args: { variant: "primary" },
  parameters: {
    design: {
      type: "figma",
      url: "https://www.figma.com/file/.../primary-button",
    },
  },
};
```

## Tips

- The Figma design will appear in the "Design" tab in Storybook
- Updates in Figma are reflected automatically (Live Embed)
- No API key required
- Works with any Figma file sharing setting

## Getting Figma URL

1. Open Figma file
2. Select component/frame (optional)
3. Click "Share" → "Copy link"
4. Paste the URL in the design parameter

## Verification

After adding, run:

```bash
pnpm storybook
```

Check the "Design" tab in the story to see the Figma embed.
