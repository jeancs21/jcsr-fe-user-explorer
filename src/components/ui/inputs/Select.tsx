import React from 'react';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options?: Array<{ value: string | number; label: string }>;
}

const Select = React.forwardRef<HTMLSelectElement, SelectProps>(({ label, error, helperText, options, className, children, ...rest }, ref) => {
  return (
    <div className="flex flex-col gap-2 w-full">
        <label>{label}</label>
        <select
            ref={ref}
            className={`border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : ''} ${className || ''}`}
            {...rest}
        >
            {options ? (
                options.map((option) => (
                    <option
                        key={option.value}
                        value={option.value}
                        className=''
                    >
                        {option.label}
                    </option>
                ))
            ) : (
                children
            )}
        </select>
        {error && <span style={{ color: 'red' }}>{error}</span>}
        {helperText && <span>{helperText}</span>}
    </div>
  );
});

Select.displayName = 'Select';

export default Select