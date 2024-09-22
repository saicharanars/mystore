import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';
import { locationType } from '@ecommerce/types';

interface User {
  locations: locationType[];
}

const initialState: User = {
  locations: [],
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setLocations: (state, action: PayloadAction<locationType[]>) => {
      if (action.payload) {
        state.locations.push(...action.payload);
      } else {
        console.error('No locations found', action.payload);
      }
    },
    addlocation: (state, action: PayloadAction<locationType>) => {
      state.locations.push(action.payload);
    },
  },
});

export const { setLocations, addlocation } = UserSlice.actions;
export const selectuser = (state: RootState) => state.userApi;
export default UserSlice.reducer;
