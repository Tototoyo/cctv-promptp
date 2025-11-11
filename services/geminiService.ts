// Fix: Manually declare Vite's `import.meta.env` to resolve TypeScript errors.
declare global {
  interface ImportMeta {
    readonly env: {
      readonly VITE_API_KEY: string;
      readonly VITE_SUPABASE_URL: string;
      readonly VITE_SUPABASE_ANON_KEY: string;
    }
  }
}

import { GoogleGenAI } from '@google/genai';
import type { GeneratorOptions } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

// Declare ai client variable, but do not initialize it yet.
let ai: GoogleGenAI | null = null;

/**
 * Lazily initializes and returns the GoogleGenAI client instance.
 * This prevents the "API Key must be set" error on app load if the key is missing.
 */
// Fix: Use import.meta.env.VITE_API_KEY to align with Vite's client-side environment variable conventions.
const getAiClient = (): GoogleGenAI => {
  if (!ai) {
    if (!import.meta.env.VITE_API_KEY) {
      // This should not be reached if the App component's check is working,
      // but it's a safeguard.
      throw new Error('VITE_API_KEY is not configured in environment variables.');
    }
    ai = new GoogleGenAI({ apiKey: import.meta.env.VITE_API_KEY });
  }
  return ai;
};


/**
 * Generates a CCTV prompt using the Google Gemini API.
 * This function constructs a prompt from user options, sends it to the Gemini model,
 * and returns the generated text.
 * @param options - The user-selected options for the prompt generation.
 * @returns A promise that resolves to the AI-generated prompt string.
 */
export const generateCctvPrompt = async (options: GeneratorOptions): Promise<string> => {
  console.log("Generating prompt with options:", options);

  const client = getAiClient(); // Get or initialize the client.
  const model = 'gemini-2.5-flash';

  const userPrompt = `Generate a CCTV prompt with the following specifications:
- Scene: "${options.scene}"
- Location: ${options.location}
- Time of Day: ${options.timeOfDay}
- Visual Effects: ${options.effects.length > 0 ? options.effects.join(', ') : 'None'}
`;

  try {
    const response = await client.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating prompt with Gemini API:", error);

    if (error instanceof Error) {
      // This is a common error for CORS issues in webviews like Capacitor.
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error("A network error occurred. When running in a mobile app (e.g., Capacitor), this is often a CORS issue. Please ensure your app's origin is allowed by the API provider.");
      }
      if (error.message.includes('API key not valid')) {
        throw new Error("The provided API key is not valid. Please check your configuration.");
      }
    }
    
    // Generic fallback error message
    throw new Error("An unexpected error occurred while generating the prompt. Please try again.");
  }
};
