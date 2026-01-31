export function mockOAuthLogin() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();

      if (random < 0.2) {
        reject(
          new Error(
            " TikTok Ads is not supported in your region (simulated geo-restriction 403). " +
            "This is a test scenario showing how OAuth handles regional API restrictions."
          )
        );
      } else {
        resolve({
          access_token: "mock_access_token_" + Math.random().toString(36).substr(2, 9),
          expires_in: 3600,
        });
      }
    }, 1000);
  });
}