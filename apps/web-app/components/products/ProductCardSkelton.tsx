import React from 'react';
import { Skeleton } from '@ecommerce/ui-kit/ui';

const ProductCardSkeleton = () => (
  <div className="bg-white p-4 rounded-md shadow-md">
    <Skeleton className="h-32 w-full bg-gray-300 rounded" />
    <Skeleton className="h-6 w-full bg-gray-300 rounded mt-2" />
    <Skeleton className="h-6 w-3/4 bg-gray-300 rounded mt-1" />
  </div>
);

export default ProductCardSkeleton;
