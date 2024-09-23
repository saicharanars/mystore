'use client';
import Image from 'next/image';
import React, { useContext } from 'react';

import { Search, ShoppingCart } from 'lucide-react';
import {
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Button,
} from '@ecommerce/ui-kit/ui';
import { Sidebar } from './Sidebar';
import Accountbutton from './Accountbutton';
import Link from 'next/link';
import CartContext from '../../store/context/cart';

const Header = () => {
  const { total_quantity } = useContext(CartContext);

  return (
    <div className="h-18 md:h-24 grid grid-cols-2 md:grid-cols-4 px-2 md:px-4 shadow-md">
      <div className="p-2  my-auto ml-3 flex justify-start gap-4">
        <div className="p-1 md:p-2 md:hidden my-auto">
          <Sidebar />
        </div>
        <Link href={'/'}>
          <Image
            loading="lazy"
            alt="Mystore"
            title="Mystore"
            width={125}
            height={24}
            src="https://www.mystore.in/s/62ea2c599d1398fa16dbae0a/636c8d9521cd491a8c9a4723/mystore-logo-blue-200x80.png"
            className="h-auto my-auto p-2 md:p-1"
            ms-data-valign="middle"
          />
        </Link>
      </div>
      <div className="relative p-2 my-auto right-0  md:order-last flex flex-row justify-end gap-4">
        <Button className="  rounded-lg   hidden md:block my-auto ">
          Sell on Mystore
        </Button>
        <div className="p-2">
          <Accountbutton />
        </div>
        <Link
          href="/cart"
          className="relative inline-flex items-center align-middle p-2"
        >
          <span className="sr-only">Shopping Cart</span>
          <ShoppingCart className="w-6 h-6" />
          {total_quantity > 0 && (
            <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
              {total_quantity}
            </span>
          )}
        </Link>
      </div>
      <div className="col-span-2 p-2 my-auto">
        <div className="relative grid grid-cols-4 h-full rounded-full border-2  border-secondary">
          <Select>
            <SelectTrigger className="w-full p-2">
              <SelectValue placeholder="All" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Men</SelectItem>
              <SelectItem value="dark">Women</SelectItem>
              <SelectItem value="system">Mobiles</SelectItem>
            </SelectContent>
          </Select>
          <div className="col-span-3 relative">
            <Input
              type="search"
              placeholder="Search products..."
              className="w-full rounded-r-full bg-white pl-10 pr-4 py-2 text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary shadow-sm"
            />
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
