// components/organisms/Pagination.tsx

interface PaginationProps {
    page: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    disabled?: boolean;
  }
  
  export function Pagination({ page, totalPages, onPageChange, disabled = false }: PaginationProps) {
    if (totalPages <= 1) return null;
  
    const getPageNumbers = (): (number | '...')[] => {
      // Show all pages if small enough
      if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
      }
  
      const pages: (number | '...')[] = [];
  
      // Always show first 4 or pages around current (whichever is larger)
      const leftEnd = Math.max(4, page + 1);
      for (let i = 1; i <= Math.min(leftEnd, totalPages - 2); i++) {
        pages.push(i);
      }
  
      // Add ellipsis if there's a gap
      if (leftEnd < totalPages - 2) {
        pages.push('...');
      }
  
      // Always show last 2 pages
      const rightStart = Math.max(totalPages - 1, leftEnd + 1);
      for (let i = rightStart; i <= totalPages; i++) {
        if (!pages.includes(i)) {
          pages.push(i);
        }
      }
  
      return pages;
    };
  
    return (
      <div className="flex items-center justify-center gap-2 mt-8">
        <button
          onClick={() => onPageChange(page - 1)}
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
              onClick={() => onPageChange(pageNum)}
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
          onClick={() => onPageChange(page + 1)}
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
