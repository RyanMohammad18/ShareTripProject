import type { HTMLAttributes, ReactNode } from 'react';

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const Title = ({ children, className = '', ...props }: TitleProps) => {
  return (
    <h1
      {...props}
      className={`text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl ${className}`}
    >
      {children}
    </h1>
  );
};

export default Title;