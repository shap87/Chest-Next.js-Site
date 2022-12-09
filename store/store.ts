import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {exampleSlice} from './modules/example/exampleSlice';
import {createWrapper} from 'next-redux-wrapper';
import {exampleReducer} from './modules/example/example-reducer';

const makeStore = () =>
  configureStore({
    reducer: {
      example: exampleReducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper<AppStore>(makeStore);
