
import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'link';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-indigo-600 text-white hover:bg-indigo-700 rounded-xl px-4 py-2',
  secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-xl px-4 py-2',
  ghost: 'bg-transparent text-gray-600 hover:text-gray-900',
  link: 'underline font-medium hover:text-amber-900',
};

const Button = ({
  children,
  variant = 'primary',
  className = '',
  ...props
}: ButtonProps) => {
  return (
    <button
      {...props}
      className={`text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${variantClasses[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;