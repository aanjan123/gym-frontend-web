import React, { useEffect } from 'react';
import { Building2, Users, TrendingUp, DollarSign } from 'lucide-react';
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

import { Table } from '@components/ui/Table';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import { fetchDashboardStats } from '@features/dashboard/dashboardSlice';
import { Card, CardHeader, CardContent } from '@components/ui/Card';

import '../Dashboard.css';
import { StatCard } from '@/components/StatCard';

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats: dashboardData, loading } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(fetchDashboardStats())
  }, []);

  if (loading) {
    return <div className="dashboard-loading">Loading dashboard...</div>;
  }

  if (!dashboardData) {
    return <div className="dashboard-error">Failed to load dashboard data</div>;
  }

  const { gyms, members, revenue, topPerformingGyms } = dashboardData;

  const gymStatusData = Object.entries(gyms.byStatus).map(([status, count]) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1),
    value: count,
    color:
      {
        active: '#10b981',
        suspended: '#f59e0b',
        inactive: '#ef4444',
      }[status] || '#6b7280',
  }));

  const revenueChartData = topPerformingGyms.map((gym) => ({
    name: gym.name.length > 15 ? gym.name.substring(0, 15) + '...' : gym.name,
    revenue: parseFloat(gym.totalRevenue),
  }));

  const columns = [
    {
      header: 'Gym Name',
      accessor: 'name' as const,
      width: '30%',
    },
    {
      header: 'Status',
      accessor: (gym: (typeof topPerformingGyms)[0]) => (
        <span className={`status-badge status-${gym.status}`}>
          {gym.status.charAt(0).toUpperCase() + gym.status.slice(1)}
        </span>
      ),
      width: '15%',
    },
    {
      header: 'Active Members',
      accessor: 'activeMembers' as const,
      width: '15%',
      align: 'center' as const,
    },
    {
      header: 'Total Revenue',
      accessor: (gym: (typeof topPerformingGyms)[0]) =>
        `Rs. ${parseFloat(gym.totalRevenue).toLocaleString('en-IN')}`,
      width: '25%',
      align: 'right' as const,
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Platform overview and statistics</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Total Gyms"
          value={gyms.total}
          icon={<Building2 size={24} />}
          trend={`${gyms.active} active`}
          trendUp={true}
        />
        <StatCard
          title="Total Members"
          value={members.total}
          icon={<Users size={24} />}
          trend={`${members.active} active`}
          trendUp={true}
        />
        <StatCard
          title="This Month Revenue"
          value={`Rs. ${(revenue.thisMonth / 100000).toFixed(1)}L`}
          icon={<DollarSign size={24} />}
          trend={`Total: Rs. ${(revenue.total / 100000).toFixed(1)}L`}
          trendUp={true}
        />
        <StatCard
          title="Pending Payments"
          value={revenue.pendingPayments}
          icon={<TrendingUp size={24} />}
          trend="Awaiting settlement"
          trendUp={false}
        />
      </div>

      <div className="charts-grid">
        <Card>
          <CardHeader title="Revenue by Top Gyms" subtitle="Total revenue distribution" />
          <CardContent>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueChartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="name" stroke="#737373" angle={-45} textAnchor="end" height={80} />
                  <YAxis stroke="#737373" />
                  <Tooltip
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                    }}
                    formatter={(value) =>
                      `Rs. ${typeof value === 'number' ? value.toLocaleString('en-IN') : value}`
                    }
                  />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Gyms by Status" subtitle="Current distribution" />
          <CardContent>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={gymStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {gymStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader title="Top Performing Gyms" subtitle="Based on revenue and active members" />
        <CardContent>
          <Table data={topPerformingGyms} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};