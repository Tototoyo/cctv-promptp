import { GoogleGenAI } from '@google/genai';
import type { GeneratorOptions } from '../types';
import { SYSTEM_INSTRUCTION } from '../constants';

// Initialize the Google Gemini API client.
// The API key is expected to be available in the environment variables.
const ai = new GoogleGenAI({ apiKey: process.env.VITE_API_KEY });

/**
 * Generates a CCTV prompt using the Google Gemini API.
 * This function constructs a prompt from user options, sends it to the Gemini model,
 * and returns the generated text.
 * @param options - The user-selected options for the prompt generation.
 * @returns A promise that resolves to the AI-generated prompt string.
 */
export const generateCctvPrompt = async (options: GeneratorOptions): Promise<string> => {
  console.log("Generating prompt with options:", options);

  const model = 'gemini-2.5-flash';

  const userPrompt = `Generate a CCTV prompt with the following specifications:
- Scene: "${options.scene}"
- Location: ${options.location}
- Time of Day: ${options.timeOfDay}
- Visual Effects: ${options.effects.length > 0 ? options.effects.join(', ') : 'None'}
`;

  try {
    const response = await ai.models.generateContent({
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