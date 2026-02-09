import React from 'react';
import { CheckCircle, AlertCircle, X } from 'lucide-react';
import './index.css';

interface ToastProps {
  type: 'success' | 'error';
  message: string;
  duration?: number;
  onClose?: () => void;
}

export const Toast: React.FC<ToastProps> = ({
  type,
  message,
  duration = 3000,
  onClose,
}) => {
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        {type === 'success' ? (
          <CheckCircle size={20} className="toast-icon" />
        ) : (
          <AlertCircle size={20} className="toast-icon" />
        )}
        <span className="toast-message">{message}</span>
      </div>
      <button
        className="toast-close"
        onClick={() => setIsVisible(false)}
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};