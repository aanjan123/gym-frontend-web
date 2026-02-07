import '@css/Auth.css';
import { LoginForm } from '@components/auth/LoginForm';

export const OwnerLogin = () => {
  return (
    <LoginForm
      role="owner"
      redirectPath="/owner/dashboard"
      showGymId
      demoCredentials={[
        { label: 'Gym ID', value: 'gym-001' },
        { label: 'Email', value: 'john@fitzone.com' },
        { label: 'Password', value: 'owner123' },
      ]}
    />
  );
};
