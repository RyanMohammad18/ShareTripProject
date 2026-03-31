// components/atoms/Layout/PageWrapper.tsx
import type { HTMLAttributes, ReactNode } from 'react';

interface PageWrapperProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const PageWrapper = ({ children, className = '', ...props }: PageWrapperProps) => {
  return (
    <div
      {...props}
      className={`min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 text-gray-900 ${className}`}
    >
      {children}
    </div>
  );
};

export default PageWrapper;