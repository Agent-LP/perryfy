import React, { useState, useEffect } from 'react';
import { commonColors, defaultShapeProperties } from '../../utils/data/colors';
import { FONT_LIST } from '../../utils/data/fonts';

interface PropertiesPanelProps {
  selectedShape: {
    type: string;
    fill: string | undefined;
    stroke: string;
    strokeWidth: number;
    cornerRadius?: number;
    fontFamily?: string;
    fitToArea: boolean;
  } | null;
  onPropertyChange: (property: string, value: string | number | boolean) => void;
}

const PropertiesPanel: React.FC<PropertiesPanelProps> = ({
  selectedShape,
  onPropertyChange,
}) => {
  // Estados locales para los inputs
  const [fillColor, setFillColor] = useState(defaultShapeProperties.fill);
  const [strokeColor, setStrokeColor] = useState(defaultShapeProperties.stroke);
  const [strokeWidth, setStrokeWidth] = useState(defaultShapeProperties.strokeWidth);
  const [cornerRadius, setCornerRadius] = useState(defaultShapeProperties.cornerRadius);
  const [fontFamily, setFontFamily] = useState(defaultShapeProperties.fontFamily);

  // Si no hay forma seleccionada, mostrar mensaje
  if (!selectedShape) {
    return (
      <div className="p-4 text-center text-gray-500">
        Selecciona una forma para editar sus propiedades
      </div>
    );
  }

  // Actualizar estados locales cuando cambia la forma seleccionada
  useEffect(() => {
    if (selectedShape) {
      setFillColor(selectedShape.fill || defaultShapeProperties.fill);
      setStrokeColor(selectedShape.stroke || defaultShapeProperties.stroke);
      setStrokeWidth(selectedShape.strokeWidth || defaultShapeProperties.strokeWidth);
      setCornerRadius(selectedShape.cornerRadius ?? defaultShapeProperties.cornerRadius);
      setFontFamily(selectedShape.fontFamily || defaultShapeProperties.fontFamily);
    }
  }, [selectedShape]);
  

  // Manejadores para actualizar los estados locales y propagar los cambios
  const handleFillChange = (value: string) => {
    setFillColor(value);
    onPropertyChange('fill', value);
  };

  const handleStrokeChange = (value: string) => {
    setStrokeColor(value);
    onPropertyChange('stroke', value);
  };

  const handleStrokeWidthChange = (value: number) => {
    setStrokeWidth(value);
    onPropertyChange('strokeWidth', value);
  };

  const handleCornerRadiusChange = (value: number) => {
    setCornerRadius(value);
    onPropertyChange('cornerRadius', value);
  };

  const handleFontFamilyChange = (value: string) => {
    setFontFamily(value);
    onPropertyChange('fontFamily', value);
  };

  return (
    <div className="p-4 space-y-6">
      {/* Fill Color Section */}
      {(selectedShape.type == "rect" || selectedShape.type == "circle" || selectedShape.type == "text") && <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Fill Color</label>
        <div className="grid grid-cols-6 gap-2">
          {commonColors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-md border ${
                fillColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleFillChange(color)}
            />
          ))}
        </div>
        <input
          type="text"
          value={fillColor}
          onChange={(e) => handleFillChange(e.target.value)}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
          placeholder="#000000"
        />
      </div>}

      {/* Border Color Section */}
      {(selectedShape.type == "rect" || selectedShape.type == "circle") && <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Border Color</label>
        <div className="grid grid-cols-6 gap-2">
          {commonColors.map((color) => (
            <button
              key={color}
              className={`w-6 h-6 rounded-md border ${
                strokeColor === color ? 'ring-2 ring-offset-2 ring-blue-500' : 'border-gray-200'
              }`}
              style={{ backgroundColor: color }}
              onClick={() => handleStrokeChange(color)}
            />
          ))}
        </div>
        <input
          type="text"
          value={strokeColor}
          onChange={(e) => handleStrokeChange(e.target.value)}
          className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
          placeholder="#000000"
        />
      </div>}

      

      {/* Font Family Section */}
      {selectedShape.fontFamily && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Font Family</label>
          <select
            value={fontFamily}
            onChange={(e) => handleFontFamilyChange(e.target.value)}
            className="mt-1 block w-full px-3 py-2 text-sm border border-gray-300 rounded-md"
          >
            {FONT_LIST.map((font) => (
              <option key={font} value={font}>
                {font}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Border Width Section */}
      {(selectedShape.type == "rect" || selectedShape.type == "circle" ) &&  <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Border Width</label>
        <div className="flex items-center space-x-2">
          <input
            type="range"
            min="0"
            max="20"
            value={strokeWidth}
            onChange={(e) => handleStrokeWidthChange(parseInt(e.target.value))}
            className="w-full"
          />
          <span className="text-sm text-gray-500 w-8">{strokeWidth}</span>
        </div>
      </div>}

      {/* Corner Radius Section */}
      {selectedShape.cornerRadius !== undefined && (
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Corner Radius</label>
          <div className="flex items-center space-x-2">
            <input
              type="range"
              min="0"
              max="50"
              value={cornerRadius}
              onChange={(e) => handleCornerRadiusChange(parseInt(e.target.value))}
              className="w-full"
            />
            <span className="text-sm text-gray-500 w-8">{cornerRadius}</span>
          </div>
        </div>
      )}

      {/* Fit to Area Toggle */}
      {(selectedShape.type == "rect" || selectedShape.type == "circle" || selectedShape.type == "image") && <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gray-700">Fit to Area</span>
        <button
          className={`relative inline-flex h-6 w-11 items-center rounded-full ${
            selectedShape.fitToArea ? 'bg-blue-600' : 'bg-gray-200'
          }`}
          onClick={() => onPropertyChange('fitToArea', !selectedShape.fitToArea)}
        >
          <span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
              selectedShape.fitToArea ? 'translate-x-6' : 'translate-x-1'
            }`}
          />
        </button>
      </div>}
    </div>
  );
};

export default PropertiesPanel; 