'use client';
import * as React from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselIndicator,
  CarouselMainContainer,
  CarouselNext,
  CarouselPrevious,
  CarouselThumbsContainer,
  SliderMainItem,
} from '@ecommerce/ui-kit/ui';
import AutoScroll from 'embla-carousel-auto-scroll';

const images = [
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf4751f0eac800de9da40b/retailez-1920x1080.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf470f4ec65201e6ab2b18/croma-1920x1080.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf472443857201b9689186/baggit-1920x1080.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf473bad8d540269bfe7af/hammar-1920x1080.png',
];

const Photocarousel = () => {
  return (
    <Carousel
      carouselOptions={{
        loop: true,
      }}
    >
      <CarouselNext />
      <CarouselPrevious />
      <div className="relative">
        <CarouselMainContainer className="h-full p-2">
          {images.map((item, index) => (
            <SliderMainItem key={index} className="bg-transparent">
              <div className="p-1 md:p-5 relative bg-slate-200 w-full h-24 md:h-52 lg:h-96">
                <Image
                  quality={40}
                  fill
                  style={{
                    objectFit: 'cover',
                  }}
                  src={item}
                  alt={`Carousel image ${index + 1}`}
                />
              </div>
            </SliderMainItem>
          ))}
        </CarouselMainContainer>
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          <CarouselThumbsContainer className="gap-x-1">
            {images.map((_, index) => (
              <CarouselIndicator key={index} index={index} />
            ))}
          </CarouselThumbsContainer>
        </div>
      </div>
    </Carousel>
  );
};

export default Photocarousel;
