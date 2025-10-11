import React, { createContext, useContext, useState } from 'react';
import { clsx } from 'clsx';

interface TabsContextType {
  activeTab: string;
  setActiveTab: (value: string) => void;
}

const TabsContext = createContext<TabsContextType | undefined>(undefined);

const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tabs components must be used within Tabs');
  }
  return context;
};

export interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  defaultValue,
  value: controlledValue,
  onValueChange,
  children,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(defaultValue);

  const activeTab = controlledValue ?? internalValue;

  const setActiveTab = (value: string) => {
    if (controlledValue === undefined) {
      setInternalValue(value);
    }
    onValueChange?.(value);
  };

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
};

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
  return (
    <div
      className={clsx(
        'inline-flex items-center gap-1 p-1',
        'bg-dark-800 rounded-lg border border-dark-700',
        className
      )}
    >
      {children}
    </div>
  );
};

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  disabled?: boolean;
  className?: string;
}

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  disabled = false,
  className,
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;
  
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => setActiveTab(value)}
      className={clsx(
        'px-4 py-2 text-sm font-medium rounded-md',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary-500',
        isActive
          ? 'bg-primary-600 text-white shadow-sm'
          : 'text-dark-300 hover:text-dark-100 hover:bg-dark-700',
        disabled && 'opacity-50 cursor-not-allowed',
        className
      )}
    >
      {children}
    </button>
  );
};

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const { activeTab } = useTabsContext();
  if (activeTab !== value) return null;
  
  return (
    <div className={clsx('mt-4 animate-fade-in', className)}>{children}</div>
  );
};