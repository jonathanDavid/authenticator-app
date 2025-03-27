import React from 'react';
import { X } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onClose: () => void;
}

export function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <div className="mb-4 bg-red-900/20 text-red-400 p-3 rounded-lg flex items-center justify-between">
      <span>{message}</span>
      <button onClick={onClose}>
        <X size={20} />
      </button>
    </div>
  );
}