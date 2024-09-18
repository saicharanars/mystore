import { useGetLocationsQuery } from '../../store/orders/api';
import React from 'react';
import { useAuth } from '../../store/context/authhook';
import { locationType, userlocationsType } from '@ecommerce/types';
import {
  Card,
  CardHeader,
  CardTitle,
  Skeleton,
  CardDescription,
} from '@ecommerce/ui-kit/ui';

type LocationsQueryResult = ReturnType<typeof useGetLocationsQuery>;

const locationsSkeleton = (
  <div className="p-2 m-2 grid grid-cols-1 md:grid-cols-3 gap-2">
    {Array.from({ length: 9 }).map((_, index) => (
      <Card key={index} className="w-full">
        <CardHeader>
          <CardDescription className=" text-balance leading-relaxed">
            <Skeleton className="w-full h-8" />
          </CardDescription>
          <CardTitle>
            <Skeleton className="w-full h-5" />
          </CardTitle>
        </CardHeader>
      </Card>
    ))}
  </div>
);
const Locations = () => {
  const auth = useAuth();
  const { token } = auth;

  const { data, isLoading, error } = useGetLocationsQuery(
    token
  ) as LocationsQueryResult;

  const locations = data as userlocationsType | undefined;
  if (data) {
    console.log(locations);
  }
  return (
    <>
      <h1 className=" p-3 text-foreground font-semibold font-sans pl-4 text-sm md:tex-lg">
        Locations
      </h1>
      <div className="p-2 m-2 grid grid-cols-1 md:grid-cols-3 gap-2">
        {locations &&
          locations.locations.map((location: locationType) => (
            <Card key={location.id} className="w-full">
              <CardHeader>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  {location.address}
                </CardDescription>
                <CardTitle>{location.city}</CardTitle>
              </CardHeader>
            </Card>
          ))}
        {isLoading && locationsSkeleton}
        {error && (
          <p className="text-red-500">
            retrive locations failed
            {JSON.stringify(error) || 'Please try again later.'}
          </p>
        )}
      </div>
    </>
  );
};

export default Locations;
