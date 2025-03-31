'use client';

import React, { useState, useEffect } from 'react';
import { GameShieldStats } from '../types';
import { mockStats } from '../mock-data';

/**
 * Key Metrics Component
 * Displays important statistics about GameShield usage
 */
export function KeyMetrics() {
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
    return <div className="text-center py-8">Loading metrics...</div>;
  }

  if (!stats) {
    return <div className="text-center py-8">No data available</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Total Verifications</h3>
        <p className="text-3xl font-bold">{stats.totalVerifications.toLocaleString()}</p>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Last 30 days
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Success Rate</h3>
        <p className="text-3xl font-bold">{(stats.successRate * 100).toFixed(1)}%</p>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {stats.successRate > 0.75 ? (
            <span className="text-green-500">Good</span>
          ) : stats.successRate > 0.6 ? (
            <span className="text-yellow-500">Average</span>
          ) : (
            <span className="text-red-500">Poor</span>
          )}
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Average Duration</h3>
        <p className="text-3xl font-bold">{(stats.averageDuration / 1000).toFixed(1)}s</p>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          Time to complete
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Malicious Attempts</h3>
        <p className="text-3xl font-bold">{stats.maliciousAttempts.toLocaleString()}</p>
        <div className="mt-2 text-sm text-gray-600 dark:text-gray-300">
          {stats.maliciousAttempts > 100 ? (
            <span className="text-red-500">High</span>
          ) : stats.maliciousAttempts > 50 ? (
            <span className="text-yellow-500">Medium</span>
          ) : (
            <span className="text-green-500">Low</span>
          )}
        </div>
      </div>
    </div>
  );
}
