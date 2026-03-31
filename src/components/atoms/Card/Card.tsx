
import type { HTMLAttributes, ReactNode } from 'react';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  width?: number | string;
  height?: number | string;
  radius?: number;
  gap?: number;
  className?: string;
}

const Card = ({
  children,
  width,
  height,
  radius = 8,
  gap = 2,
  className = '',
  style,
  ...props
}: CardProps) => {
  return (
    <div
      {...props}
      className={`overflow-hidden ${className}`}
      style={{
        width,
        height,
        borderRadius: radius,
        gap,
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      {children}
    </div>
  );
};

export default Card;