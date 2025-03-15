'use client';

import { useEffect, useState } from 'react';

// Temporary type definitions until we can properly build and import from captcha-sdk
interface VerificationData {
  sessionId: string;
  timestamp: number;
  success: boolean;
  gameType: string;
  difficulty: string;
  duration: number;
  attempts: number;
  clientInfo: {
    userAgent: string;
    ip?: string;
    fingerprint?: string;
    geolocation?: {
      country?: string;
      region?: string;
    };
  };
  behaviorMetrics?: {
    mouseMovements?: number;
    keyPresses?: number;
    interactionPattern?: string;
    responseTime?: number;
  };
}

interface MaliciousActivityData extends VerificationData {
  riskScore: number;
  flags: string[];
  evidence?: any;
}

interface GameShieldStats {
  totalVerifications: number;
  successRate: number;
  averageDuration: number;
  maliciousAttempts: number;
  gameTypeDistribution: Record<string, number>;
  difficultyDistribution: Record<string, number>;
  timeSeriesData: {
    timestamp: number;
    verifications: number;
    successRate: number;
    maliciousAttempts: number;
  }[];
  geoDistribution?: Record<string, number>;
}

// This would normally come from the SDK, but we'll mock it for now
const mockStats: GameShieldStats = {
  totalVerifications: 1245,
  successRate: 0.78,
  averageDuration: 12500,
  maliciousAttempts: 87,
  gameTypeDistribution: {
    'puzzle': 450,
    'maze': 380,
    'pattern': 415
  },
  difficultyDistribution: {
    'easy': 520,
    'medium': 625,
    'hard': 100
  },
  timeSeriesData: [
    { timestamp: Date.now() - 6 * 24 * 60 * 60 * 1000, verifications: 180, successRate: 0.75, maliciousAttempts: 12 },
    { timestamp: Date.now() - 5 * 24 * 60 * 60 * 1000, verifications: 195, successRate: 0.77, maliciousAttempts: 15 },
    { timestamp: Date.now() - 4 * 24 * 60 * 60 * 1000, verifications: 210, successRate: 0.79, maliciousAttempts: 18 },
    { timestamp: Date.now() - 3 * 24 * 60 * 60 * 1000, verifications: 225, successRate: 0.76, maliciousAttempts: 14 },
    { timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, verifications: 215, successRate: 0.80, maliciousAttempts: 16 },
    { timestamp: Date.now() - 1 * 24 * 60 * 60 * 1000, verifications: 220, successRate: 0.81, maliciousAttempts: 12 }
  ]
};

// Mock malicious activity data
const mockMaliciousData: MaliciousActivityData[] = [
  {
    sessionId: 'session-123',
    timestamp: Date.now() - 2 * 60 * 60 * 1000,
    success: false,
    gameType: 'puzzle',
    difficulty: 'medium',
    duration: 3200,
    attempts: 1,
    clientInfo: {
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      fingerprint: 'fp-123'
    },
    riskScore: 85,
    flags: ['impossible-score', 'too-fast']
  },
  {
    sessionId: 'session-456',
    timestamp: Date.now() - 4 * 60 * 60 * 1000,
    success: false,
    gameType: 'maze',
    difficulty: 'easy',
    duration: 1800,
    attempts: 2,
    clientInfo: {
      userAgent: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36',
      fingerprint: 'fp-456'
    },
    riskScore: 75,
    flags: ['too-few-inputs']
  },
  {
    sessionId: 'session-789',
    timestamp: Date.now() - 8 * 60 * 60 * 1000,
    success: false,
    gameType: 'pattern',
    difficulty: 'hard',
    duration: 2500,
    attempts: 3,
    clientInfo: {
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15',
      fingerprint: 'fp-789'
    },
    riskScore: 90,
    flags: ['impossible-score', 'too-fast', 'too-few-inputs']
  }
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<GameShieldStats | null>(null);
  const [maliciousData, setMaliciousData] = useState<MaliciousActivityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('7d'); // '24h', '7d', '30d', 'all'

  useEffect(() => {
    // In a real implementation, this would fetch data from the SDK
    const fetchData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // In a real implementation, this would use the SDK
        // const analytics = new AnalyticsManager();
        // const stats = await analytics.getStats();
        // const maliciousData = await analytics.getMaliciousActivityData();
        
        setStats(mockStats);
        setMaliciousData(mockMaliciousData);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchData();
  }, [dateRange]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-500">Failed to load analytics data</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">GameShield Admin Dashboard</h1>
      
      {/* Date range selector */}
      <div className="mb-6">
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === '24h' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setDateRange('24h')}
          >
            Last 24 Hours
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === '7d' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setDateRange('7d')}
          >
            Last 7 Days
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === '30d' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setDateRange('30d')}
          >
            Last 30 Days
          </button>
          <button 
            className={`px-4 py-2 rounded-md ${dateRange === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
            onClick={() => setDateRange('all')}
          >
            All Time
          </button>
        </div>
      </div>
      
      {/* Key metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Total Verifications</h3>
          <p className="text-3xl font-bold">{stats.totalVerifications.toLocaleString()}</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Success Rate</h3>
          <p className="text-3xl font-bold">{(stats.successRate * 100).toFixed(1)}%</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Avg. Completion Time</h3>
          <p className="text-3xl font-bold">{(stats.averageDuration / 1000).toFixed(1)}s</p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-gray-500 text-sm font-medium mb-2">Malicious Attempts</h3>
          <p className="text-3xl font-bold text-red-500">{stats.maliciousAttempts.toLocaleString()}</p>
        </div>
      </div>
      
      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Verification Trend</h3>
          <div className="h-64 flex items-end space-x-2">
            {stats.timeSeriesData.map((data: { timestamp: number; verifications: number; maliciousAttempts: number }, index: number) => (
              <div key={index} className="flex flex-col items-center flex-1">
                <div className="w-full flex space-x-1">
                  <div 
                    className="bg-blue-500 rounded-t"
                    style={{ 
                      height: `${(data.verifications / 250) * 100}%`,
                      width: '60%'
                    }}
                  ></div>
                  <div 
                    className="bg-red-500 rounded-t"
                    style={{ 
                      height: `${(data.maliciousAttempts / 20) * 100}%`,
                      width: '40%'
                    }}
                  ></div>
                </div>
                <span className="text-xs mt-2">
                  {new Date(data.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-sm">Verifications</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
              <span className="text-sm">Malicious</span>
            </div>
          </div>
        </div>
        
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-medium mb-4">Distribution by Game Type</h3>
          <div className="h-64 flex items-center justify-center">
            <div className="w-full max-w-md">
              {Object.entries(stats.gameTypeDistribution).map(([type, count]: [string, number], index: number) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium capitalize">{type}</span>
                    <span className="text-sm font-medium">{count}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${(count / stats.totalVerifications) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Malicious activity table */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
        <h3 className="text-lg font-medium mb-4">Recent Malicious Activity</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Time
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Game Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Risk Score
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Flags
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  User Agent
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {maliciousData.map((item: MaliciousActivityData, index: number) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {new Date(item.timestamp).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">
                    {item.gameType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      item.riskScore > 80 ? 'bg-red-100 text-red-800' : 
                      item.riskScore > 60 ? 'bg-yellow-100 text-yellow-800' : 
                      'bg-green-100 text-green-800'
                    }`}>
                      {item.riskScore}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    {item.flags.map((flag: string, i: number) => (
                      <span key={i} className="inline-block bg-gray-200 rounded-full px-2 py-1 text-xs font-semibold text-gray-700 mr-1 mb-1">
                        {flag}
                      </span>
                    ))}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                    {item.clientInfo.userAgent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Configuration section */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Analytics Configuration</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Analytics Provider</label>
            <select className="w-full p-2 border rounded-md">
              <option value="localStorage">Local Storage (Demo)</option>
              <option value="database">Self-hosted Database</option>
              <option value="cloud">Cloud Provider (Premium)</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Data Retention Period</label>
            <select className="w-full p-2 border rounded-md">
              <option value="30">30 days</option>
              <option value="90">90 days</option>
              <option value="180">180 days</option>
              <option value="365">1 year</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input type="checkbox" id="enable-analytics" className="mr-2" checked />
            <label htmlFor="enable-analytics">Enable Analytics Collection</label>
          </div>
          
          <button className="px-4 py-2 bg-blue-600 text-white rounded-md">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
