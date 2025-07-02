import axios from "axios";

export interface ProductMapping {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrls: Array<string>;
  categories: string[];
  inStock?: boolean;
  printfulProductId: number
  colors: Colors[]
  printAreas: PrintAreas[]
}


export interface Product {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUrls: Array<string>;
  inStock?: boolean;
  colors: Colors[]
  sizes: string[]
  categories: string[]
  printAreas: PrintAreas[]
  printfulProductId: number
  area_height : number
  area_width: number

}

export interface PrintAreas{
  printAreaId: number
  width: number
  height: number
}

export interface Colors{
  colorId: number
  color: string
  hexadecimal: string
}

export const getAllProducts = async (): Promise<Product[]> => {
  const res = await axios.get('http://localhost:8083/api/products');
  if (!res) throw new Error('Error al cargar productos');
  const data = await res.data;
  return data.map((p: any) => ({
    productId: p.productId || Math.random(),
    name: p.product_name || p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    imageUrls: p.imageUrls || '',
    categories: p.categories || ['General'],
    inStock: p.stock > 0,
    colors: p.colors,
    printfulProductId: p.printfulProductId,
    printAreas: p.printAreas
  }));
}; 

export const getProductById = async (productId: string): Promise<Product> => {
  const res = await axios.get(`http://localhost:8083/api/products/${productId}`)
  if(!res) throw new Error(`Error al cargar el producto ${productId}`)
  const data = await res.data
  return data
}