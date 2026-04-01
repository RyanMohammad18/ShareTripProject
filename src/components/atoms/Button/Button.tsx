import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { colors } from '../../../constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const variantStyles: Record<ButtonVariant, { className: string; style: React.CSSProperties }> = {
  primary: {
    className: 'rounded-xl px-4 py-2',
    style: { backgroundColor: colors.sky, color: colors.black },
  },
  secondary: {
    className: 'rounded-xl px-4 py-2',
    style: { backgroundColor: colors.white, color: colors.dark },
  },
  ghost: {
    className: '',
    style: { backgroundColor: 'transparent', color: colors.secondary },
  },
  link: {
    className: 'underline font-medium',
    style: { color: colors.primary },
  },
};

const Button = ({
  children,
  variant = 'primary',
  className = '',
  style,
  ...props
}: ButtonProps) => {
  const v = variantStyles[variant];

  return (
    <button
      {...props}
      className={`text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${v.className} ${className}`}
      style={{ ...v.style, ...style }}
    >
      {children}
    </button>
  );
};

export default Button;
