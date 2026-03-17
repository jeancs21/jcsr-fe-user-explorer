import React from 'react';

interface RadioButtonProps extends React.InputHTMLAttributes<HTMLInputElement> {
    id?: string;
    label: string;
    value: string;
    border?: boolean;
}

const RadioButton = React.forwardRef<HTMLInputElement, RadioButtonProps>(({ id, label, value, border = false, ...rest }, ref) => {
  return (
    <div className={`flex gap-2 items-center ${border ? 'border border-gray-300 p-2 rounded-md' : ''}`}>
        <input
            ref={ref}
            type="radio"
            id={id}
            value={value}
            {...rest}
        />
        <label htmlFor={id}>{label}</label>
    </div>
  );
});

RadioButton.displayName = 'RadioButton';

export default RadioButton;