'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import ProductCard from './ProductCard';

const Productcarousel: React.FC = () => {
  return (
    <div className="relative">
      <Carousel opts={{ align: 'center' }} className="w-full ">
        <CarouselContent>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
            <CarouselItem
              key={item}
              className="basis-1/2 md:basis-1/6 p-1  mt-6"
            >
              <ProductCard />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Productcarousel;
