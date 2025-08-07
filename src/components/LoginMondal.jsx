import React, { useEffect, useState } from 'react';
import { X, Mail, Lock, Loader2 } from 'lucide-react';
import { useAuth } from '../hooks/useHook';

const LoginModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { SignIn, setIsLoginModalOpen,success, setIsSignupModalOpen  , error ,isLoading , setError} = useAuth();
  const handleSubmit = async () => {
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Email and password are required!');
      return;
    }

    try {
      setIsSubmitting(true);
      await SignIn({email, password});

    } catch (err) {
      console.error('Login error:', err);
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
    if (success) {
      onClose();
    }
  };
  
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  })

  const handleSwitchToSignup = () => {
    onClose();
    setIsLoginModalOpen(false);
    setIsSignupModalOpen(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 transition"
        >
          <X size={24} className="text-gray-500" />
        </button>

        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back</h2>
          
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-center text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 text-center bg-green-100 text-green-700 rounded-md text-sm">
              {success}
            </div>
          )}

          <div className="space-y-4">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className="w-full pl-10 p-3 text-gray-700 border border-gray-300 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="w-full pl-10 p-3 border border-gray-300 text-gray-700 rounded-md outline-none focus:ring-2 focus:ring-indigo-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              <a href="#" className="text-sm text-indigo-600 hover:text-indigo-500">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
               onClick={handleSubmit}
              className="w-full cursor-pointer flex justify-center items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-md hover:bg-indigo-700 transition-all font-medium disabled:opacity-70 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting || isLoading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </button>

            {/* Sign up link */}
            <div className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{' '}
              <span onClick={handleSwitchToSignup} className="text-indigo-600 cursor-pointer hover:text-indigo-500 font-medium">
                Sign up
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;