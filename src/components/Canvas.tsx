import { useEffect, useRef, useCallback } from 'react';
import { fabric } from 'fabric';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { setPosition, setZoom, setSelectedImage } from '../store/editorSlice';

const stencilPaths = {
  circle: 'M50,0 A50,50 0 1,1 50,100 A50,50 0 1,1 50,0',
  square: 'M0,0 L100,0 L100,100 L0,100 Z',
  heart: 'M50,30 A20,20 0 0,1 90,30 A20,20 0 0,1 50,70 A20,20 0 0,1 10,30 A20,20 0 0,1 50,30 Z',
  star: 'M50,0 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z',
  hexagon: 'M50,0 L93.3,25 L93.3,75 L50,100 L6.7,75 L6.7,25 Z',
  oval: 'M10,50 A40,25 0 1,1 90,50 A40,25 0 1,1 10,50',
  rectangle: 'M10,0 L90,0 L90,100 L10,100 Z'
};

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  
  const { 
    selectedImage, 
    zoom, 
    position, 
    stencilId, 
    stencilScale, 
    stencilRotation, 
    filterId, 
    adjustments,
    cropSettings 
  } = useSelector((state: RootState) => state.editor);

  const handleFileUpload = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) {
      alert('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        dispatch(setSelectedImage(e.target.result as string));
      }
    };
    reader.readAsDataURL(file);
  }, [dispatch]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      fabricRef.current = new fabric.Canvas(canvasRef.current, {
        width: 1000,
        height: 600,
        backgroundColor: '#ffffff',
        preserveObjectStacking: true,
        centeredScaling: true
      });

      // Add a subtle grid pattern
      const gridSize = 20;
      for (let i = 0; i < 1000; i += gridSize) {
        fabricRef.current.add(new fabric.Line([i, 0, i, 600], {
          stroke: '#f3f4f6',
          selectable: false,
          evented: false
        }));
      }
      for (let i = 0; i < 600; i += gridSize) {
        fabricRef.current.add(new fabric.Line([0, i, 1000, i], {
          stroke: '#f3f4f6',
          selectable: false,
          evented: false
        }));
      }

      return () => {
        fabricRef.current?.dispose();
      };
    }
  }, []);

  // Handle image updates and effects
  useEffect(() => {
    if (!fabricRef.current || !selectedImage) return;

    fabric.Image.fromURL(selectedImage, (img) => {
      fabricRef.current?.clear();

      // Recreate grid
      const gridSize = 20;
      for (let i = 0; i < 1000; i += gridSize) {
        fabricRef.current?.add(new fabric.Line([i, 0, i, 600], {
          stroke: '#f3f4f6',
          selectable: false,
          evented: false
        }));
      }
      for (let i = 0; i < 600; i += gridSize) {
        fabricRef.current?.add(new fabric.Line([0, i, 1000, i], {
          stroke: '#f3f4f6',
          selectable: false,
          evented: false
        }));
      }

      // Calculate image dimensions to fit within canvas
      const canvasWidth = fabricRef.current?.width || 1000;
      const canvasHeight = fabricRef.current?.height || 600;
      const imgAspectRatio = img.width! / img.height!;
      const canvasAspectRatio = canvasWidth / canvasHeight;
      
      let scaleToFit;
      let finalWidth, finalHeight;
      
      if (imgAspectRatio > canvasAspectRatio) {
        // Image is wider than canvas
        finalWidth = canvasWidth * 0.9;
        finalHeight = finalWidth / imgAspectRatio;
      } else {
        // Image is taller than canvas
        finalHeight = canvasHeight * 0.9;
        finalWidth = finalHeight * imgAspectRatio;
      }
      
      scaleToFit = finalWidth / img.width!;

      // Apply filters
      const filters: fabric.IBaseFilter[] = [];
      
      // Apply image adjustments first
      if (adjustments.brightness !== 0) {
        filters.push(new fabric.Image.filters.Brightness({
          brightness: adjustments.brightness / 100
        }));
      }
      if (adjustments.contrast !== 0) {
        filters.push(new fabric.Image.filters.Contrast({
          contrast: adjustments.contrast / 100
        }));
      }

      // Then apply selected filter
      if (filterId && filterId !== 'none') {
        switch (filterId) {
          case 'grayscale':
            filters.push(new fabric.Image.filters.Grayscale());
            break;
          case 'sepia':
            filters.push(new fabric.Image.filters.Sepia());
            break;
          case 'vintage1':
            filters.push(new fabric.Image.filters.Sepia());
            filters.push(new fabric.Image.filters.Contrast({ contrast: 0.2 }));
            break;
          case 'vintage2':
            filters.push(new fabric.Image.filters.Sepia());
            filters.push(new fabric.Image.filters.Contrast({ contrast: -0.2 }));
            filters.push(new fabric.Image.filters.Brightness({ brightness: 0.2 }));
            break;
          case 'cool':
            filters.push(new fabric.Image.filters.HueRotation({ rotation: 0.15 }));
            filters.push(new fabric.Image.filters.Saturation({ saturation: 0.5 }));
            break;
          case 'warm':
            filters.push(new fabric.Image.filters.Saturation({ saturation: 0.2 }));
            filters.push(new fabric.Image.filters.Brightness({ brightness: 0.1 }));
            filters.push(new fabric.Image.filters.Contrast({ contrast: 0.1 }));
            break;
          case 'sharp':
            filters.push(new fabric.Image.filters.Contrast({ contrast: 0.3 }));
            filters.push(new fabric.Image.filters.Brightness({ brightness: -0.1 }));
            break;
        }
      }

      // Apply filters to image
      img.filters = filters;
      img.applyFilters();

      // Center the image
      img.set({
        originX: 'center',
        originY: 'center',
        left: canvasWidth / 2,
        top: canvasHeight / 2,
        scaleX: scaleToFit,
        scaleY: scaleToFit,
        crossOrigin: 'anonymous'
      });

      // Add the image directly to canvas instead of using a group
      fabricRef.current?.add(img);
      fabricRef.current?.setActiveObject(img);
      fabricRef.current?.renderAll();

      // Handle image movement
      img.on('moving', (e) => {
        const target = e.target as fabric.Image;
        dispatch(setPosition({ 
          x: target.left || 0,
          y: target.top || 0
        }));
      });

      // Handle image scaling
      img.on('scaling', (e) => {
        const target = e.target as fabric.Image;
        const newZoom = (target.scaleX || 1) / scaleToFit;
        dispatch(setZoom(newZoom));
      });

      // Apply stencil if selected
      if (stencilId && stencilPaths[stencilId as keyof typeof stencilPaths]) {
        const path = new fabric.Path(stencilPaths[stencilId as keyof typeof stencilPaths], {
          originX: 'center',
          originY: 'center',
          fill: 'black',
          stroke: '#000',
          strokeWidth: 2
        });

        // Scale the stencil to match the image size
        const imgBounds = img.getBoundingRect();
        const pathBounds = path.getBoundingRect();
        const pathScale = Math.min(
          imgBounds.width / pathBounds.width,
          imgBounds.height / pathBounds.height
        ) * 0.8;

        path.set({
          scaleX: pathScale * stencilScale,
          scaleY: pathScale * stencilScale,
          angle: stencilRotation,
          left: 0,
          top: 0
        });

        // Create a clipPath group
        const clipPath = new fabric.Group([path], {
          originX: 'center',
          originY: 'center',
          left: 0,
          top: 0
        });

        // Apply the clipPath to the image
        img.clipPath = clipPath;
        fabricRef.current?.renderAll();
      }
    });
  }, [selectedImage, stencilId, stencilScale, stencilRotation, filterId, adjustments, zoom, dispatch]);

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center overflow-hidden"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <div className="canvas-container" style={{ maxWidth: '90%', maxHeight: '90%' }}>
        <canvas ref={canvasRef} className="shadow-sm max-w-full max-h-full" style={{ width: '100%', height: 'auto' }} />
      </div>
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
      />
      {!selectedImage && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center space-y-4 pointer-events-auto">
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Upload an image
            </button>
            <p className="text-gray-500 text-sm">or drag and drop an image here</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Canvas; 