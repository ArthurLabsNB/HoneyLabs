import { useEffect } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { API_BUILD_PROGRESS } from '@lib/apiPaths'
import type { AppInfo } from '@/types/app'

export function startBuildProgress(
  onData: (data: Partial<AppInfo>) => void,
  maxRetries = 5,
) {
  let retry = 1
  let attempts = 0
  let es: EventSource
  const connect = () => {
    es = new EventSource(API_BUILD_PROGRESS)
    es.addEventListener('open', () => {
      retry = 1
      attempts = 0
    })
    es.onmessage = (e) => {
      try {
        const data = JSON.parse(e.data) as Partial<AppInfo>
        onData(data)
      } catch {}
    }
    es.onerror = async () => {
      es.close()
      attempts += 1
      try {
        const r = await fetch(API_BUILD_PROGRESS, { method: 'HEAD' })
        if (r.status === 401) return
      } catch {}
      if (attempts <= maxRetries) {
        setTimeout(connect, retry * 1000)
        retry = Math.min(retry * 2, 30)
      }
    }
  }
  connect()
  return () => es.close()
}

export default function useBuildProgress(building: boolean) {
  const qc = useQueryClient()

  useEffect(() => {
    if (!building) return
    const stop = startBuildProgress((data) => {
      qc.setQueryData(['app'], (prev: AppInfo | undefined) =>
        prev ? { ...prev, ...data } : undefined,
      )
    })
    return stop
  }, [building, qc])
}
