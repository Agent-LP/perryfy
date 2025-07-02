import React, { useEffect, useState } from 'react';
import Button from './generic/Button';
import { clearUserData } from '../services/authService';
import { useNavigate } from 'react-router-dom';

interface HomeHeaderProps {
  cartCount: number;
  onSearch: (query: string) => void;
  userName: string;
}

const HomeHeader: React.FC<HomeHeaderProps> = ({ cartCount, onSearch, userName }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  // Búsqueda automática con debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(search);
    }, 300); // Espera 300ms después de que el usuario deje de escribir

    return () => clearTimeout(timeoutId);
  }, [search, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(search);
  };

  const handleLogout = () => {
    clearUserData();
    navigate('/login');
  };

  return (
    <header className="bg-[#004E89] text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between py-4">
        {/* Logo y Welcome */}
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-[#FF6B35]">Perryfy</h1>
          <span className="italic text-[#3A86FF] ml-2">Welcome!</span>
        </div>
        {/* Navegación */}
        <div className="flex gap-2">
          <Button variant="primary" size="md">Home</Button>
          <Button variant="outline" size="md" disabled>Tu tienda</Button>
        </div>
        {/* Buscador */}
        <form onSubmit={handleSubmit} className="flex-1 max-w-md mx-8">
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar productos..."
              className="w-full px-4 py-2 pl-10 pr-4 text-gray-900 bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-[#3A86FF]"
              tabIndex={0}
              aria-label="Buscar productos"
            />
            <button
              type="submit"
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              aria-label="Buscar"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </form>
        {/* Carrito y usuario */}
        <div className="flex items-center gap-4">
          <button
            className="relative p-2 hover:bg-[#3A86FF] rounded-full transition-colors"
            aria-label="Carrito de compras"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') {/* abrir modal si aplica */} }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#FF6B35] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <span className="text-[#F8F9FA] font-semibold">{userName}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 rounded-full bg-[#FF6B35] text-white font-semibold hover:bg-[#e65a24] focus:outline-none focus:ring-2 focus:ring-[#3A86FF] transition-colors"
            aria-label="Cerrar sesión"
            tabIndex={0}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') handleLogout(); }}
          >
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default HomeHeader; 