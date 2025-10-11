import React, { useState } from 'react';
import { clsx } from 'clsx';
import { createPortal } from 'react-dom';

export interface TooltipProps {
  content: string | React.ReactNode;
  children: React.ReactElement;
  position?: 'top' | 'bottom' | 'left' | 'right';
  delay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    
    let x = 0;
    let y = 0;

    switch (position) {
      case 'top':
        x = rect.left + rect.width / 2;
        y = rect.top;
        break;
      case 'bottom':
        x = rect.left + rect.width / 2;
        y = rect.bottom;
        break;
      case 'left':
        x = rect.left;
        y = rect.top + rect.height / 2;
        break;
      case 'right':
        x = rect.right;
        y = rect.top + rect.height / 2;
        break;
    }

    setCoords({ x, y });

    const timeout = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    setTimeoutId(timeout);
  };

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    setIsVisible(false);
  };

  const positionStyles = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  const arrowStyles = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-dark-700',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-dark-700',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-dark-700',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-dark-700',
  };

  return (
    <>
      {React.isValidElement(children) && React.cloneElement(children, {
        onMouseEnter: handleMouseEnter,
        onMouseLeave: handleMouseLeave,
      } as React.HTMLAttributes<HTMLElement>)}

      {isVisible &&
        createPortal(
          <div
            className="fixed z-[100]"
            style={{
              left: coords.x,
              top: coords.y,
            }}
          >
            <div
              className={clsx(
                'absolute',
                'bg-dark-700 text-dark-50 text-sm',
                'px-3 py-2 rounded-lg shadow-lg',
                'border border-dark-600',
                'animate-fade-in',
                'max-w-xs',
                positionStyles[position]
              )}
            >
              {content}
              <div
                className={clsx(
                  'absolute w-0 h-0',
                  'border-4 border-transparent',
                  arrowStyles[position]
                )}
              />
            </div>
          </div>,
          document.body
        )}
    </>
  );
};