import { Search } from 'lucide-react';
import { Input } from '../atoms/Input/Input';
import FlexContainer from '../atoms/containers/FlexContainer';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {
  return (
    <FlexContainer
      align="center"
      className="group w-full max-w-xl rounded-2xl border border-gray-200 bg-white/90 px-4 py-3 shadow-[0_10px_30px_rgba(15,23,42,0.06)] backdrop-blur-md transition-all duration-300 hover:border-indigo-200 hover:shadow-[0_14px_35px_rgba(99,102,241,0.10)] focus-within:border-indigo-400 focus-within:shadow-[0_14px_35px_rgba(99,102,241,0.14)]"
    >
      <Search
        size={18}
        className="mr-3 text-gray-400 transition-colors duration-300 group-focus-within:text-indigo-500"
      />
      <Input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </FlexContainer>
  );
};