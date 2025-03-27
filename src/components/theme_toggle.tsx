import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../theme_context';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`p-2 rounded-lg ${
        isDark 
          ? 'text-gray-400 hover:text-gray-200' 
          : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      {isDark ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}