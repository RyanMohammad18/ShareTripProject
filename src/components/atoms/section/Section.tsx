// components/atoms/Layout/Section.tsx
import type { HTMLAttributes, ReactNode } from 'react';

type SectionTag = 'main' | 'section' | 'header' | 'footer' | 'aside';

interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  as?: SectionTag;
  className?: string;
}

const Section = ({ children, as: Tag = 'section', className = '', ...props }: SectionProps) => {
  return (
    <Tag {...props} className={className}>
      {children}
    </Tag>
  );
};

export default Section;