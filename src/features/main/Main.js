import styles from './Main.module.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentGroup, setGroups, setGroupsUpdateNeeded, setMyLists } from "./group/groupSlice";
import { setCurrentPlaces, setFocusedPlace, setPlacesUpdateNeeded } from './place/placeSlice';
import { Outlet, useLocation, useParams } from 'react-router-dom';
import queryString from "query-string";
import Map from "./map/Map";
import BottomNavbar from './bottomNavbar/BottomNavbar';
import {
  requestGetPlace,
  requestGetMyList,
  requestGetMyListDefault,
  requestGetMyListsUser
} from '../../apis/placeApi';
import { requestGetGroup, requestGetGroupsUser } from '../../apis/groupApi';
import {
  addIsGroupProperty,
  changeGeometryToNum,
  extractPlacesFromGroupData,
  extractPlacesFromMyListData,
  snakeToCamel
} from '../../utils/functions/common';

const Main = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { kakaoMapId } = useParams();

  const isLoginChecked = useSelector(state => state.auth.isLoginChecked);
  const placesUpdateNeeded = useSelector(state => state.place.placesUpdateNeeded);
  const focusedPlace = useSelector(state => state.place.focusedPlace);
  const groupsUpdateNeeded = useSelector(state => state.group.groupsUpdateNeeded);

  // FocusedPlace 처리
  useEffect(() => {
    // focus할 장소가 있는 경우
    if (kakaoMapId) {
      if (!focusedPlace || focusedPlace.kakaoMapId !== kakaoMapId) {
        requestGetPlace(kakaoMapId)
          .then(async res => {
            // DB에 저장된 맛집의 경우
            if (res.status === 200) {
              let data = await res.json();
              data = changeGeometryToNum(snakeToCamel(data));

              dispatch(setFocusedPlace(data));

            // DB에 저장되지 않은 맛집의 경우
            } else {
              alert('맛집을 불러오는 과정 중 오류가 발생했습니다.');
            }
          });
      }
    // focus할 장소가 없는 경우
    } else {
      dispatch(setFocusedPlace(undefined));
    }
  }, [kakaoMapId]);

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
      // query로 list type(Group인지, MyList)과 id를 확인하고
      // 없으면 user의 default MyList 표시
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
        } else if (queries.type === 'mylist') {
          data = await requestGetMyList(queries.id);
        }
      } else {
        data = await requestGetMyListDefault();
      }
      dispatch(setCurrentGroup({
        ...data,
        isGroup: false
      }));
      return extractPlacesFromMyListData(data);
    };

    fetchData() 
      .then(data => {
        dispatch(setCurrentPlaces(data));
      });
  };

  // User의 Group과 MyList 목록 가져오기
  useEffect(() => {
    updateGroupsAndMyLists();
  }, []);

  useEffect(() => {
    if (groupsUpdateNeeded) {
      updateGroupsAndMyLists();
      dispatch(setGroupsUpdateNeeded(false));
    }
  }, [groupsUpdateNeeded]);

  const updateGroupsAndMyLists = () => {
    requestGetGroupsUser()
      .then(data => {
        const groups = addIsGroupProperty(data);
        dispatch(setGroups(groups));
      })
    requestGetMyListsUser()
      .then(data => {
        const myLists = addIsGroupProperty(data);
        dispatch(setMyLists(myLists));
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