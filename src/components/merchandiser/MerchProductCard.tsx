import React from 'react';

interface MerchProductCardProps {
  name: string;
  image?: string;
}

const MerchProductCard: React.FC<MerchProductCardProps> = ({ name, image }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-40 h-32 bg-pink-300 rounded-md flex items-center justify-center mb-2 shadow-md">
        {image ? (
          <img src={image} alt={name} className="object-cover w-full h-full rounded-md" />
        ) : (
          <span className="text-gray-400">Sin imagen</span>
        )}
      </div>
      <span className="text-[#FF6B35] font-semibold text-base text-center" tabIndex={0} aria-label={name}>{name}</span>
    </div>
  );
};

export default MerchProductCard; 