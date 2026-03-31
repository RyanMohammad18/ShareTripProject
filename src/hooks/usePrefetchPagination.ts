
import { useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';

interface UsePrefetchPaginationOptions<TParams> {
  queryKey: string;
  params: TParams & { page: number };
  totalPages: number;
  fetchFn: (params: TParams & { page: number }, signal?: AbortSignal) => Promise<unknown>;
  staleTime?: number;
}

export function usePrefetchPagination<TParams>({
  queryKey,
  params,
  totalPages,
  fetchFn,
  staleTime = 30_000,
}: UsePrefetchPaginationOptions<TParams>) {
  const queryClient = useQueryClient();

  const prefetchPage = useCallback(
    (targetPage: number, prefetchNext = false) => {
      const prefetchSingle = (pg: number) => {
        if (pg < 1 || pg > totalPages) return;

        const { page, ...rest } = params;
        const targetParams = { ...rest, page: pg } as TParams & { page: number };

        const cached = queryClient.getQueryData([queryKey, targetParams]);
        if (cached) return;

        queryClient.prefetchQuery({
          queryKey: [queryKey, targetParams],
          queryFn: ({ signal }) => fetchFn(targetParams, signal),
          staleTime,
        });
      };


      prefetchSingle(targetPage);

      if (prefetchNext) {
        prefetchSingle(targetPage + 1);
      }
    },
    [queryKey, totalPages, params, fetchFn, staleTime, queryClient]
  );

  return { prefetchPage };
}