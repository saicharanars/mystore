'use client';
import { createLocationDto, createLocationType } from '@ecommerce/types';
import { useAddLocationMutation } from '../../store/orders/api';
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from '@ecommerce/ui-kit/ui';
import { LoaderCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../store/context/authhook';

const Addlocation = () => {
  const auth = useAuth();
  const { token } = auth;
  const [Location, { data: locationresult, isLoading, error: locationError }] =
    useAddLocationMutation();
  const locationform = useForm<createLocationType>({
    resolver: zodResolver(createLocationDto),
  });
  const handleLocation = async (values: createLocationType) => {
    try {
      await Location({ token: token, location: values });
    } catch (error) {
      console.log('add location error:', error);
    }
  };
  return (
    <div className="max-w-screen-sm ">
      <CardHeader>
        <CardTitle className="text-2xl">Add Location</CardTitle>
        <CardDescription>Enter your location below</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Form {...locationform}>
          <form
            onSubmit={locationform.handleSubmit(handleLocation)}
            className="space-y-3"
          >
            <FormField
              control={locationform.control}
              name="address"
              render={({ field }) => (
                <FormItem>
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

export default Addlocation;
