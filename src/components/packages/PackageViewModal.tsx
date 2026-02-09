import { Modal } from '@/components/ui/Modal';
import { Button } from '@/components/ui/Button';
import { Package } from '@/features/packages/types';

export const PackageViewModal = ({
  pkg,
  onClose,
}: {
  pkg: Package | null;
  onClose: () => void;
}) => {
  if (!pkg) return null;

  return (
    <Modal isOpen={!!pkg} onClose={onClose} title="Package Details" size="md">
      <div className="package-view">
        <h3>{pkg.name}</h3>
        <p className="price">Rs {pkg.price}</p>

        <p>
          Duration: {pkg.durationValue} {pkg.durationType.replace('_', ' ')}
        </p>

        {pkg.description && <p>{pkg.description}</p>}

        <div className="feature-chips">
          {pkg.features.map((f, i) => (
            <span key={i} className="feature-chip">{f}</span>
          ))}
        </div>

        <div className="form-actions">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </Modal>
  );
};
