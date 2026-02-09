import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Props {
  data: any;
}

export const AttendanceChart = ({ data }: Props) => {
  /**
   * For demo, we'll generate last 7 days trend based on today's attendance.
   * In production, replace this with real attendance trend API.
   */
  const attendanceTrend = Array.from({ length: 7 }).map((_, i) => ({
    date: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    count: Math.floor(data.todayAttendance * (0.7 + Math.random() * 0.6)),
  }));

  return (
    <div className="chart-wrapper">
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={attendanceTrend}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e5e5" />
          <XAxis dataKey="date" stroke="#737373" />
          <YAxis stroke="#737373" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
