import React, { useEffect, useState, useMemo } from 'react';
import MerchProductCard from '../components/merchandiser/MerchProductCard';
import MerchSidebar from '../components/merchandiser/MerchSidebar';
import { Product } from '../services/productService';
import { getAllProducts } from '../services/productService';

const MerchandiserDashboardPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  const filteredProducts = useMemo(() => {
    return products.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [products, search]);

  const handleSearchChange = (value: string) => setSearch(value);
  const handleInventoryClick = () => {
    // Navegación futura o lógica de inventario
  };
  const handleAddProduct = () => {
    // Navegación futura para añadir producto
  };

  return (
    <div className="min-h-screen flex bg-[#F8F9FA]">
      {/* Grid de productos */}
      <main className="flex-1 p-8">
        {loading ? (
          <div className="text-center text-[#3A86FF] text-xl">Cargando productos...</div>
        ) : error ? (
          <div className="text-center text-red-500 text-xl">{error}</div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center text-[#2D3436] text-xl">No se encontraron productos.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredProducts.map((product) => (
              <MerchProductCard
                key={product.id}
                name={product.name}
                image={product.images && product.images.length > 0 ? product.images[0] : undefined}
              />
            ))}
          </div>
        )}
      </main>
      {/* Panel lateral derecho */}
      <aside className="w-80 bg-[#FF6B35] text-white flex flex-col p-6 sticky top-0 h-screen">
        <MerchSidebar
          search={search}
          onSearchChange={handleSearchChange}
          onInventoryClick={handleInventoryClick}
        />
      </aside>
      {/* Botón flotante Add */}
      <button
        className="fixed bottom-8 right-8 bg-[#FF6B35] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-3xl hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-[#3A86FF] z-50"
        aria-label="Añadir producto"
        tabIndex={0}
        onClick={handleAddProduct}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleAddProduct(); }}
      >
        +
      </button>
    </div>
  );
};

export default MerchandiserDashboardPage; 