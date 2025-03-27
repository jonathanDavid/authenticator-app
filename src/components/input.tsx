import React from 'react';
import { useTheme } from '../theme_context';

interface InputProps {
  id: string;
  type: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  icon: React.ReactNode;
  placeholder: string;
  required?: boolean;
}

export function Input({
  id,
  type,
  label,
  value,
  onChange,
  icon,
  placeholder,
  required
}: InputProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div>
      <label htmlFor={id} className={`block text-sm font-medium mb-1 ${
        isDark ? 'text-gray-300' : 'text-gray-700'
      }`}>
        {label}
      </label>
      <div className="relative">
        <div className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${
          isDark ? 'text-gray-500' : 'text-gray-400'
        }`}>
          {icon}
        </div>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={`pl-10 w-full px-4 py-2 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
            isDark 
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
          placeholder={placeholder}
          required={required}
        />
      </div>
    </div>
  );
}