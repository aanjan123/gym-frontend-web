import React from 'react';
import { Table } from '@/components/ui/Table';
import { Attendance } from '@/types/Attendance';

export const AttendanceTable = ({
  data,
  loading,
}: {
  data: Attendance[];
  loading?: boolean;
}) => {
  const columns = [
    { header: 'Member', accessor: 'fullName' as const },
    { header: 'Email', accessor: 'email' as const },
    {
      header: 'Check In',
      accessor: (a: Attendance) =>
        a.checkInTime
          ? new Date(a.checkInTime).toLocaleTimeString()
          : '-',
    },
    {
      header: 'Check Out',
      accessor: (a: Attendance) =>
        a.checkOutTime
          ? new Date(a.checkOutTime).toLocaleTimeString()
          : '-',
    },
    {
      header: 'Method',
      accessor: (a: Attendance) => (
        <span className={`status-badge status-${a.method}`}>
          {a.method.replace('_', ' ')}
        </span>
      ),
    },
    {
      header: 'Date',
      accessor: (a: Attendance) => new Date(a.date).toLocaleDateString(),
    },
  ];

  return (
    <Table
      data={data}
      columns={columns}
      loading={loading}
      emptyMessage="No attendance records"
    />
  );
};
