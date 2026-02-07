
interface AuthFooterProps {
  role: 'superadmin' | 'owner';
}

const AuthFooter: React.FC<AuthFooterProps> = ({ role }) => (
  <div className="auth-footer">
    <p>
      {role === 'superadmin' ? 'Gym Owner?' : 'Super Admin?'}{' '}
      <a href={role === 'superadmin' ? '/owner/login' : '/'} className="auth-link">
        Login here
      </a>
    </p>
  </div>
);

export default AuthFooter;