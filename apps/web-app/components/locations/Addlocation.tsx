'use client';
import { createLocationDto, createLocationType } from '@ecommerce/types';
import React, { useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { addlocation } from '../../store/user/userreducer';
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTrigger,
  DialogHeader,
  DialogTitle,
} from '@ecommerce/ui-kit/ui';
import { LoaderCircle, Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../store/context/authhook';
import { useUserDispatch } from '../../store/user/userhooks';
import { useAddLocationMutation } from '../../store/user/api';

const Location = () => {
  const auth = useAuth();
  const locationdispatch = useUserDispatch();
  const { token } = auth;
  const [Location, { data: locationresult, isLoading, error: locationError }] =
    useAddLocationMutation();
  const locationform = useForm<createLocationType>({
    resolver: zodResolver(createLocationDto),
  });
  useEffect(() => {
    if (locationresult) {
      locationdispatch(addlocation(locationresult));
    }
  }, [locationdispatch, locationresult]);
  const handleLocation = async (values: createLocationType) => {
    try {
      const loc = await Location({ token: token, location: values });
      console.log(locationresult, loc);
    } catch (error) {
      console.log('add location error:', error);
    }
  };
  return (
    <div className="w-full ">
      <CardHeader>
        <CardDescription>Enter your location below</CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 justify-start w-full gap-4">
        <Form {...locationform}>
          <form
            onSubmit={locationform.handleSubmit(handleLocation)}
            className="space-y-3 w-full"
          >
            <FormField
              control={locationform.control}
              name="address"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>adress</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your adress" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={locationform.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>city</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your city" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={locationform.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>state</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your state" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={locationform.control}
              name="pincode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>pincode</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your pincode"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              className="w-full rounded-sm mt-4"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  adding location...
                </>
              ) : (
                'add location'
              )}
            </Button>
          </form>
        </Form>
        {locationresult && (
          <p className="text-green-500">Location add successful!</p>
        )}
        {locationError && (
          <p className="text-red-500">
            Adding Location failed.{' '}
            {JSON.stringify(locationError) || 'Please try again later.'}
          </p>
        )}
      </CardContent>
    </div>
  );
};

const Addlocation = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>
          <Button>
            {' '}
            <Plus className="mr-4" />
            Add Location
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Location</DialogTitle>
            <DialogDescription>
              <Location />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Addlocation;
