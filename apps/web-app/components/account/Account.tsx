'use client';

import { Separator } from '@ecommerce/ui-kit/ui/lib/ui/separator';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@ecommerce/ui-kit/ui/lib/ui/tabs';
import React from 'react';
import Orders from '../orders/Orders';
import { MapPin, TruckIcon, User2Icon } from 'lucide-react';
import Locations from './../locations/Locations';
import { Provider } from 'react-redux';
import store from '../../store/orders/store';
import { Profile } from './Profile';

const Account = () => {
  return (
    <Provider store={store}>
      <div>
        <Tabs
          defaultValue="account"
          className="w-full grid grid-cols-4 justify-start m-1"
        >
          <TabsList className="flex flex-col justify-start w-full h-full m-1 gap-2 ">
            <TabsTrigger
              value="account"
              className="w-full p-1 m-1 text-xs  md:m-2 md:p-2  md:w-42"
            >
              <User2Icon className="mx-auto md:mr-4 md:ml-0" />
              <p className="hidden md:block">Account</p>
            </TabsTrigger>
            <Separator className="my-2" />

            <TabsTrigger
              value="orders"
              className="w-full p-1 m-1 text-xs  md:m-2 md:p-2  md:w-42"
            >
              <TruckIcon className="mx-auto md:mr-4 md:ml-0" />
              <p className="hidden md:block">Orders</p>
            </TabsTrigger>
            <Separator className="my-2" />

            <TabsTrigger
              value="locations"
              className="w-full p-1 m-1 text-xs  md:m-2 md:p-2  md:w-42"
            >
              <MapPin className="mx-auto md:mr-4 md:ml-0" />
              <p className="hidden md:block">Locations</p>
            </TabsTrigger>
          </TabsList>
          <div className="col-span-3 m-1">
            <TabsContent value="account">
              <Separator orientation="vertical" className="m-2" />
              <Profile />
            </TabsContent>
            <TabsContent value="orders">
              <Separator orientation="vertical" className="mx-4" />
              <div className="p-1 m-1">
                <Orders />
              </div>
            </TabsContent>
            <TabsContent value="locations">
              <Separator orientation="vertical" className="mx-4" />
              <div className="p-1 m-1">
                <Locations />
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </Provider>
  );
};

export default Account;
