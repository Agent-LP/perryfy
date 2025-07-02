import React, { useState } from 'react';
import VariantsAndLayers from './VariantsAndLayers';
import PropertiesPanel from './PropertiesPanel';
import { createMockup, obtainMockupUrl } from '../../services/printFulService';
import { generateMockupRequest } from '../../utils/functions/generateMockupRequest';
import { Shape } from '../../types/shapes';
import { timeout } from '../../utils/functions/timeout';
import { Product } from '../../services/productService';

type EditorOptionsProps = {
  onColorChange: (hexadecimal: string, colorName: string) => void;
  onSizeChange: (size: string) => void;
  currentColor: string | undefined;
  currentSize: string;
  currentView: string; // Cambia el tipo de currentView según lo que necesites
  selectedShape: Shape | null;
  onShapePropertyChange?: (property: string, value: string | number | boolean) => void;
  onExport: (view: 'front' | 'back') => Promise<string>; // Cambia el tipo de retorno de `onExport` para devolver Promise<string>
  product: Product | null;
};

const EditorOptions: React.FC<EditorOptionsProps> = ({
  onColorChange,
  onSizeChange,
  currentColor,
  currentSize,
  //currentView,
  selectedShape,
  onShapePropertyChange,
  onExport,
  product
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'variants'>('edit');
  const [mockupUrls, setMockupUrls] = useState<string[]>([]); // Estado para guardar los mockups como una lista de strings

  const showPropertiesPanel = activeTab === 'edit' && selectedShape && onShapePropertyChange;

  const handleTabChange = async (tab: 'edit' | 'preview' | 'variants') => {
    setActiveTab(tab);

    if (tab === 'preview' && product) {
      try {
        const frontImageData = await onExport('front');
        const backImageData = await onExport('back');
        console.log('Front imageData:', frontImageData);
        console.log('Back imageData:', backImageData);
        await timeout(1000);
        
        // Generate mockup request for both front and back
        const mockupRequest = generateMockupRequest(
          frontImageData,
          backImageData,
          product,
          currentColor,
          currentSize
        );
        
        
        // Create mockups for both front and back
        const mockupTask = await  createMockup(mockupRequest);
        
        
        await timeout(10000);
        console.log(mockupTask)

        // Get mockup URLs
        const mockupUrls = await obtainMockupUrl(mockupTask);

        setMockupUrls(mockupUrls);
        console.log('Mockups generados:', mockupUrls);
      } catch (error) {
        console.error('Error al generar los mockups:', error);
      }
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
            product={product}
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
          <div className="text-center">
            {mockupUrls.length > 0 ? (
              mockupUrls.map((url, index) => (
              <img key={index} src={url} alt={`Mockup Preview ${index + 1}`} className="w-full h-auto mb-4" />
              ))
            ) : (
              <div className="text-gray-500">Generating mockup...</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditorOptions;