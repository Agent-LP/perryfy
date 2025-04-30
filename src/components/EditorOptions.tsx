import React, { useState } from 'react';
import VariantsAndLayers from './VariantsAndLayers';

type EditorOptionsProps = {
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  currentColor: string;
  currentSize: string;
}

const EditorOptions: React.FC<EditorOptionsProps> = ({
  onColorChange,
  onSizeChange,
  currentColor,
  currentSize
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'variants'>('edit');

  return (
    <div className="w-80 border-l border-gray-200 bg-white">
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'edit'
              ? 'text-olive-600 border-b-2 border-olive-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('edit')}
        >
          Edit
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'preview'
              ? 'text-olive-600 border-b-2 border-olive-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('preview')}
        >
          Preview
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'variants'
              ? 'text-olive-600 border-b-2 border-olive-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => setActiveTab('variants')}
        >
          Variants
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        {activeTab === 'variants' && (
          <VariantsAndLayers
            onColorChange={onColorChange}
            onSizeChange={onSizeChange}
            currentColor={currentColor}
            currentSize={currentSize}
          />
        )}
        {activeTab === 'edit' && (
          <div className="text-center text-gray-500">Edit options here</div>
        )}
        {activeTab === 'preview' && (
          <div className="text-center text-gray-500">Preview options here</div>
        )}
      </div>
    </div>
  );
};

export default EditorOptions; 