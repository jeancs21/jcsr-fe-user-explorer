import React from 'react';

interface TextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

const TextField = React.forwardRef<HTMLInputElement, TextFieldProps>(({ label, error, helperText, className, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
        <label>{label}</label>
        <input
            ref={ref}
            className={`border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500 focus:ring-red-500' : ''} ${className || ''}`}
            type="text"
            {...rest}
        />
        {error && <span style={{ color: 'red' }}>{error}</span>}
        {helperText && <span>{helperText}</span>}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;