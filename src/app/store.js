import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import mapReducer from '../features/main/map/mapSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    map: mapReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['map/setMap'],
        ignoredPaths: ['map.map']
      }
    })
});