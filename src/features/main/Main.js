import styles from './Main.module.css';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mapApiLoaded } from './map/mapSlice';
import { removeFocusedPlace, setFocusedPlace } from './place/placeSlice';
import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { Loader } from "@googlemaps/js-api-loader";
import Map from "./map/Map";
import BottomNavbar from './bottomNavbar/BottomNavbar';
import { requestGetPlace } from '../../apis/placeApi';
import { changeGeometryToNum, createPath, processGooglePlaceData, snakeToCamel } from '../../utils/functions/common';

const Main = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { googleMapsId } = useParams();

  const isLoginChecked = useSelector(state => state.auth.isLoginChecked);
  const map = useSelector(state => state.map.map);
  const focusedPlace = useSelector(state => state.place.focusedPlace);
  const sessionToken = useSelector(state => state.place.sessionToken);

  const [placesService, setPlacesService] = useState(undefined);

  useEffect(() => {
    const loader = new Loader({
      apiKey: 'AIzaSyADso4JNS7rJCc2DqF7dj5CJXBFaUXj61A',
      libraries: ['places', 'visualization'],
    });
    
    loader.load()
      .then(() => {
        dispatch(mapApiLoaded());
      });
  }, []);

  useEffect(() => {
    if (map) {
      setPlacesService(new window.google.maps.places.PlacesService(map));
    }
  }, [map]);

  useEffect(() => {
    if (location.pathname === '/main') {
      navigate(createPath('/main/home', location));
    }
  }, [location.pathname]);

  // FocusedPlace 처리
  useEffect(() => {
    if (googleMapsId && placesService) {
      if (!focusedPlace || focusedPlace.googleMapsId !== googleMapsId) {
        requestGetPlace(googleMapsId)
          .then(async res => {  
            // DB에 저장된 장소의 경우
            if (res.status === 200) {
              let data = await res.json();
              data = changeGeometryToNum(snakeToCamel(data));

              // 사진은 임시 comment 조치(WG-32)
              // // 사진 정보는 DB에 없으므로 Google에 다시 요청
              // placesService.getDetails({
              //   placeId: googleMapsId,
              //   fields: ['photos']
              // }, (place, status) => {
              //   const photos = place.photos.map(photo => photo.getUrl());
              //   data.photos = photos;
              //   dispatch(setFocusedPlace(data));
              // });

              dispatch(setFocusedPlace(data));

            // DB에 저장되지 않은 장소의 경우
            } else if (res.status === 204) {
              if (map) {
                const options = {
                  placeId: googleMapsId,
                  fields: [
                    'place_id',
                    'name',
                    'geometry.location',
                    'type',
                    'formatted_address',
                    // 사진은 임시 comment 조치(WG-32)
                    // 'photos',
                    'url',
                    'formatted_phone_number'
                  ]
                };

                if (sessionToken) {
                  options['sessionToken'] = sessionToken;
                }

                placesService.getDetails(options, (place, status) => {
                  const payload = processGooglePlaceData(place);
                  dispatch(setFocusedPlace(payload));
                });
              }
            }
          });
      }
    } else {
      dispatch(removeFocusedPlace());
    }
  }, [googleMapsId, placesService]);

  return (
    <div className={styles.main}>
      {isLoginChecked && <>
        <Map />
        <Outlet />
        <BottomNavbar />
      </>}
    </div>
  );
}
 
export default Main;