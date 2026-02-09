import { Card } from "../ui/Card";

export const StatCard: React.FC<{
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  trendUp?: boolean;
  suffix?: string;
}> = ({ title, value, icon, trend, trendUp, suffix = '' }) => (
  <Card className="stat-card">
    <div className="stat-card-content">
      <div className="stat-info">
        <p className="stat-title">{title}</p>
        <h2 className="stat-value">
          {value}
          {suffix && <span className="stat-suffix">{suffix}</span>}
        </h2>
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