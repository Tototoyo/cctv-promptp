import { createClient } from '@supabase/supabase-js';
import type { GeneratorOptions, SavedPrompt } from '../types';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

// This check is primarily for type safety and to prevent crashes.
// The main UI will display a more user-friendly error if these are missing.
if (!supabaseUrl || !supabaseAnonKey) {
  // This log is for development convenience. The UI will show a friendly error.
  console.error("Supabase URL (VITE_SUPABASE_URL) or Anon Key (VITE_SUPABASE_ANON_KEY) is missing. Check your environment variables.");
}

// We assert non-null here because the App component will prevent rendering if they are null.
export const supabase = createClient(supabaseUrl!, supabaseAnonKey!);

/**
 * Adds a generated prompt to the public gallery.
 * @param prompt - The generated prompt text.
 * @param options - The options used to generate the prompt.
 */
export const addPrompt = async (prompt: string, options: GeneratorOptions): Promise<void> => {
  const { error } = await supabase
    .from('prompts')
    .insert([{ prompt, options }]);

  if (error) {
    console.error('Error adding prompt to Supabase:', error);
    throw new Error('Could not share prompt to the gallery. ' + error.message);
  }
};

/**
 * Fetches the most recent prompts from the public gallery.
 * @returns A promise that resolves to an array of saved prompts.
 */
export const getRecentPrompts = async (): Promise<SavedPrompt[]> => {
  const { data, error } = await supabase
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(12);

  if (error) {
    console.error('Error fetching prompts from Supabase:', error);
    // Return empty array on error to not break the UI
    return [];
  }
  
  return (data as SavedPrompt[]) || [];
};