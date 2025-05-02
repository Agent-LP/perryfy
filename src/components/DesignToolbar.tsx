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
    <div className="w-20 bg-white shadow-md flex flex-col h-screen justify-">
      {/* Back button */}
      <div className="p-2 border-b border-gray-200">
        <button 
          className="w-8 h-8 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors duration-200"
          aria-label="Go back"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5"
          >
            <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
          </svg>
        </button>
      </div>

      {/* Tools container */}
      <div className="p-3 flex flex-col items-center space-y-3 ">
        <div className="relative group">
          <button 
            className="w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center text-xl transition-colors duration-200"
            aria-label="Add shape"
          >
            +
          </button>
          
          {/* Dropdown menu for shapes */}
          <div className="absolute left-full ml-2 top-0 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="flex items-center bg-white shadow-lg rounded-lg p-2 space-x-2">
              <button
                onClick={() => onAddShape('rect')}
                className="w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
                aria-label="Add rectangle"
              >
                ▭
              </button>
              <button
                onClick={() => onAddShape('circle')}
                className="w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-colors duration-200"
                aria-label="Add circle"
              >
                ●
              </button>
            </div>
          </div>
        </div>

        <button
          onClick={() => onAddShape('text')}
          className="w-16 h-16 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center text-base font-semibold transition-colors duration-200"
          aria-label="Add text"
        >
          T
        </button>

        <button
          onClick={handleImageClick}
          className="w-9 h-9 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center justify-center transition-colors duration-200"
          aria-label="Upload image"
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="currentColor" 
            className="w-5 h-5"
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
    </div>
  );
};

export default DesignToolbar; 