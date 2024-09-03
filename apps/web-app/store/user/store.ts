import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userApi } from './api';
import authreducer from './userreducer';

const rootReducer = combineReducers({
  user: authreducer,
  [userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware), // Fix this line
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
