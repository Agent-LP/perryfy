import React from 'react';
import { Product } from '../../services/productService';

type VariantsAndLayersProps = {
  onColorChange: (hexadecimal: string, colorName: string) => void;
  onSizeChange: (size: string) => void;
  currentColor: string | undefined;
  currentSize: string;
  product: Product | null;
}



const VariantsAndLayers: React.FC<VariantsAndLayersProps> = ({
  onColorChange,
  onSizeChange,
  currentColor,
  currentSize,
  product
}) => {
  console.log(currentColor)
  console.log(currentSize)
  console.log(product)
  return (
    <div className="space-y-6">
      {/* Color Selection */}
      <div>
        <h3 className="text-sm font-medium text-gray-900 mb-3">Colors</h3>
        <div className="flex gap-2">
          {product?.colors.map((color) => (
            <button
              key={color.colorId}
              onClick={() => onColorChange(color.hexadecimal, color.color)}
              className={`w-8 h-8 rounded-full border-4 ${
                  currentColor === color.hexadecimal
                  ? "border-red-300" 
                  : "border-gray-300"
                }`
              }
              style={{ backgroundColor: `#${color.hexadecimal}` }}
              aria-label={`Select ${color.color} color`}
            >
              {currentColor === `#${color.hexadecimal}` && (
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
          {product?.sizes.map((size) => (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`px-3 py-1 text-sm font-medium rounded w-12 ${
                currentSize === size
                  ? 'bg-pink-600 text-white'
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
                src={product?.imageUrls[3] }
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
            <input type="checkbox" defaultChecked className="accent-ol ive-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default VariantsAndLayers; 