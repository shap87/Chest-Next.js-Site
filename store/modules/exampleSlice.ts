import {createSlice} from '@reduxjs/toolkit';
import {AppState} from '../store';
import {HYDRATE} from 'next-redux-wrapper';

export interface ExampleState {
  exampleState: boolean;
}

const initialState: ExampleState = {
  exampleState: false,
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
  },
});

export const {setExampleState} = exampleSlice.actions;

export const selectExampleState = (state: AppState) =>
  state.example.exampleState;

export default exampleSlice.reducer;
