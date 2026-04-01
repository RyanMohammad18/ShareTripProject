
import { api } from '../services/api';
import type { FetchProductsParams, PaginatedResponse, Product } from '../types/product';

const MAX_RETRIES = 3;
const BASE_DELAY = 800; 

function wait(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function fetchProductsWithRetry(
  params: FetchProductsParams,
  signal?: AbortSignal
): Promise<PaginatedResponse<Product>> {
  let lastError: Error;

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    if (signal?.aborted) {
      throw new DOMException('Request aborted', 'AbortError');
    }

    try {
      const result = await api.fetchProducts(params);

      if (!result?.data) throw new Error('Empty response from server');
      if (!Array.isArray(result.data)) throw new Error('Invalid response format');
      result.data = result.data.filter(Boolean) as Product[];
    
      return result; 
    } catch (error) {
      lastError = error as Error;

  
      if (signal?.aborted) throw lastError;

     
      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY * Math.pow(2, attempt); 
        await wait(delay);
      }
    }
  }

  throw lastError!;
}