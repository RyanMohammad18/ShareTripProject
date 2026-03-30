// components/organisms/FilterBar.tsx
import { useState, useEffect } from 'react';

const CATEGORIES = ['All', 'Electronics', 'Clothing', 'Home', 'Outdoors'];

interface FilterBarProps {
  category?: string;
  search?: string;
  onFilterChange: (filters: { category?: string; search?: string }) => void;
}

export function FilterBar({ category, search, onFilterChange }: FilterBarProps) {
  const [searchInput, setSearchInput] = useState(search || '');

  // Debounce search — don't fire API on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange({ search: searchInput || undefined });
    }, 400);

    return () => clearTimeout(timer);
  }, [searchInput]);

  const handleCategoryChange = (cat: string) => {
    onFilterChange({
      category: cat === 'All' ? undefined : cat,
    });
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Search input */}
      <div className="flex-1">
        <input
          type="text"
          placeholder="Search products..."
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Category buttons */}
      <div className="flex gap-2 flex-wrap">
        {CATEGORIES.map((cat) => {
          const isActive =
            cat === 'All' ? !category : category === cat;

          return (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${isActive
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
            >
              {cat}
            </button>
          );
        })}
      </div>
    </div>
  );
}