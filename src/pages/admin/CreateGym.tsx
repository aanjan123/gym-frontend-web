import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { CheckCircle } from 'lucide-react';

import { GymDetailsForm } from '@components/gym/GymDetailsForm';
import { OwnerDetailsForm } from '@components/gym/OwnerDetailsForm';
import { SubscriptionDetailsForm } from '@components/gym/SubscriptionDetailsForm';

import { useAppDispatch, useAppSelector } from '@/app/hooks';
import { clearGymsState, createGym } from '@/features/gyms/gymsSlice';

import '@css/Auth.css';
import { FieldErrors } from '@/types/Gym';

export interface GymFormData {
  gymName: string;
  gymAddress: string;
  gymPhone: string;
  gymEmail: string;
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  subscriptionPlan: 'basic' | 'standard' | 'premium';
  expiryDate: string;
}

export const CreateGym: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { loading, error, selectedGym } = useAppSelector((state) => state.gyms);

  const [showSuccess, setShowSuccess] = useState(false);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formData, setFormData] = useState<GymFormData>({
    gymName: '',
    gymAddress: '',
    gymPhone: '',
    gymEmail: '',
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    subscriptionPlan: 'basic',
    expiryDate: '',
  });

  useEffect(() => {
    if (error && typeof error === 'object') {
      error?.map((err: any) => setErrors((prev) => ({ ...prev, [err.field]: err.message })));
    }
  }, [error]);

  useEffect(() => {
    if (selectedGym) {
      setShowSuccess(true);
    }
  }, [selectedGym]);

  const handleChange = <K extends keyof GymFormData>(
    name: K,
    value: GymFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

  const validateForm = (data: GymFormData): FieldErrors => {
    const errors: FieldErrors = {};

    if (!data.gymName.trim()) {
      errors.gymName = 'Gym name is required';
    }

    if (!data.gymEmail || !isEmail(data.gymEmail)) {
      errors.gymEmail = 'Valid gym email is required';
    }

    if (!data.ownerName.trim()) {
      errors.ownerName = 'Owner name is required';
    }

    if (!data.ownerEmail || !isEmail(data.ownerEmail)) {
      errors.ownerEmail = 'Valid owner email is required';
    }

    if (!data.expiryDate) {
      errors.expiryDate = 'Subscription expiry date is required';
    }

    return errors;
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const clientErrors = validateForm(formData);

    if (Object.keys(clientErrors).length > 0) {
      setErrors(clientErrors);
      return;
    }

    await dispatch(
      createGym({
        gymName: formData.gymName,
        gymPhone: formData.gymPhone,
        gymEmail: formData.gymEmail,
        gymAddress: formData.gymAddress,
        ownerName: formData.ownerName,
        ownerEmail: formData.ownerEmail,
        subscriptionExpiresAt: formData.expiryDate,
        subscriptionPlan: formData.subscriptionPlan,
      })
    );

  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    dispatch(clearGymsState())
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
            <GymDetailsForm errors={errors} data={formData} onChange={handleChange} />
            <OwnerDetailsForm data={formData} onChange={handleChange} />
            <SubscriptionDetailsForm data={formData} onChange={handleChange} />

            {error && typeof error === 'string' && <p className="form-error error-text">{error}</p>}

            <div className="form-actions">
              <Button
                type="button"
                variant="secondary"
                onClick={() => navigate('/admin/manage-gyms')}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button type="submit" loading={loading}>
                Create Gym
              </Button>
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
              width: 64,
              height: 64,
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
          <h3>Gym Created Successfully!</h3>
          <p>
            The gym has been registered and login credentials will be emailed to the owner.
          </p>
        </div>
      </Modal>
    </div>
  );
};
