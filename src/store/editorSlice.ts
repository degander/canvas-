import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TextObject {
  id: string;
  text: string;
  fontFamily: string;
  fontSize: number;
  isBold: boolean;
  isItalic: boolean;
  x: number;
  y: number;
  rotation: number;
}

interface ImageAdjustment {
  brightness: number;
  contrast: number;
  highlights: number;
  shadows: number;
}

interface CropSettings {
  aspect: number | null;
  x: number;
  y: number;
  width: number;
  height: number;
}

interface EditorState {
  selectedImage: string | null;
  zoom: number;
  position: {
    x: number;
    y: number;
  };
  adjustments: ImageAdjustment;
  stencilId: string | null;
  stencilScale: number;
  stencilRotation: number;
  filterId: string;
  cropSettings: CropSettings;
  textObjects: TextObject[];
  selectedObjectId: string | null;
  history: Array<{
    image: string;
    zoom: number;
    position: { x: number; y: number };
    adjustments: ImageAdjustment;
    stencilId: string | null;
    stencilScale: number;
    stencilRotation: number;
    filterId: string;
    cropSettings: CropSettings;
    textObjects: TextObject[];
  }>;
}

const initialState: EditorState = {
  selectedImage: null,
  zoom: 1,
  position: { x: 0, y: 0 },
  adjustments: {
    brightness: 0,
    contrast: 0,
    highlights: 0,
    shadows: 0
  },
  stencilId: null,
  stencilScale: 1,
  stencilRotation: 0,
  filterId: 'none',
  cropSettings: {
    aspect: null,
    x: 0,
    y: 0,
    width: 100,
    height: 100
  },
  textObjects: [],
  selectedObjectId: null,
  history: []
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    setSelectedImage: (state, action: PayloadAction<string>) => {
      state.selectedImage = action.payload;
      state.history.push({
        image: action.payload,
        zoom: state.zoom,
        position: state.position,
        adjustments: { ...state.adjustments },
        stencilId: state.stencilId,
        stencilScale: state.stencilScale,
        stencilRotation: state.stencilRotation,
        filterId: state.filterId,
        cropSettings: { ...state.cropSettings },
        textObjects: [...state.textObjects]
      });
    },
    setZoom: (state, action: PayloadAction<number>) => {
      const newZoom = Math.max(0.1, Math.min(3, action.payload));
      state.zoom = newZoom;
    },
    setPosition: (state, action: PayloadAction<{ x: number; y: number }>) => {
      state.position = action.payload;
    },
    setAdjustment: (state, action: PayloadAction<{ type: keyof ImageAdjustment; value: number }>) => {
      state.adjustments[action.payload.type] = action.payload.value;
      if (state.selectedImage) {
        state.history.push({
          image: state.selectedImage,
          zoom: state.zoom,
          position: state.position,
          adjustments: { ...state.adjustments },
          stencilId: state.stencilId,
          stencilScale: state.stencilScale,
          stencilRotation: state.stencilRotation,
          filterId: state.filterId,
          cropSettings: { ...state.cropSettings },
          textObjects: [...state.textObjects]
        });
      }
    },
    setStencil: (state, action: PayloadAction<string | null>) => {
      state.stencilId = action.payload;
      if (state.selectedImage) {
        state.history.push({
          image: state.selectedImage,
          zoom: state.zoom,
          position: state.position,
          adjustments: { ...state.adjustments },
          stencilId: state.stencilId,
          stencilScale: state.stencilScale,
          stencilRotation: state.stencilRotation,
          filterId: state.filterId,
          cropSettings: { ...state.cropSettings },
          textObjects: [...state.textObjects]
        });
      }
    },
    setStencilScale: (state, action: PayloadAction<number>) => {
      state.stencilScale = Math.max(0.1, Math.min(2, action.payload));
    },
    setStencilRotation: (state, action: PayloadAction<number>) => {
      state.stencilRotation = action.payload % 360;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filterId = action.payload;
      if (state.selectedImage) {
        state.history.push({
          image: state.selectedImage,
          zoom: state.zoom,
          position: state.position,
          adjustments: { ...state.adjustments },
          stencilId: state.stencilId,
          stencilScale: state.stencilScale,
          stencilRotation: state.stencilRotation,
          filterId: state.filterId,
          cropSettings: { ...state.cropSettings },
          textObjects: [...state.textObjects]
        });
      }
    },
    setCropSettings: (state, action: PayloadAction<Partial<CropSettings>>) => {
      state.cropSettings = { ...state.cropSettings, ...action.payload };
      if (state.selectedImage) {
        state.history.push({
          image: state.selectedImage,
          zoom: state.zoom,
          position: state.position,
          adjustments: { ...state.adjustments },
          stencilId: state.stencilId,
          stencilScale: state.stencilScale,
          stencilRotation: state.stencilRotation,
          filterId: state.filterId,
          cropSettings: { ...state.cropSettings },
          textObjects: [...state.textObjects]
        });
      }
    },
    addText: (state, action: PayloadAction<{
      text: string;
      fontFamily: string;
      fontSize: number;
      isBold: boolean;
      isItalic: boolean;
    }>) => {
      const newText: TextObject = {
        id: Date.now().toString(),
        ...action.payload,
        x: 400,
        y: 300,
        rotation: 0
      };
      state.textObjects.push(newText);
      state.selectedObjectId = newText.id;
      if (state.selectedImage) {
        state.history.push({
          image: state.selectedImage,
          zoom: state.zoom,
          position: state.position,
          adjustments: { ...state.adjustments },
          stencilId: state.stencilId,
          stencilScale: state.stencilScale,
          stencilRotation: state.stencilRotation,
          filterId: state.filterId,
          cropSettings: { ...state.cropSettings },
          textObjects: [...state.textObjects]
        });
      }
    },
    updateTextObject: (state, action: PayloadAction<{
      id: string;
      updates: Partial<TextObject>;
    }>) => {
      const textObject = state.textObjects.find(t => t.id === action.payload.id);
      if (textObject) {
        Object.assign(textObject, action.payload.updates);
        if (state.selectedImage) {
          state.history.push({
            image: state.selectedImage,
            zoom: state.zoom,
            position: state.position,
            adjustments: { ...state.adjustments },
            stencilId: state.stencilId,
            stencilScale: state.stencilScale,
            stencilRotation: state.stencilRotation,
            filterId: state.filterId,
            cropSettings: { ...state.cropSettings },
            textObjects: [...state.textObjects]
          });
        }
      }
    },
    deleteTextObject: (state, action: PayloadAction<string>) => {
      state.textObjects = state.textObjects.filter(t => t.id !== action.payload);
      if (state.selectedObjectId === action.payload) {
        state.selectedObjectId = null;
      }
      if (state.selectedImage) {
        state.history.push({
          image: state.selectedImage,
          zoom: state.zoom,
          position: state.position,
          adjustments: { ...state.adjustments },
          stencilId: state.stencilId,
          stencilScale: state.stencilScale,
          stencilRotation: state.stencilRotation,
          filterId: state.filterId,
          cropSettings: { ...state.cropSettings },
          textObjects: [...state.textObjects]
        });
      }
    },
    setSelectedObject: (state, action: PayloadAction<string | null>) => {
      state.selectedObjectId = action.payload;
    },
    saveToHistory: (state, action: PayloadAction<{
      image: string;
      zoom: number;
      position: { x: number; y: number };
    }>) => {
      state.history.push({
        image: action.payload.image,
        zoom: action.payload.zoom,
        position: action.payload.position,
        adjustments: { ...state.adjustments },
        stencilId: state.stencilId,
        stencilScale: state.stencilScale,
        stencilRotation: state.stencilRotation,
        filterId: state.filterId,
        cropSettings: { ...state.cropSettings },
        textObjects: [...state.textObjects]
      });
    },
    undo: (state) => {
      if (state.history.length > 0) {
        const previousState = state.history.pop();
        if (previousState) {
          state.selectedImage = previousState.image;
          state.zoom = previousState.zoom;
          state.position = previousState.position;
          state.adjustments = previousState.adjustments;
          state.stencilId = previousState.stencilId;
          state.stencilScale = previousState.stencilScale;
          state.stencilRotation = previousState.stencilRotation;
          state.filterId = previousState.filterId;
          state.cropSettings = previousState.cropSettings;
          state.textObjects = previousState.textObjects;
        }
      }
    },
    reset: (state) => {
      if (state.selectedImage) {
        state.history.push({
          image: state.selectedImage,
          zoom: state.zoom,
          position: state.position,
          adjustments: { ...state.adjustments },
          stencilId: state.stencilId,
          stencilScale: state.stencilScale,
          stencilRotation: state.stencilRotation,
          filterId: state.filterId,
          cropSettings: { ...state.cropSettings },
          textObjects: [...state.textObjects]
        });
      }
      
      state.selectedImage = null;
      state.zoom = 1;
      state.position = { x: 0, y: 0 };
      state.adjustments = {
        brightness: 0,
        contrast: 0,
        highlights: 0,
        shadows: 0
      };
      state.stencilId = null;
      state.stencilScale = 1;
      state.stencilRotation = 0;
      state.filterId = 'none';
      state.cropSettings = {
        aspect: null,
        x: 0,
        y: 0,
        width: 100,
        height: 100
      };
      state.textObjects = [];
      state.selectedObjectId = null;
    }
  }
});

export const {
  setSelectedImage,
  setZoom,
  setPosition,
  setAdjustment,
  setStencil,
  setStencilScale,
  setStencilRotation,
  setFilter,
  setCropSettings,
  addText,
  updateTextObject,
  deleteTextObject,
  setSelectedObject,
  saveToHistory,
  undo,
  reset
} = editorSlice.actions;

export default editorSlice.reducer; 