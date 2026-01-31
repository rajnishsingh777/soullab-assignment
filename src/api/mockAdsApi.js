export function validateMusicId(musicId) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!musicId || musicId.trim() === "") {
        reject(new Error("Music ID cannot be empty"));
      } else if (musicId.startsWith("MUSIC_")) {
        resolve({ valid: true, musicId });
      } else {
        reject(
          new Error(
            `Invalid Music ID format. Must start with "MUSIC_". Example: MUSIC_123456`
          )
        );
      }
    }, 500);
  });
}

export function submitAd(payload) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Validate token
      if (!payload.token) {
        reject(
          new Error(
            " Invalid or expired token. Please reconnect your TikTok Ads account."
          )
        );
        return;
      }

      // Validate music option based on objective
      if (payload.objective === "Conversions" && payload.music === "none") {
        reject(
          new Error(
            " Music is required for Conversion campaigns. Please select a music option."
          )
        );
        return;
      }

      // Simulate occasional API failures 
      if (Math.random() < 0.05) {
        reject(new Error(" API temporarily unavailable. Please try again."));
        return;
      }

      // Success
      resolve({
        success: true,
        adId: "AD_" + Math.random().toString(36).substr(2, 9),
        message: `Ad submitted successfully with ${payload.music || "no"} music for ${payload.objective} objective.`,
      });
    }, 1000);
  });
}