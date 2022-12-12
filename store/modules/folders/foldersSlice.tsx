import {createSlice, PayloadAction} from '@reduxjs/toolkit';

export type FolderType = {
  createdAt: any;
  updatedAt: any;
  name: string;
  visibility: number;
  numViews: number;
  imageUrl: string;
  userId: string;
  id: string;
  private: false;
  numItems: number;
  children: FolderType[];
};

export interface FolderState {
  folders: FolderType[];
  loading: boolean;
  folderError: any;
}

const initialState: FolderState = {
  folders: [] as FolderType[],
  loading: false,
  folderError: '',
};

export const foldersSlice = createSlice({
  name: 'folders',
  initialState,
  reducers: {
    setFolders(state, action: PayloadAction<FolderType[]>) {
      state.folders = action.payload;
    },
  },
  extraReducers: {},
});

export const {setFolders} = foldersSlice.actions;

export default foldersSlice.reducer;
