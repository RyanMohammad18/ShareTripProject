export function ProductCardSkeleton() {
  return (
    <div className="w-full bg-white border border-gray-200 overflow-hidden animate-pulse rounded-lg">
      <div className="bg-gray-200" style={{ height: 210, borderRadius: '6px 6px 4px 4px' }} />
      <div className="p-2 flex flex-col gap-2">
        <div className="h-[20px] w-2/3 bg-gray-200 rounded" />
        <div className="h-[22px] w-full bg-gray-200 rounded" />
        <div className="h-[22px] w-3/4 bg-gray-200 rounded" />
        <div className="mt-auto h-[28px] w-20 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
  // components/molecules/SkeletonLoading.tsx

export function ToolbarSkeleton() {
    return (
      <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between animate-pulse">
        {/* Search input */}
        <div className="w-full">
          <div className="mb-2 h-4 w-14 bg-gray-200 rounded" />
          <div className="h-10 w-full bg-gray-200 rounded-xl" />
        </div>
  
        {/* Category select */}
        <div className="w-full lg:w-auto">
          <div className="mb-2 h-4 w-16 bg-gray-200 rounded" />
          <div className="h-10 w-full lg:min-w-[220px] bg-gray-200 rounded-xl" />
        </div>
      </div>
    );
  }
  
  export function PaginationSkeleton() {
    return (
      <div className="flex items-center justify-center gap-2 mt-8 animate-pulse">
        <div className="h-9 w-20 bg-gray-200 rounded-lg" />
        <div className="h-9 w-9 bg-gray-200 rounded-lg" />
        <div className="h-9 w-9 bg-gray-200 rounded-lg" />
        <div className="h-9 w-9 bg-gray-200 rounded-lg" />
        <div className="h-9 w-9 bg-gray-200 rounded-lg" />
        <div className="px-2 text-gray-300">...</div>
        <div className="h-9 w-9 bg-gray-200 rounded-lg" />
        <div className="h-9 w-9 bg-gray-200 rounded-lg" />
        <div className="h-9 w-16 bg-gray-200 rounded-lg" />
      </div>
    );
  }
  
  export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
    return (
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {Array.from({ length: count }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }