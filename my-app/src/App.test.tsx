import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import ErrorBoundary from './components/ErrorBoundary';

describe('App', () => {
  it('Should render app title', () => {
    render(<App />);
    const linkElement = screen.getByRole('heading', { name: /Absence Manager/i });
    expect(linkElement).toBeInTheDocument();
  });

  it('shows an fallback message when an unhandled exception is thrown', () => {
    const originalError = console.error;
    console.error = jest.fn();

    const ThrowError = () => {
      throw new Error('Test');
    };
    
    render(
      <ErrorBoundary>
        <ThrowError />
        <p>Everything is fine</p>
      </ErrorBoundary>
    );

    expect(screen.queryByText(/Everything is fine/i)).not.toBeInTheDocument();
    expect(screen.getByText(/Something went wrong. Please try refreshing the page/i)).toBeInTheDocument();
    console.error = originalError;
  });
});
