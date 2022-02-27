import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import mapReducer from '../features/main/map/mapSlice';
import groupReducer from '../features/main/group/groupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    map: mapReducer,
    group: groupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['map/setMap'],
        ignoredPaths: ['map.map']
      }
    })
});