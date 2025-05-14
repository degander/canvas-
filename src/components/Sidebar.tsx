import React from 'react';

const Sidebar = () => {
  const tools = [
    { id: 'ai', icon: '🤖', label: 'AI Tools' },
    { id: 'adjust', icon: '⚙️', label: 'Adjust' },
    { id: 'effects', icon: '✨', label: 'Effects' },
    { id: 'beauty', icon: '💄', label: 'Beauty' },
    { id: 'frames', icon: '🖼️', label: 'Frames' },
    { id: 'text', icon: '📝', label: 'Text' },
    { id: 'elements', icon: '🔲', label: 'Elements' },
    { id: 'uploads', icon: '📤', label: 'Uploads' },
    { id: 'apps', icon: '📱', label: 'Apps' }
  ];

  return (
    <div className="h-full py-2">
      <div className="space-y-4">
        {tools.map((tool) => (
          <button
            key={tool.id}
            className="w-full px-2 py-3 flex flex-col items-center gap-1 text-gray-400 hover:text-white hover:bg-[#3a3a3a] transition-colors"
            title={tool.label}
          >
            <span className="text-xl">{tool.icon}</span>
            <span className="text-xs">{tool.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Sidebar; 