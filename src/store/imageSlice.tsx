import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { IInitialStateImages, ImageInDB } from '@interfaces/interfaces';
import { createImage, getImages } from '@queries/apiHandlers/dataBaseHandler';

export const fetchImages = createAsyncThunk('images/fetchImages', async () => {
  const res = await getImages();

  if (res.length) {
    return res;
  }
});

export const filterImagesByUser = createAsyncThunk(
  'images/filterImagesByUser',
  async (id: string) => {
    const res = await getImages();

    if (res.length) {
      return res.filter((image) => image.userUID === id) || [];
    }
  }
);

export const addImage = createAsyncThunk(
  'images/addImage',
  async (image: ImageInDB, { rejectWithValue }) => {
    try {
      await createImage(image);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState: IInitialStateImages = {
  images: [],
  error: null,
  loading: false,
};

const imageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchImages.fulfilled, (state, action) => {
        if (action.payload) {
          state.images = action.payload;
        }
      })
      .addCase(filterImagesByUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.images = action.payload;
        }
      });
  },
});

export const imageReducer = imageSlice.reducer;
