import { createSlice, configureStore } from '@reduxjs/toolkit';

const darkModeSlice = createSlice({
  name: 'darkMode',
  initialState: {
    darkMode: false,
  },
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
});

export const { toggleDarkMode } = darkModeSlice.actions;

export const store = configureStore({
  reducer: {
    darkMode: darkModeSlice.reducer,
  },
});
