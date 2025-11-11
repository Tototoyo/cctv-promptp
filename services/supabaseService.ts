import { supabase, supabasePublicClient } from './supabaseClient';
import type { GeneratorOptions, SavedPrompt } from '../types';

/**
 * Adds a prompt to the Supabase database.
 * @param prompt - The generated prompt text.
 * @param options - The options used to generate the prompt.
 * @param userId - The ID of the user saving the prompt.
 */
export const addPrompt = async (prompt: string, options: GeneratorOptions, userId: string): Promise<void> => {
  if (!userId) throw new Error('User must be logged in to add a prompt.');

  const { error } = await supabase
    .from('prompts')
    .insert([{ prompt, options, user_id: userId }]);

  if (error) {
    console.error('Error adding prompt:', error);
    throw new Error('Could not save prompt to the gallery. Please try again.');
  }
};

/**
 * Fetches the most recent prompts for the gallery from Supabase.
 * @returns A promise that resolves to an array of saved prompts.
 */
export const getRecentPrompts = async (): Promise<SavedPrompt[]> => {
  const { data, error } = await supabasePublicClient
    .from('prompts')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);

  if (error) {
    console.error('Error fetching recent prompts:', error);
    throw new Error('Could not load recent prompts.');
  }

  return data || [];
};

/**
 * Fetches a paginated list of all prompts for the full gallery page.
 * @param page - The page number to fetch (1-indexed).
 * @param limit - The number of prompts per page.
 * @returns A promise that resolves to an object containing the prompts and whether there are more pages.
 */
export const getAllPrompts = async (page: number, limit: number): Promise<{ prompts: SavedPrompt[], hasMore: boolean }> => {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit - 1;

    const { data, error, count } = await supabasePublicClient
        .from('prompts')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
        .range(startIndex, endIndex);

    if (error) {
        console.error('Error fetching all prompts:', error);
        throw new Error('Could not load gallery prompts.');
    }
    
    const hasMore = (count || 0) > endIndex + 1;

    return { prompts: data || [], hasMore };
};


/**
 * Fetches all prompts for a specific user from Supabase.
 * @param userId - The ID of the user.
 * @returns A promise that resolves to an array of the user's saved prompts.
 */
export const getUserPrompts = async (userId: string): Promise<SavedPrompt[]> => {
    if (!userId) return [];
    
    const { data, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching user prompts:', error);
        throw new Error('Could not load your saved prompts.');
    }
    
    return data || [];
};

/**
 * Deletes a specific prompt owned by a user from Supabase.
 * @param promptId - The ID of the prompt to delete.
 * @param userId - The ID of the user who owns the prompt.
 */
export const deletePrompt = async (promptId: number, userId: string): Promise<void> => {
    if (!userId) throw new Error("User must be logged in to delete prompts.");

    const { error } = await supabase
        .from('prompts')
        .delete()
        .match({ id: promptId, user_id: userId });
        
    if (error) {
        console.error('Error deleting prompt:', error);
        throw new Error('Could not delete the prompt.');
    }
};
