import * as React from 'react'

class ErrorBoundary extends React.Component {
  state: { error: any } = { error: null }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.warn('Error caught', error, errorInfo)
  }

  render() {
    const { state:{ error }, props: { children } } = this
    if (error) {
      return (
        <div>
          <div>Something went wrong.</div>
          <pre>{JSON.stringify(error, null, 2)}</pre>
        </div>
      )
    }

    return children; 
  }
}

export default ErrorBoundary