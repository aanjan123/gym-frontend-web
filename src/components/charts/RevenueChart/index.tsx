import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: any;
}

export const RevenueChart: React.FC<Props> = ({ data }) => {
  /**
   * For demo, generate last 6 months based on monthlyRevenue
   * In production, replace this with real monthly trend API.
   */
  const months = ['Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan'];
  const revenueTrend = months.map((month) => ({
    month,
    revenue: Math.floor(data.monthlyRevenue * (0.7 + Math.random() * 0.6)),
  }));

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={revenueTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="month" stroke="#737373" />
          <YAxis stroke="#737373" />
          <Tooltip />
          <Bar dataKey="revenue" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
