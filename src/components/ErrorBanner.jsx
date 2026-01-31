import "../styles/ErrorBanner.css";

function ErrorBanner({ message, onDismiss }) {
  return (
    <div className="error-banner">
      <div className="error-content">
        
        <div className="error-message-text">
          <strong className="error-title">Error</strong>
          <p className="error-description">{message}</p>
        </div>
      </div>
      {onDismiss && (
        <button
          onClick={onDismiss}
          className="dismiss-button"
          aria-label="Dismiss error"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default ErrorBanner;