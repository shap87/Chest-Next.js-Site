import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {exampleSlice} from './modules/example/exampleSlice';
import {createWrapper} from 'next-redux-wrapper';

const makeStore = () =>
  configureStore({
    reducer: {
      [exampleSlice.name]: exampleSlice.reducer,
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
