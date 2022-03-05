import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import mapReducer from '../features/main/map/mapSlice';
import placeReducer from '../features/main/place/placeSlice';
import groupReducer from '../features/main/group/groupSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    map: mapReducer,
    place: placeReducer,
    group: groupReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          'map/setGoogleMap',
          'map/setKakaoMap',
          'map/setGoogleFocusedMarker',
          'map/setKakaoFocusedMarker',
          'place/setGooglePlacesService',
          'place/setSessionToken',
        ],
        ignoredPaths: [
          'map.googleMap',
          'map.kakaoMap',
          'map.googleFocusedMarker',
          'map.kakaoFocusedMarker',
          'place.googlePlacesService',
          'place.sessionToken',
        ]
      }
    })
});