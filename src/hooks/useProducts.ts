// hooks/useProducts.ts
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchProductsWithRetry } from '../api/resilientClient';
import type { FetchProductsParams } from '../types/product';

export function useProducts(params: FetchProductsParams) {
  return useQuery({
    queryKey: ['products', params], //key diye onno page e refetch korte chaile , revalidate er mddhek key dile etai run korbe. parent er kichu kora lagbe na. props pathano lage na, tanstack query client er mddhe revalidate
    queryFn: ({ signal }) => fetchProductsWithRetry(params, signal), //
    placeholderData: keepPreviousData,//need to check
  });
}