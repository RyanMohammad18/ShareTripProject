import type { SelectHTMLAttributes, ReactNode } from 'react';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  children: ReactNode;
}

export const Select = ({ children, className = '', ...props }: SelectProps) => {
  return (
    <select
      {...props}
      className={`w-full rounded-2xl border border-gray-200 bg-white/90 px-4 py-3 text-sm text-gray-900 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md outline-none transition-all duration-300 hover:border-indigo-200 hover:shadow-[0_14px_35px_rgba(99,102,241,0.10)] focus:border-indigo-400 focus:shadow-[0_14px_35px_rgba(99,102,241,0.14)] ${className}`}
    >
      {children}
    </select>
  );
};