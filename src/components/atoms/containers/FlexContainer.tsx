// components/atoms/containers/FlexContainer.tsx
import type { HTMLAttributes, ReactNode } from 'react';

interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode;
  direction?: 'row' | 'col' | 'row-reverse' | 'col-reverse';
  wrap?: 'wrap' | 'nowrap' | 'wrap-reverse';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  align?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';
  gap?: number;
  padding?: number;
  height?: number | string;
  width?: number | string;
  className?: string;
}

const directionMap = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
} as const;

const justifyMap = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
} as const;

const alignMap = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
} as const;

const wrapMap = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
} as const;

const FlexContainer = ({
  children,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  align = 'start',
  gap,
  padding,
  height,
  width,
  className = '',
  style,
  ...props
}: FlexContainerProps) => {
  return (
    <div
      {...props}
      className={`flex ${directionMap[direction]} ${wrapMap[wrap]} ${justifyMap[justify]} ${alignMap[align]} ${className}`}
      style={{ gap, padding, height, width, ...style }}
    >
      {children}
    </div>
  );
};

export default FlexContainer;