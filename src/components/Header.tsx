import React from 'react';
import Button from './generic/Button';

interface HeaderProps {
  onLogin?: () => void;
  onSignUp?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onLogin,
  onSignUp,
}) => {
  return (
    <header className="bg-[#004E89] text-white shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="flex items-center ">
            <h1 className="text-2xl font-bold text-white">Perryfy</h1>
          </div>
          {/* User Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" onClick={onLogin}>
              Iniciar Sesión
            </Button>
            <Button variant="primary" size="sm" onClick={onSignUp}>
              Registrarse
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header; 