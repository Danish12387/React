import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: 'white'
  },
  reducers: {
    updateTheme: (state, data) => {
      state.theme = data.payload;
    }
  }
})

export default themeSlice;
export const { updateTheme } = themeSlice.actions;