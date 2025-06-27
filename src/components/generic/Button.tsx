import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  className?: string;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  fullWidth = false,
}) => {
  const baseClasses = 'font-medium rounded-full transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'bg-[#FF6B35] hover:bg-orange-600 text-white focus:ring-[#FF6B35] shadow-lg hover:shadow-xl',
    secondary: 'bg-[#3A86FF] hover:bg-[#004E89] text-white focus:ring-[#3A86FF] shadow-lg hover:shadow-xl',
    outline: 'bg-transparent border-2 border-[#3A86FF] text-[#3A86FF] hover:bg-[#3A86FF] hover:text-white focus:ring-[#3A86FF]',
    ghost: 'bg-transparent text-[#2D3436] hover:bg-gray-100 focus:ring-gray-300',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };
  
  const widthClass = fullWidth ? 'w-full' : '';
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${widthClass} ${className}`;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      tabIndex={0}
      aria-disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button; 