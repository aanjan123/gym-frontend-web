export const PasswordRequirements: React.FC<{ password: string }> = ({ password }) => (
  <div className="password-requirements">
    <p className="requirements-title">Password must contain:</p>
    <ul className="requirements-list">
      <li className={password.length >= 8 ? 'requirement-met' : ''}>At least 8 characters</li>
      <li className={/[A-Z]/.test(password) ? 'requirement-met' : ''}>One uppercase letter</li>
      <li className={/[a-z]/.test(password) ? 'requirement-met' : ''}>One lowercase letter</li>
      <li className={/[0-9]/.test(password) ? 'requirement-met' : ''}>One number</li>
      <li className={/[!@#$%^&*]/.test(password) ? 'requirement-met' : ''}>
        One special character (!@#$%^&*)
      </li>
    </ul>
  </div>
);