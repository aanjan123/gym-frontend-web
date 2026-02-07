import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
// import { useAppDispatch } from '../../app/hooks';
// import { addGym } from '../../features/gyms/gymsSlice';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import './Dashboard.css';

export const CreateGym: React.FC = () => {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch();
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    gymName: '',
    address: '',
    phone: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    subscriptionPlan: 'basic',
    expiryDate: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newGym = {
      id: `gym-${Date.now()}`,
      name: formData.gymName,
      ownerEmail: formData.ownerEmail,
      ownerName: formData.ownerName,
      status: 'trial' as const,
      activeMembersCount: 0,
      totalMembers: 0,
      createdAt: new Date().toISOString().split('T')[0],
      expiryDate: formData.expiryDate,
      subscriptionPlan: formData.subscriptionPlan as 'basic' | 'standard' | 'premium',
      address: formData.address,
      phone: formData.phone,
      monthlyRevenue: 0,
    };

    // dispatch(addGym(newGym));
    setShowSuccess(true);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    navigate('/admin/manage-gyms');
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div>
          <h1 className="page-title">Create New Gym</h1>
          <p className="page-subtitle">Register a new gym on the platform</p>
        </div>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardContent>
            <div className="form-section">
              <h3 className="form-section-title">Gym Details</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="gymName">Gym Name *</label>
                  <input
                    id="gymName"
                    name="gymName"
                    type="text"
                    required
                    value={formData.gymName}
                    onChange={handleChange}
                    placeholder="Enter gym name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="phone">Phone Number *</label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 234-567-8900"
                  />
                </div>
                <div className="form-field form-field-full">
                  <label htmlFor="address">Address *</label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, City, State ZIP"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Owner Details</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="ownerName">Owner Name *</label>
                  <input
                    id="ownerName"
                    name="ownerName"
                    type="text"
                    required
                    value={formData.ownerName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="ownerEmail">Owner Email *</label>
                  <input
                    id="ownerEmail"
                    name="ownerEmail"
                    type="email"
                    required
                    value={formData.ownerEmail}
                    onChange={handleChange}
                    placeholder="owner@example.com"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="ownerPhone">Owner Phone *</label>
                  <input
                    id="ownerPhone"
                    name="ownerPhone"
                    type="tel"
                    required
                    value={formData.ownerPhone}
                    onChange={handleChange}
                    placeholder="+1 234-567-8901"
                  />
                </div>
              </div>
            </div>

            <div className="form-section">
              <h3 className="form-section-title">Subscription Details</h3>
              <div className="form-grid">
                <div className="form-field">
                  <label htmlFor="subscriptionPlan">Subscription Plan *</label>
                  <select
                    id="subscriptionPlan"
                    name="subscriptionPlan"
                    required
                    value={formData.subscriptionPlan}
                    onChange={handleChange}
                  >
                    <option value="basic">Basic - $99/month</option>
                    <option value="standard">Standard - $199/month</option>
                    <option value="premium">Premium - $399/month</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="expiryDate">Subscription Expiry *</label>
                  <input
                    id="expiryDate"
                    name="expiryDate"
                    type="date"
                    required
                    value={formData.expiryDate}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <Button type="button" variant="secondary" onClick={() => navigate('/admin/manage-gyms')}>
                Cancel
              </Button>
              <Button type="submit">Create Gym</Button>
            </div>
          </CardContent>
        </form>
      </Card>

      <Modal
        isOpen={showSuccess}
        onClose={handleCloseSuccess}
        title="Success!"
        size="sm"
        footer={
          <Button onClick={handleCloseSuccess} fullWidth>
            Go to Manage Gyms
          </Button>
        }
      >
        <div style={{ textAlign: 'center', padding: '1rem 0' }}>
          <div
            style={{
              width: '64px',
              height: '64px',
              background: 'var(--success-light)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 1rem',
            }}
          >
            <CheckCircle size={32} color="var(--success)" />
          </div>
          <h3 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-primary)' }}>Gym Created Successfully!</h3>
          <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
            The gym has been registered and the owner will receive login credentials via email.
          </p>
        </div>
      </Modal>
    </div>
  );
};
