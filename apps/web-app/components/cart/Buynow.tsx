import React, { useEffect, useState } from 'react';
import {
  Button,
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@ecommerce/ui-kit/ui';
import { useGetLocationsQuery } from '../../store/orders/api';
import { locationType, userlocationsType } from '@ecommerce/types';
import { useAuth } from '../../store/context/authhook';
import Purchase from './Purchase';

type LocationsQueryResult = ReturnType<typeof useGetLocationsQuery>;
interface product {
  id: string;
  quantity: number;
}
interface IbuyNow {
  ordervalue: number;
  products: product[];
}

const Buynow: React.FC<IbuyNow> = ({ ordervalue, products }) => {
  const auth = useAuth();
  const { token } = auth;
  const [location, setLocation] = useState<string>('');

  const { data, isLoading, error } = useGetLocationsQuery(
    token
  ) as LocationsQueryResult;

  const locations = data as userlocationsType | undefined;
  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>BuyNow</Button>
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>Add Location</DialogTitle>
          <DialogDescription>Add Location to your Order</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Select onValueChange={(value) => setLocation(value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select your Location" />
            </SelectTrigger>
            <SelectContent>
              {isLoading && <p>Loading...</p>}
              {error && <p>Error fetching locations</p>}
              {locations &&
                locations.locations.map((location: locationType) => (
                  <SelectItem key={location.id} value={location.id}>
                    {`${location.address} ${location.city}`}
                  </SelectItem>
                ))}
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          {location && (
            <Purchase
              locationId={location}
              ordervalue={ordervalue}
              products={products}
            />
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default Buynow;
