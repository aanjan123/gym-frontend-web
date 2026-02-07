import React, { useEffect } from 'react';
import { Building2, Users, TrendingUp, ClipboardCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { setStats } from '../../features/dashboard/dashboardSlice';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { gyms, gymsByStatusData, memberGrowthData } from '../../data/dummyData';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import './Dashboard.css';

const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
}> = ({ title, value, icon, trend, trendUp }) => (
  <Card className="stat-card">
    <div className="stat-card-content">
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">{value}</h2>
        {trend && (
          <p className={`stat-trend ${trendUp ? 'trend-up' : 'trend-down'}`}>
            {trend}
          </p>
        )}
      </div>
      <div className="stat-icon">{icon}</div>
    </div>
  </Card>
);

export const Dashboard: React.FC = () => {
  const dispatch = useAppDispatch();
  const { stats } = useAppSelector((state) => state.dashboard);

  useEffect(() => {
    // Calculate stats from dummy data
    const totalGyms = gyms.length;
    const activeGyms = gyms.filter((g) => g.status === 'active').length;
    const totalMembers = gyms.reduce((sum, g) => sum + g.totalMembers, 0);
    const todayAttendance = gyms.reduce((sum, g) => sum + Math.floor(g.activeMembersCount * 0.6), 0);

    dispatch(
      setStats({
        totalGyms,
        activeGyms,
        totalMembers,
        todayAttendance,
      })
    );
  }, [dispatch]);

  const recentGyms = gyms.slice(0, 5);

  const columns = [
    {
      header: 'Gym Name',
      accessor: 'name' as const,
    },
    {
      header: 'Owner',
      accessor: 'ownerName' as const,
    },
    {
      header: 'Status',
      accessor: (gym: typeof gyms[0]) => (
        <span className={`status-badge status-${gym.status}`}>
          {gym.status.charAt(0).toUpperCase() + gym.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Members',
      accessor: (gym: typeof gyms[0]) => `${gym.activeMembersCount}/${gym.totalMembers}`,
    },
    {
      header: 'Created',
      accessor: (gym: typeof gyms[0]) => new Date(gym.createdAt).toLocaleDateString(),
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

      {/* KPI Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Gyms"
          value={stats.totalGyms || 0}
          icon={<Building2 size={24} />}
          trend="+2 this month"
          trendUp={true}
        />
        <StatCard
          title="Active Gyms"
          value={stats.activeGyms || 0}
          icon={<TrendingUp size={24} />}
          trend="60% conversion"
          trendUp={true}
        />
        <StatCard
          title="Total Members"
          value={stats.totalMembers || 0}
          icon={<Users size={24} />}
          trend="+12.5% growth"
          trendUp={true}
        />
        <StatCard
          title="Today's Attendance"
          value={stats.todayAttendance || 0}
          icon={<ClipboardCheck size={24} />}
          trend="72% of active"
          trendUp={true}
        />
      </div>

      {/* Charts Section */}
      <div className="charts-grid">
        <Card>
          <CardHeader title="Member Growth" subtitle="Last 7 months" />
          <CardContent>
            <div className="chart-wrapper">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={memberGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
                  <XAxis dataKey="month" stroke="#737373" />
                  <YAxis stroke="#737373" />
                  <Tooltip
                    contentStyle={{
                      background: '#fff',
                      border: '1px solid #e5e5e5',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="members"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{ fill: '#2563eb', r: 4 }}
                  />
                </LineChart>
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
                    data={gymsByStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {gymsByStatusData.map((entry, index) => (
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

      {/* Recent Gyms Table */}
      <Card>
        <CardHeader title="Recent Gyms" subtitle="Latest gym registrations" />
        <CardContent>
          <Table data={recentGyms} columns={columns} />
        </CardContent>
      </Card>
    </div>
  );
};
