import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { sitesApi, analyticsApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export default function Analytics() {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(null);
  const [days, setDays] = useState(30);

  const { data: sites = [] } = useQuery({
    queryKey: ['sites'],
    queryFn: sitesApi.list,
  });

  const { data: analytics, isLoading: analyticsLoading } = useQuery({
    queryKey: ['analytics', selectedSiteId, days],
    queryFn: () => analyticsApi.getOverview(selectedSiteId!, days),
    enabled: !!selectedSiteId,
  });

  // Auto-select first site if none selected
  if (!selectedSiteId && sites.length > 0) {
    setSelectedSiteId(sites[0].id);
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-600 mt-1">
            Monitor CAPTCHA performance and usage
          </p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={selectedSiteId || ''}
            onChange={(e) => setSelectedSiteId(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            {sites.map((site) => (
              <option key={site.id} value={site.id}>
                {site.name}
              </option>
            ))}
          </select>
          <select
            value={days}
            onChange={(e) => setDays(Number(e.target.value))}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value={7}>Last 7 days</option>
            <option value={30}>Last 30 days</option>
            <option value={90}>Last 90 days</option>
          </select>
        </div>
      </div>

      {sites.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">
              Create a site first to view analytics
            </p>
          </CardContent>
        </Card>
      ) : analyticsLoading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : !analytics ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-gray-500">No analytics data available</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Total Challenges</p>
                <p className="text-3xl font-bold mt-1">
                  {analytics.totalChallenges.toLocaleString()}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Success Rate</p>
                <p className="text-3xl font-bold mt-1">
                  {(analytics.successRate * 100).toFixed(1)}%
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-sm text-gray-600">Avg. Solve Time</p>
                <p className="text-3xl font-bold mt-1">
                  {(analytics.avgSolveTime / 1000).toFixed(1)}s
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Challenges Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Challenges Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.challengesByDay.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  No data for selected period
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={analytics.challengesByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) =>
                        new Date(date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      }
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(date) =>
                        new Date(date).toLocaleDateString()
                      }
                    />
                    <Line
                      type="monotone"
                      dataKey="count"
                      stroke="#6366f1"
                      strokeWidth={2}
                      dot={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>

          {/* Success/Failed Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Success vs Failed</CardTitle>
            </CardHeader>
            <CardContent>
              {analytics.successByDay.length === 0 ? (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  No data for selected period
                </div>
              ) : (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={analytics.successByDay}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="date"
                      tickFormatter={(date) =>
                        new Date(date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })
                      }
                    />
                    <YAxis />
                    <Tooltip
                      labelFormatter={(date) =>
                        new Date(date).toLocaleDateString()
                      }
                    />
                    <Legend />
                    <Bar dataKey="success" name="Success" fill="#22c55e" />
                    <Bar dataKey="failed" name="Failed" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
