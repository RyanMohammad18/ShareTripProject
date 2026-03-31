// components/organisms/ProductGrid.tsx
import ProductCard from '../molecules/ProductCard';
import GridContainer from '../atoms/containers/GridContainer';
import type { Product } from '../../types/product';

interface ProductGridProps {
  products: Product[];
}

const ProductGrid = ({ products }: ProductGridProps) => {
  return (
    <GridContainer
      columns="repeat(auto-fill, minmax(180px, 1fr))"
      gap={16}
      className="w-full"
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </GridContainer>
  );
};

export default ProductGrid;