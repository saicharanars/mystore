import React from 'react';
import { Button } from '@ecommerce/ui-kit/ui';
import logo from '../../assets/seller.svg';

const Header = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto  py-3 md:py-4 ">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <img src={logo} alt="MyStore logo" className="h-8 w-auto sm:h-10" />
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              My Store
            </h1>
          </div>
          <nav className="flex items-center space-x-2 sm:space-x-4">
            <Button
              variant="outline"
              className="hidden sm:inline-flex items-center rounded-full border-primary text-primary"
            >
              Register as Seller
            </Button>
            <Button className="rounded-full">Seller Login</Button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
