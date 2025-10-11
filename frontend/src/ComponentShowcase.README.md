# Component Showcase Page

This file contains the ComponentShowcase component which demonstrates all UI components in an interactive tabbed interface.

## Overview

The ComponentShowcase page is organized into 5 main tabs:

1. **Buttons** - Shows all button variants, sizes, and states
2. **Inputs** - Displays input fields, selects, switches, and sliders
3. **Feedback** - Demonstrates modals, toasts, and tooltips
4. **Data Display** - Shows badges and card variants
5. **Loading** - Displays spinners and skeleton loaders

## Features

- Interactive component demos
- Tabbed navigation for organized viewing
- Live examples of all UI components
- Proper TypeScript typing
- Responsive design
- Dark theme styling

## Components Demonstrated

- Button (5 variants, 3 sizes, states)
- Card (3 variants with header/content/footer)
- Input (with validation, icons, error states)
- Select (with options and error states)
- Modal (with header, content, footer)
- Toast (success, error, warning, info)
- Badge (6 variants, dot indicators)
- Switch (toggle with labels)
- Slider (with marks and values)
- Tabs (tabbed interface)
- Spinner (4 sizes)
- Skeleton (text, circular, rectangular)
- Tooltip (4 positions)

## Usage

The component showcase is already integrated into the main App.tsx file and can be accessed by clicking the "Open Component Showcase" button on the homepage.

## Implementation Details

The page uses the following imports:
```tsx
import { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  Input,
  Select,
  Modal,
  ModalFooter,
  Badge,
  Switch,
  Slider,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
  Spinner,
  Skeleton,
  Tooltip,
  ToastContainer,
} from '@/components/ui';
import { useToast } from '@/hooks';
import { Search, Mail, Lock } from 'lucide-react';
```

All components are properly typed and follow the project's design system.