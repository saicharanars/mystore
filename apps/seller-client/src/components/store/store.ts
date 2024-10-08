import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './user/api';
import { productApi } from './product/api';
import productreducer from './product/productreducer';
// import authreducer./product/productreducercer';

const rootReducer = combineReducers({
  //   user: authreducer,
  product: productreducer,
  [userApi.reducerPath]: userApi.reducer,
  [productApi.reducerPath]: productApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(productApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
