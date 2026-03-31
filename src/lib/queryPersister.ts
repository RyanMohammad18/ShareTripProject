// lib/queryPersister.ts
import type { QueryClient } from '@tanstack/react-query';

const PREFIX = 'rq_';
const DAY = 24 * 60 * 60 * 1000;

const serializeKey = (key: unknown[]) =>
  key.map((k) =>
    typeof k === 'object' ? JSON.stringify(k, Object.keys(k as object).sort()) : String(k)
  ).join('_');

/**
 * Call ONCE during QueryClient setup — no hooks, no effects, no React.
 * Hydrates cache from localStorage, subscribes to future updates.
 */
export function setupQueryPersister(
  queryClient: QueryClient,
  queryKeyPrefix: string,
  maxAge = DAY
) {
  // HYDRATE: localStorage → QueryClient (runs before React renders)
  for (let i = 0; i < localStorage.length; i++) {
    const storageKey = localStorage.key(i);
    if (!storageKey?.startsWith(PREFIX + queryKeyPrefix)) continue;

    try {
      const { data, timestamp } = JSON.parse(localStorage.getItem(storageKey)!);
      if (Date.now() - timestamp > maxAge) {
        localStorage.removeItem(storageKey);
        continue;
      }

      const paramsStr = storageKey.slice(PREFIX.length + queryKeyPrefix.length + 1);
      queryClient.setQueryData([queryKeyPrefix, JSON.parse(paramsStr)], data);
    } catch {
      localStorage.removeItem(storageKey!);
    }
  }

  // PERSIST: QueryClient → localStorage (subscribe once, runs forever)
  queryClient.getQueryCache().subscribe((event) => {
    if (event.type !== 'updated' || event.action.type !== 'success') return;
    if (event.query.queryKey[0] !== queryKeyPrefix) return;

    try {
      localStorage.setItem(
        PREFIX + serializeKey(event.query.queryKey),
        JSON.stringify({ data: event.query.state.data, timestamp: Date.now() })
      );
    } catch {
      // Storage full — app works fine without persistence
    }
  });
}