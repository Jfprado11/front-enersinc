import { configureStore } from '@reduxjs/toolkit';

// Reducers
import uiReducer from '../slices/uiSlice';
import userReducer from '../slices/userSlice';
import dataReducer from '../slices/dataSlice';

export default configureStore({
  reducer: {
    ui: uiReducer,
    user: userReducer,
    data: dataReducer,
  },
});
