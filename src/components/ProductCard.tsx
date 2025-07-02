import React from 'react';
import Button from './generic/Button';
import {  Colors, PrintAreas, ProductMapping } from '../services/productService';


interface ProductCardProps {
  product: ProductMapping;
  onAddToCart?: (product: ProductMapping) => void;
  onCreateDesign?: (productId: number, productImages: string[], printfulProductId:number, firstColor:Colors, printAreas: PrintAreas) => void;
  showAddToCart?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onCreateDesign,
  showAddToCart = true,
  className = '',
}) => {


  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleViewProductDesigner = () => {
    if (onCreateDesign) {
      console.log(product.colors[0].hexadecimal)
      onCreateDesign(product.productId, product.imageUrls, product.printfulProductId, product.colors[0], product.printAreas[0]);
    }
  };


  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${className}`}>
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="w-full h-48 bg-gray-200 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center relative overflow-hidden">
          {product.imageUrls.length > 0 && (
            <>
              {/* Primera imagen (por defecto) */}
              <img 
                src={product.imageUrls[0]} 
                alt={product.name}
                className="absolute inset-0 w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
              />
              {/* Segunda imagen (en hover) */}
              {product.imageUrls.length > 1 && (
                <img 
                  src={product.imageUrls[1]} 
                  alt={product.name}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                />
              )}
            </>
          )}
          {product.imageUrls.length === 0 && (
            <span className="text-gray-500 text-sm">Imagen del producto</span>
          )}
        </div>
        
        {/* Badges */}
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2 flex flex-col">
        {product.categories.map((category)=>(
          <span key={category} className="bg-[#004E89] text-white px-2 py-1 rounded-full text-xs font-medium mb-4">
            {category}
          </span>
          ))}
        </div>
        
        {/* Stock Status */}
        {!product.inStock  && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
              Agotado
            </span>
          </div>
        )}
      </div>
      
      <div className="p-4">
        {/* Product Name */}
        <h4 className="font-semibold text-[#2D3436] mb-2 group-hover:text-[#3A86FF] transition-colors line-clamp-2">
          {product.name}
        </h4>
        
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#FF6B35] font-bold text-lg">Bs. {product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-500 line-through text-sm">Bs. {product.originalPrice}</span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleViewProductDesigner}
            className="flex-1"
          >
            Crear Diseño
          </Button>
          {showAddToCart && product.inStock && (
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddToCart}
              className="flex-1"
            >
              Agregar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard; 