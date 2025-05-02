import React, { useState } from 'react';
import VariantsAndLayers from './VariantsAndLayers';
import PropertiesPanel from './PropertiesPanel';
import { defaultShapeProperties } from '../utils/data/colors';
import { Shape } from '../types/shapes';

type EditorOptionsProps = {
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  currentColor: string;
  currentSize: string;
  selectedShape: Shape | null;
  onShapePropertyChange?: (property: string, value: string | number | boolean) => void;
  onExport: () => void;
}

const EditorOptions: React.FC<EditorOptionsProps> = ({
  onColorChange,
  onSizeChange,
  currentColor,
  currentSize,
  selectedShape,
  onShapePropertyChange,
  onExport
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'variants'>('edit');

  const showPropertiesPanel = activeTab === 'edit' && selectedShape && onShapePropertyChange;

  // Manejar el cambio de tab
  const handleTabChange = (tab: 'edit' | 'preview' | 'variants') => {
    setActiveTab(tab);
    if (tab === 'preview') {
      onExport();
    }
  };

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
          onClick={() => handleTabChange('edit')}
        >
          Edit
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'preview'
              ? 'text-olive-600 border-b-2 border-olive-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('preview')}
        >
          Preview
        </button>
        <button
          className={`flex-1 py-2 px-4 text-sm font-medium ${
            activeTab === 'variants'
              ? 'text-olive-600 border-b-2 border-olive-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
          onClick={() => handleTabChange('variants')}
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
        {showPropertiesPanel ? (
          <PropertiesPanel
            selectedShape={selectedShape}
            onPropertyChange={onShapePropertyChange}
          />
        ) : activeTab === 'edit' ? (
          <div className="text-center text-gray-500">
            {selectedShape ? 'Loading properties...' : 'Select a shape to edit its properties'}
          </div>
        ) : null}
        {activeTab === 'preview' && (
          <div className="text-center text-gray-500">
            Preview will be shown here
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorOptions; 