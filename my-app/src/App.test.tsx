import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { brighthrApi, useGetAbsencesQuery } from './services/brighthrApi';
import ErrorBoundary from './components/ErrorBoundary';
import App from './App';

jest.mock('./services/brighthrApi', () => ({
  ...jest.requireActual('./services/brighthrApi'),
  useGetAbsencesQuery: jest.fn(),
}));

describe('App', () => {
  it('Should render app title', () => {
    const store = configureStore({
      reducer: {
        [brighthrApi.reducerPath]: brighthrApi.reducer,
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(brighthrApi.middleware),
    });

    (useGetAbsencesQuery as jest.Mock).mockReturnValue({
      data: [],
      error: null,
      isLoading: false,
    });
    
    render(<Provider store={store}><App /></Provider>);
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
