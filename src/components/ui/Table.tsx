import React from 'react';
import './Table.css';

interface Column<T> {
  header: string;
  accessor: keyof T | ((item: T) => React.ReactNode);
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  emptyMessage?: string;
  onRowClick?: (item: T) => void;
}

export function Table<T extends { id: string | number }>({
  data,
  columns,
  emptyMessage = 'No data available',
  onRowClick,
}: TableProps<T>) {
  const getCellValue = (item: T, accessor: Column<T>['accessor']) => {
    if (typeof accessor === 'function') {
      return accessor(item);
    }
    return item[accessor] as React.ReactNode;
  };

  if (data.length === 0) {
    return (
      <div className="table-empty">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table className="table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                style={{
                  width: column.width,
                  textAlign: column.align || 'left',
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr
              key={item.id}
              onClick={() => onRowClick?.(item)}
              className={onRowClick ? 'table-row-clickable' : ''}
            >
              {columns.map((column, index) => (
                <td
                  key={index}
                  style={{
                    width: column.width,
                    textAlign: column.align || 'left',
                  }}
                >
                  {getCellValue(item, column.accessor)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
