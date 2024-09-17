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
import Link from 'next/link';

interface ICarouseloffersProps {
  images: string[];
}

const Carouseloffers: React.FC<ICarouseloffersProps> = (props) => {
  return (
    <Carousel
      carouselOptions={{
        loop: true,
      }}
      className="mt-2"
    >
      <CarouselNext />
      <CarouselPrevious />
      <div className="relative ">
        <CarouselMainContainer className="flex  h-52">
          {props.images.map((item, index) => (
            <SliderMainItem
              key={index}
              className="flex-shrink-0   basis-full xs:basis-1/2 sm:basis-1/3  bg-transparent"
            >
              <Link href="/cart">
                <div
                  style={{ backgroundImage: `url(${item})` }}
                  className="h-full w-full rounded-lg border-2 bg-no-repeat bg-contain ring-2 ring-transparent bg-transparent bg-center text-white"
                >
                  {/* Your other components here */}
                </div>
              </Link>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>

        <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
          <CarouselThumbsContainer className="gap-x-2 ">
            {props.images.map((_, index) => (
              <CarouselIndicator key={index} index={index} />
            ))}
          </CarouselThumbsContainer>
        </div>
      </div>
    </Carousel>
  );
};

export default Carouseloffers;
