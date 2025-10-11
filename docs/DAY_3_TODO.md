# Day 3: Design System & Base Components - TODO List

## Morning Session (3-4 hours)

### Step 1: Create Design System Branch

```bash
# Switch to develop and merge react-setup
git checkout develop
git merge phase-0/react-setup

# Create new branch for design system
git checkout -b phase-0/design-system
git push -u origin phase-0/design-system
```

### Step 2: Create Base UI Components - Button

```bash
cd frontend/src/components/ui

# Create Button directory
mkdir Button

# Create Button/Button.tsx
cat > Button/Button.tsx << 'EOF'
import React from 'react';
import { clsx } from 'clsx';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      disabled,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md',
      secondary:
        'bg-dark-700 text-dark-100 hover:bg-dark-600 focus:ring-dark-500 border border-dark-600',
      ghost:
        'bg-transparent text-dark-200 hover:bg-dark-800 focus:ring-dark-500',
      danger:
        'bg-danger-600 text-white hover:bg-danger-700 focus:ring-danger-500 shadow-sm hover:shadow-md',
      success:
        'bg-success-600 text-white hover:bg-success-700 focus:ring-success-500 shadow-sm hover:shadow-md',
    };

    const sizeStyles = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-base rounded-lg',
      lg: 'px-6 py-3 text-lg rounded-xl',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          sizeStyles[size],
          fullWidth && 'w-full',
          className
        )}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
EOF

# Create Button/index.ts
cat > Button/index.ts << 'EOF'
export { Button } from './Button';
export type { ButtonProps } from './Button';
EOF
```

**🔴 COMMIT POINT 19:**
```bash
cd ../../../..
git add frontend/src/components/ui/Button/
git commit -m "feat(ui): add Button component

- Multiple variants (primary, secondary, ghost, danger, success)
- Three sizes (sm, md, lg)
- Loading state with spinner
- Full width option
- Fully accessible with focus states
- TypeScript types included"

git push origin phase-0/design-system
```

### Step 3: Create Card Component

```bash
cd frontend/src/components/ui
mkdir Card

# Create Card/Card.tsx
cat > Card/Card.tsx << 'EOF'
import React from 'react';
import { clsx } from 'clsx';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'gradient';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  hover?: boolean;
  children: React.ReactNode;
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      variant = 'default',
      padding = 'md',
      hover = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    const baseStyles = 'rounded-xl transition-all duration-200';

    const variantStyles = {
      default: 'bg-dark-800 border border-dark-700',
      glass: 'glass-dark',
      gradient: 'bg-gradient-to-br from-dark-800 to-dark-900 border border-dark-700',
    };

    const paddingStyles = {
      none: '',
      sm: 'p-4',
      md: 'p-6',
      lg: 'p-8',
    };

    const hoverStyles = hover
      ? 'hover:shadow-lg hover:-translate-y-1 cursor-pointer'
      : '';

    return (
      <div
        ref={ref}
        className={clsx(
          baseStyles,
          variantStyles[variant],
          paddingStyles[padding],
          hoverStyles,
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx('mb-4', className)} {...props}>
      {children}
    </div>
  );
};

export interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={clsx('text-xl font-semibold text-dark-50', className)}
      {...props}
    >
      {children}
    </h3>
  );
};

export interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p className={clsx('text-sm text-dark-400', className)} {...props}>
      {children}
    </p>
  );
};

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div className={clsx(className)} {...props}>
      {children}
    </div>
  );
};

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={clsx('mt-4 flex items-center gap-2', className)}
      {...props}
    >
      {children}
    </div>
  );
};
EOF

# Create Card/index.ts
cat > Card/index.ts << 'EOF'
export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from './Card';
export type {
  CardProps,
  CardHeaderProps,
  CardTitleProps,
  CardDescriptionProps,
  CardContentProps,
  CardFooterProps,
} from './Card';
EOF
```

**🔴 COMMIT POINT 20:**
```bash
cd ../../../..
git add frontend/src/components/ui/Card/
git commit -m "feat(ui): add Card component with subcomponents

- Card with variants (default, glass, gradient)
- CardHeader, CardTitle, CardDescription
- CardContent, CardFooter
- Padding options
- Hover effects
- Composable design pattern"

git push origin phase-0/design-system
```

## Afternoon Session (3-4 hours)

### Step 4: Create Input Component

```bash
cd frontend/src/components/ui
mkdir Input

# Create Input/Input.tsx
# (To be implemented with text, number, password, search variants)
```

**🔴 COMMIT POINT 21:**
```bash
cd ../../../..
git add frontend/src/components/ui/Input/
git commit -m "feat(ui): add Input component

- Multiple input types (text, number, password, search)
- Variants and sizes
- Full width option
- Error states
- TypeScript types included"

git push origin phase-0/design-system
```

### Step 5: Create Select/Dropdown Component

```bash
cd frontend/src/components/ui
mkdir Select

# Create Select/Select.tsx
# (To be implemented with dropdown functionality)
```

**🔴 COMMIT POINT 22:**
```bash
cd ../../../..
git add frontend/src/components/ui/Select/
git commit -m "feat(ui): add Select/Dropdown component

- Custom dropdown with search capability
- Multiple selection support
- Keyboard navigation
- TypeScript types included"

git push origin phase-0/design-system
```

### Step 6: Create Modal/Dialog Component

```bash
cd frontend/src/components/ui
mkdir Modal

# Create Modal/Modal.tsx
# (To be implemented with overlay, close button, etc.)
```

**🔴 COMMIT POINT 23:**
```bash
cd ../../../..
git add frontend/src/components/ui/Modal/
git commit -m "feat(ui): add Modal/Dialog component

- Overlay with backdrop
- Close button and ESC key support
- Customizable sizes
- Accessible focus management
- TypeScript types included"

git push origin phase-0/design-system
```

### Step 7: Create Toast/Notification Component

```bash
cd frontend/src/components/ui
mkdir Toast

# Create Toast/Toast.tsx
# (To be implemented with auto-dismiss and positioning)
```

**🔴 COMMIT POINT 24:**
```bash
cd ../../../..
git add frontend/src/components/ui/Toast/
git commit -m "feat(ui): add Toast/Notification component

- Auto-dismiss functionality
- Multiple positions (top, bottom, left, right)
- Variants (info, success, warning, error)
- Custom duration
- TypeScript types included"

git push origin phase-0/design-system
```

### Step 8: Create Badge Component

```bash
cd frontend/src/components/ui
mkdir Badge

# Create Badge/Badge.tsx
# (To be implemented with variants and sizes)
```

**🔴 COMMIT POINT 25:**
```bash
cd ../../../..
git add frontend/src/components/ui/Badge/
git commit -m "feat(ui): add Badge component

- Multiple variants (primary, secondary, success, warning, danger)
- Three sizes (sm, md, lg)
- Pill shape option
- TypeScript types included"

git push origin phase-0/design-system
```

### Step 9: Create Switch/Toggle Component

```bash
cd frontend/src/components/ui
mkdir Switch

# Create Switch/Switch.tsx
# (To be implemented with on/off states)
```

**🔴 COMMIT POINT 26:**
```bash
cd ../../../..
git add frontend/src/components/ui/Switch/
git commit -m "feat(ui): add Switch/Toggle component

- On/off states with smooth transition
- Customizable sizes
- Accessible with keyboard support
- TypeScript types included"

git push origin phase-0/design-system
```

### Step 10: Create Tabs Component

```bash
cd frontend/src/components/ui
mkdir Tabs

# Create Tabs/Tabs.tsx
# (To be implemented with tab panels)
```

**🔴 COMMIT POINT 27:**
```bash
cd ../../../..
git add frontend/src/components/ui/Tabs/
git commit -m "feat(ui): add Tabs component

- Horizontal and vertical variants
- Keyboard navigation support
- Customizable styling
- TypeScript types included"

git push origin phase-0/design-system
```

### Step 11: Update UI Barrel Export

```bash
cd frontend/src/components/ui

# Update index.ts to export all components
# (To be implemented with all component exports)
```

**🔴 COMMIT POINT 28:**
```bash
cd ../../../..
git add frontend/src/components/ui/index.ts
git commit -m "feat(ui): update barrel export with all components

- Export all base UI components
- Proper TypeScript type exports
- Clean module structure"

git push origin phase-0/design-system
```

## End of Day Tasks

### Final Testing and Documentation

**🔴 COMMIT POINT 29:**
```bash
git add .
git commit -m "test(ui): verify all base components working

- Component integration testing
- Storybook stories for all components
- Documentation updates
- No console errors"

git push origin phase-0/design-system
```

### Merge and Tag

**🔴 COMMIT POINT 30:**
```bash
# Merge phase-0/design-system into develop
git checkout develop
git merge phase-0/design-system

# Create tag for Day 3 completion
git tag -a phase-0-day-3 -m "Phase 0 Day 3: Design system and base components complete"
git push origin develop
git push origin phase-0-day-3

# Delete feature branch
git branch -d phase-0/design-system
git push origin --delete phase-0/design-system
```

## 🎯 Components to Implement

1. ✅ Button Component (Step 2)
2. ✅ Card Component (Step 3)
3. ✅ Input Component (Step 4)
4. ✅ Select/Dropdown Component (Step 5)
5. ✅ Modal/Dialog Component (Step 6)
6. ✅ Toast/Notification Component (Step 7)
7. ✅ Badge Component (Step 8)
8. ✅ Switch/Toggle Component (Step 9)
9. ✅ Slider Component (Step 10)
10. ✅ UI Barrel Export Update (Step 11)

## 📁 Final Project Structure After Day 3

```
frontend/src/components/ui/
├── Button/
│   ├── Button.tsx
│   └── index.ts
├── Card/
│   ├── Card.tsx
│   └── index.ts
├── Input/
│   ├── Input.tsx
│   └── index.ts
├── Select/
│   ├── Select.tsx
│   └── index.ts
├── Modal/
│   ├── Modal.tsx
│   └── index.ts
├── Toast/
│   ├── Toast.tsx
│   └── index.ts
├── Badge/
│   ├── Badge.tsx
│   └── index.ts
├── Switch/
│   ├── Switch.tsx
│   └── index.ts
├── Slider/
│   ├── Slider.tsx
│   └── index.ts
└── index.ts
```

## 🏁 Phase 0 Completion Status

```
Final Git Structure
main
└── develop
    ├── phase-0/setup (merged)
    ├── phase-0/react-setup (merged)
    └── phase-0/design-system (completed)

Tags:
- phase-0-day-1: FreqTrade setup ✅
- phase-0-day-2: React setup ✅
- phase-0-day-3: Design system & components ✅
```

## 🚀 Ready for Phase 1

With Phase 0 complete, you're ready to start Phase 1 (Core Infrastructure) with:

- API service layer
- WebSocket integration
- State management
- Routing setup