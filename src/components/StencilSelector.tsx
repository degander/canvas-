import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setStencil } from '../store/editorSlice';

const stencilCategories = [
  {
    name: 'Basic Shapes',
    items: [
      { id: 'circle', label: 'Circle', path: 'M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0' },
      { id: 'square', label: 'Square', path: 'M0,0 L100,0 L100,100 L0,100 Z' },
      { id: 'hexagon', label: 'Hexagon', path: 'M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z' }
    ]
  },
  {
    name: 'Decorative',
    items: [
      { id: 'heart', label: 'Heart', path: 'M50,30 A20,20 0 0,1 90,30 A20,20 0 0,1 50,70 A20,20 0 0,1 10,30 A20,20 0 0,1 50,30 Z' },
      { id: 'star', label: 'Star', path: 'M50,0 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z' }
    ]
  },
  {
    name: 'Photo Frames',
    items: [
      { id: 'oval', label: 'Oval', path: 'M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50' },
      { id: 'rectangle', label: 'Rectangle', path: 'M10,0 L90,0 L90,100 L10,100 Z' }
    ]
  }
];

// Flatten all stencils for easy lookup
const allStencils = stencilCategories.reduce((acc, category) => {
  category.items.forEach(item => {
    acc[item.id] = item;
  });
  return acc;
}, {} as Record<string, { id: string; label: string; path: string }>);

const StencilSelector = () => {
  const dispatch = useDispatch();
  const selectedStencil = useSelector((state: RootState) => state.editor.stencilId);
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (stencilId: string | null) => {
    console.log(stencilId);
    dispatch(setStencil(stencilId));
    setIsOpen(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Stencil Frame</h2>
      
      {/* Dropdown Button */}
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2 text-left bg-white border rounded-lg shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">
              {selectedStencil ? allStencils[selectedStencil]?.label : 'Select a stencil'}
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
            {/* None option */}
            <button
              onClick={() => handleSelect(null)}
              className={`w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                selectedStencil === null ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
              }`}
            >
              None
            </button>

            {/* Divider */}
            <div className="border-t border-gray-100"></div>

            {/* Categories and their items */}
            {stencilCategories.map((category, categoryIndex) => (
              <div key={category.name}>
                {categoryIndex > 0 && <div className="border-t border-gray-100"></div>}
                <div className="px-4 py-2 text-xs font-semibold text-gray-500 bg-gray-50">
                  {category.name}
                </div>
                {category.items.map((stencil) => (
                  <button
                    key={stencil.id}
                    onClick={() => handleSelect(stencil.id)}
                    className={`w-full px-4 py-2 text-left flex items-center gap-3 hover:bg-gray-50 ${
                      selectedStencil === stencil.id ? 'bg-purple-50 text-purple-700' : 'text-gray-700'
                    }`}
                  >
                    <div className="w-6 h-6">
                      <svg
                        viewBox="0 0 100 100"
                        className={`w-full h-full ${
                          selectedStencil === stencil.id ? 'text-purple-500' : 'text-gray-400'
                        }`}
                      >
                        <path d={stencil.path} fill="currentColor" />
                      </svg>
                    </div>
                    <span className="text-sm">{stencil.label}</span>
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

export default StencilSelector; 