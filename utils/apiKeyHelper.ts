
/**
 * Ensures that an API key is selected via the `window.aistudio` utility.
 * This is crucial for models requiring user-selected (e.g., paid) API keys.
 *
 * @returns {Promise<boolean>} A promise that resolves to true if an API key is successfully selected or already present, false otherwise.
 */
export async function ensureApiKeySelected(): Promise<boolean> {
  // Check if window.aistudio is available in the current environment
  if (typeof window !== 'undefined' && (window as any).aistudio) {
    const aistudio = (window as any).aistudio;

    try {
      // Check if an API key has already been selected
      const hasKey = await aistudio.hasSelectedApiKey();
      if (hasKey) {
        return true; // Key already selected, proceed
      }

      // If no key is selected, open the dialog for the user to select one
      await aistudio.openSelectKey();

      // IMPORTANT: As per guidelines, assume success after triggering openSelectKey()
      // Do not add delay or re-check hasSelectedApiKey() immediately due to race conditions.
      // The new GoogleGenAI instance will use the updated API_KEY.
      return true;

    } catch (error) {
      console.error("Error with API key selection process:", error);
      // Provide a link to billing documentation as per guidelines
      alert("Failed to select API key. Please ensure you select an API key from a paid GCP project. More info: ai.google.dev/gemini-api/docs/billing");
      return false;
    }
  } else {
    // If running in an environment without aistudio (e.g., local dev without AI Studio wrapper)
    // We assume process.env.API_KEY is pre-configured and valid for development.
    if (process.env.API_KEY) {
      console.warn("`window.aistudio` not found. Assuming API_KEY is set via environment for local development. For production/AI Studio, ensure `window.aistudio` is available.");
      return true;
    } else {
      console.error("`window.aistudio` not found and `process.env.API_KEY` is not set. API calls will likely fail.");
      return false;
    }
  }
}
