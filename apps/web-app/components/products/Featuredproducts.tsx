import React from 'react';
import Productcarousel from './Productcarousel';
import { Button } from '@ecommerce/ui-kit/ui';

interface Featuredproductsprops {
  heading: string;
}

const Featuredproducts: React.FC<Featuredproductsprops> = ({ heading }) => {
  return (
    <>
      <div className="flex flex-row  justify-between mt-2">
        <h1 className="font-bold text-2xl  ">Featured Products</h1>
        <Button
          variant={'outline'}
          className="  text-primary text-sm font-bold capitalize "
        >
          {heading}
        </Button>
      </div>
      {/* <Productcarousel /> */}
    </>
  );
};

export default Featuredproducts;
