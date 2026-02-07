import { LoginForm } from '@components/auth/LoginForm';

export const SuperAdminLogin = () => {
  return (
    <LoginForm
      role="superadmin"
      redirectPath="/admin/dashboard"
      demoCredentials={[
        { label: 'Email', value: 'superadmin@gymplatform.com' },
        { label: 'Password', value: 'SuperAdmin@123' },
      ]}
    />
  );
};
