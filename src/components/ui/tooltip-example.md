# Tooltip Component Usage

## Basic Example

```tsx
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { IconButton } from "@/components/ui/icon-button";

export function ToolbarWithTooltips() {
  return (
    <TooltipProvider>
      <div className="flex gap-[8px]">
        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="menu" />
          </TooltipTrigger>
          <TooltipContent side="top">Open menu</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <IconButton iconName="close" />
          </TooltipTrigger>
          <TooltipContent side="bottom">Close panel</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}
```

## API

### TooltipProvider

Wraps all tooltips. Set global delay duration.

Props:

- `delayDuration?: number` - Default: 300ms

### Tooltip

Individual tooltip container.

Props:

- `delayDuration?: number` - Override global delay

### TooltipTrigger

Element that triggers the tooltip.

Props:

- `asChild?: boolean` - Pass events to child component

### TooltipContent

Tooltip popup content.

Props:

- `side?: "top" | "bottom" | "left" | "right"` - Default: "top"
- `sideOffset?: number` - Distance from trigger in pixels. Default: 8

## Design Tokens

- Background: `bg-neutral-700`
- Text: `text-neutral-50`
- Font size: `text-[12px]`
- Padding: `px-[12px] py-[6px]`
- Border radius: `rounded-[8px]`
- Arrow: 6px triangle
