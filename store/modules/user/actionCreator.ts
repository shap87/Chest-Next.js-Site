import {FirebaseApp} from 'firebase/app';
import {createAsyncThunk} from '@reduxjs/toolkit';

import firebaseService from '../../../services/firebase.service';

export const getUser = createAsyncThunk(
  'user/get',
  async (data: FirebaseApp, thunkAPI) => {
    try {
      const response = await firebaseService.getUser(data);

      return response;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err);
    }
  },
);
