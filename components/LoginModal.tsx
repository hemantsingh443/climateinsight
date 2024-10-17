// components/LoginModal.tsx

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface User {
  id: number; // Change this to 'number'
  username: string; 
  displayName: string;
}

interface LoginModalProps {
  onClose: () => void;
  darkMode: boolean;
  onLoginSuccess?: (user: User) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, darkMode, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.username || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        if (onLoginSuccess) {
          onLoginSuccess(data.user);
        }
        onClose();
      } else {
        setError(data.message || 'Login failed.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleLogin} className={`p-6 space-y-4 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <div className="space-y-2">
        <h2 className="text-2xl font-bold">Log In</h2>
        <p className="text-sm text-gray-500">Please enter your credentials to log in.</p>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
        <Button type="button" variant="outline" onClick={onClose} className="w-full" disabled={loading}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default LoginModal;

