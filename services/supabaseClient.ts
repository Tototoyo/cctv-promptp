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

import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from Vite's environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure the variables are provided. The main App component will catch this
// and display a friendly error message if they are missing.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in environment variables.");
}

// The standard client for auth and user-specific operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// A dedicated client for public, read-only gallery operations.
// This ensures that viewing the gallery is completely independent of the user's authentication state.
export const supabasePublicClient = createClient(supabaseUrl, supabaseAnonKey);
