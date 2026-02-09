import React from 'react';
import { InputField } from '@components/ui/InputField';
import { GymFormData } from '@/pages/admin/CreateGym';

interface OwnerDetailsFormProps {
  data: any;
  onChange: <K extends keyof GymFormData>(name: K, value: GymFormData[K]) => void;
}

export const OwnerDetailsForm: React.FC<OwnerDetailsFormProps> = ({ data, onChange }) => {
  return (
    <div className="form-section">
      <h3 className="form-section-title">Owner Details</h3>
      <div className="form-grid">
        <InputField
          id="ownerName"
          label="Owner Name *"
          placeholder="John Doe"
          value={data.ownerName}
          onChange={(e) => onChange('ownerName', e.target.value)}
          type="text"
        />
        <InputField
          id="ownerEmail"
          label="Owner Email *"
          placeholder="owner@example.com"
          value={data.ownerEmail}
          onChange={(e) => onChange('ownerEmail', e.target.value)}
          type="email"
        />
        <InputField
          id="ownerPhone"
          label="Owner Phone *"
          placeholder="+1 234-567-8901"
          value={data.ownerPhone}
          onChange={(e) => onChange('ownerPhone', e.target.value)}
          type="tel"
        />
      </div>
    </div>
  );
};
