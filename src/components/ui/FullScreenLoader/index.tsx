import React, { useEffect } from 'react';
import { Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import './index.css';
import { useAppSelector } from '@/app/hooks';

interface FullScreenLoaderProps {
  message?: string;
}

export const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({
  message = 'Please wait...'
}) => {

  const navigate = useNavigate();
  const { user, initializing } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (initializing) return
    if (user) {
      if (user?.role === 'owner') {
        navigate('/owner/dashboard');
        return
      } else {
        navigate('/admin/dashboard');
      }
    } else {
      navigate('/admin/login');
    }
  }, [user, initializing])

  return (
    <div className="fullscreen-loader">
      <div className="loader-card">
        <div className="loader-icon">
          <Building2 size={36} />
        </div>

        <div className="spinner" />

        <p className="loader-message">{message}</p>
      </div>
    </div>
  );
};
