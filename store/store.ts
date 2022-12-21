import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
import {foldersSlice} from './modules/folders/foldersSlice';
import {userSlice} from './modules/user/userSlice';

const makeStore = () =>
  configureStore({
    reducer: {
      user: userSlice.reducer,
      folders: foldersSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
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
