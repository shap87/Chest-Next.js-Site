import {createSlice} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import {getUser} from './actionCreator';

type UserType = {username: string; name: string; uid: string};

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
  extraReducers: {
    [getUser.fulfilled.type]: (state, action) => {
      state.user = action.payload;
      state.loading = false;
      state.userError = '';
    },
    [getUser.pending.type]: (state, action) => {
      state.loading = true;
    },
    [getUser.rejected.type]: (state, action) => {
      state.userError = action.payload;
      state.loading = false;
    },
  },
});

export default userSlice.reducer;
