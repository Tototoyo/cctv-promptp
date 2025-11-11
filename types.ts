
export interface GeneratorOptions {
  scene: string;
  location: string;
  timeOfDay: string;
  effects: string[];
}

export interface SavedPrompt {
  id: number;
  created_at: string;
  prompt: string;
  options: GeneratorOptions;
  user_id?: string;
}