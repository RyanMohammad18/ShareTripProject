import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

interface RelativeContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  margin?: number | string;
  bgColor?: string;
  overflow?: CSSProperties['overflow'];
  className?: string;
}

const RelativeContainer = ({
  children,
  width,
  height,
  padding,
  margin,
  bgColor,
  overflow,
  className = '',
  style,
  ...props
}: RelativeContainerProps) => {
  const mergedStyle: CSSProperties = {
    width,
    height,
    padding,
    margin,
    backgroundColor: bgColor,
    overflow,
    ...style,
  };

  return (
    <div
      {...props}
      className={`relative ${className}`}
      style={mergedStyle}
    >
      {children}
    </div>
  );
};

export default RelativeContainer;