import React from 'react';
import { Users, ClipboardCheck, DollarSign, TrendingUp } from 'lucide-react';

import { StatCard } from '@/components/StatCard';
import { OwnerDashboardData } from '@/types/OwnerDashboard';

interface Props {
  stats: OwnerDashboardData;
}

export const StatsGrid: React.FC<Props> = ({ stats }) => (
  <div className="stats-grid">
    <StatCard
      title="Active Members"
      value={stats.activeMembers}
      icon={<Users size={24} />}
    />

    <StatCard
      title="Today's Attendance"
      value={stats.todayAttendance}
      icon={<ClipboardCheck size={24} />}
    />

    <StatCard
      title="Monthly Revenue"
      value={`₹${stats.monthlyRevenue.toLocaleString()}`}
      icon={<DollarSign size={24} />}
    />

    <StatCard
      title="Pending Payments"
      value={stats.pendingPayments.count}
      icon={<TrendingUp size={24} />}
    />
  </div>
);
