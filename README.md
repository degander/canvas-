# 🖼️ Canvas Stencil Editor

A web-based image stencil editor built using **React.js**, **Fabric.js**, and **Redux**, inspired by Canva. This editor allows users to
upload an image and mask it inside a custom stencil shape (like a hexagon), then adjust and transform the image interactively within the masked frame.

![image](https://github.com/user-attachments/assets/79931504-4119-4a34-b063-b1d053419f96)



---

## ✨ Features

### 🧩 Canvas & UI

- Responsive **Fabric.js** canvas with grid overlay
- Modern UI sidebar built in React with controls for image and stencil management

### 🖼️ Stencil Frame (Photo Mask)

- Supports predefined stencil shapes: **Hexagon** (with ability to expand)
- Image is clipped inside the selected stencil shape using `clipPath`
- Stencil boundary remains visible for user interaction

### 📷 Image Upload & Manipulation

- Upload an image via file picker
- Image is masked and placed within the stencil
- Move and scale image inside the stencil (with bounding limits)
- Transformation handles for resizing

### 🎨 Filters & Adjustments (Optional)

- Placeholder for future filter controls (grayscale, sepia, brightness, etc.)

### 🔁 Reset

- Reset image to original scale and position inside the stencil

---

## 🛠️ Built With

- [React.js](https://reactjs.org/)
- [Fabric.js](http://fabricjs.com/) – Canvas rendering and object control
- [Redux Toolkit](https://redux-toolkit.js.org/) – State management
- [Tailwind CSS](https://tailwindcss.com/) – Styling framework

---

## 🧪 Getting Started

### 🔧 Installation

```bash
git clone [https://github.com/degander/canvas-]
cd canvas-stencil-editor
npm install
npm run dev
