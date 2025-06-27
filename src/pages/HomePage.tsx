import React, { useEffect, useState, useMemo } from 'react';
import HomeHeader from '../components/HomeHeader';
import ProductCard from '../components/ProductCard';
import Button from '../components/generic/Button';
import { getAllProducts, Product } from '../services/productService';

// Hardcodear usuario y categorías por ahora
const USER_NAME = 'Samuel';
const CATEGORIES = [
  'Home',
  'Fashion',
  'Decoración',
  'Deportes',
  'Ropa',
  'Posters',
];

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Home');
  const [cart, setCart] = useState<{ [id: number]: number }>({});

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message || 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Filtrar productos por búsqueda y categoría
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory = selectedCategory === 'Home' || p.category === selectedCategory;
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, search, selectedCategory]);

  // Handlers
  const handleSearch = (query: string) => setSearch(query);
  const handleCategory = (cat: string) => setSelectedCategory(cat);
  const handleAddToCart = (product: Product) => {
    setCart((prev) => ({ ...prev, [product.id]: (prev[product.id] || 0) + 1 }));
  };

  // Contador de carrito
  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#2D3436] font-sans">
      {/* Header */}
      <HomeHeader
        cartCount={cartCount}
        onSearch={handleSearch}
        userName={USER_NAME}
      />  
      
      {/* Layout principal */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex gap-8">
        {/* Sidebar de categorías */}
        <aside className="w-48 flex-shrink-0">
          <nav aria-label="Categorías">
            <ul className="space-y-4">
              {CATEGORIES.map((cat) => (
                <li key={cat}>
                  <button
                    className={`w-full text-left px-4 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#3A86FF] ${selectedCategory === cat ? 'bg-[#004E89] text-white' : 'text-[#2D3436] hover:bg-[#3A86FF] hover:text-white'}`}
                    onClick={() => handleCategory(cat)}
                    tabIndex={0}
                    aria-label={`Filtrar por ${cat}`}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleCategory(cat); }}
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </aside>
        {/* Main: productos */}
        <main className="flex-1">
          {loading ? (
            <div className="text-center py-20 text-[#3A86FF] text-xl">Cargando productos...</div>
          ) : error ? (
            <div className="text-center py-20 text-red-500 text-xl">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 text-[#2D3436] text-xl">No se encontraron productos.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                  showAddToCart={true}
                />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage; 