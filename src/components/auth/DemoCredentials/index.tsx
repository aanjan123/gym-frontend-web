
interface DemoCredentialsProps {
  credentials: { label: string; value: string }[];
}

const DemoCredentials: React.FC<DemoCredentialsProps> = ({ credentials }) => (
  <div className="auth-demo-credentials">
    <p className="demo-title">Demo Credentials:</p>
    {credentials.map((cred, idx) => (
      <p key={idx} className="demo-info">
        {cred.label}: {cred.value}
      </p>
    ))}
  </div>
);

export default DemoCredentials;
