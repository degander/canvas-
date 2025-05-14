import { useDispatch } from 'react-redux';
import { reset } from './store/editorSlice';
import Canvas from './components/Canvas';
import ImageAdjustments from './components/ImageAdjustments';
import StencilSelector from './components/StencilSelector';
import FilterSelector from './components/FilterSelector';
import TextEditor from './components/TextEditor';

// Separate component for the navigation bar to use hooks
const Navigation = () => {
  const dispatch = useDispatch();

  return (
    <nav className="bg-gradient-to-r from-[#00C4CC] to-[#4B6FF7] px-4 py-3 flex items-center justify-between">
      <div className="text-white text-2xl font-bold">
        Canva
      </div>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => dispatch(reset())}
          className="px-4 py-2 text-sm font-medium text-white bg-white/20 rounded hover:bg-white/30">
          Reset
        </button>
        <button className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded hover:bg-purple-700">
          Download
        </button>
      </div>
    </nav>
  );
};

function App() {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navigation />
      <div className="flex flex-1 h-[calc(100vh-64px)]">
        {/* Left Sidebar */}
        <div className="w-[300px] bg-white border-r border-gray-200 overflow-y-auto flex-shrink-0">
          <ImageAdjustments />
          <StencilSelector />
          <FilterSelector />
          <TextEditor />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-[#f1f1f1] p-4 overflow-hidden">
          <div className="bg-white rounded-lg w-full h-full flex items-center justify-center shadow-sm">
            <Canvas />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 