import { configureStore } from '@reduxjs/toolkit';

import { editorReducer } from './EditorSlice';
import { imageReducer } from './imageSlice';

export const store = configureStore({
  reducer: {
    images: imageReducer,
    editor: editorReducer,
  },
});
