
import type { ImgHTMLAttributes } from 'react';

interface CardImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  height?: number;
  borderRadius?: string;
  className?: string;
}

const CardImage = ({
  src,
  alt,
  height = 210,
  borderRadius = '6px 6px 4px 4px',
  className = '',
  style,
  ...props
}: CardImageProps) => {
  return (
    <img
      {...props}
      src={src}
      alt={alt}
      loading="lazy"
      className={`w-full object-cover ${className}`}
      style={{
        height,
        borderRadius,
        ...style,
      }}
    />
  );
};

export default CardImage;