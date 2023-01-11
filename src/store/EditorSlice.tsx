import { createSlice } from '@reduxjs/toolkit';
import { IInitialStateEditor } from '../shared/interfaces';

const initialState: IInitialStateEditor = {
  activeTool: 'pencil',
  activeColor: 'black',
  lineSize: 2,
};

const editorSlice = createSlice({
  name: 'editor',
  initialState,
  reducers: {
    changeColorAction(state, action) {
      state.activeColor = action.payload;
    },
    setActiveToolAction(state, action) {
      state.activeTool = action.payload;
    },
    changeLineSizeAction(state, action) {
      state.lineSize = action.payload;
    },
  },
});

export const { changeColorAction, changeLineSizeAction, setActiveToolAction } =
  editorSlice.actions;
export const editorReducer = editorSlice.reducer;
