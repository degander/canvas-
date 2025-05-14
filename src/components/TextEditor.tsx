import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addText } from '../store/editorSlice';

const fontFamilies = [
  { id: 'arial', label: 'Arial', value: 'Arial, sans-serif' },
  { id: 'times', label: 'Times New Roman', value: 'Times New Roman, serif' },
  { id: 'georgia', label: 'Georgia', value: 'Georgia, serif' },
  { id: 'verdana', label: 'Verdana', value: 'Verdana, sans-serif' },
  { id: 'montserrat', label: 'Montserrat', value: 'Montserrat, sans-serif' }
];

const fontSizes = [12, 14, 16, 18, 24, 32, 48, 64, 72];

const TextEditor = () => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState('');
  const [fontFamily, setFontFamily] = useState(fontFamilies[0].id);
  const [fontSize, setFontSize] = useState(24);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);

  const handleAddText = () => {
    if (text.trim()) {
      dispatch(addText({
        text,
        fontFamily: fontFamilies.find(f => f.id === fontFamily)?.value || fontFamilies[0].value,
        fontSize,
        isBold,
        isItalic
      }));
      setText('');
      setIsOpen(false);
    }
  };

  return (
    <div className="p-6 border-t border-gray-200">
      <h2 className="text-xl font-medium text-gray-800 mb-6">Text</h2>

      {/* Add Text Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Add Text
      </button>

      {/* Text Editor Panel */}
      {isOpen && (
        <div className="mt-4 space-y-4">
          {/* Text Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Enter Text
            </label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Type your text here..."
            />
          </div>

          {/* Font Family */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Font
            </label>
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fontFamilies.map((font) => (
                <option key={font.id} value={font.id}>
                  {font.label}
                </option>
              ))}
            </select>
          </div>

          {/* Font Size */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Size
            </label>
            <select
              value={fontSize}
              onChange={(e) => setFontSize(Number(e.target.value))}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {fontSizes.map((size) => (
                <option key={size} value={size}>
                  {size}px
                </option>
              ))}
            </select>
          </div>

          {/* Style Controls */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsBold(!isBold)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
                isBold
                  ? 'bg-purple-100 text-purple-700 border-purple-200'
                  : 'bg-white text-gray-700 border-gray-200'
              } border hover:bg-gray-50`}
            >
              Bold
            </button>
            <button
              onClick={() => setIsItalic(!isItalic)}
              className={`flex-1 px-4 py-2 text-sm font-medium rounded-md ${
                isItalic
                  ? 'bg-purple-100 text-purple-700 border-purple-200'
                  : 'bg-white text-gray-700 border-gray-200'
              } border hover:bg-gray-50`}
            >
              Italic
            </button>
          </div>

          {/* Preview */}
          <div className="p-4 bg-gray-50 rounded-lg">
            <p
              className="text-center break-words"
              style={{
                fontFamily: fontFamilies.find(f => f.id === fontFamily)?.value,
                fontSize: `${fontSize}px`,
                fontWeight: isBold ? 'bold' : 'normal',
                fontStyle: isItalic ? 'italic' : 'normal'
              }}
            >
              {text || 'Preview Text'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={() => setIsOpen(false)}
              className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border rounded-md hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              onClick={handleAddText}
              className="flex-1 px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
              disabled={!text.trim()}
            >
              Add
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TextEditor; 