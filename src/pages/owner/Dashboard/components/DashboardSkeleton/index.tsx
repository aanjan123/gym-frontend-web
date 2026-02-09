import { Card } from '@/components/ui/Card';
import './index.css';

export const DashboardSkeleton = () => (
  <div className="dashboard">
    <div className="stats-grid">
      {Array.from({ length: 4 }).map((_, i) => (
        <Card key={i} className="skeleton-card">
          <div className="skeleton-line title" />
          <div className="skeleton-line value" />
        </Card>
      ))}
    </div>

    <div className="charts-grid">
      {Array.from({ length: 2 }).map((_, i) => (
        <Card key={i} className="skeleton-chart" children={undefined} />
      ))}
    </div>
  </div>
);
