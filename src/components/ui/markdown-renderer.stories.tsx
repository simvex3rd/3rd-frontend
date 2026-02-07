import type { Meta, StoryObj } from "@storybook/nextjs";
import { MarkdownRenderer } from "./markdown-renderer";

/**
 * Markdown renderer component with syntax highlighting for code blocks.
 * Supports headings, lists, code blocks, links, tables, and more.
 *
 * Based on Figma design: markdown (276x217)
 */
const meta: Meta<typeof MarkdownRenderer> = {
  title: "UI/MarkdownRenderer",
  component: MarkdownRenderer,
  parameters: {
    layout: "padded",
    backgrounds: {
      default: "dark",
      values: [{ name: "dark", value: "#090909" }],
    },
    docs: {
      description: {
        component:
          "A comprehensive markdown renderer with syntax highlighting, supporting all common markdown features including headings, lists, code blocks, tables, and more. Styled according to Figma design (node-337:1343).",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    children: {
      control: "text",
      description: "Markdown content to render",
    },
    compact: {
      control: "boolean",
      description: "Use compact spacing for dense layouts",
    },
  },
};

export default meta;
type Story = StoryObj<typeof MarkdownRenderer>;

const basicMarkdown = `# Hello World

This is a **bold** statement and this is *italic*.

You can also use \`inline code\` like this.`;

const comprehensiveMarkdown = `# Markdown Renderer

This component supports **all common markdown features**.

## Headings

You can use headings from H1 to H4:

### This is H3
#### This is H4

## Text Formatting

- **Bold text** for emphasis
- *Italic text* for subtle emphasis
- \`inline code\` for technical terms
- ~~Strikethrough~~ (if supported)

## Lists

### Unordered List
- First item
- Second item
  - Nested item
  - Another nested
- Third item

### Ordered List
1. First step
2. Second step
3. Third step

## Code Blocks

Inline code: \`const greeting = "Hello";\`

Block code:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return true;
}

greet("World");
\`\`\`

## Links

Visit [OpenAI](https://openai.com) for more information.

## Blockquotes

> This is a blockquote.
> It can span multiple lines.

## Horizontal Rule

---

## Tables

| Feature | Supported |
|---------|-----------|
| Headings | ✅ |
| Lists | ✅ |
| Code | ✅ |
| Tables | ✅ |`;

const codeExamplesMarkdown = `# Code Examples

## TypeScript

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function createUser(data: User): Promise<User> {
  return fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify(data)
  }).then(res => res.json());
}
\`\`\`

## Python

\`\`\`python
def fibonacci(n):
    """Generate Fibonacci sequence up to n"""
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a + b
    print()

fibonacci(100)
\`\`\`

## JSON

\`\`\`json
{
  "name": "markdown-renderer",
  "version": "1.0.0",
  "dependencies": {
    "react-markdown": "^10.1.0",
    "rehype-highlight": "^7.0.2"
  }
}
\`\`\``;

const chatMessageMarkdown = `Here's how to use the component:

\`\`\`tsx
<MarkdownRenderer>
  # Your markdown here
</MarkdownRenderer>
\`\`\`

Key features:
- **Syntax highlighting** for code blocks
- Support for all common markdown elements
- Customizable spacing with \`compact\` prop
- Dark mode support`;

const documentationMarkdown = `# API Reference

## Props

### MarkdownRenderer

Main component for rendering markdown content.

**Props:**
- \`children\` (string, required): Markdown content
- \`compact\` (boolean, optional): Use compact spacing
- \`className\` (string, optional): Additional CSS classes

## Usage

\`\`\`tsx
import { MarkdownRenderer } from "@/components/ui/markdown-renderer";

export function MyComponent() {
  const content = "# Hello\\nWorld";

  return <MarkdownRenderer>{content}</MarkdownRenderer>;
}
\`\`\`

## Features

1. **Automatic syntax highlighting** using highlight.js
2. **Responsive tables** with horizontal scroll
3. **Customizable styling** via className prop
4. **Dark mode support** out of the box

---

For more information, see the [documentation](https://github.com).`;

const taskListMarkdown = `# Development Tasks

## Completed ✅
- [x] Set up React project
- [x] Install dependencies
- [x] Create base components

## In Progress 🚧
- [ ] Implement markdown renderer
- [ ] Add syntax highlighting
- [ ] Write comprehensive tests

## Planned 📋
- [ ] Add more themes
- [ ] Improve performance
- [ ] Add plugins support`;

const technicalDocMarkdown = `# Three.js Scene Setup

## Installation

\`\`\`bash
npm install three @react-three/fiber @react-three/drei
\`\`\`

## Basic Scene

\`\`\`tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

export function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} />
      <OrbitControls />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="cyan" />
      </mesh>
    </Canvas>
  );
}
\`\`\`

## Performance Tips

> Always dispose of geometries and materials when unmounting components to prevent memory leaks.

**Best practices:**
1. Use \`useFrame\` for animations
2. Implement instancing for repeated objects
3. Use \`useMemo\` for expensive calculations`;

/**
 * Basic markdown with headings, bold, italic, and inline code.
 */
export const Basic: Story = {
  args: {
    children: basicMarkdown,
  },
};

/**
 * Comprehensive example showing all markdown features.
 */
export const Comprehensive: Story = {
  args: {
    children: comprehensiveMarkdown,
  },
};

/**
 * Multiple code blocks with different languages and syntax highlighting.
 */
export const CodeExamples: Story = {
  args: {
    children: codeExamplesMarkdown,
  },
};

/**
 * Compact mode with reduced spacing for dense layouts.
 */
export const Compact: Story = {
  args: {
    children: comprehensiveMarkdown,
    compact: true,
  },
};

/**
 * Chat message style markdown (typical AI response).
 */
export const ChatMessage: Story = {
  args: {
    children: chatMessageMarkdown,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[500px] p-4">
        <Story />
      </div>
    ),
  ],
};

/**
 * Documentation style with API reference.
 */
export const Documentation: Story = {
  args: {
    children: documentationMarkdown,
  },
};

/**
 * Task list with checkboxes (rendered as text).
 */
export const TaskList: Story = {
  args: {
    children: taskListMarkdown,
  },
};

/**
 * Technical documentation with code and tips.
 */
export const TechnicalDoc: Story = {
  args: {
    children: technicalDocMarkdown,
  },
};

/**
 * Dark theme demonstration.
 */
export const DarkTheme: Story = {
  args: {
    children: comprehensiveMarkdown,
  },
  decorators: [
    (Story) => (
      <div className="p-6">
        <Story />
      </div>
    ),
  ],
};

/**
 * Custom styled container.
 */
export const CustomStyled: Story = {
  args: {
    children: chatMessageMarkdown,
    className: "border border-[var(--primary-cyan)] p-4 rounded-lg",
  },
};

/**
 * Narrow container (like chat bubble).
 */
export const NarrowContainer: Story = {
  args: {
    children: `# Quick Tip

Use \`compact\` mode for **chat bubbles** and narrow containers.

\`\`\`tsx
<MarkdownRenderer compact>
  {content}
</MarkdownRenderer>
\`\`\``,
    compact: true,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[276px] p-3">
        <Story />
      </div>
    ),
  ],
};

/**
 * Empty state.
 */
export const Empty: Story = {
  args: {
    children: "",
  },
};

/**
 * Only headings.
 */
export const OnlyHeadings: Story = {
  args: {
    children: `# Heading 1
## Heading 2
### Heading 3
#### Heading 4`,
  },
};

/**
 * Only code block.
 */
export const OnlyCode: Story = {
  args: {
    children: `\`\`\`javascript
console.log("Hello, World!");
const sum = (a, b) => a + b;
console.log(sum(2, 3));
\`\`\``,
  },
};
