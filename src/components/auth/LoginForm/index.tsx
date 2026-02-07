import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { Building2, Mail, Lock, Hash } from 'lucide-react';

import { Button } from '@components/ui/Button';
import { InputField } from '@components/ui/InputField';
import { login, clearError } from '@features/auth/authSlice';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';

import AuthFooter from '../AuthFooter';
import DemoCredentials from '../DemoCredentials';

interface LoginFormProps {
  role: 'superadmin' | 'owner';
  redirectPath: string;
  showGymId?: boolean;
  demoCredentials?: { label: string; value: string }[];
}

export const LoginForm: React.FC<LoginFormProps> = ({
  role,
  redirectPath,
  showGymId = false,
  demoCredentials = [],
}) => {
  const [gymId, setGymId] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error, isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isAuthenticated && user?.role === role) {
      if (user?.role === 'owner' && user?.requirePasswordChange) {
        navigate('/change-password', { state: { userId: user.userId, requirePasswordChange: true } });
        return
      }
      navigate(redirectPath);
    }
  }, [isAuthenticated, user, role, navigate, redirectPath]);

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showGymId) {
      dispatch(login(email, password, gymId) as any);
    } else {
      dispatch(login(email, password) as any);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Building2 size={32} />
          </div>
          <h1 className="auth-title">
            {role === 'superadmin' ? 'Super Admin Login' : 'Gym Owner Login'}
          </h1>
          <p className="auth-subtitle">
            {role === 'superadmin'
              ? 'Access the platform control center'
              : 'Manage your gym and members'}
          </p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          {error && <div className="auth-error">{error}</div>}

          {showGymId && (
            <InputField
              id="gymId"
              type="text"
              label="Gym ID"
              placeholder="gym-001"
              icon={<Hash className="input-icon" size={18} />}
              value={gymId}
              onChange={(e) => setGymId(e.target.value)}
              hint="Your unique gym identifier"
              required
            />
          )}

          <InputField
            id="email"
            type="email"
            label="Email Address"
            placeholder="admin@gymsaas.com"
            icon={<Mail className="input-icon" size={18} />}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <InputField
            id="password"
            type="password"
            label="Password"
            placeholder="Enter your password"
            icon={<Lock className="input-icon" size={18} />}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            isPassword
          />

          <Button type="submit" fullWidth loading={loading}>
            Sign In
          </Button>

          {demoCredentials.length > 0 && (
            <DemoCredentials credentials={demoCredentials} />
          )}
        </form>

        <AuthFooter role={role} />
      </div>
    </div >
  );
};
