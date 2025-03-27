import React from 'react';
import { Github, Chrome, Facebook, Microscope as Microsoft } from 'lucide-react';
import { useTheme } from '../theme_context';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
}

function SocialButton({ icon, label }: SocialButtonProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className={`w-full border rounded-lg py-2 px-4 flex items-center justify-center gap-2 transition-colors ${
        isDark 
          ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
          : 'border-gray-300 hover:bg-gray-50 text-gray-700'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function SocialButtons() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className="mt-6">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className={`w-full border-t ${
            isDark ? 'border-gray-600' : 'border-gray-300'
          }`}></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className={`px-2 ${
            isDark ? 'bg-gray-800 text-gray-400' : 'bg-white text-gray-500'
          }`}>Or continue with</span>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        <SocialButton icon={<Github size={20} />} label="GitHub" />
        <SocialButton icon={<Chrome size={20} />} label="Google" />
        <SocialButton icon={<Facebook size={20} />} label="Facebook" />
        <SocialButton icon={<Microsoft size={20} />} label="Microsoft" />
      </div>
    </div>
  );
}