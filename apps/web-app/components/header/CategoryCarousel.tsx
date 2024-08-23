'use client';
import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem as BaseCarouselItem,
} from '@nx-next-shadcn-ui-starter/ui-kit/ui';
import { LampFloor, Laptop, Shirt, Armchair } from 'lucide-react';

interface CarouselItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  link: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ Icon, label, link }) => {
  return (
    <BaseCarouselItem className="basis-1/4 md:basis-1/12 p-1  mt-6">
      <a
        href={link}
        className="d-flex align-items-start justify-content-center text-center "
      >
        <div className="flex flex-col items-center min-w-10  p-1">
          <div className="icon-cont rounded-full d-flex justify-content-center align-items-center mb-2">
            <Icon className="h-10 w-10 p-1 bg-accent rounded-full text-primary" />
          </div>
          <p className="font-semibold text-primary">{label}</p>
        </div>
      </a>
    </BaseCarouselItem>
  );
};

const CategoryCarousel: React.FC = () => {
  return (
    <Carousel opts={{ align: 'center' }} className="w-full ">
      <CarouselContent>
        <CarouselItem Icon={LampFloor} label="Fashion" link="/browse/fashion" />
        <CarouselItem
          Icon={Laptop}
          label="Electronics"
          link="/browse/electronics"
        />
        <CarouselItem Icon={Shirt} label="Home" link="/browse/home" />
        <CarouselItem Icon={Armchair} label="Home" link="/browse/home" />
        <CarouselItem Icon={LampFloor} label="Fashion" link="/browse/fashion" />
        <CarouselItem
          Icon={Laptop}
          label="Electronics"
          link="/browse/electronics"
        />
        <CarouselItem Icon={Shirt} label="Home" link="/browse/home" />
        <CarouselItem Icon={Armchair} label="Home" link="/browse/home" />
        <CarouselItem Icon={LampFloor} label="Fashion" link="/browse/fashion" />
        <CarouselItem
          Icon={Laptop}
          label="Electronics"
          link="/browse/electronics"
        />
        <CarouselItem Icon={Shirt} label="Home" link="/browse/home" />
        <CarouselItem Icon={Armchair} label="Home" link="/browse/home" />
      </CarouselContent>
    </Carousel>
  );
};

export default CategoryCarousel;
