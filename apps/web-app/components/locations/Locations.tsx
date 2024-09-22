import React, { useEffect } from 'react';
import { useAuth } from '../../store/context/authhook';
import { locationType, userlocationsType } from '@ecommerce/types';
import { Card, CardHeader, CardTitle, Skeleton } from '@ecommerce/ui-kit/ui';
import Addlocation from './Addlocation';
import { useGetLocationsQuery } from '../../store/user/api';
import { useUserDispatch, useUserSelector } from '../../store/user/userhooks';
import { setLocations } from '../../store/user/userreducer';
import { MapPin } from 'lucide-react';

type LocationsQueryResult = ReturnType<typeof useGetLocationsQuery>;

const LocationsSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    {Array.from({ length: 9 }).map((_, index) => (
      <Card key={index} className="w-full">
        <CardHeader>
          <Skeleton className="w-full h-4 mb-2" />
          <Skeleton className="w-3/4 h-6" />
        </CardHeader>
      </Card>
    ))}
  </div>
);

export default function Locations() {
  const auth = useAuth();
  const locationDispatch = useUserDispatch();
  const userLocations = useUserSelector((state) => state.user.locations);
  const { token } = auth;

  const { data, isLoading, error } = useGetLocationsQuery(
    token
  ) as LocationsQueryResult;

  const locations = data as userlocationsType | undefined;

  useEffect(() => {
    if (locations?.locations) {
      locationDispatch(setLocations(locations.locations));
    }
  }, [locationDispatch, locations?.locations]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row items-center justify-between mb-8">
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-4 md:mb-0">
          Your Locations
        </h1>
        <Addlocation />
      </div>
      {isLoading && <LocationsSkeleton />}
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4"
          role="alert"
        >
          <p className="font-bold">Error</p>
          <p>Failed to retrieve locations. Please try again later.</p>
        </div>
      )}
      {userLocations && userLocations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userLocations.map((location: locationType) => (
            <Card key={location.id} className="w-full">
              <CardHeader className=" p-2 md:p-4 space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="bg-primary/10 p-0 md:p-1 rounded-full">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg  truncate font-semibold">
                      {location.city}
                    </CardTitle>
                    <CardTitle className="mt-1 truncate text-xs sm:text-sm text-muted-foreground line-clamp-1">
                      {location.address}
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-muted-foreground">
          No locations found. Add a new location to get started.
        </p>
      )}
    </div>
  );
}
