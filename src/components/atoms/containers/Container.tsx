// components/atoms/Layout/Container.tsx
import type { HTMLAttributes, ReactNode } from 'react';

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Container = ({ children, className = '', ...props }: ContainerProps) => {
  return (
    <div
      {...props}
      className={`mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </div>
  );
};

export default Container;