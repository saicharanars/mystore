'use client';
import AuthContext from '../../store/context/auth';
import { User2Icon } from 'lucide-react';
import React, { useContext, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent } from '@ecommerce/ui-kit/ui';
import Login from '../auth/Login';
import AcccountDropdown from './AccountDropdown';

const Accountbutton = () => {
  const { isLoggedIn } = useContext(AuthContext);
  useEffect(() => {
    console.log(isLoggedIn);
  }, [isLoggedIn]);
  return (
    <>
      {isLoggedIn ? (
        <>
          <AcccountDropdown />
        </>
      ) : (
        <>
          <Dialog>
            <DialogTrigger>
              <User2Icon className="my-auto" />
            </DialogTrigger>
            <DialogContent className="p-4 ">
              <Login />
            </DialogContent>
          </Dialog>
        </>
      )}
    </>
  );
};

export default Accountbutton;
