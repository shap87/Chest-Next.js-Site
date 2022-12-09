import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {exampleReducer} from './modules/example/example-reducer';
import {userSlice} from './modules/user/userSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      example: exampleReducer,
      user: userSlice.reducer,
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
