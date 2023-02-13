import { configureStore } from '@reduxjs/toolkit';

import { editorReducer } from './editorSlice';
import { imageReducer } from './imageSlice';
import { userReducer } from './userSlice';

export const store = configureStore({
  reducer: {
    users: userReducer,
    images: imageReducer,
    editor: editorReducer,
  },
});
