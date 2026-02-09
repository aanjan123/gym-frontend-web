import { Table } from '@/components/ui/Table';
import { Button } from '@/components/ui/Button';
import { Package } from '@/features/packages/types';

export const PackageTable = ({
  packages,
  onView,
  onEdit,
  onDelete,
}: {
  packages: Package[];
  onView: (pkg: Package) => void;
  onEdit: (pkg: Package) => void;
  onDelete: (pkg: Package) => void;
}) => {
  const columns = [
    { header: 'Name', accessor: 'name' as const },
    { header: 'Price', accessor: (p: Package) => `Rs ${p.price}` },
    {
      header: 'Duration',
      accessor: (p: Package) =>
        `${p.durationValue} ${p.durationType.replace('_', ' ')}`,
    },
    {
      header: 'Members',
      accessor: (p: Package) => p.memberCount ?? 0,
    },
    {
      header: 'Actions',
      accessor: (p: Package) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="sm" variant="secondary" onClick={() => onView(p)}>
            View
          </Button>
          <Button size="sm" onClick={() => onEdit(p)}>
            Edit
          </Button>
          <Button size="sm" variant="danger" onClick={() => onDelete(p)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return <Table data={packages} columns={columns} emptyMessage="No packages found" />;
};
