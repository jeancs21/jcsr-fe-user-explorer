import { useState, useRef, useEffect } from 'react';
import { normalizeString } from '../../../utils/stringUtils';

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

const SearchableSelect = ({
  label,
  options,
  value,
  onChange,
  error,
  placeholder,
  disabled
}: SearchableSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isOtherMode, setIsOtherMode] = useState(false);
  const [prevValue, setPrevValue] = useState(value);
  const containerRef = useRef<HTMLDivElement>(null);

  if (value !== prevValue) {
    setPrevValue(value);
    const selected = options.find(opt => opt.value === value);
    if (selected) {
      if (selected.value === 'other') {
        setIsOtherMode(true);
        setSearchTerm('');
      } else {
        setIsOtherMode(false);
        setSearchTerm(selected.label);
      }
    } else {
      if (value) {
        setIsOtherMode(true);
        setSearchTerm(value);
      } else {
        setIsOtherMode(false);
        setSearchTerm('');
      }
    }
  }

  const filteredOptions = options
    .filter(option =>
      normalizeString(option.label).includes(normalizeString(searchTerm)) ||
      option.value === 'other'
    )
    .slice(0, 11);

  const handleSelect = (option: Option) => {
    if (option.value === 'other') {
      setIsOtherMode(true);
      setSearchTerm('');
      onChange('');
      setIsOpen(false);
    } else {
      setIsOtherMode(false);
      onChange(option.value);
      setSearchTerm(option.label);
      setIsOpen(false);
    }
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false);
      if (!isOtherMode) {
        const selected = options.find(opt => opt.value === value);
        setSearchTerm(selected ? selected.label : '');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [value, isOtherMode]);

  return (
    <div className="flex flex-col gap-2 w-full relative" ref={containerRef}>
      <div className="flex justify-between items-center">
        <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
          {label}
        </label>
        {isOtherMode && (
          <button
            type="button"
            onClick={() => {
              setIsOtherMode(false);
              onChange('');
              setSearchTerm('');
            }}
            className="text-xs text-blue-600 hover:underline dark:text-blue-400"
          >
            Volver al listado
          </button>
        )}
      </div>
      <div className="relative">
        <input
          type="text"
          placeholder={isOtherMode ? 'Escribe el nombre de la ciudad...' : placeholder}
          value={searchTerm}
          onChange={(e) => {
            const newVal = e.target.value;
            setSearchTerm(newVal);
            if (isOtherMode) {
              onChange(newVal);
            } else {
              setIsOpen(true);
              if (newVal === '') onChange('');
            }
          }}
          onFocus={() => !isOtherMode && setIsOpen(true)}
          disabled={disabled}
          className={`w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all dark:bg-zinc-800 dark:border-zinc-700 dark:text-white ${
            error ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-300'
          }`}
        />
        {isOpen && !disabled && !isOtherMode && (
          <div className="absolute z-50 w-full mt-1 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-md shadow-lg max-h-60 overflow-auto">
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <div
                  key={option.value}
                  className={`px-4 py-2 hover:bg-zinc-100 dark:hover:bg-zinc-700 cursor-pointer text-sm ${
                    option.value === 'other'
                      ? 'border-t border-zinc-100 dark:border-zinc-700 font-medium text-blue-600 dark:text-blue-400'
                      : 'text-zinc-900 dark:text-zinc-100'
                  }`}
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
