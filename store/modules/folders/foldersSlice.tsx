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
  private: boolean;
  numItems: number;
  children: FolderType[];
  parent: string | null;
};

export interface FolderState {
  folders: FolderType[];
  selectedFolders: {
    [key: string]: FolderType;
  };
  selectedSubfolders: {
    [key: string]: FolderType;
  };
  loading: boolean;
  folderError: any;
}

const initialState: FolderState = {
  folders: [] as FolderType[],
  selectedFolders: {},
  selectedSubfolders: {},
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
    setSelectedFolders(
      state,
      action: PayloadAction<{
        [key: string]: FolderType;
      }>,
    ) {
      state.selectedFolders = action.payload;
    },
    setSelectedSubfolders(
      state,
      action: PayloadAction<{
        [key: string]: FolderType;
      }>,
    ) {
      state.selectedSubfolders = action.payload;
    },
  },
  extraReducers: {},
});

export const {setFolders, setSelectedFolders, setSelectedSubfolders} =
  foldersSlice.actions;

export default foldersSlice.reducer;
