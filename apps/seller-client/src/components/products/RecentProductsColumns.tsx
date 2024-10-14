import { ProductType } from '@ecommerce/types';
import { ColumnDef } from '@tanstack/react-table';
import { Button } from '@ecommerce/ui-kit/ui';
import { ArrowUpDown } from 'lucide-react';

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: 'name',
    header: () => <div className="text-center  max-w-40 ">Name</div>,
    cell: ({ row }) => {
      return (
        <div className="w-40 text-center">
          <p className="text-center text-xs md:text-md text-clip text-wrap truncate line-clamp-2 font-medium ">
            {row.getValue('name')}
          </p>
        </div>
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
];
