import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { sellerorderresponseType } from '@ecommerce/types';

interface Order {
  orders: sellerorderresponseType['items'];
  count: sellerorderresponseType['count'];
}

const initialState: Order = {
  orders: [],
  count: 0,
};

const OrderSlice = createSlice({
  name: 'Order',
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<sellerorderresponseType>) => {
      if (action.payload) {
        state.orders = action.payload.items;
        state.count = action.payload.count;
      } else {
        console.error('No Orders found', action.payload);
      }
    },
  },
});

export const { setOrders } = OrderSlice.actions;
export const selectOrder = (state: RootState) => state.order;
export default OrderSlice.reducer;
