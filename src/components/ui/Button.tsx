import React from 'react'

interface ButtonProps {
    children: React.ReactNode;
    className?: string;
    type: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

const Button = ({ children, className, type, onClick }: ButtonProps) => {
  return (
    <button type={type} className={`flex justify-center items-center cursor-pointer ${className}`} onClick={onClick}>
        {children}
    </button>
  )
}

export default Button