import React, { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { CommonFooterButtons } from '@/components/CommonFooterButtons';

import './index.css'

interface SuspendGymModalProps {
  suspending: boolean;
  onClose: () => void;
  onConfirm: (reason: string) => void;
}

export const SuspendGymModal: React.FC<SuspendGymModalProps> = ({
  suspending,
  onClose,
  onConfirm,
}) => {

  const [suspendReason, setSuspendReason] = useState('');

  const maxLength = 300;

  return (
    <div className="modal-overlay">
      <div className="modal-backdrop" onClick={onClose} />

      <Card className="modal-card animate-scale-in">
        <CardHeader title=' Suspend Gym' subtitle='This action will immediately restrict gym access' />

        <CardContent>
          <p className="mb-3 text-sm text-gray-600">
            Please provide a clear reason. The gym owner will see this message.
          </p>

          <div className="relative">
            <textarea
              value={suspendReason}
              onChange={(e) => setSuspendReason(e.target.value)}
              placeholder="Example: Subscription payment overdue for 15 days…"
              rows={4}
              maxLength={maxLength}
              disabled={suspending}
              className="suspend-textarea"
            />

            <span className="char-counter">
              {suspendReason.length}/{maxLength}
            </span>
          </div>

          <CommonFooterButtons
            loading={suspending}
            onClose={onClose}
            onConfirm={() => onConfirm(suspendReason.trim())}
            confirmText={suspending ? 'Suspending…' : 'Confirm Suspension'}
          />
        </CardContent>
      </Card>
    </div>
  );
};
