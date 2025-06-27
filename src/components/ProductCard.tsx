import React from 'react';
import Button from './generic/Button';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  isNew?: boolean;
  isOnSale?: boolean;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
  onViewProduct?: (product: Product) => void;
  showAddToCart?: boolean;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onViewProduct,
  showAddToCart = true,
  className = '',
}) => {
  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const handleViewProduct = () => {
    if (onViewProduct) {
      onViewProduct(product);
    }
  };

  const discountPercentage = product.originalPrice && product.isOnSale
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group ${className}`}>
      <div className="relative overflow-hidden">
        {/* Product Image */}
        <div className="w-full h-48 bg-gray-200 group-hover:scale-105 transition-transform duration-300 flex items-center justify-center">
          <span className="text-gray-500 text-sm">Imagen del producto</span>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-[#3A86FF] text-white px-2 py-1 rounded-full text-xs font-medium">
              Nuevo
            </span>
          )}
          {product.isOnSale && (
            <span className="bg-[#FF6B35] text-white px-2 py-1 rounded-full text-xs font-medium">
              -{discountPercentage}%
            </span>
          )}
        </div>
        
        {/* Category Badge */}
        <div className="absolute top-2 right-2">
          <span className="bg-[#004E89] text-white px-2 py-1 rounded-full text-xs font-medium">
            {product.category}
          </span>
        </div>
        
        {/* Stock Status */}
        {!product.inStock && (
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
        
        {/* Rating */}
        {product.rating && (
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(product.rating!) ? 'fill-current' : 'fill-gray-300'}`}
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            {product.reviewCount && (
              <span className="text-sm text-gray-500 ml-1">({product.reviewCount})</span>
            )}
          </div>
        )}
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[#FF6B35] font-bold text-lg">Bs. {product.price}</span>
          {product.originalPrice && product.isOnSale && (
            <span className="text-gray-500 line-through text-sm">Bs. {product.originalPrice}</span>
          )}
        </div>
        
        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={handleViewProduct}
            className="flex-1"
          >
            Ver producto
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