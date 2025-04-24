import React, { useRef } from 'react';

interface DesignToolbarProps {
  onAddShape: (type: 'rect' | 'circle' | 'text') => void;
  onImageUpload: (file: File) => void;
}

const DesignToolbar: React.FC<DesignToolbarProps> = ({ onAddShape, onImageUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onImageUpload(file);
      // Reset input value to allow uploading the same file again
      event.target.value = '';
    }
  };

  return (
    <div className="w-64 bg-white p-4 shadow-md flex flex-col items-center space-y-4">
      <div className="relative group">
        <button 
          className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl transition-colors duration-200"
          aria-label="Add shape"
        >
          +
        </button>
        
        {/* Dropdown menu for shapes */}
        <div className="absolute left-full ml-2 top-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
          <div className="flex items-center bg-white shadow-lg rounded-lg p-3 space-x-3">
            <button
              onClick={() => onAddShape('rect')}
              className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
              aria-label="Add rectangle"
            >
              ▭
            </button>
            <button
              onClick={() => onAddShape('circle')}
              className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
              aria-label="Add circle"
            >
              ●
            </button>
          </div>
        </div>
      </div>

      <button
        onClick={() => onAddShape('text')}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl font-semibold transition-colors duration-200"
        aria-label="Add text"
      >
        T
      </button>

      <button
        onClick={handleImageClick}
        className="w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center text-xl transition-colors duration-200"
        aria-label="Upload image"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 24 24" 
          fill="currentColor" 
          className="w-6 h-6"
        >
          <path d="M4 4h16v16H4V4zm2 2v12h12V6H6zm3 9l2-4 2 4H9zm8 0l-3-4-2 3-1-1-3 2h9z"/>
        </svg>
      </button>

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label="Upload image"
      />
    </div>
  );
};

export default DesignToolbar; 