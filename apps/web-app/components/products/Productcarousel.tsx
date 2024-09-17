'use client';
import * as React from 'react';
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from '@ecommerce/ui-kit/ui';
import { productcardResponseType } from '@ecommerce/types';
import ProductCard from './ProductCard';

interface iProductcarouselProps {
  products: productcardResponseType[];
  title: string;
}

const Productcarousel: React.FC<iProductcarouselProps> = ({
  title,
  products,
}) => {
  return (
    <>
      <div className=" my-2">
        <h1 className=" text-foreground font-semibold font-sans pl-4 text-sm md:tex-lg">
          {title}
        </h1>
        <Carousel
          carouselOptions={{
            loop: true,
          }}
          className="mt-2 overflow-hidden"
        >
          <CarouselNext />
          <CarouselPrevious />
          <div className="relative ">
            <CarouselMainContainer className="flex  h-full">
              {products.map((item, index) => (
                <SliderMainItem
                  key={index}
                  className="flex-shrink-0 p-1  bbasis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 bg-transparent"
                >
                  <ProductCard
                    id={item.id}
                    name={item.name}
                    category={item.category}
                    price={item.price}
                    compare_price={item.compare_price}
                  />
                </SliderMainItem>
              ))}
            </CarouselMainContainer>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
              <CarouselThumbsContainer className="gap-x-2 ">
                {products.map((_, index) => (
                  <CarouselIndicator key={index} index={index} />
                ))}
              </CarouselThumbsContainer>
            </div>
          </div>
        </Carousel>
      </div>
    </>
  );
};

export default Productcarousel;
