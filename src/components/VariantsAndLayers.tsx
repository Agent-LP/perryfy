import React from 'react';

type VariantsAndLayersProps = {
  onColorChange: (color: string) => void;
  onSizeChange: (size: string) => void;
  currentColor: string;
  currentSize: string;
}

const AVAILABLE_COLORS = [
  { name: 'White', value: '#FFFFFF' },
  { name: 'Black', value: '#000000' },
  { name: 'Navy', value: '#000080' },
  { name: 'Gray', value: '#808080' },
];

const AVAILABLE_SIZES = ['S', 'M', 'L', 'XL', 'XXL'];

const VariantsAndLayers: React.FC<VariantsAndLayersProps> = ({
  onColorChange,
  onSizeChange,
  currentColor,
  currentSize,
}) => {
  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Colors</h3>
        <div className="flex gap-2">
          {AVAILABLE_COLORS.map((color) => (
            <button
              key={color.value}
              onClick={() => onColorChange(color.value)}
              className={`w-8 h-8 rounded-full border-2 ${
                currentColor === color.value
                  ? 'border-olive-600'
                  : 'border-gray-200'
              }`}
              style={{ backgroundColor: color.value }}
              aria-label={`Select ${color.name} color`}
            >
              {currentColor === color.value && (
                <span className="sr-only">Selected</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Size Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Sizes</h3>
        <div className="flex  flex-wrap gap-2 items-center justify-center">
          {AVAILABLE_SIZES.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-3 py-1 text-sm font-medium rounded w-12 ${
                currentSize === size
                  ? 'bg-olive-600 text-white'
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
              }`}
            >
              {size}
            </button>
          ))}
        </div>
      </div>

      {/* Layers Section */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Layers</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2">
              <img
                src="/src/utils/images/flat templates/p1adelante.svg"
                alt="Hoodie"
                className="w-6 h-6"
              />
              <span className="text-sm text-gray-700">Base Hoodie</span>
            </div>
            <input type="checkbox" checked disabled className="accent-olive-600" />
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex items-center gap-2">
              <svg className="w-6 h-6 text-gray-500" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,19H5V5H19V19Z"
                />
              </svg>
              <span className="text-sm text-gray-700">Design Elements</span>
            </div>
            <input type="checkbox" checked className="accent-olive-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantsAndLayers; 