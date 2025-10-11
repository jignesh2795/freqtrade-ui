import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';

// Mock the ComponentShowcase component since it's complex
vi.mock('./ComponentShowcase', () => ({
  ComponentShowcase: () => <div data-testid="component-showcase">Component Showcase</div>
}));

describe('App', () => {
  it('renders app title', () => {
    render(<App />);
    expect(screen.getByText('FreqTrade UI')).toBeInTheDocument();
  });

  it('renders phase completion message', () => {
    render(<App />);
    expect(screen.getByText('Phase 0 Complete! 🎉')).toBeInTheDocument();
  });
});