import React from 'react';
import { DollarSign } from 'lucide-react';
import { useAppSelector } from '../../app/hooks';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import '../admin/Dashboard.css';

export const Payments: React.FC = () => {
  const { members } = useAppSelector((state) => state.members);

  const totalDue = members.reduce((sum, m) => sum + (m.paymentStatus !== 'paid' ? m.amountDue : 0), 0);
  const paidThisMonth = members.filter((m) => m.paymentStatus === 'paid').length;

  const columns = [
    { header: 'Member', accessor: 'name' as const },
    {
      header: 'Payment Status',
      accessor: (member: typeof members[0]) => (
        <span className={`status-badge status-${member.paymentStatus}`}>
          {member.paymentStatus.charAt(0).toUpperCase() + member.paymentStatus.slice(1)}
        </span>
      ),
    },
    {
      header: 'Amount Due',
      accessor: (member: typeof members[0]) =>
        member.amountDue > 0 ? `$${member.amountDue}` : '-',
    },
    {
      header: 'Last Payment',
      accessor: (member: typeof members[0]) => new Date(member.lastPaymentDate).toLocaleDateString(),
    },
    {
      header: 'Expiry',
      accessor: (member: typeof members[0]) => new Date(member.expiryDate).toLocaleDateString(),
    },
  ];

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
              <h2 className="stat-value">${totalDue.toLocaleString()}</h2>
            </div>
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
          </div>
        </Card>
        <Card className="stat-card">
          <div className="stat-card-content">
            <div className="stat-info">
              <p className="stat-title">Paid This Month</p>
              <h2 className="stat-value">{paidThisMonth}</h2>
              <p className="stat-trend trend-up">Out of {members.length} members</p>
            </div>
            <div className="stat-icon">
              <DollarSign size={24} />
            </div>
          </div>
        </Card>
      </div>

      <Card style={{ marginTop: '1.5rem' }}>
        <CardHeader title="Payment Overview" subtitle="All member payment status" />
        <CardContent>
          <Table data={members} columns={columns} emptyMessage="No payment records" />
        </CardContent>
      </Card>
    </div>
  );
};
