import React from 'react';
import { Skeleton, Table, TableBody, TableHeader } from '@ecommerce/ui-kit/ui';

const TableSkelton = () => {
  return (
    <div className="rounded-md border-2 p-1 space-y-3 shadow-xl m-1 md:m-3 ">
      <Table className="bg-white p-4 rounded-md shadow-md">
        <TableHeader className="rounded-lg border-2">
          <Skeleton className="h-16 w-full bg-gray-300 rounded" />
        </TableHeader>
        <TableBody>
          <Skeleton className="h-10 w-full bg-gray-300 rounded mt-2" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded mt-2" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded mt-2" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded mt-2" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded mt-2" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded mt-2" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded mt-2" />
          <Skeleton className="h-10 w-full bg-gray-300 rounded mt-2" />
        </TableBody>
      </Table>
    </div>
  );
};

export default TableSkelton;
