import React from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/Card';
import { useAppSelector } from '@/app/hooks';
import { AttendanceChart } from '@/components/charts/AttendanceChart';
import { RevenueChart } from '@/components/charts/RevenueChart';

export const ChartsSection: React.FC = () => {
  const { stats, loading, error } = useAppSelector(
    (state) => state.ownerDashboard
  );

  return (
    <div className="charts-grid">
      <Card>
        <CardHeader title="Attendance Trend" subtitle="Last 7 days" />
        <CardContent>
          <AttendanceChart data={stats} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader title="Revenue Trend" subtitle="Last 6 months" />
        <CardContent>
          <RevenueChart data={stats} />
        </CardContent>
      </Card>
    </div>
  );
}