import { createshipmentType } from '@ecommerce/types';
import React, { FC, useContext, useEffect } from 'react';
import AuthContext from '../../store/context/Authcontext';
import {
  useAddshipmentMutation,
  useGetshipmentbyOrderidQuery,
} from '../../store/shipments/api';
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from '@ecommerce/ui-kit/ui';
import { Pencil } from 'lucide-react';

const CreateShipment: FC<createshipmentType> = ({
  orderId,
  trackingId,
  delivery_status,
  address,
}) => {
  const authctx = useContext(AuthContext);
  const token = `Bearer ${authctx.token}`;
  const [
    addshipment,
    { isLoading: addShipmentLoading, isSuccess: addShipmentSuccess },
  ] = useAddshipmentMutation();
  const {
    data: shipmentData,
    isLoading: shipmentCheckLoading,
    isError: shipmentCheckError,
    error: shipmentCheckErrorDetails,
  } = useGetshipmentbyOrderidQuery({ orderId });

  const shipmentExists = !!shipmentData;

  const addShipmentAction = async () => {
    try {
      const res = await addshipment({
        body: { orderId, trackingId, delivery_status, address },
        token,
      }).unwrap();
      console.log(res);
    } catch (err) {
      console.error('Error adding shipment:', err);
    }
  };

  useEffect(() => {
    if (addShipmentSuccess) {
      console.log('Shipment added successfully');
    }
  }, [addShipmentSuccess]);

  if (shipmentCheckLoading || addShipmentLoading) {
    return <div>Loading...</div>;
  }

  if (shipmentCheckError) {
    console.log(shipmentCheckError, 'check>>>>>>');
  }
  if (shipmentCheckErrorDetails) {
    console.log(shipmentCheckErrorDetails, 'error >>>>>>');
  }

  return (
    <div>
      {shipmentExists ? (
        <div className="text-center">
          <h2>Shipment Details</h2>
          <ul>
            <li>
              <strong>Order ID:</strong> {shipmentData?.orderId}
            </li>
            <li>
              <strong>Tracking ID:</strong> {shipmentData?.trackingId}
            </li>
            <li>
              <strong>Delivery Status:</strong> {shipmentData?.delivery_status}
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant={'outline'}
                className="flex flex-row justify-center w-full gap-2"
              >
                <Pencil className="mr-2 h-3 w-3" />
                <span>Create Shipment</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="p-4">
              <DialogTitle>Create Shipment</DialogTitle>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={'outline'}
                  className="flex flex-row justify-center w-full gap-2"
                >
                  <span>
                    <DialogClose>
                      <p>No</p>
                    </DialogClose>
                  </span>
                </Button>
                <Button
                  variant={'destructive'}
                  onClick={addShipmentAction}
                  className="flex flex-row justify-center w-full gap-2"
                >
                  <span>Yes</span>
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>
  );
};

export default CreateShipment;
