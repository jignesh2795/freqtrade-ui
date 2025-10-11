import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EmptyState } from './EmptyState';
import { Search } from 'lucide-react';

describe('EmptyState', () => {
  it('should render with title and description', () => {
    render(
      <EmptyState
        title="No data found"
        description="There is no data to display"
      />
    );
    
    expect(screen.getByText('No data found')).toBeInTheDocument();
    expect(screen.getByText('There is no data to display')).toBeInTheDocument();
  });

  it('should render with icon', () => {
    render(
      <EmptyState
        icon={Search}
        title="Search"
        description="Try searching for something"
      />
    );
    
    // Check if icon is rendered (by checking if the component renders without error)
    expect(screen.getByText('Search')).toBeInTheDocument();
  });

  it('should render with action button', () => {
    const mockAction = {
      label: 'Retry',
      onClick: vi.fn(),
    };
    
    render(
      <EmptyState
        title="Error occurred"
        action={mockAction}
      />
    );
    
    expect(screen.getByText('Retry')).toBeInTheDocument();
  });
});