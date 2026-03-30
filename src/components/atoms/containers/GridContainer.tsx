import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type JustifyItems = 'start' | 'center' | 'end' | 'stretch';
type AlignItems = 'start' | 'center' | 'end' | 'stretch';

interface GridContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  columns?: string;
  rows?: string;
  gap?: number;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  margin?: number | string;
  bgColor?: string;
  justifyItems?: JustifyItems;
  alignItems?: AlignItems;
  className?: string;
}

const justifyItemsClasses: Record<JustifyItems, string> = {
  start: 'justify-items-start',
  center: 'justify-items-center',
  end: 'justify-items-end',
  stretch: 'justify-items-stretch',
};

const alignItemsClasses: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const GridContainer = ({
  children,
  columns,
  rows,
  gap,
  width,
  height,
  padding,
  margin,
  bgColor,
  justifyItems = 'stretch',
  alignItems = 'stretch',
  className = '',
  style,
  ...props
}: GridContainerProps) => {
  const mergedStyle: CSSProperties = {
    gridTemplateColumns: columns,
    gridTemplateRows: rows,
    gap,
    width,
    height,
    padding,
    margin,
    backgroundColor: bgColor,
    ...style,
  };

  const classes = [
    'grid',
    justifyItemsClasses[justifyItems],
    alignItemsClasses[alignItems],
    className,
  ].join(' ');

  return (
    <div {...props} className={classes} style={mergedStyle}>
      {children}
    </div>
  );
};

export default GridContainer;