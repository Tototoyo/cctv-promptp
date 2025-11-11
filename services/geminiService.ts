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

import OpenAI from 'openai';
import type { GeneratorOptions } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

// Declare ai client variable, but do not initialize it yet.
let ai: OpenAI | null = null;

/**
 * Lazily initializes and returns the OpenAI client instance.
 * This prevents the "API Key must be set" error on app load if the key is missing.
 */
// Fix: Use import.meta.env.VITE_API_KEY to align with Vite's client-side environment variable conventions.
const getAiClient = (): OpenAI => {
  if (!ai) {
    if (!import.meta.env.VITE_API_KEY) {
      // This should not be reached if the App component's check is working,
      // but it's a safeguard.
      throw new Error('VITE_API_KEY is not configured in environment variables.');
    }
    ai = new OpenAI({ 
        apiKey: import.meta.env.VITE_API_KEY,
        dangerouslyAllowBrowser: true, // This is required for client-side usage
    });
  }
  return ai;
};


/**
 * Generates a CCTV prompt using the OpenAI API.
 * This function constructs a prompt from user options, sends it to the GPT model,
 * and returns the generated text.
 * @param options - The user-selected options for the prompt generation.
 * @returns A promise that resolves to the AI-generated prompt string.
 */
export const generateCctvPrompt = async (options: GeneratorOptions): Promise<string> => {
  console.log("Generating prompt with options:", options);

  const client = getAiClient(); // Get or initialize the client.
  const model = 'gpt-4o-mini';

  const userPrompt = `Generate a CCTV prompt with the following specifications:
- Scene: "${options.scene}"
- Location: ${options.location}
- Time of Day: ${options.timeOfDay}
- Visual Effects: ${options.effects.length > 0 ? options.effects.join(', ') : 'None'}
`;

  try {
    const response = await client.chat.completions.create({
        model: model,
        messages: [
            { role: "system", content: SYSTEM_INSTRUCTION },
            { role: "user", content: userPrompt }
        ],
        temperature: 0.8,
    });
    
    const promptText = response.choices[0]?.message?.content;
    if (!promptText) {
        throw new Error("Received an empty response from the AI.");
    }

    return promptText.trim();
  } catch (error) {
    console.error("Error generating prompt with OpenAI API:", error);

    if (error instanceof Error) {
      if (error.message.includes('API key')) { // Catches invalid key errors
        throw new Error("The provided OpenAI API key is not valid. Please check your configuration.");
      }
      // This is a common error for CORS issues in webviews like Capacitor.
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        throw new Error("A network error occurred. When running in a mobile app (e.g., Capacitor), this is often a CORS issue. Please ensure your app's origin is allowed by the API provider.");
      }
    }
    
    // Generic fallback error message
    throw new Error("An unexpected error occurred while generating the prompt. Please try again.");
  }
};
