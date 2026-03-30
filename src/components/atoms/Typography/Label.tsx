import type { HTMLAttributes, ReactNode } from 'react';

interface LabelProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
}

const Label = ({ children, className = '', ...props }: LabelProps) => {
  return (
    <span
      {...props}
      className={`text-xs font-medium uppercase tracking-wide text-gray-400 ${className}`}
    >
      {children}
    </span>
  );
};

export default Label;