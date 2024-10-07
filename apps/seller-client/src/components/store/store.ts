import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './user/api';
import { productApi } from './product/api';
// import authreducer from './userreducer';

const rootReducer = combineReducers({
  //   user: authreducer,
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
