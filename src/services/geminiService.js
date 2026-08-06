import { GoogleGenAI } from '@google/genai';

/**
 * Ordered Free Gemini API Model Fallback Chain
 * Tries each model in order if the previous model is quota-exhausted or unavailable.
 */
export const GEMINI_MODEL_FALLBACK_CHAIN = [
  'gemini-3.6-flash',
  'gemini-3.5-flash',
  'gemini-3.1-pro-preview',
  'gemini-3-flash-preview',
  'gemini-3.1-flash-lite',
  'gemini-3.1-flash-lite-preview',
  'gemini-2.5-pro',
  'gemini-2.5-flash',
  'gemini-2.5-flash-lite'
];

/**
 * Gemini Service using official @google/genai SDK pattern with automated multi-model fallback chain
 */
class GeminiService {
  constructor() {
    this.apiKey = localStorage.getItem('GEMINI_API_KEY') || '';
    this.ai = this.apiKey ? new GoogleGenAI({ apiKey: this.apiKey }) : null;
  }

  setApiKey(key) {
    this.apiKey = key;
    localStorage.setItem('GEMINI_API_KEY', key);
    this.ai = key ? new GoogleGenAI({ apiKey: key }) : null;
  }

  hasApiKey() {
    return Boolean(this.apiKey);
  }

  /**
   * Generates content using preferred model first, then systematically falling back down the 10-tier chain
   */
  async generateContent(prompt, preferredModel = 'gemini-3.6-flash', systemInstruction = '') {
    if (!this.ai) {
      return null; // Signals fallback to autonomous agent simulation
    }

    // Build unique model sequence starting with preferred model, then remaining fallback chain
    const modelsToTry = Array.from(new Set([preferredModel, ...GEMINI_MODEL_FALLBACK_CHAIN]));

    for (const model of modelsToTry) {
      try {
        const response = await this.ai.models.generateContent({
          model,
          contents: prompt,
          config: systemInstruction ? { systemInstruction } : undefined,
        });

        if (response && response.text) {
          console.log(`[Gemini API Success] Content generated using model: ${model}`);
          return response.text;
        }
      } catch (err) {
        console.warn(`[Gemini API Fallback] Model '${model}' failed/exhausted:`, err?.message || err);
      }
    }

    console.warn('[Gemini API Exhausted] All models in fallback chain failed. Using fallback agent simulation engine.');
    return null; // Signals fallback to autonomous agent simulation
  }
}

export const geminiService = new GeminiService();
