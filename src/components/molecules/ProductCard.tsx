
import Card from "../atoms/Card/Card";
import CardImage from "../atoms/CardImage/CardImage";
import FlexContainer from "../atoms/containers/FlexContainer";
import Text from "../atoms/Typography/Text";
import type { Product } from "../../types/product";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Card
      width="100%"
      radius={8}
      gap={2}
      className="bg-white border border-gray-200 hover:shadow-md transition-shadow duration-200"
    >
      <CardImage
        src={product.imageUrl}
        alt={product.name}
        height={210}
        borderRadius="6px 6px 4px 4px"
      />

      <FlexContainer direction="col" gap={8} padding={8} className="w-full">
        <Text
          size={14}
          weight={400}
          lineHeight="tight"
          color="secondary"
          ParagraphSpacing="md"
          className="truncate"
        >
          {product.category}
        </Text>

        <Text
          size={16}
          weight={525}
          lineHeight="normal"
          color="dark"
          className="line-clamp-2"
        >
          {product.name}
        </Text>

        <FlexContainer align="center" gap={8} className="mt-auto pt-2">
          <Text size={18} weight={600} lineHeight="loose" color="sky">
          ৳ {product.price.toFixed(2)}
          </Text>
        </FlexContainer>
      </FlexContainer>
    </Card>
  );
};

export default ProductCard;
