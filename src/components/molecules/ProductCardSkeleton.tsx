export function ProductCardSkeleton() {
    return (
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
        {/* Image placeholder — same aspect ratio as real card */}
        <div className="aspect-[4/3] bg-gray-200" />
  
        {/* Content placeholder */}
        <div className="p-4">
          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-3/4" />
  
          {/* Description line 1 */}
          <div className="h-3 bg-gray-200 rounded w-full mt-2" />
  
          {/* Description line 2 */}
          <div className="h-3 bg-gray-200 rounded w-2/3 mt-1" />
  
          {/* Price + stock row */}
          <div className="flex items-center justify-between mt-3">
            <div className="h-5 bg-gray-200 rounded w-16" />
            <div className="h-4 bg-gray-200 rounded w-20" />
          </div>
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse">
            <div className="aspect-[4/3] bg-gray-200" />
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4" />
              <div className="h-3 bg-gray-200 rounded w-full mt-2" />
              <div className="h-3 bg-gray-200 rounded w-2/3 mt-1" />
              <div className="flex items-center justify-between mt-3">
                <div className="h-5 bg-gray-200 rounded w-16" />
                <div className="h-4 bg-gray-200 rounded w-20" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }