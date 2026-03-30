import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';

type FlexDirection = 'row' | 'col' | 'row-reverse' | 'col-reverse';
type FlexWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
type JustifyContent =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';
type AlignItems = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

interface FlexContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  direction?: FlexDirection;
  wrap?: FlexWrap;
  justify?: JustifyContent;
  align?: AlignItems;
  gap?: number;
  width?: number | string;
  height?: number | string;
  padding?: number | string;
  margin?: number | string;
  bgColor?: string;
  flex?: number | string;
  className?: string;
}

const directionClasses: Record<FlexDirection, string> = {
  row: 'flex-row',
  col: 'flex-col',
  'row-reverse': 'flex-row-reverse',
  'col-reverse': 'flex-col-reverse',
};

const wrapClasses: Record<FlexWrap, string> = {
  wrap: 'flex-wrap',
  nowrap: 'flex-nowrap',
  'wrap-reverse': 'flex-wrap-reverse',
};

const justifyClasses: Record<JustifyContent, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

const alignClasses: Record<AlignItems, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

const FlexContainer = ({
  children,
  direction = 'row',
  wrap = 'nowrap',
  justify = 'start',
  align = 'start',
  gap,
  width,
  height,
  padding,
  margin,
  bgColor,
  flex,
  className = '',
  style,
  ...props
}: FlexContainerProps) => {
  const mergedStyle: CSSProperties = {
    gap,
    width,
    height,
    padding,
    margin,
    backgroundColor: bgColor,
    flex,
    ...style,
  };

  const classes = [
    'flex',
    directionClasses[direction],
    wrapClasses[wrap],
    justifyClasses[justify],
    alignClasses[align],
    className,
  ].join(' ');

  return (
    <div {...props} className={classes} style={mergedStyle}>
      {children}
    </div>
  );
};

export default FlexContainer;