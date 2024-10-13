import {
  sellerorderresponseType,
  sellerorderproductType,
  createLocationType,
} from '@ecommerce/types';
import { Button } from '@ecommerce/ui-kit/ui';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown } from 'lucide-react';
import CreateShipment from '../shipments/CreateShipment';

const OrderProductCard = ({
  product,
}: {
  product: sellerorderproductType[];
}) => (
  <div className="flex flex-col  items-start p-1 line-clamp-2 ">
    {product.map((product) => (
      <div key={product.id}>
        <h3 className="font-semibold line-clamp-1 truncate text-md flex-1">
          {product.name}
        </h3>
        <p className="text-sm">Qty: {product.OrderProduct.quantity}x</p>
      </div>
    ))}
  </div>
);

export const columns: ColumnDef<sellerorderresponseType['items'][number]>[] = [
  {
    accessorKey: 'owner.name',
    header: () => (
      <div className="text-center max-w-xs">
        <h1 className=" text-xl line-clamp-1">Owner</h1>
      </div>
    ),
    cell: ({ row }) => {
      const owner = row.original.owner || {};
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
      <div className="text-center line-clamp-1">
        <h1 className=" text-xl">Order Products</h1>
      </div>
    ),
    cell: ({ row }) => {
      const products: sellerorderproductType[] = row.getValue('products');
      return (
        <div className="mx-auto">
          <OrderProductCard product={products} />
        </div>
      );
    },
  },
  {
    accessorKey: 'status',
    header: () => (
      <div className="text-center max-w-xs">
        <h1 className=" text-xl line-clamp-1">Status</h1>
      </div>
    ),
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
    header: () => (
      <div className="text-center max-w-xs">
        <h1 className=" text-xl line-clamp-1">Location</h1>
      </div>
    ),
    cell: ({ row }) => {
      const location: createLocationType = row.getValue('location');
      return (
        <div className="mx-auto ">
          <p className="line-clamp-1 text-sm ">{`${location.address}, ${location.city}`}</p>
          <p className="line-clamp-1 text-sm ">{`${location.pincode}, ${location.state}`}</p>
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
        <div className="text-center max-w-xs">
          <h1 className=" text-xl line-clamp-1">Created date</h1>
        </div>

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
  {
    accessorKey: 'shipment',
    header: () => (
      <div className="text-center max-w-xs">
        <h1 className=" text-xl line-clamp-1">create shipment</h1>
      </div>
    ),
    cell: ({ row }) => {
      const id = row.original.id || 'notfound';
      const location: createLocationType = row.getValue('location');
      return (
        <CreateShipment
          orderId={id}
          address={location}
          trackingId={25622}
          delivery_status="created"
        />
      );
    },
  },
];
