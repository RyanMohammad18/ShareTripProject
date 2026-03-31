import type { HTMLAttributes, ReactNode } from 'react';
import { colors, type ColorKey } from '../../../constants/colors';

type TextLineHeight = 'tight' | 'normal' | 'relaxed' | 'loose';
type ParagraphSpacing = 'none' | 'sm' | 'md' | 'lg';

interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  size?: number;
  weight?: number;
  lineHeight?: TextLineHeight;
  color?: ColorKey;
  ParagraphSpacing?: ParagraphSpacing;
  className?: string;
}

const lineHeightMap: Record<TextLineHeight, string> = {
  tight: '1.25',
  normal: '1.375',
  relaxed: '1.5',
  loose: '1.75',
};

const spacingMap: Record<ParagraphSpacing, number> = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 16,
};

const Text = ({
  children,
  size = 14,
  weight = 400,
  lineHeight = 'tight',
  color = 'dark',
  ParagraphSpacing = 'none',
  className = '',
  style,
  ...props
}: TextProps) => {
  return (
    <p
      {...props}
      className={`font-murecho m-0 ${className}`}
      style={{
        fontSize: size,
        fontWeight: weight,
        lineHeight: lineHeightMap[lineHeight],
        color: colors[color],
        marginBottom: spacingMap[ParagraphSpacing],
        ...style,
      }}
    >
      {children}
    </p>
  );
};

export default Text;