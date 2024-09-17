import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { orderApi } from './api';

const rootReducer = combineReducers({
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
