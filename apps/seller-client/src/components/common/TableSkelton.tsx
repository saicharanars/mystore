import React from 'react';
import { Skeleton, Table, TableBody, TableHeader } from '@ecommerce/ui-kit/ui';

const TableSkelton = () => {
  return (
    <Table className="p-4 m-4 rounded-lg border shadow-xl">
      <TableHeader className="rounded-md border-b-2">
        <Skeleton className="h-12 w-full bg-gray-200 rounded-md" />
      </TableHeader>
      <TableBody className="flex mt-3 flex-col gap-4">
        <div className="grid grid-cols-5 gap-4 w-full">
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
        </div>
        <div className="grid grid-cols-5 gap-4 w-full">
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
        </div>
        <div className="grid grid-cols-5 gap-4 w-full">
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
        </div>
        <div className="grid grid-cols-5 gap-4 w-full">
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
        </div>
        <div className="grid grid-cols-5 gap-4 w-full">
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded-md" />
        </div>
      </TableBody>
    </Table>
  );
};

export default TableSkelton;
