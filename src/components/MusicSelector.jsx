import { useEffect, useState } from "react";
import { validateMusicId } from "../api/mockAdsApi";
import "../styles/MusicSelector.css";

export default function MusicSelector({ objective, onChange }) {
  const [option, setOption] = useState("upload");
  const [musicId, setMusicId] = useState("");
  const [error, setError] = useState("");
  const [validating, setValidating] = useState(false);
  const [validated, setValidated] = useState(false);
  const [generatedMusicId, setGeneratedMusicId] = useState("");

  // Generate music ID once for upload option
  useEffect(() => {
    if (option === "upload" && !generatedMusicId) {
      setGeneratedMusicId(
        "MUSIC_" + Math.random().toString(36).substr(2, 6).toUpperCase()
      );
    }
  }, [option, generatedMusicId]);

  // Notify parent immediately on mount with default selection
  useEffect(() => {
    onChange({
      option: "upload",
      valid: true,
    });
  }, []);

  // Update parent whenever selection changes
  useEffect(() => {
    onChange({
      option,
      valid:
        option === "upload" ||
        (option === "existing" && musicId && validated && !error) ||
        (option === "none" && objective === "Traffic"),
    });
  }, [option, musicId, error, validated, objective, onChange]);

  const validateExistingMusic = async () => {
    if (!musicId.trim()) {
      setError("Music ID is required");
      setValidated(false);
      return;
    }

    setValidating(true);
    try {
      await validateMusicId(musicId);
      setError("");
      setValidated(true);
    } catch (err) {
      setError(err.message || "Invalid Music ID");
      setValidated(false);
    } finally {
      setValidating(false);
    }
  };

  return (
    <div className="music-selector">
      <p className="music-title"> Music Selection</p>

      {/* Existing Music Option */}
      <label className={`music-option ${option === "existing" ? "selected" : ""}`}>
        <input
          type="radio"
          name="music"
          checked={option === "existing"}
          onChange={() => {
            setOption("existing");
            setError("");
            setValidated(false);
          }}
          className="radio-input"
        />
        <div className="option-content">
          
          <span className="option-label">Existing Music ID</span>
        </div>
      </label>

      {option === "existing" && (
        <div className="music-input-group">
          <div className="input-with-button">
            <input
              className="music-input"
              placeholder="e.g., MUSIC_123456"
              value={musicId}
              onChange={(e) => {
                setMusicId(e.target.value);
                setValidated(false);
              }}
              onBlur={validateExistingMusic}
            />
            <button
              onClick={validateExistingMusic}
              disabled={validating || !musicId}
              className={`validate-button ${validating ? "validating" : ""}`}
            >
              {validating ? (
                <>
                  <div className="spinner small"></div>
                  <span>Validating...</span>
                </>
              ) : (
                "Validate"
              )}
            </button>
          </div>
          {validated && !error && (
            <p className="validation-success"> Music ID is valid</p>
          )}
          {error && (
            <p className="validation-error">{error}</p>
          )}
        </div>
      )}

      {/* Upload Option */}
      <label className={`music-option ${option === "upload" ? "selected" : ""}`}>
        <input
          type="radio"
          name="music"
          checked={option === "upload"}
          onChange={() => {
            setOption("upload");
            setError("");
            setValidated(false);
          }}
          className="radio-input"
        />
        <div className="option-content">
          
          <span className="option-label">Upload Custom Music</span>
        </div>
      </label>

      {option === "upload" && (
        <div className="upload-info">
          <div className="info-badge">
            <span className="badge-label">Simulated Music ID:</span>
            <span className="badge-value">{generatedMusicId}</span>
          </div>
          <p className="upload-note">
            In production, this would allow file upload
          </p>
        </div>
      )}

      {/* No Music Option */}
      <label 
        className={`music-option ${option === "none" ? "selected" : ""} ${objective === "Conversions" ? "disabled" : ""}`}
      >
        <input
          type="radio"
          name="music"
          checked={option === "none"}
          disabled={objective === "Conversions"}
          onChange={() => {
            setOption("none");
            setError("");
            setValidated(false);
          }}
          className="radio-input"
        />
        <div className="option-content">
          
          <span className="option-label">No Music</span>
        </div>
      </label>

      {/* Info Messages */}
      {objective === "Conversions" && option !== "none" && (
        <p className="info-message info">
          Music is required for Conversion campaigns
        </p>
      )}

      {objective === "Conversions" && option === "none" && (
        <p className="info-message error">
           Cannot use "No Music" for Conversion campaigns. Music is required.
        </p>
      )}
    </div>
  );
}