// components/atoms/containers/GridContainer.tsx
import type { HTMLAttributes, ReactNode } from 'react';

interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns?: string;
  rows?: string;
  gap?: number;
  padding?: number;
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';
  alignItems?: 'start' | 'center' | 'end' | 'stretch';
  className?: string;
}

const justifyItemsMap = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
  stretch: 'justify-items-stretch',
} as const;

const alignItemsMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
} as const;

const GridContainer = ({
  children,
  columns,
  rows,
  gap,
  padding,
  justifyItems = 'stretch',
  alignItems = 'stretch',
  className = '',
  style,
  ...props
}: GridContainerProps) => {
  return (
    <div
      {...props}
      className={`grid ${justifyItemsMap[justifyItems]} ${alignItemsMap[alignItems]} ${className}`}
      style={{ gridTemplateColumns: columns, gridTemplateRows: rows, gap, padding, ...style }}
    >
      {children}
    </div>
  );
};

export default GridContainer;