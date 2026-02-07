import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, Lock } from 'lucide-react';

import { Button } from '@components/ui/Button';
import { InputField } from '@components/ui/InputField';
import { getPasswordStrength } from '@/services/password';

import { ChangePasswordSuccessModal } from '../ChangePasswordSuccessModal';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { changePassword, clearChangePasswordState } from '@/features/auth/changePasswordSlice';
import { PasswordRequirements } from '../PasswordRequirements';

interface ChangePasswordFormProps {
  userId?: number;
  requirePasswordChange?: boolean;
}

export const ChangePasswordForm: React.FC<ChangePasswordFormProps> = ({
  userId,
  requirePasswordChange
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, success } = useAppSelector(
    (state) => state.changePassword
  );

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const validatePassword = (password: string): string[] => {
    const errs: string[] = [];
    if (password.length < 8) errs.push('At least 8 characters');
    if (!/[A-Z]/.test(password)) errs.push('One uppercase letter');
    if (!/[a-z]/.test(password)) errs.push('One lowercase letter');
    if (!/[0-9]/.test(password)) errs.push('One number');
    if (!/[!@#$%^&*]/.test(password)) errs.push('One special character (!@#$%^&*)');
    return errs;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!formData.currentPassword) newErrors.currentPassword = 'Current password required';
    const passwordErrors = validatePassword(formData.newPassword);
    if (passwordErrors.length > 0) newErrors.newPassword = passwordErrors[0];
    if (formData.newPassword === formData.currentPassword)
      newErrors.newPassword = 'New password must differ from current';
    if (formData.newPassword !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    dispatch(changePassword({ userId: userId!, oldPassword: formData.currentPassword, newPassword: formData.newPassword }));
  };

  const handleSuccessClose = () => {
    navigate('/owner/login');
    dispatch(clearChangePasswordState());
  };

  const passwordStrength = formData.newPassword ? getPasswordStrength(formData.newPassword) : null;

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <Building2 size={32} />
          </div>
          <h1 className="auth-title">Change Password</h1>
          <p className="auth-subtitle">Please set a new secure password</p>
        </div>

        {requirePasswordChange && (
          <div className="auth-info-box">
            <p className="info-title">⚠️ Password Change Required</p>
            <p className="info-text">
              You must change your temporary password before continuing.
            </p>
          </div>
        )}

        {error && (
          <div className="auth-error-box">
            <p className="error-text">{error}</p>
          </div>
        )}

        <form className="auth-form" onSubmit={handleSubmit}>
          <InputField
            id="currentPassword"
            label="Current Password"
            placeholder="Enter your current password"
            value={formData.currentPassword}
            onChange={handleChange('currentPassword')}
            isPassword
            error={errors.currentPassword}
            icon={<Lock className="input-icon" size={18} />}
            type='password'
          />

          <InputField
            id="newPassword"
            label="New Password"
            placeholder="Enter your new password"
            value={formData.newPassword}
            onChange={handleChange('newPassword')}
            isPassword
            error={errors.newPassword}
            icon={<Lock className="input-icon" size={18} />}
            type='password'
          />

          {passwordStrength && (
            <div className="password-strength">
              <div className="strength-bar-container">
                <div
                  className="strength-bar"
                  style={{
                    width: passwordStrength.width,
                    backgroundColor: passwordStrength.color,
                  }}
                />
              </div>
              <span className="strength-text" style={{ color: passwordStrength.color }}>
                {passwordStrength.strength}
              </span>
            </div>
          )}

          <InputField
            id="confirmPassword"
            label="Confirm New Password"
            placeholder="Confirm your new password"
            value={formData.confirmPassword}
            onChange={handleChange('confirmPassword')}
            isPassword
            error={errors.confirmPassword}
            icon={<Lock className="input-icon" size={18} />}
            type='password'
          />

          <PasswordRequirements password={formData.newPassword} />

          <Button type="submit" fullWidth loading={loading}>
            Change Password
          </Button>
        </form>
      </div>

      <ChangePasswordSuccessModal
        isOpen={!!success}
        onClose={handleSuccessClose}
        message={`${success || 'Your password has been changed successfully!'}`}
      />
    </div>
  );
};
