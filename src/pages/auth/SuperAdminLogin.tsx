import { LoginForm } from '@components/auth/LoginForm';

export const SuperAdminLogin = () => {
  return (
    <LoginForm
      role="superadmin"
      redirectPath="/admin/dashboard"
      demoCredentials={[
        { label: 'Email', value: 'admin@gymsaas.com' },
        { label: 'Password', value: 'admin123' },
      ]}
    />
  );
};
