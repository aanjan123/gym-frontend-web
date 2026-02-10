import '@css/Auth.css';
import { LoginForm } from '@components/auth/LoginForm';

export const OwnerLogin = () => {
  return (
    <LoginForm
      role="owner"
      redirectPath="/owner/dashboard"
      showGymId
      demoCredentials={[
        { label: 'Gym ID', value: '1' },
        { label: 'Email', value: 'owner@fitzone.com.np' },
        { label: 'Password', value: 'owner123' },
      ]}
    />
  );
};
