import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  handleRefresh = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          className="flex flex-col items-center justify-center p-8 rounded-lg max-w-md mx-auto mt-10 text-center"
          style={{
            backgroundColor: '#d6e9fb',
            color: '#333',
            boxShadow: '0 4px 12px rgba(110, 193, 246, 0.3)',
          }}
        >
          {/* Image at the top */}
     <img
        src="/logo.png"
        alt="Error Illustration"
        className="w-42 h-42"
        style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}
      />

          <h2 className="text-2xl font-semibold mb-4">Oops! Something went wrong.</h2>
          <p className="mb-6">
            Sorry, the app encountered an unexpected error please refresh the page.
          </p>

          <button
            onClick={this.handleRefresh}
            className="inline-block px-6 py-2 bg-[#6EC1F6] text-white font-semibold rounded-lg hover:bg-[#5ab0e0] transition"
          >
            Refresh Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
