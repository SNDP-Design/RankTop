import { GoogleGenAI } from '@google/genai';

/**
 * Gemini Service using the official @google/genai SDK pattern
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

  async generateContent(prompt, model = 'gemini-2.5-flash', systemInstruction = '') {
    if (this.ai) {
      try {
        const response = await this.ai.models.generateContent({
          model,
          contents: prompt,
          config: systemInstruction ? { systemInstruction } : undefined,
        });
        return response.text;
      } catch (err) {
        console.warn('Gemini API call failed, falling back to agent engine:', err);
      }
    }
    return null; // Signals fallback to autonomous agent simulation
  }
}

export const geminiService = new GeminiService();
