import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './user/api';
import { productApi } from './product/api';
import productreducer from './product/productreducer';
import orderreducer from './orders/orderreducer';

import { orderApi } from './orders/api';

const rootReducer = combineReducers({
  product: productreducer,
  order: orderreducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware)
      .concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
