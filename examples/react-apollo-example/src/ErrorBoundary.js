import React from "react";

class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return { error };
  }

  componentDidCatch(error, info) {
    // You can also log the error to an error reporting service
    // logErrorToMyService(error, info);
  }

  render() {
    if (this.state.error) {
      // You can render any custom fallback UI
      return (
        <>
          <h1>Oops! Something went wrong.</h1>
          <p>{this.state.error.message}</p>
        </>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
