import type {
  Site,
  CreateSiteRequest,
  UpdateSiteRequest,
  ApiKey,
  CreateApiKeyRequest,
  CreateApiKeyResponse,
  AnalyticsOverview,
} from '@gameshield/shared';

const API_BASE = '/api/v1/admin';

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
    ...options,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Request failed' }));
    throw new Error(error.error || 'Request failed');
  }

  return response.json();
}

// Sites API
export const sitesApi = {
  list: () => fetchApi<Site[]>('/sites'),

  get: (id: string) => fetchApi<Site>(`/sites/${id}`),

  create: (data: CreateSiteRequest) =>
    fetchApi<Site>('/sites', {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  update: (id: string, data: UpdateSiteRequest) =>
    fetchApi<Site>(`/sites/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    }),

  delete: (id: string) =>
    fetchApi<{ success: boolean }>(`/sites/${id}`, {
      method: 'DELETE',
    }),
};

// API Keys API
export const apiKeysApi = {
  list: (siteId: string) => fetchApi<ApiKey[]>(`/sites/${siteId}/keys`),

  create: (siteId: string, data: CreateApiKeyRequest) =>
    fetchApi<CreateApiKeyResponse>(`/sites/${siteId}/keys`, {
      method: 'POST',
      body: JSON.stringify(data),
    }),

  revoke: (siteId: string, keyId: string) =>
    fetchApi<{ success: boolean }>(`/sites/${siteId}/keys/${keyId}`, {
      method: 'DELETE',
    }),
};

// Analytics API
export const analyticsApi = {
  getOverview: (siteId: string, days?: number) =>
    fetchApi<AnalyticsOverview>(
      `/analytics/${siteId}/overview${days ? `?days=${days}` : ''}`
    ),
};
