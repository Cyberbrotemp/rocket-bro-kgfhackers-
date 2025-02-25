import React, { useState } from 'react';
import { User } from '../types';
import { saveUser, authenticateUser } from '../utils/storage';
import { RocketIcon, UserCircle, Mail, Lock } from 'lucide-react';

interface AuthFormProps {
  onAuth: (user: User) => void;
}

export const AuthForm: React.FC<AuthFormProps> = ({ onAuth }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    imageUrl: '',
  });
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const user = authenticateUser(formData.email, formData.password);
      if (user) {
        onAuth(user);
      } else {
        setError('Invalid credentials');
      }
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        ...formData,
      };
      saveUser(newUser);
      onAuth(newUser);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl">
      <div className="flex items-center justify-center mb-8">
        <RocketIcon className="w-12 h-12 text-blue-500" />
      </div>
      <h2 className="text-3xl font-bold text-center mb-8 text-white">
        {isLogin ? 'Welcome Back' : 'Join the Mission'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-200">Username</label>
            <div className="mt-1 relative">
              <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-gray-200">Email</label>
          <div className="mt-1 relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-200">Password</label>
          <div className="mt-1 relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="password"
              required
              className="pl-10 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>
        {!isLogin && (
          <div>
            <label className="block text-sm font-medium text-gray-200">Profile Image URL</label>
            <input
              type="url"
              required
              className="mt-1 w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
            />
          </div>
        )}
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-colors"
        >
          {isLogin ? 'Sign In' : 'Create Account'}
        </button>
      </form>
      <p className="mt-4 text-center text-gray-300">
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-400 hover:text-blue-300"
        >
          {isLogin ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  );
};