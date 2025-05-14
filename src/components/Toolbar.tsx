import React from 'react';

const Toolbar = () => {
  const aiTools = [
    { id: 'upscaler', icon: '🔍', label: 'AI Upscaler' },
    { id: 'eraser', icon: '🧹', label: 'Magic Eraser' },
    { id: 'bgremover', icon: '✂️', label: 'BG Remover' },
    { id: 'video', icon: '🎥', label: 'Image to Video' }
  ];

  return (
    <div className="bg-[#2a2a2a] rounded-lg p-4 shadow-lg">
      <div className="flex items-center gap-8">
        <h3 className="text-sm font-medium text-gray-400">Recommend AI</h3>
        <div className="flex items-center gap-4">
          {aiTools.map((tool) => (
            <button
              key={tool.id}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-[#3a3a3a] transition-colors"
            >
              <span className="text-xl">{tool.icon}</span>
              <span className="text-sm text-gray-300">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Toolbar; 