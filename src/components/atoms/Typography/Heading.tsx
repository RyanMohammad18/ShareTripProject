import type { HTMLAttributes, ReactNode } from 'react';

interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

const Heading = ({ children, className = '', ...props }: HeadingProps) => {
  return (
    <h2 {...props} className={`text-xl font-semibold text-gray-900 ${className}`}>
      {children}
    </h2>
  );
};

export default Heading;