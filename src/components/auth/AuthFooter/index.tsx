import { Link } from 'react-router-dom';

interface AuthFooterProps {
  role: 'superadmin' | 'owner';
}

const AuthFooter: React.FC<AuthFooterProps> = ({ role }) => (
  <div className="auth-footer">
    <p>
      {role === 'superadmin' ? 'Gym Owner?' : 'Super Admin?'}{' '}
      <Link to={role === 'superadmin' ? '/owner/login' : '/'} className="auth-link">
        Login here
      </Link>
    </p>
  </div>
);

export default AuthFooter;