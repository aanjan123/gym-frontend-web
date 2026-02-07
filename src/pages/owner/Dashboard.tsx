import React, { useEffect } from 'react';
import { Users, TrendingUp, DollarSign, ClipboardCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setStats } from '../../features/dashboard/dashboardSlice';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { attendanceTrendData, revenueData } from '../../data/dummyData';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import '../admin/Dashboard.css';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
}> = ({ title, value, icon, trend }) => (
  <Card className="stat-card">
    <div className="stat-card-content">
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
        {trend && <p className="stat-trend trend-up">{trend}</p>}
      </div>
      <div className="stat-icon">{icon}</div>
    </div>
  </Card>
);

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    dispatch(setStats({
      activeMembers: 245,
      todayAttendance: 145,
      monthlyRevenue: 24500,
    }));
  }, [dispatch]);

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Dashboard</h1>
          <p className="page-subtitle">Overview of your gym performance</p>
        </div>
      </div>

      <div className="stats-grid">
        <StatCard
          title="Active Members"
          value={stats.activeMembers || 0}
          icon={<Users size={24} />}
          trend="+5 this week"
        />
        <StatCard
          title="Today's Attendance"
          value={stats.todayAttendance || 0}
          icon={<ClipboardCheck size={24} />}
          trend="59% of active"
        />
        <StatCard
          title="Monthly Revenue"
          value={`$${stats.monthlyRevenue?.toLocaleString() || 0}`}
          icon={<DollarSign size={24} />}
          trend="+8.2% vs last month"
        />
        <StatCard
          title="Avg. Daily Visits"
          value="152"
          icon={<TrendingUp size={24} />}
          trend="Steady"
        />
      </div>

      <div className="charts-grid">
        <Card>
          <CardHeader title="Attendance Trend" subtitle="Last 7 days" />
          <CardContent>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={attendanceTrendData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="date" stroke="#737373" />
                  <YAxis stroke="#737373" />
                  <Tooltip />
                  <Line type="monotone" dataKey="count" stroke="#2563eb" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader title="Revenue Trend" subtitle="Last 6 months" />
          <CardContent>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="month" stroke="#737373" />
                  <YAxis stroke="#737373" />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
