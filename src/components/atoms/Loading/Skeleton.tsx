interface SkeletonProps {
    width?: number | string;
    height?: number | string;
    radius?: number | string;
    className?: string;
  }
  
  const Skeleton = ({
    width = '100%',
    height = 20,
    radius = 8,
    className = '',
  }: SkeletonProps) => {
    return (
      <div
        className={`bg-gray-200 animate-pulse ${className}`}
        style={{ width, height, borderRadius: radius }}
      />
    );
  };
  
  export default Skeleton;