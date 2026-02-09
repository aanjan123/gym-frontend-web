import { useEffect, useState } from 'react';
import { useDebounce } from '@hooks/useDebounce';

export const AttendanceFilters = ({ filters, setFilters }: any) => {
  const [search, setSearch] = useState(filters.search || '');

  const debouncedSearch = useDebounce(search, 400);

  useEffect(() => {
    setFilters((prev: any) => ({
      ...prev,
      search: debouncedSearch,
      page: 1,
    }));
  }, [debouncedSearch, setFilters]);

  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label>Search Member</label>
        <input
          placeholder="Name or email"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="filter-group">
        <label>Date</label>
        <input
          type="date"
          value={filters.date}
          onChange={(e) =>
            setFilters((p: any) => ({
              ...p,
              date: e.target.value,
              page: 1,
            }))
          }
        />
      </div>
    </div>
  );
};
