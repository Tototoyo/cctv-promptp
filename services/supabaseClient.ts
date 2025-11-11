// Fix: Add reference to Vite client types to resolve import.meta.env errors.
/// <reference types="vite/client" />

import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from Vite's environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Ensure the variables are provided. The main App component will catch this
// and display a friendly error message if they are missing.
if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL and Anon Key must be provided in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
