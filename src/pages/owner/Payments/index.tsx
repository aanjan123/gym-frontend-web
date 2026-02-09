import { IndianRupee } from 'lucide-react';
import React, { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { PaymentsTable } from '@components/Payments/PaymentsTable';
import { Card, CardHeader, CardContent } from '@components/ui/Card';
import { PaymentsFilters } from '@components/Payments/PaymentsFilters';
import {
  fetchPayments,
  updatePayment,
  sendPaymentRequest,
  sendPaymentReminder,
} from '@/features/Payments/paymentsSlice';
import './index.css';
import { Toast } from '@/components/ui/Toast';

export const Payments: React.FC = () => {
  const dispatch = useAppDispatch();
  const { payments, loading, error, message } = useAppSelector(
    (state) => state.payments
  );

  const [filters, setFilters] = useState({
    memberId: undefined,
    packageId: undefined,
    status: undefined as 'paid' | 'pending' | 'overdue' | undefined,
    search: '',
    page: 1,
    limit: 50,
  });

  useEffect(() => {
    dispatch(fetchPayments(filters));
  }, [dispatch, filters.status]);

  const totalDue = payments.reduce(
    (sum, p) => sum + (p.status !== 'paid' ? parseFloat(p.amount) : 0),
    0
  );

  const paidThisMonth = payments.filter((p) => p.status === 'paid').length;

  const filteredPayments = payments.filter((p) => {
    if (!filters.search) return true;

    const q = filters.search.toLowerCase();

    return (
      p.fullName?.toLowerCase().includes(q) ||
      p.email?.toLowerCase().includes(q) ||
      p.memberCode?.toLowerCase().includes(q)
    );
  });


  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Payments</h1>
          <p className="page-subtitle">Track member payments and dues</p>
        </div>
      </div>

      <div className="stats-grid">
        <Card className="stat-card">
          <div className="stat-card-content">
            <div className="stat-info">
              <p className="stat-title">Total Due</p>
              <h2 className="stat-value">Rs. {totalDue.toLocaleString()}</h2>
            </div>
            <div className="stat-icon">
              <IndianRupee size={24} />
            </div>
          </div>
        </Card>

        <Card className="stat-card">
          <div className="stat-card-content">
            <div className="stat-info">
              <p className="stat-title">Paid This Month</p>
              <h2 className="stat-value">{paidThisMonth}</h2>
              <p className="stat-trend trend-up">
                Out of {payments.length} payments
              </p>
            </div>
            <div className="stat-icon">
              <IndianRupee size={24} />
            </div>
          </div>
        </Card>
      </div>

      <PaymentsFilters
        filters={filters}
        loading={loading}
        setFilters={setFilters}
      />

      <Card>
        <CardHeader
          title="Payment Overview"
          subtitle="All member payment status"
        />
        <CardContent>
          <PaymentsTable
            loading={loading}
            payments={filteredPayments}
            onUpdate={(paymentId, data) => dispatch(updatePayment(paymentId, data))}
            onSendReminder={(paymentId) => dispatch(sendPaymentReminder(paymentId))}
            onSendRequest={(paymentId, message) => dispatch(sendPaymentRequest(paymentId, message))}
          />
        </CardContent>
      </Card>

      {error && <Toast type={'error'} message={error} />}
      {message && <Toast type={'success'} message={message} />}
    </div>
  );
};
