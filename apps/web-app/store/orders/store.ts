import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { orderApi } from './api';
// import authreducer from './userreducer';

const rootReducer = combineReducers({
  //   user: authreducer,
  [orderApi.reducerPath]: orderApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(orderApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
