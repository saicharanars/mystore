import { ProductType } from '@ecommerce/types'; // Import the correct product type
import { ColumnDef } from '@tanstack/react-table';
import TableActions from './TableActions';

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
    header: () => <div className="text-center max-w-xs">Price</div>,
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
    header: () => <div className="text-center max-w-xs">stock_quantity</div>,
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
    header: () => <div className="text-center max-w-xs">created_at</div>,
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
