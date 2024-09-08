import React from 'react';
import CategoryCarousel from '../components/header/CategoryCarousel';
import { Photocarousel } from '../components/hero/Photocarousel';
const page = () => {
  return (
    <div className="mx-1 md:mx-4">
      <CategoryCarousel />
      <Photocarousel />
    </div>
  );
};

export default page;
