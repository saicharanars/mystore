import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { shopApi } from './api';

const rootReducer = combineReducers({
  [shopApi.reducerPath]: shopApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
