import {createSlice} from '@reduxjs/toolkit';
import {AppState} from '../../store';
import {HYDRATE} from 'next-redux-wrapper';
import {someAction} from './actionCreator';

export interface ExampleState {
  exampleState: boolean;
  loading: boolean;
}

const initialState: ExampleState = {
  exampleState: false,
  loading: false,
};

export const exampleSlice = createSlice({
  name: 'example',
  initialState,
  reducers: {
    setExampleState(state, action) {
      // !! Example
      state.exampleState = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      state.exampleState = action.payload;
    },

    [someAction.fulfilled.type]: (state, action) => {
      state.exampleState = action.payload;
    },
    [someAction.pending.type]: (state, action) => {
      state.loading = true;
    },
    [someAction.rejected.type]: (state, action) => {
      state.exampleState = action.payload;
      state.loading = false;
    },
  },
});

export const {setExampleState} = exampleSlice.actions;

export const selectExampleState = (state: AppState) =>
  state.example.exampleState;

export default exampleSlice.reducer;
