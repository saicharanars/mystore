import { createLocationType, shipmentsResponseType } from '@ecommerce/types';
import { Button } from '@ecommerce/ui-kit/ui';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<shipmentsResponseType['items'][number]>[] = [
  {
    accessorKey: 'status',
    header: () => <div className="text-center max-w-xs">Shipment Status</div>,
    cell: ({ row }) => {
      const status = row.original.delivery_status || 'not found';
      return (
        <p className="text-center font-medium max-w-xs overflow-hidden">
          {status}
        </p>
      );
    },
  },
  {
    accessorKey: 'location',
    header: () => <div className="text-center">location</div>,
    cell: ({ row }) => {
      const location: createLocationType = row.original.address;
      console.log('LOCATIOM', location);
      return (
        <div className="mx-auto text-center">
          <p>{`${location.address}, ${location.city}`}</p>
          <p>{`${location.pincode}, ${location.state}`}</p>
        </div>
      );
    },
  },
  {
    accessorKey: 'creationDate',
    header: ({ column }) => (
      <Button
        variant="ghost"
        className="text-center"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const createdDate = row.original.created_at
        ? new Date(row.original.created_at)
        : null;
      const formattedDate = createdDate
        ? createdDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
          })
        : 'N/A';

      return (
        <p className="text-center font-medium max-w-xs overflow-hidden">
          {formattedDate}
        </p>
      );
    },
    sortingFn: (rowA, rowB, columnId) => {
      const dateA = new Date(rowA.getValue(columnId) as string);
      const dateB = new Date(rowB.getValue(columnId) as string);
      return dateA.getTime() - dateB.getTime();
    },
  },
];
