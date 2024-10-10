import { ProductType } from '@ecommerce/types'; // Import the correct product type
import { ColumnDef } from '@tanstack/react-table';
import TableActions from './TableActions';
import { Button } from '@ecommerce/ui-kit/ui';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-center max-w-xs">Name</div>,
    cell: ({ row }) => {
      return (
        <p className="text-center overflow-hidden line-clamp-2 font-medium max-w-xs">
          {row.getValue('name')}
        </p>
      );
    },
  },
  {
    accessorKey: 'price',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        className="text-center max-w-xs"
      >
        Price
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    filterFn: (row, id, value) => {
      if (typeof value === 'string') {
        value = parseFloat(value);
      }
      return (row.getValue(id) as number) >= value;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const valueA = rowA.getValue(columnId) as number;
      const valueB = rowB.getValue(columnId) as number;

      return valueA - valueB;
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium max-w-xs overflow-hidden">
          {row.getValue('price')}
        </p>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-center max-w-xs">status</div>,
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium max-w-xs overflow-hidden">
          {row.getValue('status')}
        </p>
      );
    },
  },
  {
    accessorKey: 'stock_quantity',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Stock Quantity
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    filterFn: (row, id, value) => {
      if (typeof value === 'string') {
        value = parseFloat(value);
      }
      return (row.getValue(id) as number) >= value;
    },
    sortingFn: (rowA, rowB, columnId) => {
      const valueA = rowA.getValue(columnId) as number;
      const valueB = rowB.getValue(columnId) as number;

      return valueA - valueB;
    },
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium max-w-xs overflow-hidden">
          {row.getValue('stock_quantity')}
        </p>
      );
    },
  },
  {
    accessorKey: 'stock_status',
    header: () => <div className="text-center max-w-xs">stock_status</div>,
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium max-w-xs overflow-hidden">
          {row.getValue('stock_status')}
        </p>
      );
    },
  },
  {
    accessorKey: 'created_at',
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
      >
        Created Date
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => {
      const createdDate = row.getValue('created_at') as string;
      const date = new Date(createdDate);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      });

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
  {
    accessorKey: 'edit',
    header: () => <div className="text-center">Edit/Delete</div>,
    cell: ({ row, cell }) => {
      return (
        <div className="flex justify-center w-full">
          <TableActions item={row.original} />
        </div>
      );
    },
  },
];
