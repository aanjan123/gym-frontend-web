import { Search } from 'lucide-react';

export const PackageFilters = ({
  search,
  status,
  duration,
  onSearch,
  onStatus,
  onDuration,
}: {
  search: string;
  status: string;
  duration: string;
  onSearch: (v: string) => void;
  onStatus: (v: string) => void;
  onDuration: (v: string) => void;
}) => {
  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label>Status</label>
        <select value={status} onChange={(e) => onStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Duration</label>
        <select value={duration} onChange={(e) => onDuration(e.target.value)}>
          <option value="all">All</option>
          <option value="monthly">Monthly</option>
          <option value="quarterly">Quarterly</option>
          <option value="half_yearly">Half Yearly</option>
          <option value="yearly">Yearly</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Search</label>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-tertiary)',
          }} />
          <input
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            placeholder="Search package..."
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>
      </div>
    </div>
  );
};
