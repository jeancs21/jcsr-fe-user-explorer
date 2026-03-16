import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
    disabled?: boolean;
}

const Button = ({ children, className, type, onClick, disabled }: ButtonProps) => {
  return (
    <button 
      type={type} 
      className={`flex justify-center items-center transition-all ${disabled ? 'opacity-50 cursor-not-allowed grayscale-[0.5]' : 'cursor-pointer'} ${className}`} 
      onClick={disabled ? undefined : onClick}
      disabled={disabled}
    >
        {children}
    </button>
  )
}

export default Button