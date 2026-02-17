
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className = '', ...props }) => {
  let baseStyles = 'px-6 py-3 rounded-full font-semibold transition-all duration-300 ease-in-out transform';
  let variantStyles = '';

  switch (variant) {
    case 'primary':
      variantStyles = 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 shadow-lg hover:shadow-xl';
      break;
    case 'secondary':
      variantStyles = 'bg-gray-700 text-gray-100 hover:bg-gray-600 hover:scale-105 shadow-lg hover:shadow-xl';
      break;
    case 'outline':
      variantStyles = 'border-2 border-indigo-600 text-indigo-300 hover:bg-indigo-600 hover:text-white hover:scale-105';
      break;
  }

  return (
    <button className={`${baseStyles} ${variantStyles} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;
