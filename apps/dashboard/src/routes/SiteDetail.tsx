import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sitesApi, apiKeysApi } from '@/lib/api';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Modal } from '@/components/ui/Modal';
import { ArrowLeft, Copy, Key, Plus, Trash2, Check } from 'lucide-react';

export default function SiteDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isKeyModalOpen, setIsKeyModalOpen] = useState(false);
  const [newKeyName, setNewKeyName] = useState('');
  const [createdKey, setCreatedKey] = useState<string | null>(null);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const { data: site, isLoading: siteLoading } = useQuery({
    queryKey: ['site', id],
    queryFn: () => sitesApi.get(id!),
    enabled: !!id,
  });

  const { data: apiKeys = [], isLoading: keysLoading } = useQuery({
    queryKey: ['apiKeys', id],
    queryFn: () => apiKeysApi.list(id!),
    enabled: !!id,
  });

  const createKeyMutation = useMutation({
    mutationFn: (name: string) => apiKeysApi.create(id!, { name }),
    onSuccess: (data) => {
      setCreatedKey(data.secretKey);
      setNewKeyName('');
      queryClient.invalidateQueries({ queryKey: ['apiKeys', id] });
    },
  });

  const revokeKeyMutation = useMutation({
    mutationFn: (keyId: string) => apiKeysApi.revoke(id!, keyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['apiKeys', id] });
    },
  });

  const handleCreateKey = () => {
    if (!newKeyName) return;
    createKeyMutation.mutate(newKeyName);
  };

  const copyToClipboard = async (text: string, field: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRevokeKey = (keyId: string, name: string) => {
    if (confirm(`Are you sure you want to revoke "${name}"? This cannot be undone.`)) {
      revokeKeyMutation.mutate(keyId);
    }
  };

  if (siteLoading) {
    return (
      <div className="p-8">
        <div className="text-center py-12 text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!site) {
    return (
      <div className="p-8">
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Site not found</p>
          <Button onClick={() => navigate('/sites')}>Back to Sites</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8">
      <button
        onClick={() => navigate('/sites')}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Sites
      </button>

      <div className="mb-8">
        <h1 className="text-2xl font-bold">{site.name}</h1>
        <p className="text-gray-600 mt-1">{site.domains.join(', ')}</p>
      </div>

      <div className="grid gap-6">
        {/* Site Key */}
        <Card>
          <CardHeader>
            <CardTitle>Site Key</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-3">
              Use this key in your frontend widget
            </p>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm">
                {site.siteKey}
              </code>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(site.siteKey, 'siteKey')}
              >
                {copiedField === 'siteKey' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Difficulty</p>
                <p className="font-medium capitalize">{site.settings.difficulty}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Lines Required</p>
                <p className="font-medium">{site.settings.minLinesRequired}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Max Solve Time</p>
                <p className="font-medium">{site.settings.maxSolveTime}s</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Theme</p>
                <p className="font-medium capitalize">{site.settings.theme}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* API Keys */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Secret Keys</CardTitle>
              <Button size="sm" onClick={() => setIsKeyModalOpen(true)}>
                <Plus className="w-4 h-4" />
                Create Key
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 mb-4">
              Use secret keys to verify tokens server-side. Keep these private.
            </p>
            {keysLoading ? (
              <div className="text-center py-4 text-gray-500">Loading...</div>
            ) : apiKeys.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                No API keys created yet
              </div>
            ) : (
              <div className="space-y-3">
                {apiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <Key className="w-4 h-4 text-gray-400" />
                      <div>
                        <p className="font-medium text-sm">{key.name}</p>
                        <p className="text-xs text-gray-500 font-mono">
                          {key.keyPrefix}...
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {key.revokedAt ? (
                        <span className="text-xs text-red-600 bg-red-100 px-2 py-1 rounded">
                          Revoked
                        </span>
                      ) : (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRevokeKey(key.id, key.name)}
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Integration */}
        <Card>
          <CardHeader>
            <CardTitle>Integration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium mb-2">Frontend Widget</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`<script src="https://cdn.gameshield.dev/widget.min.js"></script>
<gameshield-captcha
  site-key="${site.siteKey}"
  data-callback="onSuccess">
</gameshield-captcha>`}
                </pre>
              </div>
              <div>
                <p className="text-sm font-medium mb-2">Server Verification</p>
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto">
{`import { GameShield } from '@gameshield/server-sdk';

const gs = new GameShield({ secretKey: 'gs_sk_...' });
const result = await gs.verify(token);

if (result.success) {
  // User is verified
}`}
                </pre>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Key Modal */}
      <Modal
        isOpen={isKeyModalOpen}
        onClose={() => {
          setIsKeyModalOpen(false);
          setCreatedKey(null);
          setNewKeyName('');
        }}
        title={createdKey ? 'Secret Key Created' : 'Create Secret Key'}
      >
        {createdKey ? (
          <div className="space-y-4">
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                Copy this key now. You won't be able to see it again!
              </p>
            </div>
            <div className="flex items-center gap-2">
              <code className="flex-1 bg-gray-100 px-4 py-2 rounded-lg font-mono text-sm break-all">
                {createdKey}
              </code>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => copyToClipboard(createdKey, 'secretKey')}
              >
                {copiedField === 'secretKey' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
            <div className="flex justify-end pt-4">
              <Button
                onClick={() => {
                  setIsKeyModalOpen(false);
                  setCreatedKey(null);
                }}
              >
                Done
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Input
              label="Key Name"
              placeholder="Production API Key"
              value={newKeyName}
              onChange={(e) => setNewKeyName(e.target.value)}
            />
            <div className="flex justify-end gap-3 pt-4">
              <Button
                variant="secondary"
                onClick={() => setIsKeyModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleCreateKey}
                disabled={createKeyMutation.isPending || !newKeyName}
              >
                {createKeyMutation.isPending ? 'Creating...' : 'Create Key'}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
