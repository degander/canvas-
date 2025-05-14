import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setAdjustment } from '../store/editorSlice';

interface Section {
  id: string;
  label: string;
  icon: JSX.Element;
}

const sections: Section[] = [
  {
    id: 'adjust',
    label: 'Adjust',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
    )
  },
  {
    id: 'crop',
    label: 'Crop',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
      </svg>
    )
  }
];

const adjustmentControls = [
  {
    id: 'brightness',
    label: 'Brightness',
    min: -100,
    max: 100,
    step: 1
  },
  {
    id: 'contrast',
    label: 'Contrast',
    min: -100,
    max: 100,
    step: 1
  },
  { id: 'highlights', label: 'Highlights', min: -100, max: 100 },
  { id: 'shadows', label: 'Shadows', min: -100, max: 100 }
];

const ImageAdjustments = () => {
  const dispatch = useDispatch();
  const adjustments = useSelector((state: RootState) => state.editor.adjustments);
  const [activeSection, setActiveSection] = useState<string | null>('adjust');

  const handleAdjustmentChange = (type: keyof typeof adjustments, value: number) => {
    dispatch(setAdjustment({ type, value }));
  };

  const toggleSection = (sectionId: string) => {
    setActiveSection(activeSection === sectionId ? null : sectionId);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Image</h2>
      
      {/* Sections */}
      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="border rounded-lg overflow-hidden">
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-4 py-3 flex items-center justify-between bg-white hover:bg-gray-50"
            >
              <div className="flex items-center gap-3">
                {section.icon}
                <span className="text-sm font-medium text-gray-700">{section.label}</span>
              </div>
              <svg
                className={`w-5 h-5 text-gray-400 transition-transform ${
                  activeSection === section.id ? 'transform rotate-180' : ''
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Section Content */}
            {activeSection === section.id && (
              <div className="p-4 border-t bg-gray-50">
                {section.id === 'adjust' && (
                  <div className="space-y-6">
                    {adjustmentControls.map((control) => (
                      <div key={control.id} className="space-y-3">
                        <div className="flex items-center justify-between">
                          <label className="text-sm text-gray-600">{control.label}</label>
                          <span className="text-sm text-blue-500">
                            {adjustments[control.id as keyof typeof adjustments]}
                          </span>
                        </div>
                        <div className="relative">
                          <input
                            type="range"
                            min={control.min}
                            max={control.max}
                            step={control.step}
                            value={adjustments[control.id as keyof typeof adjustments]}
                            onChange={(e) => handleAdjustmentChange(control.id as keyof typeof adjustments, Number(e.target.value))}
                            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer
                              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
                              [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-500 
                              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
                              [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
                              [&::-webkit-slider-thumb]:hover:bg-blue-400 [&::-webkit-slider-thumb]:hover:scale-125"
                          />
                          <div
                            className="absolute w-4 h-4 bg-white border-2 border-blue-500 rounded-full transform -translate-x-1/2"
                            style={{
                              left: `${((adjustments[control.id as keyof typeof adjustments] - control.min) / (control.max - control.min)) * 100}%`,
                              top: '-4px'
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {section.id === 'crop' && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-50">
                        Original
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-50">
                        1:1
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-50">
                        4:3
                      </button>
                      <button className="px-3 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-50">
                        16:9
                      </button>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded hover:bg-gray-50">
                        Reset
                      </button>
                      <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700">
                        Apply
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageAdjustments; 