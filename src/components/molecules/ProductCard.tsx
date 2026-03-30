// components/molecules/ProductCard.tsx
import type { Product } from '../../types/product';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const isLowStock = product.stock > 0 && product.stock <= 5;
  const isOutOfStock = product.stock === 0;

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden
                    hover:shadow-md transition-shadow duration-200">
      {/* Image */}
      <div className="relative aspect-[4/3] bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover"
        />
        {/* Category badge */}
        <span className="absolute top-2 left-2 px-2 py-1 bg-white/90 rounded text-xs font-medium text-gray-700">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">
          {product.name}
        </h3>

        <p className="text-gray-500 text-xs mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price + Stock row */}
        <div className="flex items-center justify-between mt-3">
          <span className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </span>

          {isOutOfStock && (
            <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
              Out of stock
            </span>
          )}

          {isLowStock && (
            <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
              Only {product.stock} left
            </span>
          )}

          {!isOutOfStock && !isLowStock && (
            <span className="text-xs text-gray-400">
              {product.stock} in stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}