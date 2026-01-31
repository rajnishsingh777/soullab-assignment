import { useState } from "react";
import AdForm from "./components/AdForm";
import ConnectTikTok from "./components/ConnectTikTok";
import ErrorBanner from "./components/ErrorBanner";
import { useAuth } from "./context/AuthContext";
import "./App.css";

export default function App() {
  const [connected, setConnected] = useState(false);
  const { globalError, setGlobalError } = useAuth();

  return (
    <div className="app-container">
      {/* Animated Background Circles */}
      <div className="bg-decoration">
        <div className="circle circle-1"></div>
        <div className="circle circle-2"></div>
        <div className="circle circle-3"></div>
      </div>

      <div className="app-card">
        {/* Global Error Banner */}
        {globalError && (
          <div className="error-banner-wrapper">
            <ErrorBanner message={globalError} onDismiss={() => setGlobalError("")} />
          </div>
        )}

        {/* Header */}
        <div className="app-header">
          <div className="logo-wrapper">
            <div className="logo-icon">🎵</div>
            <h1 className="app-title">TikTok Ads Creative Flow</h1>
          </div>
          <p className="app-subtitle">Create and submit a sample ad creative</p>
        </div>

        {/* Divider */}
        <div className="divider"></div>

        {/* Step Indicator */}
        <div className="step-progress">
          <div className={`step ${!connected ? 'active' : 'completed'}`}>
            <div className="step-number">{connected ? '✓' : '1'}</div>
            <span className="step-label">Connect Account</span>
          </div>
          <div className={`step-line ${connected ? 'completed' : ''}`}></div>
          <div className={`step ${connected ? 'active' : ''}`}>
            <div className="step-number">2</div>
            <span className="step-label">Create Ad</span>
          </div>
        </div>

        {/* Step 1: Connect */}
        {!connected && (
          <div className="step-content fade-in">
            <h2 className="step-title">
              <span className="step-icon">🔗</span>
              Step 1: Connect TikTok Ads Account
            </h2>

            <div className="content-box">
              <ConnectTikTok onSuccess={() => setConnected(true)} />
            </div>
          </div>
        )}

        {/* Step 2: Create Ad */}
        {connected && (
          <div className="step-content slide-in">
            <h2 className="step-title">
              <span className="step-icon">✨</span>
              Step 2: Create Ad
            </h2>

            <div className="content-box">
              <AdForm />
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="app-footer">
          <p>Demo Mode Active - All APIs are simulated</p>
        </div>
      </div>
    </div>
  );
}