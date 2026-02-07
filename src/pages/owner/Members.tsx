import React, { useState } from 'react';
import { UserPlus, Search } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addMember, setStatusFilter, setSearchFilter } from '../../features/members/membersSlice';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Table } from '../../components/ui/Table';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import '../admin/Dashboard.css';

export const Members: React.FC = () => {
  const dispatch = useAppDispatch();
  const { members, filters } = useAppSelector((state) => state.members);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    membershipType: 'monthly',
  });

  const filteredMembers = members.filter((member) => {
    const matchesStatus = filters.status === 'all' || member.status === filters.status;
    const matchesSearch =
      member.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      member.email.toLowerCase().includes(filters.search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember = {
      id: `mem-${Date.now()}`,
      ...formData,
      gymId: 'gym-001',
      status: 'active' as const,
      joinedDate: new Date().toISOString().split('T')[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      lastPaymentDate: new Date().toISOString().split('T')[0],
      paymentStatus: 'paid' as const,
      amountDue: 0,
    };
    dispatch(addMember(newMember));
    setShowAddModal(false);
    setFormData({ name: '', email: '', phone: '', membershipType: 'monthly' });
  };

  const columns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Email', accessor: 'email' as const },
    { header: 'Phone', accessor: 'phone' as const },
    {
      header: 'Status',
      accessor: (member: typeof members[0]) => (
        <span className={`status-badge status-${member.status}`}>
          {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
        </span>
      ),
    },
    {
      header: 'Membership',
      accessor: (member: typeof members[0]) =>
        member.membershipType.charAt(0).toUpperCase() + member.membershipType.slice(1),
    },
    {
      header: 'Joined',
      accessor: (member: typeof members[0]) => new Date(member.joinedDate).toLocaleDateString(),
    },
  ];

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Members</h1>
          <p className="page-subtitle">Manage your gym members</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <UserPlus size={18} />
          Add Member
        </Button>
      </div>

      <Card>
        <CardContent>
          <div className="filters-bar">
            <div className="filter-group">
              <label>Status Filter</label>
              <select
                value={filters.status}
                onChange={(e) => dispatch(setStatusFilter(e.target.value as any))}
              >
                <option value="all">All Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>
            <div className="filter-group">
              <label>Search</label>
              <div style={{ position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-tertiary)' }} />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={filters.search}
                  onChange={(e) => dispatch(setSearchFilter(e.target.value))}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card style={{ marginTop: '1.5rem' }}>
        <CardHeader title={`All Members (${filteredMembers.length})`} />
        <CardContent>
          <Table data={filteredMembers} columns={columns} emptyMessage="No members found" />
        </CardContent>
      </Card>

      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Member"
        size="md"
      >
        <form onSubmit={handleAddMember}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div className="form-field">
              <label htmlFor="name">Name *</label>
              <input
                id="name"
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Enter member name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="email">Email *</label>
              <input
                id="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="member@email.com"
              />
            </div>
            <div className="form-field">
              <label htmlFor="phone">Phone *</label>
              <input
                id="phone"
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+1 234-567-8900"
              />
            </div>
            <div className="form-field">
              <label htmlFor="membershipType">Membership Type *</label>
              <select
                id="membershipType"
                value={formData.membershipType}
                onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </div>
          </div>
          <div className="form-actions">
            <Button type="button" variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button type="submit">Add Member</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
