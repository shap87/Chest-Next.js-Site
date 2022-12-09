import {createAsyncThunk} from '@reduxjs/toolkit';
import firebaseService from '../../../services/firebase.service';

// !! Using async actions. Firebase requests with store intercation, ... etc

export const someAction = createAsyncThunk(
  'binance/connect',
  async (data: 'request data example', thunkAPI) => {
    try {
      const response = {data: 'response example'}; // Async request

      return response.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response.data.message);
    }
  },
);
