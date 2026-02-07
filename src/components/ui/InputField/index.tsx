interface InputFieldProps {
  id: string;
  type: string;
  label: string;
  placeholder: string;
  icon: React.ReactNode;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  hint?: string;
  required?: boolean;
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
  required,
}) => (
  <div className="form-group">
    <label htmlFor={id}>{label}</label>
    <div className="input-wrapper">
      {icon}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
    {hint && <small className="input-hint">{hint}</small>}
  </div>
);


 {/* <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" size={18} />
              <input
                id="email"
                type="email"
                placeholder="admin@gymsaas.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div> */}
