// hooks/useUrlParams.ts
import { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';

interface ParamConfig {
  [key: string]: 'string' | 'number';
}

/**
 * Syncs state with URL search params. Reusable for any page.
 *
 * Usage:
 *   const [params, setParams] = useUrlParams({ page: 'number', category: 'string' });
 *   params.page     → number | undefined
 *   setParams({ page: 2 })  → updates URL to ?page=2
 */
export function useUrlParams<T extends ParamConfig>(config: T) {
  const [searchParams, setSearchParams] = useSearchParams();

  type Parsed = {
    [K in keyof T]: T[K] extends 'number' ? number | undefined : string | undefined;
  };

  // Read current values from URL
  const params = Object.keys(config).reduce((acc, key) => {
    const raw = searchParams.get(key);
    if (raw === null) {
      (acc as any)[key] = undefined;
    } else if (config[key] === 'number') {
      (acc as any)[key] = Number(raw);
    } else {
      (acc as any)[key] = raw;
    }
    return acc;
  }, {} as Parsed);

  // Update URL — merges with existing params, removes undefined/empty values
  const setParams = useCallback(
    (updates: Partial<Record<keyof T, string | number | undefined>>) => {
      setSearchParams((prev) => {
        const next = new URLSearchParams(prev);

        Object.entries(updates).forEach(([key, value]) => {
          if (value === undefined || value === '' || value === 0) {
            next.delete(key);
          } else {
            next.set(key, String(value));
          }
        });

        return next;
      });
    },
    [setSearchParams]
  );

  return [params, setParams] as const;
}