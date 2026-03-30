
import { api } from '../services/api';
import type { FetchProductsParams, PaginatedResponse, Product } from '../types/product';

const MAX_RETRIES = 3;
const BASE_DELAY = 800; // ms

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
      return result;
    } catch (error) {
      lastError = error as Error;

      // Don't retry on abort
      if (signal?.aborted) throw lastError;

      // Don't retry on last attempt
      if (attempt < MAX_RETRIES) {
        const delay = BASE_DELAY * Math.pow(2, attempt); // 800 → 1600 → 3200
        await wait(delay);
      }
    }
  }

  throw lastError!;
}