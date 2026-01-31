import { useState } from "react";
import { mockOAuthLogin } from "../api/mockAuth";
import { useAuth } from "../context/AuthContext";
import "../styles/ConnectTikTok.css";

export default function ConnectTikTok({ onSuccess }) {
  const { login, setGlobalError } = useAuth();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    setGlobalError(""); // Clear any previous errors
    
    try {
      const res = await mockOAuthLogin();
      login(res.access_token);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      const errorMessage = err.message || err;
      setGlobalError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="connect-container">
      <button
        onClick={handleConnect}
        disabled={loading}
        className={`connect-button ${loading ? 'loading' : ''}`}
      >
        {loading ? (
          <>
            <div className="spinner"></div>
            <span>Connecting...</span>
          </>
        ) : (
          <>
            <span className="connect-icon">🎵</span>
            <span>Connect TikTok Ads Account</span>
          </>
        )}
      </button>

      <div className="connect-info">
        <div className="info-item">
          
          <span className="info-text">OAuth flow simulated for demo purposes</span>
        </div>
        <div className="info-item highlight">
          
          <span className="info-text">~20% chance of geo-restriction error (403) to test error handling</span>
        </div>
      </div>
    </div>
  );
}