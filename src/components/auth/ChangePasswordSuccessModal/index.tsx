import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { CheckCircle } from "lucide-react";

interface ChangePasswordSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const ChangePasswordSuccessModal: React.FC<ChangePasswordSuccessModalProps> = ({ isOpen, onClose, message }) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Success!" size="sm">
    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
      <div
        style={{
          width: '64px',
          height: '64px',
          background: 'var(--success-light)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1rem',
        }}
      >
        <CheckCircle size={32} color="var(--success)" />
      </div>
      <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>{message}</h3>
      <p style={{ margin: '0 0 1.5rem 0', color: 'var(--text-secondary)' }}>
        Your password has been updated. You can now access your account with your new password.
      </p>
      <Button onClick={onClose} fullWidth>
        Continue
      </Button>
    </div>
  </Modal>
);
