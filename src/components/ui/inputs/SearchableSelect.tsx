import React, { useState, useRef, useEffect } from 'react';

interface Option {
  value: string;
  label: string;
}

interface SearchableSelectProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
}

const SearchableSelect: React.FC<SearchableSelectProps> = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder,
  disabled
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [prevValue, setPrevValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  // Sync search term with value if prop changes from outside
  if (value !== prevValue) {
    setPrevValue(value);
    const selected = options.find(opt => opt.value === value);
    setSearchTerm(selected ? selected.label : '');
  }

  const normalizeString = (str: string) => {
    return str
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
  };

  const filteredOptions = options
    .filter(option =>
      normalizeString(option.label).includes(normalizeString(searchTerm))
    )
    .slice(0, 10); // Limit to 10 options as requested

  const handleSelect = (option: Option) => {
    onChange(option.value);
    setSearchTerm(option.label);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      // Reset search term if no valid option was selected
      const selected = options.find(opt => opt.value === value);
      setSearchTerm(selected ? selected.label : '');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value]);

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
      <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setIsOpen(true);
            // Clear value if typing to force selection from list
            if (e.target.value === '') onChange('');
          }}
          onFocus={() => setIsOpen(true)}
          disabled={disabled}
          className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
            error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
          }`}
        />
        {isOpen && !disabled && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className="px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm text-zinc-900 dark:text-zinc-100"
                  onClick={() => handleSelect(option)}
                >
                  {option.label}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-sm text-zinc-500 italic">
                No se encontraron resultados
              </div>
            )}
          </div>
        )}
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};

export default SearchableSelect;
