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

  return (
    <FlexContainer align="center" justify="center" gap={8} className="mt-8">
      <Button
        variant="secondary"
        onClick={() => handleClick(page - 1)}
        onMouseEnter={() => page > 1 && onPrefetch?.(page - 1)}
        disabled={disabled || page === 1}
      >
        Previous
      </Button>

      {getPageNumbers().map((pageNum, index) =>
        pageNum === '...' ? (
          <Text key={`ellipsis-${index}`} size={14} color="muted" className="px-2">
            ...
          </Text>
        ) : (
          <Button
            key={pageNum}
            variant={pageNum === page ? 'primary' : 'secondary'}
            onClick={() => handleClick(pageNum)}
            onMouseEnter={() => pageNum !== page && onPrefetch?.(pageNum)}
            disabled={disabled || pageNum === page}
          >
            {pageNum}
          </Button>
        )
      )}

      <Button
        variant="secondary"
        onClick={() => handleClick(page + 1)}
        onMouseEnter={() => page < totalPages && onPrefetch?.(page + 1)}
        disabled={disabled || page === totalPages}
      >
        Next
      </Button>
    </FlexContainer>
  );
}
