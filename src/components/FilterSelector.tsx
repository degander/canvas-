import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFilter } from '../store/editorSlice';

const filterCategories = [
  {
    name: 'Basic',
    items: [
      { id: 'none', label: 'None' },
      { id: 'grayscale', label: 'Grayscale' },
      { id: 'sepia', label: 'Sepia' }
    ]
  },
  {
    name: 'Vintage',
    items: [
      { id: 'vintage1', label: 'Vintage 1' },
      { id: 'vintage2', label: 'Vintage 2' }
    ]
  },
  {
    name: 'Modern',
    items: [
      { id: 'cool', label: 'Cool' },
      { id: 'warm', label: 'Warm' },
      { id: 'sharp', label: 'Sharp' }
    ]
  }
];

// Flatten all filters for easy lookup
const allFilters = filterCategories.reduce((acc, category) => {
  category.items.forEach(item => {
    acc[item.id] = item;
  });
  return acc;
}, {} as Record<string, { id: string; label: string }>);

const FilterSelector = () => {
  const dispatch = useDispatch();
  const selectedFilter = useSelector((state: RootState) => state.editor.filterId);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (filterId: string) => {
    dispatch(setFilter(filterId));
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Filters</h2>
      
      {/* Dropdown Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {selectedFilter ? allFilters[selectedFilter]?.label : 'Select a filter'}
            </span>
            <svg
              className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'transform rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {/* Dropdown Menu */}
        {isOpen && (
          <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg">
            {filterCategories.map((category, categoryIndex) => (
              <div key={category.name}>
                {categoryIndex > 0 && <div className="border-t border-gray-100"></div>}
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                  {category.name}
                </div>
                {category.items.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => handleSelect(filter.id)}
                    className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                      selectedFilter === filter.id ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterSelector; 