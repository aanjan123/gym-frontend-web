import React, { useState } from 'react';

interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder?: string;
  icon?: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  error?: string;
  required?: boolean;
  isPassword?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  type,
  label,
  placeholder,
  icon,
  value,
  onChange,
  hint,
  error,
  required,
  isPassword = false,
  disabled = false,
  fullWidth = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = isPassword ? (showPassword ? 'text' : 'password') : type;

  return (
    <div className={`form-group ${fullWidth ? 'form-group-full' : ''}`}>
      <label htmlFor={id}>{label}</label>
      <div className="input-wrapper">
        {icon}
        <input
          id={id}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          required={required}
          disabled={disabled}
        />
        {isPassword && (
          <button
            type="button"
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        )}
      </div>
      {hint && <small className="input-hint">{hint}</small>}
      {error && <span className="error-text">{error}</span>}
    </div>
  );
};
