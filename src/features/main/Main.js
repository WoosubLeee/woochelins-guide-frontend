import styles from './Main.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeFocusedPlace, setCurrentPlaces, setFocusedPlace, setGooglePlacesService, setPlacesUpdateNeeded } from './place/placeSlice';
import { setCurrentGroup, setGroups, setGroupsUpdateNeeded, setPlaceLists } from "./group/groupSlice";
import { Outlet, useLocation, useParams } from 'react-router-dom';
import queryString from "query-string";
import Map from "./map/Map";
import BottomNavbar from './bottomNavbar/BottomNavbar';
import {
  requestGetPlace,
  requestGetPlaceList,
  requestGetPlaceListDefault,
  requestGetPlaceListsUser
} from '../../apis/placeApi';
import { requestGetGroup, requestGetGroupsUser } from '../../apis/groupApi';
import {
  addIsGroupProperty,
  changeGeometryToNum,
  extractPlacesFromGroupData,
  extractPlacesFromPlaceListData,
  processGooglePlaceData,
  snakeToCamel
} from '../../utils/functions/common';

const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { googleMapsId } = useParams();

  const isLoginChecked = useSelector(state => state.auth.isLoginChecked);
  const googleMap = useSelector(state => state.map.googleMap);
  const placesUpdateNeeded = useSelector(state => state.place.placesUpdateNeeded);
  const focusedPlace = useSelector(state => state.place.focusedPlace);
  const googlePlacesService = useSelector(state => state.place.googlePlacesService);
  const sessionToken = useSelector(state => state.place.sessionToken);
  const groupsUpdateNeeded = useSelector(state => state.group.groupsUpdateNeeded);

  useEffect(() => {
    if (googleMap) {
      dispatch(setGooglePlacesService(new window.google.maps.places.PlacesService(googleMap)));
    }
  }, [googleMap]);

  // FocusedPlace 처리
  useEffect(() => {
    if (googleMapsId && googlePlacesService) {
      if (!focusedPlace || focusedPlace.googleMapsId !== googleMapsId) {
        requestGetPlace(googleMapsId)
          .then(async res => {  
            // DB에 저장된 장소의 경우
            if (res.status === 200) {
              let data = await res.json();
              data = changeGeometryToNum(snakeToCamel(data));

              // 사진은 임시 comment 조치(WG-32)
              // // 사진 정보는 DB에 없으므로 Google에 다시 요청
              // googlePlacesService.getDetails({
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
              if (googlePlacesService) {
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

                googlePlacesService.getDetails(options, (place, status) => {
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
  }, [googleMapsId, googlePlacesService]);

  useEffect(() => {
    updateCurrentPlaces();
  }, [location.search]);

  useEffect(() => {
    if (placesUpdateNeeded) {
      updateCurrentPlaces();
      dispatch(setPlacesUpdateNeeded(false));
    }
  }, [placesUpdateNeeded]);

  const updateCurrentPlaces = () => {
    const fetchData = async () => {
      // query로 list type(Group인지, PlaceList)과 id를 확인하고
      // 없으면 user의 default PlaceList 표시
      const queries = queryString.parse(location.search);
      let data;
      if ('type' in queries && 'id' in queries) {
        if (queries.type === 'group') {
          data = await requestGetGroup(queries.id);
          dispatch(setCurrentGroup({
            ...data,
            isGroup: true
          }));
          return extractPlacesFromGroupData(data);
        } else if (queries.type === 'placelist') {
          data = await requestGetPlaceList(queries.id);
        }
      } else {
        data = await requestGetPlaceListDefault();
      }
      dispatch(setCurrentGroup({
        ...data,
        isGroup: false
      }));
      return extractPlacesFromPlaceListData(data);
    };

    fetchData() 
      .then(data => {
        dispatch(setCurrentPlaces(data));
      });
  };

  // User의 Group과 PlaceList 목록 가져오기
  useEffect(() => {
    updateGroupsAndPlaceLists();
  }, []);

  useEffect(() => {
    if (groupsUpdateNeeded) {
      updateGroupsAndPlaceLists();
      dispatch(setGroupsUpdateNeeded(false));
    }
  }, [groupsUpdateNeeded]);

  const updateGroupsAndPlaceLists = () => {
    requestGetGroupsUser()
      .then(data => {
        const groups = addIsGroupProperty(data);
        dispatch(setGroups(groups));
      })
    requestGetPlaceListsUser()
      .then(data => {
        const placeLists = addIsGroupProperty(data);
        dispatch(setPlaceLists(placeLists));
      });
  };

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