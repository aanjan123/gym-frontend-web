import React from 'react';
import { Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@hooks/hooks';
import {
  setStatusFilter,
  setSearchFilter,
} from '@features/gyms/gymsSlice';

export const GymsFiltersBar: React.FC = () => {
  const dispatch = useAppDispatch();
  const { status, search } = useAppSelector((state) => state.gyms.filters);

  return (
    <div className="filters-bar">
      <div className="filter-group">
        <label>Status Filter</label>
        <select
          value={status}
          onChange={(e) =>
            dispatch(setStatusFilter(e.target.value as any))
          }
        >
          <option value="all">All Statuses</option>
          <option value="active">Active</option>
          <option value="trial">Trial</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div className="filter-group">
        <label>Search</label>
        <div style={{ position: 'relative' }}>
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '1rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)',
            }}
          />
          <input
            type="text"
            placeholder="Search by name or email..."
            value={search}
            onChange={(e) => dispatch(setSearchFilter(e.target.value))}
            style={{ paddingLeft: '2.75rem' }}
          />
        </div>
      </div>
    </div>
  );
};
