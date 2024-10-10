import {
  sellerorderresponseType,
  sellerorderproductType,
  createLocationType,
} from '@ecommerce/types';
import { Button, Card, CardContent } from '@ecommerce/ui-kit/ui';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, Package } from 'lucide-react';

const OrderProductCard = ({
  product,
}: {
  product: sellerorderproductType[];
}) => (
  <Card className="mb-1 last:mb-0 max-w-[200px] mx-auto text-xs">
    <CardContent className="p-2">
      {product.map((product) => (
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-1 truncate flex-1">
            {product.name}
          </h3>
          <span className="ml-2 whitespace-nowrap">
            {product.OrderProduct.quantity}x
          </span>
        </div>
      ))}
    </CardContent>
  </Card>
);

export const columns: ColumnDef<sellerorderresponseType['items'][number]>[] = [
  {
    accessorKey: 'owner.name',
    header: () => <div className="text-center max-w-xs">Order person</div>,
    cell: ({ row }) => {
      const owner = row.original.owner || {};
      console.log('Owner:', owner);
      return (
        <p className="text-center font-medium max-w-xs overflow-hidden">
          {owner.name || 'N/A'}
        </p>
      );
    },
  },

  {
    accessorKey: 'products',
    header: () => (
      <div className="text-center">
        <Package className="inline-block mr-2" />
        Order Products
      </div>
    ),
    cell: ({ row }) => {
      const products: sellerorderproductType[] = row.getValue('products');
      console.log(products);
      return (
        <div className="mx-auto">
          <OrderProductCard product={products} />
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => <div className="text-center max-w-xs">Status</div>,
    cell: ({ row }) => {
      return (
        <p className="text-center font-medium max-w-xs overflow-hidden">
          {row.getValue('status')}
        </p>
      );
    },
  },
  {
    accessorKey: 'location',
    header: () => <div className="text-center">location</div>,
    cell: ({ row }) => {
      const location: createLocationType = row.getValue('location');
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
      const createdDate = new Date(row.getValue('creationDate'));
      const formattedDate = createdDate.toLocaleDateString('en-US', {
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
