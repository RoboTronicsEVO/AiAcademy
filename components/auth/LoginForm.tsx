/* eslint-disable react/jsx-no-bind */
'use client';

import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { validationRules } from '@/lib/validation';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo - check hardcoded credentials
      if (email === 'demo@syrarobot.com' && password === 'password123') {
        router.push('/dashboard');
      } else {
        setError('Invalid email or password. Try demo@syrarobot.com / password123');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      {/* Email Field */}
      <Input
        type="email"
        label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        validationRules={validationRules.email}
        placeholder="Enter your email"
        autoComplete="email"
        required
        data-testid="login-email"
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
          </svg>
        }
      />

      {/* Password Field */}
      <Input
        type="password"
        label="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        validationRules={{ required: true, minLength: 8 }}
        placeholder="Enter your password"
        autoComplete="current-password"
        required
        data-testid="login-password"
        leftIcon={
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        }
      />

      {/* Forgot Password Link */}
      <div className="flex justify-end">
        <Link 
          href="/forgot-password"
          className="text-sm text-primary-500 hover:text-primary-600 focus:outline-none focus:underline"
        >
          Forgot password?
        </Link>
      </div>

      {/* Global Error Message */}
      {error && (
        <div 
          className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm flex items-center gap-2"
          role="alert"
          aria-live="polite"
        >
          <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      {/* Submit Button */}
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
        data-testid="login-submit"
      >
        {isLoading ? 'Signing in...' : 'Sign in'}
      </Button>

      {/* Demo Hint */}
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-sm text-blue-800">
          <strong>Demo credentials:</strong><br />
          Email: demo@syrarobot.com<br />
          Password: password123
        </p>
      </div>
    </form>
  );
};

export default LoginForm;