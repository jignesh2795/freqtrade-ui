# Tooltip Component

A contextual help component that displays additional information when hovering over an element.

## Usage

```tsx
import { Tooltip } from '@/components/ui/Tooltip';
import { Button } from '@/components/ui/Button';

// Basic usage
<Tooltip content="This is a tooltip">
  <Button>Hover me</Button>
</Tooltip>

// With position
<Tooltip content="Top tooltip" position="top">
  <Button>Top</Button>
</Tooltip>

// With delay
<Tooltip content="Delayed tooltip" delay={500}>
  <Button>Delayed</Button>
</Tooltip>

// With rich content
<Tooltip content={
  <div>
    <p className="font-bold">Rich Content</p>
    <p>This is HTML content in a tooltip</p>
  </div>
}>
  <Button>Rich Content</Button>
</Tooltip>
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | string \| ReactNode | - | Tooltip content |
| children | ReactElement | - | Element to attach tooltip to |
| position | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | Tooltip position |
| delay | number | 200 | Delay in ms before showing tooltip |

## Features

- ✅ Positioning (top, bottom, left, right)
- ✅ Custom delay
- ✅ Rich content support
- ✅ Accessible
- ✅ Responsive
- ✅ TypeScript support

## Implementation Details

The Tooltip component uses React's `cloneElement` to attach mouse event handlers to the child element. It calculates position based on the child's bounding rectangle and uses `createPortal` to render the tooltip at the document body level to avoid z-index issues.

## Styling

The component uses Tailwind CSS classes for styling with the following key classes:
- `bg-dark-700` for the background
- `border border-dark-600` for the border
- `px-3 py-2 rounded-lg` for padding and rounded corners
- `animate-fade-in` for smooth appearance
- Position-specific classes for arrow placement

## Accessibility

- The tooltip is hidden from screen readers by default
- Proper ARIA attributes can be added if needed
- Keyboard navigation support through the parent element