import type { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
}

export const Card = ({ children, className = '' }: CardProps) => {
  return (
    <div
      className={`rounded-[28px] border border-gray-200 bg-white/95 shadow-[0_16px_40px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-500 ${className}`}
    >
      {children}
    </div>
  );
};