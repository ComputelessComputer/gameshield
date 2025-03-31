'use client';

import React from 'react';

/**
 * Configuration Section Component
 * Allows administrators to configure GameShield settings
 */
export function ConfigurationSection() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-medium mb-4">Configuration</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Game Difficulty Weights</label>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block text-xs mb-1">Easy</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="40"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs mb-1">Medium</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="50"
                className="w-full"
              />
            </div>
            <div className="flex-1">
              <label className="block text-xs mb-1">Hard</label>
              <input
                type="range"
                min="0"
                max="100"
                defaultValue="10"
                className="w-full"
              />
            </div>
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">Verification Threshold</label>
          <input
            type="range"
            min="0"
            max="100"
            defaultValue="75"
            className="w-full"
          />
          <div className="flex justify-between text-xs mt-1">
            <span>Lenient</span>
            <span>Strict</span>
          </div>
        </div>
        
        <div className="flex justify-end mt-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
