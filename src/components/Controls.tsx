import { useDispatch, useSelector } from 'react-redux';
import { setZoom, setPosition, undo, reset } from '../store/editorSlice';
import { RootState } from '../store';

const Controls = () => {
  const dispatch = useDispatch();
  const { zoom, position } = useSelector((state: RootState) => state.editor);

  const handleZoomChange = (newZoom: number) => {
    dispatch(setZoom(Math.max(0.1, Math.min(3, newZoom))));
  };

  const handlePositionChange = (x: number, y: number) => {
    dispatch(setPosition({ x, y }));
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <label className="text-sm text-gray-400">Zoom Level</label>
          <span className="text-sm text-blue-400">
            {(zoom * 100).toFixed(0)}%
          </span>
        </div>
        <input
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          value={zoom}
          onChange={(e) => handleZoomChange(parseFloat(e.target.value))}
          className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 
            [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-blue-500 
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:transition-all [&::-webkit-slider-thumb]:duration-150
            [&::-webkit-slider-thumb]:hover:bg-blue-400 [&::-webkit-slider-thumb]:hover:scale-125"
        />
      </div>

      <div className="space-y-3">
        <label className="text-sm text-gray-400">Position Controls</label>
        <div className="flex flex-col items-center gap-2">
          <button
            onClick={() => handlePositionChange(position.x, position.y - 10)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#3a3a3a] 
              text-gray-300 hover:bg-[#4a4a4a] hover:text-white transition-colors"
          >
            ↑
          </button>
          <div className="flex gap-2">
            <button
              onClick={() => handlePositionChange(position.x - 10, position.y)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#3a3a3a] 
                text-gray-300 hover:bg-[#4a4a4a] hover:text-white transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => handlePositionChange(position.x + 10, position.y)}
              className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#3a3a3a] 
                text-gray-300 hover:bg-[#4a4a4a] hover:text-white transition-colors"
            >
              →
            </button>
          </div>
          <button
            onClick={() => handlePositionChange(position.x, position.y + 10)}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#3a3a3a] 
              text-gray-300 hover:bg-[#4a4a4a] hover:text-white transition-colors"
          >
            ↓
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-2">
        <button
          onClick={() => dispatch(undo())}
          className="px-4 py-2 rounded-lg bg-[#3a3a3a] text-gray-300 
            hover:bg-[#4a4a4a] hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
              d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
          </svg>
          Undo
        </button>
        <button
          onClick={() => dispatch(reset())}
          className="px-4 py-2 rounded-lg bg-red-500/20 text-red-400 
            hover:bg-red-500/30 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Controls; 