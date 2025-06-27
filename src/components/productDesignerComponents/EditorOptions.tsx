import React, { useState } from 'react';
import VariantsAndLayers from './VariantsAndLayers';
import PropertiesPanel from './PropertiesPanel';
import { createMockup, obtainMockupUrl } from '../../services/printFulService'; // Importa la función
import { Shape } from '../../types/shapes';
import { timeout } from '../../utils/functions/timeout';

type EditorOptionsProps = {
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  currentColor: string;
  currentSize: string;
  currentView: string; // Cambia el tipo de currentView según lo que necesites
  selectedShape: Shape | null;
  onShapePropertyChange?: (property: string, value: string | number | boolean) => void;
  onExport: (view: 'front' | 'back') => string; // Cambia el tipo de retorno de `onExport` para devolver el SVG
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
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview' | 'variants'>('edit');
  const [mockupUrls, setMockupUrls] = useState<string[]>([]); // Estado para guardar los mockups como una lista de strings

  const showPropertiesPanel = activeTab === 'edit' && selectedShape && onShapePropertyChange;

  const handleTabChange = async (tab: 'edit' | 'preview' | 'variants') => {
    setActiveTab(tab);

    if (tab === 'preview') {
      try {
        const frontImageData = await onExport('front');
        const backImageData = await onExport('back'); // Asegúrate de que onExport devuelva un string
        console.log('Front imageData:', frontImageData);
        console.log('Back imageData:', backImageData);
        await timeout(1000); // Espera 3 segundos antes de continuar
        
        // Aquí puedes llamar a la función de la API para crear el mockup
        const [frontResult, backResult] = await Promise.all([
          createMockup(frontImageData, 'front'), // Llama a la API
          createMockup(backImageData, 'back'), // Llama a la API
        ]);
        await timeout(4000); // Espera 3 segundos antes de continuar

        // Llama a la API para obtener la URL del mockup
        const [frontMockupUrls, backMockupUrls] = await Promise.all([
          obtainMockupUrl(frontResult),
          obtainMockupUrl(backResult),
        ]); 

        setMockupUrls([...frontMockupUrls, ...backMockupUrls]); // Guarda la URL del mockup
        console.log('Mockups generados:', [...frontMockupUrls, ...backMockupUrls]);
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