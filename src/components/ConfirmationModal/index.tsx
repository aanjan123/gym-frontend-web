import React from 'react';
import { Card, CardHeader } from '@/components/ui/Card';
import { CommonFooterButtons } from '../CommonFooterButtons';

interface ConfirmationModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  open,
  title,
  description,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onClose,
}) => {
  if (!open) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />

      <Card className="modal-card animate-scale-in">
        <CardHeader title={title} subtitle={description} />

        <CommonFooterButtons
          loading={loading}
          onClose={onClose}
          onConfirm={onConfirm}
          cancelText={cancelText}
          confirmText={confirmText}
          variant={variant}
        />
      </Card>
    </div>
  );
};
