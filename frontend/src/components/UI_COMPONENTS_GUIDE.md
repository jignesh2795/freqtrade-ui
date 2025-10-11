# UI Components Guide

This document provides usage examples and API references for all UI components implemented in Phase 0.

## Button

A versatile button component with multiple variants and sizes.

### Usage
```tsx
import { Button } from '@/components/ui';

// Basic button
<Button>Click me</Button>

// With variant
<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button variant="success">Success</Button>

// With size
<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

// Loading state
<Button loading>Loading...</Button>

// Disabled state
<Button disabled>Disabled</Button>

// Full width
<Button fullWidth>Full Width</Button>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'primary' \| 'secondary' \| 'ghost' \| 'danger' \| 'success' | 'primary' | Button style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Button size |
| loading | boolean | false | Show loading spinner |
| disabled | boolean | false | Disable button |
| fullWidth | boolean | false | Make button full width |

## Card

A container component for grouping related content.

### Usage
```tsx
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui';

<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card content</p>
  </CardContent>
  <CardFooter>
    <Button>Card Action</Button>
  </CardFooter>
</Card>
```

### Props
| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| Card | variant | 'default' \| 'glass' \| 'gradient' | 'default' | Card style variant |
| Card | padding | 'sm' \| 'md' \| 'lg' | 'md' | Card padding size |
| Card | hover | boolean | false | Add hover effect |

## Input

A text input component with validation and icon support.

### Usage
```tsx
import { Input } from '@/components/ui';
import { Mail, Lock } from 'lucide-react';

// Basic input
<Input label="Email" placeholder="Enter your email" />

// With icon
<Input 
  label="Email" 
  placeholder="Enter your email" 
  leftIcon={<Mail className="w-4 h-4" />} 
/>

// With error
<Input 
  label="Email" 
  placeholder="Enter your email" 
  error="Please enter a valid email" 
/>

// With helper text
<Input 
  label="Email" 
  placeholder="Enter your email" 
  helperText="We'll never share your email" 
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Input label |
| error | string | - | Error message |
| helperText | string | - | Helper text below input |
| leftIcon | ReactNode | - | Icon on the left side |
| rightIcon | ReactNode | - | Icon on the right side |
| fullWidth | boolean | true | Make input full width |

## Select

A dropdown select component.

### Usage
```tsx
import { Select } from '@/components/ui';

const options = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3', disabled: true },
];

<Select
  label="Choose Option"
  options={options}
  value={selectValue}
  onChange={setSelectValue}
  placeholder="Select an option"
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Select label |
| options | SelectOption[] | [] | Array of options |
| value | string | - | Selected value |
| onChange | (value: string) => void | - | Change handler |
| placeholder | string | - | Placeholder text |
| error | string | - | Error message |
| disabled | boolean | false | Disable select |

## Modal

A dialog component for important information.

### Usage
```tsx
import { Modal, ModalFooter } from '@/components/ui';

<Modal
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  title="Modal Title"
  description="Modal description"
>
  <p>Modal content</p>
  <ModalFooter>
    <Button onClick={() => setIsModalOpen(false)}>Cancel</Button>
    <Button variant="primary">Confirm</Button>
  </ModalFooter>
</Modal>
```

### Props
| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| Modal | isOpen | boolean | false | Control modal visibility |
| Modal | onClose | () => void | - | Close handler |
| Modal | title | string | - | Modal title |
| Modal | description | string | - | Modal description |

## Toast

Notification messages for user feedback.

### Usage
```tsx
import { ToastContainer } from '@/components/ui';
import { useToast } from '@/hooks';

// In your component
const { toasts, success, error, warning, info } = useToast();

// Show toasts
success('Success!', 'Operation completed');
error('Error!', 'Something went wrong');
warning('Warning!', 'Please be careful');
info('Info', 'Here is some information');

// In your JSX
<ToastContainer toasts={toasts} />
```

### Props
| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| ToastContainer | toasts | ToastProps[] | [] | Array of toast objects |
| ToastContainer | position | 'top-right' \| 'top-left' \| 'bottom-right' \| 'bottom-left' \| 'top-center' \| 'bottom-center' | 'top-right' | Toast position |

## Badge

Status indicators and labels.

### Usage
```tsx
import { Badge } from '@/components/ui';

// Basic badge
<Badge>Default</Badge>

// With variant
<Badge variant="primary">Primary</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="danger">Danger</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="info">Info</Badge>

// With dot
<Badge variant="success" dot>Active</Badge>

// With size
<Badge size="sm">Small</Badge>
<Badge size="md">Medium</Badge>
<Badge size="lg">Large</Badge>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'default' \| 'primary' \| 'success' \| 'danger' \| 'warning' \| 'info' | 'default' | Badge style variant |
| size | 'sm' \| 'md' \| 'lg' | 'md' | Badge size |
| dot | boolean | false | Show status dot |

## Switch

A toggle switch component.

### Usage
```tsx
import { Switch } from '@/components/ui';

<Switch
  checked={switchValue}
  onChange={setSwitchValue}
  label="Enable feature"
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| checked | boolean | false | Switch state |
| onChange | (checked: boolean) => void | - | Change handler |
| label | string | - | Switch label |
| disabled | boolean | false | Disable switch |

## Slider

A range slider component.

### Usage
```tsx
import { Slider } from '@/components/ui';

<Slider
  label="Volume"
  value={sliderValue}
  onChange={setSliderValue}
  min={0}
  max={100}
  showValue
/>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| label | string | - | Slider label |
| value | number | - | Slider value |
| onChange | (value: number) => void | - | Change handler |
| min | number | 0 | Minimum value |
| max | number | 100 | Maximum value |
| step | number | 1 | Step increment |
| showValue | boolean | false | Show value label |
| marks | { value: number; label: string }[] | [] | Marks with labels |

## Tabs

Content organization component.

### Usage
```tsx
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui';

<Tabs defaultValue="tab1">
  <TabsList>
    <TabsTrigger value="tab1">Tab 1</TabsTrigger>
    <TabsTrigger value="tab2">Tab 2</TabsTrigger>
  </TabsList>
  <TabsContent value="tab1">
    <p>Tab 1 content</p>
  </TabsContent>
  <TabsContent value="tab2">
    <p>Tab 2 content</p>
  </TabsContent>
</Tabs>
```

### Props
| Component | Prop | Type | Default | Description |
|-----------|------|------|---------|-------------|
| Tabs | defaultValue | string | - | Default active tab |
| TabsTrigger | value | string | - | Tab value |
| TabsContent | value | string | - | Tab value |

## Spinner

Loading indicator component.

### Usage
```tsx
import { Spinner } from '@/components/ui';

<Spinner />
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />
<Spinner size="xl" />
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| size | 'sm' \| 'md' \| 'lg' \| 'xl' | 'md' | Spinner size |

## Skeleton

Placeholder loading states.

### Usage
```tsx
import { Skeleton } from '@/components/ui';

<Skeleton variant="text" width="100%" />
<Skeleton variant="circular" width={50} height={50} />
<Skeleton variant="rectangular" width="100%" height={100} />
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | 'text' \| 'circular' \| 'rectangular' | 'text' | Skeleton variant |
| width | string \| number | - | Width |
| height | string \| number | - | Height |

## Tooltip

Contextual help component.

### Usage
```tsx
import { Tooltip } from '@/components/ui';

<Tooltip content="Tooltip content" position="top">
  <Button>Hover me</Button>
</Tooltip>
```

### Props
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| content | string \| ReactNode | - | Tooltip content |
| position | 'top' \| 'bottom' \| 'left' \| 'right' | 'top' | Tooltip position |
| delay | number | 200 | Delay in ms before showing |