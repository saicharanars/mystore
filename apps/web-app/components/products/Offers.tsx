import React, { FC } from 'react';
import Carouseloffers from '../hero/Carouseloffers';

interface Ioffers {
  title: string;
  images: string[];
}

const Offers: FC<Ioffers> = ({ title, images }) => {
  return (
    <>
      <div className=" my-2 p-3">
        <h1 className=" p-3 text-foreground font-semibold font-sans pl-4 text-sm md:tex-lg">
          {title}{' '}
        </h1>
        <Carouseloffers images={images} />
      </div>
    </>
  );
};

export default Offers;
