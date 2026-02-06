import { useQuery } from '@tanstack/react-query';
import { sitesApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Globe, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { data: sites = [], isLoading } = useQuery({
    queryKey: ['sites'],
    queryFn: sitesApi.list,
  });

  const stats = [
    {
      label: 'Total Sites',
      value: sites.length,
      icon: Globe,
      color: 'text-blue-600 bg-blue-100',
    },
    {
      label: 'Active Today',
      value: sites.length,
      icon: CheckCircle,
      color: 'text-green-600 bg-green-100',
    },
    {
      label: 'Challenges Today',
      value: '—',
      icon: Clock,
      color: 'text-purple-600 bg-purple-100',
    },
    {
      label: 'Success Rate',
      value: '—',
      icon: CheckCircle,
      color: 'text-emerald-600 bg-emerald-100',
    },
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600 mt-1">
          Overview of your GameShield CAPTCHA system
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold">
                  {isLoading ? '...' : stat.value}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Sites */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Sites</CardTitle>
            <Link
              to="/sites"
              className="text-sm text-primary-600 hover:text-primary-700"
            >
              View all →
            </Link>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="text-center py-8 text-gray-500">Loading...</div>
          ) : sites.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500 mb-4">No sites configured yet</p>
              <Link
                to="/sites"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Create your first site →
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {sites.slice(0, 5).map((site) => (
                <Link
                  key={site.id}
                  to={`/sites/${site.id}`}
                  className="flex items-center justify-between py-3 hover:bg-gray-50 -mx-6 px-6 transition-colors"
                >
                  <div>
                    <p className="font-medium">{site.name}</p>
                    <p className="text-sm text-gray-500">
                      {site.domains.join(', ')}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {site.settings.difficulty} difficulty
                  </div>
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Quick Start Guide */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Quick Start</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium">
                1
              </span>
              <div>
                <p className="font-medium">Create a site</p>
                <p className="text-sm text-gray-600">
                  Register your domain and configure CAPTCHA settings
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </span>
              <div>
                <p className="font-medium">Add the widget</p>
                <p className="text-sm text-gray-600">
                  Include the GameShield widget on your form pages
                </p>
              </div>
            </li>
            <li className="flex gap-4">
              <span className="flex-shrink-0 w-6 h-6 bg-primary-100 text-primary-700 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </span>
              <div>
                <p className="font-medium">Verify server-side</p>
                <p className="text-sm text-gray-600">
                  Use the server SDK to verify tokens before processing forms
                </p>
              </div>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
