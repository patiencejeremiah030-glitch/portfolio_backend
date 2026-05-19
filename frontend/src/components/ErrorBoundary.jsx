import { Component } from "react";

export default class ErrorBoundary extends Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <div
          style={{
            padding: "3rem 1.5rem",
            maxWidth: "28rem",
            margin: "0 auto",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          <h1 style={{ fontSize: "1.25rem", fontWeight: 700, marginBottom: "0.75rem" }}>
            Something went wrong
          </h1>
          <p style={{ fontSize: "0.875rem", color: "#64748b", marginBottom: "1rem" }}>
            {this.state.error.message}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            style={{
              fontSize: "0.875rem",
              padding: "0.5rem 1rem",
              borderRadius: "0.5rem",
              border: "1px solid #cbd5e1",
              background: "#fff",
              cursor: "pointer",
            }}
          >
            Reload page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
