import { useState, useCallback } from "react";
import MusicSelector from "./MusicSelector";
import { submitAd } from "../api/mockAdsApi";
import { useAuth } from "../context/AuthContext";
import "../styles/AdForm.css";

export default function AdForm() {
  const { token } = useAuth();
  const [objective, setObjective] = useState("Traffic");
  const [campaignName, setCampaignName] = useState("");
  const [adText, setAdText] = useState("");
  const [cta, setCta] = useState("");

  // music state lifted here
  const [musicState, setMusicState] = useState({
    option: "upload",
    valid: true,
  });

  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  const handleMusicChange = useCallback((newMusicState) => {
    setMusicState(newMusicState);
  }, []);

  const handleSubmit = async () => {
    setError("");
    setSuccess("");

    // Check token first
    if (!token) {
      setError("Session expired. Please reconnect your TikTok Ads account.");
      return;
    }

    // Validate campaign name
    if (!campaignName || campaignName.length < 3) {
      setError("Campaign name must be at least 3 characters");
      return;
    }

    // Validate ad text
    if (!adText) {
      setError("Ad text is required");
      return;
    }

    if (adText.length > 100) {
      setError("Ad text must be under 100 characters");
      return;
    }

    // Validate CTA
    if (!cta) {
      setError("Please select a Call to Action");
      return;
    }

    // Final music validation guard
    if (!musicState.valid) {
      setError("Please select and validate a music option before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const result = await submitAd({
        token,
        objective,
        campaignName,
        adText,
        cta,
        music: musicState.option,
      });
      setSuccess(` ${result.message}`);
      
      // Reset form after success
      setCampaignName("");
      setAdText("");
      setCta("");
      setObjective("Traffic");
      setMusicState({ option: "upload", valid: true });
    } catch (err) {
      const errorMessage = err.message || String(err);
      setError(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="ad-form">
      <h3 className="form-title">
        
        Create Your Ad Campaign
      </h3>
      
      {/* Error Message */}
      {error && (
        <div className="error-message">
          
          <span className="error-text">{error}</span>
        </div>
      )}

      {/* Success Message */}
      {success && (
        <div className="success-message">
          <span className="success-text">{success}</span>
        </div>
      )}

      {/* Campaign Name Field */}
      <div className="form-group">
        <label className="form-label">
          Campaign Name <span className="required">*</span>
        </label>
        <input
          type="text"
          value={campaignName}
          onChange={(e) => setCampaignName(e.target.value)}
          placeholder="e.g., Summer Sale Campaign"
          className="form-input"
          minLength={3}
        />
        <p className="form-hint">Minimum 3 characters</p>
      </div>

      {/* Campaign Objective */}
      <div className="form-group">
        <label className="form-label">
          Campaign Objective <span className="required">*</span>
        </label>
        <select
          value={objective}
          onChange={(e) => setObjective(e.target.value)}
          className="form-select"
        >
          <option value="Traffic">Traffic</option>
          <option value="Conversions">Conversions</option>
        </select>
      </div>

      {/* Ad Text Field */}
      <div className="form-group">
        <label className="form-label">
          Ad Text <span className="required">*</span>
        </label>
        <textarea
          value={adText}
          onChange={(e) => setAdText(e.target.value)}
          placeholder="Write your ad copy here..."
          className="form-textarea"
          maxLength={100}
          rows={3}
        />
        <p className="form-hint">
          <span className={adText.length > 90 ? 'text-warning' : ''}>
            {adText.length}/100 characters
          </span>
        </p>
      </div>

      {/* CTA Field */}
      <div className="form-group">
        <label className="form-label">
          Call to Action <span className="required">*</span>
        </label>
        <select
          value={cta}
          onChange={(e) => setCta(e.target.value)}
          className="form-select"
        >
          <option value="">-- Select CTA --</option>
          <option value="Shop Now">Shop Now</option>
          <option value="Learn More">Learn More</option>
          <option value="Sign Up">Sign Up</option>
          <option value="Download">Download</option>
          <option value="Contact Us">Contact Us</option>
          <option value="Apply Now">Apply Now</option>
        </select>
      </div>

      {/* Music Selector */}
      <MusicSelector
        objective={objective}
        onChange={handleMusicChange}
      />

      {/* Submit Button */}
      <button
        onClick={handleSubmit}
        disabled={submitting || !musicState.valid}
        className={`submit-button ${submitting ? 'submitting' : ''} ${!musicState.valid ? 'disabled' : ''}`}
      >
        {submitting ? (
          <>
            <div className="spinner"></div>
            <span>Submitting...</span>
          </>
        ) : (
          <>
            <span className="submit-icon">✨</span>
            <span>Submit Ad Campaign</span>
          </>
        )}
      </button>

      {!musicState.valid && !success && (
        <p className="submit-hint">
          Please select a valid music option to enable submission
        </p>
      )}
    </div>
  );
}