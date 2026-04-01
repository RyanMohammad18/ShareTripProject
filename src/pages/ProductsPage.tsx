
import { useProducts } from "../hooks/useProducts";
import { usePrefetchPagination } from "../hooks/usePrefetchPagination";
import { useUrlParams } from "../hooks/useUrlParams";
import { fetchProductsWithRetry } from "../api/resilientClient";
import { useToast } from "../lib/toastStore";

import { EmptyMessage } from "../components/molecules/EmptyMessage";
import ToastContainer from "../components/molecules/ToastContainer";

import {
  ToolbarSkeleton,
  PaginationSkeleton,
  ProductGridSkeleton,
} from "../components/molecules/SkeletonLoading";

import ProductToolbar from "../components/organisms/ProductToolbar";
import ProductGrid from "../components/organisms/ProductGrid";
import { Pagination } from "../components/organisms/Pagination";
import PageWrapper from "../components/atoms/PageWrapper/PageWrapper";
import Container from "../components/atoms/containers/Container";
import PageHeader from "../components/molecules/PageHeader";
import Section from "../components/atoms/section/Section";
import ProgressBar from "../components/atoms/Progressbar/ProgressBar";
import { useRef } from "react";

const LIMIT = 12;

const ProductsPage = () => {
  const [urlParams, setUrlParams] = useUrlParams({
    page: "number",
    category: "string",
    search: "string",
  });

  const page = urlParams.page || 1;
  const category = urlParams.category || "";
  const search = urlParams.search || "";

  const query = useProducts({ page, limit: LIMIT, category, search });
  const { toasts, dismiss } = useToast();

  const { prefetchPage } = usePrefetchPagination({
    queryKey: "products",
    params: { page, limit: LIMIT, category, search },
    totalPages: query.data?.totalPages ?? 0,
    fetchFn: fetchProductsWithRetry,
  });

  const lastFiltersRef = useRef({ category, search });

  const isInitialLoad = query.isLoading && !query.data;
  const isFilterChange = query.isFetching && (
    category !== lastFiltersRef.current.category || search !== lastFiltersRef.current.search
  );
  const showSkeleton = isInitialLoad || isFilterChange;
  
  if (!query.isFetching) {
    lastFiltersRef.current = { category, search };
  }

  return (
    <>
      <ToastContainer toasts={toasts} onDismiss={dismiss} />

      <PageWrapper>
        <Container>
          <PageHeader
            badge="Curated Collection"
            title="Premium Products"
            subtitle="Browse a polished product experience with search, filtering, pagination, and graceful handling of slow and flaky API responses."
          />

          {isInitialLoad ? (
            <ToolbarSkeleton />
          ) : (
            <ProductToolbar
              search={search}
              category={category}
              onSearchChange={(value) => setUrlParams({ search: value, page: 1 })}
              onCategoryChange={(value) => setUrlParams({ category: value, page: 1 })}
            />
          )}

          <Section as="main" className="mt-8 relative">
            {showSkeleton && (
              <>
                <ProductGridSkeleton count={LIMIT} />
                <PaginationSkeleton />
              </>
            )}

            {query.data && !showSkeleton && (
              <>
                {query.isPlaceholderData && <ProgressBar color="primary" />}

                {query.data.data.length === 0 ? (
                  <EmptyMessage />
                ) : (
                  <>
                    <ProductGrid products={query.data.data} />

                    <Pagination
                      page={query.data.page}
                      totalPages={query.data.totalPages}
                      onPageChange={(p) => setUrlParams({ page: p })}
                      onPrefetch={prefetchPage}
                      disabled={query.isFetching}
                    />
                  </>
                )}
              </>
            )}
          </Section>
        </Container>
      </PageWrapper>
    </>
  );
};

export default ProductsPage;