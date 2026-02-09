import React, { useState } from 'react';
import { Payment } from '@/types/Payments';
import { Button } from '@components/ui/Button';
import { ConfirmationModal } from '@/components/ConfirmationModal';

interface PaymentActionsProps {
  payment: Payment;
  onUpdate: (paymentId: number, data: any) => void;
  onSendRequest: (paymentId: number, message?: string) => void;
}

type ActionType = 'markPaid' | 'request' | null;

export const PaymentActions: React.FC<PaymentActionsProps> = ({
  payment,
  onUpdate,
  onSendRequest,
}) => {
  const [loading, setLoading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<ActionType>(null);

  const openConfirmation = (action: ActionType) => {
    setPendingAction(action);
    setConfirmOpen(true);
  };

  const handleConfirm = async () => {
    if (!pendingAction) return;

    setLoading(true);

    if (pendingAction === 'markPaid') {
      await onUpdate(payment.id, {
        status: 'paid',
        amount: payment.amount,
        paymentMethod: 'Cash',
      });
    }

    if (pendingAction === 'request') {
      await onSendRequest(payment.id);
    }

    setLoading(false);
    setConfirmOpen(false);
    setPendingAction(null);
  };

  return (
    <div style={{ display: 'flex', gap: '0.5rem' }}>
      <Button
        size="sm"
        onClick={() => openConfirmation('markPaid')}
        disabled={loading}
      >
        Mark Paid
      </Button>

      <Button
        size="sm"
        variant={'secondary'}
        onClick={() => openConfirmation('request')}
        disabled={loading}
      >
        Request
      </Button>

      <ConfirmationModal
        title="Confirm Action"
        description={
          pendingAction === 'markPaid'
            ? 'Are you sure you want to mark this payment as paid?'
            : 'Are you sure you want to send a payment request?'
        }
        onClose={() => {
          setConfirmOpen(false);
          setPendingAction(null);
        }}
        onConfirm={handleConfirm}
        open={confirmOpen}
      />
    </div>
  );
};
