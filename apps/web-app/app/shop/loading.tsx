import React from 'react';
import { Skeleton } from '@ecommerce/ui-kit/ui';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
  Pagination,
  PaginationContent,
  PaginationItem,
} from '@ecommerce/ui-kit/ui';

const ShopSkeleton = () => {
  const renderPageNumbersSkeleton = () => {
    const pageNumbers = [];
    for (let i = 0; i < 5; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <Skeleton className="h-6 w-6 rounded-full" />
        </PaginationItem>
      );
    }
    return pageNumbers;
  };

  return (
    <div className="h-full flex-1 flex-col space-y-8 md:flex mt-5">
      <div className="w-full h-20 md:h-36 bg-accent text-center flex flex-col gap-2 items-center justify-center m-0">
        <Skeleton className="h-8 w-40 md:h-12 md:w-80 bg-gray-300 rounded-full" />
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <Skeleton className="h-6 w-24 bg-gray-300 rounded" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Skeleton className="h-6 w-24 bg-gray-300 rounded" />
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <Skeleton className="h-6 w-24 bg-gray-300 rounded" />
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex flex-row gap-2 p-1 justify-end">
        <Skeleton className="h-10 w-32 bg-gray-300 rounded" />
        <Skeleton className="h-10 w-32 bg-gray-300 rounded" />
      </div>

      <div className="flex items-start justify-between space-y-2 p-2 md:p-4 gap-2">
        <div className="grid grid-cols-4 justify-start gap-2 w-full">
          <div className="p-2 bg-white shadow-lg border-2 rounded-sm border-solid hidden md:block">
            <Skeleton className="h-16 w-full bg-gray-300 rounded" />
            <Skeleton className="h-16 w-full bg-gray-300 rounded mt-2" />
            <Skeleton className="h-16 w-full bg-gray-300 rounded mt-2" />
          </div>
          <div className="col-span-4 md:col-span-3 gap-2">
            <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-max justify-between gap-2">
              {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="bg-white p-4 rounded-md shadow-md">
                  <Skeleton className="h-32 w-full bg-gray-300 rounded" />
                  <Skeleton className="h-6 w-full bg-gray-300 rounded mt-2" />
                  <Skeleton className="h-6 w-3/4 bg-gray-300 rounded mt-1" />
                </div>
              ))}
            </div>
            <div className="w-full mt-4 p-4 m-2">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
                  </PaginationItem>
                  {renderPageNumbersSkeleton()}
                  <PaginationItem>
                    <Skeleton className="h-8 w-8 rounded-full bg-gray-300" />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopSkeleton;
