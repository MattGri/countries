import { configureStore } from '@reduxjs/toolkit';
import darkModeSlice from './darkMode/darkModeSlice';

export default configureStore({
  reducer: {
    darkMode: darkModeSlice,
  },
});
