import axios from "axios";

export interface Product {
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

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get('http://localhost:8083/api/products');
  if (!res) throw new Error('Error al cargar productos');
  const data = await res.data;
  return data.map((p: any) => ({
    id: p.id || p.productId || Math.random(),
    name: p.product_name || p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.imageUrls?.[0] || '',
    category: p.category || 'General',
    inStock: p.stock > 0
  }));
}; 