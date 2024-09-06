import * as React from 'react';

import {
  Carousel,
  CarouselContent,
  CarouselItem,

} from '@ecommerce/ui-kit/ui';
import {
  Card,
  CardContent,
} from '@ecommerce/ui-kit/ui/lib/ui/card';
import Image from 'next/image';

const images = [
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf4751f0eac800de9da40b/retailez-1920x1080.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf470f4ec65201e6ab2b18/croma-1920x1080.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf472443857201b9689186/baggit-1920x1080.png',
  'https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/66bf473bad8d540269bfe7af/hammar-1920x1080.png',
];

export function Photocarousel() {
  return (
    <Carousel opts={{ loop: true }} className="w-full p-2">
      <CarouselContent>
        {images.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1  md:p-4 mt-2 relative bg-slate-200 w-full h-24 md:h-52 lg:h-96">
              <Image
                quality={40}
                fill
                style={{
                  objectFit: 'scale-down',
                }}
                src={item}
                alt={item}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
