import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export interface Token {
  access_token: string;
}
interface User {
  loggedin: boolean;
  token: string;
}

const initialState: User = {
  loggedin: false,
  token: '',
};

const UserSlice = createSlice({
  name: 'User',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<Token>) => {
      if (action.payload && action.payload.access_token) {
        state.token = action.payload.access_token;
        state.loggedin = true;
      } else {
        console.error('No access token found in payload', action.payload);
      }
    },
  },
});

export const { setUser } = UserSlice.actions;
export const selectuser = (state: RootState) => state.userApi;
export default UserSlice.reducer;
