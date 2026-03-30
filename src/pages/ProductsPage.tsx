// pages/ProductsPage.tsx
import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import Title from "../components/atoms/Typography/Title";
import { ErrorMessage } from "../components/molecules/ErrorMessage";
import { EmptyMessage } from "../components/molecules/EmptyMessage";

import {
  ToolbarSkeleton,
  PaginationSkeleton,
  ProductGridSkeleton,
} from "../components/molecules/ProductCardSkeleton";

import ProductToolbar from "../components/organisms/ProductToolbar";
import ProductGrid from "../components/organisms/ProductGrid";
import { Pagination } from "../components/organisms/Pagination";

const ProductsPage = () => {
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [category, setCategory] = useState("");
  const [search, setSearch] = useState("");

  const query = useProducts({ page, limit, category, search });

  // Derived states
  const isInitialLoad = query.isLoading;
  const isTransitioning = query.isFetching && query.isPlaceholderData;
  const showSkeleton = isInitialLoad || isTransitioning;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="relative overflow-hidden rounded-[28px] border border-gray-200/80 bg-white/85 p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] backdrop-blur-xl transition-all duration-500 hover:shadow-[0_24px_80px_rgba(99,102,241,0.10)]">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(99,102,241,0.12),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(56,189,248,0.08),transparent_25%)]" />

          <div className="relative z-10">
            <span className="mb-3 inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold tracking-wide text-indigo-600">
              Curated Collection
            </span>

            <Title>Premium Products</Title>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
              Browse a polished product experience with search, filtering,
              pagination, and graceful handling of slow and flaky API responses.
            </p>
          </div>
        </header>

        {/* Toolbar — skeleton only on very first load, keep interactive otherwise */}
        {isInitialLoad ? (
          <ToolbarSkeleton />
        ) : (
          <ProductToolbar
            search={search}
            category={category}
            onSearchChange={(value) => {
              setPage(1);
              setSearch(value);
            }}
            onCategoryChange={(value) => {
              setPage(1);
              setCategory(value);
            }}
          />
        )}

        <main className="mt-8 relative">
          {/* State 1 & Transitions: Show skeletons for grid + pagination */}
          {showSkeleton && (
            <>
              <ProductGridSkeleton count={limit} />
              <PaginationSkeleton />
            </>
          )}

          {/* State 2: All retries failed, no cached data */}
          {query.isError && !query.data && !query.isLoading && (
            <ErrorMessage
              message={query.error?.message || "Failed to load products"}
              onRetry={() => query.refetch()}
            />
          )}

          {/* State 3 & 4: We have data AND not transitioning */}
          {query.data && !showSkeleton && (
            <>
              {/* Background refetch indicator (silent refetch, not page/filter change) */}
              {query.isFetching && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-indigo-500 animate-pulse rounded" />
              )}

              {/* Background refetch failed — keep showing cached data */}
              {query.isError && (
                <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-sm text-amber-800 flex items-center justify-between">
                  <span>Failed to refresh. Showing cached data.</span>
                  <button
                    onClick={() => query.refetch()}
                    className="ml-3 underline font-medium hover:text-amber-900"
                  >
                    Try again
                  </button>
                </div>
              )}

              {query.data.data.length === 0 ? (
                <EmptyMessage />
              ) : (
                <>
                  <ProductGrid products={query.data.data} />

                  <Pagination
                    page={query.data.page}
                    totalPages={query.data.totalPages}
                    onPageChange={(page) => setPage(page)}
                    disabled={query.isFetching}
                  />
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default ProductsPage;