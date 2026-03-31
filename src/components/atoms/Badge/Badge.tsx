// components/atoms/Badge/Badge.tsx
import type { HTMLAttributes, ReactNode } from 'react';
import { colors, type ColorKey } from '../../../constants/colors';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  children: ReactNode;
  color?: ColorKey;
  className?: string;
}

const Badge = ({ children, color = 'primary', className = '', ...props }: BadgeProps) => {
  return (
    <span
      {...props}
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${className}`}
      style={{
        color: colors[color],
        borderColor: `${colors[color]}40`,
        backgroundColor: `${colors[color]}10`,
      }}
    >
      {children}
    </span>
  );
};

export default Badge;