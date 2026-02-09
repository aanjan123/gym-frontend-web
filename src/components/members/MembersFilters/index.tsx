import React from 'react';
import { Search, X } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { setStatusFilter, setPackageFilter, setSearchFilter, clearFilters } from '../../../features/members/membersSlice';
import { Button } from '@/components/ui/Button';
import './index.css';

export const MembersFilters: React.FC = () => {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector(state => state.members);
  const { packages } = useAppSelector(state => state.packages);

  const hasActiveFilters =
    filters.status !== 'all' ||
    filters.packageId !== undefined ||
    filters.search !== '';

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  return (
    <div className="members-filters">
      <div className="filters-grid">
        {/* Status Filter */}
        <div className="filter-group">
          <label htmlFor="status-filter">Status</label>
          <select
            id="status-filter"
            value={filters.status}
            onChange={(e) => dispatch(setStatusFilter(e.target.value as any))}
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="expired">Expired</option>
          </select>
        </div>

        {/* Package Filter */}
        <div className="filter-group">
          <label htmlFor="package-filter">Package</label>
          <select
            id="package-filter"
            value={filters.packageId || ''}
            onChange={(e) => dispatch(setPackageFilter(e.target.value ? parseInt(e.target.value) : undefined))}
          >
            <option value="">All Packages</option>
            {packages.map(pkg => (
              <option key={pkg.id} value={pkg.id}>
                {pkg.name}
              </option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div className="filter-group filter-search">
          <label htmlFor="search-filter">Search</label>
          <div className="search-input-wrapper">
            <Search size={18} className="search-icon" />
            <input
              id="search-filter"
              type="text"
              placeholder="Search by name, email, or member code..."
              value={filters.search}
              onChange={(e) => dispatch(setSearchFilter(e.target.value))}
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        {hasActiveFilters && (
          <div className="filter-group filter-clear">
            <label>&nbsp;</label>
            <Button
              variant="secondary"
              onClick={handleClearFilters}
              className="clear-filters-btn"
            >
              <X size={16} />
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};