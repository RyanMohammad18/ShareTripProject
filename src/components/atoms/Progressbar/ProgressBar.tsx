// components/atoms/ProgressBar/ProgressBar.tsx
import type { HTMLAttributes } from 'react';
import { colors, type ColorKey } from '../../../constants/colors';

interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  color?: ColorKey;
  className?: string;
}

const ProgressBar = ({ color = 'primary', className = '', ...props }: ProgressBarProps) => {
  return (
    <div
      {...props}
      className={`absolute top-0 left-0 right-0 h-1 animate-pulse rounded z-10 ${className}`}
      style={{ backgroundColor: colors[color] }}
    />
  );
};

export default ProgressBar;