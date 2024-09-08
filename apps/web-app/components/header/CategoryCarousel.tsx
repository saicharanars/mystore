'use client';
import React from 'react';
import { LampFloor, Laptop, Shirt, Armchair } from 'lucide-react';
import {
  CustomCarousel,
  CustomCarouselContent,
  CustomCarouselItem,
} from '@ecommerce/ui-kit/ui';

interface CarouselItemProps {
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  link: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ Icon, label, link }) => {
  return (
    <CustomCarouselItem className="basis-1/4 md:basis-1/12 p-1 mt-6">
      <a
        href={link}
        className="flex flex-col items-center justify-center text-center"
      >
        <div className="flex flex-col items-center min-w-10 p-1">
          <div className="icon-cont rounded-full flex justify-center items-center mb-2">
            <Icon className="h-10 w-10 p-1 bg-accent rounded-full text-primary" />
          </div>
          <p className="font-semibold text-primary">{label}</p>
        </div>
      </a>
    </CustomCarouselItem>
  );
};

const CategoryCarousel: React.FC = () => {
  return (
    <CustomCarousel opts={{ align: 'center' }} className="w-full">
      <CustomCarouselContent>
        <CarouselItem Icon={LampFloor} label="Fashion" link="/browse/fashion" />
        <CarouselItem
          Icon={Laptop}
          label="Electronics"
          link="/browse/electronics"
        />
        <CarouselItem Icon={Shirt} label="Clothing" link="/browse/clothing" />
        <CarouselItem
          Icon={Armchair}
          label="Furniture"
          link="/browse/furniture"
        />
        <CarouselItem
          Icon={LampFloor}
          label="Lighting"
          link="/browse/lighting"
        />
        <CarouselItem
          Icon={Laptop}
          label="Computers"
          link="/browse/computers"
        />
        <CarouselItem
          Icon={Shirt}
          label="Accessories"
          link="/browse/accessories"
        />
        <CarouselItem
          Icon={Armchair}
          label="Home Decor"
          link="/browse/home-decor"
        />
        <CarouselItem Icon={LampFloor} label="Outdoor" link="/browse/outdoor" />
        <CarouselItem Icon={Laptop} label="Gadgets" link="/browse/gadgets" />
        <CarouselItem
          Icon={Shirt}
          label="Sportswear"
          link="/browse/sportswear"
        />
        <CarouselItem Icon={Armchair} label="Office" link="/browse/office" />
      </CustomCarouselContent>
    </CustomCarousel>
  );
};

export default CategoryCarousel;
