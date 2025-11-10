import React, { useState } from 'react';
import type { GeneratorOptions } from '../types';
import { LOCATIONS, TIMES_OF_DAY, EFFECTS } from '../constants';

interface PromptGeneratorProps {
  onGenerate: (options: GeneratorOptions) => void;
  isLoading: boolean;
}

export const PromptGenerator: React.FC<PromptGeneratorProps> = ({ onGenerate, isLoading }) => {
  const [scene, setScene] = useState<string>('A person nervously looking around before trying to open a locked door.');
  const [location, setLocation] = useState<string>(LOCATIONS[1]);
  const [timeOfDay, setTimeOfDay] = useState<string>(TIMES_OF_DAY[3]);
  const [effects, setEffects] = useState<string[]>([EFFECTS[0], EFFECTS[5]]);

  const handleEffectChange = (effect: string) => {
    setEffects(prev =>
      prev.includes(effect) ? prev.filter(e => e !== effect) : [...prev, effect]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate({ scene, location, timeOfDay, effects });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="scene" className="block text-sm font-medium text-slate-300 mb-2">
          Scene Description
        </label>
        <textarea
          id="scene"
          value={scene}
          onChange={(e) => setScene(e.target.value)}
          rows={4}
          className="w-full bg-gray-900 border border-slate-700 rounded-sm shadow-sm focus:ring-green-500 focus:border-green-500 text-slate-200 p-3 transition"
          placeholder="e.g., A cat knocks over a vase of flowers."
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-slate-300 mb-2">
          Location
        </label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full bg-gray-900 border border-slate-700 rounded-sm shadow-sm focus:ring-green-500 focus:border-green-500 text-slate-200 p-3 transition"
        >
          {LOCATIONS.map(loc => <option key={loc} value={loc} className="bg-gray-900 text-slate-200">{loc}</option>)}
        </select>
      </div>

      <div>
        <label htmlFor="timeOfDay" className="block text-sm font-medium text-slate-300 mb-2">
          Time of Day
        </label>
        <select
          id="timeOfDay"
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(e.target.value)}
          className="w-full bg-gray-900 border border-slate-700 rounded-sm shadow-sm focus:ring-green-500 focus:border-green-500 text-slate-200 p-3 transition"
        >
          {TIMES_OF_DAY.map(time => <option key={time} value={time} className="bg-gray-900 text-slate-200">{time}</option>)}
        </select>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Visual Effects & Artifacts
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
          {EFFECTS.map(effect => (
            <label key={effect} className="flex items-center space-x-3 bg-gray-800/60 p-3 rounded-sm border border-slate-700 hover:bg-gray-700/80 transition cursor-pointer">
              <input
                type="checkbox"
                checked={effects.includes(effect)}
                onChange={() => handleEffectChange(effect)}
                className="h-4 w-4 shrink-0 rounded-sm bg-gray-700 border-slate-500 text-green-500 focus:ring-green-600 focus:ring-offset-gray-800"
              />
              <span className="text-sm text-slate-300">{effect}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-sm shadow-sm text-gray-950 bg-green-500 hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-950 focus:ring-green-500 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed transition-all duration-300"
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Generating...
            </>
          ) : (
            'Generate Prompt'
          )}
        </button>
      </div>
    </form>
  );
};