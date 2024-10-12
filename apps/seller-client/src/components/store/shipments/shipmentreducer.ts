import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { shipmentsResponseType, shipmentType } from '@ecommerce/types';

interface Shipment {
  shipments: shipmentsResponseType['items'];
  count: shipmentsResponseType['count'];
}

const initialState: Shipment = {
  shipments: [],
  count: 0,
};

const ShipmentSlice = createSlice({
  name: 'Shipment',
  initialState,
  reducers: {
    setShipments: (state, action: PayloadAction<shipmentsResponseType>) => {
      if (action.payload) {
        state.shipments = action.payload.items;
        state.count = action.payload.count;
      } else {
        console.error('No Shipments found', action.payload);
      }
    },
    removeShipment: (state, action: PayloadAction<{ id: string }>) => {
      if (action.payload) {
        state.shipments = state.shipments.filter(
          (Shipment) => Shipment._id !== action.payload.id
        );
        state.count = state.shipments.length;
      } else {
        console.error('No Shipment ID provided', action.payload);
      }
    },
    editShipment: (state, action: PayloadAction<shipmentType>) => {
      if (action.payload) {
        state.shipments = state.shipments.map((Shipment) =>
          Shipment._id === action.payload._id ? action.payload : Shipment
        );
      } else {
        console.error('No Shipment data provided', action.payload);
      }
    },
  },
});

export const { setShipments, removeShipment, editShipment } =
  ShipmentSlice.actions;
export const selectShipment = (state: RootState) => state.shipment;
export default ShipmentSlice.reducer;
