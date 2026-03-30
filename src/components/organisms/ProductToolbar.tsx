// components/organisms/ProductToolbar.tsx

import { Select } from "../atoms/Select/Select";
import Label from "../atoms/Typography/Label";
import FlexContainer from "../atoms/containers/FlexContainer";
import { SearchInput } from "../molecules/SearchInput";


interface ProductToolbarProps {
  search: string;
  category: string;
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
}

const ProductToolbar = ({
  search,
  category,
  onSearchChange,
  onCategoryChange,
}: ProductToolbarProps) => {
  return (
    <FlexContainer
      direction="col"
      gap={16}
      className="mt-8 lg:flex-row lg:items-end lg:justify-between"
    >
      <div className="w-full">
        <Label className="mb-2 inline-block text-gray-500">Search</Label>
        <SearchInput value={search} onChange={onSearchChange} />
      </div>

      <div className="w-full lg:w-auto">
        <Label className="mb-2 inline-block text-gray-500">Category</Label>
        <Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="lg:min-w-[220px]"
        >
          <option value="" className="bg-white text-gray-900">All Categories</option>
          <option value="Electronics" className="bg-white text-gray-900">Electronics</option>
          <option value="Clothing" className="bg-white text-gray-900">Clothing</option>
          <option value="Home" className="bg-white text-gray-900">Home</option>
          <option value="Outdoors" className="bg-white text-gray-900">Outdoors</option>
        </Select>
      </div>
    </FlexContainer>
  );
};

export default ProductToolbar;