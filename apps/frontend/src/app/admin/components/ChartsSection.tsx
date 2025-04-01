'use client';

import React, { useState, useEffect } from 'react';
import { GameShieldStats } from '../types';
import { mockStats } from '../mock-data';

/**
 * Charts Section Component
 * Displays various charts and graphs for GameShield analytics
 */
export function ChartsSection() {
  const [stats, setStats] = useState<GameShieldStats | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // In a real app, this would be an API call
        // For now, we'll use mock data with a delay to simulate an API call
        setTimeout(() => {
          setStats(mockStats);
          setLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error fetching stats:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Loading charts...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8">No data available</div>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
      {/* Time Series Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Verification Trends</h3>
        <div className="h-64 relative">
          {/* This would be a real chart in a production app */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-48">
              <div className="relative h-full">
                {stats.timeSeriesData.map((dataPoint, index) => {
                  const percentage = dataPoint.verifications / 250 * 100;
                  const width = 100 / stats.timeSeriesData.length;
                  const left = index * width;
                  
                  return (
                    <div 
                      key={index}
                      className="absolute bottom-0 bg-blue-500 rounded-t"
                      style={{
                        left: `${left}%`,
                        width: `${width - 5}%`,
                        height: `${percentage}%`
                      }}
                    >
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs">
                        {dataPoint.verifications}
                      </div>
                    </div>
                  );
                })}
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  {stats.timeSeriesData.map((dataPoint, index) => (
                    <div key={index} className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(dataPoint.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Game Type Distribution */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Game Type Distribution</h3>
        <div className="w-full max-w-md">
          {Object.entries(stats.gameTypeDistribution).map(([type, count], index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium capitalize">{type}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(count / stats.totalVerifications) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Difficulty Distribution */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Difficulty Distribution</h3>
        <div className="w-full max-w-md">
          {Object.entries(stats.difficultyDistribution).map(([difficulty, count], index) => (
            <div key={index} className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium capitalize">{difficulty}</span>
                <span className="text-sm font-medium">{count}</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    difficulty === 'easy' ? 'bg-green-500' : 
                    difficulty === 'medium' ? 'bg-yellow-500' : 
                    'bg-red-500'
                  }`}
                  style={{ width: `${(count / stats.totalVerifications) * 100}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Success Rate Over Time */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Success Rate Over Time</h3>
        <div className="h-64 relative">
          {/* This would be a real chart in a production app */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full h-48">
              <div className="relative h-full">
                {/* Draw line chart for success rate */}
                <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <polyline
                    points={stats.timeSeriesData.map((point, index) => {
                      const x = index / (stats.timeSeriesData.length - 1) * 100;
                      const y = 100 - (point.successRate * 100);
                      return `${x},${y}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#10B981"
                    strokeWidth="2"
                  />
                </svg>
                
                {/* Y-axis labels */}
                <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between items-end pr-2">
                  <div className="text-xs text-gray-500 dark:text-gray-400">100%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">75%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">50%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">25%</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">0%</div>
                </div>
                
                {/* X-axis labels */}
                <div className="absolute bottom-0 left-0 right-0 flex justify-between pt-2 border-t border-gray-200 dark:border-gray-700">
                  {stats.timeSeriesData.map((dataPoint, index) => (
                    <div key={index} className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(dataPoint.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
