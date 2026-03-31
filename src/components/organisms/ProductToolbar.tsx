
import { useState, useRef, useCallback } from "react";
import { Select } from "../atoms/Select/Select";
import Label from "../atoms/Typography/Label";
import FlexContainer from "../atoms/containers/FlexContainer";
import { SearchInput } from "../molecules/SearchInput";

const CATEGORIES = ['All Categories', 'Electronics', 'Clothing', 'Home', 'Outdoors'];

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
  const [searchInput, setSearchInput] = useState(search);
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null);

  const handleSearchChange = useCallback((value: string) => {
    setSearchInput(value);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => onSearchChange(value), 400);
  }, [onSearchChange]);

  return (
    <FlexContainer
      direction="col"
      gap={16}
      className="mt-8 lg:flex-row lg:items-end lg:justify-between"
    >
      <FlexContainer direction="col" gap={8} className="w-full">
        <Label className="text-gray-500">Search</Label>
        <SearchInput value={searchInput} onChange={handleSearchChange} />
      </FlexContainer>

      <FlexContainer direction="col" gap={8} className="w-full lg:w-auto">
        <Label className="text-gray-500">Category</Label>
        <Select
          value={category}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="lg:min-w-[220px]"
        >
          {CATEGORIES.map((cat) => (
            <option
              key={cat}
              value={cat === 'All Categories' ? '' : cat}
              className="bg-white text-gray-900"
            >
              {cat}
            </option>
          ))}
        </Select>
      </FlexContainer>
    </FlexContainer>
  );
};

export default ProductToolbar;