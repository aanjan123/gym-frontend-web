import React from 'react';
import { Table } from '@/components/ui/Table';
import { Payment } from '@/types/Payments';
import { PaymentActions } from '../PaymentActions';

interface PaymentsTableProps {
  payments: Payment[];
  loading?: boolean;
  onUpdate: (paymentId: number, data: any) => void;
  onSendReminder: (paymentId: number) => void;
  onSendRequest: (paymentId: number, message?: string) => void;
}

export const PaymentsTable: React.FC<PaymentsTableProps> = ({
  payments,
  loading = false,
  onUpdate,
  onSendReminder,
  onSendRequest,
}) => {
  const columns = [
    { header: 'Member', accessor: 'fullName' as const },
    { header: 'Email', accessor: 'email' as const },
    {
      header: 'Status',
      accessor: (p: Payment) => (
        <span className={`status-badge status-${p.status}`}>{p.status}</span>
      ),
    },
    { header: 'Amount', accessor: (p: Payment) => `Rs.${p.amount}` },
    {
      header: 'Payment Month',
      accessor: (p: Payment) => new Date(p.paymentMonth).toLocaleDateString(),
    },
    {
      header: 'Actions',
      accessor: (p: Payment) => (
        <PaymentActions
          payment={p}
          onUpdate={onUpdate}
          onSendReminder={onSendReminder}
          onSendRequest={onSendRequest}
        />
      ),
    },
  ];

  return (
    <Table
      data={payments}
      columns={columns}
      loading={loading}
      emptyMessage="No payments found"
    />
  );
};
