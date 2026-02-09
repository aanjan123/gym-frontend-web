import React from 'react';
import { InputField } from '@components/ui/InputField';
import { GymFormData } from '@/pages/admin/CreateGym';

interface SubscriptionDetailsFormProps {
  data: any;
  onChange: <K extends keyof GymFormData>(name: K, value: GymFormData[K]) => void;
}

export const SubscriptionDetailsForm: React.FC<SubscriptionDetailsFormProps> = ({ data, onChange }) => {
  return (
    <div className="form-section">
      <h3 className="form-section-title">Subscription Details</h3>
      <div className="form-grid">
        <div className="form-field">
          <label htmlFor="subscriptionPlan">Subscription Plan *</label>
          <select
            id="subscriptionPlan"
            name="subscriptionPlan"
            value={data.subscriptionPlan}
            onChange={(e: any) => onChange('subscriptionPlan', e.target.value)}
            required
          >
            <option value="basic">Basic - $99/month</option>
            <option value="standard">Standard - $199/month</option>
            <option value="premium">Premium - $399/month</option>
          </select>
        </div>
        <InputField
          id="expiryDate"
          label="Subscription Expiry *"
          type="date"
          value={data.expiryDate}
          onChange={(e) => onChange('expiryDate', e.target.value)}
        />
      </div>
    </div>
  );
};
