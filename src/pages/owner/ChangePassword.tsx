import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { ChangePasswordForm } from '@/components/auth/ChangePasswordForm';

interface LocationState {
  userId?: number;
  requirePasswordChange?: boolean;
}

export const ChangePassword = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState;

  const userId = state?.userId;

  useEffect(() => {
    if (!userId) navigate('/owner/login')
  }, [userId]);

  return (
    <ChangePasswordForm
      userId={userId}
      requirePasswordChange={state?.requirePasswordChange}
    />
  );
};
