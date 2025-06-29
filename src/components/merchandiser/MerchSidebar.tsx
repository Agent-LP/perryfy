import React from 'react';

interface MerchSidebarProps {
  search: string;
  onSearchChange: (value: string) => void;
  onInventoryClick: () => void;
}

const MerchSidebar: React.FC<MerchSidebarProps> = ({ search, onSearchChange, onInventoryClick }) => {
  return (
    <aside className="w-full h-full flex flex-col gap-6">
      {/* Título */}
      <h2 className="text-xl font-bold mb-4">Merchandiser Dashboard</h2>
      {/* Buscador */}
      <div className="mb-4">
        <input
          type="text"
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search products"
          className="w-full px-4 py-2 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#3A86FF]"
          tabIndex={0}
          aria-label="Buscar productos"
        />
      </div>
      {/* Botones */}
      <div className="flex flex-col gap-2">
        <button
          className="text-[#F8F9FA] font-semibold text-left px-4 py-2 rounded-lg hover:bg-[#3A86FF] focus:outline-none focus:ring-2 focus:ring-[#3A86FF]"
          onClick={onInventoryClick}
          tabIndex={0}
          aria-label="Inventario"
        >
          Inventario
        </button>
        {/* Espacio para más botones en el futuro */}
      </div>
    </aside>
  );
};

export default MerchSidebar; 