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

  if (!response.ok) {
    const text = await response.text()
    throw new Error(text || `Request failed with status ${response.status}`)
  }

  return response.json() as Promise<T>
}

export const api = {
  listTasks() {
    return request<{ data: ApiTask[] }>('/tasks')
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
  sendTaskToHuman(taskId: string) {
    return request<{ data: MarketplaceJob }>(`/tasks/${taskId}/human-fallback`, {
      method: 'POST',
    })
  },
  listMarketplaceJobs() {
    return request<{ data: MarketplaceJob[] }>('/marketplace/jobs')
  },
}
