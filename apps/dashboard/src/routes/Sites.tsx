import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { Plus, Globe, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Sites() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newSiteName, setNewSiteName] = useState('');
  const [newSiteDomain, setNewSiteDomain] = useState('');

  const queryClient = useQueryClient();

  const { data: sites = [], isLoading } = useQuery({
    queryKey: ['sites'],
    queryFn: sitesApi.list,
  });

  const createMutation = useMutation({
    mutationFn: sitesApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
      setIsCreateModalOpen(false);
      setNewSiteName('');
      setNewSiteDomain('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: sitesApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sites'] });
    },
  });

  const handleCreate = () => {
    if (!newSiteName || !newSiteDomain) return;
    createMutation.mutate({
      name: newSiteName,
      domains: newSiteDomain.split(',').map((d) => d.trim()),
    });
  };

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete "${name}"?`)) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">Sites</h1>
          <p className="text-gray-600 mt-1">
            Manage your registered sites and their CAPTCHA settings
          </p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="w-4 h-4" />
          Add Site
        </Button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : sites.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Globe className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600 mb-4">No sites configured yet</p>
            <Button onClick={() => setIsCreateModalOpen(true)}>
              <Plus className="w-4 h-4" />
              Create your first site
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {sites.map((site) => (
            <Card key={site.id}>
              <CardContent className="flex items-center justify-between">
                <Link
                  to={`/sites/${site.id}`}
                  className="flex-1 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
                      <Globe className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <p className="font-medium">{site.name}</p>
                      <p className="text-sm text-gray-500">
                        {site.domains.join(', ')}
                      </p>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-medium capitalize">
                      {site.settings.difficulty}
                    </p>
                    <p className="text-xs text-gray-500">
                      {site.settings.minLinesRequired} lines required
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(site.id, site.name);
                    }}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Create Site Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Site"
      >
        <div className="space-y-4">
          <Input
            label="Site Name"
            placeholder="My Website"
            value={newSiteName}
            onChange={(e) => setNewSiteName(e.target.value)}
          />
          <Input
            label="Domains"
            placeholder="example.com, www.example.com"
            value={newSiteDomain}
            onChange={(e) => setNewSiteDomain(e.target.value)}
          />
          <p className="text-sm text-gray-500">
            Separate multiple domains with commas
          </p>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              variant="secondary"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleCreate}
              disabled={
                createMutation.isPending || !newSiteName || !newSiteDomain
              }
            >
              {createMutation.isPending ? 'Creating...' : 'Create Site'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
