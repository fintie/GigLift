import type { ApiExecution, ApiTask, CreateTaskPayload, MarketplaceJob } from '../types'

const API_BASE = import.meta.env.VITE_API_BASE_URL ?? '/api'

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  const json = await response.json().catch(() => null)

  if (!response.ok) {
    throw new Error((json as { error?: string } | null)?.error ?? `Request failed: ${response.status}`)
  }

  return json as T
}

export const api = {
  getTasks() {
    return request<{ data: ApiTask[] }>('/tasks')
  },
  getTask(taskId: string) {
    return request<{ data: ApiTask }>(`/tasks/${taskId}`)
  },
  createTask(payload: CreateTaskPayload) {
    return request<{ data: ApiTask }>('/tasks', {
      method: 'POST',
      body: JSON.stringify(payload),
    })
  },
  runTask(taskId: string) {
    return request<{ data: ApiExecution }>(`/tasks/${taskId}/run`, {
      method: 'POST',
    })
  },
  sendTaskToHuman(taskId: string, reason?: string) {
    return request<{ data: MarketplaceJob }>(`/tasks/${taskId}/human-fallback`, {
      method: 'POST',
      body: JSON.stringify(reason ? { reason } : {}),
    })
  },
  getMarketplaceJobs() {
    return request<{ data: MarketplaceJob[] }>('/marketplace/jobs')
  },
}
