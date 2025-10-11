# FreqTrade UI - Phase 0: Design System

Professional Trading Bot Interface built with React, TypeScript, and Tailwind CSS.

## Overview

This project is the frontend interface for FreqTrade, a powerful cryptocurrency trading bot. Phase 0 focuses on establishing the design system and implementing reusable UI components.

## Features

### UI Components
- Button - Multiple variants and sizes
- Card - Different styles with header/content/footer
- Input - Text inputs with validation and icons
- Select - Custom dropdown with search capabilities
- Modal - Accessible dialog with header and footer
- Toast - Notification system with auto-dismiss
- Badge - Status indicators with dot variants
- Switch - Toggle component with labels
- Slider - Range selector with marks
- Tabs - Content organization with keyboard navigation
- Spinner - Loading indicators in multiple sizes
- Skeleton - Placeholder loading states
- Tooltip - Contextual help with positioning options

### Technical Features
- React 18 with TypeScript
- Vite build tool for fast development
- Tailwind CSS v4 with custom design system
- Responsive design with mobile-first approach
- Dark theme with glass morphism effects
- Full TypeScript type safety
- ESLint and Prettier for code quality
- Path aliases for clean imports

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
cd frontend
npm install
```

### Development
```bash
npm run dev
```
Open http://localhost:5173 in your browser.

### Build
```bash
npm run build
```

### Type Checking
```bash
npm run type-check
```

### Linting
```bash
npm run lint
```

## Project Structure
```
src/
├── components/     # Reusable UI components
├── hooks/          # Custom React hooks
├── stories/        # Component demos
├── App.tsx         # Main application component
├── main.tsx        # Application entry point
└── vite-env.d.ts   # TypeScript declarations
```

## Component Showcase
Visit the component showcase at the root URL to see all UI components in action with live examples and interactions.

## Design System
- Custom dark theme with glass morphism effects
- Consistent spacing and typography
- Responsive breakpoints for all device sizes
- Accessible color palette and contrast ratios
- Smooth animations and transitions

## Next Steps
Phase 1 will focus on:
1. API Service Layer - Connect to FreqTrade backend
2. WebSocket Integration - Real-time market data
3. State Management - Zustand stores for application state
4. Routing Setup - React Router for navigation
5. Layout Components - Sidebar, Header, Dashboard layout

## License
This project is part of the FreqTrade UI initiative.