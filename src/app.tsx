import React, { useState } from 'react';
import { useTheme } from './theme_context';
import { ThemeToggle } from './components/theme_toggle';
import { ErrorMessage } from './components/error_message';
import { AuthForm } from './components/auth_form';
import { SocialButtons } from './components/social_buttons';
import { ParticleBackground } from './components/particle_background';

function App() {
  const { theme } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear any previous errors
  };

  const isDark = theme === 'dark';

  return (
    <>
      <ParticleBackground />
      <div className={`relative min-h-screen flex items-center justify-center p-4 bg-transparent`}>
        <div className={`w-full max-w-md rounded-2xl shadow-xl p-8 ${
          isDark ? 'bg-gray-800/80' : 'bg-white/80'
        } backdrop-blur-sm`}>
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>

          <div className="text-center mb-8">
            <h1 className={`text-3xl font-bold mb-2 ${
              isDark ? 'text-white' : 'text-gray-900'
            }`}>
              {isLogin ? 'Welcome back' : 'Create account'}
            </h1>
            <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>
              {isLogin
                ? 'Sign in to access your account'
                : 'Sign up to get started with our platform'}
            </p>
          </div>

          <ErrorMessage 
            message={error} 
            onClose={() => setError('')} 
          />

          <AuthForm
            isLogin={isLogin}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            name={name}
            setName={setName}
            phone={phone}
            setPhone={setPhone}
            onSubmit={handleSubmit}
          />

          <SocialButtons />

          <p className={`mt-8 text-center text-sm ${
            isDark ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className={isDark 
                ? 'font-medium text-indigo-400 hover:text-indigo-300' 
                : 'font-medium text-indigo-600 hover:text-indigo-500'
              }
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default App;