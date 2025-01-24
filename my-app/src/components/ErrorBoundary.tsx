import React, { ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
  }
  
  interface ErrorBoundaryState {
    hasError: boolean;
  }

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(_: Error): ErrorBoundaryState {
        return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.log('Error caught by ErrorBoundary:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            return this.props.fallback || <div className='prose max-w-7xl flex items-center mx-auto h-screen'>
                <h1 className='text-center'>Something went wrong. Please try refreshing the page</h1>
            </div>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;