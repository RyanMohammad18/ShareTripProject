
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProductsWithRetry } from '../api/resilientClient';
import type { FetchProductsParams } from '../types/product';

export function useProducts(params: FetchProductsParams) {
  return useQuery({
    queryKey: ['products', params], 
    queryFn: ({ signal }) => fetchProductsWithRetry(params, signal),
    placeholderData: keepPreviousData,
  });
}