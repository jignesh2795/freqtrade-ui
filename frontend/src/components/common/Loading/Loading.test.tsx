import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Loading } from './Loading';

describe('Loading', () => {
  it('should render with default message', () => {
    render(<Loading />);
    
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should render with custom message', () => {
    render(<Loading message="Please wait..." />);
    
    expect(screen.getByText('Please wait...')).toBeInTheDocument();
  });

  it('should render in fullscreen mode', () => {
    render(<Loading fullScreen message="Loading fullscreen..." />);
    
    expect(screen.getByText('Loading fullscreen...')).toBeInTheDocument();
  });
});