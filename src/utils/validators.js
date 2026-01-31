export function validateCampaignName(name) {
  if (!name || name.length < 3) {
    return "Campaign name must be at least 3 characters";
  }
}

export function validateAdText(text) {
  if (!text || text.length > 100) {
    return "Ad text is required (max 100 characters)";
  }
}
