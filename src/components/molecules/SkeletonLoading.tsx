import Skeleton from '../atoms/Loading/Skeleton';
import FlexContainer from '../atoms/containers/FlexContainer';
import GridContainer from '../atoms/containers/GridContainer';

export function ToolbarSkeleton() {
  return (
    <FlexContainer direction="col" gap={16} className="mt-8 lg:flex-row lg:items-end lg:justify-between">
      <FlexContainer direction="col" gap={8} className="w-full">
        <Skeleton width={56} height={16} />
        <Skeleton height={40} radius={12} />
      </FlexContainer>
      <FlexContainer direction="col" gap={8} className="w-full lg:w-auto">
        <Skeleton width={64} height={16} />
        <Skeleton height={40} radius={12} className="lg:min-w-[220px]" />
      </FlexContainer>
    </FlexContainer>
  );
}

export function ProductCardSkeleton() {
  return (
    <FlexContainer direction="col" gap={2} className="w-full bg-white border border-gray-200 overflow-hidden rounded-lg">
      <Skeleton height={210} radius="6px 6px 4px 4px" />
      <FlexContainer direction="col" gap={8} className="p-2">
        <Skeleton width="66%" height={20} />
        <Skeleton height={22} />
        <Skeleton width="75%" height={22} />
        <Skeleton width={80} height={28} />
      </FlexContainer>
    </FlexContainer>
  );
}

export function ProductGridSkeleton({ count = 12 }: { count?: number }) {
  return (
    <GridContainer
      columns="repeat(auto-fill, minmax(180px, 1fr))"
      gap={16}
      className="w-full"
    >
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </GridContainer>
  );
}

export function PaginationSkeleton() {
  return (
    <FlexContainer align="center" justify="center" gap={8} className="mt-8">
      <Skeleton width={80} height={36} />
      <Skeleton width={36} height={36} />
      <Skeleton width={36} height={36} />
      <Skeleton width={36} height={36} />
      <Skeleton width={36} height={36} />
      <Skeleton width={36} height={36} />
      <Skeleton width={64} height={36} />
    </FlexContainer>
  );
}