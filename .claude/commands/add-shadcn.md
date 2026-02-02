# Add shadcn/ui Component

Add and configure a shadcn/ui component to the project.

## Steps

1. Ask which component(s) to install (e.g., button, card, dialog)
2. Run the installation command:
   ```bash
   npx shadcn@latest add {component-name}
   ```
3. Show the component location: `src/components/ui/{component-name}.tsx`
4. Provide a usage example:

   ```tsx
   import { Button } from "@/components/ui/button";

   export function MyComponent() {
     return <Button variant="outline">Click me</Button>;
   }
   ```

5. If multiple components are installed, show how they work together
6. Suggest creating a Storybook story for the new component

## Common Components

- **button**: Basic button with variants
- **card**: Card container with header/content/footer
- **dialog**: Modal dialog
- **dropdown-menu**: Dropdown menu
- **input**: Text input
- **label**: Form label
- **select**: Select dropdown
- **textarea**: Multi-line text input
- **toast**: Toast notifications
- **tooltip**: Tooltips

## Variants Reference

Most shadcn components support these variants:

- **variant**: default, destructive, outline, secondary, ghost, link
- **size**: default, sm, lg, icon

## Example Workflow

1. Install: `npx shadcn@latest add button card`
2. Use in component:

   ```tsx
   import { Button } from "@/components/ui/button";
   import {
     Card,
     CardHeader,
     CardTitle,
     CardContent,
   } from "@/components/ui/card";

   export function Panel() {
     return (
       <Card>
         <CardHeader>
           <CardTitle>Control Panel</CardTitle>
         </CardHeader>
         <CardContent>
           <Button>Action</Button>
         </CardContent>
       </Card>
     );
   }
   ```
