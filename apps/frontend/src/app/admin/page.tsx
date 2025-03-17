'use client';

import { useEffect, useState } from 'react';

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

interface VerificationItem {
  sessionId: string;
  timestamp: number;
  success: boolean;
  gameType: string;
  difficulty: string;
  duration: number;
  attempts: number;
  clientInfo: {
    userAgent: string;
  };
  behaviorMetrics?: {
    mouseMovements?: number;
    keyPresses?: number;
    interactionPattern?: string;
    responseTime?: number;
  };
  riskScore?: number;
  flags?: string[];
}

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

// Mock stats data
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

async function fetchData(): Promise<VerificationItem[]> {
  // Simulate fetching data from an API
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockData: VerificationItem[] = [
        {
          sessionId: "1",
          timestamp: Date.now() - 1000 * 60 * 60 * 24 * 2,
          success: true,
          gameType: "Slider",
          difficulty: "Easy",
          duration: 2.5,
          attempts: 1,
          clientInfo: {
            userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
          },
          behaviorMetrics: {
            mouseMovements: 120,
            keyPresses: 50,
            interactionPattern: "Smooth",
            responseTime: 1.2,
          },
        },
        {
          sessionId: "2",
          timestamp: Date.now() - 1000 * 60 * 60 * 24,
          success: false,
          gameType: "Image Recognition",
          difficulty: "Medium",
          duration: 5.1,
          attempts: 3,
          clientInfo: {
            userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.1 Safari/605.1.15",
          },
          behaviorMetrics: {
            mouseMovements: 250,
            keyPresses: 120,
            interactionPattern: "Erratic",
            responseTime: 2.8,
          },
          riskScore: 0.8,
          flags: ["Unusual Interaction Pattern"],
        },
        {
          sessionId: "3",
          timestamp: Date.now(),
          success: true,
          gameType: "Audio Challenge",
          difficulty: "Hard",
          duration: 7.3,
          attempts: 2,
          clientInfo: {
            userAgent: "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.107 Safari/537.36",
          },
          behaviorMetrics: {
            mouseMovements: 300,
            keyPresses: 150,
            interactionPattern: "Consistent",
            responseTime: 3.5,
          },
        },
      ];
      resolve(mockData);
    }, 500);
  });
}

// Configuration Section Component
function ConfigurationSection() {
  return (
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
          <label className="block text-sm font-medium mb-2">Data Retention Policy</label>
          <input type="number" className="w-full p-2 border rounded-md" placeholder="Days" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Anonymize IP Addresses</label>
          <input type="checkbox" className="rounded" />
        </div>
      </div>
    </div>
  );
}

// Data Table Component
function DataTable() {
  const [data, setData] = useState<VerificationItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className="text-center">Loading data...</div>;
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Session ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Success</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Game Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difficulty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attempts</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Flags</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client Info</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
            {data.map((item) => (
              <tr key={item.sessionId}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{item.sessionId}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{new Date(item.timestamp).toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.success ? "Yes" : "No"}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.gameType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.difficulty}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.duration}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.attempts}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{item.riskScore !== undefined ? item.riskScore.toFixed(2) : "N/A"}</td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                  {item.flags && item.flags.length > 0 && item.flags.map((flag, index) => (
                    <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100">
                      {flag}
                    </span>
                  ))}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">{item.clientInfo.userAgent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// Key Metrics Component
function KeyMetrics() {
  const [stats, setStats] = useState<GameShieldStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
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
  );
}

// Charts Section Component
function ChartsSection() {
  const [stats, setStats] = useState<GameShieldStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setStats(mockStats);
      } catch (error) {
        console.error('Failed to fetch analytics data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-medium mb-4">Verification Trend</h3>
        <div className="h-64 flex items-end space-x-2">
          {stats.timeSeriesData.map((data, index) => (
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
            {Object.entries(stats.gameTypeDistribution).map(([type, count], index) => (
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
  );
}

// Malicious Activity Table Component
function MaliciousActivityTable() {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md mb-8">
      <h3 className="text-lg font-medium mb-4">Recent Malicious Activity</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
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
          <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700">
            {mockMaliciousData.map((item, index) => (
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
                  {item.flags.map((flag, i) => (
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
  );
}

export default function AdminDashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">GameShield Admin Dashboard</h1>
      <KeyMetrics />
      <ChartsSection />
      <MaliciousActivityTable />
      <ConfigurationSection />
    </div>
  );
}
