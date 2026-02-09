import { Button } from "../ui/Button";
import { CardContent } from "../ui/Card";

interface CommonFooterButtonsProps {
  confirmText?: string;
  cancelText?: string;
  variant?: string;
  loading?: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

export const CommonFooterButtons = ({
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'danger',
  loading = false,
  onConfirm,
  onClose,
}: CommonFooterButtonsProps) => {
  const isDanger = variant === 'danger';

  return (
    <CardContent>
      <div className="flex justify-end mt-6">
        <div className="flex items-center space-x-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={loading}
          >
            {cancelText}
          </Button>

          <div style={{ width: '10px' }} />

          <Button
            variant={isDanger ? 'danger' : 'primary'}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? 'Processing…' : confirmText}
          </Button>
        </div>
      </div>
    </CardContent>
  )
}