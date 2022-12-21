import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import {getUser} from './actionCreator';

type UserType = {
  username: string;
  name: string;
  uid: string;
};

export interface UserState {
  user: UserType;
  loading: boolean;
  userError: any;
}

const initialState: UserState = {
  user: {} as UserType,
  loading: false,
  userError: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(HYDRATE, (state, action: any) => {
        state.user = action.payload;
      })
      .addCase(getUser.pending.type, state => {
        state.loading = true;
      })
      .addCase(getUser.rejected.type, (state, action: any) => {
        state.userError = action.payload;
        state.loading = false;
      })
      .addCase(getUser.fulfilled.type, (state, action: any) => {
        state.user = action.payload;
        state.loading = false;
        state.userError = '';
      });
  },
});

export default userSlice.reducer;
