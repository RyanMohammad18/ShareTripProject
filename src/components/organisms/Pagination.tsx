// components/organisms/Pagination.tsx
interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    onPrefetch?: (page: number, prefetchNext?: boolean) => void;
    disabled?: boolean;
  }
  
  export function Pagination({
    page,
    totalPages,
    onPageChange,
    onPrefetch,
    disabled = false,
  }: PaginationProps) {
    if (totalPages <= 1) return null;
  
    const handleClick = (targetPage: number) => {
      onPrefetch?.(targetPage, true);  // prefetch target + next
      onPageChange(targetPage);
    };
  
    const getPageNumbers = (): (number | '...')[] => {
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
    
      const pages: (number | '...')[] = [1];
    
      const start = Math.max(2, page - 1);
      const end = Math.min(totalPages - 1, page + 1);
    
      if (start > 2) pages.push('...');
    
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    
      if (end < totalPages - 1) pages.push('...');
    
      pages.push(totalPages);
    
      return pages;
    };
  
    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => handleClick(page - 1)}
          onMouseEnter={() => page > 1 && onPrefetch?.(page - 1)}
          disabled={disabled || page === 1}
          className="px-3 py-2 rounded-lg text-sm font-medium
                     bg-gray-100 text-gray-700 hover:bg-gray-200
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Previous
        </button>
  
        {getPageNumbers().map((pageNum, index) =>
          pageNum === '...' ? (
            <span key={`ellipsis-${index}`} className="px-2 text-gray-400">
              ...
            </span>
          ) : (
            <button
              key={pageNum}
              onClick={() => handleClick(pageNum)}
              onMouseEnter={() => pageNum !== page && onPrefetch?.(pageNum)}
              disabled={disabled || pageNum === page}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors
                ${pageNum === page
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }
                disabled:cursor-not-allowed`}
            >
              {pageNum}
            </button>
          )
        )}
  
        <button
          onClick={() => handleClick(page + 1)}
          onMouseEnter={() => page < totalPages && onPrefetch?.(page + 1)}
          disabled={disabled || page === totalPages}
          className="px-3 py-2 rounded-lg text-sm font-medium
                     bg-gray-100 text-gray-700 hover:bg-gray-200
                     disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    );
  }