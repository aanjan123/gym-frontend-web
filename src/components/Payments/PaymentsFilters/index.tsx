import React, { useEffect, useState } from 'react';

interface PaymentsFiltersProps {
  filters: any;
  loading?: boolean;
  setFilters: React.Dispatch<React.SetStateAction<any>>;
}

export const PaymentsFilters: React.FC<PaymentsFiltersProps> = ({
  filters,
  setFilters,
  loading = false,
}) => {
  const [search, setSearch] = useState(filters.search || '');

  useEffect(() => {
    setSearch(filters.search || '');
  }, [filters.search]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFilters((prev: any) => ({
        ...prev,
        search: search || undefined,
        page: 1,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [search, setFilters]);

  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label>Search Member</label>
        <input
          type="text"
          value={search}
          disabled={loading}
          placeholder="Enter name, email..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Status</label>
        <select
          value={filters.status || ''}
          onChange={(e) =>
            setFilters((prev: any) => ({
              ...prev,
              status: e.target.value || undefined,
              page: 1,
            }))
          }
          disabled={loading}
        >
          <option value="">All</option>
          <option value="paid">Paid</option>
          <option value="pending">Pending</option>
          <option value="overdue">Overdue</option>
        </select>
      </div>
    </div>
  );
};
