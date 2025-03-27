import React, { useState } from 'react';
import { Mail, Lock, ArrowRight, User, Phone } from 'lucide-react';
import { useTheme } from '../theme_context';
import { Input } from './input';

interface AuthFormProps {
  isLogin: boolean;
  email: string;
  setEmail: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  name: string;
  setName: (value: string) => void;
  phone: string;
  setPhone: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function AuthForm({
  isLogin,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  phone,
  setPhone,
  onSubmit
}: AuthFormProps) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [resetEmail, setResetEmail] = useState('');

  const handleForgotPassword = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password reset logic here
    console.log('Password reset requested for:', resetEmail);
    setIsForgotPassword(false);
    setResetEmail('');
  };

  if (isForgotPassword) {
    return (
      <form onSubmit={handleForgotPassword} className="space-y-4">
        <div className="text-center mb-4">
          <h2 className={`text-xl font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Reset Password
          </h2>
          <p className={`text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            Enter your email to receive reset instructions
          </p>
        </div>

        <Input
          id="reset-email"
          type="email"
          label="Email address"
          value={resetEmail}
          onChange={setResetEmail}
          icon={<Mail size={20} />}
          placeholder="Enter your email"
          required
        />

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => setIsForgotPassword(false)}
            className={`flex-1 py-2 px-4 rounded-lg border transition-colors ${
              isDark 
                ? 'border-gray-600 hover:bg-gray-700 text-gray-300' 
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`flex-1 py-2 px-4 rounded-lg focus:ring-4 focus:ring-opacity-50 flex items-center justify-center gap-2 transition-colors ${
              isDark 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500/50' 
                : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
            }`}
          >
            <span>Reset Password</span>
            <ArrowRight size={20} />
          </button>
        </div>
      </form>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      {!isLogin && (
        <>
          <Input
            id="name"
            type="text"
            label="Full Name"
            value={name}
            onChange={setName}
            icon={<User size={20} />}
            placeholder="Enter your full name"
            required
          />
          <Input
            id="phone"
            type="tel"
            label="Phone Number"
            value={phone}
            onChange={setPhone}
            icon={<Phone size={20} />}
            placeholder="Enter your phone number"
            required
          />
        </>
      )}

      <Input
        id="email"
        type="email"
        label="Email address"
        value={email}
        onChange={setEmail}
        icon={<Mail size={20} />}
        placeholder="Enter your email"
        required
      />

      <Input
        id="password"
        type="password"
        label="Password"
        value={password}
        onChange={setPassword}
        icon={<Lock size={20} />}
        placeholder="Enter your password"
        required
      />

      {isLogin && (
        <div className="flex items-center justify-end">
          <button 
            type="button" 
            onClick={() => setIsForgotPassword(true)}
            className={`text-sm ${
              isDark 
                ? 'text-indigo-400 hover:text-indigo-300' 
                : 'text-indigo-600 hover:text-indigo-500'
            }`}
          >
            Forgot password?
          </button>
        </div>
      )}

      <button
        type="submit"
        className={`w-full py-2 px-4 rounded-lg focus:ring-4 focus:ring-opacity-50 flex items-center justify-center gap-2 transition-colors ${
          isDark 
            ? 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500/50' 
            : 'bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-500'
        }`}
      >
        <span>{isLogin ? 'Sign in' : 'Create account'}</span>
        <ArrowRight size={20} />
      </button>
    </form>
  );
}