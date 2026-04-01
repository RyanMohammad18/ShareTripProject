import FlexContainer from '../atoms/containers/FlexContainer';
import Button from '../atoms/Button/Button';
import Text from '../atoms/Typography/Text';

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
    onPrefetch?.(targetPage, true);
    onPageChange(targetPage);
  };

  const getPageNumbers = (): (number | '...')[] => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const pages: (number | '...')[] = [1, 2, 3, 4];

    const start = Math.max(5, page - 1);
    const end = Math.min(totalPages - 2, page + 1);

    if (start > 5) pages.push('...');

    for (let i = start; i <= end; i++) {
      if (!pages.includes(i)) pages.push(i);
    }

    if (end < totalPages - 2) pages.push('...');

    if (!pages.includes(totalPages - 1)) pages.push(totalPages - 1);
    if (!pages.includes(totalPages)) pages.push(totalPages);

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center sm:gap-2">
      
    
      <div className="flex items-center justify-between w-full px-4 sm:hidden">
        <Button
          variant="secondary"
          onClick={() => handleClick(page - 1)}
          onMouseEnter={() => page > 1 && onPrefetch?.(page - 1)}
          disabled={disabled || page === 1}
          className="h-8 px-3 flex items-center justify-center text-xs whitespace-nowrap"
        >
          ← Prev
        </Button>

        <span className="text-xs text-gray-500">
          {page} / {totalPages}
        </span>

        <Button
          variant="secondary"
          onClick={() => handleClick(page + 1)}
          onMouseEnter={() => page < totalPages && onPrefetch?.(page + 1)}
          disabled={disabled || page === totalPages}
          className="h-8 px-3 flex items-center justify-center text-xs whitespace-nowrap"
        >
          Next →
        </Button>
      </div>

 
      <div className="flex items-center justify-center gap-1 flex-wrap sm:hidden">
        {pageNumbers.map((pageNum, index) =>
          pageNum === '...' ? (
            <Text
              key={`ellipsis-${index}`}
              size={14}
              color="muted"
              className="w-8 h-8 flex items-center justify-center"
            >
              ...
            </Text>
          ) : (
            <Button
              key={pageNum}
              variant={pageNum === page ? 'primary' : 'secondary'}
              onClick={() => {
                if (typeof pageNum === 'number') handleClick(pageNum);
              }}
              onMouseEnter={() => {
                if (typeof pageNum === 'number' && pageNum !== page) onPrefetch?.(pageNum);
              }}
              disabled={disabled || pageNum === page}
              className="w-8 h-8 flex items-center justify-center shrink-0 p-0 text-xs"
            >
              {pageNum}
            </Button>
          )
        )}
      </div>

  
      <div className="hidden sm:flex items-center justify-center gap-2">
        <Button
          variant="secondary"
          onClick={() => handleClick(page - 1)}
          onMouseEnter={() => page > 1 && onPrefetch?.(page - 1)}
          disabled={disabled || page === 1}
          className="h-10 px-3 flex items-center justify-center text-sm whitespace-nowrap"
        >
          Previous
        </Button>

        <div className="flex items-center justify-center gap-2">
          {pageNumbers.map((pageNum, index) =>
            pageNum === '...' ? (
              <Text
                key={`ellipsis-${index}`}
                size={14}
                color="muted"
                className="w-10 h-10 flex items-center justify-center"
              >
                ...
              </Text>
            ) : (
              <Button
                key={pageNum}
                variant={pageNum === page ? 'primary' : 'secondary'}
                onClick={() => {
                  if (typeof pageNum === 'number') handleClick(pageNum);
                }}
                onMouseEnter={() => {
                  if (typeof pageNum === 'number' && pageNum !== page) onPrefetch?.(pageNum);
                }}
                disabled={disabled || pageNum === page}
                className="w-10 h-10 flex items-center justify-center shrink-0 p-0 text-sm"
              >
                {pageNum}
              </Button>
            )
          )}
        </div>

        <Button
          variant="secondary"
          onClick={() => handleClick(page + 1)}
          onMouseEnter={() => page < totalPages && onPrefetch?.(page + 1)}
          disabled={disabled || page === totalPages}
          className="h-10 px-3 flex items-center justify-center text-sm whitespace-nowrap"
        >
          Next
        </Button>
      </div>

    </div>
  );
}